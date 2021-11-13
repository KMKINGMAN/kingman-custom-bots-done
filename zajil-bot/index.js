//discord.js@12.5.0
const { Client, MessageEmbed } = require("discord.js");
/**
 * يفضل تحطو ب .ENV 
 */
const token = "BOT_TOKEN";
const prefix = "BOT_PREFIX"
/**
 * هون حط اي دي تبعك عشان انت الوحدي الي تقدر تحط تشانيل زاجل للداتابيس
 */
const zajil_controler_id = '878280415327158292'
//quick.db@7.1.3
const quick = require("quick.db");
const client = new Client();
client.on("ready", ()=> {
    console.log(`[${client.user.username}] Ready`)
});
/**
 * اذا انت كوبي بيستر 
 * لا تسرق الحقوق يا ابن الناس
 */
client.on("message", async(kmsg)=> {
    if (!kmsg.content.startsWith(prefix) || kmsg.author.bot) return;
    let cmd = kmsg.content.toLowerCase().slice(prefix.length).split(" ")[0];
    let args = kmsg.content.split(" ").slice(1);
    switch (cmd) {
        case 'setchannel':
            if(kmsg.author.id !== zajil_controler_id) return;
            let channel = kmsg.mentions.channels.first() || kmsg.guild.channels.cache.get(args[0]);
            if(!channel){
                return kmsg.channel.send(new MessageEmbed({
                    title: `ERROR`,
                    description: `you need mention channel`,
                    color: `RED`,
                    footer: {
                        text: `PowerBy KINGMAN STUDIO`
                    }
                })) 
            }
            if(channel.type !== 'text'){
                return kmsg.channel.send(new MessageEmbed({
                    title: `ERROR`,
                    description: `channel type must be text channel`,
                    color: `RED`,
                    footer: {
                        text: `PowerBy KINGMAN STUDIO`
                    }
                }))
            }
            let data = await quick.set(`zajil_data`, { mainGuild: kmsg.guild.id, channel: kmsg.channel.id });
            kmsg.channel.send(
                new MessageEmbed({
                title: `Done`,
                description: `**Done\nZajil Channel :<#${channel.id}>**`,
                color: `GREEN`,
                footer: {
                    text: `PowerBy KINGMAN STUDIO`
                }
            }))
            break;
        case 'zajil':
            if(kmsg.guild){
                return kmsg.channel.send(new MessageEmbed({
                    title: `ERROR`,
                    description: `This commands only work on Dms`,
                    color: `RED`,
                    footer: {
                        text: `PowerBy KINGMAN STUDIO`
                    }
                }))
            };
            let data_bace = await quick.fetch(`zajil_data`);
            if(!data_bace){
                return kmsg.channel.send(new MessageEmbed({
                    title: `ERROR`,
                    description: `I CANT FIND ZAJIL DATA`,
                    color: `RED`,
                    footer: {
                        text: `PowerBy KINGMAN STUDIO`
                    }
                }))
            }
            let mainZajil_Guild = client.guilds.fetch(data_bace.mainGuild);
            if(!mainZajil_Guild){
                return kmsg.channel.send(new MessageEmbed({
                    title: `ERROR`,
                    description: `I CANT FIND ZAJIL GUILD`,
                    color: `RED`,
                    footer: {
                        text: `PowerBy KINGMAN STUDIO`
                    }
                }))
            }
            let channelzajel = await (await mainZajil_Guild).channels.cache.get(data_bace.channel);
            if(!channelzajel){
                return kmsg.channel.send(new MessageEmbed({
                    title: `ERROR`,
                    description: `I CANT FIND ZAJIL CHANNEL`,
                    color: `RED`,
                    footer: {
                        text: `PowerBy KINGMAN STUDIO`
                    }
                }))
            }
            let zajiluser = await client.users.fetch(args[0]);
            if(!zajiluser){
                return kmsg.channel.send(new MessageEmbed({
                    title: `ERROR`,
                    description: `**please write user id\n${prefix}zajil <userid> <content>**`,
                    color: `RED`,
                    footer: {
                        text: `PowerBy KINGMAN STUDIO`
                    }
                }))
            }
            let attatch = await kmsg.attachments.first();
            if(attatch){
                channelzajel.send(`**New Zajil to: <@${zajiluser.id}>**`,
                new MessageEmbed({
                    title: `${zajiluser.username}`,
                    color: `BLUE`,
                    author: {
                        name: `${zajiluser.username}`,
                        iconURL: `${zajiluser.avatarURL({ dynamic: true }) || `https://cdn.discordapp.com/embed/avatars/0.png`}`,
                    },
                    description: `${args.slice(1).join(` `)}`,
                    thumbnail: {
                        url: `${zajiluser.avatarURL({ dynamic: true }) || `https://cdn.discordapp.com/embed/avatars/0.png`}`
                    },
                    footer: {
                        text: `PowerBy KINGMAN STUDIO`
                    },
                    image: {
                        url: attatch.url
                    }
                }));
                kmsg.react(`👍`)
            } else if(args.slice(1).join(` `).length !== 0){
                channelzajel.send(`**New Zajil to: <@${zajiluser.id}>**`,
                new MessageEmbed({
                    title: `${zajiluser.username}`,
                    author: {
                        name: `${zajiluser.username}`,
                        iconURL: `${zajiluser.avatarURL({ dynamic: true }) || `https://cdn.discordapp.com/embed/avatars/0.png`}`,
                    },
                    description: `${args.slice(1).join(` `)}`,
                    color: `GREEN`,
                    thumbnail: {
                        url: `${zajiluser.avatarURL({ dynamic: true }) || `https://cdn.discordapp.com/embed/avatars/0.png`}`
                    },
                    footer: {
                        text: `PowerBy KINGMAN STUDIO`
                    }
                }));
                kmsg.react(`👍`)
            } else {
                return kmsg.channel.send(new MessageEmbed({
                    title: `ERROR`,
                    description: `**please write the content\n${prefix}zajil <userid> <content>**`,
                    color: `RED`,
                    footer: `PowerBy KINGMAN STUDIO`
                })) 
            }
            break;
        default:
            break;
    }
})
client.login(token)
/**
 * @INFO CODED BY KINGMAN STUDIO
 * @PHONE_NUMBER +962792914245
 * @DISCORD_SUPPORT_SERRVER https://discord.gg/kingmandev
 */