import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.reduce(
      (income, transaction): number => {
        // eslint-disable-next-line no-param-reassign
        if (transaction.type === 'income') income += transaction.value;
        return income;
      },
      0,
    );

    const outcomeTransactions = this.transactions.reduce(
      (outcome, transaction): number => {
        // eslint-disable-next-line no-param-reassign
        if (transaction.type === 'outcome') outcome += transaction.value;
        return outcome;
      },
      0,
    );

    const totalTransactions = incomeTransactions - outcomeTransactions;

    const balance: Balance = {
      income: incomeTransactions,
      outcome: outcomeTransactions,
      total: totalTransactions,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
