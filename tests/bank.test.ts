import Bank from '../src/bank';
import { BankAccount } from '../src/bank';

describe('Bank class', () => {
    let bank: Bank;
    let testAccount: BankAccount;

    beforeAll(() => {
        bank = new Bank();
    });

    beforeEach(() => {
        // Create a new account before each test
        testAccount = { name: 'John Doe', age: 30, balance: 0, accountNumber: Math.floor(Math.random() * 100000) };
        bank.accounts.push(testAccount);
    });

    describe('createAccount', () => {
        it('should create an account with a balance of 0', () => {
            bank.createAccount('Jane Doe', 25);
            const account = bank.accounts.find(acc => acc.name === 'Jane Doe' && acc.age === 25);
            expect(account).toBeDefined();
            expect(account!.balance).toBe(0);
            expect(account!.accountNumber).toBeDefined();
        });

        it('should throw an error if name is empty', () => {
            expect(() => bank.createAccount('', 30)).toThrow('Name cannot be empty');
        });

        it('should throw an error if an account with the same name and age already exists', () => {
            expect(() => bank.createAccount('John Doe', 30)).toThrow('An account with this name and age already exists');
        });

        it('should throw an error if age is negative', () => {
            expect(() => bank.createAccount('John Doe', -30)).toThrow('Age must be positive');
        });
    });
    
    describe('getBalance', () => {
        it('should return the correct balance for a valid account number', () => {
            const balance = bank.getBalance(testAccount.accountNumber!);
            expect(balance).toBe(testAccount.balance);
        });

        it('should throw an error for an invalid account number', () => {
            expect(() => bank.getBalance(12345)).toThrow('Account not found');
        });
    });

    describe('deposit', () => {
        it('should deposit money into the account', () => {
            bank.deposit(testAccount.accountNumber!, 100);
            expect(bank.getBalance(testAccount.accountNumber!)).toBe(100);
        });

        it('should throw an error when depositing a negative amount', () => {
            expect(() => bank.deposit(testAccount.accountNumber!, -50)).toThrow('Amount must be positive');
        });

        it('should throw an error when depositing into an invalid account', () => {
            expect(() => bank.deposit(12345, 100)).toThrow('Account not found');
        });
    });

    describe('withdraw', () => {
        it('should withdraw money from the account', () => {
            bank.deposit(testAccount.accountNumber!, 100);
            bank.withdraw(testAccount.accountNumber!, 50);
            expect(bank.getBalance(testAccount.accountNumber!)).toBe(50);
        });

        it('should throw an error if withdrawal amount is greater than the balance', () => {
            bank.deposit(testAccount.accountNumber!, 100);
            expect(() => bank.withdraw(testAccount.accountNumber!, 150)).toThrow('Insufficient balance');
        });

        it('should throw an error when withdrawing from an invalid account', () => {
            expect(() => bank.withdraw(12345, 50)).toThrow('Account not found');
        });
    });
});
