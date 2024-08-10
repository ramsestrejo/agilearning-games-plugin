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