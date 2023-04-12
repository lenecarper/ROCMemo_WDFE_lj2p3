<?php
    # Define global variables
    $errors = array();


    function db()
    { // Connect to the MySQL database
    $db = new mysqli('localhost', 'root', '', 'rocmemo');

    // Checks the connection
    if($db -> connect_errno)
    {
        echo "Connection failed " . $db -> connect_error;
        array_push($errors, "The database has ran into a critical problem.");
        echo $errors;
        exit();
    }

    // Return the database
    return $db;
    }

    function getScore()
    {   // Connect to the SQL database
        $db = db();

        $data = 'SELECT * from highscores ORDER BY `time` ASC, `clicks` ASC LIMIT 8';
        $result = $db->query($data) or die($db->error);
        // Insert all stored data into the database
        $score = $result->fetch_all(MYSQLI_ASSOC);
        // Check if there are any objects in the database
        if (count($score) > 0)
        { // Loop through all the highscores and print them out into the leaderboard
        foreach($score as $point) 
        {
            echo "<div class='leaderboard-username'>" . $point["username"] . "</div>" . " ";
            echo "<div class='leaderboard-time'>" . $point["time"] . " seconds" ."</div>" . " ";
            echo "<div class='leaderboard-score'>" . $point["clicks"] . " clicks" . "</div>" . "<br>";
        }
        } else
        { // If there are no highscores to display in the leaderboard
            echo "No highscores yet! Be the first one by playing a match.";
        }
    }
?>
