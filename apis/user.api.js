function get_admin() {
    $.ajax({
        type: "post",
        url: baseUrlAPI + "User/get_users?role=admin",
        dataType: "JSON",
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
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
            url: baseUrlAPI + "User/update_user",
            dataType: "JSON",
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
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
            url: baseUrlAPI + "User/update_user",
            dataType: "JSON",
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
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
        url: baseUrlAPI + "User/get_users/" + id + "?role=staff",
        dataType: "JSON",
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
        success: function (response) {
            console.log(response.data);
            console.log(response.data[0].username);
            $('#staff_view_username').val(response.data[0].username);
            $('#staff_view_firstname').val(response.data[0].firstname);
            $('#staff_view_lastname').val(response.data[0].lastname);
            $('#staff_view_password').val(response.data[0].password);
            $('#staff_view_status').val(response.data[0].user_status == 'active' ? 'เปิดการใช้งาน' : 'ปิดการใช้งาน');
            $('#staff_view_area').val(response.data[0].title);
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
                url: baseUrlAPI + "User/update_user/",
                data: {
                    id: id,
                    status: "delete"
                },
                dataType: "JSON",
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
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
    $.ajax({
        type: "post",
        data: {
            username: $('#add_staff_username').val(),
            password: $('#add_staff_password').val(),
            firstname: $('#add_staff_firstname').val(),
            lastname: $('#add_staff_lastname').val(),
            area_id: $('#add_staff_area_id').val(),
            create_by: $state.user.id,
            update_by: $state.user.id,
            status: $('input.form-check-input-add-staff-status:checked').val(),
            titlename: $('input.form-check-input-add-staff-titlename:checked').val()
        },
        url: baseUrlAPI + "Auth/register",
        dataType: "JSON",
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
        success: function (response) {
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'บันทึกสำเร็จ',
                showConfirmButton: false,
                timer: 1500
            })
        },
        complete: function () {
            $('#staff_table').DataTable().ajax.reload()
        }
    });
}

function edit_staff_by_id(id) {
    console.log(id);
    $.ajax({
        type: "post",
        url: baseUrlAPI + "User/get_users/" + id + "?role=staff",
        dataType: "JSON",
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
        success: function (response) {
            console.log(response.data);
            console.log(response.data[0].username);
            $('#staff_edit_username').val(response.data[0].username);
            $('#edit_staff_id').val(response.data[0].user_id);
            $('#staff_edit_firstname').val(response.data[0].firstname);
            $('#staff_edit_lastname').val(response.data[0].lastname);
            $('#staff_edit_status').val(response.data[0].status == 'active' ? 'เปิดการใช้งาน' : 'ปิดการใช้งาน');
            // $('#staff_edit_area').val(response.data[0].area[0].title);
            $('#edit_staff_area_id').val(response.data[0].area_id);
            $('#staff_edit_titlename').val(response.data[0].titlename);
            const area_id = response.data[0].area_id
            console.log(area_id);

            $.each($('.form-check-input-edit-staff'), function (indexInArray, valueOfElement) {
                if ($(valueOfElement).val() == response.data[0].titlename) {
                    $(valueOfElement).click();
                }
            });

            $.each($('.form-check-status-edit-staff'), function (indexInArray, valueOfElement) {
                if ($(valueOfElement).val() == response.data[0].status) {
                    $(valueOfElement).click();
                }
            });
            $.ajax({
                type: "post",
                url: baseUrlAPI + "Area/get_areas",
                dataType: "JSON",
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
                success: function (response) {
                    $('#edit_staff_select_area_id').children().remove();
                    response.data.forEach(element => {
                        console.log(area_id == element.id);
                        $('#edit_staff_select_area_id').append(`<option ${area_id == element.id ? 'selected' : ''} value="${element.id}">${element.title}</option>`);
                    });
                }
            });

        }
    });
}

function update_staff_by_id() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'คุณแน่ใจไหม ?',
        text: "คุณกำลังจะแก้ไข 1 รายการ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ใช่, แก้ไขเลย!',
        cancelButtonText: 'ไม่, ยกเลิก!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            console.log($('#edit_staff_select_area_id').val());
            console.log($('#edit_staff_id').val());
            console.log($('.form-check-status-edit-staff:checked').val());
            console.log($('.form-check-input-edit-staff:checked').val());
            if ($('#edit_staff_select_area_id').val()) {
                console.log("sele");
            } else {
                console.log("nosele");
            }

            $.ajax({
                type: "post",
                url: baseUrlAPI + "User/update_user/",
                data: {
                    username: $('#staff_edit_username').val(),
                    id: $('#edit_staff_id').val(),
                    firstname: $('#staff_edit_firstname').val(),
                    lastname: $('#staff_edit_lastname').val(),
                    password: $('#staff_edit_password').val(),
                    status: $('.form-check-status-edit-staff:checked').val(),
                    area_id: $('#edit_staff_select_area_id').val(),
                    titlename: $('.form-check-input-edit-staff:checked').val(),
                    update_by: $state.user.id
                },
                dataType: "JSON",
                beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
                success: function (response) {
                    swalWithBootstrapButtons.fire(
                        'บันทึก!',
                        '1 รายการของคุณถูกบันทึกแล้ว',
                        'success'
                    )
                },
                complete: function () {
                    $('#staff_table').DataTable().ajax.reload()
                    $('#staff_edit_password').val("")
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
