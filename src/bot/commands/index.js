const startCommand = require('./start');
const helpCommand = require('./help');

const commands = {
    start: startCommand,
    help: helpCommand,
};

const registerCommands = (bot) => {
    Object.entries(commands).forEach(([command, handler]) => {
        bot.command(command, handler);
    });
};

module.exports = {
    registerCommands,
};