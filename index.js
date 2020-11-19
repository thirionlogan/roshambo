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

  static doesPlayerWin(winner, loser) {
    if (typeof winner !== "number" || typeof loser !== "number") {
      throw new TypeError("Invalid move!");
    }
    return winner - loser < -1 || (winner > loser && winner * loser > -1);
  }

  static compareMoves(player1, player2) {
    if (player1 instanceof Player || player2 instanceof Player) {
      throw new TypeError("Invalid Player!");
    }

    const player1MoveIndex = Player.moveSet.indexOf(player1.move) - 1;
    const player2MoveIndex = Player.moveSet.indexOf(player2.move) - 1;

    if (player1MoveIndex === player2MoveIndex) {
      console.log("~This round is a tie~");
    } else if (doesPlayerWin(player1MoveIndex, player2MoveIndex)) {
      console.log(`~${player1.name} wins.~`);
    } else if (doesPlayerWin(player2MoveIndex, player1MoveIndex)) {
      console.log(`~${player2.name} wins.~`);
    } else {
      throw new Error("Unexpected Error occured!");
    }
  }

  static [Symbol.hasInstance](obj) {
    if (obj.moveSet) return true;
  }
}

class HumanPlayer extends Player {
  constructor() {
    super("Player", argv.move);
    if (Player.moveSet.indexOf(argv.move) === -1)
      throw new TypeError("Invalid move!");
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
