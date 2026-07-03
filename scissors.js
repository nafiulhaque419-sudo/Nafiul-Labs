let userScore=0;
let compScore=0;
const choices=document.querySelectorAll(".option");
const massage=document.querySelector("#msg");
const user=document.querySelector("#user-score");
const comp=document.querySelector("#comp-score");

function draw(){
  massage.innerText="game was draw, play again.";
  massage.style.backgroundColor="#081b31"
}

function win(userChoice, compChoice){
  massage.innerText=`congratulations, you won!, ${userChoice} beats ${compChoice}.`;
  massage.style.backgroundColor="green";
  userScore++;
  user.innerText=`${userScore}`;
}

function lose(userChoice, compChoice){
  massage.innerText=`you lost ${compChoice} beats ${userChoice}.`;
  massage.style.backgroundColor="red";
  compScore++;
  comp.innerText=`${compScore}`;
}

function genCompChoice(){
  const options=["rock", "paper", "sissors"];
  const idx=Math.floor(Math.random()*3);
  return options[idx];
}

const playGame=(userChoice)=>{
  const compChoice=genCompChoice();
  if(userChoice===compChoice){
    draw();
  }else if(userChoice==="rock"){
    if(compChoice==="paper"){
      lose(userChoice, compChoice);
    }else{
      win(userChoice, compChoice);
    }
  }else if(userChoice==="paper"){
    if(compChoice==="rock"){
      win(userChoice, compChoice);
    }else{
      lose(userChoice, compChoice);
    }
  }else{
    if(compChoice==="rock"){
      lose(userChoice, compChoice);
    }else{
      win(userChoice, compChoice);
    }
  }
}

choices.forEach((choice)=>{
  choice.addEventListener("click", ()=>{
    const userChoice=choice.getAttribute("id");
    playGame(userChoice);
  });
});