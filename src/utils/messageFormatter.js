function formatMessage(text) {
    text = text.replace(/\n\s*\n/g, '\n\n').trim();
    
    text = text.replace(/```(\w+)?\n?([\s\S]+?)```/g, (_, lang, code) => {
        return `\`\`\`${lang || ''}\n${code.trim()}\n\`\`\``;
    });
    

    text = text.replace(/\$([^$]+)\$/g, '`$1`');
    
    return text;
}

module.exports = {
    formatMessage,
};