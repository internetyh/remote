requires pm2 to start/restart the bot
- can be done by running "npm install pm2 -g"

/run [command]
- spawn a terminal instance and run something
- command: the command to run

/reload
- reload a given command

/deploy
- deploys any functional changes to commands

/restart
- retarts the bot process using pm2

/screenshot
- takes a screenshot of the desktop

/add_fav [command] [name] [args]
- create a new "shortcut" command
- after a command is created need to run /deploy then /restart
- command: the actual command to be run, if it has args they need to be enclosed in ${}
- name: the name of the command
- args: any args in the command, need to have the same name and are csv

/delete [command]
- delete a non-core command
- command: the command to delete
