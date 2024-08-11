import db from "../../dbconnection";

class Game {
  constructor(gameType) {
    this.gameType = gameType;
  }

  static async findByGameType(gameName) {
    const row = await db.getrow("SELECT * FROM games WHERE game_type = ?", [
      gameName,
    ]);
    if (!row) return null;

    return new Game(...Object.values(row));
  }
}
