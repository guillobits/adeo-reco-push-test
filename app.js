const { data } = require('./data');
const { filterCommand } = require('./src/commands/filter')
const { countCommand } = require('./src/commands/count')

const undefinedCommand = () => {
  console.error("The command doesn't exists");
}

const noArgument = () => {
  console.error("node app.js <command>\n");
  console.error("Usage:\n");
  console.error("node app.js --filter=<pattern>\tFilter the list")
  console.error("node app.js --count\t\tCount the list")
}

const commands = {
  '--filter': filterCommand,
  '--count': countCommand,
}

const argv = process.argv.slice(2);

if (argv.length > 0) {
  const command = argv[0].split('=')[0];
  const args = argv[0].split('=').slice(1);

  const handler = commands[command] || undefinedCommand;
  handler(args);
}
else {
  noArgument();
}