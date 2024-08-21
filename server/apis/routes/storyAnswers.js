import express from "express";
import StoryAnswer from "../models/StoryAnswer.js";
import Story from "../models/Story.js";

const router = express.Router();

// Previous implementation: used too many database connection requests
// router.post("/", async (req, res) => {
//   const storyIds = new Set(req.body.map(({ storyId }) => storyId));
//   const foundStoryIds = await Promise.all(
//     [...storyIds].map(async (storyId) => Story.findById(storyId))
//   );

//   if (foundStoryIds.some((storyId) => storyId === null))
//     return res.status(400).send("Story id does not exist.");

//   const newStoryAnswers = await Promise.all(
//     req.body.map(async ({ storyPage, storyId, answerText, isCorrect }) => {
//       const newStoryAnswer = new StoryAnswer(
//         null,
//         storyPage,
//         storyId,
//         answerText,
//         isCorrect
//       );

//       return newStoryAnswer.save();
//     })
//   ).catch((error) => {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ error: "An error occured while creating a story answer." });
//   });

//   return res.status(201).send(newStoryAnswers);
// });

router.post("/", async (req, res) => {
  // Checking for storyIds creates another database connection request which will cause issues if there are too many requests
  // router.post("/", async (req, res) => {
  //   const storyIds = new Set(req.body.map(({ storyId }) => storyId));
  //   const foundStoryIds = await Promise.all(
  //     [...storyIds].map(async (storyId) => Story.findById(storyId))
  //   );

  //   if (foundStoryIds.some((storyId) => storyId === null))
  //     return res.status(400).send("Story id does not exist.");

  const count = req.body.length;
  const valueString = Array(count).fill("(?, ?, ?, ?)").join(", ");

  const valueArray = req.body.reduce(
    (acc, { storyPage, storyId, answerText, isCorrect }) => {
      acc.push(storyPage, storyId, answerText, isCorrect);
      return acc;
    },
    []
  );

  try {
    await StoryAnswer.saveAll(valueString, valueArray);
  } catch (error) {
    return res.status(500).send(error);
  }

  return res.status(201).send("Save successful");
});

router.get("/", async (req, res) => {
  res.send(await StoryAnswer.getAll());
});

router.get("/story/:storyId/page/:pageId", async (req, res) => {
  const { storyId, pageId } = req.params;

  const storyAnswers = await StoryAnswer.getAnswersByStoryPage(storyId, pageId);

  if (!storyAnswers.length)
    return res.status(404).send("Story ID or page ID not found.");

  return res.send(storyAnswers);
});

router.get("/story/:id", async (req, res) => {
  const storyId = req.params.id;

  if (!storyId) return res.status(400).send("No id provided");

  const storyAnswers = await StoryAnswer.getAllAnswersInStory(storyId);

  if (!storyAnswers.length) return res.status(404).send("Story ID not found.");

  return res.send(storyAnswers);
});

router.get("/:id", async (req, res) => {
  const storyAnswerId = req.params.id;
  if (!storyAnswerId) return res.status(400).send("No id provided");

  const storyAnswer = await StoryAnswer.findById(storyAnswerId);

  if (!storyAnswer) {
    return res.status(404).send("Story answer not found.");
  }

  return res.send(storyAnswer);
});

export default router;
