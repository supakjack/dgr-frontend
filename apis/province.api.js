function get_province_select($name_id) {
    $.ajax({
        type: "post",
        url: baseUrlAPI + "Province/get_provinces",
        data: {
            area_id: $(water_application_area_id).val()
        },
        dataType: "JSON",
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
        success: function (response) {
            console.log($(water_application_area_id).val());
            $($name_id + ' option').remove();
            if ($('#water_application_area_id').val() == '0') {
                $($name_id).append(new Option("จังหวัดกรุงเทพมหานคร", "0"));
            } else {
                response.data.forEach(element => {
                    $($name_id).append(new Option(element.name, element.id));
                });
            }

        }
    });
}
