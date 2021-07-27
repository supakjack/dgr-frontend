const app = Sammy('#app')
const baseUrlAPI = 'http://localhost/www/dgr-backend/'
$('#header_admin').hide();
$('#header_public').hide();
$('#header_staff').hide();

$state.user.id = localStorage.getItem("id")
console.log(localStorage.getItem("id"));
if ($state.user.id) {
    $.ajax({
        type: "post",
        url: baseUrlAPI + "User/get_users/" + $state.user.id,
        dataType: "JSON",
        success: function (response) {
            console.log(response.data[0]);
            $state.user.username = response.data[0].username
            $state.user.role = response.data[0].role
            $state.user.firstname = response.data[0].firstname
            $state.user.id = response.data[0].id
            $state.user.lastname = response.data[0].lastname
            if (response.data[0].permission) {
                $state.user.permission = response.data[0].permission[0]
            }
            if (response.data[0].area) {
                $state.user.area = response.data[0].area[0]
            }
            localStorage.setItem("username", $state.user.username)
            localStorage.setItem("token", $state.user.token)
            localStorage.setItem("role", $state.user.role)
            localStorage.setItem("id", $state.user.id)

            // sammy.js

            console.log($state.user);

            // manage page route
            $.each(router, function (indexInArray, valueOfElement) {
                const { path, file, role } = valueOfElement
                $state.path = path
                app.get('#/' + path, function () {
                    $state.loading = loadingOverlay().activate();
                    if ($state.user.role == 'admin' && path != 'home') {
                        console.log("admin come in");
                        if (path == 'auth') {
                            window.location = '#/config-system'
                            console.log("admin come to auth");
                            loadingOverlay().cancel($state.loading);
                            return
                        } else if (role != 'admin' && role != 'public') {
                            console.log("not admin permission");
                            window.location = '#/home'
                            console.log("go to admin home");
                            loadingOverlay().cancel($state.loading);
                            return
                        }
                        $('#header_public').hide();
                        $('#header_staff').hide();
                        $('#header_admin').show();
                    } else if ($state.user.role == 'staff' && path != 'home') {
                        console.log("staff come in");
                        if (path == 'auth') {
                            window.location = '#/library'
                            console.log("staff come to auth");
                            loadingOverlay().cancel($state.loading);
                            return
                        } else if (role != 'staff' && role != 'public') {
                            console.log("not staff permission");
                            window.location = '#/library'
                            console.log("go to staff home");
                            loadingOverlay().cancel($state.loading);
                            return
                        }
                        $('#header_public').hide();
                        $('#header_staff').show();
                        $('#header_admin').hide();
                    } else if (role != 'public') {
                        console.log(role);
                        console.log(role != 'public');
                        console.log("not public path");
                        if (role != $state.user.role) {
                            console.log($state.user.role);
                            window.location = '#/home'
                            console.log("no permission");
                            loadingOverlay().cancel($state.loading);
                            return
                        }
                    }
                    else if (path != 'home') {
                        $('#header_public').show();
                        $('#header_staff').hide();
                        $('#header_admin').hide();
                    } else {
                        $('#header_public').hide();
                        $('#header_staff').hide();
                        $('#header_admin').hide();
                    }
                    console.log(this.params, path, file);
                    this.$element().load('views/' + file + '.html');

                });
            });

            app.notFound = function () {
                $state.loading = loadingOverlay().activate();
                $('#header_public').hide();
                $('#header_staff').hide();
                $('#header_admin').hide();
                this.$element().load('views/home.html');
            }

            app.run();

            console.log($state.path);
            // sammy.js
        }
    });
} else {
    // sammy.js

    console.log($state.user);

    // manage page route
    $.each(router, function (indexInArray, valueOfElement) {
        const { path, file, role } = valueOfElement
        $state.path = path
        app.get('#/' + path, function () {
            $state.loading = loadingOverlay().activate();
            if ($state.user.role == 'admin' && path != 'home') {
                console.log("admin come in");
                if (path == 'auth') {
                    window.location = '#/config-system'
                    console.log("admin come to auth");
                    loadingOverlay().cancel($state.loading);
                    return
                } else if (role != 'admin' && role != 'public') {
                    console.log("not admin permission");
                    window.location = '#/home'
                    console.log("go to admin home");
                    loadingOverlay().cancel($state.loading);
                    return
                }
                $('#header_public').hide();
                $('#header_staff').hide();
                $('#header_admin').show();
            } else if ($state.user.role == 'staff' && path != 'home') {
                console.log("staff come in");
                if (path == 'auth') {
                    window.location = '#/library'
                    console.log("staff come to auth");
                    loadingOverlay().cancel($state.loading);
                    return
                } else if (role != 'staff' && role != 'public') {
                    console.log("not staff permission");
                    window.location = '#/library'
                    console.log("go to staff home");
                    loadingOverlay().cancel($state.loading);
                    return
                }
                $('#header_public').hide();
                $('#header_staff').show();
                $('#header_admin').hide();
            } else if (role != 'public') {
                console.log(role);
                console.log(role != 'public');
                console.log("not public path");
                if (role != $state.user.role) {
                    console.log($state.user.role);
                    window.location = '#/home'
                    console.log("no permission");
                    loadingOverlay().cancel($state.loading);
                    return
                }
            }
            else if (path != 'home') {
                $('#header_public').show();
                $('#header_staff').hide();
                $('#header_admin').hide();
            } else {
                $('#header_public').hide();
                $('#header_staff').hide();
                $('#header_admin').hide();
            }
            console.log(this.params, path, file);
            this.$element().load('views/' + file + '.html');

        });
    });

    app.notFound = function () {
        $state.loading = loadingOverlay().activate();
        $('#header_public').hide();
        $('#header_staff').hide();
        $('#header_admin').hide();
        this.$element().load('views/home.html');
    }

    app.run();

    console.log($state.path);
    // sammy.js
}
