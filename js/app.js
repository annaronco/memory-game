/* List of card manes */

const names = [
    "diamond",
    "paper-plane-o",
    "anchor",
    "bolt",
    "cube",
    "leaf",
    "bicycle",
    "bomb"
];

/* Generate cards objects and put them in a list */

let cards = [];
let openedCards = [];
let matchedCards = [];

for (let i = 0; i < names.length; i++ ) {
    cards.push({
        name: names[i],
        visible: false
    });

    cards.push({
        name: names[i],
        visible: false
    });
}

cards = shuffle(cards);

/* openCard function */

function openCard(card) {
    card.classList.add('open', 'show');
    card.removeEventListener('click', clickCard);
};

function matchCard(card) {
    card.removeEventListener('click', function(){});
    card.classList.add('match');
}

function errorCard(card) {
    card.classList.add('error');
}

function closeCard(card) {
    card.classList.remove('open', 'show', 'error');
    card.addEventListener('click', clickCard);
}

function reload() {
    location.reload();
}

/* disable click on cards in openedCards */

function disableClick() {
    matchedCards.forEach(function(card) {
        card.removeEventListener('click', clickCard);
    });
    openedCards.forEach(function(card) {
        card.removeEventListener('click', clickCard);
    });
}

const cardsContainer = document.querySelector('.deck');
cardsContainer.innerHTML = '';

/* Set moves counter */

let moveCounter = 0;
let starCounter = 3;

const moves = document.querySelector('span.moves');
moves.innerText = "0";

function addMove() {
    moveCounter += 1;
    moves.innerText = moveCounter;
}

/* remove stars */

function removeStar() {
    const star = document.querySelector('.stars li');
    if (moveCounter === 12 || moveCounter === 16) {
        star.parentNode.removeChild(star);
        starCounter -= 1;
    }
}

/* display score dialog */

const scoreModal = document.getElementById("overlay");

function displayScore() {
    document.querySelector('span.total-moves').innerHTML = moveCounter;
    document.querySelector('span.total-stars').innerText = starCounter;
    if (starCounter === 1) {
        document.querySelector('span.stars').innerText = " star."
    }
    scoreModal.style.visibility = "visible";
}

function closeScore() {
    scoreModal.style.visibility = "hidden";
}

/* Measure time*/

let seconds = 0;
let minutes = 0;

function timer() {
    if (seconds < 59) {
        seconds++;
    } else {
        minutes++;
        seconds = 0;
    }

    let secondsTotal = "00"

    if (seconds === 0) {
        secondsTotal = "00";
    } else if (seconds < 10) {
        secondsTotal = "0" + seconds;
    } else {
        secondsTotal = seconds;
    }

    let minutesTotal = "00"

    if (minutes === 0) {
        minutesTotal = "00";
    } else if (minutes < 10) {
        minutesTotal = "0" + minutes;
    } else {
        minutesTotal = minutes;
    }

    let displayMinutes = ""

    if (minutes === 1) {
        displayMinutes = minutesTotal + " minute";
    } else if (minutes !== 0 && minutes !== 1) {
        displayMinutes = minutesTotal + " minutes"
    }

    let displaySeconds = ""

    if (seconds === 1) {
        displayMinutes = secondsTotal + " second";
    } else if (seconds !== 0 && seconds !== 1) {
        displaySeconds = secondsTotal + " seconds"
    }

    document.querySelector('span.time').innerText = minutesTotal + " : " + secondsTotal;

    if (minutes !== 0 && seconds !== 0) {
        document.querySelector('span.total-time').innerText = displayMinutes + " and " + displaySeconds;
    } else {
        document.querySelector('span.total-time').innerText = displayMinutes + displaySeconds;
    }
}

/* Game moves functionality */
//TODO make one opened card not clickable 2 times

function clickCard() {
    if (openedCards.length > 1) {
        return;
    } else {
        /* check if openedCards array has an even number of cards */
        openCard(this);
        openedCards.push(this);
        if (moveCounter === 0 && openedCards.length === 1) {
            clock = setInterval(timer, 1000);
        };
        if (openedCards.length % 2 === 0) {
            /* check if last 2 cards are the same */
            if ((this.innerHTML == openedCards[0].innerHTML) && (this.lastChild != openedCards[0].lastChild)) {
                matchCard(this);
                matchCard(openedCards[0]);
                disableClick();
                matchedCards.push(this);
                matchedCards.push(openedCards[0])
                openedCards.pop();
                openedCards.pop();
                addMove();
                removeStar();
            } else {
                for (i = 0; i < openedCards.length; i++) {
                }
                errorCard(openedCards[0]);
                errorCard(this);
                setTimeout(
                    function() {
                        closeCard(openedCards[1]);
                        closeCard(openedCards[0]);
                        openedCards.pop();
                        openedCards.pop();
                    }, 2000);
                    addMove();
                    removeStar();
                }
                /* Display scores */
                if (matchedCards.length === 16) {
                    clearInterval(clock);
                    setTimeout(displayScore, 2000);
                }
            }
        };
    }



/* Generate cards and add event listener */

for (let i = 0; i < cards.length; i++) {

    const card = document.createElement('li');
    const icon = document.createElement('i');

    card.classList.add('card');
    icon.classList.add('fa');
    icon.classList.add('fa-' + cards[i].name);

    cardsContainer.appendChild(card);
    card.appendChild(icon);

    card.addEventListener('click', clickCard);
};

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

return array;
}
