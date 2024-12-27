const geminiService = require('../../services/gemini');
const logger = require('../../services/logger');
const { formatMessage } = require('../../utils/messageFormatter');
//const { validateMessage } = require('../../utils/validators');

async function handleMessage(ctx) {
    const userMessage = ctx.message.text;
    const userId = ctx.from.id;

    /*if (!validateMessage(userMessage)) {
        await ctx.reply('Please send a valid homework question.');
        return;
    }*/

    try {
        await ctx.replyWithChatAction('typing');
        logger.info('Processing homework question', { userId, message: userMessage });

        const prompt = geminiService.constructPrompt(userMessage);
        const response = await geminiService.generateResponse(prompt);
        const parsedRes = JSON.parse(response.response).candidates[0].content.parts[0].text
        const formattedResponse = formatMessage(parsedRes);

        const chunks = formattedResponse.match(/.{1,4000}/g) || [];
        
        for (const chunk of chunks) {
            await ctx.reply(chunk, { parse_mode: 'Markdown' });
        }

        logger.info('Successfully answered question', { userId });
    } catch (error) {
        logger.error('Error processing message:', { 
            error: error.message, 
            userId,
            message: userMessage 
        });

        await ctx.reply(
            'Sorry, I encountered an error while processing your question. ' +
            'Please try again or rephrase your question.'
        );
    }
}

module.exports = handleMessage;