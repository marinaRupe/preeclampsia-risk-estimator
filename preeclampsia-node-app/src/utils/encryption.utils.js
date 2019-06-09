const bcrypt = require('bcrypt');

const rounds = 10;

const encrypt = async (text) => {
  return await bcrypt.hash(text, rounds);
};

const compareEncrypted = (value, encryptedValue) => (bcrypt.compare(value, encryptedValue));

module.exports = {
  encrypt,
  compareEncrypted
};
