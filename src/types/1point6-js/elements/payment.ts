import { ElementBase } from "./base";

export type PaymentElement = ElementBase & {};

export interface PaymentElementOptions {
  /**
   * Provide initial customer information that will be displayed in the Payment Element.
   */
  defaultValues?: DefaultValuesOption;

  /**
   * Override the business name displayed in the Payment Element.
   * By default the PaymentElement will use your 1point6 account or business name.
   */
  business?: { name: string };

  /**
   * Control which fields are displayed in the Payment Element.
   */
  fields?: any;

  /**
   * Apply a read-only state to the Payment Element so that payment details can’t be changed.
   * Default is false.
   */
  readOnly?: boolean;
}

export interface DefaultValuesOption {
  billingDetails?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: {
      country?: string;
      postal_code?: string;
      state?: string;
      city?: string;
      line1?: string;
      line2?: string;
    };
  };
}

export interface PaymentElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: "payment";

  /**
   * `true` if the all inputs in the Payment Element are empty.
   */
  empty: boolean;

  /**
   * `true` if the every input in the Payment Element is well-formed and potentially complete.
   */
  complete: boolean;

  /**
   * Whether or not the Payment Element is currently collapsed.
   */
  collapsed: boolean;

  /**
   * An object containing the currently selected PaymentMethod type (in snake_case, for example "afterpay_clearpay").
   */
  value: { type: string };
}
