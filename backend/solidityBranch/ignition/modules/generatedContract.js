const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SoccerGameDeployment", (m) => {
  const teamAPlayers = ["PlayerA1", "PlayerA2", "PlayerA3"];
  const teamBPlayers = ["PlayerB1", "PlayerB2", "PlayerB3"];

  const soccerGame = m.contract("SoccerGame", [teamAPlayers, teamBPlayers]);

  return { soccerGame };
});