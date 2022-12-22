"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
class Help extends Command_1.Command {
    constructor() {
        super({
            name: 'help',
            module: 'Info',
            description: 'Lists the bot\'s commands or gives information on a specific command.',
            usage: '[command name]',
            example: 'serverinfo',
            requiredGuilds: [],
            requiredUsers: [],
            deleteOnUsage: false,
            showOnHelp: true,
            permLevel: types_1.CommandPermissions['user'],
            enabled: true,
            aliases: ['command-info']
        });
    }
    async execute(metis, ctx) {
        if (!ctx.args) {
            return ctx.channel.createMessage('**Commands List**\n <https://github.com/Boss-Codes/metis-ts/wiki/Commands>\n\n**Bot Support Server**\nhttps://discord.gg/mePghx6dQy');
        }
        const cmd = metis.commands.get(ctx.args[0]) || metis.commands.find(cmd => cmd.aliases && cmd.aliases.includes(ctx.args[0]));
        if (!cmd) {
            return ctx.channel.createMessage({
                embeds: [{
                        color: metis.colors.red,
                        description: `${metis.emotes.error} I could not find that command or module.`,
                    }],
                flags: 64,
                components: [{
                        type: 1,
                        components: [{
                                type: 2,
                                style: 5,
                                label: "Command List",
                                url: 'https://github.com/Boss-Codes/metis-ts/wiki/Commands'
                            },
                            {
                                type: 2,
                                style: 5,
                                label: 'Support Server',
                                url: 'https://discord.gg/mePghx6dQy'
                            }],
                    }],
            });
        }
        const data = {
            embed: {
                color: metis.colors.blue,
                title: `${cmd.module.toLowerCase()}:${cmd.name}`,
                description: cmd.description,
                fields: []
            }
        };
        if (!cmd.usage) {
            data.embed.fields.push({
                name: 'Usage:',
                value: `\`${cmd.usage}\``
            });
        }
        if (cmd.usage) {
            data.embed.fields.push({
                name: 'Usage:',
                value: `\`${cmd.name} ${cmd.usage}\``
            });
        }
        if (cmd.example) {
            data.embed.fields.push({
                name: 'Example:',
                value: `\`${cmd.name} ${cmd.example}\``
            });
        }
        if (cmd.aliases) {
            data.embed.fields.push({
                name: 'Aliases:',
                value: cmd.aliases.map(a => `\`${a}\``).join(", ")
            });
        }
        if (cmd.permLevel === 0) {
            data.embed.fields.push({
                name: 'Permissions:',
                vaule: 'User'
            });
        }
        if (cmd) {
            ctx.channel.createMessage(data);
            console.log(cmd.permLevel);
        }
    }
}
module.exports.cmd = Help;
