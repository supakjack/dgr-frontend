const app = Sammy('#app')
const baseUrlAPI = 'http://localhost/www/dgr-backend/'
$('#header_admin').hide();
$('#header_public').hide();
$('#header_staff').hide();

$state.user.id = localStorage.getItem("id")
$state.user.token = localStorage.getItem("token")
console.log(localStorage.getItem("id"));
console.log(localStorage.getItem("token"));
if ($state.user.id) {
    $.ajax({
        type: "post",
        url: baseUrlAPI + "User/get_users/" + $state.user.id,
        dataType: "JSON",
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', $state.user.token); },
        success: function (response) {
            console.log(response.data[0]);
            $state.user.username = response.data ? response.data[0].username : null
            $state.user.role = response.data ? response.data[0].role : null
            $state.user.firstname = response.data ? response.data[0].firstname : null
            $state.user.id = response.data ? response.data[0].id : null
            $state.user.lastname = response.data ? response.data[0].lastname : null
            if (response.data[0].area_id) {
                $state.user.area_id = response.data[0].area_id
            }
            if (response.data[0].title) {
                $state.user.title = response.data[0].title
            }
        }
    });
}

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
                return
            } else if (role != 'admin' && role != 'public') {
                console.log("not admin permission");
                window.location = '#/home'
                console.log("go to admin home");
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
                return
            } else if (role != 'staff' && role != 'public') {
                console.log("not staff permission");
                window.location = '#/library'
                console.log("go to staff home");
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
