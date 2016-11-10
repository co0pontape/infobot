var config = {
	debug : true,
	api_protocol: 'https',
	api : {
		host : 'query.yahooapis.com',
		port : 443,
		path : '/v1/public/yql?q=',
		method : 'GET' 
	},
	error_message : 'is unknown...',
	type: ['direct_message','direct_mention'],
	hears : 'current conditions for',
	result_path : 'query.results.channel.item.condition',
	result_keys : ['temp','text'],
	result_text : {
		temp : {
			prefix : ' ',
			suffix : ' degrees'
		},
		text : {
			prefix : ' and is currently ',
			suffix : '.'
		}
	}
}

module.exports = config;