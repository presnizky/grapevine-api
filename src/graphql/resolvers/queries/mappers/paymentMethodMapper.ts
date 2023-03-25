import {IPaymentMethod} from '@interfaces/dto'
import {PaymentMethod} from '@models';
import {mapUser} from '@mappers'

export default (paymentMethod: PaymentMethod): IPaymentMethod => {
    return {
      id: paymentMethod.id,
      name: paymentMethod.name,
      creditCardNumber: paymentMethod.creditCardNumber,
      expirationDate: paymentMethod.expirationDate,
      ccv: paymentMethod.ccv,
      createdAt: paymentMethod.createdAt,
      updatedAt: paymentMethod.updatedAt,
    };
  }