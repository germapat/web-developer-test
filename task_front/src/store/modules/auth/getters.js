export default {
  isAuthenticated (state) {
    return state.token !== null && state.token !== undefined
  }
}
