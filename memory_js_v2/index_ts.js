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
        alert('flip!');
    };
    return Card;
})();

var cards = [], CARD_NUN = 16, currentNum, openedCard, correctNum = 0, enableFlip = true, score = 0, timerId;

window.onload = function () {
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
};
//# sourceMappingURL=index_ts.js.map
