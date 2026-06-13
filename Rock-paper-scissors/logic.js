"use strict";

//ok so how do we go about this. First user input that would be most definetely prompt with parseInt to get 1, 2, and 3 choices for rock, paper and scisors. Now we can also make the user choose how many games to play. Ok And lastly use math.random to get computer choice. Now after that compare with user choice and print the result. Keep score and lastly print the final score.


alert("This is a Tournament of Rock, Paper and Sissors!!!")
let numGames = parseInt(prompt("Please enter the number of games to be played in Tournamnet: "));

let playerScore = 0, compScore = 0;
for(let i = 0; i<numGames; i++)
{
    if(i==0) alert("Starting " +  (i+1) + "st Game..." );
    else if(i==1) alert("Starting " +  (i+1) + "nd Game..." );
    else alert("Starting " +  (i+1) + "rd Game..." );

    let playerChoice = parseInt(prompt("Enter Your choice({1: Rock, 2: Paper, 3: Scissors): "));

    let compChoice = Math.floor(Math.random()*3) + 1;

    if(playerChoice===compChoice)
    {
        alert("Its a tie!!!");
        playerScore++;
        compScore++;
    }

    else
    {
        if(Math.abs(playerChoice - compChoice) == 1)
        {
            if(playerChoice > compChoice)
            {
                alert("You Win!");
                playerScore++;
            }
            else
            {
                alert("You Loose!");
                compScore++;
            }
        }
        else
        {
            if(playerChoice > compChoice)
            {
                alert("You Loose!");
                compScore++;
            }
            else
            {
                alert("You Win!");
                playerScore++;
            }
        }
    }
}

if(playerScore > compScore)
{
    alert("You have won the tournament\n Your score: " + playerScore + "\n Computer Score: " + compScore);
}

else if(playerScore < compScore)
{
    alert("Alas you lost! Better luck next time.\n Your score: " + playerScore + "\n Computer Score: " + compScore);
}

else
{
    alert("Once in a blue moon we got a tie. Maybe its good luck?\n Your score: " + playerScore + "\n Computer Score: " + compScore);
}

alert("Please reload the page to play again!!!");