const app = Sammy('#app') // define a new Sammy.Application bound to the #app element selecto

$.each(router, function (indexInArray, valueOfElement) {
    const { path, file } = valueOfElement
    app.get('#/' + path, function () {
        console.log(this.params, path, file);
        this.$element().load('views/' + file + '.html');
    });
});

app.notFound = function () {
    this.$element().load('views/home.html'); //if error load home
}

app.run(); // run Sammy.Application


