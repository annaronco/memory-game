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


const cardsContainer = document.querySelector('.deck');
cardsContainer.innerHTML = '';

/* Set moves counter */

let moveCounter = 0;

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
    };
}

/* display score dialog */

function displayScore() {
    alert("you won!");
}

/* Create cards with icons */
/* Game moves */

for (let i = 0; i < cards.length; i++) {

    const card = document.createElement('li');
    const icon = document.createElement('i');

    card.classList.add('card');
    icon.classList.add('fa', 'fa-' + cards[i].name);

    cardsContainer.appendChild(card);
    card.appendChild(icon);

    /* Set event listener on the card and call an outside openCard function */

    card.addEventListener('click', function() {
        if (openedCards.length > 1) {
            return;
        } else {
            /* check if openedCards arrey has an even number of cards */
            openCard(this);
            openedCards.push(this);
            if (openedCards.length % 2 === 0) {
                /* check if last 2 cards are the same */
                if ((openedCards[openedCards.length - 1].innerHTML == openedCards[openedCards.length - 2].innerHTML) && (openedCards[openedCards.length - 1].lastChild != openedCards[openedCards.length - 2].lastChild)) {
                    this.removeEventListener('click', function(){});
                    matchCard(this);
                    matchCard(openedCards[openedCards.length - 2]);
                    matchedCards.push(this);
                    matchedCards.push(openedCards[openedCards.length - 2])
                    openedCards.pop();
                    openedCards.pop();
                    addMove();
                } else {
                    for (i = 0; i < openedCards.length; i++) {
                        console.log("card " + openedCards.length + " " + openedCards[i].innerHTML + " " + i )
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
                }
                setTimeout(
                    function() {
                        if (openedCards.length === 16) {
                            displayScore();
                        };
                    }, 2000);
            }
        });
    };

    /*

    /*
    * Display the cards on the page
    *   - shuffle the list of cards using the provided "shuffle" method below
    *   - loop through each card and create its HTML
    *   - add each card's HTML to the page
    */

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


    /*
    * set up the event listener for a card. If a card is clicked:
    *  - display the card's symbol (put this functionality in another function that you call from this one)
    *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    *  - if the list already has another card, check to see if the two cards match
    *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
    *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
    *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
    *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
    */
