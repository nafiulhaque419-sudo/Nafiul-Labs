const display=document.querySelector(".display");
const keys=document.querySelectorAll(".key");
let expression="";
let displayExpression="";

function Equal(){
  try{
    expression=eval(expression).toString();
    displayExpression=expression;
    display.innerText=displayExpression;
  }catch{
    display.innerText="Error";
    expression=""
    displayExpression="";
  }
}

function AC(){
  expression="";
  displayExpression="";
  display.innerText=0;
}

function CE(){
  expression=expression.slice(0,-1);
  displayExpression=displayExpression.slice(0, -1);
  if(expression===""){
    display.innerText=0;
  }else{
    display.innerText=displayExpression;
  }
}

function Power(){
  displayExpression+="^";
  expression+="**";
  display.innerText=displayExpression;
}

keys.forEach((key)=>{
  key.addEventListener("click", ()=>{
    if(key.innerText==="="){
      Equal();
    }else if(key.innerText==="AC"){
      AC();
    }else if(key.innerText==="CE"){
      CE();
    }else if(key.innerText==="^"){
      Power();
    }else{
      displayExpression+=key.innerText;
      expression+=key.innerText;
      display.innerText=displayExpression;
    }
  });
});