async function helpCommand(ctx) {
    const message = `
How to use Homework Helper Bot:

1. Simply type your homework question
2. Add subject context if needed (e.g., "Math: solve this equation...")
3. Be specific with your questions
4. Wait for my detailed explanation

Tips for better results:
• Include relevant context
• Ask one question at a time
• Specify what aspect you need help with

Commands:
/start - Start the bot
/help - Show this help message
    `.trim();

    await ctx.reply(message);
}

module.exports = helpCommand;