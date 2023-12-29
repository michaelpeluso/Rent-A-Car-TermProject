# Rent-A-Car-TermProject
Below is an in depth description of the project directory and how data from an Oracle database is fetched.

## Project Summary
A multi-locational car dealership's database with 8 tables, each holding information about vehicles, vehicle make and models, registration tickets, reservations, customers, each location, and prices. A full stack application was created and used to view this data in a simplified presentation. users can also create their own custom queries that show any data they specifically want to see. Used: HTML, JavaScript, Oracle SQL Developer, Node JS, Express JS 

## TL;DR
This creates a long line of function calls between several files allowing data from an Oracle database to be viewed on a webpage. Simply put, the SQL query is built from user input. Then a connection is made to the database, the query is executed, and that data is sent back to the user as output.

## /public
The public fodler contains all of the files that manage the front end of the website, relating to its text, visuals, and interactive navigation. 

Of which, “admin.html” includes the code required to display a page that allows for the user to enter their own SQL query or select from the queries listed below in the Queries in SQL section of this document. These queries will return a table that can be seen by the user. This page can be accessed by selecting “Admin” at the top left of the page, inside the navigation bar.

The “view-table.html” file is returned when the user selects any of the options listed in the “View Tables” dropdown menu. These options consist of each table located in the Oracle database. The table that will be displayed is dependent on the dropdown selection.
 
Accessing “admin.html” or “view-table.html” will forward a query request from “index.js”, which includes the specific SQL query that will return the given data. Two main JavaScript functions execute this request: “getData()” and “fetchData()”. A specific SQL query is selected in “getData()” and sent to “fetchData()” when a given page loads. The function “fetchData()” will then take that query and fetch a json object including the data from the Oracle database. The returned data is then passed into a new function, where the query response is parsed and printed into a table on the given html file.

“log.html” simply displays all recent SQL queries made by the server by intercepting these fetch calls, collecting the data returned, and printing it in the html file.

## /backend
Regarding the back end of the website, the routing is done by the “server.js” file. It manages the fetch calls executed in “index.js”. In other words, the server first attempts to connect to the Oracle database, request data given an SQL query, and then close the database connection.

The “db-manager.js” holds all of the code that manages the interactions between the server and the Oracle database. Its functions “connectToOracle()”, “getData()”, and “closeConnection()” are held here and exported to “server.js” for practical use. They are also executed sequentially in their respective order each time a new data request is made. The code connecting to the database consists of an asynchronous call to the database and passes the required parameters - a username, password, and database connection string. The connection string consists of several components of which the notable values include the host address, port number, and SID. These three connection values, which are stored in a private “.env” file, are passed as a JavaScript object into a function included in the “oracledb” package. The “getData()” function confirms a valid query and database connection. It uses this connection to pass the given query, and expects an object in return, which object consists of some metadata regarding the data table as well as the rows containing the actual data values in the table.
