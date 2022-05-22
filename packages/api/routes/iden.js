var express = require('express');
var ethers = require('ethers');
var router = express.Router();
const ethersUtil = require('../ethers-util');
const epnsHelper = require('../epns-helper');

process.env.privateKey = '917d78224dd5cca60425389a32ffe09484c74a6a079b173921a7d963668e52f5';

router.get('/publicKey', async function (req, res, next) {
  console.log(req.query);
  if (!req.query.address) {
    res.status(404).send('Send a query string as address');
    return;
  }
  else {
    let address = req.query.address;
    let idenContract = await ethersUtil.getContractInstance();
    let wallet = await ethersUtil.getWallet();

    let publicKey = await idenContract.userPubKeyMap(address);
    let isUserCreated = true;
    if (!publicKey) {
      publicKey = await idenContract.autoPubKeyMap(address);
      isUserCreated = false;
    }
    if (!publicKey) {
      let signature = await wallet.signMessage(address);
      let privateKey = signature.substring(0, 66);
      publicKey = ethers.utils.computePublicKey(privateKey);
      await idenContract.setAutoPubKey(address, publicKey);
      isUserCreated = false;

      // Notify via ENPS
      epnsHelper.sendNotification({recipientAddress: address});
    }
    res.send({ address, publicKey, isUserCreated });
  }
});

router.post('/privateKey', async function (req, res, next) {
  // console.log(req);
  if (await ethersUtil.validateSignature(req.body)) {
    let wallet = await ethersUtil.getWallet();
    let address = req.body.address;
    let signature = await wallet.signMessage(address);
    let privateKey = signature.substring(0, 66);
    res.send({ address, privateKey });

  } else {
    res.status(404).send('Invalid data');
    return;
  }
});

router.get('/epns', async function (req, res, next) {
  epnsHelper.sendNotification({recipientAddress: '0xdF7E5e096cC3E49Fdf9712B115D19FDf10A5B41B'});
});

module.exports = router;
