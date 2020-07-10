import { atom, selector, selectorFamily } from 'recoil';

export const expenseAtom = atom<Geld.Expense[] | null>({
  key: 'expense-atom',
  default: null
});

export const expenseState = selector<Geld.Expense[]>({
  key: 'expense',
  get: async ({ get }) => {
    const cachedExpenses = get(expenseAtom);

    if (cachedExpenses) {
      return cachedExpenses;
    }

    const response = await fetch('/api/expense');
    const { data } = await response.json();
    return data as Geld.Expense[];
  },
  set: async ({ set }, newValue) => {
    set(expenseAtom, newValue);
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
