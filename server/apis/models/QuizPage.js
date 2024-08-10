import db from "../../dbconnection.js";

class QuizPage {
  constructor(id, quizId, pageNumber, question) {
    this.id = id;
    this.quizId = quizId;
    this.pageNumber = pageNumber;
    this.question = question;
  }

  static async findById(id) {
    const row = await db.getrow("SELECT * FROM quiz_pages WHERE id = ?", [id]);
    if (!row) return null;

    return new QuizPage(...Object.values(row));
  }

  static async getAll() {
    const rows = await db.getall("SELECT * FROM quiz_pages");
    if (!rows) return null;

    return rows.map((row) => new QuizPage(...Object.values(row)));
  }

  static async getAllPagesInQuiz(quizId) {
    const rows = await db.getall("SELECT * FROM quiz_pages WHERE quiz_id = ?", [
      quizId,
    ]);
    if (!rows) return null;

    return rows.map((row) => new QuizPage(...Object.values(row)));
  }

  async save() {
    const result = await db.query(
      "INSERT INTO quiz_pages (quiz_id, page_number, question) VALUES (?, ?, ?)",
      [this.quizId, this.pageNumber, this.question]
    );

    this.id = result.insertId;

    return QuizPage.findById(result.insertId);
  }
}

export default QuizPage;
