import { createUrl } from './create-urls';

export const ProductsUrl = {
  get: (baseUrls: string) => createUrl(baseUrls, 'products'),
};
