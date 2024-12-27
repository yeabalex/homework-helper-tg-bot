const axios = require('axios');
const config = require('../config/config');
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
                    setTimeout(() => reject(new Error('Timeout')), config.gemini.timeout)
                )
            ]);

            return result.data;
        } catch (error) {
            logger.error('API error:', { error: error.message, prompt });

            if (retryCount < config.gemini.maxRetries) {
                logger.info(`Retrying API call (${retryCount + 1}/${config.gemini.maxRetries})`);
                return this.generateResponse(prompt, retryCount + 1);
            }

            throw error;
        }
    }

    constructPrompt(question) {
        return `As a helpful tutor, I'll assist with this homework question. 
        I'll provide explanations that help you understand, rather than just giving answers.
        Question: ${question}
        
        break this down step by step:`;
    }
}

module.exports = new GeminiService();