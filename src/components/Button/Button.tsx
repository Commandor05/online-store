import React from 'react';
import classNames from 'classnames';
import { ButtonColors } from '../../enums/ButtonColors';
import styles from './Button.module.scss';
import { ButtonProps } from '../../interfaces/ButtonProps';

export const Button: React.FC<ButtonProps> = ({ color, onClick, title, className, children } : ButtonProps): JSX.Element => {
  const btnClass: string = classNames(
    styles.button,
    className,
    {
      [styles.button_secondary]: color === ButtonColors.Secondary,
    },
    {
      [styles.button_primary]: color === ButtonColors.Primary,
    },
  );

  return (
    <button onClick={onClick} className={btnClass}>
      {children || title}
    </button>
  );
};