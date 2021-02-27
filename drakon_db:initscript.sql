-- Enabled encryption for password
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

drop table users;
create table users(
    id uuid PRIMARY KEY,
    name text NOT NULL UNIQUE ,
    pswhash text NOT NULL
    );


INSERT INTO users VALUES (
    uuid_generate_v1(), 'John Doe', crypt('12345','f1')
    );

CREATE function user_registration(newname text,newpass text) RETURNS trigger AS $registration$
    BEGIN
        if (SELECT name from users where name = newname) IS NOT NULL then
            RAISE EXCEPTION 'user with that name already registered';
        end if;
        NEW.uuid = uuid_generate_v1();
        return NEW;
    END;
    $registration$ language  plpgsql;