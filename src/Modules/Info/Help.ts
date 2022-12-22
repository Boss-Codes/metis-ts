import {Command} from "../../Core/Structures/Command";
import {ICommandContext, MetisInterface, CommandPermissions} from "../../types";

class Help extends Command { 
    constructor(){
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
            permLevel: CommandPermissions['user'], 
            enabled: true, 
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext): Promise<any> {
        
        if (!ctx.args){return ctx.channel.createMessage('**Commands List**\n <https://github.com/Boss-Codes/metis-ts/wiki/Commands>\n\n**Bot Support Server**\nhttps://discord.gg/mePghx6dQy')}
        
        const error = {
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
        }
        const cmd = metis.commands.get(ctx.args[0]) || metis.commands.find(cmd => cmd.aliases && cmd.aliases.includes(ctx.args[0]))
        if (!cmd) {return ctx.channel.createMessage({ 
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
        })}
        // perm level better
        let cmdPerm = ''
        if (cmd.permLevel === 0){cmdPerm = 'User'}
        if (cmd.permLevel === 1){cmdPerm = 'Moderator'}
        if (cmd.permLevel === 2){cmdPerm = 'Server Manager'}
        if (cmd.permLevel === 3){cmdPerm = 'Support Staff'}
        if (cmd.permLevel === 4){cmdPerm = 'Developer'}

        const data = { 
            embed: { 
                color: metis.colors.blue, 
                title: `${cmd.module.toLowerCase()}:${cmd.name}`, 
                description: cmd.description, 
                fields: [
                    { name: 'Usage:', value: `\`${cmd.usage}\``}, 
                ]
            }
        }

        if (cmd.example) { 
            data.embed.fields.push({
                name: 'Examples:', 
                value: `\`${cmd.example}\``}
            )
        }

        if (cmd.aliases) { 
            data.embed.fields.push({
                name: 'Aliases:', 
                value: cmd.aliases.map(a => `\`${a}\``).join(", ")
            })
        }

        if (cmd) { 
            ctx.channel.createMessage(data)
            console.log(cmd.permLevel)
        }
        }
    }
module.exports.cmd = Help;