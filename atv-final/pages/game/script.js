const NUM_MAX_CARDS = 6
const NUM_TUPLE = 2

const Cards = [[1,
  {
    id: 1,
    source: "https://s.yimg.com/ny/api/res/1.2/cigp9yyCrR5JNGWlhbNZHw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNg--/https://s.yimg.com/os/creatr-uploaded-images/2021-08/86739d70-f5e2-11eb-b57d-7f9e606ab895"
  }], [2,

  {
    id: 2, source: "https://www.canoas.rs.gov.br/wp-content/uploads/2021/07/ArteMateria_fakenews_02julho-380x200.png",
  }], [3,

  {
    id: 3,
    source: "http://www.rbsdirect.com.br/imagesrc/24368881.jpg?w=640",
  }], [4,

  {
    id: 4, source: "https://thumb9.shutterstock.com/display_pic_with_logo/2861395/527382235/stock-vector-cats-heads-emoticons-vector-527382235.jpg",
  }]
]

class Card {
  constructor(id, sourceFront) {

    this.liCard = this.renderCard(id)

    this.back = this.liCard.querySelector(".card-back")
    this.front = this.liCard.querySelector(".card-front")
    this.sourceFront = sourceFront

    this.isBack = true
    this.enabled = true
  }

  flip() {
    if (this.enabled == true) {
      this.front.src = this.sourceFront
      this.back.classList.toggle("card-back-flip")
      this.front.classList.toggle("card-front-flip")
      this.enabled = false
      this.isBack = false
      return true;
    }
    return false;
  }

  cover() {
    this.enabled = true
    this.isBack = true
    this.back.classList.toggle("card-back-flip")
    this.front.classList.toggle("card-front-flip")
    this.front.src = this.back.src
  }

  say(say) {
    this.front.classList.toggle("card-front-" + say)
  }

  renderCard(id) {
    const src = "../../img/logo.jpg"
    let cardBack = document.createElement('img')
    cardBack.className = "card-back"
    cardBack.src = src

    let cardFront = document.createElement('img')
    cardFront.className = "card-front"
    cardFront.src = src

    let divCard = document.createElement('div')
    divCard.className = "card"
    divCard.appendChild(cardBack)
    divCard.insertBefore(cardFront, cardBack)

    let li = document.createElement('li')
    li.id = "card" + id
    li.className = "flex-item"
    li.appendChild(divCard)

    return li
  }
}

class Game {
  constructor(onEndGame, elCanvas) {
    this.cards = new Map()
    this.cardsSelected = new Array()
    this.onEndGame = onEndGame.bind(this)
    this.numTuplesOK = 0
    this.numClicks = 0
    this.resultArray = ["Você foi bem", "Mediano", "Você não se saiu bem"]
    this.elCanvas = elCanvas
    this.shuffleNum = [];
  }

  init() {
    let cardsMap = new Map(Cards);
    this.shuffle()
    this.cleanCanvas()

    for (let i = 0; i < this.shuffleNum.length; i++) {
      let num = (this.shuffleNum[i] % (NUM_MAX_CARDS / NUM_TUPLE)) + 1
      let card = cardsMap.get(num)
      let cardg = new Card(i, card.source)
      this.addCard(i, cardg)
    }
  }

  addCard(id, card) {
    card.liCard.addEventListener('click', this.onClick.bind(this, card))
    this.cards.set(id, card)
    this.elCanvas.appendChild(card.liCard)
  }

  onClick(card) {
    let flip = false
    if (this.cardsSelected.length < NUM_TUPLE) {
      if (card.flip()) {
        this.cardsSelected.push(card)
        this.numClicks++
      }
      if (this.cardsSelected.length == NUM_TUPLE) {
        this.enabledCards(false)
        if (!this.checkTupla()) {
          setTimeout(() => this.coverCards(), 1700)
          this.cardsSay("no", 1500)
          setTimeout(() => this.enabledCards(true), 2000)
          setTimeout(() => { this.cardsSelected = new Array() }, 2000)
        }
        else {
          setTimeout(() => this.enabledCards(true), 800)
          this.cardsSay("yes", 600)
          setTimeout(() => { this.cardsSelected = new Array() }, 700)

          this.numTuplesOK++
          if (this.numTuplesOK === NUM_MAX_CARDS / NUM_TUPLE)
            setTimeout(() => { this.endGame() }, 1000)
        }
      }
    }
  }

  checkTupla() {
    if (this.cardsSelected.length > 0) {
      let srcFilter = this.cardsSelected[0].sourceFront
      let ce = this.cardsSelected.filter(card => card.sourceFront === srcFilter)
      return ce.length === this.cardsSelected.length
    }
    return false
  }


  cardsSay(say, delay) {
    this.cardsSelected.forEach(function (card) {
      setTimeout(() => card.say(say), delay - 350)
      setTimeout(() => card.say(say), delay)
    })
  }

  coverCards() {
    this.cardsSelected.forEach(function (card) {
      card.cover()
    })
  }

  enabledCards(value) {
    this.cards.forEach(function (card) {
      if (card.isBack)
        card.enabled = value
    })
  }

  endGame() {
    let numClicksMin = NUM_MAX_CARDS
    let resultIndex = this.resultArray.length - 1

    if (this.numClicks === numClicksMin)
      resultIndex = 0

    if (this.numClicks > numClicksMin && this.numClicks <= numClicksMin * 2)
      resultIndex = 1

    if (this.numClicks >= numClicksMin * 2)
      resultIndex = 2

    this.onEndGame(this.resultArray[resultIndex], this.numClicks)
  }

  cleanCanvas() {
    while (this.elCanvas.firstChild) {
      this.elCanvas.removeChild(this.elCanvas.firstChild);
    }
  }

  randomNum(min, max) { return Math.round(Math.random() * (max - min) + min) }

  shuffle() {
    this.shuffleNum = [];
    for (var i = 0; i < NUM_MAX_CARDS; i++) {
      var num = this.randomNum(1, NUM_MAX_CARDS);
      console.log(num)
      if (this.shuffleNum.indexOf(num) >= 0) {
        i = i - 1;
      } else {
        this.shuffleNum[i] = num;
      }
    }
  }
}


function startGame() {
  let cards = document.getElementById("cards");
  let game = new Game(endGame, cards)
  game.init()
}

function playNow() {
  land.classList.toggle("land-hide");
  startGame();
}

function playAgain() {
  result.classList.toggle("land-hide");
  startGame();
}

function endGame(resultGame, score) {
  document.getElementById('result-msg').innerHTML = resultGame + " - " + score + " Clicks";
  result.classList.toggle("land-hide");
}

