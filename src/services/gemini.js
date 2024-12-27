const axios = require('axios');
const logger = require('./logger');

class GeminiService {
    constructor() {
        this.apiUrl = 'https://r682gu2f0f.execute-api.us-west-2.amazonaws.com/prod/api/microservice/ai';
    }

    async generateResponse(prompt, retryCount = 0) {
        try {
            const result = await Promise.race([
                axios.post(this.apiUrl, {
                    body: {
                        prompt: prompt
                    }
                }),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Timeout')), 60000)
                )
            ]);

            return result.data;
        } catch (error) {
            logger.error('API error:', { error: error.message, prompt });

            if (retryCount < 3) {
                logger.info(`Retrying API call (${retryCount + 1}/3)`);
                return this.generateResponse(prompt, retryCount + 1);
            }

            throw error;
        }
    }

    constructPrompt(question) {
        return `Question: ${question}
        
        break it down step by step:`;
    }
}

module.exports = new GeminiService();