var cards = [], CARD_NUN = 4, currentNum, openedCard, correctNum = 0, enableFlip = true, score = 0, timerId;

var Card = (function () {
    function Card(num) {
        this.Initialize(num);
    }
    Card.prototype.Initialize = function (num) {
        var _this = this;
        var card = document.createElement('input');
        card.type = 'button';
        card.value = '?';
        card.dataset.num = num;
        card.onclick = function () {
            _this.Flip();
        };
        this.button = card;
    };

    Card.prototype.Flip = function () {
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
    };
    return Card;
})();

function InitCards() {
    var cardIndex;
    var stage = document.getElementById('stage');

    for (var i = 0; i < CARD_NUN; i++) {
        var num = Math.floor(i / 2);
        do {
            cardIndex = Math.floor(Math.random() * CARD_NUN);
        } while(typeof cards[cardIndex] !== 'undefined');
        cards[cardIndex] = new Card(num).button;
    }
    for (var j = 0; j < CARD_NUN; j++) {
        stage.appendChild(cards[j]);
        if (j % Math.sqrt(CARD_NUN) == (Math.sqrt(CARD_NUN) - 1)) {
            stage.appendChild(document.createElement('br'));
        }
    }
}

function Judge(card) {
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
    timerId = setTimeout(function () {
        RunTimer();
    }, 10);
}

window.onload = function () {
    InitCards();
    RunTimer();
};
//# sourceMappingURL=index_ts.js.map
