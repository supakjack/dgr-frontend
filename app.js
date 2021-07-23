const baseUrl = '#/'
const app = Sammy('#app')

// manage page route
$.each(router, function (indexInArray, valueOfElement) {
    const { path, file } = valueOfElement
    app.get('#/' + path, function () {
        if ($state.user.role) {
            $('#header_staff').show();
            $('#header_public').hide();
        } else {
            $('#header_staff').hide();
            $('#header_public').show();
        }
        console.log(this.params, path, file);
        this.$element().load('views/' + file + '.html');
    });
});

app.notFound = function () {
    $('#header_public').hide();
    $('#header_staff').hide();
    this.$element().load('views/home.html');
}

app.run();


