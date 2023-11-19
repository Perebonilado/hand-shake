import * as bcrypt from 'bcrypt';
import { saltRounds } from 'src/constants';

export const hashPassword = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
