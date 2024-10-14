// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SoccerGame {
    struct Player {
        uint256 playerId;
        string team;
    }
    
    struct Match {
        uint256 matchId;
        string teamA;
        string teamB;
        string date;
        string status;
        uint256 scoreTeamA;
        uint256 scoreTeamB;
        bool completed;
    }
    
    mapping(uint256 => Player) public players;
    mapping(uint256 => Match) public matches;
    uint256 public playerCount;
    uint256 public matchCount;

    event PlayerRegistered(uint256 playerId, string team);
    event MatchSetup(uint256 matchId, string teamA, string teamB, string date, string status);
    event ScoreUpdated(uint256 matchId, string team, uint256 score);
    event MatchCompleted(uint256 matchId, string winner);

    function registerPlayer(uint256 _playerId, string memory _team) public {
        require(players[_playerId].playerId == 0, "Player ID already exists");
        players[_playerId] = Player(_playerId, _team);
        playerCount++;
        emit PlayerRegistered(_playerId, _team);
    }

    function setupMatch(uint256 _matchId, string memory _teamA, string memory _teamB, string memory _date, string memory _status) public {
        require(matches[_matchId].matchId == 0, "Match ID already exists");
        matches[_matchId] = Match(_matchId, _teamA, _teamB, _date, _status, 0, 0, false);
        matchCount++;
        emit MatchSetup(_matchId, _teamA, _teamB, _date, _status);
    }

    function updateScore(uint256 _matchId, string memory _team, uint256 _score) public {
        Match storage soccerMatch = matches[_matchId];
        require(soccerMatch.matchId != 0, "Match does not exist");
        require(!soccerMatch.completed, "Match already completed");
        
        if (keccak256(abi.encodePacked(_team)) == keccak256(abi.encodePacked(soccerMatch.teamA))) {
            soccerMatch.scoreTeamA = _score;
            emit ScoreUpdated(_matchId, _team, _score);
        } else if (keccak256(abi.encodePacked(_team)) == keccak256(abi.encodePacked(soccerMatch.teamB))) {
            soccerMatch.scoreTeamB = _score;
            emit ScoreUpdated(_matchId, _team, _score);
        } else {
            revert("Team not part of this match");
        }
    }

    function getScores(uint256 _matchId) public view returns (uint256 scoreTeamA, uint256 scoreTeamB) {
        Match storage soccerMatch = matches[_matchId];
        require(soccerMatch.matchId != 0, "Match does not exist");
        return (soccerMatch.scoreTeamA, soccerMatch.scoreTeamB);
    }

    function finalizeMatch(uint256 _matchId) public {
        Match storage soccerMatch = matches[_matchId];
        require(soccerMatch.matchId != 0, "Match does not exist");
        require(!soccerMatch.completed, "Match already completed");
        
        soccerMatch.completed = true;
        string memory winner;
        
        if (soccerMatch.scoreTeamA > soccerMatch.scoreTeamB) {
            winner = soccerMatch.teamA;
        } else if (soccerMatch.scoreTeamA < soccerMatch.scoreTeamB) {
            winner = soccerMatch.teamB;
        } else {
            winner = "Draw";
        }
        
        emit MatchCompleted(_matchId, winner);
    }
}