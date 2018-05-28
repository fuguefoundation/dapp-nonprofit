# Fugue Foundation, a nonprofit
<p align="center">
  <img src="https://github.com/fuguefoundation/nonprofit/src/assets/images/logo_150.png">
</p>

## Nonprofit goal

To alleviate poverty using decentralized, open-source blockchain technology. Read our [prospectus](https://fuguefoundation.github.io).

## About the dApp

Using smart contracts deployed to the Ethereum network, this decentralized application (dApp) seeks to explore ways that nonprofits can both achieve their charitable goals and administer their internal organizational requirements. The following three contracts represent our first efforts toward this end. _Bitcoin/Rootstock implementation coming soon!_

### Contract functionality

1. **Fugue Foundation** - A donation contract. For purposes of the testing simulation, there are four [beneficiaries](https://fuguefoundation.org/beneficiaries) to whom you may donate test ether. [Address](https://rinkeby.etherscan.io/address/0x8ef2a62553ce3b4f3cb55ca66a4568fef156ad6d)

2. **Board of Directors** - A voting contract used for making internal decisions about the organization in a transparent manner. This is a variant of the Ethereum [DAO](https://ethereum.org/dao) contract. Please reach out [here](https://github.com/fuguefoundation/nonprofit/issues/1) with your `Rinkeby` address if you would like temporary `member` status on the Board. [Address](https://rinkeby.etherscan.io/address/0xa28547a46e30d4d1e7acc312197ced6a5cd049a8)

3. **Fugue Token** - An implentation of an ERC-20 token, more info [here](https://ethereum.org/token). _This token does not, nor will it ever, have any tradeable market value!_ We are a nonprofit organization and this contract is being implemented here simply to explore possible future humanitarian [use cases](https://fuguefoundation.github.io/appendix.html). [Address](https://rinkeby.etherscan.io/address/0x2388b6c200dd345bf92ff6c0af1c8e437d3c2325)

---

## Instructions

The platform is in alpha with contracts deployed to the `Rinkeby` testnet. We invite all crypto enthusiasts and newcomers alike to participate in testing. The steps below will help you to get started. Your feedback as to your experience is greatly appreciated!

### Metamask

1. Install [Metamask](https://metamask.io/) into your browser. Helpful video tutorial [here](https://www.youtube.com/watch?v=6Gf_kRE4MJU).

2. Click the Metamask icon in your browser and create a new vault with a strong password. Be sure to keep a copy of your 12 word seed. Without this, you can't restore the wallet you just created.

3. Now you need some test ether. Because this dApp runs on the `Rinkeby` testnet, you can use the [official faucet](https://faucet.rinkeby.io/) to send you some for free. Alternatively, reach out to us in this [issue](https://github.com/fuguefoundation/nonprofit/issues/1) with your address; feel free to mention how you heard about Fugue Foundation!

### dApp

4. Now visit the Fugue Foundation [homepage](https://fuguefoundation.org/) and click on `dApp`.

5. With Metamask unlocked and set to the `Rinkeby` network, select a contract to interact with. There are currently three to choose from; see above for a basic explanation of their functionality.

6. Next, choose a function to execute on that contract. Note, certain functions will indicate how they only work for the contract `owner` or for board `members`. If you would like temporary `member` access for the `BoardOfDirectors` contract, please reach out here on our [GitHub Repo](https://github.com/fuguefoundation).

7. Enter the required parameters for the function you chose. All fields are required unless otherwise marked as "optional."

8. Execute the function. If the function changes the state of the contract, such as making a donation or casting a vote, a Metamask transaction dialogue box will appear. This shows the pending transaction and how much test ether you will be charged. Submit the transaction. Note, certain functions are `call` functions, which do not change state (and are thus free) and simply return an existing value.

### Transaction

9. The dApp should show you a transaction ID or other type of feedback confirming the transaction was successful. You can also see some details stored within your Metamask wallet.

10. If you encounter an error and want to help the Fugue Foundation with debugging and generally improving the user experience, make note of it and provide an explanation of how the error was produced in the Github repo under the `Issues` tab. See below for more tips on troubleshooting and finding the right words to describe the problem.

---

## Troubleshooting

1. Open the browser's developer tools (F12 on Windows, Ctrl+Opt+i on Mac) and make note of the error in the `console`
2. The transaction may be failing in Metamask due to a `gas` error. Try increasing the `gasLimit` to 78000 and the `gasPrice` to 20 `gwei`.
3. Refresh the page and trying again.

## Contributing to the project

Contributions are always welcome & encouraged! :smile: If you'd like to contribute, please see [Contributing Guidelines](CONTRIBUTING.md).

## TODO
* Form validation
* End to end and unit testing
* Event handling
* Wiki
* Overall user experience and design improvements

## References
[Metamask](https://metamask.io/)
[Ethereum](https://ethereum.org/)
[Truffle](http://truffleframework.com/docs/)
[Etherscan API](https://etherscan.io/apis)
[Nikhil Bhaskar](https://github.com/Nikhil22) and his excellent [starter dapp](https://github.com/Nikhil22/angular2-truffle-starter-dapp)

## Technologies & Languages Used
1. Angular5 + Material (Typescript/Javascript)
2. Truffle (Solidity)