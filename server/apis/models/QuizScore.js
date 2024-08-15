import db from "../../dbconnection.js";

class QuizScore {
  constructor(id, username, points, quizId) {
    this.id = id;
    this.username = username;
    this.points = points;
    this.quizId = quizId;
  }

  static async getAll() {
    const rows = await db.getall("SELECT * FROM quiz_scores");
    if (!rows) return null;

    return rows.map((row) => new QuizScore(...Object.values(row)));
  }

  static async getAmountByQuiz(quizId, amount) {
    const rows = await db.getall(
      "SELECT * FROM quiz_scores WHERE quiz_id = ? ORDER BY points DESC LIMIT ?",
      [quizId, parseInt(amount) || 10]
    );
    if (!rows) return null;

    return rows.map((row) => new QuizScore(...Object.values(row)));
  }

  static async findById(id) {
    const row = await db.getrow("SELECT * FROM quiz_scores WHERE id = ?", [id]);
    if (!row) return null;

    return new QuizScore(...Object.values(row));
  }

  async save() {
    const result = await db.query(
      "INSERT INTO quiz_scores (username, points, quiz_id) VALUES (?, ?, ?)",
      [this.username, this.points, this.quizId]
    );

    this.id = result.insertId;

    return QuizScore.findById(result.insertId);
  }
}

export default QuizScore;
