import { atom, selector, selectorFamily } from 'recoil';

export const incomeAtom = atom<Geld.Income[] | null>({
  key: 'income-atom',
  default: null
});

export const incomeState = selector<Geld.Income[]>({
  key: 'income',
  get: async ({ get }) => {
    const cachedIncome = get(incomeAtom);

    if (cachedIncome) {
      return cachedIncome;
    }

    const response = await fetch('/api/income');
    const { data } = await response.json();
    return data as Geld.Income[];
  },
  set: async ({ set }, newValue) => {
    set(incomeAtom, newValue);
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
