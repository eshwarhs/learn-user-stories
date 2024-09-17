export interface BankAccount {
    name: string;
    age: number;
    balance: number;
    accountNumber?: number;
}

export default class Bank {
    accounts: BankAccount[] = [];

    createAccount(name: string, age: number): void {

        if (age < 0) {
            throw new Error('Age must be positive');
        }
        if (name === '') {
            throw new Error('Name cannot be empty');
        }

        for (const account of this.accounts) {
            if (account.name === name && account.age === age) {
                throw new Error('An account with this name and age already exists');
            }
        }

        const newAccount = {
            name,
            age,
            balance: 0,
            accountNumber: Math.floor(Math.random() * 100000)
        };
        this.accounts.push(newAccount);
    }

    getBalance(accountNumber: number): number | undefined {
        if (this.accounts.find(account => account.accountNumber === accountNumber)) {
            let account =  this.accounts.find(account => account.accountNumber === accountNumber);
            return account?.balance;
        }
        else {
            throw new Error('Account not found');
        }
    }

    deposit(accountNumber: number, amount: number): void {
        let account =  this.accounts.find(account => account.accountNumber === accountNumber);
        if (account) {
            if (amount < 0) {
                throw new Error('Amount must be positive');
            }
            account.balance += amount;
        } else {
            throw new Error('Account not found');
        }
    }

    withdraw(accountNumber: number, amount: number): void {
        let account =  this.accounts.find(account => account.accountNumber === accountNumber);
        if (account) {
            if (account.balance < amount) {
                throw new Error('Insufficient balance');
            }
            account.balance -= amount;
        }
        else {
            throw new Error('Account not found');
        }
    }
}