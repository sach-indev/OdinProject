"use strict"

const basicOp = document.querySelectorAll(".basic-op");
const digit = document.querySelectorAll(".digit");
const reset = document.getElementById("reset");
const equal = document.querySelector(".equal-to");
const view = document.querySelector(".view");

const state = 
{
    prev : "",
    cur : "", 
    op : null,
    jc : false,
    btn: null, 
};

const MAX_FONT = 40, MIN_FONT = 20;

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

function display(res)
{
    view.innerText = res;
};

display("0");

function calculate()
{
    const a = parseFloat(state.prev);
    const b = parseFloat(state.cur);

    switch (state.op)
    {
        case '+':
            return String(a+b);
        case '\u2212':
            return String(a-b);
        case "\u00F7":
            return String(a/b);
        case "\u00D7":
            return String(a*b);
    }
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
        }

        state.cur += btn.innerText;
        display(state.cur);

        if(!fitText())
        {
            state.cur = state.cur.slice(0, -1);
            display(state.cur);
            fitText();
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
            return;
        }

        if(state.op === null)
        {
            state.prev = state.cur;
            state.cur = "";
            state.op = op;
            state.jc = false;
            return;
        }

        state.prev = calculate();
        state.cur = "";
        state.op = op;
        state.jc = false;

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

    state.prev = calculate();
    state.cur = "";
    state.op = null;
    state.jc = true;

    display(state.prev);
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

    display('0');
});