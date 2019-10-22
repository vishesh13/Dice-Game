var scores, roundScore, activePlayer, gamePlaying;

var prev;
//Initialize Game to default status
init();

/**
 * Select next active player
 */
function nextPlayer() {
    //document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.toggle('active', false);
    document.querySelector('.player-1-panel').classList.toggle('active', false);
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prev = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-' + activePlayer +'-panel').classList.toggle('active', true);
    //Dice img set to none
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('#rollDice').addEventListener('click', function() {
    if(gamePlaying) {
    //1. Random number generation for dice roll result.
    var dice = Math.floor(Math.random() * 6) + 1;
    //2. Set dice display based on dice value.
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    //3. Select image.
    diceDOM.src = 'images/' + 'dice-' + dice + '.png'; 
    
    //player looses his ENTIRE score when he rolls two 6 in a row.
    
    if(dice !==1) {
        if(dice === 6 && prev === 6) {
            //choose next player.
            nextPlayer();
            prev = dice;
        } else {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        prev = dice;
        }
    } else {
        //choose next player.
        nextPlayer();
    }
}
});

document.querySelector('#hold').addEventListener('click', function() {
    if(gamePlaying) {
        //Add current score to Global score
        scores[activePlayer] += roundScore;
        
        //Update the Ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if(scores[activePlayer]>= document.getElementById('SCORE_INPUT').value) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.getElementById('NEW_GAME_BUTTON').addEventListener('click', init);

function init() {
    //Set score values to default
    scores = [0,0];
    roundScore = 0; 
    activePlayer = 0;
    gamePlaying = true;
    prev = 0;

    //Dice img set to none
    document.querySelector('.dice').style.display = 'none';

    //Set ui scores to 0.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0'; 
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 0'; 
    document.getElementById('name-1').textContent = 'Player 1';
    //css changes
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
