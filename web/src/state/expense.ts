import { selector, selectorFamily } from 'recoil';

export const expenseState = selector<Geld.Expense[]>({
  key: 'expense',
  get: async () => {
    const response = await fetch('/api/expense');
    const { data } = await response.json();
    return data as Geld.Expense[];
  }
});

export const expenseByIdState = selectorFamily<Geld.Expense, string>({
  key: 'expenseById',
  get: (id) => async () => {
    const response = await fetch(`/api/expense/${id}`);
    const { data } = await response.json();
    return data as Geld.Expense;
  }
});
