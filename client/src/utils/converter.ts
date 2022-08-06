export const convertAlt = (src: string) => {
  let alt = 'unknown picture'

  if (src.includes('/')) {
    alt = src.split('/').at(-1) ?? alt
  }

  if (src.includes('-')) {
    alt = src.split('-').at(-1) ?? alt
  }

  if (src.includes('.')) {
    alt = src.split('.').at(-2) ?? alt
  }

  return alt
}

export const orderedMessage = (count: number) => {
  let message = ''
  if (count === 1) {
    message = `Добавлен ${count} набор`
  }

  if (count >= 2 && count <= 4) {
    message = `Добавлено ${count} набора`
  }

  if (count >= 5 && count <= 20) {
    message = `Добавлено ${count} наборов`
  }

  if (count >= 21) {
    message = `Добавлено (${count})`
  }

  return message
}
