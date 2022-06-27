function CheckResponseStatus(res) {
    if(res.ok){
        return res
    }
    else {
        throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`)
    }
}

// Получаем глобальные смайлики twitch, bttv, 7tv и ffz и сохраняем в файл
function GetGlobalEmotes(filePath) {

    // Global emotes twitch, bttv, 7tv and ffz
    const url = "https://emotes.adamcy.pl/v1/global/emotes/twitch.7tv.bttv.ffz"

    const fetch = require('node-fetch')

    let options = {method: 'GET', headers: {'Content-Type': 'application/json'}}

    fetch(url, options)
        .then(CheckResponseStatus)
        .then(res => res.json())
        .then(json => {
            const fs = require("fs")
            let data = JSON.stringify(json)
            fs.writeFileSync(filePath, data)
        })
        .catch(function (err) {
            console.error('error:' + err)
            throw err
        })

}

// Получаем смайлики канала twitch, bttv, 7tv и ffz и сохраняем в файл
function GetChannelEmotes(channel, filePath) {

    // Channel emotes twitch, bttv, 7tv and ffz
    let url = `https://emotes.adamcy.pl/v1/channel/` + channel +`/emotes/twitch.7tv.bttv.ffz`


    const fetch = require('node-fetch')

    let options = {method: 'GET', headers: {'Content-Type': 'application/json'}}

    fetch(url, options)
        .then(CheckResponseStatus)
        .then(res => res.json())
        .then(json => {
            const fs = require("fs")
            let data = JSON.stringify(json)
            fs.writeFileSync(filePath, data)
        })
        .catch(function (err) {
            console.error('error:' + err)
            throw err
        })

}

// Читаем смйлики из файлов
function GetEmotesFromFiles(pathToGlobalEmotes, pathToChannelEmotes) {
    const fs = require('fs')
    let channelEmotes = fs.readFileSync(pathToChannelEmotes)
    let globalEmotes = fs.readFileSync(pathToGlobalEmotes)
    let objChannelEmotes = JSON.parse(channelEmotes)
    let objGlobalEmotes = JSON.parse(globalEmotes)
    let emotes = new Set()

    for (let i = 0; i < objGlobalEmotes.length; i++)
        emotes.add(objGlobalEmotes[i].code)
    for (let i = 0; i < objChannelEmotes.length; i++)
        emotes.add(objChannelEmotes[i].code)
    return emotes
}

// Получаем все смайлики, которые доступны на канале
// Глобальные смайлики и смайлики канала twitch, bttv, 7tv, ffz
function GetEmotes(channel) {
    const pathToChannelEmotes = "channelEmotes.json"
    const pathToGlobalEmotes = "globalEmotes.json"

    GetChannelEmotes(channel, pathToChannelEmotes)
    GetGlobalEmotes(pathToGlobalEmotes)

    return GetEmotesFromFiles(pathToChannelEmotes, pathToGlobalEmotes)
}

module.exports.GetEmotes = GetEmotes
