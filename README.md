# CS-470-Draught-Services

### Hello Dr. Kooshesh! And Welcome to My Draught Services Project

There are multiple ways to run my program. The most streamlined would be to run the bash script which I have included with this submission. Ensure it is placed in the parent directory of the ui, database, and api subdirectories. From the root directory, if the script is executeable on your machine, first run ``./draught_services init`` to configure the application. This process will install the preqreusite node packages in each directory. Then to begin running the api server and ui server for the application, run ``./draught_services start``. This command will host the api and ui servers as background processes, writing their process IDs to a temporary file in the working directory, ``.b_pids.tmp``. To end both processes and the program gracefully, simply run ``./draught_services stop``. If the database files are on your machine, but they are unloaded, you can attempt to create the database using ``./draught_services load``.

If you experience any issues with this, the program should still function normally with some legwork by navigating to the api directory, running ``npm install``, and then running ``node index.js``. For the UI server, navigate to the ui directory, run ``npm install``, and then run ``npm start``.

This is all assuming the database is already loaded and connected to your machine. This program runs with a PostgreSQL database, so it may be required to host PostgreSQL on the computer to execute the program. If you are willing to configure PostgreSQL to run on your computer, simply creating a user named "lej" on this database and configuring automatic login for your account will enable you to use ``./draught_services load`` to populate the database on your machine. If the database is already present, this command will also simply refresh the database contents from the schemas and dumps provided in the appropriate directories.

I am glad to report that my project is fulfills all the requirements of the spec. Here is a series of images displaying project functionality:

## Logging In
![Screenshot from 2023-10-13 20-28-46](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/e39c4aaa-5f36-432b-89f6-e9be4e5253dd)

## Loading MenuSet in TopBar and Displaying Transaction Count
![Screenshot from 2023-10-13 20-29-18](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/ad99efdd-759f-43c5-8bd2-53c5f50cbfad)
This fulfills the requirement associated with the http://localhost:8443/api/v1/transactions/:cycleID router path in the project spec.

## Selecting Database Attribute Data
![Screenshot from 2023-10-13 20-29-50](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/e9a38ad7-a501-4c93-969d-f361d7befc6f)
This selection will accurately fill the data displayed on the screen with values from within the database, but the menu option itself is erroneous: It will show the options for the last entry everytime. In this case, that entry is route ID. Here we are selecting the data associated with route ID 130009.

## Updating State for Data from Transaction Count Per Cycle Call and for Future Transaction Calls
![Screenshot from 2023-10-13 20-30-31](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/eb952efb-8632-47f4-9ddd-1b0d8c789615)
The data is successfully reflected in the text displayed below the TopBar.

## Opening the Markets Selection and Producing a Table for All Markets
![Screenshot from 2023-10-13 20-31-27](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/cc6f0153-71b7-4570-a280-5796dfeb49e0)

## Transactions Per Cycle for Each Market ID
![Screenshot from 2023-10-13 20-32-06](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/89076332-444f-488f-b702-395b150a1aeb)

## Table and Transactions Per Cycle for Each Route ID
![Screenshot from 2023-10-13 20-33-10](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/494660db-9621-4fa4-b24d-58bd3761a66e)

## Table and Transactions Per Cycle for Each AccountID
![Screenshot from 2023-10-13 20-34-14](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/dcb053d6-1ee9-42e5-bd94-ea07655f627a)
You can even open multiple RowDescriptors at once! If there is nothing in a RowDescriptor, an appropriate message will indicate so.

## Selecting Transactions Gives Table For All Transactions
![Screenshot from 2023-10-13 20-36-10](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/b553899c-3a5b-43e1-9fbd-61a76d785c82)
The table for transactions is so wide it stretches the screen! This table can take a while to load, so I hard-coded a limit on the query in the UI.

## Closing the MainDrawer Allows View of Entire Transaction Table

![Screenshot from 2023-10-13 20-36-26](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/bb7d1287-5021-4c8d-84bf-362ffaf66145)
You can use this perspective to confirm that according database table attributes are being used to filter queries specified in the project, like the following:

## Get Transactions Per Cycle By Account ID, Revealed Among Other Selections by Clicking the DropDown Arrow
![Screenshot from 2023-10-13 20-36-46](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/807317a0-0f6a-4f7b-a766-67b6a76ae348)
This view corresponds to the path http://localhost:8443/api/v1/transactions/:cycleID/:accountID/one-account (this path was also used in the RowDescriptors above).

## Confirmation Image of Matching ID to Table
![Screenshot from 2023-10-13 20-37-49](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/554923de-e225-4ee7-8c56-7a59b86eb608)

## The Same For Transactions Per Cycle By Route ID and Its Confirmation
![Screenshot from 2023-10-13 20-38-09](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/6bacd46e-2d79-47fd-b050-9ef06322815c)
![Screenshot from 2023-10-13 20-38-32](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/25d18654-6bd8-4f2f-8576-df29cb0e0d9f)
This view corresponds to the path http://localhost:8443/api/v1/transactions/:cycleID/:routeID/trans-for-route (this path was also used in the RowDescriptors above).

## The Same For Transactions Per Cycle For All Routes and Its Confirmation
![Screenshot from 2023-10-13 20-39-23](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/4b2dc7f5-cd7b-4f60-893a-bc513a654d47)
![Screenshot from 2023-10-13 20-39-46](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/f8680559-c5b8-484f-818f-d1bb202856a0)
This view corresponds to the path http://localhost:8443/api/v1/transacitons/:cycleID/all-routes

## The Same For Transactions Per Cycle By Market ID and Its Confirmation
![Screenshot from 2023-10-13 20-40-47](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/e2202407-f6c2-43d5-85b6-035532e8195a)
![Screenshot from 2023-10-13 20-41-02](https://github.com/jwbcoon/CS-470-Draught-Services/assets/89538296/3c24a12c-1f89-4817-a6e2-d9f874ff6635)
This view corresponds to the path http://localhost:8443/api/v1/transactions/:cycleID/:marketID/trans-for-market (this path was also used in the RowDescriptors above).

