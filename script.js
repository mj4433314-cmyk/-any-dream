const phone=document.getElementById("phone");
const code=document.getElementById("countryCode");
const loginBtn=document.getElementById("loginBtn");
const createBtn=document.getElementById("createBtn");
const loading=document.getElementById("loading");

phone.addEventListener("input",function(){

if(this.value.startsWith("077")){
code.innerHTML="🇮🇶 +964";
}else{
code.innerHTML="";
}

});

loginBtn.onclick=function(){

alert("عذراً، ليس لديك حساب.");

};

createBtn.onclick=function(){

const inputs=document.querySelectorAll("input");

for(let i=0;i<inputs.length;i++){

if(inputs[i].value==""){

alert("يرجى إكمال جميع الحقول");

return;

}

}

loading.style.display="flex";

setTimeout(function(){

loading.innerHTML = `<div class="success-container"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div><h2 class="success-title">تم إنشاء الحساب بنجاح</h2></div>`;
  
  
setTimeout(function(){

window.location.href="home.html";

},2000);

},10000);

};
