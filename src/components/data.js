const y = require('../keyboard.json');

const data = JSON.parse(JSON.stringify(y));

const arrValueFunc = (status) => data.map((el) => {
  if (el.group === 'alphanumeric') return el[status];
  if (el.group === 'service') return el.key;
  return false;
});

const arrValue = arrValueFunc('key');

export default data;
