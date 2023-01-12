import { ChangeEvent } from 'react';

export interface TextInputProps {
  value: string;
  placeholder?: string;
  color?: string;
  onChange: (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void;
  className?: string;
}