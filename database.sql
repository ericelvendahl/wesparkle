
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "disabled_user" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "link" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"long_url" VARCHAR (2000),
	"short_url" VARCHAR (1000) UNIQUE,
	"disabled_link" BOOLEAN DEFAULT FALSE,
	"tags" text array,
	"date_created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "click" (
	"id" SERIAL PRIMARY KEY,
	"link_id" INT REFERENCES "link",
	"location" VARCHAR (2000),
	"referral" VARCHAR (2000),
	"time" TIMESTAMP
);

-- CREATE TABLE "link" (
-- 	"id" SERIAL PRIMARY KEY,
-- 	"user_id" INT REFERENCES "user",
-- 	"long_url" VARCHAR (2000),
-- 	"short_url" VARCHAR (1000) UNIQUE,
-- 	"disabled_link" BOOLEAN DEFAULT FALSE
-- );

-- CREATE TABLE "tag" (
-- 	"id" SERIAL PRIMARY KEY,
-- 	"user_id" INT REFERENCES "user",
-- 	"tag_name" VARCHAR (1000)
-- );

-- CREATE TABLE "link_tag" (
-- 	"id" SERIAL PRIMARY KEY,
-- 	"link_id" INT REFERENCES "link",
-- 	"tag_id" INT REFERENCES "tag"
-- );
