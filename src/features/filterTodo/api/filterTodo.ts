import { Option } from '@/shared/api';

export enum Filters {
  all = 'all',
  complete = 'complete',
  incomplete = 'incomplete',
}

export type FilterOption = { value: Filters } & Omit<Option, 'value'>;

export const filterOptions: FilterOption[] = [
  { id: 1, title: 'ALL', value: Filters.all },
  { id: 2, title: 'Complete', value: Filters.complete },
  { id: 3, title: 'Incomplete', value: Filters.incomplete },
];
