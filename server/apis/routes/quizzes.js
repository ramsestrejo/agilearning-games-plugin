import express from "express";
import Quiz from "../models/Quiz.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { gameType } = req.body;

  const newQuiz = new Quiz(null, gameType);
  await newQuiz.save().catch((error) => {
    console.log(error);
    res.status(500).json({ error: "An error occured while creating a quiz." });
  });

  return res.status(201).send(newQuiz);
});

router.get("/", async (req, res) => {
  return res.status(200).send(await Quiz.getAll());
});

router.get("/:id", async (req, res) => {
  const quizId = req.params.id;
  if (!quizId) return res.status(400).send("No id provided");

  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    return res.status(404).send("Quiz not found.");
  }

  return res.send(quiz);
});

export default router;
