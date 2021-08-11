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
            response.data.forEach(element => {
                $($name_id).append(new Option(element.name, element.id));
            });
        }
    });
}
