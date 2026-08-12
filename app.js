const Basic_URL="https://fxapi.app/api"
const dropdowns=document.querySelectorAll(".dropdown select");
 let btn=document.querySelector("button")
 let fromCurr=document.querySelector(".from select")
 let toCurr=document.querySelector(".to select")
 let msg=document.querySelector(".msg");

for(let select of dropdowns){
  for (let currcode in countryList){
    let newoption=document.createElement("option");
    newoption.innerHTML=currcode;
    newoption.value=currcode;
    if(select.name==="from"&& currcode==="USD"){
      newoption.selected="selected";
    }
      if(select.name==="to"&& currcode==="PKR"){
      newoption.selected="selected";
    }
      select.append(newoption)
     
  }
   select.addEventListener("change",(event)=>{
        updateflag(event.target)
        
      })

}
const updateflag=(element)=>{
  let curcode=element.value;
  console.log(curcode);
  let countrycode=countryList[curcode];
  let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
 let img= element.parentElement.parentElement.querySelector("img");
 img.src=newsrc;
  
}
btn.addEventListener("click",async(event)=>{
  event.preventDefault();
  let amount=document.querySelector(".amount input");
  if(amount.value < 1 ){
    amount.value=1;
    alert("Amount cannot be less than 1")
  }
  const URL=`${Basic_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response=await fetch(URL)
  let data=await response.json();
  let rate=data.rate;
  let finalamount=amount.value*rate;
 
msg.innerHTML=`${amount.value}  ${fromCurr.value}= ${finalamount} ${toCurr.value}`;
 msg.style.fontFamily = "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif";
 msg.style.textDecoration="underline"
})
