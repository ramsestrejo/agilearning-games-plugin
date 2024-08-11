import express from "express";
import StoryPage from "../models/StoryPage.js";
import Story from "../models/Story.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const storyIds = new Set(req.body.map(({ storyId }) => storyId));
  const foundStoryIds = await Promise.all(
    [...storyIds].map(async (storyId) => Story.findById(storyId))
  );

  if (foundStoryIds.some((storyId) => storyId === null))
    return res.status(400).send("Story id does not exist.");

  const newStoryPages = await Promise.all(
    req.body.map(async ({ storyId, pageNumber, content, question }) => {
      const newStoryPage = new StoryPage(
        null,
        storyId,
        pageNumber,
        content,
        question
      );

      return newStoryPage.save();
    })
  ).catch((error) => {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occured while creating a story page." });
  });

  return res.status(201).send(newStoryPages);
});

router.get("/", async (req, res) => {
  res.send(await StoryPage.getAll());
});

router.get("/story/:id", async (req, res) => {
  const storyId = req.params.id;
  if (!storyId) return res.status(400).send("No id provided");

  const storyPages = await StoryPage.getAllPagesInStory(storyId);

  if (!storyPages.length) {
    return res.status(404).send("Story ID not found.");
  }

  return res.send(storyPages);
});

router.get("/:id", async (req, res) => {
  const storyPageId = req.params.id;
  if (!storyPageId) return res.status(400).send("No id provided");

  const storyPage = await StoryPage.findById(storyPageId);

  if (!storyPage) {
    return res.status(404).send("Story page not found.");
  }

  return res.send(storyPage);
});

export default router;
