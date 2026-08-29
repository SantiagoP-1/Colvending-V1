// X/Twitter doesn't reliably fall back to og:image when no twitter:image
// meta tag is present, so it needs its own file-convention route — reusing
// the exact same generator as opengraph-image.tsx keeps one source of
// truth for the share image instead of maintaining two copies of the JSX.
export { alt, size, contentType, default } from "./opengraph-image";
