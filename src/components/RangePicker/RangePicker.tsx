import React, { useRef } from 'react';
import styles from '../RangePicker/RangePicker.module.scss';
import { RangePickerProps } from '../../interfaces/RangePickerProps';

export const RangePicker: React.FC<RangePickerProps> = ({
  min,
  max,
  value,
  onChange,
  step
}: RangePickerProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const minValue = min || 0;
  const maxValue = max || 100;
  const lineValue = (Number(value) / maxValue) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.line} style={{ width: `${lineValue}%` }}></div>
      <input
        ref={ref}
        type='range'
        onChange={onChange}
        min={minValue}
        max={maxValue}
        step={step}
        value={value}
        className={styles.range}
      />
    </div>
  );
};