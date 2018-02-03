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
};

function matchCard(card) {
    card.removeEventListener('click', function(){});
    card.classList.add('match');
}

function errorCard(card) {
    card.classList.add('error');
}

function closeCard(card) {
    card.classList.remove('open', 'show', 'error')
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

let moves = document.querySelector('span.moves');
moves.innerText = "0";

function addMove() {
    moveCounter += 1;
    moves.innerText = moveCounter;
}

/* remove stars */

function removeStar() {
    let star = document.querySelector('.stars li');
    if (moveCounter % 5 === 0 && moveCounter !== 0) {
        star.parentNode.removeChild(star);
        starCounter -= 1;
    };
}

/* display score dialog */

const scoreModal = document.getElementById("overlay");

function displayScore() {
    document.querySelector('span.total-moves').innerHTML = moveCounter;
    document.querySelector('span.total-stars').innerText = starCounter;
    scoreModal.style.visibility = "visible";
}

function closeScore() {
    scoreModal.style.visibility = "hidden";
}

/* Measure time*/

let seconds = 0;
let minutes = 0;
let zeroSeconds = 0;

function timer() {
    if (seconds < 59) {
        seconds++;
    } else {
        minutes++;
        seconds = 0;
    }

    if (seconds < 10) {
        zeroSeconds = "0";
    } else {
        zeroSeconds = "";
    }

    if (minutes < 10) {
        zeroMinutes = "0";
    } else {
        zeroMinutes = "";
    }

    document.querySelector('span.time').innerText = zeroMinutes + minutes + " : " + zeroSeconds + seconds;

    if (minutes === 0) {
        document.querySelector('span.total-time').innerText = seconds + " seconds";
    } else if (minutes != 0 && seconds === 0) {
        document.querySelector('span.total-time').innerText = minutes + " minutes";;
    } else if (minutes != 0 && seconds === 1) {
        document.querySelector('span.total-time').innerText = minutes + " minutes and " + seconds + " second";
    } else {
        document.querySelector('span.total-time').innerText = minutes + " minutes and " + seconds + " second";
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
            if ((openedCards[openedCards.length - 1].innerHTML == openedCards[openedCards.length - 2].innerHTML) && (openedCards[openedCards.length - 1].lastChild != openedCards[openedCards.length - 2].lastChild)) {
                matchCard(this);
                matchCard(openedCards[openedCards.length - 2]);
                disableClick();
                matchedCards.push(this);
                matchedCards.push(openedCards[openedCards.length - 2])
                openedCards.pop();
                openedCards.pop();
                addMove();
            } else {
                for (i = 0; i < openedCards.length; i++) {
                }
                errorCard(openedCards[openedCards.length - 1]);
                errorCard(openedCards[openedCards.length - 2]);
                setTimeout(
                    function() {
                        closeCard(openedCards[openedCards.length - 1]);
                        closeCard(openedCards[openedCards.length - 2]);
                        openedCards.pop();
                        openedCards.pop();
                    }, 2000);
                    addMove();
                    removeStar();
                }
                /* Display scores */
                if (matchedCards.length === 2) {
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
    icon.classList.add('fa', 'fa-' + cards[i].name);

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
