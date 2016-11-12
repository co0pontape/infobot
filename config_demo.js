var config = {
	debug : true,
	api_protocol: 'https',
	api : {
		host : 'hp.myway.com',	
		path : '/manage/info/',
		method : 'GET'
	},
	error_message : 'is unknown...',
	type: ['direct_message','direct_mention'],
	hears : 'version',	
	rules : {
		version : {
			append_query : false,
			result_path : 'build',
			result_keys : ['version'],
			result_text : {
				version : {
					prefix : ' deployed ',
					suffix : '.'
				}
			}			
		}
	}			
	
}

module.exports = config;