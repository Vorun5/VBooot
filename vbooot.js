let EmotesModule = require("./emotes")
let DateModule = require("./data")

let emotes = EmotesModule.GetEmotes("Vorun1")


const tmi = require('tmi.js')

const opts = {
    identity: {
        username: DateModule.username,
        password: DateModule.password
    },
    channels: DateModule.channels
}

const client = new tmi.client(opts)
client.connect().catch(console.error)

client.on('message', (channel, tags, message, self) => {
    if (self) return

    let words = message.replace(/\s+/g, ' ').trim().split(" ")
    let emotesInMessage = ""
    for (let word of words) {
        if (emotes.has(word)) {
            emotesInMessage += word + " "
        }
    }
    if (emotesInMessage) {
        client.say(channel, `@${tags.username} ${emotesInMessage}`)
    }

})
