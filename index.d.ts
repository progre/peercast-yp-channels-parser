export function parse(body: string, date: Date): Channel[];
export function stringify(channels: Channel[], date: Date): string;

export interface Channel {
    readonly name: string;
    readonly id: string;
    readonly ip: string;
    readonly url: string;
    readonly genre: string;
    readonly desc: string;
    readonly bandwidthType: string;
    readonly listeners: number;
    readonly relays: number;
    readonly bitrate: number;
    readonly type: string;
    readonly track: {
        readonly creator: string;
        readonly album: string;
        readonly title: string;
        readonly url: string;
    };
    readonly createdAt: number;
    readonly comment: string;
    readonly direct: boolean;
}

export interface MutableChannel extends Channel {
    name: string;
    id: string;
    ip: string;
    url: string;
    genre: string;
    desc: string;
    bandwidthType: string;
    listeners: number;
    relays: number;
    bitrate: number;
    type: string;
    track: {
        creator: string;
        album: string;
        title: string;
        url: string;
    };
    createdAt: number;
    comment: string;
    direct: boolean;
}
