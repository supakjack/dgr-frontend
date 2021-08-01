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
                water_750_ml = Number(response.data.water_750_ml)
                water_1500_ml = Number(response.data.water_1500_ml)
                if ($('#bar_hart2')[0]) {
                    drawChart();
                }
            }

        }
    });

}
