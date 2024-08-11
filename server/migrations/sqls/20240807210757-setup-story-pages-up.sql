CREATE TABLE story_pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    story_id INT,
    page_number INT,
    content TEXT NOT NULL,
    question TEXT NOT NULL,
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
);

INSERT INTO story_pages (story_id, page_number, content, question)
VALUES 
(1, 1, "Piece of story text 1", "question 1"),
(1, 2, "Piece of story text 2", "question 2"),
(1, 3, "Piece of story text 3", "question 3");