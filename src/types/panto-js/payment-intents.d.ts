import { PantoCardElement } from "./elements";

/**
 * Data to be sent with a `panto.confirmPayment` request.
 * Refer to the Payment Intents API for a full list of parameters.
 */
export interface ConfirmPaymentData extends PaymentIntentConfirmParams {
  /**
   * The url your customer will be directed to after they complete payment.
   */
  return_url: string;

  /**
   * An object to attach additional billing_details to the PaymentMethod created via Elements.
   *
   * @docs // TODO: DOC HERE
   */
  payment_method_data?: {
    /**
     * The customer's billing details. Details collected by Elements will override values passed here.
     * Billing fields that are omitted in the Payment Element via the `fields` option required.
     *
     * @docs // TODO: DOC HERE
     */
    billing_details?: PaymentMethodCreateParams.BillingDetails;
  };

  /**
   * Optional `id` of an existing PaymentMethod.
   *
   * @docs // TODO: DOC HERE
   */
  payment_method?: string;

  /**
   * Specifies which fields in the response should be expanded.
   */
  expand?: Array<string>;
}
