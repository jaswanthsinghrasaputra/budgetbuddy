"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jaswanth Singh",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1234,
};

const account2 = {
  owner: "Vijay Singh",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2345,
};

const account3 = {
  owner: "Prakash Singh",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  pin: 3456,
};

const account4 = {
  owner: "Sai Ram Singh",
  movements: [430, 1000, 700, 50, 90],
  pin: 4567,
};
const account5 = {
  owner: "Amruth Singh",
  movements: [430, 1000, 700, 50, 90],
  pin: 5678,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// const displayMovements = function(movements) {
//     console.log(movements)

// }
// displayMovements(account1.movements)

function displayMovements(movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  // console.log(movs);
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `       
     <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}₹</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function calDisplayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, cur) => {
    // console.log(acc)
    return acc + cur;
  }, 0);
  labelBalance.textContent = `${acc.balance}₹`;
}

function calDisplaySummary(movements) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}₹`;

  const outs = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outs)}₹`;
}

// added username to each object in accounts array
function createUserName(accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
}

createUserName(accounts);
console.log(accounts);

let currentAccount;

function upDateUI(currentAccount) {
  displayMovements(currentAccount.movements);

  calDisplayBalance(currentAccount);

  calDisplaySummary(currentAccount.movements);
}

function btnLoginHandler(event) {
  event.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back ${currentAccount.owner}`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = "";

    inputLoginPin.blur();
    inputLoginUsername.blur();

    upDateUI(currentAccount);
  }
}

function btnTransferHandler(event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);

  if (amount > 0 && currentAccount.balance >= amount) {
    console.log(amount);
    currentAccount.movements.push(-amount);
    upDateUI(currentAccount);
  }
  inputTransferAmount.value = "";
}

function btnLoanHandler(event) {
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);
  // console.log("LOAN") &&
  // currentAccount.movements.some((mov) => mov >= amount * 0.1)
  if (amount > 0) {
    currentAccount.movements.push(amount);
    upDateUI(currentAccount);
  }
  inputLoanAmount.value = "";
}

function btnCloseHandler(event) {
  event.preventDefault();
  // console.log("DELETE")
  if (
    currentAccount.username === inputCloseUsername.value &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    console.log(index);
  }
  inputClosePin.value = inputCloseUsername.value = "";
  labelWelcome.textContent = "Log in to get started";
  alert("Did you wanna to close your account permanently!");
}

let sorted = false;
function btnSortHandler(event) {
  event.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
}

btnLogin.addEventListener("click", btnLoginHandler);

btnTransfer.addEventListener("click", btnTransferHandler);

btnLoan.addEventListener("click", btnLoanHandler);

btnClose.addEventListener("click", btnCloseHandler);

btnSort.addEventListener("click", btnSortHandler);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const EurToUsd = 1.1;
// const movementsUSD = movements.map(function (mov) {
//   return mov * EurToUsd;
// });

// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDFor = [];
// for (const mov of movements) {
//   movementsUSDFor.push(mov * EurToUsd);
// }
// console.log(movementsUSDFor);

// const EurToUsd = 1.1;
// const movementsUSD = movements.map( (mov) => {
//   return mov * EurToUsd;
// });

// console.log(movementsUSD)

// const MovementDescription = movements.map(
//   (mov, i) =>
//     `Movements ${i + 1} : You ${
//       mov > 0 ? "deposited" : "withdrawal"
//     } ${Math.abs(mov)}`
// );
// console.log(MovementDescription);

// console.log(movements);

// const balance = movements.reduce((acc, cur, i, arr) => {
//   console.log(acc)
//   return acc + cur;
// }, 0);

// console.log(balance)

// let balance2 = 0
// for (const mov of movements) {
//   balance2 += mov

// }
// console.log("Balance :-", balance2)

// const account = accounts.find(acc => acc.owner === 'Jessica Davis')
// console.log(account)

// console.log(account1.movements.includes(-130))

// console.log(account1.movements.some(mov => mov < 300))

// console.log(account1.movements.every(mov => mov < 300))
