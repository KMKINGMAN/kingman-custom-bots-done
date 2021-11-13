//discord.js@12.5.0
const { Client, MessageEmbed } = require("discord.js");
const token = "BOT_TOKEN";
const prefix = "BOT_PREFIX"
//quick.db@7.1.3
const quick = require("quick.db");
// make new Discord Client
const client = new Client();
//listen to ready events
client.on("ready", ()=> {
    console.log(`[${client.user.username}] Ready`)
});
//listen to the message event
client.on("message", async(kmsg)=> {
    if (!kmsg.content.startsWith(prefix) || kmsg.author.bot || !kmsg.guild) return;
    //get command from message
    let cmd = kmsg.content.toLowerCase().slice(prefix.length).split(" ")[0];
    //get args from message
    let args = kmsg.content.split(" ").slice(1);
    switch (cmd) {
        case 'زواج':
            let mention = kmsg.mentions.members.first();
            if(!mention){
                return kmsg.channel.send(`**يجب عليك اختيار زوجة**`)
            }
            if(mention.id == kmsg.author.id){
                return kmsg.channel.send(`**لا يمكنك ان ترتبط بنفسك**`)
            }
            let status1 = await quick.fetch(`${kmsg.guild.id}.${kmsg.author.id}_zawaj`);
            let status2 = await quick.fetch(`${kmsg.guild.id}.${mention.id}_zawaj`)
            if(!status1){
                status1 = await quick.set(`${kmsg.guild.id}.${kmsg.author.id}_zawaj`, { taken: false, with: `unknow`})
            }
            if(!status2){
                status2 = await quick.set(`${kmsg.guild.id}.${mention.id}_zawaj`, { taken: false, with: `unknow`})
            }
            if(status1.taken === true){
                return kmsg.channel.send(`**لا يمكنك ان تتزوج اكثر من زوجة**`)
            };
            if(status2.taken === true){
                return kmsg.channel.send(`**هذا الشخص مرتبط بشخص اخر**`)
            };
            kmsg.channel.send(`طلب الزواج منك هذا الشخص : <@${kmsg.author.id}> هل توافقين عليه يرجي الاجابة بنعم أم لا ؟`).then(async (msg) => {
                await kmsg.channel.awaitMessages(m => ['نعم', 'لا'].includes(m.content) && m.author.id === mention.id, {
                    max: 1,
                    time: 15000,
                    errors: ['time']
                }).then(async c=> {
                    if(c.first().content === 'نعم'){
                        kmsg.channel.send(`تم بحمد الله عقد الزواج بين <@${kmsg.author.id}> <@${mention.id}>`);
                        await quick.set(`${kmsg.guild.id}.${kmsg.author.id}_zawaj`, { taken: true, with: `${mention.id}`});
                        await quick.set(`${kmsg.guild.id}.${mention.id}_zawaj`, { taken: true, with: `${kmsg.author.id}`})
                    } else {
                        kmsg.reply(`لقد رفض الزواج منك الله يحسن اليكم `)
                    }
                }).catch(c => {
                    kmsg.reply(`تم رفض طلبك لعدم اجابة الطرف الاخر .`)
                })
            })
            break;
        case 'طلاق':
            let mentiont = kmsg.mentions.members.first();
            if(!mentiont){
                return kmsg.channel.send(`**يجب عليك الاشارة الى الشخص الذي انت مرتبط منه**`)
            }
            if(mentiont.id == kmsg.author.id){
                return kmsg.channel.send(`**انت غير مرتبط بنفسك **`)
            }
            let status_1 = await quick.get(`${kmsg.guild.id}.${kmsg.author.id}_zawaj`);
            let status_2 = await quick.get(`${kmsg.guild.id}.${mentiont.id}_zawaj`)
            if(!status_1){
                status_1 = await quick.set(`${kmsg.guild.id}.${kmsg.author.id}_zawaj`, { taken: false, with: `unknow`})
            }
            if(!status_2){
                status_2 = await quick.set(`${kmsg.guild.id}.${mentiont.id}_zawaj`, { taken: false, with: `unknow`})
            }
            if(status_1.taken === false){
                return kmsg.channel.send(`**انت لست متزوج منهم لا يمكنك الطلاق**`)
            };
            if(status_2.taken === false){
                return kmsg.channel.send(`**انت لست متزوج هذاالشخص <@${mentiont.id}>**`)
            };
            if(status_2.with === kmsg.author.id){
                kmsg.channel.send(`طلب الطلاق منك هذا الشخص <@${kmsg.author.id}> هل توافقين عليه يرجي الاجابه بنعم او لا ؟`).then(async (msg) => {
                    await kmsg.channel.awaitMessages(m => ['نعم', 'لا'].includes(m.content) && m.author.id === mentiont.id, {
                        max: 1,
                        time: 15000,
                        errors: ['time']
                    }).then(async c=> {
                        if(c.first().content === 'نعم'){
                            kmsg.channel.send(`أن ابغض الحلال عند الله الطلاق , تم الطلاق بين `);
                            await quick.set(`${kmsg.guild.id}.${kmsg.author.id}_zawaj`, { taken: false, with: `unknow`})
                            await quick.set(`${kmsg.guild.id}.${mentiont.id}_zawaj`, { taken: false, with: `unknow`})
                        } else {
                            kmsg.reply(`**تم رفض طلبك بالطلاق **`)
                        }
                    }).catch(c => {
                        kmsg.channel.send(`** تم رفض طلبك بالطلاق بسبب عدم اجابة الطرف الاخر**`)
                    })
                })
            } else {
                kmsg.channel.send(`هذا الشخص غير مرتبط بك`)
            }
            break;
        case 'بيانات':
            let data = await quick.fetch(`${kmsg.guild.id}.${kmsg.author.id}_zawaj`);
            if(data && data.taken === true){
                return kmsg.channel.send(new MessageEmbed({description:`<@${kmsg.author.id}> متزوج من <@${data.with}>`}))
            } else if(!data || data.taken === false){
                return kmsg.channel.send(new MessageEmbed({description:`انت اعزب [غير متزوج]`}))
            }
             break;    
        default:
            break;
    }
})
//login to the client
client.login(token)