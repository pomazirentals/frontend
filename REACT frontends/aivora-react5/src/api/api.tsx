import data from './data.json';

export interface ProductItem {
  id: number;
  proImg: string;
  title: string;
  slug: string;
  price: string;
  delPrice: string;
  brand: string;
  stock: string;
  size: string;
}

const getData = (): ProductItem[] => {
  return data as ProductItem[];
};

export default getData;
