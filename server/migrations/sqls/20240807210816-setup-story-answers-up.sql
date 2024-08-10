CREATE TABLE story_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT,
    answer_text TEXT,
    is_correct BOOLEAN DEFAULT false,
    FOREIGN KEY (question_id) REFERENCES story_questions(id) ON DELETE CASCADE
);

INSERT INTO story_answers (question_id, answer_text, is_correct)
VALUES 
(1, "Answer 1", true),
(1, "Answer 2", false),
(2, "Answer 1", false),
(2, "Answer 2", true),
(3, "yes", true),
(3, "no", false)