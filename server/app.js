import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import gamesApi from "./apis/routes/games.js";
import quizzesApi from "./apis/routes/quizzes.js";
import quizAnswersApi from "./apis/routes/quizAnswers.js";
import quizPagesApi from "./apis/routes/quizPages.js";
import storiesApi from "./apis/routes/stories.js";
import storyAnswersApi from "./apis/routes/storyAnswers.js";
import storyPagesApi from "./apis/routes/storyPages.js";
import quizScoresApi from "./apis/routes/quizScores.js";
import cors from "cors";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());
app.use(cors());

app.use("/api/games", gamesApi);
app.use("/api/quizzes", quizzesApi);
app.use("/api/quiz-pages", quizPagesApi);
app.use("/api/quiz-answers", quizAnswersApi);
app.use("/api/stories", storiesApi);
app.use("/api/story-pages", storyPagesApi);
app.use("/api/story-answers", storyAnswersApi);
app.use("/api/quiz-scores", quizScoresApi);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
