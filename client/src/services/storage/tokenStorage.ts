const TOKEN = 'token'

export class TokenStorage {
  static set(token: string) {
    localStorage.setItem(TOKEN, token)
  }

  static get() {
    return localStorage.getItem(TOKEN)
  }

  static remove() {
    localStorage.removeItem(TOKEN)
  }
}
