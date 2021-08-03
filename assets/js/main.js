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


// Main Navbar menu
$(document).on('click', '#goHome', (e) => {
    e.preventDefault();
    app.setLocation('#/home');
})

$(document).on('click', '#goLogin', (e) => {
    e.preventDefault();
    app.setLocation('#/auth');
})

$(document).on('click', '#goLogout', (e) => {
    e.preventDefault();
    $state.user = {
        username: '',
        token: '',
        role: '',
    }
    localStorage.clear()
    app.setLocation('#/home');
})


$.getJSON("https://api.countapi.xyz/hit/supakjack.github.iodgr-frontend", function(response) {
    $("#visits").text(response.value);
});

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};
