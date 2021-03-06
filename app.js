const app = Sammy('#app')
$('#header_admin').hide();
$('#header_public').hide();
$('#header_staff').hide();

$state.user.username = localStorage.getItem("username")
$state.user.token = localStorage.getItem("token")
$state.user.role = localStorage.getItem("role")

console.log($state.user);

// manage page route
$.each(router, function (indexInArray, valueOfElement) {
    const { path, file, role } = valueOfElement
    $state.path = path
    app.get('#/' + path, function () {
        if ($state.user.role == 'admin' && path != 'home') {
            console.log("admin come in");
            if (path == 'auth') {
                window.location = '#/config-system'
                console.log("admin come to auth");
                loadingOverlay().cancel($state.loading);
                return
            } else if (role != 'admin' && role != 'public') {
                console.log("not admin permission");
                window.location = '#/config-system'
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
    $('#header_public').hide();
    $('#header_staff').hide();
    $('#header_admin').hide();
    this.$element().load('views/home.html');
}

app.run();

console.log($state.path);
