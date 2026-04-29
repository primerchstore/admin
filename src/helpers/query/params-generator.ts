export function toParams(
  obj: Record<string, string | string[] | number | boolean | undefined>,
) {
  return new URLSearchParams(
    Object.entries(obj)
      .filter(([_, v]) => v != null)
      .map(([k, v]) => [k, String(v)]),
  );
}
