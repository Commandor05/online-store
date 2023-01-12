import React from 'react';
import styles from './FilterList.module.scss';
import { FilterListProps } from '../../types/FilterList';
import FilterListItem from './FilterListItem';



const FilterList = ({ title, listItems, handleFilterChange }: FilterListProps) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.listWrapper}>
      {listItems?.map(({label, isChecked,  available, selected}) => {
          return <FilterListItem key={label} label={label} available={available} selected={selected}
           handleChange={handleFilterChange} isChecked={isChecked} />
      })}
      </div>
    </div>
  );
}

export default FilterList;