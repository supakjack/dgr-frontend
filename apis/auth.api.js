function login($username, $password) {
    $.ajax({
        type: "post",
        url: baseUrlAPI + "Auth/login",
        data: {
            username: $username,
            password: $password,
        },
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            if (response.data != "Not found") {
                console.log("เจอ");
                $state.user.username = response.data.username
                $state.user.token = response.data.token
                $state.user.role = response.data.role
                $state.user.firstname = response.data.firstname
                $state.user.id = response.data.id
                $state.user.lastname = response.data.lastname
                localStorage.setItem("username", $state.user.username)
                localStorage.setItem("token", $state.user.token)
                localStorage.setItem("role", $state.user.role)
                localStorage.setItem("id", $state.user.id)
                console.log(localStorage.getItem("id"));
                console.log(localStorage.getItem("token"));
                console.log(localStorage.getItem("username"));
                console.log(localStorage.getItem("role"));
                console.log($state);
                if ($state.user.role == 'admin') {
                    app.setLocation('#/config-system');
                } else {
                    $.ajax({
                        type: "post",
                        url: baseUrlAPI + "User/get_users/" + $state.user.id,
                        dataType: "JSON",
                        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
                        success: function (response) {
                            console.log("response.data[0]");
                            console.log(response.data[0]);
                            $state.user.username = response.data ? response.data[0].username : null
                            $state.user.role = response.data ? response.data[0].role : null
                            $state.user.firstname = response.data ? response.data[0].firstname : null
                            $state.user.id = response.data ? response.data[0].id : null
                            $state.user.lastname = response.data ? response.data[0].lastname : null
                            if (response.data[0].area_id && response.data[0].title) {
                                $state.user.area_id = response.data[0].area_id
                                $state.user.title = response.data[0].title
                                app.setLocation('#/staff-application');

                            } else {
                                console.log("การุณาลองใหม่");
                                Swal.fire({
                                    heightAuto: false,
                                    icon: 'error',
                                    title: 'การุณาลองใหม่',
                                    text: 'รหัสผ่านหรือผู้ใช้งานไม่ถูกต้อง',
                                    confirmButtonText: 'ตกลง',
                                })
                            }
                        }
                    });
                }
            } else {
                console.log("การุณาลองใหม่");
                Swal.fire({
                    heightAuto: false,
                    icon: 'error',
                    title: 'การุณาลองใหม่',
                    text: 'รหัสผ่านหรือผู้ใช้งานไม่ถูกต้อง',
                    confirmButtonText: 'ตกลง',
                })
            }
        }
    });

}
