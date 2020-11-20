const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

class Player {
  constructor(name, move) {
    this.move = move;
    this.name = name;
    console.log(`${name} plays ${move}`);
  }

  static ruleSets = [
    {
      rock: ["paper"],
      paper: ["scissors"],
      scissors: ["rock"],
    },
    {
      rock: ["paper", "spock"],
      paper: ["scissors", "lizard"],
      scissors: ["rock", "spock"],
      lizard: ["scissors", "rock"],
      spock: ["paper", "lizard"],
    },
    {
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
      scissors: [
        "water",
        "dragon",
        "devil",
        "lightning",
        "gun",
        "rock",
        "fire",
      ],
      snake: [
        "dragon",
        "devil",
        "lightning",
        "gun",
        "rock",
        "fire",
        "scissors",
      ],
      human: ["devil", "lightning", "gun", "rock", "fire", "scissors", "snake"],
    },
  ];

  static listRules(complexity = 0) {
    Object.entries(Player.ruleSets[complexity]).forEach((move) => {
      console.log(`${move[0]} is beat by ${move[1].join(", ")}.`);
    });
  }

  static compareMoves(player1, player2, complexity = 0) {
    if (player1 instanceof Player || player2 instanceof Player) {
      throw new TypeError("Invalid Player!");
    }
    const moveSet = Player.ruleSets[complexity];

    if (player1.move === player2.move) {
      console.log("~This round is a tie~");
    } else if (moveSet[player2.move].includes(player1.move)) {
      console.log(`~${player1.name} wins.~`);
    } else if (moveSet[player1.move].includes(player2.move)) {
      console.log(`~${player2.name} wins.~`);
    } else {
      throw new Error("Unexpected Error occured!");
    }
  }

  static [Symbol.hasInstance](obj) {
    if (obj.ruleSets) return true;
  }
}

class HumanPlayer extends Player {
  constructor(move, complexity = 0) {
    if (!(move.toLowerCase() in Player.ruleSets[complexity]))
      throw new TypeError("Invalid move!");
    super("Player", move.toLowerCase());
  }
}

class ComputerPlayer extends Player {
  constructor(complexity = 0) {
    const moves = Object.keys(Player.ruleSets[complexity]);
    super("Computer", moves[Math.floor(Math.random() * moves.length)]);
  }
}

if (argv.listRules || argv.listrules) {
  Player.listRules(argv.complexity);
}
if (argv.move) {
  const human = new HumanPlayer(argv.move, argv.complexity);
  const computer = new ComputerPlayer(argv.complexity);
  Player.compareMoves(human, computer, argv.complexity);
}
