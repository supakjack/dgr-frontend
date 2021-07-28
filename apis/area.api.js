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

function get_areas_select() {
    $.ajax({
        type: "post",
        url: baseUrlAPI + "Area/get_areas",
        dataType: "JSON",
        success: function (response) {
            response.data.forEach(element => {
                console.log(element);
                $('#add_staff_area_id').append(`
                   <option ${element.id == "1" ? "checked" : ''} value="${element.id}">${element.title}</option>
                `);
            });
        }
    });
}
