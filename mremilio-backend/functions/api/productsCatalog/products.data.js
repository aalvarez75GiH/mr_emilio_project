const productsCatalogData = [
  {
    id: "tequenos",
    slug: "tequenos",

    product_name: {
      en: "Venezuelan Tequeños",
      es: "Tequeños Venezolanos",
    },

    description: {
      en: "Precooked cheese sticks",
      es: "Palitos de queso precocidos",
    },

    category: "frozen-food",

    size: {
      value: 20,
      unit: "piece",
    },

    stockUnit: "package",

    manufacturerPriceInCents: 1299,
    tax: {
      stripeTaxCode: "txcd_40040000",
      behavior: "exclusive",
    },

    image: {
      url: "",
      storagePath: "products/tequenos.png",

      alt: {
        en: "Mr. Emilio Venezuelan tequeños",
        es: "Tequeños venezolanos Mr. Emilio",
      },
    },

    presentation: {
      imageScale: 1.08,
      imageOffsetX: 0,
      imageOffsetY: 8,
    },

    benefits: [
      {
        type: "keepFrozen",
      },
      {
        type: "readyToCook",
      },
      {
        type: "pieceCount",
        value: 20,
      },
    ],

    reviewSummary: {
      average: 5,
      count: 120,
    },

    badge: "bestSeller",

    merchandising: {
      featured: true,
      showOnHomepage: true,
      homepageOrder: 1,
      catalogOrder: 1,
    },

    active: true,
  },

  {
    id: "suero-llanero",
    slug: "suero-llanero",

    product_name: {
      en: "Llanero Whey",
      es: "Suero Llanero",
    },

    description: {
      en: "Salted and sour Venezuelan-style cream",
      es: "Crema salada y ácida al estilo venezolano",
    },

    category: "refrigerated-dairy",

    size: {
      value: 28,
      unit: "oz",
    },

    stockUnit: "unit",

    manufacturerPriceInCents: 549,
    tax: {
      stripeTaxCode: "txcd_40040000",
      behavior: "exclusive",
    },

    image: {
      url: "",
      storagePath: "products/suero.png",

      alt: {
        en: "Mr. Emilio Llanero Whey",
        es: "Suero Llanero Mr. Emilio",
      },
    },

    presentation: {
      imageScale: 1.18,
      imageOffsetX: 0,
      imageOffsetY: 4,
    },

    benefits: [
      {
        type: "keepRefrigerated",
      },
      {
        type: "venezuelanStyle",
      },
      {
        type: "readyToServe",
      },
    ],

    reviewSummary: {
      average: 4.7,
      count: 120,
    },

    badge: "bestSeller",

    merchandising: {
      featured: true,
      showOnHomepage: true,
      homepageOrder: 2,
      catalogOrder: 2,
    },

    active: true,
  },

  {
    id: "queso-blanco-small",
    slug: "queso-blanco-small",

    product_name: {
      en: "White Cheese — Small",
      es: "Queso Blanco — Pequeño",
    },

    description: {
      en: "Small Venezuelan-style white cheese",
      es: "Queso blanco pequeño al estilo venezolano",
    },

    category: "refrigerated-cheese",

    size: {
      value: 1.5,
      unit: "lb",
    },

    stockUnit: "unit",

    manufacturerPriceInCents: 899,
    tax: {
      stripeTaxCode: "txcd_40040000",
      behavior: "exclusive",
    },

    image: {
      url: "",
      storagePath: "products/small_white_queso.png",

      alt: {
        en: "Mr. Emilio small white cheese",
        es: "Queso blanco pequeño Mr. Emilio",
      },
    },

    presentation: {
      imageScale: 1.04,
      imageOffsetX: 0,
      imageOffsetY: 6,
    },

    benefits: [
      {
        type: "keepRefrigerated",
      },
      {
        type: "venezuelanStyle",
      },
      {
        type: "breakfastFavorite",
      },
    ],

    reviewSummary: {
      average: 4.9,
      count: 120,
    },

    badge: "bestSeller",

    merchandising: {
      featured: true,
      showOnHomepage: true,
      homepageOrder: 3,
      catalogOrder: 3,
    },

    active: true,
  },

  {
    id: "queso-blanco-large",
    slug: "queso-blanco-large",

    product_name: {
      en: "White Cheese — Large",
      es: "Queso Blanco — Grande",
    },

    description: {
      en: "Large Venezuelan-style white cheese",
      es: "Queso blanco grande al estilo venezolano",
    },

    category: "refrigerated-cheese",

    size: {
      value: 6,
      unit: "lb",
    },

    stockUnit: "unit",

    manufacturerPriceInCents: 2899,
    tax: {
      stripeTaxCode: "txcd_40040000",
      behavior: "exclusive",
    },

    image: {
      url: "",
      // Large White Cheese
      storagePath: "products/big_white_queso.png",

      alt: {
        en: "Mr. Emilio large white cheese",
        es: "Queso blanco grande Mr. Emilio",
      },
    },

    presentation: {
      imageScale: 1.12,
      imageOffsetX: 0,
      imageOffsetY: 2,
    },

    benefits: [
      {
        type: "keepRefrigerated",
      },
      {
        type: "venezuelanStyle",
      },
      {
        type: "familySize",
      },
    ],

    reviewSummary: {
      average: 4.9,
      count: 120,
    },

    badge: "familyFavorite",

    merchandising: {
      featured: true,
      showOnHomepage: true,
      homepageOrder: 4,
      catalogOrder: 4,
    },

    active: true,
  },

  {
    id: "queso-gouda-small",
    slug: "queso-gouda-small",

    product_name: {
      en: "Gouda Cheese — Small",
      es: "Queso Gouda — Pequeño",
    },

    description: {
      en: "Small Gouda-style cheese",
      es: "Queso estilo Gouda en presentación pequeña",
    },

    category: "refrigerated-cheese",

    size: {
      value: 1.5,
      unit: "lb",
    },

    stockUnit: "unit",

    manufacturerPriceInCents: 899,
    tax: {
      stripeTaxCode: "txcd_40040000",
      behavior: "exclusive",
    },

    image: {
      url: "",
      // Small Gouda
      storagePath: "products/small_gouda_queso.png",

      alt: {
        en: "Mr. Emilio small Gouda cheese",
        es: "Queso Gouda pequeño Mr. Emilio",
      },
    },

    presentation: {
      imageScale: 1.02,
      imageOffsetX: 0,
      imageOffsetY: 4,
    },

    benefits: [
      {
        type: "keepRefrigerated",
      },
      {
        type: "readyToServe",
      },
      {
        type: "breakfastFavorite",
      },
    ],

    reviewSummary: {
      average: 5,
      count: 120,
    },

    badge: "familyFavorite",

    merchandising: {
      featured: true,
      showOnHomepage: true,
      homepageOrder: 5,
      catalogOrder: 5,
    },

    active: true,
  },

  {
    id: "queso-gouda-large",
    slug: "queso-gouda-large",

    product_name: {
      en: "Gouda Cheese — Large",
      es: "Queso Gouda — Grande",
    },

    description: {
      en: "Large Gouda-style cheese",
      es: "Queso estilo Gouda en presentación grande",
    },

    category: "refrigerated-cheese",

    size: {
      value: 6,
      unit: "lb",
    },

    stockUnit: "unit",

    manufacturerPriceInCents: 2899,
    tax: {
      stripeTaxCode: "txcd_40040000",
      behavior: "exclusive",
    },

    image: {
      url: "",
      // Large Gouda
      storagePath: "products/big_gouda_queso.png",

      alt: {
        en: "Mr. Emilio large Gouda cheese",
        es: "Queso Gouda grande Mr. Emilio",
      },
    },

    presentation: {
      imageScale: 1.12,
      imageOffsetX: 0,
      imageOffsetY: 2,
    },

    benefits: [
      {
        type: "keepRefrigerated",
      },
      {
        type: "familySize",
      },
      {
        type: "partyFavorite",
      },
    ],

    reviewSummary: {
      average: 4.8,
      count: 120,
    },

    badge: "bestSeller",

    merchandising: {
      featured: true,
      showOnHomepage: true,
      homepageOrder: 6,
      catalogOrder: 6,
    },

    active: true,
  },

  {
    id: "arequipe",
    slug: "arequipe",

    product_name: {
      en: "Caramel Spread",
      es: "Arequipe",
    },

    description: {
      en: "Venezuelan-style milk caramel spread",
      es: "Crema de caramelo con leche al estilo venezolano",
    },

    category: "spreads",

    size: {
      value: 15,
      unit: "oz",
    },

    stockUnit: "unit",

    manufacturerPriceInCents: 649,
    tax: {
      stripeTaxCode: "txcd_40040000",
      behavior: "exclusive",
    },

    image: {
      url: "",
      // Arequipe
      storagePath: "products/arequipe.png",

      alt: {
        en: "Mr. Emilio Venezuelan caramel spread",
        es: "Arequipe venezolano Mr. Emilio",
      },
    },

    presentation: {
      imageScale: 1.12,
      imageOffsetX: 0,
      imageOffsetY: 10,
    },

    benefits: [
      {
        type: "readyToServe",
      },
      {
        type: "caramelSpread",
      },
      {
        type: "venezuelanFavorite",
      },
    ],

    reviewSummary: {
      average: 4.9,
      count: 120,
    },

    badge: "limited",

    merchandising: {
      featured: true,
      showOnHomepage: true,
      homepageOrder: 7,
      catalogOrder: 7,
    },

    active: true,
  },

  {
    id: "crema-venezolana",
    slug: "crema-venezolana",

    product_name: {
      en: "Venezuelan Cream",
      es: "Crema Venezolana",
    },

    description: {
      en: "Salted Venezuelan-style sour cream",
      es: "Crema agria salada al estilo venezolano",
    },

    category: "refrigerated-dairy",

    size: {
      value: 8.5,
      unit: "oz",
    },

    stockUnit: "unit",

    manufacturerPriceInCents: 499,
    tax: {
      stripeTaxCode: "txcd_40040000",
      behavior: "exclusive",
    },

    image: {
      url: "",
      // Crema Venezolana
      storagePath: "products/crema.png",

      alt: {
        en: "Mr. Emilio Venezuelan cream",
        es: "Crema venezolana Mr. Emilio",
      },
    },

    presentation: {
      imageScale: 1.08,
      imageOffsetX: 0,
      imageOffsetY: 6,
    },

    benefits: [
      {
        type: "keepRefrigerated",
      },
      {
        type: "venezuelanStyle",
      },
      {
        type: "breakfastFavorite",
      },
    ],

    reviewSummary: {
      average: 4.5,
      count: 120,
    },

    badge: "limited",

    merchandising: {
      featured: true,
      showOnHomepage: true,
      homepageOrder: 8,
      catalogOrder: 8,
    },

    active: true,
  },
];

module.exports = productsCatalogData;
