import { CustomSelect } from '@/shared/ui/customSelect';
import { FilterOption, filterOptions } from '../api/filterTodo';

interface IProps {
  className: string;
  onChangeFilter: (option: FilterOption) => void;
}

export const FilterTodo = ({ className, onChangeFilter }: IProps) => {
  return (
    <>
      <CustomSelect className={className} options={filterOptions} onChange={onChangeFilter} />
    </>
  );
};
