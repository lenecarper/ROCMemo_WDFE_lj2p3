// Array of card objects
let objects = ['paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'bomb', 'bomb', 'diamond', 'diamond', 'book', 'book', 'phone', 'phone'],

    // HTML selectors
    $container = $('.container'),
    $scorePanel = $('.score-panel'),
    $rating = $('.fa-star'),
    $moves = $('.moves'), $timer = $('.timer'), $restart = $('.restart'), $deck = $('.deck'), $time = initTime();

    // Declare variables
    nowTime, allOpen = [], match = 0, second = 0, moves = 0, wait = 840, totalCard = objects.length / 2,

    // Rating system with stars
    stars3 = 18,
    stars2 = 20,
    star1 = 22;

// Shuffle the cards in a random array to prevent card repetition
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Initialize the cards when the webpage loads
function init() {

    // Remove this after debugging
    // $('#winnerModal').modal('toggle');

    // Shuffle the cards to randomize card placement
    let allCards = shuffle(objects);
    $deck.empty();

    // Initialize the game with no matches and no moves
    match = 0;
    moves = 0;
    $moves.text('0');

    // Loop until 20 cards are created along with the values of the card objects
    for (let i = 0; i < allCards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
    }
    addCardListener();

    // Resets the timer to 0 when the restart button is clicked
    resetTimer(nowTime);
    second = 0;
    // Display the current time, counting up from zero, initialize time on load
    $timer.text(`${second}`)
    initTime();
    saveScore();
}

// Score system with stars, the player starts with 3 stars which degrade with extra moves
function rating(moves) {
    // Store the current rating in a dynamic variable
    let rating = 3;
    // Check whether the player has gone past the move limit and add/remove stars accordingly
    if (moves > stars3 && moves < stars2) {
        $rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > stars2 && moves < star1) {
        $rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > star1) {
        $rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rating = 1;
    }
    // Return the score and rating
    return { score: rating };
}

// Show a Bootstrap modal with the player's statistics after the player matches all the cards
function gameOver(moves, score) {
    // Parse the div with the "winnerText" ID with the content of the time, moves and score
    $('#winnerText').text(`In ${second} seconds, you did a total of ${moves} moves with a score of ${score}. Well done!`);
    $('#winnerModal').modal('toggle');
    // save to db (call ajax function)
    saveScore(moves, score);

}

// Restarts the game when the reset button is clicked, confirm the click came from the user
$restart.bind('click', function (confirmed) {
    if (confirmed) {
        $rating.removeClass('fa-star-o').addClass('fa-star');
        init();
    }
});

// This function allows each card to be validated that is an equal match to another card that is clicked on to stay open.
// If cards do not match, both cards are flipped back over.
let addCardListener = function () {

    // With the following, the card that is clicked on is flipped
    $deck.find('.card').bind('click', function () {
        let $this = $(this);

        if ($this.hasClass('show') || $this.hasClass('match')) { return true; }

        let card = $this.context.innerHTML;
        $this.addClass('open show');
        allOpen.push(card);

        // Compares cards if they matched
        if (allOpen.length > 1) {
            if (card === allOpen[0]) {
                $deck.find('.open').addClass('match');
                setTimeout(function () {
                    $deck.find('open').removeClass('open show');
                }, wait);
                match++;

            // If cards are not matched, there is a delay before the cards will turn back cover up
            } else {
                $deck.find('.open').addClass('notmatch');
                setTimeout(function () {
                    $deck.find('.open').removeClass('open show');
                }, wait / 1.5);
            }

            // The allOpen array specifies all added cards facing up
            allOpen = [];

            // Increments the number of moves by one only when two cards are matched or not matched
            moves++;

            // The number of moves is added to the rating() function that will determine the star score
            rating(moves);

            // The number of moves are added to the modal HTML alert
            $moves.html(moves);
        }

        // The game is finished once all cards have been matched, with a short delay
        if (totalCard === match) {
            rating(moves);
            let score = rating(moves).score;
            setTimeout(function () {
                gameOver(moves, score);
            }, 500);
        }
    });
}

// Initiates the timer as soon as the game is loaded
function initTime() {
    nowTime = setInterval(function () {
        $timer.text(`${second}`)
        second = second + 1
    }, 1000);
}

// Resets the timer when the game ends or is restarted
function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}

function saveScore(moves, score)
{
    // console.log(a, b);
    console.log('Listening for new inputs');
    // ajax call
    $.ajax('index.php', {
        type: 'POST',  // http method
        data: "Data to submit goes here",  // data to submit
        success: function (data, status, xhr) {
            // $('p').append('status: ' + status + ', data: ' + data);
            console.log('moves: ' + moves + ' score: ' + score + ' time: ' + `${second}`);
        },
        error: function (jqXhr, textStatus, errorMessage) {
                // $('p').append('Error' + errorMessage);
                console.log('Error: ' + errorMessage);
        }
    });
}

init();