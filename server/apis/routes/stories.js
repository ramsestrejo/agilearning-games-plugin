import express from "express";
import Story from "../models/Story.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { gameTypeId } = req.body;

  const newStory = new Story(null, gameTypeId);
  await newStory.save().catch((error) => {
    console.log(error);
    res.status(500).json({ error: "An error occured while creating a story." });
  });

  return res.status(201).send(newStory);
});

router.get("/", async (req, res) => {
  return res.status(200).send(await Story.getAll());
});

router.get("/:id", async (req, res) => {
  const storyId = req.params.id;
  if (!storyId) return res.status(400).send("No id provided");

  const story = await Story.findById(storyId);

  if (!story) {
    return res.status(404).send("Story not found.");
  }

  return res.send(story);
});

export default router;
