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

    # Function to retrieve and upload the data into the database
    function uploadScore()
    {
        # Define variables to store data in and connect to the SQL database
        $db = db();
        $username = mysqli_real_escape_string($db, $_POST['username']);
        $time = mysqli_real_escape_string($db, "Time here");
        $score = mysqli_real_escape_string($db, "Score here");
        global $errors;
        # Gather all the data into an SQL query
        if (count($errors) == 0)
        {
            $upload = "INSERT into highscores (username, time, clicks) VALUES ($username, $time, $score)";
            # Query the data to be sent into the corresponding database tables
            $query = $db->query($upload) or die($db->error);
        } else
        {
            array_push($errors, "An error has occured, please try again.");
            echo $errors;
        }
    }

    function getScore()
    {   // Connect to the SQL database
        $db = db();

        $data = 'SELECT * from highscores /*ORDER BY score DESC*/';
        $result = $db->query($data) or die($db->error);
        // Insert all stored data into the database
        $score = $result->fetch_all(MYSQLI_ASSOC);
        // Check if there are any objects in the database
        if (count($score) > 0)
        { // Loop through all the highscores and print them out into the leaderboard
        foreach($score as $point) 
        {
            echo "Highscore";
        }
        } else
        { // If there are no highscores to display in the leaderboard
        echo "No highscores yet! Be the first one by playing a match.";
        }
    }
?>