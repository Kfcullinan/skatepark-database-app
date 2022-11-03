
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "skateparks" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(225) NOT NULL,
  "location"  VARCHAR(120) NOT NULL,
  "space_type" VARCHAR(120) NOT NULL,
  "difficulty" VARCHAR(120) NOT NULL, 
  "admin" VARCHAR(10) NOT NULL
);

CREATE TABLE "features" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR(120) NOT NULL
);

INSERT INTO "features" ("type")
VALUES
('Mini Ramp'),
('Halfpipe'),
('Bowl'),
('Banks');

INSERT INTO "skateparks" ("name", "location", "space_type", "difficulty", "admin")
VALUES
('Familia', 'Northeast Minneapolis', 'indoor', 'advanced', 'Keith');

CREATE TABLE "skatepark_features" (
	"id" SERIAL PRIMARY KEY, 
	"skatepark_id" INTEGER REFERENCES "skateparks" NOT NULL ON DELETE CASCADE, 
	"feature_id" INTEGER REFERENCES "features" NOT NULL
);


INSERT INTO "skatepark_features" ("skatepark_id", "feature_id")
VALUES
('1', '1'),
('1', '2'), 
('1', '3'), 
('1', '4');


SELECT * FROM "skatepark_features"
FULL JOIN "skateparks"
ON "skateparks"."id"="skatepark_features"."skatepark_id";

INSERT INTO "skateparks" ("name", "location", "space_type", "difficulty")
    VALUES ('a', 'b', 'c', 'd')
    RETURNING "id";


ALTER TABLE "skateparks" 
ADD "photo" VARCHAR;