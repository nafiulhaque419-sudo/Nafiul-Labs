let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset-btn");
let winner=document.querySelector("#winner");
let turnO=true;
const winPositions=[
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8],
  ];

const disableBoxes=()=>{
  for(let box of boxes){
    box.disabled=true;
  }
}
  
const checkWinner=()=>{
  for(let pattern of winPositions){
    let p1=boxes[pattern[0]].innerText;
    let p2=boxes[pattern[1]].innerText;
    let p3=boxes[pattern[2]].innerText;
    if(p1!=="" && p2!=="" && p3!=="" &&  p1===p2 && p2===p3){
      winner.innerText=`${p1} is the winner`;
      winner.style.backgroundColor="#c5e8df";
      winner.style.color="#12db66";
      winner.style.border="2px solid black";
      winner.style.borderRadius="1rem";
      winner.style.fontSize="20px";
      disableBoxes();
    }
  }
}  
  
boxes.forEach((box)=>{
  box.addEventListener("click", ()=>{
    if(turnO===true){
      box.style.color="blue";
      box.innerText="O";
      turnO=false;
    }else{
      box.style.color= "#b0413e";
      box.innerText="X";
      turnO=true;
    }
    box.disabled=true;
    checkWinner();
  });
});

reset.addEventListener("click", ()=>{
  for(let i=0; i<9; i++){
    boxes[i].innerText="";
    boxes[i].disabled=false;
  }
  turnO=true;
  winner.innerText="";
  winner.style="";
})