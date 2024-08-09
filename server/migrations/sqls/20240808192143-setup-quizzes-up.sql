CREATE TABLE quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_type INT,
    FOREIGN KEY (game_type) REFERENCES game_types(id) ON DELETE CASCADE
);

INSERT INTO quizzes (game_type)
VALUES ("1")