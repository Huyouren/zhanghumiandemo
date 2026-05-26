export function assetPath(path, base = import.meta.env.BASE_URL || "/") {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) {
    return path;
  }

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return `${base.endsWith("/") ? base : `${base}/`}${cleanPath}`;
}
