CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


drop table IF EXISTS users;
create table users(
    id uuid PRIMARY KEY,
    name text NOT NULL UNIQUE ,
    pswhash text NOT NULL
    );



DROP TABLE IF EXISTS  curators;
CREATE TABLE IF NOT EXISTS curators (
    id serial primary key,
    id_curator uuid,
    id_user uuid,
    relation_name text,
    foreign key (id_curator) references users (id),
    foreign key (id_user) references users (id),
    UNIQUE (id_curator, id_user)
);


CREATE OR REPLACE FUNCTION curator_relation_role_check()
  RETURNS TRIGGER AS $$
BEGIN
  IF (select role FROM users WHERE users.id = NEW.id_user) != 'USER' OR NEW.id_user is null
  THEN
    RAISE EXCEPTION 'curators can add only USER roles';
  END IF;

    IF (select role FROM users WHERE users.id = NEW.id_curator) = 'USER' OR NEW.id_curator is null
  THEN
    RAISE EXCEPTION 'USER role not allowed to be curators';
  END IF;
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_user_role BEFORE INSERT OR UPDATE ON curators
FOR EACH ROW EXECUTE PROCEDURE curator_relation_role_check();


insert into curators (id_curator, id_user, relation_name) values
((SELECT id from users where username ='Jersy' and role='CURATOR'),
 (SELECT id from users where username = 'Jersy' and role ='CURATOR'),
 'student IPR-31');



-- Enabled encryption for password
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE OR REPLACE function user_registration() RETURNS trigger AS $$
    BEGIN
        IF (SELECT username from users where username = NEW.username) IS NOT NULL
        THEN
            RAISE EXCEPTION 'user with that name already registered';
        ELSE
            NEW.id = uuid_generate_v4();
        end if;
        return NEW;
    END;
    $$ language  plpgsql;


CREATE TRIGGER register_new_user_tr BEFORE INSERT ON users
FOR EACH ROW EXECUTE PROCEDURE user_registration();



UPDATE users SET username = 'Fill   ' WHERE username = 'Jeremy';

DROP function  user_rename();
CREATE OR REPLACE FUNCTION user_rename () RETURNS trigger as
    $$
    BEGIN
       IF (NEW.username !~ '^[a-zA-Z0-9_\-]+$')
           THEN RAISE EXCEPTION 'username has forbidden symbols ';
        end if;
       return NEW;
    END;
    $$
language plpgsql;

CREATE TRIGGER user_rename_trg BEFORE UPDATE OR INSERT ON users
FOR EACH ROW EXECUTE PROCEDURE user_rename();

--#################################################

Drop table  dragon_scheme;
CREATE TABLE IF NOT EXISTS dragon_scheme (
    id uuid PRIMARY KEY ,
    name varchar(50),
    id_user uuid,
    data jsonb,
    last_changed timestamp,
    last_changed_by_id uuid,
    foreign key (id_user) references users (id),
    foreign key (last_changed_by_id) references users (id)
);

CREATE OR REPLACE function update_scheme() RETURNS trigger AS $registration$
    BEGIN
            NEW.last_changed = current_timestamp;
        return NEW;
    END;
    $registration$ language  plpgsql;

CREATE TRIGGER register_new_user BEFORE UPDATE ON dragon_scheme
FOR EACH ROW EXECUTE PROCEDURE update_scheme();

CALL delete_user( '6eb0808f-77d7-4ad6-8b98-3c560f9e4520'::uuid);
CREATE procedure delete_user(delete_id uuid) as
    $$
    BEGIN
        DELETE FROM users where  id = delete_id;
        DELETE from curators where id_user = delete_id or id_curator = delete_id;
        DELETE from dragon_scheme where id_user = delete_id;

    END;
    $$
language  plpgsql;

CREATE FUNCTION delete_user() returns trigger as
    $$
    BEGIN
        DELETE FROM users where  id = OLD.id;
        DELETE from curators where id_user = OLD.id or id_curator = OLD.id;
        DELETE from dragon_scheme where id_user = OLD.id;

    END;
    $$
language  plpgsql;

CREATE TRIGGER delete_user_trg AFTER DELETE ON users EXECUTE FUNCTION  delete_user();

CREATE OR REPLACE function scheme_insert() RETURNS trigger AS $$
    BEGIN
        NEW.id = uuid_generate_v4();
        return NEW;
    END;
    $$ language  plpgsql;


CREATE TRIGGER scheme_insert_trg BEFORE INSERT ON dragon_scheme
FOR EACH ROW EXECUTE PROCEDURE scheme_insert();


