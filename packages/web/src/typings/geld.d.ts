declare namespace Geld {
  interface Income {
    id: number;
    description: string;
    date: string;
    amount: number;
    attachment: string;
  }

  interface Expense {
    id: number;
    description: string;
    date: string;
    amount: number;
    attachment: string;
  }
}
