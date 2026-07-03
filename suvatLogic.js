const cal=document.querySelector("#calculate");
const display=document.querySelector("#display");
const clear=document.querySelector("#AC");

const inputs=document.querySelectorAll("input");
inputs.forEach((input)=>{
  input.addEventListener("input", ()=>{
    if(input.value===""){
      input.style.textAlign="left";
    }else{
      input.style.textAlign="right";
      input.style.fontSize="1.5rem"
    }
  });
});

function findV(values){
  if(!isNaN(values.u) && !isNaN(values.a) && !isNaN(values.t)){
    return values.u+values.a*values.t;
  }else if(!isNaN(values.u) && !isNaN(values.a) && !isNaN(values.s)){
    return Math.sqrt(values.u**2+2*values.a*values.s);
  }else{
    return NaN;
  }
}

function findU(values){
  if(!isNaN(values.v) && !isNaN(values.a) && !isNaN(values.t)){
    return values.v-values.a*values.t;
  }else if(!isNaN(values.v) && !isNaN(values.a) && !isNaN(values.s)){
    return Math.sqrt(values.v**2-2*values.a*values.s);
  }else if(!isNaN(values.v) && !isNaN(values.t) && !isNaN(values.s)){
    return (2*values.s)/values.t-values.v;
  }else if(!isNaN(values.t) && !isNaN(values.a) && !isNaN(values.s)){
    return (values.s-0.5*values.a*values.t**2)/values.t;
  }else{
    return NaN;
  }
}

function findA(values){
  if(!isNaN(values.v) && !isNaN(values.u) && !isNaN(values.t)){
    return (values.v-values.u)/values.t;
  }else if(!isNaN(values.v) && !isNaN(values.u) && !isNaN(values.s)){
    return (values.v**2-values.u**2)/(2*values.s);
  }else if(!isNaN(values.t) && !isNaN(values.u) && !isNaN(values.s)){
    return 2*(values.s-values.u*values.t)/values.t**2;
  }else{
    return NaN;
  }
}

function findT(values){
  if(!isNaN(values.v) && !isNaN(values.u) && !isNaN(values.a)){
    return (values.v-values.u)/values.a;
  }else{
    return NaN;
  }
}

function findS(values){
  if(!isNaN(values.t) && !isNaN(values.u) && !isNaN(values.a)){
    return values.u*values.t+1/2*values.a*values.t**2;
  }else if(!isNaN(values.v) && !isNaN(values.u) && !isNaN(values.a)){
    return (values.v**2-values.u**2)/(2*values.a);
  }else{
    return NaN;
  }
}

//Calculate function
function calculate(){
  const u=parseFloat(document.querySelector("#u").value);
  const v=parseFloat(document.querySelector("#v").value);
  const a=parseFloat(document.querySelector("#a").value);
  const t=parseFloat(document.querySelector("#t").value);
  const s=parseFloat(document.querySelector("#s").value);
  
  const missing=[];
  
  if(isNaN(v)===true){
    missing.push("v");
  }
  
  if(isNaN(u)===true){
    missing.push("u");
  }
  
  if(isNaN(a)===true){
    missing.push("a");
  }
  
  if(isNaN(t)===true){
    missing.push("t");
  }
  
  if(isNaN(s)===true){
    missing.push("s");
  }

  const values={
    u,
    v,
    a,
    t,
    s,
  };
  
  let know=0;

  for(let key in values){
    if(!isNaN(values[key])){
      know++;
    }
  }
  if(know!==3 && know!==4){
    display.innerText="please enter exactly 3 values";
    return;
  }
  while(isNaN(values.v) || isNaN(values.u) || isNaN(values.a) || isNaN(values.t) || isNaN(values.s)){
    let changed=false;
    if(isNaN(values.v)){
      values.v=findV(values);
      if(!isNaN(values.v)){
        changed=true;
      }
    }
    if(isNaN(values.u)){
      values.u=findU(values);
      if(!isNaN(values.u)){
        changed=true;
      }
    }
    if(isNaN(values.a)){
      values.a=findA(values);
      if(!isNaN(values.a)){
        changed=true;
      }
    }
    if(isNaN(values.t)){
      values.t=findT(values);
      if(!isNaN(values.t)){
        changed=true;
      }
    }
    if(isNaN(values.s)){
      values.s=findS(values);
      if(!isNaN(values.s)){
        changed=true;
      }
    }
    if(changed===false){
      display.innerText="can't determined all values from the given input";
      return;
    }
  }
  return{
    values,
    missing
  };
}

cal.addEventListener("click", ()=>{
  const data=calculate();
  if(!data){
    return;
  }
  
  let result="";
  data.missing.forEach((variable)=>{
    result+=`${variable}=${data.values[variable].toFixed(2)} `
  });
  display.innerHTML=result;
});

clear.addEventListener("click", ()=>{
  display.innerText="";
  inputs.forEach((input)=>{
    input.value="";
    input.dispatchEvent(new Event("input"));
    input.style.fontSize="";
  });
});
