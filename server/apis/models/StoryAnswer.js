import db from "../../dbconnection.js";

class StoryAnswer {
  constructor(id, storyPage, storyId, answerText, isCorrect) {
    this.id = id;
    this.storyPage = storyPage;
    this.storyId = storyId;
    this.answerText = answerText;
    this.isCorrect = isCorrect;
  }

  static async findById(id) {
    const row = await db.getrow("SELECT * FROM story_answers WHERE id = ?", [
      id,
    ]);
    if (!row) return null;

    return new StoryAnswer(...Object.values(row));
  }

  static async getAll() {
    const rows = await db.getall("SELECT * FROM story_answers");
    if (!rows) return null;

    return rows.map((row) => new StoryAnswer(...Object.values(row)));
  }

  static async getAllAnswersInStory(storyId) {
    const rows = await db.getall(
      "SELECT * FROM story_answers WHERE story_id = ?",
      [storyId]
    );
    if (!rows) return null;

    return rows.map((row) => new StoryAnswer(...Object.values(row)));
  }

  static async getAnswersByStoryPage(storyId, storyPage) {
    const rows = await db.getall(
      "SELECT * FROM story_answers WHERE story_id = ? AND story_page_id = ?",
      [storyId, storyPage]
    );
    if (!rows) return null;

    return rows.map((row) => new StoryAnswer(...Object.values(row)));
  }

  async save() {
    const result = await db.query(
      "INSERT INTO story_answers (story_page_id, story_id, answer_text, is_correct) VALUES (?, ?, ?, ?)",
      [this.storyPage, this.storyId, this.answerText, this.isCorrect]
    );

    this.id = result.insertId;

    return StoryAnswer.findById(result.insertId);
  }
}

export default StoryAnswer;
