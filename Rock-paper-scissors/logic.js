"use strict"


let playRound = (playerChoice) =>
{
    let compChoice = Math.floor(Math.random()*3);

    if(playerChoice==compChoice) return 0;

    else if(Math.abs(playerChoice - compChoice)==1)
    {
        if(playerChoice > compChoice) return 1;
        else return 2;
    }
    else
    {
        if(playerChoice > compChoice) return 2;
        else return 1;
    }
};

const startBtn = document.querySelector('.start-btn');
const games = document.querySelector('.games');

let playerScore = 0, compScore = 0, round = 1;

function clearGames()
{
    games.innerHTML = "";
}

function createRound()
{
    clearGames();

    const roundTitle = document.createElement('h1');
    roundTitle.className = 'round-title';
    roundTitle.innerText = `Round ${round} : Make Your Choice`;

    const choices = document.createElement('div');
    choices.className = 'choices';

    const rock = document.createElement('button');
    const paper = document.createElement('button');
    const scissors = document.createElement('button');

    rock.innerText = 'Rock';
    paper.innerText = 'Paper';
    scissors.innerText = 'Scissors';

    choices.append(rock, paper, scissors);

    const resultContainer = document.createElement('div');
    resultContainer.className = 'round-result-container';

    const resultBox = document.createElement('div');
    resultBox.className = 'round-result';

    resultContainer.appendChild(resultBox); 

    //buttons
    const continueBtn = document.createElement('button');
    continueBtn.className = 'continue';
    continueBtn.innerText = "continue";
    continueBtn.disabled = true;
    
    const finishBtn = document.createElement('button');
    finishBtn.className = 'finish';
    finishBtn.innerText = 'Finish';

    //append Everything
    games.append(roundTitle, choices, resultContainer, continueBtn, finishBtn);

    function disableChoices()
    {
        [rock, paper, scissors].forEach(b => b.disabled = true);
    }

    function handleChoice(choice)
    {
        const win = playRound(choice);

        disableChoices();
        continueBtn.disabled = false;

        if(win==0)
        {
            resultBox.innerText = "IT'S A TIE";
            playerScore++;
            compScore++;
        }

        else if(win==1)
        {
            resultBox.innerText = "YOU WIN";
            playerScore++;
        }
        else
        {
            resultBox.innerText = "YOU LOOSE";
            compScore++;
        }
    }

    rock.onclick = ()=>handleChoice(0);
    paper.onclick = ()=>handleChoice(1);
    scissors.onclick = ()=>handleChoice(2);

    continueBtn.onclick = ()=>
    {
        round++;
        createRound();
    };

    finishBtn.onclick = ()=>
    {
        clearGames();
        
        const scoreContainer = document.createElement('div');
        scoreContainer.className = 'score-container';
        
        const comp = document.createElement('div');
        comp.className = 'comp-score';
        comp.innerText = `Computer Score : ${compScore}`;

        const player = document.createElement('div');
        player.className = 'player-score';
        player.innerText = `Player Score : ${playerScore}`;

        scoreContainer.append(comp, player);

        const finalContainer = document.createElement('div');
        finalContainer.className = 'final-result-container';

        const final = document.createElement('div');
        final.className = 'final-result';

        if(playerScore === compScore) final.innerText = 'TOURNAMENT TIE';
        else if(playerScore > compScore) final.innerText = 'YOU WIN THE TOURNAMENT';
        else final.innerText = 'YOU LOSE THE TOURNAMENT';

        finalContainer.appendChild(final);

        games.append(scoreContainer, finalContainer);

    };
}

startBtn.addEventListener('click', ()=>
{
    playerScore = 0;
    compScore = 0;
    round = 1;

    createRound();
});