function get_province_select($name_id) {
    $.ajax({
        type: "post",
        url: baseUrlAPI + "Province/get_provinces",
        dataType: "JSON",
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
        success: function (response) {
            response.data.forEach(element => {
                $($name_id).append(new Option(element.name, element.id));
            });
        }
    });
}
