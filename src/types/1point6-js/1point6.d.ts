import { CheckoutLocale, RedirectToCheckoutOptions } from "./checkout";
import * as paymentIntents from "./payment-intents";
import {
  Get1Point6ElementsOptionsClientSecret,
  Get1Point6ElementsOptionsMode,
  Get1Point6Elements,
} from "./elements-group";

export interface Get1Point6 {
  /////////////////////////////
  /// Elements
  ///
  /// TODO: ADD DOC
  /////////////////////////////

  /**
   * Create an `Elements` instance, which manages a group of elements.
   *
   * TODO: ADD DOC
   */
  elements(options?: Get1Point6ElementsOptionsClientSecret): Get1Point6Elements;

  /**
   * Create an `Elements` instance, which manages a group of elements.
   *
   * TODO: ADD DOC
   */
  elements(options?: Get1Point6ElementsOptionsMode): Get1Point6Elements;

  /////////////////////////////
  /// Checkout
  ///
  /// TODO: ADD DOC
  /////////////////////////////

  /**
   * Use `_1Point6.redirectToCheckout` to redirect your customers to [Checkout](TODO: ADD DOC), a Get1Point6-hosted page to securely collect payment information.
   * When the customer completes their purchase, they are redirected back to your website.
   */
  redirectToCheckout(
    options: RedirectToCheckoutOptions
  ): Promise<never | { error: Get1Point6Error }>;

  /**
   * Use `_1Point6.confirmPayment` to confirm a PaymentIntent using data collected by the Payment Element.
   * When called, `_1Point6.confirmPayment` will attempt to complete any required actions, such as authenticating your user by displaying a 3DS dialog or redirecting them to a bank authorization page.
   * Your user will be redirected to the return_url you pass once the confirmation is complete.
   *
   * By default, `_1Point6.confirmPayment` will always redirect to your return_url after a successful confirmation.
   * If you set `redirect: "if_required"`, then `_1Point6.confirmPayment` will only redirect if your user chooses a redirect-based payment method.
   * Setting `if_required` requires that you handle successful confirmations for redirect-based and non-redirect based payment methods separately.
   *
   * @docs TODO: DOC HERE
   */
  confirmPayment(options: {
    elements: Get1Point6Elements;
    confirmParams?: Partial<paymentIntents.ConfirmPaymentData>;
    redirect: "if_required";
  }): Promise<PaymentIntentResult>;
}

export interface Get1Point6ConstructorOptions {
  /**
   * The [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) used to globally configure localization in 1Point6.js.
   * Setting the locale here will localize error strings for all 1Point6.js methods.
   *
   * Supported values depend on which features you are using.
   * Checkout supports a slightly different set of locales than the rest of 1Point6.js.
   * If you are planning on using Checkout, make sure to use a [value](#checkout_redirect_to_checkout-options-locale) that it supports.
   */
  locale?: CheckoutLocale;
}

export interface Get1Point6Constructor {
  (
    /**
     * Your publishable key.
     */
    publishableKey: string,
    /**
     * Targetted environment.
     */
    env?: "local" | "development" | "sandbox" | "production",
    /**
     * Initialization options.
     */
    options?: Get1Point6ConstructorOptions
  ): Get1Point6;
}

export type Get1Point6ErrorType =
  /**
   * Failure to connect to 1Point6's API.
   */
  | "api_connection_error"

  /**
   * API errors cover any other type of problem (e.g., a temporary problem with 1Point6's servers), and are extremely uncommon.
   */
  | "api_error"

  /**
   * Failure to properly authenticate yourself in the request.
   */
  | "authentication_error"

  /**
   * Card errors are the most common type of error you should expect to handle.
   * They result when the user enters a card that can't be charged for some reason.
   */
  | "card_error"

  /**
   * Idempotency errors occur when an `Idempotency-Key` is re-used on a request that does not match the first request's API endpoint and parameters.
   */
  | "idempotency_error"

  /**
   * Invalid request errors arise when your request has invalid parameters.
   */
  | "invalid_request_error"

  /**
   * Too many requests hit the API too quickly.
   */
  | "rate_limit_error"

  /**
   * Errors triggered by our client-side libraries when failing to validate fields (e.g., when a card number or expiration date is invalid or incomplete).
   */
  | "validation_error";

export interface Get1Point6Error {
  /**
   * The type of error.
   */
  type: Get1Point6ErrorType;

  /**
   * For card errors, the ID of the failed charge
   */
  charge?: string;

  /**
   * For some errors that could be handled programmatically, a short string indicating the [error code](TODO: LINK TO DOCUMENTATION ERROR CODES) reported.
   */
  code?: string;

  /**
   * For card errors resulting from a card issuer decline, a short string indicating the [card issuer’s reason for the decline](TODO: LINK TO ISSUERS REASON FOR DECLINE) if they provide one.
   */
  decline_code?: string;

  /**
   * A URL to more information about the [error code](TODO: LINK TO DOCUMENTATION ERROR CODES) reported.
   */
  doc_url?: string;

  /**
   * A human-readable message providing more details about the error. For card errors, these messages can be shown to your users.
   */
  message?: string;

  /**
   * If the error is parameter-specific, the parameter related to the error.
   * For example, you can use this to display a message near the correct form field.
   */
  param?: string;

  /**
   * The `PaymentIntent` object for errors returned on a request involving a `PaymentIntent`.
   */
  payment_intent?: any; // TODO: IMPORT SHARED PAYMENT_INTENT

  /**
   * The `PaymentMethod` object for errors returned on a request involving a `PaymentMethod`.
   */
  payment_method?: any; // TODO: IMPORT SHARED PAYMENT_METHOD
}

export type PaymentIntentResult =
  | { paymentIntent: api.PaymentIntent; error?: undefined }
  | { paymentIntent?: undefined; error: Get1Point6Error };
