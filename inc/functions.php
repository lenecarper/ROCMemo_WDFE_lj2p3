<?php
    function db()
    { // Connect to the MySQL database
    $mysqli = new mysqli('localhost', 'root', '', 'rocmemo');

    // Checks the connection
    if($mysqli -> connect_errno)
    {
        echo "Connection failed " . $mysqli -> connect_error;
        exit();
    }

    // Return the database
    return $mysqli;
    }

    # Function to retrieve and upload the data into the database
    function uploadScore()
    {
    # Define variables to store data in and connect to the SQL database
    $db = mysqli_connect('localhost', 'root', '', 'rocmemo');
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $time = mysqli_real_escape_string($db, "Time here");
    $score = mysqli_real_escape_string($db, "Score here");
    # Gather all the data into an SQL query
    $upload = "INSERT into highscores (username, time, clicks) VALUES ($username, $time, $score)";
    # Query the data to be sent into the corresponding database tables
    $query = $db->query($upload) or die($db->error);
    }
?>