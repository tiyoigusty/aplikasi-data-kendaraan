// UPDATE DATA HTML

$(document).ready(function() {
      // Event listener untuk mengecek input tahun
      $('#year').on('input', function() {
          const yearInput = $(this).val();
          if (yearInput.length > 4) {
              toastr.error('Tahun Pembuatan tidak boleh lebih dari 4 digit!');
              $(this).val(yearInput.slice(0, 4));
          }
      });

      // Get the vehicle ID from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');

      if (id) {
          // Fetch vehicle data by ID using AJAX
          $.ajax({
              url: `http://localhost:8080/api/motorcycles/${id}`,
              method: 'GET',
              success: function(data) {
                  const vehicle = data.data;
                  // Populate form with the data
                  $('#registration').val(vehicle.registration);
                  $('#year').val(vehicle.year);
                  $('#owner').val(vehicle.owner);
                  $('#size').val(vehicle.size);
                  $('#brand').val(vehicle.brand);
                  $('#color').val(vehicle.color);
                  $('#fuel').val(vehicle.fuel);
                  $('#address').val(vehicle.address);
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.error('Error fetching vehicle data:', textStatus, errorThrown);
                  toastr.error('Terjadi kesalahan saat mengambil data kendaraan.');
              }
          });
      }

      // Handle form submit for updating vehicle data
      $('#vehicleForm').on('submit', function(e) {
          e.preventDefault();

          // Get updated form data
          const updatedVehicleData = {
              registration: $('#registration').val(),
              year: $('#year').val(),
              owner: $('#owner').val(),
              size: $('#size').val(),
              brand: $('#brand').val(),
              color: $('#color').val(),
              fuel: $('#fuel').val(),
              address: $('#address').val()
          };

          // Send updated data to backend using AJAX
          $.ajax({
              url: `http://localhost:8080/api/motorcycles/${id}`,
              method: 'PATCH',
              contentType: 'application/json',
              data: JSON.stringify(updatedVehicleData),
              success: function(data) {
                  toastr.success('Data berhasil diubah!');
                  window.location.href = 'index.html';
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.error('Error updating data:', textStatus, errorThrown);
                  toastr.error('Terjadi kesalahan saat mengubah data.');
              }
          });
      });
  });