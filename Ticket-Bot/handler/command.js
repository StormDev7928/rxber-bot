const { readdirSync } = require('fs');
const ascii = require('ascii-table');
const client = require('..');
let table = new ascii("Dark AC bot");
table.setHeading('Commands', 'Load Status');
var colors = require('colors');

module.exports = (client) => {
  console.log(`Dark AntiCheat Bot`.brightYellow)
        const commands = readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
        for(let file of commands) {
            let pull = require(`../commands/${file}`);
            if(pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅ Success')
            }else {
                table.addRow(file, '❌ Error')
                continue;
            }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        };

    console.log(table.toString().rainbow);

    readdirSync('./events/').forEach((file) => {
        const events = readdirSync('./events/').filter((file) =>
        file.endsWith('.js')
        );
        for (let file of events) {
            let pull = require(`../events/${file}`);
            if(pull.name) {
                client.events.set(pull.name, pull);
            }
        }
        console.log(`${file} Events load Successfully!`.bgCyan)
    })
}