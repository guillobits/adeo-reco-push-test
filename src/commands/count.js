const { data } = require('../../data');
const { count } = require("../utils/count");

const countCommand = () => {
  const countElements = count(data);
  console.log(JSON.stringify(countElements, null, 2));
}

module.exports = {
  countCommand
}