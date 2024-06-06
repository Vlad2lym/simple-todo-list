import { InputText } from '@/shared/ui/inputText';

interface IProps {
  className: string;
  searchNote: string;
  onChangeSearchNote: (value: string) => void;
}

export const SearchTodoByTitle = ({ className, searchNote, onChangeSearchNote }: IProps) => {
  return (
    <>
      <InputText
        className={className}
        placeholder="Search note..."
        value={searchNote}
        onChange={onChangeSearchNote}
        searched
      />
    </>
  );
};
