import express from "express";
import QuizAnswer from "../models/QuizAnswer.js";
import Quiz from "../models/Quiz.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const quizIds = new Set(req.body.map(({ quizId }) => quizId));
  const foundQuizIds = await Promise.all(
    [...quizIds].map(async (quizId) => Quiz.findById(quizId))
  );

  if (foundQuizIds.some((quizId) => quizId === null))
    return res.status(400).send("Quiz id does not exist.");

  const newQuizAnswers = await Promise.all(
    req.body.map(async ({ quizPage, quizId, answerText, isCorrect }) => {
      const newQuizAnswer = new QuizAnswer(
        null,
        quizPage,
        quizId,
        answerText,
        isCorrect
      );

      return newQuizAnswer.save();
    })
  ).catch((error) => {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occured while creating a quiz answer." });
  });

  return res.status(201).send(newQuizAnswers);
});

router.get("/", async (req, res) => {
  res.send(await QuizAnswer.getAll());
});

router.get("/quiz/:quizId/page/:pageId", async (req, res) => {
  const { quizId, pageId } = req.params;

  if (!quizId) return res.status(400).send("No quiz id provided");
  if (!pageId) return res.status(400).send("No page id provided");

  const quizAnswers = await QuizAnswer.getAnswersByQuizPage(quizId, pageId);

  if (!quizAnswers) return res.status(404).send("Quiz ID not found.");

  return res.send(quizAnswers);
});

router.get("/quiz/:id", async (req, res) => {
  const quizId = req.params.id;

  if (!quizId) return res.status(400).send("No id provided");

  const quizAnswers = await QuizAnswer.getAllAnswersInQuiz(quizId);

  if (!quizAnswers) return res.status(404).send("Quiz ID not found.");

  return res.send(quizAnswers);
});

router.get("/:id", async (req, res) => {
  const quizAnswerId = req.params.id;
  if (!quizAnswerId) return res.status(400).send("No id provided");

  const quizAnswer = await QuizAnswer.findById(quizAnswerId);

  if (!quizAnswer) {
    return res.status(404).send("Quiz answer not found.");
  }

  return res.send(quizAnswer);
});

export default router;
