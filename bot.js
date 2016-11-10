//test environment
if (!process.env.SLACK_TOKEN) {
    console.log('Error: Specify SLACK_TOKEN in environment');
    process.exit(1);
}

var config = require('./config.js');
var httpClient = (config.api_protocol=='http'?require('http'):require('https'));
var _ = require('lodash');

// botkit initialize
const botkit = require('botkit');
const controller = botkit.slackbot({
  debug: false,
});

controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM();

if (process.env.PORT) {
	controller.setupWebserver(process.env.PORT);
}

// give the bot something to listen for.
controller.hears(config.hears, config.type, function(bot,message) {

	var key = _.replace(config.hears, / /g, "_");
	var options = config.api;
	
	if(config.rules[key].append_query) {
		if(config.rules[key].open_query) {
			options.path += config.rules[key].open_query;	
		}			
		options.path += encodeURIComponent(message.text.replace(config.hears,''));
		if(config.rules[key].end_query) {
			options.path += config.rules[key].end_query;	
		}
	}
	
	if(config.debug) {
		console.log(options);
	}

	// do the GET request
	var reqGet = httpClient.request(options, function(res) {
		if(config.debug) {
			console.log("statusCode: ", res.statusCode);
			console.log("headers: ", res.headers);		
		}
		res.on('data', function(d) {
			if(config.debug) {
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