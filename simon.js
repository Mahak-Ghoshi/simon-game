let gameSeq=[];
let userSeq=[];
// highScore=0;
let btns=['red', 'yellow', 'green', 'purple']
let started=false;
let level=0;
let highScore = localStorage.getItem("simsonhighScore") || 0;

let h2=document.querySelector('h2');
document.addEventListener('keypress', function (){
    if(started == false){
        console.log ("game is started")
        started = true;
            h2.innerText=`level ${level} | highscore: ${highScore}`;

        levelup ();
    }
})

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(function (){
        btn.classList.remove('flash')
    }, 250    );



}

function userFlash(btn){
    btn.classList.add('userflash');
    setTimeout(function (){
        btn.classList.remove('userflash')
    }, 250    );



}


function levelup(){
    userSeq=[];
    level++;
    h2.innerText=`level ${level} | highscore: ${highScore}`;

    let ranIdx = Math.floor(Math.random() * 4);
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);
// console.log(ranColor);
//     console.log(ranIdx);
//     console.log(ranBtn);
     gameSeq.push(ranColor);
     console.log(gameSeq);
    gameFlash(ranBtn);

}
function checkAns(idx){
    // console.log("current level:", level)
    // let idx= level-1;
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length)
            setTimeout (levelup, 1000)
        // console.log("same value")
    } else{

        if( level-1 > highScore){
            highScore = level-1;
            localStorage.setItem("simsonhighScore", highScore);
        }
        h2.innerHTML=`Game Over! your score was <b>${level-1}</b> | highscore: ${highScore} <br> please press any key`
        document.querySelector('body').style.background="red";
        setTimeout( function () {
            document.querySelector('body').style.background='white'
        }, 150);
        reset();
    }

}
function btnPress(){
    // console.log(this)
    let btn=this;
    userFlash(btn);

     userColor=btn.getAttribute('id')
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click', btnPress);

}

function reset (){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}