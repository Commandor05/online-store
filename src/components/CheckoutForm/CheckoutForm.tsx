import React, { FormEvent} from 'react';
import styles from '../CheckoutForm/CheckoutForm.module.scss';
import { TextInput } from '../Input/TextInput';
import { Button } from '../Button/Button';
import { ButtonColors } from '../../enums/ButtonColors';
import { CheckoutFormProps } from '../../types/Page';
import { validationCheckoutRules } from '../../utils/config/validationCheckoutRules';
import useForm from '../../hooks/useForm';
import { Checkout } from '../../interfaces/Checkout';

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onConfirm }: CheckoutFormProps): JSX.Element => {
  const initForm = {...validationCheckoutRules, onSubmit : onConfirm};
  const { handleSubmit, handleChange, data, errors } = useForm<Checkout>(initForm);

  const handleConfirm = (event: FormEvent<HTMLFormElement>): void => {
    handleSubmit(event);
  };

  const vdateNormalize = (value: string) => {
    if (Number(value) > 1 && Number(value) < 10) {
      value += '/'
    }
    return value;
  }

  return (
    // eslint-disable-next-line react/no-unknown-property
    <form className={styles.wrapper} onSubmit={handleConfirm}>
      <div className={styles.personalData}>
        <h3 className={styles.personalDataTitle}>Personal details</h3>
        <TextInput className={styles.personalDataInput} placeholder='Name' onChange={handleChange('name')} value={data.name} />
        <div>
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <TextInput className={styles.personalDataInput} placeholder='Phone number' onChange={handleChange('phone')} value={data.phone} />
        <div>
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        </div>

        <TextInput className={styles.personalDataInput} placeholder='Delivery adress' onChange={handleChange('delivery')} value={data.delivery} />
        <div>
          {errors.delivery && <p className={styles.error}>{errors.delivery}</p>}
        </div>

        <TextInput className={styles.personalDataInput} placeholder='Email' onChange={handleChange('email')} value={data.email} />
        <div>
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

      </div>
      <div className={styles.creditCardWrapper}>
        <h3 className={styles.cardDataTitle}>Credit card details</h3>
        <div className={styles.creditCard}>
          <TextInput placeholder='Card number' onChange={handleChange('card')} value={data.card} />
          <div>
            {errors.card && <p className={styles.error}>{errors.card}</p>}
          </div>

          <div className={styles.cardData}>
            <div >
              <span>Valid:</span>
              <TextInput className={styles.dataInput} placeholder='Valid thru' onChange={handleChange<string>('vdate', vdateNormalize)} value={data.vdate} />
              <div>
                {errors.vdate && <p className={styles.error}>{errors.vdate}</p>}
              </div>
            </div>
            <div>
              <span>CVV:</span>
              <TextInput className={styles.dataInput} placeholder='Code' onChange={handleChange<number>('code')} value={data?.code?.toString()} />
              <div>
                {errors.code && <p className={styles.error}>{errors.code}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button className={styles.button} title='Confirm' color={ButtonColors.Primary} />
    </form>
  );
};
