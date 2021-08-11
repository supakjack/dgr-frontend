function get_by_date() {
    console.log('create_date: ' + $('.selector_date').val());
    $.ajax({
        type: "POST",
        url: baseUrlAPI + "Input_application/get_by_date",
        dataType: "JSON",
        data: {
            create_by: $state.user.id,
            create_date: $('.selector_date').val(),
        },
        success: function (response) {
            console.log(response);
            console.log(response.data);

            if (!response.data.id) {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })
                swalWithBootstrapButtons.fire(
                    {
                        title: 'ไม่พบ',
                        text: "ไม่พบข้อมูลในวันที่ดังกล่าว",
                        icon: 'error',
                        confirmButtonText: 'ตกลง',
                    }
                )
            } else {
                date2 = new Date(...$('.selector_date').val().split("-"))
                result2date = date2.toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
                $('.showDate').text(result2date)
                water_5_l = Number(response.data.water_5_l)
                water_20_l = Number(response.data.water_20_l)
                water_350_ml = Number(response.data.water_350_ml)
                water_500_ml = Number(response.data.water_500_ml)
                water_750_ml = Number(response.data.water_750_ml)
                water_1500_ml = Number(response.data.water_1500_ml)
                water_else_l = Number(response.data.water_else_l)
                water_input_id = response.data.id
                config_water_id = response.data.config_water_id
                $('#water_input_id').val(water_input_id)
                $('#water_input_20_l').val(water_20_l)
                $('#water_input_350_ml').val(water_350_ml)
                $('#water_input_500_ml').val(water_500_ml)
                $('#water_input_else_l').val(water_else_l)
                $('#water_input_750_ml').val(water_750_ml)
                $('#water_input_1500_ml').val(water_1500_ml)
                $('#water_input_5_l').val(water_5_l)
                if ($('#bar_hart2')[0]) {
                    drawChart();
                }

            }

        }
    });

}


function edit_input_form() {
    $.ajax({
        type: "post",
        url: baseUrlAPI + "Config_water/get_configs/" + config_water_id,
        dataType: "JSON",
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
        success: function (response) {
            console.log("Config_water/get_configs/" + config_water_id);
            console.log(response.data);
            bad_water_5_l = response.data.bad_water_5_l
            bad_water_20_l = response.data.bad_water_20_l
            bad_water_350_ml = response.data.bad_water_350_ml
            bad_water_750_ml = response.data.bad_water_750_ml
            bad_water_1500_ml = response.data.bad_water_1500_ml
            bad_water_500_ml = response.data.bad_water_500_ml
            bad_water_else_l = response.data.bad_water_else_l
            good_water_5_l = response.data.good_water_5_l
            good_water_20_l = response.data.good_water_20_l
            good_water_350_ml = response.data.good_water_350_ml
            good_water_750_ml = response.data.good_water_750_ml
            good_water_1500_ml = response.data.good_water_1500_ml
            good_water_500_ml = response.data.good_water_500_ml
            good_water_else_l = response.data.good_water_else_l
            $('#good_water_5_l').val(Number(good_water_5_l) * Number(water_5_l))
            $('#bad_water_5_l').val(Number(bad_water_5_l) * Number(water_5_l))
            $('#good_water_20_l').val(Number(good_water_20_l) * Number(water_20_l))
            $('#bad_water_20_l').val(Number(bad_water_20_l) * Number(water_20_l))
            $('#good_water_1500_ml').val(Number(good_water_1500_ml) * Number(water_1500_ml))
            $('#bad_water_1500_ml').val(Number(bad_water_1500_ml) * Number(water_1500_ml))
            $('#good_water_750_ml').val(Number(good_water_750_ml) * Number(water_750_ml))
            $('#bad_water_750_ml').val(Number(bad_water_750_ml) * Number(water_750_ml))
            $('#good_water_350_ml').val(Number(good_water_350_ml) * Number(water_350_ml))
            $('#bad_water_350_ml').val(Number(bad_water_350_ml) * Number(water_350_ml))
            $('#good_water_500_ml').val(Number(good_water_500_ml) * Number(water_500_ml))
            $('#bad_water_500_ml').val(Number(bad_water_500_ml) * Number(water_500_ml))
            $('#good_water_else_l').val(Number(good_water_else_l) * Number(water_else_l))
            $('#bad_water_else_l').val(Number(bad_water_else_l) * Number(water_else_l))
        }
    });
}


function submit_edit_input_form() {
    $.ajax({
        type: "post",
        url: baseUrlAPI + "Input_application/submit_edit_input_form",
        data: {
            update_date: new Date().toISOString().substr(0, 10),
            update_by: $state.user.id,
            description: $('#water_input_description').val(),
            config_water_id: config_water_id,
            water_input_id: water_input_id,
            water_350_ml: water_350_ml,
            water_750_ml: water_750_ml,
            water_1500_ml: water_1500_ml,
            water_5_l: water_5_l,
            water_20_l: water_20_l,
            water_else_l: water_else_l,
            water_500_ml: water_500_ml,
        },
        dataType: "JSON",
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
        success: function (response) {
            console.log("Input_application/submit_edit_input_form");
            console.log(response.data);
            get_by_date()
            Swal.fire({
                icon: 'success',
                title: 'บันทึกสำเร็จ',
                showConfirmButton: false,
                timer: 1500
            })
        }
    });
}


function get_configs_for_add() {
    $.ajax({
        type: "post",
        url: baseUrlAPI + "Config_water/get_configs",
        dataType: "JSON",
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
        success: function (response) {
            console.log(response.data);
            config_water_id = response.data.id
            bad_water_5_l = response.data.bad_water_5_l
            bad_water_20_l = response.data.bad_water_20_l
            bad_water_350_ml = response.data.bad_water_350_ml
            bad_water_750_ml = response.data.bad_water_750_ml
            bad_water_1500_ml = response.data.bad_water_1500_ml
            good_water_5_l = response.data.good_water_5_l
            good_water_20_l = response.data.good_water_20_l
            good_water_350_ml = response.data.good_water_350_ml
            good_water_750_ml = response.data.good_water_750_ml
            good_water_1500_ml = response.data.good_water_1500_ml
            good_water_else_l = response.data.good_water_else_l
            bad_water_else_l = response.data.bad_water_else_l
            good_water_500_ml = response.data.good_water_500_ml
            bad_water_500_ml = response.data.bad_water_500_ml
        }
    });
}


function submit_add_input_form() {
    $.ajax({
        type: "post",
        url: baseUrlAPI + "Input_application/submit_add_input_form",
        data: {
            create_by: $state.user.id,
            create_date: $('.selector_date').val(),
            update_by: $state.user.id,
            area_id: $state.user.area_id,
            description: $('#water_input_description').val(),
            config_water_id: config_water_id,
            water_350_ml: water_350_ml,
            water_500_ml: water_500_ml,
            water_750_ml: water_750_ml,
            water_1500_ml: water_1500_ml,
            water_5_l: water_5_l,
            water_20_l: water_20_l,
            water_else_l: water_else_l
        },
        dataType: "JSON",
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
        success: function (response) {
            console.log("Input_application/submit_add_input_form");
            console.log(response.data);
            if (response.data.code == '409') {
                Swal.fire({
                    icon: 'error',
                    title: 'มีวันที่ดังกล่าวอยู่แล้ว',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

        }
    });
}


function get_summary_by_date() {
    line_data = []
    $.ajax({
        type: "POST",
        url: baseUrlAPI + "Input_application/get_summary_by_date",
        dataType: "JSON",
        data: {
            create_date: $('.selector_date').val(),
            area_id: $('#area_id_select').val()
        },
        success: function (response) {
            console.log(response);
            console.log(response.data);
            $('#dashboard_sum_water_350_ml').text(response.data.dashboard.sum_water_350_ml ? response.data.dashboard.sum_water_350_ml : 0)
            $('#dashboard_sum_water_750_ml').text(response.data.dashboard.sum_water_750_ml ? response.data.dashboard.sum_water_750_ml : 0)
            $('#dashboard_sum_water_1500_ml').text(response.data.dashboard.sum_water_1500_ml ? response.data.dashboard.sum_water_1500_ml : 0)
            $('#dashboard_sum_water_5_l').text(response.data.dashboard.sum_water_5_l ? response.data.dashboard.sum_water_5_l : 0)
            $('#dashboard_sum_water_20_l').text(response.data.dashboard.sum_water_20_l ? response.data.dashboard.sum_water_20_l : 0)
            $('#dashboard_sum_all_water').text(
                Number(response.data.dashboard.sum_water_350_ml ? response.data.dashboard.sum_water_350_ml : 0) +
                Number(response.data.dashboard.sum_water_750_ml ? response.data.dashboard.sum_water_750_ml : 0) +
                Number(response.data.dashboard.sum_water_1500_ml ? response.data.dashboard.sum_water_1500_ml : 0) +
                Number(response.data.dashboard.sum_water_5_l ? response.data.dashboard.sum_water_5_l : 0) +
                Number(response.data.dashboard.sum_water_20_l ? response.data.dashboard.sum_water_20_l : 0)
            )
            dashboard_sum_water_350_ml = Number(response.data.dashboard.sum_water_350_ml ? response.data.dashboard.sum_water_350_ml : 0)
            dashboard_sum_water_750_ml = Number(response.data.dashboard.sum_water_750_ml ? response.data.dashboard.sum_water_750_ml : 0)
            dashboard_sum_water_1500_ml = Number(response.data.dashboard.sum_water_1500_ml ? response.data.dashboard.sum_water_1500_ml : 0)
            dashboard_sum_water_5_l = Number(response.data.dashboard.sum_water_5_l ? response.data.dashboard.sum_water_5_l : 0)
            dashboard_sum_water_20_l = Number(response.data.dashboard.sum_water_20_l ? response.data.dashboard.sum_water_20_l : 0)
            dashboard_sum_all_water =
                Number(response.data.dashboard.sum_water_350_ml ? response.data.dashboard.sum_water_350_ml : 0) +
                Number(response.data.dashboard.sum_water_750_ml ? response.data.dashboard.sum_water_750_ml : 0) +
                Number(response.data.dashboard.sum_water_1500_ml ? response.data.dashboard.sum_water_1500_ml : 0) +
                Number(response.data.dashboard.sum_water_5_l ? response.data.dashboard.sum_water_5_l : 0) +
                Number(response.data.dashboard.sum_water_20_l ? response.data.dashboard.sum_water_20_l : 0)

            response.data.quality.map((row, index) => {
                const good_water_5_l = Number(row.water_5_l) * Number(row.good_water_5_l)
                const bad_water_5_l = Number(row.water_5_l) * Number(row.bad_water_5_l)
                const bad_water_20_l = Number(row.water_20_l) * Number(row.bad_water_20_l)
                const good_water_20_l = Number(row.water_20_l) * Number(row.good_water_20_l)
                const bad_water_350_ml = Number(row.water_350_ml) * Number(row.bad_water_350_ml)
                const good_water_350_ml = Number(row.water_350_ml) * Number(row.good_water_350_ml)
                const bad_water_750_ml = Number(row.water_750_ml) * Number(row.bad_water_750_ml)
                const good_water_750_ml = Number(row.water_750_ml) * Number(row.good_water_750_ml)
                const bad_water_1500_ml = Number(row.water_1500_ml) * Number(row.bad_water_1500_ml)
                const good_water_1500_ml = Number(row.water_1500_ml) * Number(row.good_water_1500_ml)
                const good_water =
                    good_water_5_l +
                    good_water_20_l +
                    good_water_350_ml +
                    good_water_750_ml +
                    good_water_1500_ml
                const bad_water =
                    bad_water_5_l +
                    bad_water_20_l +
                    bad_water_350_ml +
                    bad_water_750_ml +
                    bad_water_1500_ml
                console.log(row);
                line_data.push([row.create_date, Number(good_water), Number(bad_water)])
            })
            console.log(line_data);
            drawChart()
        }
    });

}