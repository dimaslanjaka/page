"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractDomain;
/**
 * Extract domain from URL
 */
function extractDomain(url) {
    if (!url || typeof url !== 'string')
        return undefined;
    var hostname;
    if (url.indexOf('://') > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    if (!hostname)
        return undefined;
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    if (!hostname)
        return undefined;
    return hostname || undefined;
}
