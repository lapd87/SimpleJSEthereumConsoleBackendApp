pragma solidity ^0.5.4;

contract Paolo {

    uint lastPaymentTimestamp = 0;
    uint minRequiredPayment = 0;

    constructor (uint _minRequiredPayment) public {
        require(_minRequiredPayment >= 2);

        minRequiredPayment = _minRequiredPayment;
        lastPaymentTimestamp = now - 60;
    }

    function hasReceivedPayment() public view returns (bool) {
        return lastPaymentTimestamp + 60 > now;
    }

    function transferFunds() payable external {
        processPayment(msg.value, msg.sender);
    }

    function() payable external {
        processPayment(msg.value, msg.sender);
    }

    function processPayment(uint _value, address payable _address) private {
        if (_value >= minRequiredPayment) {
            lastPaymentTimestamp = now;
        }

        if (_value > minRequiredPayment) {
            _address.transfer(_value - minRequiredPayment);
        }

        if (_value < minRequiredPayment) {
            _address.transfer(_value);
        }
    }
}