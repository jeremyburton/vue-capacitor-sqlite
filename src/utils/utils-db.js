export const createTables = `
  CREATE TABLE IF NOT EXISTS teams (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT UNIQUE NOT NULL,
    last_modified INTEGER DEFAULT (strftime('%s', 'now'))
  );
  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY NOT NULL,
    team_id INTEGER NOT NULL,
    name TEXT UNIQUE NOT NULL,
    picked BOOLEAN NOT NULL CHECK (picked IN (0, 1)),
    grade TEXT CHECK (grade IN (0, 1, 2, 3)),
    last_modified INTEGER DEFAULT (strftime('%s', 'now'))
  );
  CREATE INDEX IF NOT EXISTS teams_index_name ON teams (name);
  CREATE INDEX IF NOT EXISTS teams_index_last_modified ON teams (last_modified);
  CREATE TRIGGER IF NOT EXISTS teams_trigger_last_modified
  AFTER UPDATE ON teams
  FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified
  BEGIN
    UPDATE teams SET last_modified= (strftime('%s', 'now')) WHERE id=OLD.id;
  END;
  CREATE INDEX IF NOT EXISTS members_index_team_id ON members (team_id);
  CREATE INDEX IF NOT EXISTS members_index_name ON members (name);
  CREATE INDEX IF NOT EXISTS members_index_picked ON members (picked);
  CREATE INDEX IF NOT EXISTS members_index_grade ON members (grade);
  CREATE INDEX IF NOT EXISTS members_index_last_modified ON members (last_modified);
  CREATE TRIGGER IF NOT EXISTS members_trigger_last_modified
  AFTER UPDATE ON members
  FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified
  BEGIN
    UPDATE members SET last_modified= (strftime('%s', 'now')) WHERE id=OLD.id;
  END;
  PRAGMA user_version = 1;
`;

export const importTwoTeams = `
  DELETE FROM teams;
  INSERT INTO teams (name) VALUES ("7SVZ");
  INSERT INTO teams (name) VALUES ("7DAN");
  INSERT INTO teams (name) VALUES ("7SND");
  INSERT INTO teams (name) VALUES ("8DHR");
`;

export const importTwelveMembers = `
  DELETE FROM members;
  INSERT INTO members (team_id,name,picked,grade) VALUES (1,"Skye Burton",0,NULL);
  INSERT INTO members (team_id,name,picked,grade) VALUES (1,"Jamie Mhara",0,NULL);
  INSERT INTO members (team_id,name,picked,grade) VALUES (1,"Maddie Walker",0,NULL);
  INSERT INTO members (team_id,name,picked,grade) VALUES (1,"Daisy O'Shea",0,NULL);
  INSERT INTO members (team_id,name,picked,grade) VALUES (1,"Frank Owen",0,NULL);
  INSERT INTO members (team_id,name,picked,grade) VALUES (1,"Betsie Toole",0,NULL);
  INSERT INTO members (team_id,name,picked,grade) VALUES (2,"Ravi Srinder",0,NULL);
  INSERT INTO members (team_id,name,picked,grade) VALUES (2,"Connor James",0,NULL);
  INSERT INTO members (team_id,name,picked,grade) VALUES (2,"Lily Allen",0,NULL);
  INSERT INTO members (team_id,name,picked,grade) VALUES (2,"Vernie Jones",0,NULL);
  INSERT INTO members (team_id,name,picked,grade) VALUES (2,"Rachel Ward",0,NULL);
  INSERT INTO members (team_id,name,picked,grade) VALUES (2,"Lachlan O'Mara",0,NULL);
`;

export const dropTables = `
  PRAGMA foreign_keys = OFF;
  DROP TABLE IF EXISTS teams;
  DROP TABLE IF EXISTS members;
  PRAGMA foreign_keys = ON;
`;
