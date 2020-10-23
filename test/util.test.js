const {parseAliasPass} = require('../src/util');

const aliasPassBase64 = 'Basic dmVsa2E6MTIzNDU2';
const alias = 'velka';
const pass = '123456';

test('Convetir', () => {
    expect(parseAliasPass(aliasPassBase64)).toEqual({
        "alias":alias,
        "pass":pass
    });
});