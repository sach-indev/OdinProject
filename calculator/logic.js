"use strict"

const view = document.querySelector(".view");

const digit = document.querySelectorAll(".digit");
const basicOp = document.querySelectorAll(".basic-op");

//Evaluating and reseting operations
const reset = document.getElementById("reset");
const equal = document.querySelector(".equal-to");
//special operations
const root = document.getElementById('root');
const sign = document.getElementById('sign');
const percentage = document.getElementById('percentage');
const dot = document.getElementById('dot');

const state = 
{
    prev : "",
    cur : "", 
    op : null,
    jc : false,
    btn: null,
    point : false,
};

const MAX_FONT = 40, MIN_FONT = 20;

//Fit text on screen
function fitText()
{
    view.style.fontSize = MAX_FONT + "px";
    let fontSize = MAX_FONT;

    while(view.scrollWidth > view.clientWidth && fontSize > MIN_FONT)
    {
        fontSize--;
        view.style.fontSize = fontSize + "px";
    }

    return view.scrollWidth <= view.clientWidth;
}

function clean(num)
{
    return Number(num.toPrecision(15));
}

function display(res)
{
    view.innerText = res;
    fitText();
};

display("0");

function calculate()
{
    const a = parseFloat(state.prev);
    const b = parseFloat(state.cur);

    let res;

    switch (state.op)
    {
        case '+':
            res = a + b;
            break
        case '\u2212':
            res = a - b;
            break;
        case "\u00F7":
            res = a/b;
            break;
        case "\u00D7":
            res = a*b;
            break;
    }

    return String(clean(res));
}

digit.forEach(btn =>
{
    btn.addEventListener('click', ()=>
    {
        if(state.btn && state.cur==="")
        {
            state.btn.classList.remove("selected");
            state.btn = null;
        }

        if(state.jc)
        {
            state.prev = "";
            state.cur = "";
            state.op = null;
            state.jc = false;
            state.point = false;
        }

        state.cur += btn.innerText;
        display(state.cur);

        if(!fitText())
        {
            state.cur = state.cur.slice(0, -1);
            display(state.cur);
        }
    });
});

basicOp.forEach(btn =>
{
    btn.addEventListener('click', ()=>
    {
        if(state.btn) state.btn.classList.remove("selected");
        btn.classList.add("selected");
        state.btn = btn;

        const op = btn.innerText;

        if(state.cur==="" && state.prev==="") return;
        if(state.cur==="")
        {
            state.op = op;
            state.point = false;
            return;
        }

        if(state.op === null)
        {
            state.prev = state.cur;
            state.cur = "";
            state.op = op;
            state.jc = false;
            state.point = false;
            return;
        }

        state.prev = calculate();
        state.cur = "";
        state.op = op;
        state.jc = false;
        state.point = false;

        display(state.prev);
    });
});

equal.addEventListener('click', ()=>
{
    if(state.btn)
    {
        state.btn.classList.remove("selected");
        state.btn = null;
    }

    if(state.op == null || state.cur === "") return;

    state.cur = calculate();
    state.prev = "";
    state.op = null;
    state.jc = true;
    state.point = state.cur.includes(".")

    display(state.cur);
});

reset.addEventListener('click', ()=>
{
    view.style.fontSize = "40px";
    if(state.btn)
    {
        state.btn.classList.remove("selected");
        state.btn = null;
    }

    state.prev = "";
    state.cur = "";
    state.op = null;
    state.jc = false;
    state.point = false;

    display('0');
});

root.addEventListener('click', () =>
{
    if(state.cur == "") return;
    else
    {
        state.cur = String(Math.sqrt(parseFloat(state.cur)));
        display(state.cur);

        if(state.cur.includes("."))
        {
            state.point = true;
        }
    }
});

percentage.addEventListener('click', ()=>
{
    if(state.cur == "") return;
    else
    {
        state.cur = String((parseFloat(state.cur))/100);
        display(state.cur);
        
        if(state.cur.includes("."))
        {
            state.point = true;
        }
    }
});

dot.addEventListener('click', ()=>
{
    if(state.cur == "")
    {
        state.cur = '0' + dot.innerText;
        display(state.cur);
    }
    else
    {
        if(!state.point)
        {
            state.cur = state.cur + dot.innerText;
            display(state.cur);
            state.point = true;
        }
    }
});

sign.addEventListener('click', () =>
{
    if(state.cur.startsWith("-")) state.cur = state.cur.slice(1);
    else if(state.cur==="") return;
    else state.cur = "-" + state.cur;

    display(state.cur);
});

