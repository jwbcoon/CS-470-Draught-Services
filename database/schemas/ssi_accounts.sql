-- This is an automatically generated file. Do not edit directly.

-- use draught_services;
DROP TABLE IF EXISTS accounts CASCADE;

CREATE TABLE "accounts" (
   "accountName" varchar(100) NOT NULL,
   "accountID" SERIAL,
   "routeID" INT NOT NULL ,
   "marketID" INT NOT NULL ,
   "status" varchar(10),
   "dateCreated" TIMESTAMP,
   "lastModified" TIMESTAMP
,  PRIMARY KEY ("accountID")
);

CREATE INDEX "accounts_accountID"  on "accounts"("accountID");

