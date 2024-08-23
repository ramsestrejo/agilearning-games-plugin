# Agilearning App

## Overview

This project is a React and Heroku application designed to add gamification elements to studying. The app is intended to allow users to create different games for whatever topic they want, and have students play and participate in those games as a way to engage students in the topic, in and out of the classroom.

## Features

This project currently has two available game types for users to work with to create their own games for studying, as well as a lobby where students can use game codes and their names to participate in created games and appear on the leaderboard or get feedback on their results. The game selection screen also has placeholders for future games that could potentially be added.

## Dependencies

The frontend of this project utilizes React, React router, React-icons, Vite, and Hookstate.

This application requires Node, npm, and Docker to run.

## Starting The Dev App

### Setup

- Clone the app to your local system
- In /agilearning-plugin, run "npm run install-dependencies" in the terminal.
- In /agilearning-plugin/client, add an .env file with these parameters:
  - VITE_API_PORT=8080
  - VITE_PORT=3000
- In /agilearning-plugin/server, add an .env file with these parameters:

  - PORT=8080
  - DB_HOST=localhost
  - DB_USER=root
  - DB_PASSWORD=password
  - DB_NAME=agilearning-api

- In /agilearning-plugin/server, ensuring Docker is running, run "npm run create-db" in the terminal
  - confirm a new container named agilearning-mysql has been created and is running.
- After that, still in /server, run "npm run migrate:up".

### Running the app

In the /agilearning-plugin terminal, run "npm run start".

## Deployment

1. Create/login to a Heroku account
1. Navigate to Heroku Dashboard
1. Select "New", then "Create new app"
1. Name your app, choose a region (ideally where your clientbase will be primarily accessing from), and select "Create app"
1. Navigate to "Resources", in the "add-ons" search bar enter the database type you wish to use (for this guide, JawsDB MySQL will be utilized)
1. Click the Database you wish to use, and select a plan that works best for you
1. Select the add-ons name under the search bar to be taken to the dashboard for the database
1. Back in Heroku Dashboard, navigate to "settings"
1. Select "Reveal config vars" in "Config Vars"
1. Add the database configuration variables from the database dashboard (no quotes):

- Key: "DB_HOST" / Value: "Host value"
- Key: "DB_NAME" / Value: "Database value"
- Key: "DB_PASSWORD" / Value: "Password value"
- Key: "DB_USER' / Value: "Username value"
- Key: "JAWSDB_URL" / Value: "Connection String"
- Key: "PORT" / Value: "8080"
- Key: "VITE_API_PORT" / Value: "8080"
- Key: "VITE_PORT" / Value: "3000"

1. Add tables/necessary data to the database through a tool like MySQL Workbench (next section).
1. Navigate to the "Deploy" tab, and select "GitHub" in the "Deployment method" section.
1. Ensure Heroku has access to GitHub, and select the repository you wish to deploy from.
1. Scroll down to automatic or manual deploy and select the branch you wish to deploy, then select "Deploy Branch"
1. Wait for deployment success, and select "Open app" from the top of the page to ensure app is running correctly.

### MySQL Query

A mega query for initializing the database:

```sql
CREATE TABLE game_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_type VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255)
);

INSERT INTO game_types (game_type)
VALUES
("quiz"),
("story"),
("trivia"),
("puzzle"),
("other");

CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_name VARCHAR(255) UNIQUE NOT NULL,
    game_description TEXT NOT NULL,
    game_type_id INT,
    FOREIGN KEY (game_type_id) REFERENCES game_types(id) ON DELETE CASCADE
);

INSERT INTO games (game_name, game_description, game_type_id)
VALUES
("quiz", "A timed quiz where users can add in their own questions and answers.
Players have thirty seconds to answer each question and their score will be
affected by how quickly they respond.
Includes a leaderboard for tracking player scores.", 1),
("story", "An untimed story game with a quiz component, where users can add in
blocks of story text, questions and answers.
After each story block, players will get a question prompt and answers
corresponding to what they just read.
Includes a custom message prompt at the end that will display
different messages to players depending on how many questions they got right.", 2),
("trivia", "Coming soon!", 3),
("puzzle", "Coming soon!", 4),
("other", "Coming soon!", 5);

CREATE TABLE stories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_type INT,
    FOREIGN KEY (game_type) REFERENCES game_types(id) ON DELETE CASCADE
);

CREATE TABLE story_pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    story_id INT,
    page_number INT,
    content TEXT NOT NULL,
    question TEXT NOT NULL,
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
);

CREATE TABLE story_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    story_page_id INT,
    story_id INT,
    answer_text TEXT,
    is_correct BOOLEAN DEFAULT false,
    FOREIGN KEY (story_page_id) REFERENCES story_pages(id) ON DELETE CASCADE,
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
);

CREATE TABLE quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_type INT,
    FOREIGN KEY (game_type) REFERENCES game_types(id) ON DELETE CASCADE
);

CREATE TABLE quiz_pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT,
    page_number INT,
    question TEXT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE quiz_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_page INT,
    quiz_id INT,
    answer_text TEXT,
    is_correct BOOLEAN DEFAULT false,
    FOREIGN KEY (quiz_page) REFERENCES quiz_pages(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE quiz_scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    points INT NOT NULL,
    quiz_id INT,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);
```
