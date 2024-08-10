CREATE TABLE stories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_type INT,
    FOREIGN KEY (game_type) REFERENCES game_types(id) ON DELETE CASCADE
);

INSERT INTO stories (game_type)
VALUES 
("2")
