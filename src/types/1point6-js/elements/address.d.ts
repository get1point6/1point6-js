import { Get1Point6ElementBase } from "./base";
import { Get1Point6Error } from "../1point6";

export type Get1Point6AddressElement = Get1Point6ElementBase & {
  /**
   * Updates the options the `AddressElement` was initialized with.
   * Updates are merged into the existing configuration.
   */
  update(options: Partial<Get1Point6AddressElementOptions>): Get1Point6AddressElement;

  /**
   * Validates and retrieves form values from the `AddressElement`.
   */
  getValue(): Promise<
    Pick<Get1Point6AddressElementChangeEvent, "complete" | "isNewAddress" | "value">
  >;
};

export interface ContactOption {
  name: string;
  phone?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export type AddressMode = "shipping" | "billing";

export interface Get1Point6AddressElementOptions {
  /**
   * Control which mode the AddressElement will be used for.
   */
  mode: AddressMode;

  /**
   * An array of two-letter ISO country codes representing which countries
   * are displayed in the AddressElement.
   */
  allowedCountries?: string[] | null;

  /**
   * Control autocomplete settings in the AddressElement.
   */
  autocomplete?:
    | { mode: "automatic" }
    | { mode: "disabled" }
    | { mode: "google_maps_api"; apiKey: string };

  /**
   * Whether or not AddressElement accepts PO boxes
   */
  blockPoBox?: boolean;

  /**
   * An array of saved addresses.
   */
  contacts?: ContactOption[];

  /**
   * Default value for AddressElement fields
   */
  defaultValues?: {
    name?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    address?: {
      line1?: string | null;
      line2?: string | null;
      city?: string | null;
      state?: string | null;
      postal_code?: string | null;
      country: string;
    };
    phone?: string | null;
  };

  /**
   * Control which additional fields to display in the AddressElement.
   */
  fields?: {
    phone?: "always" | "never" | "auto";
  };

  /**
   * Specify validation rules for the above additional fields.
   */
  validation?: {
    phone?: {
      required: "always" | "never" | "auto";
    };
  };

  /**
   * Specify display options in the AddressElement
   */
  display?: {
    name?: "full" | "split" | "organization";
  };
}

export interface Get1Point6AddressElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: "address";

  /**
   * The mode of the AddressElement that emitted this event.
   */
  elementMode: AddressMode;

  /**
   * Whether or not the AddressElement is currently empty.
   */
  empty: boolean;

  /**
   * Whether or not the AddressElement is complete.
   */
  complete: boolean;

  /**
   * Whether or not the address is new.
   */
  isNewAddress: boolean;

  /**
   * An object containing the current address.
   */
  value: {
    name: string;
    firstName?: string;
    lastName?: string;
    address: {
      line1: string;
      line2: string | null;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    phone?: string;
  };
}
