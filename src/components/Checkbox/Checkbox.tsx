import React from 'react';
import classNames from 'classnames';
import styles from '../Checkbox/Checkbox.module.scss';
import { Mark } from '../../icons/icons';
import { CheckboxProps } from '../../interfaces/CheckboxProps';

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  isChecked,
  handleChange,
}: CheckboxProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <div className={styles.iconWrapper}>
          <Mark className={classNames(styles.icon, { [styles.iconChecked]: isChecked })} />
        </div>
        <input
          type='checkbox'
          id={label}
          checked={isChecked}
          onChange={handleChange}
          className={styles.checkbox}
        />
      </div>
      <label className={styles.label} htmlFor={label}>
        {label}
      </label>
    </div>
  );
};