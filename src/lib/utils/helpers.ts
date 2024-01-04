export function isNil(v: any): v is undefined | null {
  return v == null;
}
