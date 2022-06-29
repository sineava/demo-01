import Cookies from 'js-cookie'

// const TokenKey = 'integrated_port_management_token'

export function getToken(key) {
  return Cookies.get(key) || localStorage.getItem(key)
}

export function setToken(key, val) {
  localStorage.setItem(key,val)
  return Cookies.set(key, val)
}

export function removeToken(key) {
  localStorage.removeItem(key)
  return Cookies.remove(key)
}
