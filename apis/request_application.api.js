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
                title: 'บันทึกสำเร็จ ,กำลังสร้างการติดตาม',
                showConfirmButton: false,
                timer: 1500
            }).then((result) => {
                app.setLocation('#/tracking?reg_id=' + response.data.reg_id)
            })
        }
    });

}

function get_request_form_for_tracking_by_id(id) {
    $.ajax({
        type: "POST",
        url: baseUrlAPI + "Request_application/get_request_form_for_tracking_by_id",
        data: {
            id: id,
        },
        dataType: "JSON",
        success: function (response) {
            console.log(response.data);
            $('#address').text(response.data.address)
            $('#area_id').text(response.data.area_id)

            date = response.data.create_date.substr(0, 10)
            date2 = new Date(...date.split("-"))
            result2date = date2.toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })

            $('#create_date').text(result2date)

            $('#firstname').text(response.data.firstname)
            $('#id').text(response.data.id)
            $('#lastname').text(response.data.lastname)
            $('#name').text(response.data.name)
            $('#province').text(response.data.province)
            $('#status').text(response.data.status == 'unapprove' ? 'รออนุมัติ' : response.data.status == 'approve' ? 'อนุมัติ' : 'คำข้อถูกลบ')
            $('#telephone').text(response.data.telephone)
            $('#title').text(response.data.title)
            $('#water_5_l').text(response.data.water_5_l)
            $('#water_20_l').text(response.data.water_20_l)
            $('#water_350_ml').text(response.data.water_350_ml)
            $('#water_750_ml').text(response.data.water_750_ml)
            $('#water_1500_ml').text(response.data.water_1500_ml)
        }
    });

}
