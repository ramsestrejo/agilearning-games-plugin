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