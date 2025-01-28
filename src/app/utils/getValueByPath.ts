/**
 * Returns a value from an object by following a given path, which can be a string or array.
 * 
 * Example:
 * 
 * const obj = { user: { name: "Alice", age: 25, addresses: [{ city: "Wonderland" } } };
 * const result = getValueByPath(obj, "user.address.city"); // Returns "Wonderland"
 * 
 * const obj = { users: [{ name: "Alice" }, { name: "Bob" }] };
 * const result = getValueByPath(obj, "users[1].name"); // Returns "Bob"
 * 
 * COPY of Lodash GET function
 */

type Path = string | Array<string | number>
type Value = boolean | string | object

export function getValueByPath<T, R = undefined>(
  obj: T,
  path: Path,
  defaultValue?: R
): R | Value {
  if (!obj || !path) return defaultValue as R

  const pathArray = Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)]/g, ".$1").split(".")

  let current: Value = obj

  for (const key of pathArray) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string | number, Value>)[key]
    } else {
      return defaultValue as R
    }
  }

  return current
}
