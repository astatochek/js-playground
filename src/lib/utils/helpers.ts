export type Nil = null | undefined

export function isNil(v: any): v is Nil {
  return v == null;
}

export function parseParams(params: URLSearchParams): string | Nil {
  return params.get('code')
}

export function decode(encoded: string | Nil): string {
  if (isNil(encoded)) return ''
  try {
    return decodeURIComponent(encoded)
  } catch {
    return ''
  }
}

export function encode(string: string): string {
  try {
    return encodeURIComponent(string)
  } catch {
    return ""
  }
}
