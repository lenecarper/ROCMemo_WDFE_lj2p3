<!DOCTYPE html>
<html lang="en">
<!--  -->
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MemoROCy Match</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet prefetch" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
    <link rel="stylesheet" href="style/style.css">
</head>
<body>
    <div class="modal fade" id="winnerModal" tabindex="-1" role="dialog" aria-labelledby="winnerModal-label">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="winnerModal-label">You won!</h4><br>
                    <form method="POST" action="index.php">
                        <input type="text" name="username" id="username-form" placeholder="Username">
                        <input type="submit" value="Submit to leaderboard" name="submit" id="submit-form">
                    </form>
                </div>
                <div class="modal-body">
                    <p id="winnerText"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" onclick="init(), $rating.removeClass('fa-star-o').addClass('fa-star'); " class="btn btn-default" data-dismiss="modal">Save & Replay</button>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <h1>ROC Memory Match</h1>
        <section class="score-panel">
            <ul class="stars">
                <li>
                    <i class="fa fa-star"></i>
                </li>
                <li>
                    <i class="fa fa-star"></i>
                </li>
                <li>
                    <i class="fa fa-star"></i>
                </li>
            </ul>
            <span class="moves">0</span> Moves | Time:
            <span class="timer">0</span> s
            <div class="restart">
                <i class="fa fa-repeat"></i>
            </div>
        </section>
        <ul class="deck"></ul>
    </div>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js'></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
        crossorigin="anonymous"></script>
    <script src="inc/game.js"></script>
</body>

</html>