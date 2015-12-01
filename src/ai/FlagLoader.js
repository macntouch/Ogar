var FlagBot = require('./FlagBot');
var FakeSocket = require('./FakeSocket');
var PacketHandler = require('../PacketHandler');

function FlagLoader(gameServer) {
    this.gameServer = gameServer;
}

module.exports = new FlagLoader();

FlagLoader.prototype.addBot = function() {
    var s = new FakeSocket(this.gameServer);
    s.playerTracker = new FlagBot(this.gameServer, s);
    s.packetHandler = new PacketHandler(this.gameServer, s);

    // Add to client list
    this.gameServer.clients.push(s);

    // Add to world
    s.packetHandler.setNickname("Flag");
};