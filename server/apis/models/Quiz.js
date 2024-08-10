import db from "../../dbconnection.js";

class Quiz {
  constructor(id, gameTypeId) {
    this.id = id;
    this.gameTypeId = gameTypeId;
  }

  static async findById(id) {
    const row = await db.getrow("SELECT * FROM quizzes WHERE id = ?", [id]);
    if (!row) return null;

    return new Quiz(...Object.values(row));
  }

  static async getAll() {
    const rows = await db.getall("SELECT * FROM quizzes");
    if (!rows) return null;

    return rows.map((row) => new Quiz(...Object.values(row)));
  }

  async save() {
    const result = await db.query(
      "INSERT INTO quizzes (game_type) VALUES (?)",
      [this.gameTypeId]
    );

    this.id = result.insertId;

    return Quiz.findById(result.insertId);
  }
}

export default Quiz;
