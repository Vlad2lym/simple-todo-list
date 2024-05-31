import { Option } from '../../../shared/api';

export enum Filters {
  all = 'all',
  complete = 'complete',
  incomplete = 'incomplete',
}

export const filterOptions: Array<{ value: Filters } & Omit<Option, 'value'>> = [
  { id: 1, title: 'ALL', value: Filters.all },
  { id: 2, title: 'Complete', value: Filters.complete },
  { id: 3, title: 'Incomplete', value: Filters.incomplete },
];
