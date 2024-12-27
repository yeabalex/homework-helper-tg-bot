require('dotenv').config();

const config = {
    telegram: {
        token: process.env.TELEGRAM_BOT_TOKEN,
        webhookUrl: null,
    },
    app: {
        environment: process.env.NODE_ENV || 'development',
        logLevel: process.env.LOG_LEVEL || 'info',
    },
};

const requiredEnvVars = ['TELEGRAM_BOT_TOKEN'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

module.exports = config;