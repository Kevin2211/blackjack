const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const dealButton = document.getElementById('deal-button');
const messageBox = document.getElementById('messages');

let deck = [];
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
function deckGenerator(){
  deck = [];
  for (let suit of suits) {
    for (const rank of ranks) {
      makeDeck(rank, suit);
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  deckGenerator();
  console.log(deck);
});

function getRandomCard (){
  const randomNum = Math.floor(Math.random() * (deck.length));
  const card = deck[randomNum]
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
  while(deck.length < 52 && isGameOn == false){
    deckGenerator();
    playerPoints = 0;
    dealerPoints = 0;
    playerHandArr = [];
    dealerHandArr = [];
    dealerHand.innerHTML = '';
    playerHand.innerHTML = '';
    console.log(deck.length);
  }
  if(isGameOn == false){
    isGameOn = true;
    addCardToPlayerDeck(getRandomCard());
    addCardToPlayerDeck(getRandomCard());
    addCardToDealerDeck (getRandomCard());
    addCardToDealerDeck (getRandomCard());
    dealerPoints = updatePoints(dealerHandArr);
    playerPoints = updatePoints(playerHandArr);
    if(dealerPoints == 21 && playerPoints ==21){
      messageBox.textContent = "Push";
      isGameOn = false;

    }else if(dealerPoints == 21){
      messageBox.textContent = "Black Jack! Dealer Won!";
      isGameOn = false;

    }else if (playerPoints == 21){
      messageBox.textContent = "Black Jack! You Won!";
      isGameOn = false;

    }else{
      messageBox.textContent = "Your hand value is " + playerPoints + ", Hit or stand?"
    }
  }
})

hitButton.addEventListener('click', (e) => {
  if(playerHandArr.length != 0 && isGameOn == true){
    addCardToPlayerDeck(getRandomCard());
    playerPoints = updatePoints(playerHandArr);
    if(playerPoints > 21){
      messageBox.textContent = "Your hand value is " + playerPoints + ", You busted!"
      isGameOn = false;

    }else if(playerPoints == 21){
      messageBox.textContent = "Your hand value is " + playerPoints;
    }else{
      messageBox.textContent = "Your hand value is " + playerPoints + ", Hit or stand?"
    }
  }
})


  standButton.addEventListener('click', (e) => {

    if(playerPoints < 16){
      messageBox.textContent = "Your hand value is less than 16, you must 'hit'! "
    }else if (isGameOn == true){
      while(dealerPoints < 16){
        addCardToDealerDeck(getRandomCard());
        dealerPoints = updatePoints(dealerHandArr);
      }
      if(dealerPoints > playerPoints && dealerPoints <= 21){
        messageBox.textContent = `Your hand value is ${playerPoints}, dealer hand value is ${dealerPoints}, dealer won!`;
        isGameOn = false;
 
      }else if (dealerPoints == playerPoints){
        messageBox.textContent = `Your hand value is ${playerPoints}, dealer hand value is ${dealerPoints}, push!`;
        isGameOn = false;

      }else{
        messageBox.textContent = `Your hand value is ${playerPoints}, dealer hand value is ${dealerPoints}, you won!`;
        isGameOn = false;

      }
    }
  })








