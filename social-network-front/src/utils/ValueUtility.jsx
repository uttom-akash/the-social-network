export function getValueOrDefault(value, defaultValue = 0) {
  return !!value ? value : defaultValue;
}
