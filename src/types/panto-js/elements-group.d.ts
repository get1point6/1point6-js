import {
  PantoPaymentElement,
  PantoPaymentElementOptions,
  PantoAddressElement,
  PantoAddressElementOptions,
} from "./elements";

import { PantoError } from "./panto";
export interface PantoElements {
  /////////////////////////////
  /// payment
  /////////////////////////////

  /**
   * Creates a `PaymentElement`.
   *
   * @docs //TODO: ADD DOC
   */
  create(
    elementType: "payment",
    options?: PantoPaymentElementOptions
  ): Promise<PantoPaymentElement>;

  /**
   * Looks up a previously created `Element` by its type.
   */
  // getElement(elementType: "payment"): PantoPaymentElement | null;

  /////////////////////////////
  /// address
  /////////////////////////////

  /**
   * Creates an `AddressElement`.
   */
  create(
    elementType: "address",
    options: PantoAddressElementOptions
  ): Promise<PantoAddressElement>;

  /**
   * Looks up a previously created `Element` by its type.
   */
  // getElement(elementType: "address"): PantoAddressElement | null;
}

export interface PantoElementsOptionsClientSecret
  extends BasePantoElementsOptions {
  /**
   * The client secret for a PaymentIntent or SetupIntent used by the Payment Element.
   *
   * @docs // TODO: ADD DOC
   */
  clientSecret?: string;

  /**
   * Either use mode or clientSecret when creating an Elements group
   */
  mode?: never;
}

export type PantoElementLocale =
  | "auto"
  | "ar"
  | "bg"
  | "cs"
  | "da"
  | "de"
  | "el"
  | "en"
  | "en-AU"
  | "en-CA"
  | "en-NZ"
  | "en-GB"
  | "es"
  | "es-ES"
  | "es-419"
  | "et"
  | "fi"
  | "fil"
  | "fr"
  | "fr-CA"
  | "fr-FR"
  | "he"
  | "hu"
  | "hr"
  | "id"
  | "it"
  | "it-IT"
  | "ja"
  | "ko"
  | "lt"
  | "lv"
  | "ms"
  | "mt"
  | "nb"
  | "nl"
  | "no"
  | "pl"
  | "pt"
  | "pt-BR"
  | "ro"
  | "ru"
  | "sk"
  | "sl"
  | "sv"
  | "th"
  | "tr"
  | "vi"
  | "zh"
  | "zh-HK"
  | "zh-TW";

/**
 * Options to create an `Elements` instance with.
 */
export interface BasePantoElementsOptions {
  /**
   * An array of custom fonts, which elements created from the `Elements` object can use.
   */
  fonts?: Array<CssFontSource | CustomFontSource>;

  /**
   * The [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the locale to display placeholders and error strings in.
   * Default is `auto` (Panto detects the locale of the browser).
   * Setting the locale does not affect the behavior of postal code validation—a valid postal code for the billing country of the card is still required.
   */
  locale?: PantoElementLocale;
  /**
   * Match the Payment Element with the design of your site with the appearance option.
   * The layout of the Payment Element stays consistent, but you can modify colors, fonts, borders, padding, and more.
   *
   * @docs // TODO: ADD DOC
   */
  appearance?: Appearance;
}

export interface Appearance {
  theme?: "panto";
  variables?: {
    // General font styles
    fontFamily?: string;
    fontSmooth?: string;
    fontVariantLigatures?: string;
    fontVariationSettings?: string;
    fontLineHeight?: string;

    // Font sizes
    fontSizeBase?: string;
    fontSizeSm?: string;
    fontSizeXs?: string;
    fontSize2Xs?: string;
    fontSize3Xs?: string;
    fontSizeLg?: string;
    fontSizeXl?: string;

    // Font weights
    fontWeightLight?: string;
    fontWeightNormal?: string;
    fontWeightMedium?: string;
    fontWeightBold?: string;

    // Spacing
    spacingUnit?: string;
    spacingGridRow?: string;
    spacingGridColumn?: string;
    spacingTab?: string;
    spacingAccordionItem?: string;

    // Colors
    colorPrimary?: string;
    colorPrimaryText?: string;
    colorBackground?: string;
    colorBackgroundText?: string;
    colorText?: string;
    colorSuccess?: string;
    colorSuccessText?: string;
    colorDanger?: string;
    colorDangerText?: string;
    colorWarning?: string;
    colorWarningText?: string;

    // Text variations
    colorTextSecondary?: string;
    colorTextPlaceholder?: string;

    // Icons
    colorIcon?: string;
    colorIconHover?: string;
    colorIconCardError?: string;
    colorIconCardCvc?: string;
    colorIconCardCvcError?: string;
    colorIconCheckmark?: string;
    colorIconChevronDown?: string;
    colorIconChevronDownHover?: string;
    colorIconRedirect?: string;
    colorIconTab?: string;
    colorIconTabHover?: string;
    colorIconTabSelected?: string;
    colorIconTabMore?: string;
    colorIconTabMoreHover?: string;

    // Logos
    colorLogo?: string;
    colorLogoTab?: string;
    colorLogoTabSelected?: string;
    colorLogoBlock?: string;

    // Focus
    focusBoxShadow?: string;
    focusOutline?: string;

    // Radius
    borderRadius?: string;
  };
}
