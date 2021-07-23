$('.owl-carousel').owlCarousel({
    margin: 15,
    nav: true,
    navText: ["<div class='d-none d-lg-block  nav-button owl-prev'><p>‹</p></div>", "<div class='d-none d-lg-block  nav-button owl-next'><p>›</p> </div>"],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
});

AOS.init();

// Main Navbar menu
$(document).on('click', '#goHome', (e) => {
    e.preventDefault();
    app.setLocation('#/demo');
})

$(document).on('click', '#goLogin', (e) => {
    e.preventDefault();
    app.setLocation('#/auth');
})
