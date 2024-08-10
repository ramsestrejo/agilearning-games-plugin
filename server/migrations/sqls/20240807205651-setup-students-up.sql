CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO students (password, email, username)
VALUES 
("$argon2i$v=19$m=16,t=2,p=1$cGFzc3dvcmQ$JWF+pwgScQoL9lm+4566uQ", "user1@mail.com", "user1");