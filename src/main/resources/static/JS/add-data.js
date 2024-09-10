// ADD DATA HTML
$(document).ready(function() {
        // Event listener untuk mengecek input tahun
        $('#year').on('input', function() {
            const yearInput = $(this).val();
            if (yearInput.length > 4) {
                toastr.error('Tahun Pembuatan tidak boleh lebih dari 4 digit!');
                $(this).val(yearInput.slice(0, 4));
            }
        });

        // Handle form submit
        $('#vehicleForm').on('submit', function(e) {
            e.preventDefault();

            // Get form data
            const vehicleData = {
                registration: $('#registration').val(),
                year: $('#year').val(),
                owner: $('#owner').val(),
                size: $('#size').val(),
                brand: $('#brand').val(),
                color: $('#color').val(),
                fuel: $('#fuel').val(),
                address: $('#address').val()
            };

            // Check if all fields are filled
            if (!vehicleData.registration) {
                toastr.error('No. Registrasi Kendaraan tidak boleh kosong!');
                return;
            }
            if (!vehicleData.year) {
                toastr.error('Tahun Pembuatan tidak boleh kosong!');
                return;
            }
            if (!vehicleData.owner) {
                toastr.error('Nama Pemilik tidak boleh kosong!');
                return;
            }
            if (!vehicleData.size) {
                toastr.error('Kapasitas Silinder tidak boleh kosong!');
                return;
            }
            if (!vehicleData.brand) {
                toastr.error('Merk Kendaraan tidak boleh kosong!');
                return;
            }
            if (!vehicleData.color) {
                toastr.error('Warna Kendaraan tidak boleh kosong!');
                return;
            }
            if (!vehicleData.fuel) {
                toastr.error('Bahan Bakar tidak boleh kosong!');
                return;
            }
            if (!vehicleData.address) {
                toastr.error('Alamat Pemilik Kendaraan tidak boleh kosong!');
                return;
            }

            // Send data to backend using AJAX
            $.ajax({
                url: 'http://localhost:8080/api/motorcycles',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(vehicleData),
                success: function(response) {
                    toastr.success('Data berhasil ditambahkan!');
                    window.location.href = 'index.html';
                },
                error: function(error) {
                    console.log(error.responseJSON);
                    if (error.responseJSON && error.responseJSON.errors) {
                        toastr.error(error.responseJSON.errors);
                    } else {
                        console.error('Error:', error);
                        toastr.error('Terjadi kesalahan saat menambahkan data.');
                    }
                }
            });
        });
    });