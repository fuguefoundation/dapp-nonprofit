pragma solidity ^0.4.16;

contract owned {
    address public owner;

    function owned()  public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) onlyOwner  public {
        owner = newOwner;
    }
}

contract BoardOfDirectors is owned {
    // Contract Variables and events
    uint public minimumQuorum;
    uint public debatingPeriodInMinutes;
    int public majorityMargin;
    Proposal[] public proposals;
    uint public numProposals;
    mapping (address => uint) public memberId;
    Member[] public members;

    event ProposalAdded(uint proposalID, address recipient, string description);
    event Voted(uint proposalID, bool position, address voter, string justification);
    event ProposalTallied(uint proposalID, int result, uint quorum, bool active);
    event MembershipChanged(address member, bool isMember);
    event ChangeOfRules(uint newMinimumQuorum, uint newDebatingPeriodInMinutes, int newMajorityMargin);

    struct Proposal {
        address recipient;
        string description;
        uint votingDeadline;
        bool executed;
        bool proposalPassed;
        uint numberOfVotes;
        int currentResult;
        Vote[] votes;
        mapping (address => bool) voted;
    }

    struct Member {
        address member;
        string name;
        uint memberSince;
    }

    struct Vote {
        bool inSupport;
        address voter;
        string justification;
    }

    // Modifier that allows only shareholders to vote and create new proposals
    modifier onlyMembers {
        require(memberId[msg.sender] != 0);
        _;
    }

    /**
     * Constructor function
     */
    function BoardOfDirectors (
        uint minimumQuorumForProposals,
        uint minutesForDebate,
        int marginOfVotesForMajority
    )  payable public {
        changeVotingRules(minimumQuorumForProposals, minutesForDebate, marginOfVotesForMajority);
        // It’s necessary to add an empty first member
        addMember(0, "");
        // and let's add the founder, to save a step later
        addMember(owner, 'founder');
    }

    /**
     * Add member
     *
     * Make `targetMember` a member named `memberName`
     *
     * @param targetMember ethereum address to be added
     * @param memberName public name for that member
     */
    function addMember(address targetMember, string memberName) onlyOwner public {
        uint id = memberId[targetMember];
        if (id == 0) {
            memberId[targetMember] = members.length;
            id = members.length++;
        }

        members[id] = Member({member: targetMember, memberSince: now, name: memberName});
        emit MembershipChanged(targetMember, true);
    }

    /**
     * Remove member
     *
     * @notice Remove membership from `targetMember`
     *
     * @param targetMember ethereum address to be removed
     */
    function removeMember(address targetMember) onlyOwner public {
        require(memberId[targetMember] != 0);

        for (uint i = memberId[targetMember]; i<members.length-1; i++){
            members[i] = members[i+1];
        }
        delete members[members.length-1];
        members.length--;
    }

    /**
     * Change voting rules
     *
     * Make so that proposals need to be discussed for at least `minutesForDebate/60` hours,
     * have at least `minimumQuorumForProposals` votes, and have 50% + `marginOfVotesForMajority` votes to be executed
     *
     * @param minimumQuorumForProposals how many members must vote on a proposal for it to be executed
     * @param minutesForDebate the minimum amount of delay between when a proposal is made and when it can be executed
     * @param marginOfVotesForMajority the proposal needs to have 50% plus this number
     */
    function changeVotingRules(
        uint minimumQuorumForProposals,
        uint minutesForDebate,
        int marginOfVotesForMajority
    ) onlyOwner public {
        minimumQuorum = minimumQuorumForProposals;
        debatingPeriodInMinutes = minutesForDebate;
        majorityMargin = marginOfVotesForMajority;

        emit ChangeOfRules(minimumQuorum, debatingPeriodInMinutes, majorityMargin);
    }

    /**
     * Add Proposal
     *
     * Propose to for `beneficiary` related to `proposalDescription`.
     *
     * @param beneficiary who to send the ether to
     * @param proposalDescription Description of proposal
     */
    function newProposal(
        address beneficiary,
        string proposalDescription
    )
        onlyMembers public
        returns (uint proposalID)
    {
        proposalID = proposals.length++;
        Proposal storage p = proposals[proposalID];
        p.recipient = beneficiary;
        p.description = proposalDescription;
        p.votingDeadline = now + debatingPeriodInMinutes * 1 minutes;
        p.executed = false;
        p.proposalPassed = false;
        p.numberOfVotes = 0;
        emit ProposalAdded(proposalID, beneficiary, proposalDescription);
        numProposals = proposalID+1;

        return proposalID;
    }

    /**
     * Log a vote for a proposal
     *
     * Vote `supportsProposal? in support of : against` proposal #`proposalNumber`
     *
     * @param proposalNumber number of proposal
     * @param supportsProposal either in favor or against it
     * @param justificationText optional justification text
     */
    function vote(
        uint proposalNumber,
        bool supportsProposal,
        string justificationText
    )
        onlyMembers public
        returns (uint voteID)
    {
        Proposal storage p = proposals[proposalNumber];         // Get the proposal
        require(!p.voted[msg.sender]);         // If has already voted, cancel
        p.voted[msg.sender] = true;                     // Set this voter as having voted
        p.numberOfVotes++;                              // Increase the number of votes
        if (supportsProposal) {                         // If they support the proposal
            p.currentResult++;                          // Increase score
        } else {                                        // If they don't
            p.currentResult--;                          // Decrease the score
        }

        // Create a log of this event
        emit Voted(proposalNumber,  supportsProposal, msg.sender, justificationText);
        return p.numberOfVotes;
    }

    /**
     * Finish vote
     *
     * Count the votes proposal #`proposalNumber` and execute it if approved
     *
     * @param proposalNumber proposal number
     */
    function executeProposal(uint proposalNumber) onlyMembers public {
        Proposal storage p = proposals[proposalNumber];

        require(now > p.votingDeadline                                            // If it is past the voting deadline
            && !p.executed                                                         // and it has not already been executed
            && p.numberOfVotes >= minimumQuorum);                                  // and a minimum quorum has been reached...

        // ...then execute result

        if (p.currentResult > majorityMargin) {
            // Proposal passed; execute the transaction

            p.executed = true; // Avoid recursive calling
            p.proposalPassed = true;
        } else {
            // Proposal failed
            p.proposalPassed = false;
        }

        // Fire Events
        emit ProposalTallied(proposalNumber, p.currentResult, p.numberOfVotes, p.proposalPassed);
    }

    function endContract() onlyOwner public {
        selfdestruct(owner);
    }
}
