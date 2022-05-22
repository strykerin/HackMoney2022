const ethers = require('ethers');

const validateSignature = async (info) => {
    try {
        let message = "IdenConnect: Signing to retrieve my encryption key";
        let verifiedKey = await ethers.utils.verifyMessage(message, info.signature);
        let verified = info.address === verifiedKey;
        return {
            verified
        }
    }
    catch (e) {
        // console.log(e);
        // console.log('error with signature')
        return {
            verified: false,
            error: e
        }
    }
}

const getContractInstance = async () => {

    var wallet = await getWallet();

    let abi = [
        {
            "inputs": [],
            "stateMutability": "payable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "autoPubKeyMap",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "pubKey",
                    "type": "string"
                }
            ],
            "name": "setAutoPubKey",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "pubKey",
                    "type": "string"
                }
            ],
            "name": "setUserPubKey",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "userPubKeyMap",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    //let signer = await wallet.getSigner();
    const contractAddress = "0x3698b3fFB0Eb672568Ba16FcE8d878b832aE503a";
    let idenContract = new ethers.Contract(contractAddress, abi, wallet);
    return idenContract;
}

const getWallet = async () => {
    let privateKey = process.env.privateKey;
    const provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/52978d65cfcd4cc7a96bda08ae9791aa');
    var wallet = new ethers.Wallet(privateKey, provider);
    return wallet;
}

module.exports = {
    validateSignature,
    getContractInstance,
    getWallet
};