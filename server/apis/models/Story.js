import db from "../../dbconnection.js";

class Story {
  constructor(id, gameTypeId) {
    this.id = id;
    this.gameTypeId = gameTypeId;
  }

  static async findById(id) {
    const row = await db.getrow("SELECT * FROM stories WHERE id = ?", [id]);
    if (!row) return null;

    return new Story(...Object.values(row));
  }

  static async getAll() {
    const rows = await db.getall("SELECT * FROM stories");
    if (!rows) return null;

    return rows.map((row) => new Story(...Object.values(row)));
  }

  async save() {
    const result = await db.query(
      "INSERT INTO stories (game_type) VALUES (?)",
      [this.gameTypeId]
    );

    this.id = result.insertId;

    return Story.findById(result.insertId);
  }
}

export default Story;
