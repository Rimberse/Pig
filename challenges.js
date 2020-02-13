/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
CHALLENGES:
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, lastDice, winningScore;

init();

// Setter
// Query Selector, same selector as in CSS, textcontent is for changing text
// document.querySelector('#current-' + activePlayer).textContent = dice;
// Second method of doing the same thing with inner html
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// Getter
// var x = document.querySelector('#score-0').textContent;

// Adding an event listener, arguments are: event, callback function (external or anonymous)
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var dice1DOM = document.querySelector('.dice-1');
        var dice2DOM = document.querySelector('.dice-2');
        dice1DOM.style.display = 'block';
        dice2DOM.style.display = 'block';

        // Visual cues to indicate an unsuccessful roll
        dice1 === 1 || (dice1 === 6 && lastDice === 6) ? dice1DOM.style['border'] = '3px solid #EB4D4D' : dice1DOM.style['border'] = 'none';
        dice2 === 1 ? dice2DOM.style['border'] = '3px solid #EB4D4D' : dice2DOM.style['border'] = 'none';
        
        dice1DOM.src = 'dice-' + dice1 + '.png';
        dice2DOM.src = 'dice-' + dice2 + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice1 === 6 && lastDice === dice1) {
            // Rolling a '6' twice in a row, nullifies the score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            gamePlaying = false;
            setTimeout(nextPlayer, 1500);
        } else if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            lastDice = dice1;
        } else {
            gamePlaying = false;                     // to prevent bugs
            setTimeout(nextPlayer, 1500);            // for visual cues
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    lastDice = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    gamePlaying = true;
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    lastDice = 0;
    winningScore = 100;

    // Chaning CSS property
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.input-field').value = null;
    document.querySelector('.input-field').disabled = false;
}

document.querySelector('.btn-submit').addEventListener('click', function() {
    winningScore = parseInt(document.querySelector('.input-field').value);
    // False, 0, null, undefined, NaN or "" are COERCED to false
    if (!winningScore || winningScore < 0)
        init();
    document.querySelector('.input-field').disabled = true;
});