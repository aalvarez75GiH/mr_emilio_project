const warehousesCatalogData = [
  {
    id: "main-warehouse-cumming",

    warehouse_name: "Main Warehouse",

    active: true,

    /**
     * active:
     *   Controls whether the warehouse participates in warehouse selection.
     *
     * status:
     *   Controls its current operational availability.
     *
     * An active warehouse may be temporarily closed without being removed
     * from the warehouse network.
     */
    status: "open",

    physical_address: "6650 Cold Stream Dr, Cumming, GA 30040",

    geo: {
      formatted_address: "6650 Cold Stream Dr, Cumming, GA 30040, USA",

      place_id: "",

      location_type: "ROOFTOP",

      lat: 34.1739787,
      lng: -84.1764214,

      address_components: [
        {
          long_name: "6650",
          short_name: "6650",
          types: ["street_number"],
        },
        {
          long_name: "Cold Stream Drive",
          short_name: "Cold Stream Dr",
          types: ["route"],
        },
        {
          long_name: "Cumming",
          short_name: "Cumming",
          types: ["locality", "political"],
        },
        {
          long_name: "Forsyth County",
          short_name: "Forsyth County",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Georgia",
          short_name: "GA",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "United States",
          short_name: "US",
          types: ["country", "political"],
        },
        {
          long_name: "30040",
          short_name: "30040",
          types: ["postal_code"],
        },
      ],
    },

    warehouse_information: {
      phone: "(706) 612-4602",
      email: "",

      opening_time: "12:00 AM",
      closing_time: "12:00 PM",

      representative: {
        name: "Ruben Mejia",
        phone_number: "(706) 123-4567",
        email: "ruben@yahoo.com",
      },
    },

    fulfillment: {
      pickup: {
        enabled: true,

        /**
         * Pickup remains possible even when the customer lives more than
         * 20 miles away. Distance is presented as a warning, not used as
         * a hard pickup restriction.
         */
        preparationTimeMinutes: 30,
      },

      localDelivery: {
        enabled: true,

        /**
         * This is a hard eligibility limit for local delivery.
         * Customers outside this radius may still order for pickup.
         */
        radiusMiles: 20,

        estimatedTimeMinutes: {
          minimum: 45,
          maximum: 240,
        },

        provider: {
          type: "internal",
          name: "Mr. Emilio",
        },
      },
    },

    /**
     * Every inventory key matches a document ID in productsCatalog.
     *
     * Product metadata is not duplicated here.
     *
     * The inventory entry owns:
     * - warehouse stock;
     * - warehouse selling price;
     * - whether this warehouse currently offers the product.
     */
    inventory: {
      tequenos: {
        stock: 10,
        sellingPriceInCents: 1494,
        active: true,
      },

      "suero-llanero": {
        stock: 9,
        sellingPriceInCents: 631,
        active: true,
      },

      "queso-blanco-small": {
        stock: 12,
        sellingPriceInCents: 1034,
        active: true,
      },

      "queso-blanco-large": {
        stock: 4,
        sellingPriceInCents: 3334,
        active: true,
      },

      "queso-gouda-small": {
        stock: 0,
        sellingPriceInCents: 1034,

        /**
         * An active inventory entry with stock 0 remains visible and is
         * presented as sold out.
         */
        active: true,
      },

      "queso-gouda-large": {
        stock: 5,
        sellingPriceInCents: 3334,
        active: true,
      },

      arequipe: {
        stock: 14,
        sellingPriceInCents: 746,
        active: true,
      },

      "crema-venezolana": {
        stock: 6,
        sellingPriceInCents: 574,
        active: true,
      },
    },
  },
];

module.exports = warehousesCatalogData;
