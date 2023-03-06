// Card objects
let objects = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'],

    // HTML selectors
    $container = $('.container'),
    $scorePanel = $('.score-panel'),
    $rating = $('.fa-star'),
    $moves = $('.moves'), $timer = $('.timer'), $restart = $('.restart'), $deck = $('.deck'),

    // Variables
    nowTime, allOpen = [], match = 0, second = 0, moves = 0, wait = 420, totalCard = objects.length / 2,

    // Rating system with stars
    stars3 = 14,
    stars2 = 16,
    star1 = 20;

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

    // Shuffle the card objects stated earlier with the shuffle function
    let allCards = shuffle(objects);
    $deck.empty();

    // Initialize the game with no matches and no moves
    match = 0;
    moves = 0;
    $moves.text('0');

    // Loop until 16 cards are created along with the values of the card objects
    for (let i = 0; i < allCards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
    }
    addCardListener();

    // Resets the timer to 0 when the function is called
    resetTimer(nowTime);
    second = 0;
    $timer.text(`${second}`)
    initTime();
}

// Score system with stars, the player starts with 3 stars which deplete with extra moves
function rating(moves) {
    let rating = 3;
    if (moves > stars3 && moves < stars2) {
        $rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > stars2 && moves < star1) {
        $rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > star1) {
        $rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rating = 1;
    }
    // Return the score
    return { score: rating };
}

// Show a bootstrap modal with the player's statistics after the player matches all the cards
function gameOver(moves, score) {
    $('#winnerText').text(`In ${second} seconds, you did a total of ${moves} moves with a score of ${score}. Well done!`);
    $('#winnerModal').modal('toggle');
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

                // If cards are not matched, there is a delay of 630ms, and the cards will turn back cover up.
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

init();