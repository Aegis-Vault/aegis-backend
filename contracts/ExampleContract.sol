pragma solidity ^0.8.0;

contract ExampleContract {
    uint256 public value;

    function setValue(uint256 _newValue) public {
        value = _newValue;
    }
}

