import { SelectOption } from './SelectOption';

export interface SelectProps {
  value: string;
  options: SelectOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}