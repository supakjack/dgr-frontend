function wait_load_page() {
    $state.loading = loadingOverlay().activate();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $(() => {
        setTimeout(() => {
            loadingOverlay().cancel($state.loading);
        }, 100);
    });
}