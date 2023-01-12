export const validationCheckoutRules =  {
  validations: {
    name: {
      required: {
        value: true,
        message: 'Required'
      },
      pattern: {
        value: '^\\w{3,}\\s+\\w{3,}$',
        message: 'It should contains at least two words, each at least 3 characters long'
      }
    },
    phone: {
      required: {
        value: true,
        message: 'Required'
      },
      pattern: {
        value: '^\\+\\d{9,}$',
        message: 'It should starts with "+" and contains 9 numbers at least'
      }
    },
    delivery: {
      required: {
        value: true,
        message: 'Required'
      },
      pattern: {
        value: '^\\w{5,}\\s+\\w{5,}\\s+\\w{5,}$',
        message: 'It should contains at least 3 words, each at least 5 characters long'
      }
    },
    email: {
      required: {
        value: true,
        message: 'Required'
      },
      pattern: {
        value: '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$',
        message: 'It should e-mail address'
      }
    },
    card: {
      required: {
        value: true,
        message: 'Required'
      },
      pattern: {
        value: '^\\d{16}$',
        message: 'It should contains 16 digits'
      }
    },
    vdate: {
      required: {
        value: true,
        message: 'Required'
      },
      pattern: {
        value: '^\\d{1,2}/\\d{2,4}$',
        message: 'It should have format mm/yy or mm/yyyy'
      },
      custom: {
        isValid: (value: string) => { return (Boolean(value) && (Number(value.split('/')[0]) < 13)) },
        message: 'Month should be less then 12',
      }
    },
    code: {
      required: {
        value: true,
        message: 'Required'
      },
      pattern: {
        value: '^\\d{3}$',
        message: 'CVV should contains 3 digits'
      }
    },
  },
}