import { atom } from 'recoil';

const authAtom = atom<boolean>({
  key: 'auth',
  default: false
});

export default authAtom;
