// initialize bot config
var bot_config = require('./bot_config.js');

//test environment
if (!bot_config.api_token) {
    console.log('Error: Specify SLACK_TOKEN in environment');
    process.exit(1);
}

var config = require(bot_config.api_config);
var httpClient = (config.api_protocol=='http'?require('http'):require('https'));
var _ = require('lodash');

// botkit initialize
const botkit = require('botkit');
const controller = botkit.slackbot({
  debug: false,
});

controller.spawn({
  token: bot_config.api_token
}).startRTM();

if (process.env.PORT) {
	controller.setupWebserver(process.env.PORT);
}

// give the bot something to listen for.
controller.hears(config.hears, config.type, function(bot,message) {

	if(bot_config.debug) {
		console.log("message: ", message);
		console.log("config.api: ", config.api);
	}

	var key = _.replace(config.hears, / /g, "_");
	var httpClientOptions = _.clone(config.api);
	
	if(bot_config.debug) {
		console.log("opening httpClientOptions:", httpClientOptions);
	}
	
	if(config.rules[key].append_query) {
		if(config.rules[key].open_query) {
			httpClientOptions.path += config.rules[key].open_query;	
		}			
		httpClientOptions.path += encodeURIComponent(message.text.replace(config.hears,''));
		if(config.rules[key].end_query) {
			httpClientOptions.path += config.rules[key].end_query;	
		}
	}
	
	if(bot_config.debug) {
		console.log("ending httpClientOptions:", httpClientOptions);
	}

	// do the GET request
	var reqGet = httpClient.request(httpClientOptions, function(res) {
		if(bot_config.debug) {
			console.log("statusCode: ", res.statusCode);
			console.log("headers: ", res.headers);		
		}
		res.on('data', function(d) {
			if(bot_config.debug) {
				console.info('GET result:\n');
				process.stdout.write(d);
				console.info('\n\nCall completed');			
			}
			obj = JSON.parse(d);
			if(!_.get(obj, config.rules[key].result_path)) {
				bot.reply(message, message.text + ' ' + config.error_message);	
			} else {
				var result = '';
				for( var i = 0,length = config.rules[key].result_keys.length; i < length; i++ ) {	
					if(_.get(obj, config.rules[key].result_path+'.'+config.rules[key].result_keys[i])) {
						result += config.rules[key].result_text[config.rules[key].result_keys[i]].prefix;
						result += _.get(obj, config.rules[key].result_path+'.'+config.rules[key].result_keys[i]);
						result += config.rules[key].result_text[config.rules[key].result_keys[i]].suffix;
					}
				}
				bot.reply(message, message.text + ' is' + result);			
			}
			
		});

	});	
	
	reqGet.end();
	reqGet.on('error', function(e) {
		console.error(e);
		bot.reply(message, message.text + ' ' + config.error_message);
	});
  
});