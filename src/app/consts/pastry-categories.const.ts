export type PastryCategories = 'all' | 'cookies' | 'muffins' | 'cakes';

export interface PastryListCategories {
  label: string;
  value: PastryCategories;
}

export const pastryCategories: PastryListCategories[] = [
  { label: 'All', value: 'all' },
  { label: 'Cookies', value: 'cookies' },
  { label: 'Muffins', value: 'muffins' },
  { label: 'Cakes', value: 'cakes' }
];
