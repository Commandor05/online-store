import {FormEvent, MouseEventHandler, ReactNode} from 'react';

export type PageProps = {
  queryParams?: URLSearchParams,
  children?: ReactNode
}

export type ModalProps = Pick<PageProps, 'children'> & {
  show: boolean,
  onClose: () => void
}

export type CheckoutFormProps = {
  onConfirm: () => void;
}