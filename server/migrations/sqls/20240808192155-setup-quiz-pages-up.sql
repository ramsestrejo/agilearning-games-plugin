CREATE TABLE quiz_pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT,
    page_number INT,
    question TEXT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

INSERT INTO quiz_pages (quiz_id, page_number, question)
VALUES (1, 1, "Question 1"),
(1, 2, "Question 2"),
(1, 3, "Question 3");