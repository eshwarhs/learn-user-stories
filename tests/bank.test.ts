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
});
