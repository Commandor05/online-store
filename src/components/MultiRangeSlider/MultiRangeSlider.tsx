import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MultiRangeSliderProps } from '../../interfaces/MultiRangeSliderProps';
import classNames from 'classnames';
import styles from './MultiRangeSlider.module.scss';

export const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({
  min,
  max,
  minValue,
  maxValue,
  onChange,
}: MultiRangeSliderProps) => {
  const [minVal, setMinVal] = useState(minValue);
  const [maxVal, setMaxVal] = useState(maxValue);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    setMinVal(minValue);
    setMaxVal(maxValue);

  }, [minValue, maxValue]);


  const handleRangeChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(+event.target.value, maxVal - 1);
    setMinVal(value);
    onChange({ min: value, max: maxVal });
    event.target.value = value.toString();
  }

  const handleRangeChangeMax= (event: React.ChangeEvent<HTMLInputElement>)=> {
    const value = Math.max(+event.target.value, minVal + 1);
    setMaxVal(value);
    onChange({ min: minVal, max: value });
    event.target.value = value.toString();
  }

  return (
    <div className={styles.container}>
      <input
        type='range'
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={handleRangeChangeMin}
        className={classNames(styles.thumb, styles.thumbZindex3, {
          thumbZindex5: minVal > max - 100,
        })}
      />
      <input
        type='range'
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={handleRangeChangeMax}
        className={classNames(styles.thumb, styles.thumbZindex4)}
      />

      <div className={styles.slider}>
        <div className={styles.sliderTrack} />
        <div ref={range} className={styles.sliderRange} />
        <div className={styles.sliderLeftValue}>{minVal}</div>
        <div className={styles.sliderRightValue}>{maxVal}</div>
      </div>
    </div>
  );
};