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
	rules : [
		current_conditions_for : {
			open_query : ''select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'',
			end_query : '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
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
	]		

}

module.exports = config;