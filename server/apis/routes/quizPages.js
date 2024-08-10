import express from "express";
import QuizPage from "../models/QuizPage.js";
import Quiz from "../models/Quiz.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const quizIds = new Set(req.body.map(({ quizId }) => quizId));
  const foundQuizIds = await Promise.all(
    [...quizIds].map(async (quizId) => Quiz.findById(quizId))
  );

  if (foundQuizIds.some((quizId) => quizId === null))
    return res.status(400).send("Quiz id does not exist.");

  const newQuizPages = await Promise.all(
    req.body.map(async ({ quizId, pageNumber, question }) => {
      const newQuizPage = new QuizPage(null, quizId, pageNumber, question);

      return newQuizPage.save();
    })
  ).catch((error) => {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occured while creating a quiz page." });
  });

  return res.status(201).send(newQuizPages);
});

router.get("/", async (req, res) => {
  res.send(await QuizPage.getAll());
});

router.get("/quiz/:id", async (req, res) => {
  const quizId = req.params.id;
  if (!quizId) return res.status(400).send("No id provided");

  const quizPages = await QuizPage.getAllPagesInQuiz(quizId);

  if (!quizPages) {
    return res.status(404).send("Quiz ID not found.");
  }

  return res.send(quizPages);
});

router.get("/:id", async (req, res) => {
  const quizPageId = req.params.id;
  if (!quizPageId) return res.status(400).send("No id provided");

  const quizPage = await QuizPage.findById(quizPageId);

  if (!quizPage) {
    return res.status(404).send("Quiz page not found.");
  }

  return res.send(quizPage);
});

export default router;
