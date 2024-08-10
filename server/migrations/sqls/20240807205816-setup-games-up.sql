CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_name VARCHAR(255) UNIQUE NOT NULL,
    game_description TEXT NOT NULL,
    game_type_id INT,
    FOREIGN KEY (game_type_id) REFERENCES game_types(id) ON DELETE CASCADE
);

INSERT INTO games (game_name, game_description, game_type_id)
VALUES 
("quiz", "Info about the quiz type game here", 1),
("story", "Info about the story type game here", 2),
("trivia", "Coming soon!", 3),
("puzzle", "Coming soon!", 4),
("other", "Coming soon!", 5);