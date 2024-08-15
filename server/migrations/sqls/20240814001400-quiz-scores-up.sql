CREATE TABLE quiz_scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    points INT NOT NULL,
    quiz_id INT,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

INSERT INTO quiz_scores (username, points, quiz_id)
VALUES
("Toby", 1, 1),
("Kathryn", -1, 1)