function checkRoutePermission() {
    const route = router.find(route => route.path == $state.path)
    if (route) {
        console.log("have route");
        if (route.role != "public") {
            console.log(route);
            console.log("not public route");
            if (route.role != $state.user.role) {
                console.log("not matcth role route");
                app.setLocation('#/home');
            }
        }
    }
}