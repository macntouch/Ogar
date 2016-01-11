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
   	addFlag(gameServer);
  };
}

var idxTeam = 0;

function addFlag(gameServer){

	gameServer.bots.addBot();

  var s = gameServer.clients[gameServer.clients.length - 1];
  var name = "Flag !";
  s.packetHandler.setNickname(name);
  s.playerTracker.setName(name);
  s.playerTracker.cells[0].addMass(1);
  s.playerTracker.team = idxTeam++ % 3;
  s.playerTracker.decide = function () {};
  var originalConsume = s.playerTracker.cells[0].onConsume;
  s.playerTracker.cells[0].onConsume = function(consumer,gameServer){
    onConsume(consumer,gameServer);
    originalConsume(consumer,gameServer);
  }

}

function onConsume(consumer,gameServer){
	console.log("Consumed :(");

}

