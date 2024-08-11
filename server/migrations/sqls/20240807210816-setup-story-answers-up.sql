CREATE TABLE story_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    story_page_id INT,
    story_id INT,
    answer_text TEXT,
    is_correct BOOLEAN DEFAULT false,
    FOREIGN KEY (story_page_id) REFERENCES story_pages(id) ON DELETE CASCADE,
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
);

INSERT INTO story_answers (story_page_id, story_id, answer_text, is_correct)
VALUES 
(1, 1, "Answer 1", true),
(1, 1, "Answer 2", false),
(2, 1, "Answer 1", false),
(2, 1, "Answer 2", true),
(3, 1, "yes", true),
(3, 1, "no", false)