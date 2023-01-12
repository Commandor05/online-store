import React from 'react';

export interface ButtonProps {
  title: string;
  children?: React.ReactNode;
  color?: string;
  className?: string;
  onClick?: () => void;
}