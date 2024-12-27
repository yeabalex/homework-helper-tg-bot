const logger = require('../../services/logger');

async function startCommand(ctx) {
    const userId = ctx.from.id;
    logger.info('New user started the bot', { userId });

    const message = `
Welcome to Homework Helper Bot! 📚

I can help you with:
- Understanding complex concepts
- Breaking down problems step by step
- Providing detailed explanations
- Giving relevant examples

Just send me your homework question and I'll help you understand it better!

Use /help to see all available commands.
    `.trim();

    const res = await ctx.reply(message);
    console.log(message);
}

module.exports = startCommand;