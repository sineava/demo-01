const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  system_code: state => state.user.system_code,
  user_account: state => state.user.user_account,
  token_str: state => state.user.token_str,
  permission_routes: state => state.permission.routes,
  user_info: state => state.user.user_info[0],
  user_results: state => state.user.results,
  button_roles: state => state.user.buttonRoles,
  enterprise: state => state.user.enterprise,
  firstPath: state => state.permission.firstPath,
}
export default getters
