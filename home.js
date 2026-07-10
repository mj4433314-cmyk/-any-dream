const walletAddress = "THJN4XBKxbZNYsw7YAHmNiZSupn3kVEDFP";

function showWallet(packageName){
    const text =
`💳 محفظة الإيداع TRC20

${walletAddress}

📦 الباقة:
${packageName}

بعد التحويل اضغط موافق وأرسل صورة التحويل.`;

    alert(text);
}

document.addEventListener("DOMContentLoaded", function(){

    document.querySelectorAll(".package").forEach(function(card){

        card.style.cursor = "pointer";

        card.addEventListener("click", function(){

            const name =
                this.querySelector("h3") ?
                this.querySelector("h3").innerText :
                "باقة استثمار";

            showWallet(name);

        });

    });

});
