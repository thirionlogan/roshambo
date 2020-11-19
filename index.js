const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

class Player {
  constructor(name, move) {
    this.move = move;
    this.name = name;
    console.log(`${name} plays ${move}`);
  }

  static moveSet = ["rock", "paper", "scissors"];

  static compareMoves(player1, player2) {
    const player1MoveIndex = Player.moveSet.indexOf(player1.move) - 1;
    const player2MoveIndex = Player.moveSet.indexOf(player2.move) - 1;
    if (player1MoveIndex === player2MoveIndex) {
      console.log("~This round is a tie~");
    } else if (
      player1MoveIndex - player2MoveIndex < -1 ||
      (player1MoveIndex > player2MoveIndex &&
        player1MoveIndex * player2MoveIndex > -1)
    ) {
      console.log(`~${player1.name} wins.~`);
    } else if (
      player2MoveIndex - player1MoveIndex < -1 ||
      (player2MoveIndex > player1MoveIndex &&
        player1MoveIndex * player2MoveIndex > -1)
    ) {
      console.log(`~${player2.name} wins.~`);
    } else {
      console.log(`Invalid move!`);
    }
  }
}

class HumanPlayer extends Player {
  constructor() {
    super("Player", argv.move);
  }
}

class ComputerPlayer extends Player {
  constructor() {
    super("Computer", Player.moveSet[Math.floor(Math.random() * 3)]);
  }
}

const human = new HumanPlayer();
const computer = new ComputerPlayer();
Player.compareMoves(human, computer);
