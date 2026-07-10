function showWallet() {
    alert(
`TRC20 Wallet

THJN4XBKxbZNYsw7YAHmNiZSupn3kVEDFP`
    );
}

document.querySelectorAll(".activate-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        alert(
`Deposit Address (TRC20)

THJN4XBKxbZNYsw7YAHmNiZSupn3kVEDFP`
        );
    });
});

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", function () {

        document.querySelectorAll(".nav-item")
        .forEach(i => i.classList.remove("active"));

        this.classList.add("active");

    });
});
