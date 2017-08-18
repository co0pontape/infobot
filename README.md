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
6 - You can add the bot to your slack channel in your slack application
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
1 - TBD
## Contributors
Andy Lu - andy.lu@apps.ask.com