import rawData from './data.json';

export interface ProductItem {
  id: number | string;
  title: string;
  slug: string;
  price: number;
  delPrice: number;
  proImg: string;
  brand?: string;
  stock?: string;
  size?: string;
}

/**
 * Converts price and delPrice strings like "$750.00" or "800.00" into numbers
 */
const getData = (): ProductItem[] => {
  return (rawData as any[]).map((item) => ({
    ...item,
    price: parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0,
    delPrice: parseFloat(String(item.delPrice).replace(/[^0-9.]/g, '')) || 0,
  }));
};

export default getData;
