var LOCAL_SLACK_TOKEN = '';
var LOCAL_API_CONFIG = '';
var bot_config = {
    debug : true,
    api_token: process.env.SLACK_TOKEN?process.env.SLACK_TOKEN:LOCAL_SLACK_TOKEN,
    api_config: process.env.API_CONFIG?process.env.API_CONFIG:LOCAL_API_CONFIG
}

module.exports = bot_config;
