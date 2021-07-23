const baseUrl = '#/'
const app = Sammy('#app')

// manage page route
$.each(router, function (indexInArray, valueOfElement) {
    const { path, file } = valueOfElement
    app.get('#/' + path, function () {
        if ($state.user.role) {
            $('#header').show();
        } else {
            $('#header').hide();
        }
        console.log(this.params, path, file);
        this.$element().load('views/' + file + '.html');
    });
});

app.notFound = function () {
    $('#header').hide();
    this.$element().load('views/home.html');
}

app.run();


