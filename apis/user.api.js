function get_admin() {
    $.ajax({
        type: "post",
        url: baseUrlAPI + "User/get_admin",
        dataType: "JSON",
        success: function (response) {
            console.log(response.data);
            $('#admin_id').val(response.data[0].id);
            $('#admin_username').val(response.data[0].username);
            $('#admin_firstname').val(response.data[0].firstname);
            $('#admin_lastname').val(response.data[0].lastname);
            $.each($('.form-check-input-admin'), function (indexInArray, valueOfElement) {
                if ($(valueOfElement).val() == response.data[0].titlename) {
                    $(valueOfElement).click();
                }
            });
        }
    });
}

function update_admin() {
    if ($('#admin_password').val()) {
        $.ajax({
            type: "post",
            data: {
                id: $('#admin_id').val(),
                titlename: $('input.form-check-input-admin:checked').val(),
                username: $('#admin_username').val(),
                password: $('#admin_password').val(),
                firstname: $('#admin_firstname').val(),
                lastname: $('#admin_lastname').val(),
            },
            url: baseUrlAPI + "User/update_admin",
            dataType: "JSON",
            success: function (response) {
                console.log(response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                })
                get_admin()
            }
        });
    } else {
        $.ajax({
            type: "post",
            data: {
                id: $('#admin_id').val(),
                titlename: $('input.form-check-input-admin:checked').val(),
                username: $('#admin_username').val(),
                firstname: $('#admin_firstname').val(),
                lastname: $('#admin_lastname').val(),
            },
            url: baseUrlAPI + "User/update_admin",
            dataType: "JSON",
            success: function (response) {
                console.log(response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                })
                get_admin()
            }
        });
    }

}

function get_staff_by_id(id) {
    console.log(id);
    $.ajax({
        type: "post",
        url: baseUrlAPI + "User/get_staffs/" + id,
        dataType: "JSON",
        success: function (response) {
            console.log(response.data);
            console.log(response.data[0].username);
            $('#staff_view_username').val(response.data[0].username);
            $('#staff_view_firstname').val(response.data[0].firstname);
            $('#staff_view_lastname').val(response.data[0].lastname);
            $('#staff_view_password').val(response.data[0].password);
            $('#staff_view_status').val(response.data[0].status == 'active' ? 'เปิดการใช้งาน' : 'ปิดการใช้งาน');
            $('#staff_view_area').val(response.data[0].area[0].title);
            $('#staff_view_titlename').val(response.data[0].titlename);

        }
    });
}

function delete_staff_by_id(id) {
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
                url: baseUrlAPI + "User/update_staff/",
                data: {
                    id: id,
                    status: "delete"
                },
                dataType: "JSON",
                success: function (response) {
                    swalWithBootstrapButtons.fire(
                        'ลบ!',
                        '1 รายการของคุณถูกลบแล้ว',
                        'success'
                    )
                },
                complete: function () {
                    $('#staff_table').DataTable().ajax.reload()
                }
            })

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

function add_staff() {
    console.log($(add_staff_username).val())
    console.log($(add_staff_password).val())
    console.log($(add_staff_firstname).val())
    console.log($(add_staff_lastname).val())
    console.log($(add_staff_area_id).val())
    console.log($('input.form-check-input-add-staff-status:checked').val())
    console.log($('input.form-check-input-add-staff-titlename:checked').val())
}