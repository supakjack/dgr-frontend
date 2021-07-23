const app = Sammy('#app')

$.each(router, function (indexInArray, valueOfElement) {
    const { path, file } = valueOfElement
    app.get('#/' + path, function () {
        console.log(this.params, path, file);
        this.$element().load('views/' + file + '.html');
    });
});

app.notFound = function () {
    $('#header').hide();
    this.$element().load('views/home.html');
}

app.run();


