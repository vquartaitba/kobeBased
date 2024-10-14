const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SoccerGame Contract", function () {
    let SoccerGame, soccerGame, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        
        SoccerGame = await ethers.getContractFactory("SoccerGame");
        soccerGame = await SoccerGame.deploy();
        await soccerGame.waitForDeployment();
    });

    it("Should register a player", async function () {
        await expect(soccerGame.registerPlayer(1, "TeamA"))
            .to.emit(soccerGame, "PlayerRegistered")
            .withArgs(1, "TeamA");

        const player = await soccerGame.players(1);
        expect(player.playerId).to.equal(1);
        expect(player.team).to.equal("TeamA");
    });

    it("Should setup a match", async function () {
        await expect(soccerGame.setupMatch(1, "TeamA", "TeamB", "2023-01-01", "Scheduled"))
            .to.emit(soccerGame, "MatchSetup")
            .withArgs(1, "TeamA", "TeamB", "2023-01-01", "Scheduled");

        const soccerMatch = await soccerGame.matches(1);
        expect(soccerMatch.matchId).to.equal(1);
        expect(soccerMatch.teamA).to.equal("TeamA");
        expect(soccerMatch.teamB).to.equal("TeamB");
        expect(soccerMatch.date).to.equal("2023-01-01");
        expect(soccerMatch.status).to.equal("Scheduled");
    });

    it("Should update score", async function () {
        await soccerGame.setupMatch(1, "TeamA", "TeamB", "2023-01-01", "Scheduled");

        await expect(soccerGame.updateScore(1, "TeamA", 2))
            .to.emit(soccerGame, "ScoreUpdated")
            .withArgs(1, "TeamA", 2);

        const soccerMatch = await soccerGame.matches(1);
        expect(soccerMatch.scoreTeamA).to.equal(2);

        await expect(soccerGame.updateScore(1, "TeamB", 3))
            .to.emit(soccerGame, "ScoreUpdated")
            .withArgs(1, "TeamB", 3);

        expect((await soccerGame.matches(1)).scoreTeamB).to.equal(3);
    });

    it("Should finalize match", async function () {
        await soccerGame.setupMatch(1, "TeamA", "TeamB", "2023-01-01", "Scheduled");
        await soccerGame.updateScore(1, "TeamA", 1);
        await soccerGame.updateScore(1, "TeamB", 2);

        await expect(soccerGame.finalizeMatch(1))
            .to.emit(soccerGame, "MatchCompleted")
            .withArgs(1, "TeamB");

        const soccerMatch = await soccerGame.matches(1);
        expect(soccerMatch.completed).to.be.true;
    });

    it("Should return scores", async function () {
        await soccerGame.setupMatch(1, "TeamA", "TeamB", "2023-01-01", "Scheduled");
        await soccerGame.updateScore(1, "TeamA", 2);
        await soccerGame.updateScore(1, "TeamB", 3);

        const scores = await soccerGame.getScores(1);
        expect(scores[0]).to.equal(2);
        expect(scores[1]).to.equal(3);
    });
});