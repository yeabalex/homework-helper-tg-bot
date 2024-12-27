const { Telegraf } = require('telegraf');
const config = require('../config/config');
const logger = require('../services/logger');
const { registerCommands } = require('./commands');
const handleMessage = require('./handlers/messageHandler');
//const errorHandler = require('./handlers/errorHandler');

const bot = new Telegraf(config.telegram.token);

registerCommands(bot);
console.log("hey")

bot.on('text',handleMessage)

//bot.catch(errorHandler);

async function startBot() {
    try {
        
        if (config.app.environment === 'production' && config.telegram.webhookUrl) {
            await bot.launch({
                webhook: {
                    domain: config.telegram.webhookUrl,
                    port: process.env.PORT || 3000
                }
            });
            console.log("webhook")
            logger.info('Bot started with webhook');
        } else {
            await bot.launch();
            logger.info('Bot started with polling');
        }
    } catch (error) {
        logger.error('Failed to start bot:', error);
        console.log("catch")
        process.exit(1);
    }
}

startBot();


process.once('SIGINT', () => {
    logger.info('SIGINT signal received');
    bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
    logger.info('SIGTERM signal received');
    bot.stop('SIGTERM');
});