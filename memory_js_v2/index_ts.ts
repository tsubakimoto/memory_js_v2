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
        alert('flip!');
    }
}

var cards = [],
    CARD_NUN = 16,
    currentNum,
    openedCard,
    correctNum = 0,
    enableFlip = true,
    score = 0,
    timerId;

window.onload = () => {
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
