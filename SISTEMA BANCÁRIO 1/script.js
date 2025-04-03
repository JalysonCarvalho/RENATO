document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    window.location.href = "menu.html";
});

let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let lastAccountNumber = parseInt(localStorage.getItem("lastAccountNumber")) || 1;

function saveAccounts() {
    localStorage.setItem("accounts", JSON.stringify(accounts));
    localStorage.setItem("lastAccountNumber", lastAccountNumber);
}

function createAccount(name, cpf, address, phone, type) {
    let account = {
        number: String(lastAccountNumber).padStart(4, '0'),
        agency: "1234",
        balance: 0,
        type, 
        holder: { name, cpf, address, phone }
    };
    accounts.push(account);
    lastAccountNumber++;
    saveAccounts();
}

function getAccount(number) {
    return accounts.find(acc => acc.number === number);
}

function deleteAccount(number) {
    accounts = accounts.filter(acc => acc.number !== number);
    saveAccounts();
}

function creditAccount(number, amount) {
    let account = getAccount(number);
    if (account) {
        account.balance += amount;
        saveAccounts();
    }
}

function debitAccount(number, amount) {
    let account = getAccount(number);
    if (account && account.balance >= amount) {
        account.balance -= amount;
        saveAccounts();
    }
}

function applyInterest(number, rate) {
    let account = getAccount(number);
    if (account && account.type === "poupanca") {
        account.balance += account.balance * (rate / 100);
        saveAccounts();
        return true;
    }
    return false;
}

document.getElementById("applyInterestForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    let accountNumber = document.getElementById("accountNumber").value;
    let rate = parseFloat(document.getElementById("interestRate").value);

    if (!isNaN(rate) && rate > 0) {
        let success = applyInterest(accountNumber, rate);
        let messageElement = document.getElementById("message");
        
        if (success) {
            messageElement.textContent = "Juros aplicados com sucesso!";
            messageElement.style.color = "green";
        } else {
            messageElement.textContent = "Apenas contas poupança podem render juros!";
            messageElement.style.color = "red";
        }

        messageElement.classList.remove("hidden");
    }
});
