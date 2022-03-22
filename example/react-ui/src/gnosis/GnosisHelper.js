const Web3 = require("web3");
const { config } = require("../config");
let web3 = new Web3();

const createWallet = (gnosisFactory, safeMasterCopy, owner) => {
    // Get Creation Data
    const creationData = safeMasterCopy.methods.setup(
        [owner],
        1,
        '0x0000000000000000000000000000000000000000',
        '0x0',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        0,
        '0x0000000000000000000000000000000000000000',
    ).encodeABI();

    // Create Proxy
    const saltNonce = Date.now();

    const tx = gnosisFactory.methods.createProxyWithNonce(config.gnosis.safeMasterCopy.address, creationData, saltNonce).send({from: owner});
    return tx;
}

module.exports = {createWallet};