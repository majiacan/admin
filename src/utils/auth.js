import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
// const TokenKey =  localStorage.gsetItem('token')

export function getToken() {
  // console.log(localStorage.getItem('token'))
  return Cookies.get(TokenKey)
    // return localStorage.getItem('token');
 
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
  // return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey)
  // return localStorage.removeItem(TokenKey);
}
