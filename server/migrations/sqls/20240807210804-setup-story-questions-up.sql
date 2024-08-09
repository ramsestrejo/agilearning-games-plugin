CREATE TABLE story_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    story_id INT,
    page_number INT NOT NULL,
    question TEXT NOT NULL,
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
);

INSERT INTO story_questions (story_id, page_number, question) 
VALUES (1, 1, "Question 1?"),
(1, 2, "Question 2?"),
(1, 3, "Question 3?");