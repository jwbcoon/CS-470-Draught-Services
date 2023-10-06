-- This is an automatically generated file. Do not edit directly.

-- -- -- usedraught_services;
DROP TABLE IF EXISTS routes CASCADE;

CREATE TABLE "routes" (
   "routeID" SERIAL,
   "routeName" varchar(50),
   "employeeID" INT NOT NULL ,
   "marketID" INT NOT NULL ,
   "cycleID" INT NOT NULL ,
   "status" varchar(10),
   "lastModified" TIMESTAMP,
   "dateCreated" TIMESTAMP
,  PRIMARY KEY ("routeID")
);

CREATE INDEX "routes_routeID"  on "routes"("routeID");
CREATE INDEX "routes_employeeID"  on "routes"("employeeID");
CREATE INDEX "routes_cycleID"  on "routes"("cycleID");

