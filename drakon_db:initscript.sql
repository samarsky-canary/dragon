-- Enabled encryption for password
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

drop table users;
create table users(
    id uuid PRIMARY KEY,
    name text NOT NULL UNIQUE,
    pswhash text NOT NULL
    );


INSERT INTO users VALUES (
    uuid_generate_v1(), 'John Doe', crypt('12345','f1')
    );