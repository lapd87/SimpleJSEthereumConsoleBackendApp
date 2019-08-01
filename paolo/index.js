;
const contractABI = require('./Paolo.json');

const web3 = require('web3');
const express = require('express');

const app = express();

// const infuraURL = "https://ropsten.infura.io/v3/026c0a16ffa941e691f750312b6b44f0"; //ropsten
const infuraURL = "https://kovan.infura.io/v3/026c0a16ffa941e691f750312b6b44f0"; //kovan
const web3js = new web3(new web3.providers.HttpProvider(infuraURL));

// const contractAddress = "0x9935a8dadecc37fe46bb11b10a83fe32f5ded437"; //ropsten
const contractAddress = "0x7ad39d166b1ae0d8ee3347086914c74f5194d895"; //kovan
const contract = new web3js.eth.Contract(contractABI, contractAddress);

const resetColor = "\x1b[0m";
const redColor = "\x1b[31m";
const blueColor = "\x1b[34m";

function contractCall() {
    setTimeout(function () {
        contract.methods.hasReceivedPayment().call()
            .then(function (result) {
                console.log(result);
                let timeNow = new Date().toLocaleTimeString();

                if (result) {
                    console.log(`${blueColor}${timeNow}${resetColor}`);
                } else {
                    console.log(`${redColor}${timeNow}${resetColor}`);
                }
            });
        contractCall();
    }, 1000);
}

app.listen(3000, () => {
    console.log('App is running!');
    contractCall();
});