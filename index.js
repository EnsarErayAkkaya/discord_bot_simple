const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");

//get static dataset for dialogues
const filename = "dataset.json";

const dataset = fs.existsSync(filename) ?
  JSON.parse(fs.readFileSync(filename).toString())
  :"error";


if(dataset != "error")
{
  
    let regexArray = [];
    dataset.dialogues.forEach(element => {
        regexArray.push(new RegExp(`\\\w*${element.tag}\\\w*`, 'gi'));
    });

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('message', msg => {

        if (msg.author.id === client.user.id) return;

        const data = msg.content.toLocaleLowerCase();

        const index = Math.floor(Math.random() * 3).toString();

        for (let i = 0; i < regexArray.length; i++) {
            const element = regexArray[i];
            if (data.match(element)) {
                //console.log(dataset.dialogues[i][index]);
                const response = dataset.dialogues[i][index];
                if (response != null && response != "")
                    msg.reply(response);
            }
        }
    });

    client.login(dataset.token);
}
else{
    console.log("error at dataset");
}

 
