export const basePath = import.meta.env.BASE_URL;
export const routerBase = basePath === '/' ? '/' : basePath.replace(/\/$/, '');
export const publicAsset = (path: string) => `${basePath}${path.replace(/^\//, '')}`;
