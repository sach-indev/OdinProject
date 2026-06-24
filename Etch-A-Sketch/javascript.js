"use strict"

const gridArea = document.querySelector('.grid-area');

function clearArea()
{
    gridArea.innerHTML = "";
}

const form = document.getElementById('myform');
form.addEventListener('submit', (e)=>
{
    e.preventDefault();
    clearArea();
    const size = Number(document.getElementById("grid-size").value);

    for(let i = 0; i<size; i++)
    {
        const rowContainer = document.createElement('div');
        rowContainer.classList.add("row-container");

        for(let i=0; i<size; i++)
        {
            const cell = document.createElement('div');
            cell.classList.add("cell");
            rowContainer.appendChild(cell);
        }

        gridArea.appendChild(rowContainer);
    }

    let randomMode = false;

    document.getElementById('random').addEventListener('click', ()=>
    {
        randomMode = true;
    });

    document.getElementById('grid-color').addEventListener('input', ()=>
    {
        randomMode = false;
    });

    
    document.querySelectorAll(".cell").forEach(cell =>
    {
        cell.addEventListener("mouseenter", ()=>
        {
            if(randomMode)
            {
                const r = Math.floor(Math.random()*256);
                const g = Math.floor(Math.random()*256);
                const b = Math.floor(Math.random()*256);
                cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

            }
            else
            {
                const picker = document.getElementById('grid-color');
                cell.style.backgroundColor = picker.value;

                let opacity = parseFloat(cell.style.opacity)||0;
                opacity = Math.min(opacity + 0.1, 1);
                cell.style.opacity = opacity;
            }
        });
    });

});


document.getElementById('reset').addEventListener('click', ()=>
{
    document.querySelectorAll(".cell").forEach(cell=>
    {
        cell.style.backgroundColor = "white";
    });
});