<?php
/*
 * METAL HUB contact form handler.
 * Receives the form from index.html / en/index.html (POST, same site),
 * filters spam, and emails the message to the site owner.
 * Responds with JSON: {"ok":true} or {"ok":false,"error":"<code>"}.
 */
declare(strict_types=1);

const TO_ADDRESS   = 'alex@kushmar.com';
const FROM_ADDRESS = 'noreply@kushmar.com';
const FROM_NAME    = 'METAL HUB';
const MAX_PER_HOUR = 5;      // messages per IP per hour
const MIN_SECONDS  = 3;      // a human needs at least this long to fill the form
const MAX_AGE      = 86400;  // a form older than a day is stale

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function reply(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}
function field(string $name): string {
    $v = $_POST[$name] ?? '';
    return is_string($v) ? trim($v) : '';
}
function len(string $s): int {
    if (function_exists('mb_strlen')) return mb_strlen($s, 'UTF-8');
    $n = preg_match_all('/./us', $s);
    return $n === false ? strlen($s) : $n;
}
function one_line(string $s): string {        // no header injection through name / email
    return trim(preg_replace('/[\r\n\t\0]+/', ' ', $s));
}
function mime_header(string $s): string {     // UTF-8 safe header without mbstring
    return '=?UTF-8?B?' . base64_encode($s) . '?=';
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    reply(405, ['ok' => false, 'error' => 'method']);
}

// Only accept submissions coming from the site itself.
$origin = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
$host   = $origin !== '' ? strtolower((string) (parse_url($origin, PHP_URL_HOST) ?: '')) : '';
$self   = strtolower((string) preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));   // HTTP_HOST may carry a port
if ($host !== '' && $host !== $self && !preg_match('/(^|\.)kushmar\.com$/', $host)) {
    reply(403, ['ok' => false, 'error' => 'origin']);
}

// Spam traps: a hidden field humans never fill, and a minimum fill time.
if (field('website') !== '') {
    reply(200, ['ok' => true]);               // pretend success, send nothing
}
$started = (int) field('ts');
$elapsed = time() - intdiv($started, 1000);
if ($started <= 0 || $elapsed < MIN_SECONDS || $elapsed > MAX_AGE) {
    reply(400, ['ok' => false, 'error' => 'timing']);
}

$name    = one_line(field('name'));
$email   = one_line(field('email'));
$message = str_replace("\0", '', field('message'));
$lang    = field('lang') === 'en' ? 'en' : 'he';

if ($name === '' || len($name) > 100)                        reply(400, ['ok' => false, 'error' => 'name']);
if (len($email) > 200 || !filter_var($email, FILTER_VALIDATE_EMAIL)) reply(400, ['ok' => false, 'error' => 'email']);
if (len($message) < 5 || len($message) > 5000)               reply(400, ['ok' => false, 'error' => 'message']);

// Rate limit per IP (stored hashed, in the server's temp folder).
$ip    = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$file  = rtrim(sys_get_temp_dir(), '/') . '/mh_contact_' . hash('sha256', $ip . '|metalhub') . '.json';
$now   = time();
$times = [];
if (is_file($file)) {
    $saved = json_decode((string) @file_get_contents($file), true);
    if (is_array($saved)) $times = array_values(array_filter($saved, fn($t) => is_int($t) && $t > $now - 3600));
}
if (count($times) >= MAX_PER_HOUR) {
    reply(429, ['ok' => false, 'error' => 'rate']);
}

$subject = ($lang === 'en' ? 'METAL HUB — new message from ' : 'METAL HUB — הודעה חדשה מ-') . $name;
$body = "Name: {$name}\n"
      . "Email: {$email}\n"
      . "Page: " . ($lang === 'en' ? 'English' : 'Hebrew') . " site\n"
      . "Time: " . gmdate('Y-m-d H:i') . " UTC\n"
      . "IP: {$ip}\n"
      . "----------------------------------------\n\n"
      . $message . "\n";

$headers = [
    'From: ' . mime_header(FROM_NAME) . ' <' . FROM_ADDRESS . '>',
    'Reply-To: ' . mime_header($name) . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: METAL HUB contact form',
];

$sent = @mail(TO_ADDRESS, mime_header($subject), $body, implode("\r\n", $headers), '-f' . FROM_ADDRESS);
if (!$sent) {
    reply(500, ['ok' => false, 'error' => 'send']);
}

$times[] = $now;
@file_put_contents($file, json_encode($times), LOCK_EX);
reply(200, ['ok' => true]);
