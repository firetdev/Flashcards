<?php
$filename = "cards.txt";

if (file_exists($filename)) {
    $content = file_get_contents($filename);
    echo $content;
} else {
    echo "";
}
?>
