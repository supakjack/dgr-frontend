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
