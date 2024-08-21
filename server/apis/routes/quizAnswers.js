import express from "express";
import QuizAnswer from "../models/QuizAnswer.js";
import Quiz from "../models/Quiz.js";

const router = express.Router();

// Previous implementation: used too many database connection requests
// router.post("/", async (req, res) => {
//   const quizIds = new Set(req.body.map(({ quizId }) => quizId));
//   const foundQuizIds = await Promise.all(
//     [...quizIds].map(async (quizId) => Quiz.findById(quizId))
//   );

//   if (foundQuizIds.some((quizId) => quizId === null))
//     return res.status(400).send("Quiz id does not exist.");

//   const newQuizAnswers = await Promise.all(
//     req.body.map(async ({ quizPage, quizId, answerText, isCorrect }) => {
//       const newQuizAnswer = new QuizAnswer(
//         null,
//         quizPage,
//         quizId,
//         answerText,
//         isCorrect
//       );

//       return newQuizAnswer.save();
//     })
//   ).catch((error) => {
//     console.log(error);
//     return res.status(500).json({ error: error });
//   });

//   return res.status(201).send(newQuizAnswers);
// });

router.post("/", async (req, res) => {
  // Checking for quizIds creates another database connection request which will cause issues if there are too many requests

  // const quizIds = new Set(req.body.map(({ quizId }) => quizId));
  // const foundQuizIds = await Promise.all(
  //   [...quizIds].map(async (quizId) => Quiz.findById(quizId))
  // );

  // if (foundQuizIds.some((quizId) => quizId === null))
  //   return res.status(400).send("Quiz id does not exist.");

  const count = req.body.length;
  const valueString = Array(count).fill("(?, ?, ?, ?)").join(", ");

  const valueArray = req.body.reduce(
    (acc, { quizPage, quizId, answerText, isCorrect }) => {
      acc.push(quizPage, quizId, answerText, isCorrect);
      return acc;
    },
    []
  );

  try {
    await QuizAnswer.saveAll(valueString, valueArray);
  } catch (error) {
    return res.status(500).send(error);
  }

  return res.status(201).send("Save successful");
});

router.get("/", async (req, res) => {
  res.send(await QuizAnswer.getAll());
});

router.get("/quiz/:quizId/page/:pageId", async (req, res) => {
  const { quizId, pageId } = req.params;

  const quizAnswers = await QuizAnswer.getAnswersByQuizPage(quizId, pageId);

  if (!quizAnswers)
    return res.status(404).send("Quiz ID or page ID not found.");

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
