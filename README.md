peercast-yp-channels-parser [![Build Status](https://travis-ci.org/progre/peercast-yp-channels-parser.svg?branch=master)](https://travis-ci.org/progre/peercast-yp-channels-parser)
====

A parser for PeerCast yellowpages channels.

This module can convert to each other:

```
Mark<>72DC795F2CC52CE1FAE0983E84E25105<>7.50.101.227:7144<>http://example.com/<>Game<>Splatoon - &lt;Open&gt;<>23<>23<>1328<>FLV<><><><><>Mark<>0:13<>click<><>1
James<>30171529597250A0D66F514D1F7564E2<>151.68.98.110:7144<>http://example.com/<>Letro game<>SMB - &lt;Over&gt;<>-1<>-1<>1024<>FLV<><><><><>James<>1:16<>click<>Speed run now!<>0
Greg<>ABB21FBEC6FA8D232FABD8D61ED61239<>77.143.113.120:7144<>http://example.com/<>Programming<>Live coding - &lt;Open&gt;<>101<>101<>1200<>FLV<><><><><>Greg<>3:26<>click<>Coding with JavaScript<>0
:
:
```

and

```
[
    {
        name: "Mark",
        id: "72DC795F2CC52CE1FAE0983E84E25105",
        ip: "7.50.101.227:7144",
        url: "http: //example.com/",
        genre: "Game",
        desc: "Splatoon",
        bandwidthType: "Open",
        listeners: 23,
        relays: 23,
        bitrate: 1328,
        type: "FLV",
        track: {
            creator: "",
            album: "",
            title: "",
            url: ""
        },
        createdAt: 1486906945727,
        comment: "",
        direct: true
    },
    {
        name: "James",
        id: "30171529597250A0D66F514D1F7564E2",
        ip: "151.68.98.110:7144",
        url: "http: //example.com/",
        genre: "Letrogame",
        desc: "SMB",
        bandwidthType: "Over",
        listeners: -1,
        relays: -1,
        bitrate: 1024,
        type: "FLV",
        track: {
            creator: "",
            album: "",
            title: "",
            url: ""
        },
        createdAt: 1486903165727,
        comment: "Speedrunnow!",
        direct: false
    },
    {
        name: "Greg",
        id: "ABB21FBEC6FA8D232FABD8D61ED61239",
        ip: "77.143.113.120:7144",
        url: "http: //example.com/",
        genre: "Programming",
        desc: "Livecoding",
        bandwidthType: "Open",
        listeners: 101,
        relays: 101,
        bitrate: 1200,
        type: "FLV",
        track: {
            creator: "",
            album: "",
            title: "",
            url: ""
        },
        createdAt: 1486895365727,
        comment: "CodingwithJavaScript",
        direct: false
    },
    :
    :
]
```

API
----

### parse(body: string, date: Date): Channel[]

Parse text data.

* `body` - Text data from yellowpages.
* `date` - Date of accessing server.
* Returns - Channels data.

### stringify(channels: Channel[], date: Date): string

Stringify channels data.

* `channels` - Channels data.
* `date` - Date of now.
* Returns - Stringified channels data for yellowpages channels response.
