export class TokenService {

  static set(token) {
    localStorage.setItem('token', token)
  }

  static get() {
    return localStorage.getItem('token')
  }

  static remove() {
    localStorage.removeItem('token')
  }

}
