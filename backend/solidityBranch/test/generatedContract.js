const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SoccerGame", function () {
  let SoccerGame;
  let soccerGame;
  let owner;
  let addr1;
  let teamAPlayers = ["Alice", "Bob", "Charlie"];
  let teamBPlayers = ["Dave", "Eve", "Frank"];

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    SoccerGame = await ethers.getContractFactory("SoccerGame");
    soccerGame = await SoccerGame.deploy(teamAPlayers, teamBPlayers);
    await soccerGame.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await soccerGame.owner()).to.equal(owner.address);
    });

    it("Should initialize teams correctly", async function () {
      const teamA = await soccerGame.teamA();
      const teamB = await soccerGame.teamB();
      expect(teamA.name).to.equal("Team A");
      expect(teamB.name).to.equal("Team B");
      expect(teamA.score).to.equal(0);
      expect(teamB.score).to.equal(0);
    });
  });

  describe("Game flow", function () {
    it("Should allow owner to start the game", async function () {
      await soccerGame.startGame();
      expect(await soccerGame.gameStarted()).to.equal(true);
    });

    it("Should emit GameStarted event when game starts", async function () {
      await expect(soccerGame.startGame())
        .to.emit(soccerGame, "GameStarted");
    });

    it("Should update score and emit GoalScored event", async function () {
      await soccerGame.startGame();
      await expect(soccerGame.updateScore("Team A", 1))
        .to.emit(soccerGame, "GoalScored")
        .withArgs("Team A", 1);
      
      const teamA = await soccerGame.teamA();
      expect(teamA.score).to.equal(1);
    });

    it("Should allow owner to end the game and emit GameEnded event", async function () {
      await soccerGame.startGame();
      await soccerGame.updateScore("Team A", 1);
      await expect(soccerGame.endGame())
        .to.emit(soccerGame, "GameEnded")
        .withArgs("Team A");
      expect(await soccerGame.gameStarted()).to.equal(false);
    });

    it("Should declare correct winner", async function () {
      await soccerGame.startGame();
      await soccerGame.updateScore("Team A", 2);
      await soccerGame.updateScore("Team B", 1);
      expect(await soccerGame.declareWinner()).to.equal("Team A");

      await soccerGame.updateScore("Team B", 2);
      expect(await soccerGame.declareWinner()).to.equal("Team B");

      await soccerGame.updateScore("Team A", 1);
      expect(await soccerGame.declareWinner()).to.equal("It's a draw!");
    });
  });

  describe("Access control", function () {
    it("Should revert if non-owner tries to start game", async function () {
      await expect(soccerGame.connect(addr1).startGame()).to.be.revertedWith("Only the owner can perform this action");
    });

    it("Should revert if game is not started and updateScore or endGame is called", async function () {
      await expect(soccerGame.updateScore("Team A", 1)).to.be.revertedWith("Game is not started yet");
      await expect(soccerGame.endGame()).to.be.revertedWith("Game is not started yet");
    });

    it("Should revert if invalid team name is used in updateScore", async function () {
      await soccerGame.startGame();
      await expect(soccerGame.updateScore("Invalid Team", 1)).to.be.revertedWith("Invalid team name");
    });
  });
});