import db from "../../dbconnection.js";

class StoryPage {
  constructor(id, storyId, pageNumber, content, question) {
    this.id = id;
    this.storyId = storyId;
    this.pageNumber = pageNumber;
    this.content = content;
    this.question = question;
  }

  static async findById(id) {
    const row = await db.getrow("SELECT * FROM story_pages WHERE id = ?", [id]);
    if (!row) return null;

    return new StoryPage(...Object.values(row));
  }

  static async getAll() {
    const rows = await db.getall("SELECT * FROM story_pages");
    if (!rows) return null;

    return rows.map((row) => new StoryPage(...Object.values(row)));
  }

  static async getAllPagesInStory(storyId) {
    const rows = await db.getall(
      "SELECT * FROM story_pages WHERE story_id = ?",
      [storyId]
    );
    if (!rows) return null;

    return rows.map((row) => new StoryPage(...Object.values(row)));
  }

  async save() {
    const result = await db.query(
      "INSERT INTO story_pages (story_id, page_number, content, question) VALUES (?, ?, ?, ?)",
      [this.storyId, this.pageNumber, this.content, this.question]
    );

    this.id = result.insertId;

    return StoryPage.findById(result.insertId);
  }
}

export default StoryPage;
