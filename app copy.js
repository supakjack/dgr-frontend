

// 
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
        }
    });
}

console.log($state.user);

// manage page route
app.get('#/home', function () {
    $state.loading = loadingOverlay().activate();
    $('#header_public').hide();
    $('#header_staff').hide();
    $('#header_admin').hide();
    this.$element().load('views/home.html');
})
app.get('#/auth', function () {
    $state.loading = loadingOverlay().activate();
    $('#header_public').hide();
    $('#header_staff').hide();
    $('#header_admin').hide();
    this.$element().load('views/login.html');
})
app.get('#/people', function () {
    $state.loading = loadingOverlay().activate();
    $('#header_public').show();
    $('#header_staff').hide();
    $('#header_admin').hide();
    this.$element().load('views/people.html');
})
app.get('#/management', function () {
    $state.loading = loadingOverlay().activate();
    $('#header_public').show();
    $('#header_staff').hide();
    $('#header_admin').hide();
    this.$element().load('views/management.html');
})
app.get('#/library', function () {
    $state.loading = loadingOverlay().activate();
    $('#header_public').hide();
    $('#header_staff').show();
    $('#header_admin').hide();
    this.$element().load('views/library.html');
})
app.get('#/staff-report', function () {
    $state.loading = loadingOverlay().activate();
    $('#header_public').hide();
    $('#header_staff').show();
    $('#header_admin').hide();
    this.$element().load('views/staff-report.html');
})
app.get('#/staff-application', function () {
    $state.loading = loadingOverlay().activate();
    $('#header_public').hide();
    $('#header_staff').show();
    $('#header_admin').hide();
    this.$element().load('views/staff-application.html');
})
app.get('#/staff-management', function () {
    $state.loading = loadingOverlay().activate();
    $('#header_public').hide();
    $('#header_staff').show();
    $('#header_admin').hide();
    this.$element().load('views/staff-management.html');
})
app.get('#/config-system', function () {
    $state.loading = loadingOverlay().activate();
    $('#header_public').hide();
    $('#header_staff').hide();
    $('#header_admin').show();
    this.$element().load('views/config-system.html');
})
app.get('#/config-staff', function () {
    $state.loading = loadingOverlay().activate();
    $('#header_public').hide();
    $('#header_staff').hide();
    $('#header_admin').show();
    this.$element().load('views/config-staff.html');
})


app.notFound = function () {
    $state.loading = loadingOverlay().activate();
    $('#header_public').hide();
    $('#header_staff').hide();
    $('#header_admin').hide();
    this.$element().load('views/home.html');
}

app.run();

console.log($state.path);
