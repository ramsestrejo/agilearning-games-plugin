import express from "express";
import db from "../../dbconnection.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const games = await db.query(
      "SELECT game_name AS name, game_description AS description FROM games"
    );
    return res.json(games);
  } catch (err) {
    console.error("Error fetching games:", err);
    res.status(500).json({ error: "An error occured while fetching games." });
  }
});

router.get("/:gameName", async (req, res) => {
  try {
    const gameType = await db.query("SELECT game_name FROM games");
    return res.json(gameType);
  } catch (err) {
    console.error("Error fetching game_type:", err);
    res
      .status(500)
      .json({ error: "An error occured while fetching game_type." });
  }
});

export default router;
