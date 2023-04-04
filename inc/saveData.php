<?php
    # Function to retrieve and upload the data into the database
    function uploadScore()
    {
        // is there a post request?
        if($_SERVER['REQUEST_METHOD'] == "POST")
        {            
            # Define variables to store data in and connect to the SQL database
            $db = db();

            // FOR DEBUGGING: Do not use $username variables, use AJAX variables instead
            // ^ shit brokey lol
            $username = mysqli_real_escape_string($db, $_POST['username']);
            // $time = mysqli_real_escape_string($db, $_POST['username']);
            // $score = mysqli_real_escape_string($db, $_POST['username']);
            # Gather all the data into an SQL query
            if (isset($_POST['username']))
            {
                $upload = "INSERT into highscores (`username`, `time`, `clicks`) VALUES ('$username', `time`, clicks)";
                # Query the data to be sent into the corresponding database tables
                $query = $db->query($upload) or die($db->error);
                // header("location:index.php");
            } else
            {
                die($db->error);
            }
        }
    }
?>
