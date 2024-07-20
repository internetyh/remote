requires pm2 to start/restart the bot
- can be done by running "npm install pm2 -g"

spawn a terminal instance and run something
/run [command]
command: the command to run

reload a given command
/reload

deploys any functional changes to commands
/deploy

retarts the bot process using pm2
/restart

takes a screenshot of the desktop
/screenshot

create a new "shortcut" command
- after a command is created need to run /deploy then /restart
/add_fav [command] [name] [args]
command: the actual command to be run, if it has args they need to be enclosed in ${}
name: the name of the command
args: any args in the command, need to have the same name and are csv

delete a non-core command
/delete [command]
command: the command to delete
