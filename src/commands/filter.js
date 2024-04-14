const { data } = require('../../data');
const { filter } = require('../utils/filter');

const paramRequired = () => {
  console.error('Please provide a pattern to --filter command\n');
  console.error('Usage: node app.js --filter=<pattern>');
}

const filterCommand = (args) => {
  if (args.length <= 0) {
    paramRequired();
  }
  else {
    const filteredElements = filter(data, args[0]);
    console.log(JSON.stringify(filteredElements, null, 2));
  }
}

module.exports = {
  filterCommand
}