//? В будушем сделать через RegExp...

export const convertAlt = (src) => {

  if (src.includes('/')) {
    src = src.split('/').at(-1)
  }

  if (src.includes('-')) {
    src = src.split('-').at(-1)
  }

  if (src.includes('.')) {
    src = src.split('.').at(-2)
  }

  return src
}

export const orderedMessage = (count) => {

  let message = ''
  if (count === 1) {
    message = `Добавлен ${count} продукт`
  }

  if (count >= 2 && count <= 4) {
    message = `Добавлено ${count} продукта`
  }

  if (count >= 5 && count <= 20) {
    message = `Добавлено ${count} продуктов`
  }

  if (count >= 21) {
    message = `Добавлено ой как много... (${count})`
  }

  return message
}

