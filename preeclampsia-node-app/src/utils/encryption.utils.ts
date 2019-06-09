import * as bcrypt from 'bcrypt';

const rounds = 10;

export const encrypt = (text: string): Promise<string> => (bcrypt.hash(text, rounds));

export const compareEncrypted = (value: string, encryptedValue: string): Promise<boolean> => (
  bcrypt.compare(value, encryptedValue)
);

export default {
  encrypt,
  compareEncrypted
};
