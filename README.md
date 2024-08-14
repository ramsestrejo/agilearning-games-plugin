# Agilearning App

## Overview
This project is a React and Heroku application designed to add gamification elements to studying. The app is intended to allow users to create different games for whatever topic they want, and have students play and participate in those games as a way to engage students in the topic, in and out of the classroom.

## Features
This project currently has two available game types for users to work with to create their own games for studying, as well as a lobby where students can use game codes and their names to participate in created games and appear on the leaderboard or get feedback on their results. The game selection screen also has placeholders for future games that could potentially be added.

## Dependencies
The frontend of this project utilizes React, React router, React-icons, Vite, and Hookstate.

This application requires Node, npm, and Docker to run.

## Starting The Dev App

- Clone the app to your local system
- In /agilearning-plugin, run "npm run install-dependencies" in the terminal.
- In /agilearning-plugin/client, add an .env file with these parameters:
  - VITE_API_PORT=3001
  - VITE_PORT=3000
- In /agilearning-plugin/server, add an .env file with these parameters:

  - PORT=3001
  - DB_HOST=localhost
  - DB_USER=root
  - DB_PASSWORD=password
  - DB_NAME=agilearning-api

- In /agilearning-plugin/server, ensuring Docker is running, run "npm run create-db" in the terminal
  - confirm a new container named agilearning-mysql has been created and is running.
- After that, still in /server, run "npm run migrate:up".

To actually run the app, in the /agilearning-plugin terminal, run "npm run start".
