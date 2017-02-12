import { Channel } from "../index";

export function stringify(channels: Channel[], date: Date) {
    return channels.map(channel => [
        channel.name,
        channel.id,
        channel.ip,
        channel.url,
        channel.genre,
        stringifyDescAndBandwidthType(channel.desc, channel.bandwidthType),
        channel.listeners.toString(),
        channel.relays.toString(),
        channel.bitrate.toString(),
        channel.type,
        channel.track.creator,
        channel.track.album,
        channel.track.title,
        channel.track.url,
        encodeURIComponent(channel.name),
        stringifyUptime(date.getTime() - channel.createdAt),
        "click",
        channel.comment,
        channel.direct ? "1" : "0",
    ])
        .map(channel => channel.map(escapeSpecialLetters))
        .map(channel => channel.join("<>"))
        .join("\n");
}

export function parse(body: string, date: Date) {
    return body.trim().split("\n")
        .map(line => line.split("<>"))
        .map(channel => channel.map(unescapeSpecialLetters))
        .map(channel => {
            let {desc, bandwidthType} = parseDescAndBandwidthType(channel[5]);
            return <Channel>{
                name: channel[0],
                id: channel[1],
                ip: channel[2],
                url: channel[3],
                genre: channel[4],
                desc,
                bandwidthType,
                listeners: parseInt(channel[6], 10),
                relays: parseInt(channel[7], 10),
                bitrate: parseInt(channel[8], 10),
                type: channel[9],
                track: {
                    creator: channel[10],
                    album: channel[11],
                    title: channel[12],
                    url: channel[13],
                },
                createdAt: date.getTime() - parseUptime(channel[15]),
                comment: channel[17],
                direct: channel[18] === "1",
            };
        });
}

function stringifyDescAndBandwidthType(desc: string, bandwidthType: string) {
    if (bandwidthType.length === 0) {
        return desc;
    }
    return `${desc} - <${bandwidthType}>`;
}

function parseDescAndBandwidthType(fullDesc: string) {
    let r = fullDesc.match(/(?: - )?<(.*)>$/);
    if (r == null) {
        return {
            desc: fullDesc,
            bandwidthType: "",
        };
    }
    return {
        desc: fullDesc.substring(0, r.index),
        bandwidthType: r[1],
    };
}

function stringifyUptime(uptime: number) {
    let minutes = uptime / 1000 / 60 | 0;
    return `${minutes / 60 | 0}:${(minutes % 60).toString().padStart(2, "0")}`;
}

function parseUptime(hmm: string) {
    let nums = hmm.split(":").map(x => parseInt(x, 10));
    return (nums[0] * 60 + nums[1]) * 60 * 1000;
}

function escapeSpecialLetters(str: string) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/'/g, "&#039;");
}

function unescapeSpecialLetters(str: string) {
    return str.replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&");
}
