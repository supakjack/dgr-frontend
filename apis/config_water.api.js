// function for login
function get_configs() {
    $.ajax({
        type: "post",
        url: baseUrlAPI + "Config_water/get_configs",
        dataType: "JSON",
        success: function (response) {
            console.log(response.data[0]);
            $('#bad_water_5_l').val(response.data[0].bad_water_5_l);
            $('#bad_water_20_l').val(response.data[0].bad_water_20_l);
            $('#bad_water_350_ml').val(response.data[0].bad_water_350_ml);
            $('#bad_water_750_ml').val(response.data[0].bad_water_750_ml);
            $('#bad_water_1500_ml').val(response.data[0].bad_water_1500_ml);
            $('#good_water_5_l').val(response.data[0].good_water_5_l);
            $('#good_water_20_l').val(response.data[0].good_water_20_l);
            $('#good_water_350_ml').val(response.data[0].good_water_350_ml);
            $('#good_water_750_ml').val(response.data[0].good_water_750_ml);
            $('#good_water_1500_ml').val(response.data[0].good_water_1500_ml);
        }
    });
}

function update_configs() {

    $.ajax({
        type: "POST",
        url: baseUrlAPI + "Config_water/update_configs",
        data: {
            bad_water_5_l: $('#bad_water_5_l').val(),
            bad_water_20_l: $('#bad_water_20_l').val(),
            bad_water_350_ml: $('#bad_water_350_ml').val(),
            bad_water_750_ml: $('#bad_water_750_ml').val(),
            bad_water_1500_ml: $('#bad_water_1500_ml').val(),
            good_water_5_l: $('#good_water_5_l').val(),
            good_water_20_l: $('#good_water_20_l').val(),
            good_water_350_ml: $('#good_water_350_ml').val(),
            good_water_750_ml: $('#good_water_750_ml').val(),
            good_water_1500_ml: $('#good_water_1500_ml').val(),
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
