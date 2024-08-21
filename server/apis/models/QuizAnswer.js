import db from "../../dbconnection.js";

class QuizAnswer {
  constructor(id, quizPage, quizId, answerText, isCorrect) {
    this.id = id;
    this.quizPage = quizPage;
    this.quizId = quizId;
    this.answerText = answerText;
    this.isCorrect = isCorrect;
  }

  static async findById(id) {
    const row = await db.getrow("SELECT * FROM quiz_answers WHERE id = ?", [
      id,
    ]);
    if (!row) return null;

    return new QuizAnswer(...Object.values(row));
  }

  static async getAll() {
    const rows = await db.getall("SELECT * FROM quiz_answers");
    if (!rows) return null;

    return rows.map((row) => new QuizAnswer(...Object.values(row)));
  }

  static async getAllAnswersInQuiz(quizId) {
    const rows = await db.getall(
      "SELECT * FROM quiz_answers WHERE quiz_id = ?",
      [quizId]
    );
    if (!rows) return null;

    return rows.map((row) => new QuizAnswer(...Object.values(row)));
  }

  static async getAnswersByQuizPage(quizId, quizPage) {
    const rows = await db.getall(
      "SELECT * FROM quiz_answers WHERE quiz_id = ? AND quiz_page = ?",
      [quizId, quizPage]
    );
    if (!rows) return null;

    return rows.map((row) => new QuizAnswer(...Object.values(row)));
  }

  async save() {
    const result = await db.query(
      "INSERT INTO quiz_answers (quiz_page, quiz_id, answer_text, is_correct) VALUES (?, ?, ?, ?), ",
      [this.quizPage, this.quizId, this.answerText, this.isCorrect]
    );

    this.id = result.insertId;

    return QuizAnswer.findById(result.insertId);
  }

  static async saveAll(valueString, valueArray) {
    await db.query(
      `INSERT INTO quiz_answers (quiz_page, quiz_id, answer_text, is_correct) VALUES ${valueString}`,
      valueArray
    );
  }
}

export default QuizAnswer;
