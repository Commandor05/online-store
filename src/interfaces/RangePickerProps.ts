export interface RangePickerProps {
  min?: number;
  max?: number;
  step: number
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}