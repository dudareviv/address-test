<?php
/**
 * Created by PhpStorm.
 * User: Dudarev
 * Date: 24.11.2015
 * Time: 12:18
 */

if (!isset($_GET['find'])) {
    exit;
}
$search = urldecode($_GET['find']);

$file = 'addresses.txt';

//header('Content-Type: application/json');

$contents = file_get_contents($file);

// позволяет избежать специальных символов в массиве
$pattern = preg_quote($search, '/');

// завершение регулярного выражения, совпадающего всему предложению
$pattern = "/^.*$pattern.*$/ium";

// поиск и добавление в массив $matches всех совпадений
preg_match_all($pattern, $contents, $matches);

$json = json_encode($matches, JSON_UNESCAPED_SLASHES);

echo $json;