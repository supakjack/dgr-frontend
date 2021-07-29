function wait_load_page() {
    $(() => {
        $state.loading = loadingOverlay().activate();
        setTimeout(() => {
            loadingOverlay().cancel($state.loading);
        }, 1000);
    });
    $("html, body").animate({ scrollTop: 0 }, "slow");
}