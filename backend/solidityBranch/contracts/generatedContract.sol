// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SoccerGame {
    struct Team {
        string name;
        uint8 score;
        string[] players;
    }

    Team public teamA;
    Team public teamB;
    address public owner;
    bool public gameStarted;

    event GameStarted();
    event GoalScored(string teamName, uint8 newScore);
    event GameEnded(string winner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor(string[] memory teamAPlayers, string[] memory teamBPlayers) {
        owner = msg.sender;
        teamA = Team({name: "Team A", score: 0, players: teamAPlayers});
        teamB = Team({name: "Team B", score: 0, players: teamBPlayers});
    }

    function startGame() public onlyOwner {
        require(!gameStarted, "Game is already started");
        teamA.score = 0;
        teamB.score = 0;
        gameStarted = true;
        emit GameStarted();
    }

    function updateScore(string memory teamName, uint8 goals) public onlyOwner {
        require(gameStarted, "Game is not started yet");
        if (keccak256(bytes(teamName)) == keccak256(bytes(teamA.name))) {
            teamA.score += goals;
            emit GoalScored(teamA.name, teamA.score);
        } else if (keccak256(bytes(teamName)) == keccak256(bytes(teamB.name))) {
            teamB.score += goals;
            emit GoalScored(teamB.name, teamB.score);
        } else {
            revert("Invalid team name");
        }
    }

    function declareWinner() public view returns (string memory winner) {
        require(gameStarted, "Game is not started yet");
        if (teamA.score > teamB.score) {
            return teamA.name;
        } else if (teamB.score > teamA.score) {
            return teamB.name;
        } else {
            return "It's a draw!";
        }
    }

    function endGame() public onlyOwner {
        require(gameStarted, "Game is not started yet");
        string memory winner = declareWinner();
        emit GameEnded(winner);
        gameStarted = false;
    }
}