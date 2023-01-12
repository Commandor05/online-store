import {ChangeEvent, FormEvent, useState} from 'react';
import {Validations} from '../types/Validation';
import {ErrorRecord} from '../types/ErrorRecord';

// eslint-disable-next-line @typescript-eslint/ban-types
export const useForm = <T extends Record<keyof T, unknown> = {}>(options?: {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}) => {
  const initialData = options?.initialValues || {};
  const [data, setData] = useState<T>(initialData as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  const handleChange = <S>(key: keyof T, transitFunc?: (value: string) => S) =>
    (event: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    const value = transitFunc ? transitFunc(event.target.value) : event.target.value;

    setData({...data, [key]: value})
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validations = options?.validations;

    let valid = true;
    const newErrors = {};

    for (const key in validations) {
      const value = data[key];
      const validation = validations[key];

      if (validation?.required?.value && !value) {
        valid = false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newErrors[key] = validation?.required?.message;
      }

      const paattern = validation?.pattern;
      if (paattern?.value && !RegExp(paattern.value).test(value as string)) {
        valid = false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newErrors[key] = paattern.message;
      }

      const custom = validation?.custom;
      if (custom?.isValid && !custom.isValid(value as string)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newErrors[key] = custom.message;
      }
    }

    if (!valid) {
      setErrors(newErrors);
      return ;
    }

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return { data, handleChange, handleSubmit, errors };
};

export default useForm;