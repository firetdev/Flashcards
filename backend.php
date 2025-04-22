<?php
if (isset($_POST['english']) && isset($_POST['hebrew'])) {
    $english = $_POST['english'];
    $hebrew = $_POST['hebrew'];
    $file = fopen("cards.txt", "a");
    if ($file) {
        fwrite($file, "$english:$hebrew\n");
        fclose($file);
        echo "Card saved successfully!";
    } else {
        echo "Error: Could not open the file.";
    }
} else {
    echo "Error: Missing 'english' or 'hebrew' data.";
}
?>