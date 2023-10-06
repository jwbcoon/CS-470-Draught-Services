-- This is an automatically generated file. Do not edit directly.

-- -- -- usedraught_services;
DROP TABLE IF EXISTS employees CASCADE;

CREATE TABLE "employees" (
   "employeeName" varchar(100) NOT NULL,
   "employeeID" SERIAL,
   "routeID" INT  ,
   "dateHired" TIMESTAMP,
   "dateTerminated" TIMESTAMP,
   "status" varchar(10),
   "lastModified" TIMESTAMP,
   "dateCreated" TIMESTAMP
,  PRIMARY KEY ("employeeID")
);

CREATE INDEX "employees_employeeID"  on "employees"("employeeID");

