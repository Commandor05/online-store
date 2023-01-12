import React from 'react';
import styles from './FilterListItem.module.scss';
import { FilterListItemProps } from '../../types/FilterList';
import { Checkbox } from '../Checkbox/Checkbox';

const FilterListItem: React.FC<FilterListItemProps> = ({
  label,
  isChecked,
  handleChange,
  available,
  selected
}) => {
  return (
    <div className={styles.wrapper}>
        <Checkbox
          label={label}
          isChecked={isChecked}
          handleChange={handleChange}
        />
        <span className={styles.status}>({selected}/{available})</span>
    </div>
  );
};

export default FilterListItem;