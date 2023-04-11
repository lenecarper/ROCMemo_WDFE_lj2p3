<?php
# Function to retrieve and upload the data into the database
function uploadScore()
{
    # Define variables to store data in and connect to the SQL database
    $db = db();

    if (isset($_POST['submit']))
    {
        $playerName = $_POST['name'];
        $playerTime = $_POST['time'];
        $playerClicks = $_POST['clicks'];

        # Gather all the data into an SQL query
        $saveHighscore = "INSERT INTO highscores (username, time, clicks) VALUES ('" . $playerName .  "', '" . $playerTime . "', '" . $playerClicks . "')";
        # Query the data to be sent into the corresponding database tables
        $query = $db->query($saveHighscore) or die($db->error);
    }
}
?>
