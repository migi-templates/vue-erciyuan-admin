export function isExternal(path) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path)
  return isExternal
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
