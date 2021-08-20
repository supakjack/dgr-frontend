function insert_request_form_people() {

    if (
        $('#water_application_address').val() &&
        $('#water_application_telephone').val() &&
        $('#water_application_firstname').val() &&
        $('#water_application_lastname').val() &&
        (
            (($('#water_application_area_id').val() == '0') && ($('#water_application_province_id').val() == '-1')) ||
            ($('#water_application_province_id').val() != '-1')
        ) &&
        $('#water_application_area_id').val() &&
        validatePhone($('#water_application_telephone').val()) &&
        (
            (Number($('#water_application_water_else_l').val()) +
                Number($('#water_application_water_5_l').val()) +
                Number($('#water_application_water_20_l').val()) +
                Number($('#water_application_water_350_ml').val()) +
                Number($('#water_application_water_500_ml').val()) +
                Number($('#water_application_water_750_ml').val()) +
                Number($('#water_application_water_1500_ml').val())) != 0

        )
    ) {

        $.ajax({
            type: "POST",
            url: baseUrlAPI + "Request_application/submit",
            data: {
                area_id: $('#water_application_area_id').val(),
                province_id: $('#water_application_province_id').val(),
                firstname: $('#water_application_firstname').val(),
                lastname: $('#water_application_lastname').val(),
                water_else_l: $('#water_application_water_else_l').val(),
                water_5_l: $('#water_application_water_5_l').val(),
                water_20_l: $('#water_application_water_20_l').val(),
                water_350_ml: $('#water_application_water_350_ml').val(),
                water_500_ml: $('#water_application_water_500_ml').val(),
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
                    app.setLocation('#/form-track?reg_id=' + response.data.reg_id)
                })
            }
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'โปรดตรวจสอบใหม่ ข้อมูลไม่ถูกต้อง',
            showConfirmButton: false,
            timer: 1500
        })

    }




}

function insert_request_form_staff() {

    if (
        $('#water_application_address').val() &&
        $('#water_application_organization_name').val() &&
        $('#water_application_telephone').val() &&
        $('#water_application_firstname').val() &&
        $('#water_application_lastname').val() &&
        validatePhone($('#water_application_telephone').val()) &&
        (
            ($('#water_application_area_id').val() == '0' && ($('#water_application_province_id').val() == '-1')) ||
            ($('#water_application_province_id').val() != '-1')
        ) &&
        (
            (Number($('#water_application_water_else_l').val()) +
                Number($('#water_application_water_5_l').val()) +
                Number($('#water_application_water_20_l').val()) +
                Number($('#water_application_water_350_ml').val()) +
                Number($('#water_application_water_500_ml').val()) +
                Number($('#water_application_water_750_ml').val()) +
                Number($('#water_application_water_1500_ml').val())) != 0

        )
    ) {

        $.ajax({
            type: "POST",
            url: baseUrlAPI + "Request_application/submit",
            data: {
                area_id: "0",
                province_id: "1",
                firstname: $('#water_application_firstname').val(),
                organization_name: $('#water_application_organization_name').val(),
                description: $('#water_application_description').val(),
                lastname: $('#water_application_lastname').val(),
                water_else_l: $('#water_application_water_else_l').val(),
                water_5_l: $('#water_application_water_5_l').val(),
                water_20_l: $('#water_application_water_20_l').val(),
                water_350_ml: $('#water_application_water_350_ml').val(),
                water_500_ml: $('#water_application_water_500_ml').val(),
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
                    app.setLocation('#/form-track?reg_id=' + response.data.reg_id)
                })
            }
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'โปรดตรวจสอบใหม่ ข้อมูลไม่ถูกต้อง',
            showConfirmButton: false,
            timer: 1500
        })

    }

}

function get_request_form_for_tracking_by_id(id) {
    console.log(id);
    console.log(id);
    console.log(id);
    console.log(id);
    console.log(id);
    console.log(id);
    $.ajax({
        type: "POST",
        url: baseUrlAPI + "Request_application/get_request_form_for_tracking_by_id",
        data: {
            id: id,
        },
        dataType: "JSON",
        success: function (response) {
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
            $('#id-track').text(response.data.id);
            $('#id').text(response.data.id)
            $('#lastname').text(response.data.lastname)
            $('#name').text(response.data.name)
            $('#province').text(response.data.province)
            $('#status').text(response.data.system_status == 'delete' ? 'คำร้องขอถูกลบ' : response.data.status == 'approve' ? 'อนุมัติ' : 'รออนุมัติ')
            $('#telephone').text(response.data.telephone)
            $('#title').text(response.data.title)
            $('#organization_name').text(response.data.organization_name)
            $('#description').text(response.data.description)

            if (response.data.id) {
                $('#show-data').show();
                $('#show-notfound').hide();
            }

            if (response.data.organization_name) {
                $('#row-staff').show();
            } else {
                $('#row-people').show();
            }

            $('#water_5_l').text(response.data.water_5_l)
            if (Number(response.data.water_5_l) != 0) {
                sum_water++
                $('.5l').show()
                console.log('response.data.water_5_l != 0');
            }
            $('#water_20_l').text(response.data.water_20_l)
            if (Number(response.data.water_20_l) != 0) {
                sum_water++

                $('.20l').show()
            }
            $('#water_350_ml').text(response.data.water_350_ml)
            if (Number(response.data.water_350_ml) != 0) {
                $('.350ml').show()
            }
            $('#water_500_ml').text(response.data.water_500_ml)
            if (Number(response.data.water_500_ml) != 0) {
                sum_water++

                $('.500ml').show()
            }
            $('#water_750_ml').text(response.data.water_750_ml)
            if (Number(response.data.water_750_ml) != 0) {
                sum_water++

                $('.750ml').show()
            }
            $('#water_1500_ml').text(response.data.water_1500_ml)
            if (Number(response.data.water_1500_ml) != 0) {
                sum_water++

                $('.1500ml').show()
            }
            $('#water_else_l').text(response.data.water_else_l)
            if (Number(response.data.water_else_l) != 0) {
                sum_water++

                $('.else_l').show()
            }
            $('#water_500_ml').text(response.data.water_500_ml)
            if (Number(response.data.water_500_ml) != 0) {
                sum_water++

                $('.500ml').show()
            }

            $('#sum_water').text(sum_water);
        }
    });

}


function get_request_form_by_id(id) {
    $('#row-staff').hide();
    $.ajax({
        type: "post",
        url: baseUrlAPI + "Request_application/get_forms?area_id=" + $state.user.area_id + "&id=" + id,
        dataType: "JSON",
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
        success: function (response) {
            console.log("Request_application/get_forms");
            console.log(response.data);
            console.log(baseUrlAPI + "Request_application/get_forms?area_id=" + $state.user.area_id + "&id=" + id);
            $('#address').val(response.data[0].address)
            $('#create_date').val(response.data[0].create_date)
            $('#name').val(response.data[0].name)
            $('#province').val(response.data[0].province ? response.data[0].province : 'จังหวัดกรุงเทพมหานคร')
            $('#name_area').val($state.user.title)
            $('#status').val(response.data[0].status == 'unapprove' ? 'รออนุมัติ' : 'อนุมัติ')
            $('#telephone').val(response.data[0].telephone)
            $('#water_5_l').val(response.data[0].water_5_l)
            $('#water_20_l').val(response.data[0].water_20_l)
            $('#water_350_ml').val(response.data[0].water_350_ml)
            $('#water_750_ml').val(response.data[0].water_750_ml)
            $('#water_500_ml').val(response.data[0].water_500_ml)
            $('#water_else_l').val(response.data[0].water_else_l)
            $('#organization_name').val(response.data[0].organization_name)
            if (response.data[0].organization_name) {
                $('#row-staff').show();
            }
            $('#description').val(response.data[0].description)
            $('#water_1500_ml').val(response.data[0].water_1500_ml)
        }
    });
}


function approve_request_form_by_id(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'คุณแน่ใจไหม ?',
        text: "คุณกำลังจะอนุมัติ 1 รายการ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ใช่, อนุมัติเลย!',
        cancelButtonText: 'ไม่, ยกเลิก!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                type: "post",
                url: baseUrlAPI + "Request_application/approve_request_form_by_id?id=" + id,
                dataType: "JSON",
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
                success: function (response) {
                    console.log("Request_application/approve_request_form_by_id");
                    console.log(response.data);

                }
                ,
                complete: function () {
                    $('#table_water_application_management').DataTable().ajax.reload()
                }
            });

            swalWithBootstrapButtons.fire(
                'อนุมัติ!',
                '1 รายการของคุณถูกอนุมัติแล้ว',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'ยกเลิก',
                '1 รายการของคุณไม่ถูกอนุมัติ',
                'error'
            )
        }
    })
}


function delete_request_form_by_id(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'คุณแน่ใจไหม ?',
        text: "คุณกำลังจะลบ 1 รายการ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ใช่, ลบเลย!',
        cancelButtonText: 'ไม่, ยกเลิก!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                type: "post",
                url: baseUrlAPI + "Request_application/delete_request_form_by_id?id=" + id,
                dataType: "JSON",
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
                success: function (response) {
                    console.log("Request_application/delete_request_form_by_id");
                    console.log(response.data);

                }
                ,
                complete: function () {
                    $('#table_water_application_management').DataTable().ajax.reload()
                }
            });

            swalWithBootstrapButtons.fire(
                'ลบ!',
                '1 รายการของคุณถูกลบแล้ว',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'ยกเลิก',
                '1 รายการของคุณไม่ถูกลบ',
                'error'
            )
        }
    })
}

