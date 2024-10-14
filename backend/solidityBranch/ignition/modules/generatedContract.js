const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SoccerGameDeploy", (m) => {
  const team1Name = m.getParameter("team1Name", "TeamA");
  const team1Captain = m.getParameter("team1Captain");
  const team2Name = m.getParameter("team2Name", "TeamB");
  const team2Captain = m.getParameter("team2Captain");
  
  const soccerGame = m.contract("SoccerGame", [team1Name, team1Captain, team2Name, team2Captain]);

  return { soccerGame };
});