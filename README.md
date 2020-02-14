# Pig Game :game_die:

Small & simple **dice game**, written in **JavaScript**. Each players gets a chance to throw a dice. The value of the dice on each turn is RNG based. The default score for victory is set to **100**, but an input field is provided to a player to change the default score.

# Game rules :clipboard:

- The game has **2** players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his **ROUND** score
- BUT, if the player rolls a **1**, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to '**Hold**', which means that his **ROUND** score gets added to his **GLOBAL** score. After that, it's the next player's turn
- The first player to reach **100** points on **GLOBAL score** wins the game

# Additional rules :heavy_plus_sign:

- A player looses his **ENTIRE** score when he rolls two **6** in a row. After that, it's the next player's turn
- The player loses his current score when one of the dices is a **1**.