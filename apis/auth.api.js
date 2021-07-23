function login($username, $password) {
    $state.user.username = $username
    $state.user.token = "token"
    $state.user.role = "admin"
}