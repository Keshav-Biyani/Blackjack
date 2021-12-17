let blackjackgame = {
  'you': { 'scorespan': '#black_jack_box1', 'div': 'blackjackcolumn1', 'score': 0 },
  'dealer': { 'scorespan': '#black_jack_box', 'div': 'blackjackcolumn', 'score': 0 },
  'card': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  'cardsvalue': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] }
}
let table = {
  'win': 0, 'lose': 0, 'Draw': 0
}
const YOU = blackjackgame['you'];
const DEALER = blackjackgame['dealer'];
const casino=new Audio('sounds/casino.mp3');
const hitsound = new Audio('sounds/swish.m4a');
const bustsound = new Audio('sounds/lose.wav');
const winsound = new Audio('sounds/cash.mp3');
const losesound = new Audio('sounds/aww.mp3');

document.querySelector("#blackjack_hit").addEventListener('click', blackjackhit);
document.querySelector("#blackjack_deal").addEventListener('click', Replay);

document.querySelector("#blackjack_stand").addEventListener('click', Dealer);
function randomcard() {
  let number = Math.floor(Math.random() * 13);

  return (blackjackgame['card'][number]);
}
let count=0;
function blackjackhit() {
  let card = randomcard();
  showTable();

  showcard(card, YOU);
  // console.log(blackjackgame['cardsvalue'][card]);
  scoreupdate(YOU, card);
  showscore(YOU);
  count++;

  

}
function Replay() {

  // console.log(winner[0]);
  // console.log(winner);
  let yourimg = document.querySelector('#blackjackcolumn1').querySelectorAll('img');
  let delerimg = document.querySelector('#blackjackcolumn').querySelectorAll('img');

  // console.log(yourimg);
  for (let i = 0; i < yourimg.length; i++) {
    // const element = arrayi];
    yourimg[i].remove();

  }
  // yourimg[1].remove();
  for (let i = 0; i < delerimg.length; i++) {

    delerimg[i].remove();

  }
  YOU['score'] = 0;
  DEALER['score'] = 0;
  showscore(DEALER);
  showscore(YOU);
  count=0;

  document.querySelector('#black_jack_play').textContent = "Let's Play!";
  document.querySelector('#black_jack_play').style.color = 'white';
  document.querySelector('#black_jack_play').style.boxShadow='none';
  document.querySelector(DEALER['scorespan']).style.color = 'white';
  document.querySelector(YOU['scorespan']).style.color = 'white';

}
function showcard(card, activeplayer) {
  let cardimage = document.createElement('img');
  cardimage.src = `images/${card}.png`;
  // cardimage.style = 'height:100px';
  cardimage.id='black';
  //   console.log(YOU['div']);
  if (activeplayer['score'] < 21) {
    document.querySelector('#' + activeplayer['div']).appendChild(cardimage);
    hitsound.play();
  }
  else {
    bustsound.play();
  }
}

function scoreupdate(activeplayer, card) {
  if (card === 'A') {
    if (activeplayer['score'] + blackjackgame['cardsvalue'][card][1] < 21) {
      activeplayer['score'] += blackjackgame['cardsvalue'][card][1];
    }
    else {
      activeplayer['score'] += blackjackgame['cardsvalue'][card][0];
    }
  } else {

    activeplayer['score'] += blackjackgame['cardsvalue'][card];
    // console.log(activeplayer['score']);
  }
}
function showscore(activeplayer) {
  if (activeplayer['score'] <= 21) {
    document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score'];
  } else {
    document.querySelector(activeplayer['scorespan']).style = 'color:red';
    document.querySelector(activeplayer['scorespan']).textContent = 'Bust!';
    bustsound.play();

  }

}
function Dealer() {

  let f = Math.floor(Math.random() * 2);
 
  let arr = count;
  console.log(arr);


  for (let i = 0; i < arr; i++) {
    // const element = array[i];
    // console.log(arr[f]);

    let card = randomcard();

    showcard(card, DEALER);
    // console.log(blackjackgame['cardsvalue'][card]);
    scoreupdate(DEALER, card);
    showscore(DEALER);

  }
  // if (arr == 2 && DEALER['score'] <= 13 && DEALER['score'] != 0) {
  //   let card = randomcard();

  //   showcard(card, DEALER);
  //   // console.log(blackjackgame['cardsvalue'][card]);
  //   scoreupdate(DEALER, card);
  //   showscore(DEALER);
  // }
  let winner = winne();
  document.querySelector('#black_jack_play').textContent = winner[0];
  document.querySelector('#black_jack_play').style.color = winner[1];
  document.querySelector('#black_jack_play').style.boxShadow = ` 0px 10px 50px ${winner[1]}`;

  if (winner[0] == 'You win!') {
    table['win'] += 1;
    document.querySelector('#Win').textContent = table['win'];
  }
  else if (winner[0] == 'You lose!') {
    table['lose'] += 1;
    document.querySelector('#lose').textContent = table['lose'];
  }
  else {
    table['Draw'] += 1;
    document.querySelector('#draw').textContent = table['Draw'];
  }
}

function winne() {
  let winner;
  if (YOU['score'] > DEALER['score'] && YOU['score'] <= 21) {
    winner = 'You win!';
    color = 'rgb(6, 248, 6)';
    winsound.play();
  }
  else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
    winner = 'You lose!';
    color = 'red';
    losesound.play();
  }
  else if (DEALER['score'] > 21 && YOU['score'] <= 21) {
    winner = 'You win!';
    color = 'rgb(6, 248, 6)';
    winsound.play();
  }
  else if (DEALER['score'] > YOU['score'] && DEALER['score'] <= 21) {
    winner = 'You lose!';
    color = 'red';
    losesound.play();
  } else if (YOU['score'] > 21 || DEALER['score'] > 21 || DEALER['score'] === YOU['score']) {
    winner = 'Draw';
    color = 'yellow';
  }
  return [winner, color];

}
document.getElementById("b").addEventListener("load",hideTable)
function showTable() {
  document.getElementById('table').style.visibility = "visible";
  
  casino.play();
  
}
function hideTable() {
  document.getElementById('table').style.visibility = "hidden";
  
}

