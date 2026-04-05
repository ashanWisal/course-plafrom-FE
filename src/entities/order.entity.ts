import * as Yup from 'yup';

export class CreateOrderEntity {
  course_id: string = '';

  static yupSchema() {
    return Yup.object().shape({
      course_id: Yup.string()
        .required('Course is required'),
    });
  }
}

export class PaymentEntity {
  cardholder_name: string = '';
  card_number: string = '';
  expiry_date: string = '';
  cvc: string = '';

  static yupSchema() {
    return Yup.object().shape({
      cardholder_name: Yup.string()
        .min(2, 'Min 2 characters')
        .required('Cardholder name is required'),
      card_number: Yup.string()
        .matches(/^[\d\s]{19}$/, 'Invalid card number')
        .required('Card number is required'),
      expiry_date: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format must be MM/YY')
        .required('Expiry date is required'),
      cvc: Yup.string()
        .matches(/^\d{3}$/, 'CVC must be 3 digits')
        .required('CVC is required'),
    });
  }
}