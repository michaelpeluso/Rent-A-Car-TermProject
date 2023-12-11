// on page load
$(document).ready(function () {
    fetchData();
    manageAdmin();
});

// request data from oracle
async function fetchData() {
    try {
        const response = await fetch("/data"); // api route
        const data = await response.json();
        displayData(data.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

// display data from oracle
function displayData(data) {
    const container = $("#data-container");
    container.html("");
    container.addClass("d-flex justify-content-center");

    if (data.length === 0) {
        container.append("<p>No data available</p>");
    } else {
        const table = $("<table>");

        const thead = $("<thead>").appendTo(table);
        const headerRow = $("<tr>").appendTo(thead);
        Object.keys(data[0]).forEach((key) => {
            $("<th>").text(key).appendTo(headerRow);
        });

        const tbody = $("<tbody>").appendTo(table);
        data.forEach((row) => {
            const tableRow = $("<tr>").appendTo(tbody);
            Object.values(row).forEach((value) => {
                $("<td>").text(value).appendTo(tableRow);
            });
        });

        table.addClass("table table-striped table-bordered table-hover table-sm w-75 m-3"); //table-responsive-sm
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
