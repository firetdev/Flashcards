<?php
if (isset($_POST['index'])) {
    $index = intval($_POST['index']) + 1;
    $filename = "cards.txt";

    if (file_exists($filename)) {
        $lines = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        if ($index >= 0 && $index < count($lines)) {
            unset($lines[$index]);

            file_put_contents($filename, implode("\n", $lines) . "\n");

            echo "Card at index $index removed successfully.";
        } else {
            echo "Error: Index out of range.";
        }
    } else {
        echo "Error: cards.txt does not exist.";
    }
} else {
    echo "Error: No index provided.";
}
?>