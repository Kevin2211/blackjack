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


//Function that makes a card with rank and suit as paramaters
const makeDeck = (rank, suit) => {
  const card = {
    rank: rank,
    suit: suit,
    pointValue: rank > 10 ? 10 : rank,
  };
  deck.push(card);
};

//when called, this function will generate a deck with 52 cards
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
});


//returns a random card with the deck
function getRandomCard (){
  const randomNum = Math.floor(Math.random() * (deck.length));
  const card = deck[randomNum]
  return card;
}

//adds a card to the player's hand, and remove that card from the deck
function addCardToPlayerHand (card){
  let rank = card.rank;
  const suit = card.suit;
  const newImgTag = document.createElement('img');
  newImgTag.src = `images/${rank}_of_${suit}.png`;
  playerHand.appendChild(newImgTag);
  playerHandArr.push(card);
  deck.pop(card);

}
//adds a card to the dealer's hand, and remove that card from the deck
function addCardToDealerHand (card){
  let rank = card.rank;
  const suit = card.suit;
  const newImgTag = document.createElement('img');
  newImgTag.src = `images/${rank}_of_${suit}.png`;
  dealerHand.appendChild(newImgTag);
  dealerHandArr.push(card);
  deck.pop(card);

  // if(dealerHandArr.length >= 3){
  //   dealerHand.firstElementChild.src = `images/${dealerHandArr[0].rank}_of_${dealerHandArr[0].suit}.png`
  // }
}

//When called, this function will return a total value in the player's/dealer's hand
function updatePoints (cardArr, points){
  totalPoints = 0;
  cardArr.forEach(card => {
    if(card.pointValue < 10){
      totalPoints += card.pointValue;
    }
    else if(card.pointValue == 'ace' && points > 10){
      totalPoints += 1;
    }
    else if(card.pointValue == 'ace' ){
      totalPoints += 11;
    }
    else{
      totalPoints += 10;
    } 
  });
  return totalPoints;
}

dealButton.addEventListener('click', (e) => {
  //If the game is ended, this will reset the deck and make a new game
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
  //adds 2 cards to each player's hand
  if(isGameOn == false){
    isGameOn = true;
    addCardToPlayerHand(getRandomCard());
    addCardToPlayerHand(getRandomCard());
    addCardToDealerHand (getRandomCard());
    addCardToDealerHand (getRandomCard());
    dealerPoints = updatePoints(dealerHandArr);
    playerPoints = updatePoints(playerHandArr);
    if(dealerPoints == 21 && playerPoints ==21){
      messageBox.textContent = "Push";
      isGameOn = false;

    }else if(dealerPoints == 21){
      messageBox.textContent = "Black Jack! Dealer Won!";
      isGameOn = false;

    }
    else if (playerPoints == 21){
      messageBox.textContent = "Black Jack! You Won!";
      isGameOn = false;
    }
    else{
      messageBox.textContent = "Your hand value is " + playerPoints + ", Hit or stand?"
    }
  }
})

hitButton.addEventListener('click', (e) => {
  if(playerHandArr.length != 0 && isGameOn == true){
    addCardToPlayerHand(getRandomCard());
    playerPoints = updatePoints(playerHandArr, playerPoints);
    playerPoints = updatePoints(playerHandArr, playerPoints);
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
      while(dealerPoints < 16 || dealerPoints < playerPoints){
        addCardToDealerHand(getRandomCard());
        dealerPoints = updatePoints(dealerHandArr, dealerPoints);
        dealerPoints = updatePoints(dealerHandArr, dealerPoints);
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
    console.log(dealerHand.firstChild.src);
  })






// //  if(dealerHandArr.length >= 3){
//   dealerHand.firstElementChild.src = `images/${dealerHandArr[0].rank}_of_${dealerHandArr[0].suit}.png`
// }


