export default class Validate {

  static login() {
    return {
      required: 'Обязательное поле',
      maxLength: { value: 16, message: 'Максимум 16 символов' },
    }
  }

  static password() {
    return {
      required: 'Обязательно поле',
      maxLength: { value: 16, message: 'Максимум 16 символов' },
      minLength: { value: 8, message: 'Минимум 8 символов' },
      pattern: {
        value: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
        message: 'Пароль должен содержать цифры и латинские буквы'
      }
    }
  }

  static passwordRepeat(getValues) {
    return {
      ...Validate.password(),
      ...Validate.passwordsEqual(getValues)
    }
  }

  static passwordsEqual(getValues) {
    return {
      validate: value => value === getValues('password') || 'Пароли должны быть одинаковыми'
    }
  }

  static username() {
    return {
      maxLength: { value: 16, message: 'Максимум 16 символов' },
    }
  }

  static description() {
    return {
      maxLength: { value: 300, message: 'Максимум 300 символов' },
    }
  }

  static productTitle() {
    return {
      required: 'Обязательное поле',
      maxLength: { value: 70, message: 'Максимум 70 символов' }
    }
  }

  static structureField() {
    return {
      ...Validate.positive(),
      maxLength: { value: 5, message: 'Максимум 5 символов' }
    }
  }

  static positive() {
    return {
      validate: {
        positive: value => {
          return parseInt(value) > -1 || 'Значение не может отсутствовать или быть отрицательным'
        }
      }
    }
  }

  static required() {
    return { required: 'Обязательное поле' }
  }

}