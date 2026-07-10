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

loading.innerHTML="<h2>✅ تم إنشاء الحساب بنجاح</h2>";

setTimeout(function(){

window.location.href="home.html";

},2000);

},10000);

};
