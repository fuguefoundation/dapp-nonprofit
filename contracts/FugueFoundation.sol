pragma solidity ^0.4.16;

contract FugueFoundation {

    address public owner;
    address internal ff = YOUR_ADDRESS_HERE;

    //Donation variables
    Donation[] public donations;
    Donor[] public donors;
    Beneficiary[] public beneficiaries;
    uint public numDonations;
    uint public totalAmountDonated;
    mapping (address => uint) public beneficiaryID;
    mapping (address => uint) public donorID;
    bool public canDonate = true;

    // Donation events
    event BeneficiaryAdded(address beneficiary, string name);
    event DonationAdded(uint id, address donor, address beneficiary, uint amount, uint timestamp, string comment);
    event DonationSent(address beneficiary, uint amount);
    event DonorAdded(address donor, uint timestamp, uint amount);
    event Feedback(string error);

    struct Donor {
        address donorAdr;
        uint donorSince;
        bool donatedBefore;
        bool blocked;
    }

    struct Beneficiary {
        address beneficiary;
        string name;
        uint beneficiarySince;
    }

    struct Donation {
        uint id;
        address donor;
        address beneficiary;
        uint amount;
        uint timestamp;
        string comment;
    }

    /**
     * Constructor function
     */
    function FugueFoundation() payable public {
        owner = msg.sender;
        addBeneficiary(0, "");
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    /**
     * Add donation beneficiary
     *
     * Make `beneficiary` someone to receive donations
     *
     * @param beneficiaryAdr ethereum address to be added
     * @param beneficiaryName public name for that donation beneficiary
     */
    function addBeneficiary(address beneficiaryAdr, string beneficiaryName) onlyOwner public {
        uint id = beneficiaryID[beneficiaryAdr];
        if (id == 0) {
            beneficiaryID[beneficiaryAdr] = beneficiaries.length;
            id = beneficiaries.length++;
        }

        beneficiaries[id] = Beneficiary({beneficiary: beneficiaryAdr, name: beneficiaryName, beneficiarySince: now});
        emit BeneficiaryAdded(beneficiaryAdr, beneficiaryName);
    }

    /**
     * Remove beneficiary
     *
     * @param beneficiaryAdr beneficiary address to be removed
     *
     */
    function removeBeneficiary(address beneficiaryAdr) onlyOwner public {
        require(beneficiaryID[beneficiaryAdr] != 0);

        for (uint i = beneficiaryID[beneficiaryAdr]; i<beneficiaries.length-1; i++){
            beneficiaries[i] = beneficiaries[i+1];
        }
        delete beneficiaries[beneficiaries.length-1];
        beneficiaries.length--;
    }

    /**
     * Donate
     *
     * @param id id number of the beneficiary to whom you want to donate
     * @param weiAmount amount to donated in wei
     * @param comment optional comment for donor to include
     *
     */

    function donate (uint id, uint weiAmount, string comment) public payable {
        require(canDonate);
        uint donationID = donations.length++;

        Donation storage d = donations[donationID];
        Beneficiary storage b = beneficiaries[id];

        d.id = donationID;
        d.donor = msg.sender;
        d.beneficiary = b.beneficiary;
        d.amount = weiAmount;
        d.timestamp = now;
        d.comment = comment;

        assert(msg.sender.balance > weiAmount);

        if(b.beneficiary.send(weiAmount)){
            emit DonationAdded(d.id, d.donor, d.beneficiary, d.amount, d.timestamp, d.comment);
            numDonations = donationID+1;
            totalAmountDonated += weiAmount;
            addDonor(msg.sender, now, weiAmount);
        } else {
            emit Feedback("Error while sending donation");
        }
    }

    /**
     * Add donor
     *
     * @param donorAdr ethereum address of donor to be added
     * @param timestamp add timestamp to show when donor made first donation
     * @param amount amount donor is giving
     */
    function addDonor(address donorAdr, uint timestamp, uint amount) internal returns (uint id) {

        id = donors.length++;

        Donor storage d = donors[id];

        //check to see if donor has donated before
        for(uint i = 1; i < donors.length; i++){
            if(donors[i].donorAdr == donorAdr){
                d = donors[i];
            }
        }

        bool condition;
        if (amount > 0){
            condition = true;
        }
        d.donorAdr = donorAdr;
        d.donorSince = now;
        d.donatedBefore = condition;
        d.blocked = false;
        emit DonorAdded(donorAdr, timestamp, amount);
        return id;
    }

    /**
     * Block donor from donating from a given address
     *
     * @param id donor id to be blocked
     *
     */
    function blockDonor(uint id) onlyOwner public {
        Donor storage d = donors[id];
        d.blocked = true;
        emit Feedback("Donor blocked");
    }

    /**
     * Stop or start donation capabilities
     *
     * @param condition true or false
     *
     */

    function stopStartDonations (bool condition) onlyOwner public{
        canDonate = condition;
    }

    /**
     * Fallback function
     *
     * The function without name is the default function that is called whenever anyone sends funds to a contract
     */
    function () public payable {
        require(canDonate);
        ff.transfer(msg.value);
        uint donationID = donations.length++;
        addDonor(msg.sender, now, msg.value);
        totalAmountDonated += msg.value;
        emit DonationAdded(donationID, msg.sender, ff, msg.value, now, "fallback");
    }

    /**
     * Standard selfdestruct() function
     */

    function endContract() onlyOwner public {
        selfdestruct(owner);
    }

    function transferOwnership(address newOwner) onlyOwner  public {
        owner = newOwner;
    }

}