/*
    index.js
*/

// on page load
$(document).ready(function () {
    getData();
    manageAdmin();

    // get respective data
    function getData() {
        // view-table.html
        if (window.location.pathname === "/view-agrees") {
            $("#table-name").html("Agrees");
            fetchData("SELECT * FROM AGREES");
        } else if (window.location.pathname === "/view-credit-card") {
            $("#table-name").html("Credit Card");
            fetchData("SELECT * FROM CLASS");
        } else if (window.location.pathname === "/view-class") {
            $("#table-name").html("Class");
            fetchData("SELECT * FROM CLASS");
        } else if (window.location.pathname === "/view-customer") {
            $("#table-name").html("Customer");
            fetchData("SELECT * FROM CUSTOMER");
        } else if (window.location.pathname === "/view-location") {
            $("#table-name").html("Location");
            fetchData("SELECT * FROM LOCATION");
        } else if (window.location.pathname === "/view-makes") {
            $("#table-name").html("Makes");
            fetchData("SELECT * FROM MAKES");
        } else if (window.location.pathname === "/view-model") {
            $("#table-name").html("Model");
            fetchData("SELECT * FROM MODEL");
        } else if (window.location.pathname === "/view-rental-agreement") {
            $("#table-name").html("Rental-Agreement");
            fetchData("SELECT * FROM RENTAL_AGREEMENT");
        } else if (window.location.pathname === "/view-reservation") {
            $("#table-name").html("Reservation");
            fetchData("SELECT * FROM RESERVATION");
        } else if (window.location.pathname === "/view-vehicle") {
            $("#table-name").html("Vehicle");
            fetchData("SELECT * FROM VEHICLE");
        }
        // admin.html
        else if (window.location.pathname === "/admin") {
            $("#executeQuery").on("click", function () {
                const customQuery = $("#queryInput").val();
                if (customQuery) {
                    fetchData(customQuery);
                } else {
                    $("#data-container").html("");
                    $("#data-container").append("<p>Enter a valid query<p>");
                }
            });
        }
    }

    // request data from oracle
    async function fetchData(query) {
        try {
            const response = await fetch(`/data?query=${encodeURIComponent(query)}`);
            const data = await response.json();
            displayData(data.data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }

    // display data from oracle
    function displayData(result) {
        const container = $("#data-container");
        container.html("");

        if (result.data.length === 0) {
            container.append("<p>No data available</p>");
        } else {
            const table = $("<table>");

            const thead = $("<thead>").appendTo(table);
            const headerRow = $("<tr>").appendTo(thead);

            // Use fetched column names
            result.columnNames.forEach((columnName) => {
                $("<th>").text(columnName).appendTo(headerRow);
            });

            const tbody = $("<tbody>").appendTo(table);
            result.data.forEach((row) => {
                const tableRow = $("<tr>").appendTo(tbody);

                // Use fetched column values
                row.forEach((value) => {
                    $("<td>").text(value).appendTo(tableRow);
                });
            });

            table.addClass("table table-striped table-bordered table-hover table-sm");
            container.append(table);
        }
    }

    // manage admin privileges
    function manageAdmin() {
        // TODO: if signed in
        if (false) {
            $(".admin-only").removeClass("admin-only");
        }
    }

    // admin options button
    $("#optionsDropdown .dropdown-item").on("click", function () {
        $("#queryInput").val($(this).data("text"));
    });

    // log fetch log data
    $.get("/data-log", function (response) {
        const logList = $("#logList");
        response.dataLog
            .slice()
            .reverse()
            .forEach(function (logEntry) {
                const listItem = $("<li class='list-group-item'>");
                listItem.append(`<p class="my-1">Timestamp: ${logEntry.timestamp}</p>`);
                listItem.append(`<p class="my-1">Query: ${logEntry.query}</p>`);
                listItem.append(`<p class="my-1">Data: ${logEntry.data}</p>`);
                logList.append(listItem);
            });
    });
});

// end of file
