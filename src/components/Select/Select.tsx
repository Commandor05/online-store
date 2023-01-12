import React from 'react';
import styles from './Select.module.scss';
import { SelectProps } from '../../interfaces/SelectProps';

export const Select: React.FC<SelectProps> = ({ value, options, onChange }: SelectProps) => {
  return (
    <select value={value} className={styles.select} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} className={styles.option} value={option.value} disabled={option.disabled? option.disabled : false}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
