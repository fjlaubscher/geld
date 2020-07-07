import { selector, selectorFamily } from 'recoil';

export const incomeState = selector<Geld.Income[]>({
  key: 'income',
  get: async () => {
    const response = await fetch('/api/income');
    const { data } = await response.json();
    return data as Geld.Income[];
  }
});

export const incomeByIdState = selectorFamily<Geld.Income, string>({
  key: 'incomeById',
  get: (id) => async () => {
    const response = await fetch(`/api/income/${id}`);
    const { data } = await response.json();
    return data as Geld.Income;
  }
});

export const taxableIncomeState = selector<number>({
  key: 'taxableIncome',
  get: async () => {
    const response = await fetch(`/api/income/taxable`);
    const { data } = await response.json();
    return data as number;
  }
});
