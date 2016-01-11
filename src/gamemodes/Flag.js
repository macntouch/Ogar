var Teams = require('./Teams');
var FakeSocket = require('../ai/FakeSocket');
var PacketHandler = require('../PacketHandler');


function Flag() {
    Teams.apply(this, Array.prototype.slice.call(arguments));

    this.ID = 69;
    this.name = "Flag";
    this.specByLeaderboard = true;
}

module.exports = Flag;
Flag.prototype = new Teams();

Flag.prototype.onServerInit = function(gameServer) {
	console.log("xxxxx");
  Teams.prototype.onServerInit.apply(this, Array.prototype.slice.call(arguments));
  for (var i = 0; i < 20; i++) {
   	this.addFlag(gameServer);
  };
}

var idxTeam = 0;

Flag.prototype.addFlag = function (gameServer){

	gameServer.bots.addBot();

  var s = gameServer.clients[gameServer.clients.length - 1];
  var name = "Flag "+idxTeam;
  var teamId = idxTeam++ % 3;

  s.packetHandler.setNickname(name);
  s.playerTracker.setName(name);

  var firstCell = s.playerTracker.cells[0];
  firstCell.addMass(1);
  firstCell.cellType = 4;
  firstCell.setColor(this.getTeamColor(teamId));
  s.playerTracker.team = teamId;
  s.playerTracker.decide = function () {};

  var originalConsume = firstCell.onConsume;
  var pos = 0;
  firstCell.calcMove = function (x, y, gameServer) {
    if (this.owner != s.playerTracker){
      pos += .1;
      gameServer.gameMode.onCellMove(
        firstCell.position.x = this.owner.cells[0].position.x + 100 * Math.cos(pos),
        firstCell.position.y = this.owner.cells[0].position.y + 100 * Math.sin(pos),
        this
      );
    }
  }
  firstCell.onConsume = function(consumer,gameServer){
    onConsume(consumer,gameServer);
  }


}

function onConsume(consumer,gameServer){
	console.log(consumer);

}

