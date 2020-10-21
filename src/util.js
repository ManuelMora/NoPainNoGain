function parseAliasPass(aliasPassBase64) {
    const aliasPass = Buffer.from(aliasPassBase64.split(" ")[1], 'base64').toString().split(':');
    return {alias:aliasPass[0], pass:aliasPass[1]};
}

module.exports = {
    parseAliasPass
};