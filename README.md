## Synopsis
This project contains source code for a bot written for the Slack communication tool. It is a bot that listens for registered keywords and constructs the appropriate api call to a defined api service to parse out the response of the api call and return a user friendly answer back to the slack user.
## Motivation
The motivation behind this bot was to allow users to easily get information from various api sources and share the information within a slack channel with others without ever leaving the slack tool. Previously user would have to gather the information they need from an api source via external tools and then paste the information back into the slack channel to share that information. With this bot, they can find the information without leaving slack !
## Setting up bot in Slack
1 - Navigate to 'Manage Apps' in your Slack application (i.e. https://iacapps.slack.com/apps/manage) <br>
2 - Click on 'Custom Integrations' in the left section (i.e. https://iacapps.slack.com/apps/manage/custom-integrations) <br>
3 - Click on 'Bots' in the right section (i.e. https://iacapps.slack.com/apps/A0F7YS25R-bots) <br>
4 - Click on 'Add configuration' <br>
5 - Fill out a user name for your bot so we can add and reference in a slack channel and click 'Add Bot Integration' (i.e @infobot) <br>
6 - Copy and save the “API Token” somewhere, we will need it to setup our bot server. <br>
7 - Fill out the rest of the details and click 'Save Integration'
## Setting up local bot server
1 - Go to https://nodejs.org/en/download/ to download Node and NPM. <br>
2 - Checkout this code repository to a local dir (i.e. C:/development/infobot/)<br>
3 - Make sure you have both node and npm installed, can confirm by opening up cmd and typing 'node -v' and 'npm -v' <br>
4 - Go to the newly created code repo dir and execute 'npm install' <br>
5 - Go to 'bot_config.js' and fill out 'LOCAL_SLACK_TOKEN' with value from step 6 in 'Setting up bot in Slack' <br>
6 - Run 'node bot.js' to start the bot <br>
7 - You can add the bot to your slack channel in your slack application
## Setting up heroku bot server
1 - Login into your heroku account <br>
2 - Go to create new app and click 'Create App' (i.e. https://dashboard.heroku.com/new-app) <br>
3 - Go to 'Deploy' section and connect to your public code repository (i.e. https://dashboard.heroku.com/apps/rocky-shelf-68936/deploy/github) <br>
4 - Go to 'Settings' and click on "Reveal Config Vars" in 'Config Variables' section <br>
5 - Add 'SLACK_TOKEN' as KEY and VALUE would be your unique api key from step 6 in 'Setting up bot in Slack' <br>
6 - Add 'API_CONFIG' as KEY and VALUE would be the api js you would like to use for this bot (i.e ./yahoo_weather_api.js)<br>
6 - Go back to 'Deploy' section and click 'Deploy Branch' in 'Manual Deploy' section <br>
7 - Once build is finish the app should be started up. You can confirm by going to 'View logs' under the 'More' menu on the top right (i.e. https://dashboard.heroku.com/apps/rocky-shelf-68936/logs) <br>
8 - You can add the bot to your slack channel in your slack application
## Development and testing
1 - You can create your own api config js and just update API_CONFIG to point to your own js <br>
2 - Your api config js must have the following attributes, using the predefined api_yahoo_weather.js as example <br>
api_protocol : STRING, api protocol (i.e. https) <br>
api.host : STRING, hostname (i.e query.yahooapis.com) <br> 
api.port : INTEGER, port number (i.e. 443) <br>
api.path : STRING, api full path (i.e. /v1/public/yql?q=) <br>
api.method : STRING, api method (i.e. GET) <br>
error_message : STRING, error message to display to user when api failed (i.e 'is unknown...') <br>
type: ARRAY of STRING, type of slack listener bot will respond to (i.e ['direct_message','direct_mention'])  <br>
hears : STRING, keywords bot will listen for and fire api and response (i.e 'current conditions for') <br>
rules : OBJECT JSON, describing the api format to call and response format to send back to slack user, example below <br>
current_conditions_for : combines the keyword by replacing spaces with underscores to create the object key <br>
current_conditions_for.append_query: BOOLEAN, whether this api will need queries appended to the api call <br>
current_conditions_for.open_query : STRING, any querystring necessary to be appended before the api call (i.e. 'select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22') <br>
current_conditions_for.end_query : STRING, any querystring necessary to be appended before the api call (i.e. '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys') <br>
current_conditions_for.result_path : STRING, the xpath to get to the result of the api call (i.e 'query.results.channel.item.condition') <br>
current_conditions_for.result_keys : ARRAY of STRING, the keys to get the values from the response to construct the answer to slack user (i.e ['temp','text']) <br>
current_conditions_for.result_text : OBJECT JSONs, contains the values for prefix and suffix to construct with the api response key to make a friendly user message, example below: <br>
current_conditions_for.result_text.temp.prefix : STRING, prefix to add to api response value <br>
current_conditions_for.result_text.temp.suffix : STRING, suffix to add to api response value <br>
## Sample slack usage
User [3:32 PM] <br>
@infobot current conditions for yonkers ny <br>
infobotAPP [3:32 PM] <br>
current conditions for yonkers ny is 81 degrees and Cloudy. <br>
## Contributors
Andy Lu - andy.lu@apps.ask.com