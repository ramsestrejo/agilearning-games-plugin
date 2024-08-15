import express from "express";
import QuizScore from "../models/QuizScore.js";
import Quiz from "../models/Quiz.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const quizIds = new Set(req.body.map(({ quizId }) => quizId));
  const foundQuizIds = await Promise.all(
    [...quizIds].map(async (quizId) => Quiz.findById(quizId))
  );

  if (foundQuizIds.some((quizId) => quizId === null))
    return res.status(400).send("Quiz id does not exist.");

  const newQuizScores = await Promise.all(
    req.body.map(async ({ username, points, quizId }) => {
      const newQuizScore = new QuizScore(null, username, points, quizId);

      return newQuizScore.save();
    })
  ).catch((error) => {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occured while creating a quiz score." });
  });
  return res.status(201).send(newQuizScores);
});

router.get("/", async (req, res) => {
  res.send(await QuizScore.getAll());
});

router.get("/:id", async (req, res) => {
  const quizScores = await QuizScore.getAmountByQuiz(req.params.id);
  if (!quizScores) {
    return res.status(404).send("No scores found");
  }
  res.send(quizScores);
});

export default router;
