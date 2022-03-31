export default class Validate {

  static login() {
    return {
      required: 'Обязательное поле',
      maxLength: { value: 16, message: 'Максимум 16 символов' },
      pattern: {
        value: /^[a-zA-Z0-9]+$/,
        message: 'Только цифры и/или латинские буквы'
      }
    }
  }

  static password() {
    return {
      required: 'Обязательно поле',
      maxLength: { value: 16, message: 'Максимум 16 символов' },
      minLength: { value: 8, message: 'Минимум 8 символов' },
      pattern: {
        value: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
        message: 'Только цифры и латинские буквы одновременно'
      }
    }
  }

  static passwordRepeat(getValues) {
    return {
      ...Validate.password(),
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

  static number() {
    return {
      required: 'Обязательное поле',
      max: { value: 10_000, message: 'Максимум 10 000' },
      pattern: /^[0-9]$/,
      valueAsNumber: true,
      validate: {
        positive: value => {
          return parseInt(value) > -1 || 'Значение не может быть отрицательным'
        }
      }
    }
  }

  static required() {
    return { required: 'Обязательное поле' }
  }
}