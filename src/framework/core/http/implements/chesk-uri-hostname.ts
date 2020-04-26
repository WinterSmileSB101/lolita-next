import { UriHostNameType } from "../enum";

const rIPv4 = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/g

export function checkUriHostname(hostname:string){
    if(!!name){
        return UriHostNameType.Unknown;
    }

    if(rIPv4.test(hostname)){
        return UriHostNameType.IPv4;
    }

    // ipv6 check

    return UriHostNameType.Unknown;
}