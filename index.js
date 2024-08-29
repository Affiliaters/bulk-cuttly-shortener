const axios = require('axios');
const async = require('async');

const shortenLink = async (token, link) => {
    try {
        const response = await axios.get(
            'https://cutt.ly/api/api.php',
            {
                params: {
                    key: token,
                    short: link,
                },
            }
        );
        const result = response.data;
        

        if (result.url.status === 7) { // Status 7 means success
            return { token, link, short_url: result.url.shortLink };
        } else {
            return { token, link, error: result.url.title || 'Unknown error' };
        }
    } catch (error) {
        return { token, link, error: error.response ? error.response.data : error.message };
    }
};

const bulkCuttlyShortener = async (tokens, links) => {
    const results = [];
    const failedTokens = new Set();

    const processLink = async (link) => {
        let linkProcessed = false;
        let retryTokens = [...tokens];

        while (retryTokens.length > 0 && !linkProcessed) {
            const token = retryTokens.shift();
            
            if (failedTokens.has(token)) continue;
            
            const result = await shortenLink(token, link);
            
            if (result?.error?.message && (result?.error?.message == "You have reached your monthly link limit. You can upgrade your subscription plan to add more links.")) {   
                failedTokens.add(token);
                continue;
            }
            if (result.error) {
                continue;
            }
            
            results.push(result);
            linkProcessed = true;
        }
    };

    // Process all links concurrently with a specified limit on the number of concurrent operations
    await async.eachLimit(links, 1, processLink);

    return {
        results: results,
        failedTokens: Array.from(failedTokens),
    };
};

module.exports = {
    bulkCuttlyShortener,
};
