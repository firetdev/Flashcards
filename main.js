class Card {
    constructor(english, hebrew) {
        this.english = english;
        this.hebrew = hebrew;
    }
}

let cards = [];
let currentCard = null;
let cardSide = 0;
let flipped = false;

function flip() {
    cardSide == 0 ? cardSide = 1 : cardSide = 0;
    document.getElementById('cardtxt').style.transform = 'rotateY(180deg)';
    displayCard();
}

function flipAll() {
    flipped ? flipped = false : flipped = true;
    displayCard();
}

function displayCard() {
    if (currentCard == null)
        return;
    let ourCardSide = cardSide;
    if (flipped)
        ourCardSide == 0 ? ourCardSide = 1 : ourCardSide = 0;
    if (ourCardSide == 0)
        document.getElementById('cardtxt').textContent = cards[currentCard].hebrew;
    else
        document.getElementById('cardtxt').textContent = cards[currentCard].english;
}

function nextCard() {
    currentCard++;
    cardSide = 0;
    if (currentCard >= cards.length) {
        currentCard = 0;
        alert('Card cycle complete!');
    }
    displayCard();
}

function getCards() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            readStringByLine(request.responseText);
        }
    };
    request.open('POST', 'getCards.php', true);
    request.send();
}

function readStringByLine(inputString) {
    const lines = inputString.split('\n');
    lines.forEach((line, index) => {
        parseLine(line);
    });
}

function parseLine(input) {
    let [text1, text2] = input.split(':');
    let duplicate = false;
    for (let i = 0; i < cards.length; i++) {
        if (text1 == cards[i].english && text2 == cards[i].hebrew)
            duplicate = true;
    }
    if (text1 != '' && text1 != null && !duplicate)
        cards.push(new Card(text1, text2));
}

function addCard() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(request.responseText);
        }
    };
    request.open('POST', 'backend.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let data = `english=${encodeURIComponent(document.getElementById('anglit').value)}&hebrew=${encodeURIComponent(document.getElementById('ivrit').value)}`;
    request.send(data);
    document.getElementById('anglit').value = '';
    document.getElementById('ivrit').value = '';
    window.setTimeout('init(false)', '2000');
}

function removeCard(index) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(request.responseText);
        }
    };
    request.open('POST', 'removeCard.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let data = `index=${encodeURIComponent(index)}`;
    request.send(data);
    let prevCardsLength = cards.length;
    cards = [];
    if (currentCard < prevCardsLength - 1)
        window.setTimeout('init(false)', '2000');
    else
        window.setTimeout('init(true)', '2000');
}

function endFlip() {
    document.getElementById('cardtxt').style.transform = 'rotateY(0deg)';
    document.getElementById('card').classList.remove('animationClass');
}

function flipAnim() {
    document.getElementById('card').classList.add('animationClass');
    window.setTimeout('endFlip()', '300');
}

document.getElementById('delete').addEventListener('click', function() {
    removeCard(currentCard);
    displayCard();
});

document.getElementById('flip').addEventListener('click', function() {
    flipAll();
});

document.getElementById('next').addEventListener('click', function() {
   nextCard();
});

document.getElementById('addCard').addEventListener('click', function() {
    addCard();
});

document.getElementById('card').addEventListener('click', function() {
    window.setTimeout('flip()', '165');
    flipAnim();
});

function init2(loading) {
    if (cards.length > 0) {
        if (loading)
            currentCard = 0;
    }
    displayCard();
}

function init(loading) {
    getCards();
    window.setTimeout(`init2(${loading})`, '2000');
}

window.setTimeout('init(true)', '1000');