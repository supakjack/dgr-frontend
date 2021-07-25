// mock data users
const users = [
    {
        "id": "1",
        "username": "staff",
        "password": "dgr@staff",
        "role": "staff",
        "token": "tokenstaff",
    }, {
        "id": "2",
        "username": "admin",
        "password": "dgr@admin",
        "role": "admin",
        "token": "tokenadmin",
    },
]

// function for login
function login($username, $password) {
    const result = users.filter(user => user.username == $username && user.password == $password)
    if (result.length) {
        const { username, role, token } = result[0]
        $state.user.username = username
        $state.user.token = token
        $state.user.role = role
        localStorage.setItem("username", $state.user.username)
        localStorage.setItem("token", $state.user.token)
        localStorage.setItem("role", $state.user.role)
    }
}

// function for logout
// function logout($username, $password) {
//     const result = users.filter(user => user.username == $username && user.password == $password)
//     if (result.length) {
//         const { username, role, token } = result[0]
//         $state.user.username = username
//         $state.user.token = token
//         $state.user.role = role
//     }
// }