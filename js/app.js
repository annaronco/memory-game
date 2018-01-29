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
let moveCounter = 0;

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
    console.log("the card was clicked");
    card.classList.add('open', 'show');
};

function matchCard(card) {
    console.log("the match function is called")
    card.classList.add('match');
}

function errorCard(card) {
    card.classList.add('error');
}

function closeCard(card) {
    console.log("the card is closed")
    card.classList.remove('open', 'show')
}

function addMove() {
    moveCounter += 1;
    let moves = document.getElementsByClassName('moves');
    moves.innerHTML = "Moves" + moveCounter;
}

/* Create cards with icons */

const cardsContainer = document.querySelector('.deck');
cardsContainer.innerHTML = '';


for (let i = 0; i < cards.length; i++) {

    const card = document.createElement('li');
    const icon = document.createElement('i');

    card.classList.add('card');
    icon.classList.add('fa', 'fa-' + cards[i].name);

    cardsContainer.appendChild(card);
    card.appendChild(icon);

    /* Set event listener on the card and call an outside openCard function */
    card.addEventListener('click', function() {
        /* check if openedCards arrey has an even number of cards */
        openCard(this);
        openedCards.push(this);
        if (openedCards.length % 2 === 0) {
            /* check if last 2 cards are the same */
            if ((openedCards[openedCards.length - 1].innerHTML == openedCards[openedCards.length - 2].innerHTML) && (openedCards[openedCards.length - 1].lastChild != openedCards[openedCards.length - 2].lastChild)) {
                console.log("I like miś!");
                matchCard(this);
                matchCard(openedCards[openedCards.length - 2]);
            } else {
                for (i = 0; i < openedCards.length; i++) {
                    console.log("card " + openedCards.length + " " + openedCards[i].innerHTML + " " + i )
                }
               // errorCard(openedCards[openedCards.length - 1]);
                setTimeout(closeCard(openedCards[openedCards.length - 1]), 2000);
                setTimeout(closeCard(openedCards[openedCards.length - 2]), 2000);
                openedCards.pop();
                openedCards.pop();
            }
            /* Increment the move counter */
            addMove();

        }
    });
};




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
