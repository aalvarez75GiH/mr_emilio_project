import arequipeImage from "../../../assets/shop_products_carousel/arequipe.png";
import tequenosImage from "../../../assets/shop_products_carousel/tequenos.png";
import quesoBlancoImage from "../../../assets/shop_products_carousel/small_white_queso.png";
import cremaVenezolanaImage from "../../../assets/shop_products_carousel/crema.png";
import sueroLlaneroImage from "../../../assets/shop_products_carousel/suero.png";
import quesoGoudaImage from "../../../assets/shop_products_carousel/small_gouda_queso.png";
import bigQuesoGoudaImage from "../../../assets/shop_products_carousel/big_gouda_queso.png";
import bigQuesoBlancoImage from "../../../assets/shop_products_carousel/big_white_queso.png";

export const shopProductsCarouselData = [
  {
    id: "tequenos",
    product_name: {
      en: "Venezuelan tequeños",
      es: "Tequeños venezolanos",
    },
    description: "Precooked Cheese Sticks",
    size: "20 units",

    stock: 10,
    stockUnit: "count",

    price: 12.99,
    priceLabel: "$12.99",

    image: tequenosImage,
    alt: "Mr. Emilio Tequeños cheese sticks",

    imageScale: 1.08,
    imageOffsetX: 0,
    imageOffsetY: 8,

    href: "/products/tequenos",

    review: {
      average: 5,
      count: 120,
    },

    badge: "Best Seller",

    quantityHighlight: "20 units",

    benefits: [
      {
        id: "storage",
        label: "Keep Frozen",
        icon: "snowflake",
      },
      {
        id: "preparation",
        label: "Ready to Cook",
        icon: "clock",
      },
      {
        id: "quantity",
        label: "20 Pieces",
        icon: "package",
      },
    ],
  },
  {
    id: "suero-llanero",
    product_name: {
      en: "Llanero Whey",
      es: "Suero Llanero",
    },
    description: "Salted and Sour Soft Cream",
    size: "28 oz",

    stock: 9,
    stockUnit: "units",

    price: 5.49,
    priceLabel: "$5.49",

    image: sueroLlaneroImage,
    alt: "Mr. Emilio Suero Llanero",

    imageScale: 1.18,
    imageOffsetX: 0,
    imageOffsetY: 4,

    href: "/products/suero-llanero",

    review: {
      average: 4.7,
      count: 120,
    },

    badge: "Best Seller",

    quantityHighlight: "28 oz",

    benefits: [
      {
        id: "storage",
        label: "Keep Refrigerated",
        icon: "snowflake",
      },
      {
        id: "style",
        label: "Venezuelan Style",
        icon: "heart",
      },
      {
        id: "serving",
        label: "Ready to Serve",
        icon: "clock",
      },
    ],
  },
  {
    id: "queso-blanco",
    product_name: {
      en: "White cheese (small)",
      es: "Queso blanco (pequeño)",
    },
    description: "Small White Cheese",
    size: "1.5 lb",

    stock: 12,
    stockUnit: "units",

    price: 8.99,
    priceLabel: "$8.99 / lb",

    image: quesoBlancoImage,
    alt: "Mr. Emilio small Queso Blanco",

    imageScale: 1.04,
    imageOffsetX: 0,
    imageOffsetY: 6,

    href: "/products/queso-blanco",

    review: {
      average: 4.9,
      count: 120,
    },

    badge: "Best Seller",

    quantityHighlight: "1.5 lb",

    benefits: [
      {
        id: "storage",
        label: "Keep Refrigerated",
        icon: "snowflake",
      },
      {
        id: "weight",
        label: "Sell by Weight",
        icon: "scale",
      },
      {
        id: "style",
        label: "Venezuelan Style",
        icon: "heart",
      },
    ],
  },
  {
    id: "big-queso-blanco",
    product_name: {
      en: "White Cheese (large)",
      es: "Queso Blanco (grande)",
    },
    description: "Large White Cheese",
    size: "6 lb",

    stock: 4,
    stockUnit: "units",

    price: 28.99,
    priceLabel: "$28.99",

    image: bigQuesoBlancoImage,
    alt: "Mr. Emilio large Queso Blanco",

    imageScale: 1.12,
    imageOffsetX: 0,
    imageOffsetY: 2,

    href: "/products/big-queso-blanco",

    review: {
      average: 4.9,
      count: 120,
    },

    badge: "Family Favorite",

    quantityHighlight: "6 lb",

    benefits: [
      {
        id: "storage",
        label: "Keep Refrigerated",
        icon: "snowflake",
      },
      {
        id: "weight",
        label: "Sell by Weight",
        icon: "scale",
      },
      {
        id: "style",
        label: "Venezuelan Style",
        icon: "heart",
      },
    ],
  },
  {
    id: "queso-gouda",
    product_name: {
      en: "Gouda Cheese Small)",
      es: "Queso Gouda (pequeño)",
    },
    description: "Small Gouda Cheese",
    size: "1.5 lb",

    stock: 0,
    stockUnit: "units",

    price: 8.99,
    priceLabel: "$8.99 / lb",

    image: quesoGoudaImage,
    alt: "Mr. Emilio small Queso Gouda",

    imageScale: 1.02,
    imageOffsetX: 0,
    imageOffsetY: 4,

    href: "/products/queso-gouda",

    review: {
      average: 5,
      count: 120,
    },

    badge: "Family Favorite",

    quantityHighlight: "1.5 lb",

    benefits: [
      {
        id: "storage",
        label: "Keep Refrigerated",
        icon: "snowflake",
      },
      {
        id: "weight",
        label: "Sell by Weight",
        icon: "scale",
      },
      {
        id: "style",
        label: "Venezuelan Style",
        icon: "heart",
      },
    ],
  },
  {
    id: "big-queso-gouda",
    product_name: {
      en: "Gouda Cheese (large)",
      es: "Queso Gouda (grande)",
    },
    description: "Large Gouda Cheese",
    size: "6 lb",

    stock: 5,
    stockUnit: "units",

    price: 28.99,
    priceLabel: "$28.99",

    image: bigQuesoGoudaImage,
    alt: "Mr. Emilio large Queso Gouda",

    imageScale: 1.12,
    imageOffsetX: 0,
    imageOffsetY: 2,

    href: "/products/big-queso-gouda",

    review: {
      average: 4.8,
      count: 120,
    },

    badge: "Best Seller",

    quantityHighlight: "6 lb",

    benefits: [
      {
        id: "storage",
        label: "Keep Refrigerated",
        icon: "snowflake",
      },
      {
        id: "weight",
        label: "Sell by Weight",
        icon: "scale",
      },
      {
        id: "style",
        label: "Venezuelan Style",
        icon: "heart",
      },
    ],
  },
  {
    id: "arequipe",
    product_name: {
      en: "Caramel spread",
      es: "Arequipe",
    },
    description: "Venezuelan Caramel Spread",
    size: "15 oz",

    stock: 14,
    stockUnit: "units",

    price: 6.49,
    priceLabel: "$6.49",

    image: arequipeImage,
    alt: "Mr. Emilio Arequipe caramel spread",

    imageScale: 1.12,
    imageOffsetX: 0,
    imageOffsetY: 10,

    href: "/products/arequipe",

    review: {
      average: 4.9,
      count: 120,
    },

    badge: "Limited",
    quantityHighlight: "15 oz",

    benefits: [
      {
        id: "serving",
        label: "Ready to Serve",
        icon: "clock",
      },
      {
        id: "type",
        label: "Caramel Spread",
        icon: "package",
      },
      {
        id: "style",
        label: "Venezuelan Favorite",
        icon: "heart",
      },
    ],
  },

  {
    id: "crema-venezolana",
    product_name: {
      en: "Venezuelan Cream",
      es: "Crema Venezolana",
    },
    description: "Salted Sour Cream",
    size: "8.5 oz",

    stock: 6,
    stockUnit: "units",

    price: 4.99,
    priceLabel: "$4.99",

    image: cremaVenezolanaImage,
    alt: "Mr. Emilio Crema Venezolana",

    imageScale: 1.08,
    imageOffsetX: 0,
    imageOffsetY: 6,

    href: "/products/crema-venezolana",

    review: {
      average: 4.5,
      count: 120,
    },

    badge: "Limited",

    quantityHighlight: "8.5 oz",

    benefits: [
      {
        id: "storage",
        label: "Keep Refrigerated",
        icon: "snowflake",
      },
      {
        id: "style",
        label: "Venezuelan Style",
        icon: "heart",
      },
      {
        id: "serving",
        label: "Ready to Serve",
        icon: "clock",
      },
    ],
  },
];

export const productsCatalog = [
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

    image: {
      url: "",
      storagePath: "",
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
        id: "storage",
        type: "keepFrozen",
        icon: "snowflake",
      },
      {
        id: "preparation",
        type: "readyToCook",
        icon: "clock",
      },
      {
        id: "quantity",
        type: "pieceCount",
        icon: "package",
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
];
