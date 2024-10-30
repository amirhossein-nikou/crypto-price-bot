import { Telegraf } from 'telegraf'
import { config } from "dotenv";
import { getPrice } from './utils';
config()
const TOKEN: string | undefined = process.env.TOKEN
if (!TOKEN) {
    console.log('undefined TOKEN for bot')
    process.exit(0)
}
const bot: Telegraf = new Telegraf(TOKEN)
bot.start(ctx => {
    ctx.sendMessage('welcome to crypto bot ;) => send /crypto command to continue',
        {
            //@ts-ignore
            reply_to_message_id: ctx.message.message_id
        })
})
bot.command(['crypto', "Crypto"], ctx => {
    ctx.sendMessage('please select a coin', {
        //@ts-ignore
        reply_to_message_id: ctx.message.message_id,
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'BTC', callback_data: 'BTC' },
                    { text: 'ETH', callback_data: 'ETH' }
                ],
                [
                    { text: 'SOL', callback_data: 'SOL' },
                    { text: 'DOGE', callback_data: 'DOGE' }
                ],
            ]
        }
    })
})
bot.action(['BTC', 'ETH', "SOL", "DOGE"], async (ctx) => {
    try {
        const price: string = await getPrice(ctx.match[0])
        ctx.deleteMessage()
        ctx.sendMessage(`${ctx.match[0]} =>  ${price}`)
    } catch (error) {
        ctx.reply(String(error))
    }
    ctx.answerCbQuery()
})
console.log('server started');
bot.launch().catch(error => {
    console.log(error);
})