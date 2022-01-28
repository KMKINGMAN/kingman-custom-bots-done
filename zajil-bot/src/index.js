import JsonDB from 'easy-json-database';
import { Client, MessageEmbed } from "discord.js";
const client = new Client({
    intents: 32767
})
const zajil_db = new JsonDB('./src/Data/kmcodes_zajil.json', {
    snapshots: {
        enabled: true,
        interval: 24 * 60 * 60 * 1000,
        folder: './src/DB/backup'
    },
});
client.config = {
    prefix: `.`,
    token: `BOT_TOKEN`,
    zajil_controler: `765631521540538390`
};
client.on("message", async(kmsg)=>{
    if (!kmsg.content.startsWith(client.config.prefix) || kmsg.author.bot) return;
    let cmd = kmsg.content.toLowerCase().slice(client.config.prefix.length).split(" ")[0];
    let args = kmsg.content.split(" ").slice(1);
    switch (cmd) {
        case `setchannel`:
            if(kmsg.author.id !== client.config.zajil_controler) return;
            let zajil_channel = kmsg.mentions.channels.first() || kmsg.guild.channels.cache.get(args[0]);
            if(!zajil_channel){
                return kmsg.channel.send(new MessageEmbed({ title: `Error`, description: `You Must Mention Channel First`, footer: { text: `KMCodes`}}))
            }
            if(zajil_channel.type !== "text"){
                return kmsg.channel.send(new MessageEmbed({ title: `Error`, description: `Channel Type Must Be Text Channel`, footer: { text: `KMCodes`}}))
            }
            zajil_db.set(`zajil_guild`, { guild: kmsg.guild.id, channel: zajil_channel.id });
            kmsg.channel.send(new MessageEmbed({ title: `Done`, description: `Zajil Channel Has Been Set to [<#${zajil_channel.id}>]`, footer: { text: `KMCodes`}}))              
            break;
        case `setlog`:
            if(kmsg.author.id !== client.config.zajil_controler) return;
            let zajil_logs = kmsg.mentions.channels.first() || kmsg.guild.channels.cache.get(args[0]);
            if(!zajil_logs){
                return kmsg.channel.send(new MessageEmbed({ title: `Error`, description: `You Must Mention Channel First`, footer: { text: `KMCodes`}}))
            }
            if(zajil_logs.type !== "text"){
                return kmsg.channel.send(new MessageEmbed({ title: `Error`, description: `Channel Type Must Be Text Channel`, footer: { text: `KMCodes`}}))
            }
            zajil_db.set(`zajil_guild_logs`, { guild: kmsg.guild.id, channel: zajil_logs.id });
            kmsg.channel.send(new MessageEmbed({ title: `Done`, description: `Zajil Logs Channel Has Been Set to [<#${zajil_logs.id}>]`, footer: { text: `KMCodes`}}))       
            break;
        case 'zajil':
            if(kmsg.guild){
                return kmsg.channel.send(new MessageEmbed({ title: `Error`, description: `This Command Only work on dm channel`, footer: { text: `KMCodes`}}));
            }
            let logs_data = zajil_db.get(`zajil_guild_logs`);
            let zajil_data = zajil_db.get(`zajil_guild`);
            if(!zajil_data){
                return kmsg.channel.send(new MessageEmbed({ title: `Error`, description: `Zajil Channel Has Been Not set`, footer: { text: `KMCodes`}}))
            }
            if(!client.guilds.fetch(zajil_data.guild)){
                return kmsg.channel.send(new MessageEmbed({ title: `Error`, description: `Zajil Channel Has Been Not set`, footer: { text: `KMCodes`}}))
            }
            if(!client.channels.fetch(zajil_data.channel)){
                return kmsg.channel.send(new MessageEmbed({ title: `Error`, description: `Zajil Channel Has Been Not set`, footer: { text: `KMCodes`}}))
            }
            if(!args[0] || isNaN(args[0]) ||!(await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0])){
                return kmsg.channel.send(new MessageEmbed({ title: `Error`, description: `please write user id\n${client.config.prefix}zajil <userid> <content>`, footer: { text: `KMCodes`}}))
            }
            let attatch = await kmsg.attachments.first();
            let zajil_logs_channel;
            if(logs_data) {zajil_logs_channel = await client.channels.fetch(logs_data.channel)};
            if(attatch){
                kmsg.react(`👍`).catch((E)=> {});
                (await client.channels.fetch(zajil_data.channel)).send(new MessageEmbed({ author: { name: (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).displayName, iconURL: (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).user.avatar ? (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).user.avatarURL({ dynamic: true }) : `https://cdn.discordapp.com/embed/avatars/0.png` }, description: args.slice(1).join(` `), title: `**وصلك زاجل**`, thumbnail: {url: (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).avatar ? (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).user.avatarURL({ dynamic: true }) : `https://cdn.discordapp.com/embed/avatars/0.png` }, image: { url: attatch.url }}));
                if(zajil_logs_channel){
                    zajil_logs_channel.send(`<@${kmsg.author.id}> send zajil to <@${(await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).id}>`, new MessageEmbed({ author: { name: (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).displayName, iconURL: (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).user.avatar ? (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).user.avatarURL({ dynamic: true }) : `https://cdn.discordapp.com/embed/avatars/0.png` }, description: args.slice(1).join(` `), title: `**وصلك زاجل**`, thumbnail: {url: (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).user.avatar ? (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).user.avatarURL({ dynamic: true }) : `https://cdn.discordapp.com/embed/avatars/0.png` }, image: { url: attatch.url }}))
                }
            }else if(args.slice(1).join(` `).length !== 0){
                kmsg.react(`👍`).catch((E)=> {});
                (await client.channels.fetch(zajil_data.channel)).send(new MessageEmbed({ author: { name: (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).displayName, iconURL: (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).user.avatar ? (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).user.avatarURL({ dynamic: true }) : `https://cdn.discordapp.com/embed/avatars/0.png` }, description: args.slice(1).join(` `), title: `**وصلك زاجل**`, thumbnail: {url: (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).user.avatar ? (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).user.avatarURL({ dynamic: true }) : `https://cdn.discordapp.com/embed/avatars/0.png` }}));
                zajil_logs_channel.send(`<@${kmsg.author.id}> send zajil to <@${(await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).id}>`,new MessageEmbed({ author: { name: (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).displayName, iconURL: (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).user.avatar ? (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).user.avatarURL({ dynamic: true }) : `https://cdn.discordapp.com/embed/avatars/0.png` }, description: args.slice(1).join(` `), title: `**وصلك زاجل**`, thumbnail: {url: (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).avatar ? (await client.guilds.fetch(zajil_data.guild)).members.cache.get(args[0]).user.avatarURL({ dynamic: true }) : `https://cdn.discordapp.com/embed/avatars/0.png` }}))
            } else {
                return kmsg.channel.send(new MessageEmbed({ title: `Error`, description: `please write user id\n${client.config.prefix}zajil <userid> <content>`, footer: { text: `KMCodes`}}))
            }
            break;
        default:
            break;
    }
})
client.login(client.config.token)