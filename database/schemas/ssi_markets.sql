-- This is an automatically generated file. Do not edit directly.

-- -- -- usedraught_services;
DROP TABLE IF EXISTS markets CASCADE;

CREATE TABLE "markets" (
   "marketID" SERIAL,
   "marketName" varchar(100),
   "city" varchar(100),
   "state" varchar(10),
   "status" varchar(10),
   "lastModified" TIMESTAMP,
   "dateCreated" TIMESTAMP
,  PRIMARY KEY ("marketID")
);

CREATE INDEX "markets_marketID"  on "markets"("marketID");

