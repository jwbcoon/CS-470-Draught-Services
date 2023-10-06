-- This is an automatically generated file. Do not edit directly.

-- use draught_services;
DROP TABLE IF EXISTS cycles CASCADE;

CREATE TABLE "cycles" (
   "cycleID" SERIAL,
   "startDate" TIMESTAMP,
   "endDate" TIMESTAMP
,  PRIMARY KEY ("cycleID")
);

CREATE INDEX "cycles_cycleID"  on "cycles"("cycleID");

