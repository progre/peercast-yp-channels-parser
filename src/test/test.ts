/// <reference path="../../typings/index.d.ts" />
import "source-map-support/register";
import * as assert from "power-assert";
import * as ypParser from "../";
import { Channel } from "../../";

const STRINGIFIED_CHANNELS = [
    // tslint:disable:max-line-length
    "test channel1<>0123456789012345678901234567890<>127.0.0.1:7144<>http://example.com<>Some genre<>any desc - &lt;Open&gt;<>10<>20<>7144<>FLV<>track creator<>track album<>track title<>track url<>test%20channel1<>0:00<>click<>comment area<>0",
    "test channel2<>0123456789012345678901234567890<>127.0.0.1:7144<>http://example.com<>Some genre<>any desc - &lt;Open&gt;<>10<>20<>7144<>FLV<>track creator<>track album<>track title<>track url<>test%20channel2<>0:01<>click<>comment area<>0",
    "test channel3<>0123456789012345678901234567890<>127.0.0.1:7144<>http://example.com<>Some genre<>any desc - &lt;Open&gt;<>10<>20<>7144<>FLV<>track creator<>track album<>track title<>track url<>test%20channel3<>0:02<>click<>comment area<>0",
    // tslint:enable:max-line-length
].join("\n");
const PARSED_CHANNELS: Channel[] = [
    // tslint:disable:max-line-length
    { name: "test channel1", id: "0123456789012345678901234567890", ip: "127.0.0.1:7144", url: "http://example.com", genre: "Some genre", desc: "any desc", bandwidthType: "Open", listeners: 10, relays: 20, bitrate: 7144, type: "FLV", track: { creator: "track creator", album: "track album", title: "track title", url: "track url" }, createdAt: 0, comment: "comment area", direct: false },
    { name: "test channel2", id: "0123456789012345678901234567890", ip: "127.0.0.1:7144", url: "http://example.com", genre: "Some genre", desc: "any desc", bandwidthType: "Open", listeners: 10, relays: 20, bitrate: 7144, type: "FLV", track: { creator: "track creator", album: "track album", title: "track title", url: "track url" }, createdAt: -1 * 60 * 1000, comment: "comment area", direct: false },
    { name: "test channel3", id: "0123456789012345678901234567890", ip: "127.0.0.1:7144", url: "http://example.com", genre: "Some genre", desc: "any desc", bandwidthType: "Open", listeners: 10, relays: 20, bitrate: 7144, type: "FLV", track: { creator: "track creator", album: "track album", title: "track title", url: "track url" }, createdAt: -2 * 60 * 1000, comment: "comment area", direct: false },
    // tslint:enable:max-line-length
];

it("parse stringified channels", () => {
    let channels: Channel[] = ypParser.parse(STRINGIFIED_CHANNELS, new Date(0));
    assert.deepEqual(channels, PARSED_CHANNELS);
});

it("strigify pased channels", () => {
    let channels = ypParser.stringify(PARSED_CHANNELS, new Date(0));
    assert.deepEqual(channels, STRINGIFIED_CHANNELS);
});
