const user = JSON.parse(localStorage.getItem('user'))

export default {
  token: null,
  userData: null,
  permissions: [],
  status: user ? { status: { loggedIn: true }, user } : { status: {}, user: null }
}
