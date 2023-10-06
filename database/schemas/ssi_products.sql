-- This is an automatically generated file. Do not edit directly.

-- -- -- usedraught_services;
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE "products" (
   "productName" varchar(100) NOT NULL,
   "productID" SERIAL,
   "distributorID" INT NOT NULL ,
   "marketID" INT NOT NULL ,
   "status" varchar(10),
   "lastModified" TIMESTAMP,
   "dateCreated" TIMESTAMP
,  PRIMARY KEY ("productID")
);

CREATE INDEX "products_productID"  on "products"("productID");

