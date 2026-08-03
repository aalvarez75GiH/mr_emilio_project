import { PRODUCT_BENEFITS_CONFIG } from "./products-benefits.config";
import { PRODUCT_BADGES_CONFIG } from "./products-badges.config";

const DEFAULT_LANGUAGE = "en";
const DEFAULT_CURRENCY = "USD";
const DEFAULT_LOCALE = "en-US";

export const getTranslatedField = (
  field,
  language = DEFAULT_LANGUAGE,
  fallbackLanguage = DEFAULT_LANGUAGE
) => {
  if (!field) {
    return "";
  }

  if (typeof field === "string") {
    return field;
  }

  if (typeof field !== "object" || Array.isArray(field)) {
    return "";
  }

  return (
    field[language] ||
    field[fallbackLanguage] ||
    Object.values(field).find(
      (value) => typeof value === "string" && value.trim()
    ) ||
    ""
  );
};

export const formatCentsToCurrency = (
  amountInCents,
  { locale = DEFAULT_LOCALE, currency = DEFAULT_CURRENCY } = {}
) => {
  if (!Number.isInteger(amountInCents)) {
    return "";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amountInCents / 100);
};

export const formatProductSize = (size, t) => {
  if (
    !size ||
    typeof size !== "object" ||
    !Number.isFinite(size.value) ||
    !size.unit
  ) {
    return "";
  }

  const unitTranslationKey = `products.units.${size.unit}`;

  const translatedUnit =
    typeof t === "function"
      ? t(unitTranslationKey, {
          count: size.value,
          defaultValue: size.unit,
        })
      : size.unit;

  return `${size.value} ${translatedUnit}`.trim();
};

export const resolveProductBenefit = (benefit, t) => {
  const config = PRODUCT_BENEFITS_CONFIG[benefit?.type];

  if (!config) {
    return null;
  }

  const label =
    typeof t === "function"
      ? t(config.translationKey, {
          count: benefit.value,
          value: benefit.value,
        })
      : benefit.type;

  return {
    type: benefit.type,
    icon: config.icon,
    label,
    value: benefit.value,
  };
};

export const resolveProductBadge = (badgeType, t) => {
  if (!badgeType) {
    return "";
  }

  const config = PRODUCT_BADGES_CONFIG[badgeType];

  if (!config) {
    return badgeType;
  }

  return typeof t === "function" ? t(config.translationKey) : badgeType;
};

export const resolveProductBenefits = (benefits = [], t) => {
  if (!Array.isArray(benefits)) {
    return [];
  }

  return benefits
    .map((benefit) => resolveProductBenefit(benefit, t))
    .filter(Boolean);
};

export const normalizeProduct = (
  product,
  {
    language = DEFAULT_LANGUAGE,
    locale = DEFAULT_LOCALE,
    currency = DEFAULT_CURRENCY,
    t,
  } = {}
) => {
  if (!product || typeof product !== "object") {
    return null;
  }

  const manufacturerPriceInCents = Number.isInteger(
    product.manufacturerPriceInCents
  )
    ? product.manufacturerPriceInCents
    : null;

  const productName = getTranslatedField(product.product_name, language);

  const description = getTranslatedField(product.description, language);

  const imageAlt = getTranslatedField(product.image?.alt, language);

  const sizeLabel = formatProductSize(product.size, t);

  const badgeLabel = resolveProductBadge(product.badge, t);

  return {
    ...product,

    active: product.active === true,

    productName,
    name: productName,
    description,

    sizeLabel,

    manufacturerPriceInCents,

    manufacturerPrice:
      manufacturerPriceInCents !== null ? manufacturerPriceInCents / 100 : null,

    manufacturerPriceLabel:
      manufacturerPriceInCents !== null
        ? formatCentsToCurrency(manufacturerPriceInCents, {
            locale,
            currency,
          })
        : "",

    image: product.image?.url || "",
    imageUrl: product.image?.url || "",
    imageStoragePath: product.image?.storagePath || "",
    alt: imageAlt,

    imageScale: product.presentation?.imageScale ?? 1,
    imageOffsetX: product.presentation?.imageOffsetX ?? 0,
    imageOffsetY: product.presentation?.imageOffsetY ?? 0,

    benefits: resolveProductBenefits(product.benefits, t),

    review: {
      average: product.reviewSummary?.average ?? 0,
      count: product.reviewSummary?.count ?? 0,
    },

    badgeType: product.badge || null,
    badgeLabel,

    href: product.slug
      ? `/products/${product.slug}`
      : `/products/${product.id}`,

    featured: product.merchandising?.featured ?? false,
    showOnHomepage: product.merchandising?.showOnHomepage ?? false,

    homepageOrder:
      product.merchandising?.homepageOrder ?? Number.MAX_SAFE_INTEGER,

    catalogOrder:
      product.merchandising?.catalogOrder ?? Number.MAX_SAFE_INTEGER,
  };
};

export const normalizeProducts = (products = [], options = {}) => {
  if (!Array.isArray(products)) {
    return [];
  }

  return products
    .map((product) => normalizeProduct(product, options))
    .filter(Boolean);
};

export const getHomepageProducts = (products = []) =>
  products
    .filter(
      (product) => product.active === true && product.showOnHomepage === true
    )
    .sort(
      (productA, productB) => productA.homepageOrder - productB.homepageOrder
    );

export const getCatalogProducts = (products = []) =>
  products
    .filter((product) => product.active === true)
    .sort(
      (productA, productB) => productA.catalogOrder - productB.catalogOrder
    );
