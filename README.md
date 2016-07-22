WebApp

Its a UI tool for rendering data based on API call and have the functionality to write/modify database as well.


Background:

This UI Tool is based on the React/Redux Framwork.


Dependencies:

Following are the required software for this Tool setup:

1. Nodejs

	# Using Ubuntu
		curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
		sudo apt-get install -y nodejs

	# Using Debian, as root
		curl -sL https://deb.nodesource.com/setup_4.x | bash -
		apt-get install -y nodejs


2. Updating npm

	Node comes with npm installed so you should have a version of npm. However, npm gets updated more frequently than Node does, so you'll want to make sure it's the latest version.

	sudo npm install npm -g



Running server:

	npm start


Getting the other dependencies:

	add all the dependencies into package.json file and run the following command to get those dependencies

	- npm install



How to test:

	run the npm server and do localhost with the specified port (7777 by default) to see the running UI tool in the browser

	