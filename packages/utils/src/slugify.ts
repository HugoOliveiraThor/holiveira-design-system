export function slugify(value: string): string {
  return value.toLowerCase().split(" ").join("-")
}
