CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"icon" varchar,
	"color" varchar,
	"userId" integer
);

CREATE TABLE IF NOT EXISTS "records" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar,
	"amount" integer,
	"categoryId" integer,
	"date" varchar,
	"time" varchar,
	"note" varchar(256),
	"payee" varchar(256),
	"userId" integer
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"email" varchar(256),
	"password" varchar(256)
);
