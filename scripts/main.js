const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const dealButton = document.getElementById('deal-button');
const messageBox = document.getElementById('messages');

const deck = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
let isGameOn = false;

let playerPoints = 0;
let dealerPoints = 0;
let playerHandArr = [];
let dealerHandArr = [];



const makeDeck = (rank, suit) => {
  const card = {
    rank: rank,
    suit: suit,
    pointValue: rank > 10 ? 10 : rank,
  };
  deck.push(card);
};

for (let suit of suits) {
  for (const rank of ranks) {
    makeDeck(rank, suit);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Execute after page load
});

function getRandomCard (){
  const randomNum = Math.floor(Math.random() * (deck.length));
  const card = deck[randomNum]
  console.log(deck.length);
  return card;
}

function addCardToPlayerDeck (card){
  let rank = card.rank;
  const suit = card.suit;
  const newImgTag = document.createElement('img');
  newImgTag.src = `images/${rank}_of_${suit}.png`;
  playerHand.appendChild(newImgTag);
  playerHandArr.push(card);
  deck.pop(card);


}
function addCardToDealerDeck (card){
  let rank = card.rank;
  const suit = card.suit;
  const newImgTag = document.createElement('img');
  newImgTag.src = `images/${rank}_of_${suit}.png`;
  dealerHand.appendChild(newImgTag);
  dealerHandArr.push(card);
  deck.pop(card);

}

function updatePoints (cardArr){
  totalPoints = 0;
  cardArr.forEach(card => {
    if(card.pointValue < 10){
      totalPoints += card.pointValue;
    }else if(card.pointValue === 'ace'){
      totalPoints += 11;
    }else{
      totalPoints += 10;
    } 
  });
  return totalPoints;
}

dealButton.addEventListener('click', (e) => {
  isGameOn = true;
  addCardToPlayerDeck(getRandomCard());
  addCardToPlayerDeck(getRandomCard());
  addCardToDealerDeck (getRandomCard());
  addCardToDealerDeck (getRandomCard());
  dealerPoints = updatePoints(dealerHandArr);
  playerPoints = updatePoints(playerHandArr);
  if(dealerPoints == 21){
    messageBox.textContent = "Black Jack! Dealer Won!";
    isGameOn = false;
  }else if (playerPoints == 21){
    messageBox.textContent = "Black Jack! You Won!";
    isGameOn = false;
  }else{
    messageBox.textContent = "Your point is " + playerPoints + ", Hit or stand?"
  }
})

hitButton.addEventListener('click', )







