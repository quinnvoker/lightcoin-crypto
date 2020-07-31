class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((total, current) => total + current.value, 0);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
    return false;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return this.amount > 0 && this.amount < this.account.balance;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return this.amount > 0;
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

const t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

const t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

const t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

const t4 = new Deposit(-120.00, myAccount);
t4.commit();
console.log('Transaction 4:', t4);

const t5 = new Withdrawal(50, myAccount);
t5.commit();
console.log('Transaction 5:', t5);

console.log('Balance:', myAccount.balance);
