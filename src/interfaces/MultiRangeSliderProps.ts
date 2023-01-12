import { MultiRangeSliderData } from './MultiRangeSliderData';

export interface MultiRangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onChange: ({ min, max }: MultiRangeSliderData) => void;
}