let deleteId = null;
let detailId = null;

// Function to fetch data from backend
function fetchData() {
  $.ajax({
    url: "http://localhost:8080/api/motorcycles", // Ganti URL sesuai dengan alamat backend Anda
    type: "GET",
    success: function (response) {
      const motorcycles = response.data.content; // Sesuaikan dengan struktur respons API Anda
      renderData(motorcycles);
      console.log(motorcycles);
    },
    error: function (error) {
      console.log("Error fetching data", error);
    },
  });
}

// Function to render data to table
function renderData(data) {
  const tbody = $("#dataBody");
  tbody.empty();
  data.forEach((item, index) => {
    const row = `
        <tr>
            <td>${index + 1}</td>
            <td>${item.registration}</td>
            <td>${item.owner}</td>
            <td>${item.brand}</td>
            <td>${item.year}</td>
            <td>${item.size} cc</td>
            <td>${item.color}</td>
            <td>${item.fuel}</td>
            <td>
                <a href="#" class="btn-detail" data-id="${item.registration}">Detail</a> |
                <a href="./update-data.html?id=${item.registration}" class="btn-edit">Edit</a> |
                <a href="#" class="btn-delete" data-id="${item.registration}">Delete</a>
            </td>
        </tr>
    `;
    tbody.append(row);
  });
}

// Fetch data on page load
$(document).ready(function () {
  fetchData();
});

// Event listeners for buttons (Add, Search, Delete, Edit)
$(document).ready(function () {
  fetchData(); // Fetch initial data

  $("#searchBtn").on("click", function () {
    const registration = $("#registrasi").val();
    const owner = $("#nama").val();

    // Perform search with entered values
    $.ajax({
      url: `http://localhost:8080/api/motorcycles/search`,
      type: "GET",
      data: {
        registration: registration,
        owner: owner
      },
      success: function (response) {
        const motorcycles = response.data; // Sesuaikan dengan struktur respons API Anda
        renderData(motorcycles);
      },
      error: function (error) {
        console.log("Error fetching data", error);
      },
    });
  });

  // Event listeners for delete and detail buttons
  $(document).on("click", ".btn-delete", function () {
    deleteId = $(this).data("id");
    $('#deleteModal').modal('show');
  });

  $("#confirmDelete").on("click", function () {
    if (deleteId) {
      $.ajax({
        url: `http://localhost:8080/api/motorcycles/${deleteId}`,
        type: "DELETE",
        success: function () {
          $('#deleteModal').modal('hide');
//          alert("Data deleted successfully.");
          fetchData(); // Refresh data
        },
        error: function (error) {
          console.log("Error deleting data", error);
        },
      });
    }
  });

  $(document).on("click", ".btn-detail", function () {
    detailId = $(this).data("id");
    $.ajax({
      url: `http://localhost:8080/api/motorcycles/${detailId}`,
      type: "GET",
      success: function (response) {
        const motorcycle = response.data;
        const detailContent = `
          <p><strong>No Registrasi:</strong> ${motorcycle.registration}</p>
          <p><strong>Nama Pemilik:</strong> ${motorcycle.owner}</p>
          <p><strong>Merek Kendaraan:</strong> ${motorcycle.brand}</p>
          <p><strong>Tahun Pembuatan:</strong> ${motorcycle.year}</p>
          <p><strong>Kapasitas:</strong> ${motorcycle.size} cc</p>
          <p><strong>Warna:</strong> ${motorcycle.color}</p>
          <p><strong>Bahan Bakar:</strong> ${motorcycle.fuel}</p>
          <p><strong>Alamat:</strong> ${motorcycle.address}</p>
        `;
        $('#detailBody').html(detailContent);
        $('#detailModal').modal('show');
      },
      error: function (error) {
        console.log("Error fetching details", error);
      },
    });
  });
});
