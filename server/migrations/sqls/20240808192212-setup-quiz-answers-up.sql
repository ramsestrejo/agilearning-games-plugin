CREATE TABLE quiz_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_page INT,
    quiz_id INT,
    answer_text TEXT,
    is_correct BOOLEAN DEFAULT false,
    FOREIGN KEY (quiz_page) REFERENCES quiz_pages(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

INSERT INTO quiz_answers (quiz_id, quiz_page, answer_text, is_correct)
VALUES
(1, 1, "4", false),
(1, 1, "6", true),
(1, 1, "3", false),
(1, 1, "12", false),
(1, 2, "Answer 1", false),
(1, 2, "Answer 2", true),
(1, 2, "Answer 3", false),
(1, 2, "Answer 4", false),
(1, 3, "Answer 1", false),
(1, 3, "Answer 2", false),
(1, 3, "Answer 3", false),
(1, 3, "Answer 4", true);