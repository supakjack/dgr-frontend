function update_area(target, id) {
    console.log($(target));
    console.log($(target).attr('val'));

    if ($(target).attr('val') != 'checked') {
        $(target).attr('val', 'checked')
        $.ajax({
            type: "post",
            url: baseUrlAPI + "Area/update_area",
            data: {
                open_request_status: 'open',
                id: id
            },
            dataType: "JSON",
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
            success: function (response) {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    } else {
        $(target).attr('val', 'unchecked')
        $.ajax({
            type: "post",
            url: baseUrlAPI + "Area/update_area",
            data: {
                open_request_status: 'close',
                id: id
            },
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

}

function get_areas_table() {
    $.ajax({
        type: "post",
        url: baseUrlAPI + "Area/get_areas",
        dataType: "JSON",
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
        success: function (response) {
            console.log(response);
            response.data.forEach(element => {
                $('#get_areas_table').append(`
                    <tr>
                        <th th scope="row">${element.number}</th>
                        <th>${element.title}</th>
                        <td>
                            <div class="form-check form-switch">
                                <input onchange="update_area('#flexSwitch${element.id}','${element.id}') " class="form-check-input" type="checkbox" id="flexSwitch${element.id}"
                                  val='${element.open_request_status == "open" ? "checked" : 'unchecked'}'  ${element.open_request_status == "open" ? "checked" : ''} >
                            </div>
                        </td>
                    </tr>
                `);
            });
        }
    });
}

function get_areas_select($name_id, $disbled = false) {
    $.ajax({
        type: "post",
        url: baseUrlAPI + "Area/get_areas",
        dataType: "JSON",
        success: function (response) {
            response.data.forEach(element => {
                if ($disbled) {
                    if (element.open_request_status == 'open') {
                        $($name_id).append(new Option(element.title, element.id));
                    }
                } else {
                    $($name_id).append(new Option(element.title, element.id));
                }
            });
            const checkOpen = response.data.filter(data => data.open_request_status == 'open')
            console.log(checkOpen);
            if (checkOpen.length == 0) {
                Swal.fire({
                    title: 'ปิดให้บริการ',
                    text: "ไม่มีพื้นที่เขตเปิดให้บริการร้องขอน้ำดื่ม",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'กลับสู่หน้าหลัก'
                }).then((result) => {
                    app.setLocation('#/home')
                })
            }
        },

    });
}
