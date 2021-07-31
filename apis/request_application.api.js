function insert_request_form() {
    $.ajax({
        type: "POST",
        url: baseUrlAPI + "Request_application/submit",
        data: {
            area_id: $('#water_application_area_id').val(),
            province_id: $('#water_application_province_id').val(),
            firstname: $('#water_application_firstname').val(),
            lastname: $('#water_application_lastname').val(),
            water_5_l: $('#water_application_water_5_l').val(),
            water_20_l: $('#water_application_water_20_l').val(),
            water_350_ml: $('#water_application_water_350_ml').val(),
            water_750_ml: $('#water_application_water_750_ml').val(),
            water_1500_ml: $('#water_application_water_1500_ml').val(),
            telephone: $('#water_application_telephone').val(),
            address: $('#water_application_address').val(),
        },
        dataType: "JSON",
        success: function (response) {
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'บันทึกสำเร็จ',
                showConfirmButton: false,
                timer: 1500
            })
        }
    });

}
