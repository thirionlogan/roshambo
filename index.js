const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

class Player {
  constructor(name, move) {
    this.move = move;
    this.name = name;
    console.log(`${name} plays ${move}`);
  }

  // static moveset = {
  //   // move: [moves that beat move]
  //   rock: ["paper"],
  //   paper: ["scissors"],
  //   scissors: ["rock"],
  // };

  // static moveSet = {
  //   // move: [moves that beat move]
  //   rock: ["paper", "spock"],
  //   paper: ["scissors", "lizard"],
  //   scissors: ["rock", "spock"],
  //   lizard: ["scissors", "rock"],
  //   spock: ["paper", "lizard"],
  // };

  static moveSet = {
    tree: ["lightning", "gun", "rock", "fire", "scissors", "snake", "human"],
    wolf: ["gun", "rock", "fire", "scissors", "snake", "human", "tree"],
    sponge: ["rock", "fire", "scissors", "snake", "human", "tree", "wolf"],
    paper: ["fire", "scissors", "snake", "human", "tree", "wolf", "sponge"],
    air: ["scissors", "snake", "human", "tree", "wolf", "sponge", "paper"],
    water: ["snake", "human", "tree", "wolf", "sponge", "paper", "air"],
    dragon: ["human", "tree", "wolf", "sponge", "paper", "air", "water"],
    devil: ["tree", "wolf", "sponge", "paper", "air", "water", "dragon"],
    lightning: ["wolf", "sponge", "paper", "air", "water", "dragon", "devil"],
    gun: ["sponge", "paper", "air", "water", "dragon", "devil", "lightning"],
    rock: ["paper", "air", "water", "dragon", "devil", "lightning", "gun"],
    fire: ["air", "water", "dragon", "devil", "lightning", "gun", "rock"],
    scissors: ["water", "dragon", "devil", "lightning", "gun", "rock", "fire"],
    snake: ["dragon", "devil", "lightning", "gun", "rock", "fire", "scissors"],
    human: ["devil", "lightning", "gun", "rock", "fire", "scissors", "snake"],
  };

  static listRules() {
    Object.entries(Player.moveSet).forEach((move) => {
      console.log(`${move[0]} is beat by ${move[1].join(", ")}.`);
    });
  }

  static compareMoves(player1, player2) {
    if (player1 instanceof Player || player2 instanceof Player) {
      throw new TypeError("Invalid Player!");
    }

    if (player1.move === player2.move) {
      console.log("~This round is a tie~");
    } else if (Player.moveSet[player2.move].includes(player1.move)) {
      console.log(`~${player1.name} wins.~`);
    } else if (Player.moveSet[player1.move].includes(player2.move)) {
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
    if (!(argv.move.toLowerCase() in Player.moveSet))
      throw new TypeError("Invalid move!");
    super("Player", argv.move.toLowerCase());
  }
}

class ComputerPlayer extends Player {
  constructor() {
    const moves = Object.keys(Player.moveSet);
    super("Computer", moves[Math.floor(Math.random() * moves.length)]);
  }
}

if (argv.listRules || argv.listrules || argv.help || argv.Help) {
  Player.listRules();
}
if (argv.move) {
  const human = new HumanPlayer();
  const computer = new ComputerPlayer();
  Player.compareMoves(human, computer);
}
