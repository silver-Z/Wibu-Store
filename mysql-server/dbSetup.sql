-- create users table
CREATE TABLE users (
    uid INT UNSIGNED,
    email VARCHAR(255),
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender TINYINT,
    dob DATETIME,
    created_at DATETIME NOT NULL,
    PRIMARY KEY (uid),
    UNIQUE (email),
    UNIQUE (password)
);

-- create genres table
CREATE TABLE genres (
    id INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- create companies table
CREATE TABLE companies (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (id)
);

-- create games table
CREATE TABLE games (
    id INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    genres JSON,
    developers JSON,
    publisher INT,
    description TEXT,
    release_date DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (publisher) REFERENCES companies(id)
);

-- create store-related table
CREATE TABLE gameStoreRelatedIn4 (
    id INT NOT NULL,
    reviews JSON,
    original_price DECIMAL(6, 2) NOT NULL,
    price DECIMAL(6, 2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES games(id)
);