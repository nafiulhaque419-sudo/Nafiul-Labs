const clear=document.querySelector("#clear");
const solve=document.querySelector("#solve");
let result=document.querySelector("#result");
let steps=document.querySelector("#steps");
let variable = "";

function checkParse(val){
  if(val===""){
    val=1;
  }else if(val==="-"){
    val=-1;
  }else{
    val=parseFloat(val);
  }
  
  return val;
}

let LCM=1;

function findLCM(denominators){
  let lcm=1
  for(let i=0; i<denominators.length; i++){
    let curr = Math.abs(denominators[i]);
    for(let j=1; j<=denominators[i]; j++){
      if(lcm%j===0 && curr%j===0){
        curr=curr/j;
      }
    }
    lcm*=curr;
  }
  return lcm;
}

function detectEquationType(equation) {
    if (equation.includes(variable + "^2")) {
        return "quadratic";
    }else if(equation.includes(variable+"²")){
      return "quadratic";
    }
    return "linear";
}

function split(expression){
  let depth = 0;
  let current = "";
  const terms = [];

  for (let ch of expression) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    
    if (ch === "+" && depth === 0) {
      if (current !== ""){
        terms.push(current);
        current = "";
      } 
    }else if (ch === "-" && depth === 0) {
      if (current !== ""){
        terms.push(current);
        current = ch;
      }
    } else {
      current += ch;
    }
  }

  if (current !== ""){
    terms.push(current);
  }
  
  return terms;
}

function helperFraction(term, LCM) {
    if (!term.includes("/")) {
      if (term.includes("(")) {
        const idx = term.indexOf("(");

        let outside = term.slice(0, idx);

        outside=checkParse(outside);

        return `${outside * LCM}${term.slice(idx)}`;
          
      }else if(term.includes(variable+"²")){
      
      let coeff=term.replace(variable+"²", "");
        
      coeff=checkParse(coeff);
      
      return `${coeff*LCM}${variable}²`;
    }else if(term.includes(variable)) {
        let coeff = term.replace(variable, "");

        coeff=checkParse(coeff);

        return `${coeff * LCM}${variable}`;
      }else{
        return parseFloat(term) * LCM;
      }
    }
    
    // Fraction

    const slash = term.indexOf("/");
    const numerator = term.slice(0, slash);
    const denominator = parseFloat(term.slice(slash + 1));
    const multiplier=LCM/denominator;
    
    // Multiply

    if (numerator.includes("(")) {
      const bracket=numerator.indexOf("(");
      const inside=numerator.slice(bracket);
      let outside=numerator.slice(0, bracket);
      
      outside=checkParse(outside);
      
      return `${multiplier*outside}${inside}`;
        
    }else if(numerator.includes(variable+"²")){
      
      let coeff=numerator.replace(variable+"²", "");

      coeff=checkParse(coeff)
      
      return `${coeff*multiplier}${variable}²`;
    }else if(numerator.includes(variable)){
      let coeff = numerator.replace(variable, "");

      coeff=checkParse(coeff)

      return `${coeff * multiplier}${variable}`;
    }
    
    return parseFloat(numerator) * multiplier;
  }


function expandFractions(equation){
  if(!equation.includes("/")){
    return equation;
  }
  
  const denominators=[];
  
  for(let i=0; i<equation.length; i++){
    if(equation[i]==="/"){
      let denominator="";
      
      for(let j=i+1; j<equation.length; j++){
        if(equation[j]==="+" || equation[j]==="-" || equation[j]==="="){
          break;
        }else{
          denominator+=equation[j];
        }
      }
      denominators.push(denominator);
    }
  }
  
  LCM=findLCM(denominators);
  
  let [left, right]=equation.split("=");
  
  let leftTerms=split(left);
  let rightTerms=split(right);
  
  const newLeft=[];
  const newRight=[];
  
  for(let term of leftTerms){
    if(term===""){
      continue;
    }
    
    let newTerm=helperFraction(term, LCM);
    newLeft.push(newTerm);
  }
  
  for(let term of rightTerms){
    if(term===""){
      continue;
    }
    
    let newTerm=helperFraction(term, LCM);
    newRight.push(newTerm);
  }
  
  left = newLeft.join("+");
  right = newRight.join("+");

  equation = left + "=" + right;
  
  return equation;
}

function multiplyTerms(term1, term2){
  if(term1.includes(variable) && term2.includes(variable)){
    let xidx1=term1.indexOf(variable);
    let xidx2=term2.indexOf(variable);
    
    let coeff1=term1.slice(0, xidx1);
    let coeff2=term2.slice(0, xidx2);
    
    coeff1=checkParse(coeff1)
  
    coeff2=checkParse(coeff2);
    
    return `${coeff1*coeff2}${variable}²`;
  }else if(term1.includes(variable)){
    let xidx=term1.indexOf(variable);
    let coeff=term1.slice(0, xidx);
    
    coeff=checkParse(coeff);
    
    let cons=term2;
    cons=checkParse(cons);
    
    return `${cons*coeff}${variable}`;
  }else if(term2.includes(variable)){
    let xidx=term2.indexOf(variable);
    let coeff=term2.slice(0, xidx);
    
    coeff=checkParse(coeff);
    
    let cons=term1;
    cons=checkParse(cons);
    
    return `${cons*coeff}${variable}`;
  }else{
    term1=checkParse(term1);
    
    term2=checkParse(term2);
    
    return `${term1*term2}`;
  }
}

function multiplyBrackets(oldEquation, equation, outside1){
  const firstOpen = equation.indexOf("(");
  const firstClose = equation.indexOf(")");
  const secondOpen = equation.indexOf("(", firstClose);
  const secondClose = equation.indexOf(")", secondOpen);
  
  let bracket1 = equation.slice(firstOpen + 1, firstClose);
  let bracket2 = equation.slice(secondOpen + 1, secondClose);
  
  bracket1=bracket1.replaceAll("-", "+-");
  bracket2=bracket2.replaceAll("-", "+-");
  
  const bracket1Terms=bracket1.split("+");
  const bracket2Terms=bracket2.split("+");
  
  const result=[];
  
  for(let term1 of bracket1Terms){
    for(let term2 of bracket2Terms){
      result.push(
        multiplyTerms(term1, term2)
        );
    }
  }
  
  let x2=0;
  let x=0;
  let cons=0;
  
  for(let i=0; i<result.length; i++){
    if(result[i].includes(variable+"²")){
      let term=result[i].replaceAll(variable+"²", "");
      term=checkParse(term);
      
      x2+=term;
    }else if(result[i].includes(variable)){
      let term=result[i].replaceAll(variable, "");
      term=checkParse(term);
      
      x+=term;
    }else{
      let term=result[i];
      term=checkParse(term);
      
      cons+=term;
    }
  }
  
  let expression= `${x2*outside1}${variable}²+${x*outside1}${variable}+${cons*outside1}`;
  
  expression=expression.replaceAll("+-", "-");
  
  expression=oldEquation.replace(equation, expression);
  
  return expression;
}

function expandBrackets(equation){
  const shortTerms=[];
  
  if(!equation.includes('(')){
    return equation;
  }
  
  const xidx = equation.lastIndexOf("(");
  const yidx = equation.indexOf(")", xidx);
  let idxA=equation.indexOf(")");
  
  if(equation[idxA+1]==="²"){
    let copy="";
    
    for(let i=idxA; i>=0; i--){
      if(equation[i]==="("){
        copy=equation[i]+copy;
        break;
      }else{
        copy=equation[i]+copy;
      }
    }
    
    equation=equation.replace("²", copy);
  }
  
  if(equation[idxA+1]==="("){
    let firstOpen=equation.indexOf("(");
  
    let outside1="";
    for(let i=firstOpen-1; i>=0; i--){
      if(equation[i]==="+" || equation[i]  ==="=" ){
        break;
      }else if(equation[i]==="-"){
        outside1=equation[i]+outside1;
        break;
      }else{
        outside1=equation[i]+outside1;
      }
    }
   
    outside1=checkParse(outside1);
    
    let idx1;
    let idx2;
    
    let val=false;
    for(let i=idxA; i>=0; i--){
      if(equation[i]==="("){
        idx1=0;
        val=true;
      }
      
      if((equation[i]==="+" || equation[i]==="=") && val===true){
        idx1=i+1;
        break;
      }else if(equation[i]==="-" && val===true){
        idx1=i;
        break;
      }
    }
    
    for(let i=idxA+1; i<equation.length; i++){
      if(equation[i]===")"){
        idx2=i;
        break;
      }
    }
    
    let expression=equation.slice(idx1, idx2+1);
    return multiplyBrackets(equation, expression, outside1);
  }
  
  let widx=0;
    
  let outside="";
  for(let i=xidx-1; i>=0; i--){
    if(equation[i]==="+" || equation[i]==="=" || equation[i]==="("){
      widx=i+1;
      break;
    }else if(equation[i]==="-"){
      outside=equation[i]+outside;
      widx=i;
      break;
    }else{
      outside=equation[i]+outside;
    }
  }
    
  let inside=equation.slice(xidx+1, yidx);
  
  let leftSide=equation.slice(0, widx);
  
  let rightSide=equation.slice(yidx+1, equation.length);
    
  inside=inside.replaceAll("-", "+-");
    
  inside=inside.split("+");
    
  for(let term of inside){
    if(term===""){
      continue;
    }
    
    if(term.includes(variable+"²")){
      let x=term.replace(variable+"²", "");
      
      x=checkParse(x);
      
      let y=outside;
      y=checkParse(y);
      
      shortTerms.push(`${y*x}${variable}²`);
    }else if(term.includes(variable)){
      let x=term.replace(variable, "");
      x=checkParse(x);
      
      let y=outside;
      y=checkParse(y);
      
      shortTerms.push(`${y*x}${variable}`);
    }else{
      let x=term;
      x=checkParse(x);
      
      let y=outside;
      y=checkParse(y);
      
      shortTerms.push(`${y*x}`);
    }
  }
  let expanded=shortTerms.join("+");
  expanded=expanded.replaceAll("+-", "-");
  
  equation=leftSide+expanded+rightSide;
  
  return equation;
}

function quadraticParser(equation){
  if(equation.split("=").length !== 2){
    result.innerText="invalid equation";
    result.style.fontSize="30px";
    return;
  }
  
  let [left, right]=equation.split("=");

  left=left.replaceAll("-", "+-");
  right=right.replaceAll("-", "+-");

  const leftTerms=left.split("+");
  const rightTerms=right.split("+");
  
  let leftX2=0;
  let leftX=0;
  let leftConstant=0;
  
  let rightX2=0;
  let rightX=0;
  let rightConstant=0;
  
  for(let term of leftTerms){
    if(term===""){
      continue;
    }
      
    if(term.includes(variable+"²")){
      let coeff=term.replace(variable+"²", "");
      coeff=checkParse(coeff);
      leftX2+=coeff;
      
    }else if(term.includes(variable)){
      let coeff=term.replace(variable, "");
      coeff=checkParse(coeff);
      leftX+=coeff;
      
    }else{
      let cons=checkParse(term);
      leftConstant+=cons;
    }
  }
    
  for(let term of rightTerms){
    if(term===""){
      continue;
    }
      
    if(term.includes(variable+"²")){
      let coeff=term.replace(variable+"²", "");
      
      coeff=checkParse(coeff);
      rightX2+=coeff;
    }else if(term.includes(variable)){
      let coeff=term.replace(variable, "");
      
      coeff=checkParse(coeff);
      rightX+=coeff;
    }else{
      let cons=checkParse(term);
      rightConstant+=cons;
    }
  }
  
  const a = leftX2 - rightX2;
  const b = leftX - rightX;
  const c = leftConstant - rightConstant;
  
  return{
    a,
    b,
    c,
    leftX2,
    leftX,
    leftConstant,
    rightX2,
    rightX,
    rightConstant
  }
}

function linearParser(equation){
  if(equation.split("=").length !== 2){
    result.innerText="invalid equation";
    result.style.fontSize="30px";
    return;
  }

  let [left, right]=equation.split("=");

  left=left.replaceAll("-", "+-");
  right=right.replaceAll("-", "+-");

  const leftTerms=left.split("+");
  const rightTerms=right.split("+");

  let leftCoefficient=0;
  let leftConstant=0;
  let rightCoefficient=0;
  let rightConstant=0;

  for(let term of leftTerms){
    if(term===""){
      continue;
    }
    
    if(term.includes(variable)){
      let coeff=term.replace(variable, "");
      
      coeff=checkParse(coeff);
      leftCoefficient+=coeff;
    }else{
      let cons=checkParse(term);
      leftConstant+=cons;
    }
  }

  for(let term of rightTerms){
    if(term===""){
      continue;
    }
    
    if(term.includes(variable)){
      let coeff=term.replace(variable, "");
      
      coeff=checkParse(coeff);
      rightCoefficient+=coeff;
    }else{
      let cons=checkParse(term);
      rightConstant+=cons;
    }
  }

  const xCoeff=leftCoefficient - rightCoefficient;
  const constant=leftConstant - rightConstant;
  return{
    a:xCoeff,
    b:constant,
    leftCoefficient,
    leftConstant,
    rightCoefficient,
    rightConstant
  }
}

function solveQuadratic(equation,oldEquation, fractionEquation){
  let x1=0;
  let x2=0;
  let x=0;
  
  const data=quadraticParser(equation);
  
  const a=data.a;
  const b=data.b;
  const c=data.c;
  
  const leftX2=data.leftX2;
  const leftX=data.leftX;
  const leftConstant=data.leftConstant;
  
  const rightX2=data.rightX2;
  const rightX=data.rightX;
  const rightConstant=data.rightConstant;
  
  if(!data){
    return;
  }
  
  const d=b**2-4*a*c;
  
  if(d>0){
    x1=((-b+Math.sqrt(d))/(2*a)).toFixed(2);
    x2=((-b-Math.sqrt(d))/(2*a)).toFixed(2);
    result.innerHTML=`Solution 1( ${variable}1)=${x1}
    <br><br>
    Solution 2(${variable}2)=${x2}`;
  }else if(d===0){
    x=-b/(2*a).toFixed(2);
    result.innerText=`Solution(${variable})=${x}`;
  }else{
    result.innerHTML="No Real Solution";
  }
  result.style.fontSize="30px";
  
  steps.style.fontSize="30px";
  if(d>0){
    steps.innerHTML=`<h3>Step 1: Given Equation:</h3>
    ${oldEquation}<br><br>

    <h3>Step 2: Remove Fractions:</h3>
    <h5>Multiply Both Sides by LCM ${LCM}<h5>
  
    ${fractionEquation}<br><br>
  
    <h3>Step 3: Remove Brackets:</h3>
    ${equation}<br><br>

    <h3>Step 4: Combine Like Terms:</h3>
    ${leftX2}${variable}² + ${leftX}${variable} + ${leftConstant} = ${rightX2}${variable}² + ${rightX}${variable} + ${rightConstant} <br><br>
    <h3>Step 5: Move Everything to the Left:</h3>
    ${a}${variable}²+${b}${variable}+${c} = 0<br><br>
    <h3>Step 6: Identify coefficients:</h3>
    a=${a}<br>
    b=${b}<br>
    c=${c}<br><br>
    <h3>Step 7: Calculate Discriminent:</h3>
    D=b² - 4ac<br>
    D=${b}² - 4 * ${a} * ${c}<br>
    D=${b*b} - ${4*a*c}<br>
    D=${b*b-4*a*c}<br><br>
    <h3>Step 8: Apply Quadratic Formula:</h3>
    ${variable} = (${-b} ± √${d}) / (2 * ${a})<br><br>
    <h3>Step 9: Calculate Roots:</h3>
    ${variable}1 = (${-b} + √${d}) / (2 * ${a}) = ${x1}<br>
    ${variable}2 = ${-b} - √${d}) / (2 * ${a}) = ${x2}<br><br>
    <h3>Final Answer:</h3>
    ${variable}1 = ${x1}<br>
    ${variable}2 = ${x2}`;
  }else if(d===0){
    steps.innerHTML=`<h3>Step 1: Given Equation:</h3>
    ${oldEquation}<br><br>

    <h3>Step 2: Remove Fractions:</h3>
    <h5>Multiply Both Sides by LCM ${LCM}<h5>
  
    ${fractionEquation}<br><br>
  
    <h3>Step 3: Remove Brackets:</h3>
    ${equation}<br><br>

    <h3>Step 4: Combine Like Terms:</h3>
    ${leftX2}${variable}² + ${leftX}${variable} + ${leftConstant} = ${rightX2}${variable}² + ${rightX}${variable} + ${rightConstant} <br><br>
    <h3>Step 5: Move Everything to the Left:</h3>
    ${a}${variable}²+${b}${variable}+${c} = 0<br><br>
    <h3>Step 6: Identify coefficients:</h3>
    a=${a}<br>
    b=${b}<br>
    c=${c}<br><br>
    <h3>Step 7: Calculate Discriminent:</h3>
    D=b² - 4ac<br>
    D=${b}² - 4 * ${a} * ${c}<br>
    D=${b*b} - ${4*a*c}<br>
    D=${b*b-4*a*c}<br><br>
    <h3>Step 8: Apply Quadratic Formula:</h3>
    Since D=0, Both Roots are equal. So,<br>
    ${variable} = -b / (2a)<br><br>
    <h3>Step 9: Calculate Roots:</h3>
    ${variable} = ${-b} / (2 * ${a}) = ${x}<br><br>
    <h3>Final Answer:</h3>
    ${variable} = ${x}`;
  }else{
  steps.innerHTML=`<h3>Step 1: Given Equation:</h3>
    ${oldEquation}<br><br>

    <h3>Step 2: Remove Fractions:</h3>
    <h5>Multiply Both Sides by LCM ${LCM}<h5>
  
    ${fractionEquation}<br><br>
  
    <h3>Step 3: Remove Brackets:</h3>
    ${equation}<br><br>

    <h3>Step 4: Combine Like Terms:</h3>
    ${leftX2}${variable}² + ${leftX}${variable} + ${leftConstant} = ${rightX2}${variable}² + ${rightX}${variable} + ${rightConstant} <br><br>
    <h3>Step 5: Move Everything to the Left:</h3>
    ${a}${variable}²+${b}${variable}+${c} = 0<br><br>
    <h3>Step 6: Identify coefficients:</h3>
    a=${a}<br>
    b=${b}<br>
    c=${c}<br><br>
    <h3>Step 7: Calculate Discriminent:</h3>
    D=b² - 4ac<br>
    D=${b}² - 4 * ${a} * ${c}<br>
    D=${b*b} - ${4*a*c}<br>
    D=${b*b-4*a*c}<br><br>
    <h3>Step 8: Final Answer:</h3>
    Since, D < 0,<br>
    No Real Solution`;
  }
}

function solveLinear(equation, oldEquation, fractionEquation){
  const data=linearParser(equation);
  
  if(!data){
    return;
  }
  
  if(data.a===0 && data.b===0){
    result.innerText="Infinite solution";
    result.style.fontSize="30px";
    return;
  }else if(data.a===0 && data.b!==0){
    result.innerText="No solution";
    result.style.fontSize="30px";
    return;
  }else{
    result.innerText=`${variable}=${(-data.b/data.a).toFixed(2)}`;
    result.style.fontSize="50px";
    steps.innerHTML = `
  <h3>Step 1: Given Equation:</h3>
  ${oldEquation}<br><br>

  <h3>Step 2: Remove Fractions:</h3>
  <h5>Multiply Both Sides by LCM ${LCM}<h5>
  
  ${fractionEquation}<br><br>
  
  <h3>Step 3: Remove Brackets:</h3>
  ${equation}<br><br>

  <h3>Step 4: Combine Like Terms:</h3>
  ${data.leftCoefficient}${variable} + ${data.leftConstant}
  =
  ${data.rightCoefficient}${variable} + ${data.rightConstant}
  <br><br>

  <h3>Step 5: Move ${variable} terms to the Left:</h3>
  ${data.leftCoefficient}${variable} - ${data.rightCoefficient}${variable}
  =
  ${data.rightConstant} - ${data.leftConstant}
  <br><br>

  <h3>Step 6: Simplify</h3>
  ${data.a}${variable} = ${-data.b}
  <br><br>

  <h3>Step 7: Divide Both Sides by ${data.a}</h3>
  ${variable} = ${-data.b}/${data.a}
  <br><br>

  <h3>Final Answer</h3>
  <b>${variable} = ${(-data.b/data.a).toFixed(2)}</b>
`;
    steps.style.fontSize="30px"
  }
}

solve.addEventListener("click",()=>{
  let equation=document.querySelector("#equation").value;
  equation=equation.replace(/\s+/g,"");
  equation=equation.toLowerCase();
  equation=equation.replaceAll("^2", "²");
  
  variable = equation.match(/[a-zA-Z]/)?.[0];
  
  const oldEquation=equation;
  const fractionEquation=expandFractions(oldEquation)
  
  equation=fractionEquation;
  
  let count=0;
  while (equation.includes("(")) {
    const beforeEquation=equation;
    equation = expandBrackets(equation);
    
    if(beforeEquation===equation){
      count++;
    }
    
    if(count>=10){
      result.innerText="Sorry! We Can't solve your Equation";
      break;
    }
  }
  
  if(detectEquationType(equation)==="quadratic"){
    solveQuadratic(equation, oldEquation, fractionEquation);
  }else{
    solveLinear(equation, oldEquation, fractionEquation);
  }
});

clear.addEventListener("click",()=>{
  result.innerHTML="<h2>Result:</h2>";
  result.style.fontSize="";
  steps.innerHTML="<h2>steps:<h2>";
  result.style.fontSize="";
  document.querySelector("#equation").value="";
});