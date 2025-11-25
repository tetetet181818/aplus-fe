export const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') {
    return undefined
  }
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
}

/** Delete cookie by name */
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; max-age=0; path=/`
}

export const setCookie = (
  name: string,
  value: string,
  days?: number,
  path: string = '/'
) => {
  if (typeof document === 'undefined') return

  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = `; expires=${date.toUTCString()}`
  }

  document.cookie = `${name}=${encodeURIComponent(
    value || ''
  )}${expires}; path=${path}`
}
