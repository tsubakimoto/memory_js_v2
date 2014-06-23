var cards = [],
    CARD_NUN = 4,
    currentNum,
    openedCard,
    correctNum = 0,
    enableFlip = true,
    score = 0,
    timerId;

interface ICard {
    button: HTMLInputElement;
    value: string;
    Initialize(num: number);
    Flip();
}

class Card implements ICard {
    button: HTMLInputElement;
    value: string;

    constructor(num: number) {
        this.Initialize(num);
    }

    Initialize(num: number) {
        var card = document.createElement('input');
        card.type = 'button';
        card.value = '?';
        card.dataset.num = num;
        card.onclick = () => {
            this.Flip();
        }
        this.button = card;
    }

    Flip() {
        if (!enableFlip || this.button.value != '?') {
            return;
        }
        this.button.value = this.button.dataset.num;
        if (typeof currentNum === 'undefined') {
            openedCard = this.button;
            currentNum = this.button.dataset.num;
        } else {
            Judge(this.button);
            currentNum = undefined;
        }
    }
}

function InitCards() {
    var cardIndex;
    var stage = document.getElementById('stage');

    for (var i = 0; i < CARD_NUN; i++) {
        var num = Math.floor(i / 2);
        do {
            cardIndex = Math.floor(Math.random() * CARD_NUN);
        } while (typeof cards[cardIndex] !== 'undefined');
        cards[cardIndex] = new Card(num).button;
    }
    for (var j = 0; j < CARD_NUN; j++) {
        stage.appendChild(cards[j]);
        if (j % Math.sqrt(CARD_NUN) == (Math.sqrt(CARD_NUN) - 1)) {
            stage.appendChild(document.createElement('br'));
        }
    }
}

function Judge(card: HTMLInputElement) {
    if (currentNum == card.dataset.num) {
        // 正解
        correctNum++;
        if (correctNum == CARD_NUN / 2) {
            clearTimeout(timerId);
            alert("your score is " + document.getElementById('score').innerHTML);
        }
    } else {
        // 不正解
        enableFlip = false;
        setTimeout(function () {
            openedCard.value = '?';
            card.value = '?';
            enableFlip = true;
        }, 700);
    }
}

function RunTimer() {
    document.getElementById('score').innerHTML = (score++).toString();
    timerId = setTimeout(() => {
        RunTimer();
    }, 10);
}

window.onload = () => {
    InitCards();
    RunTimer();
}
