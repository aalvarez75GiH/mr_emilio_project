const warehousesCatalogData = [
  {
    id: "athens-store",

    warehouse_name: "Mr Emilio Athens Store",

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

    physical_address: "2159 W Broad St, Athens, GA 30606",

    geo: {
      formatted_address: "2159 W Broad St, Athens, GA 30606, USA",

      place_id: "ChIJgfXxOGlt9ogRShhT0u26OW4",

      location_type: "ROOFTOP",

      lat: 33.9499447,
      lng: -83.4071522,

      address_components: [
        {
          long_name: "2159",
          short_name: "2159",
          types: ["street_number"],
        },
        {
          long_name: "West Broad Street",
          short_name: "W Broad St",
          types: ["route"],
        },
        {
          long_name: "Athens",
          short_name: "Athens",
          types: ["locality", "political"],
        },
        {
          long_name: "Clarke County",
          short_name: "Clarke County",
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
          long_name: "30606",
          short_name: "30606",
          types: ["postal_code"],
        },
        {
          long_name: "3545",
          short_name: "3545",
          types: ["postal_code_suffix"],
        },
      ],
    },

    warehouse_information: {
      phone: "(706) 612-4602",
      email: "",

      opening_time: "9:00 AM",
      closing_time: "8:00 PM",

      representative: {
        name: "Test Manager",
        phone_number: "(706) 123-4567",
        email: "athens@example.com",
      },
    },

    fulfillment: {
      pickup: {
        enabled: true,

        preparationTimeMinutes: 20,

        /**
         * Pickup distance is advisory only.
         *
         * Customers farther than thresholdMiles are warned that the selected
         * store is unusually far away, but they are still allowed to continue
         * checkout with that store.
         */
        distanceWarning: {
          enabled: true,
          thresholdMiles: 20,
        },
      },

      localDelivery: {
        enabled: true,

        /**
         * This is a hard eligibility limit for local delivery.
         * Customers outside this radius may still order for pickup.
         */
        radiusMiles: 20,

        estimatedTimeMinutes: {
          minimum: 30,
          maximum: 120,
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
        stock: 3,
        sellingPriceInCents: 1599,
        active: true,
      },

      "suero-llanero": {
        stock: 0,
        sellingPriceInCents: 649,
        active: true,
      },

      "queso-blanco-small": {
        stock: 7,
        sellingPriceInCents: 1099,
        active: true,
      },

      "queso-blanco-large": {
        stock: 2,
        sellingPriceInCents: 3499,
        active: true,
      },

      "queso-gouda-small": {
        stock: 8,
        sellingPriceInCents: 1099,
        active: true,
      },

      "queso-gouda-large": {
        stock: 1,
        sellingPriceInCents: 3499,
        active: true,
      },

      arequipe: {
        stock: 4,
        sellingPriceInCents: 799,
        active: true,
      },

      "crema-venezolana": {
        stock: 0,
        sellingPriceInCents: 599,
        active: true,
      },
    },
  },

  {
    id: "main-warehouse-cumming",

    warehouse_name: "Mr Emilio Official Store",

    active: true,

    status: "open",

    physical_address: "6650 Cold Stream Dr, Cumming, GA 30040",

    geo: {
      formatted_address: "6650 Cold Stream Dr, Cumming, GA 30040, USA",

      place_id: "ChIJSUsS3lyb9YgRhlne6vEJqao",

      location_type: "ROOFTOP",

      lat: 34.173973,
      lng: -84.1764216,

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
        {
          long_name: "1279",
          short_name: "1279",
          types: ["postal_code_suffix"],
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

        preparationTimeMinutes: 30,

        /**
         * Pickup distance is advisory only.
         *
         * Customers farther than thresholdMiles are warned that the selected
         * store is unusually far away, but they are still allowed to continue
         * checkout with that store.
         */
        distanceWarning: {
          enabled: true,
          thresholdMiles: 20,
        },
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

  {
    id: "west-side-store",

    warehouse_name: "Mr Emilio Store - West Side",

    active: false,

    status: "open",

    physical_address: "265 Auburn Parkway, Athens, GA 30606",

    geo: {
      formatted_address: "265 Auburn Parkway, Athens, GA 30606, USA",

      place_id: "ChIJmTBAOe9y9ogRwiL8lw2oGQc",

      location_type: "ROOFTOP",

      lat: 33.9504944,
      lng: -83.4521229,

      address_components: [
        {
          long_name: "265",
          short_name: "265",
          types: ["street_number"],
        },
        {
          long_name: "Auburn Parkway",
          short_name: "Auburn Parkway",
          types: ["route"],
        },
        {
          long_name: "Athens",
          short_name: "Athens",
          types: ["locality", "political"],
        },
        {
          long_name: "Clarke County",
          short_name: "Clarke County",
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
          long_name: "30606",
          short_name: "30606",
          types: ["postal_code"],
        },
        {
          long_name: "1978",
          short_name: "1978",
          types: ["postal_code_suffix"],
        },
      ],
    },

    warehouse_information: {
      phone: "(706) 555-0182",
      email: "",

      opening_time: "9:00 AM",
      closing_time: "8:00 PM",

      representative: {
        name: "West Side Manager",
        phone_number: "(706) 555-0199",
        email: "west_side@mremilio.com",
      },
    },

    fulfillment: {
      pickup: {
        enabled: true,

        preparationTimeMinutes: 15,

        /**
         * Pickup distance is advisory only.
         *
         * Customers farther than thresholdMiles are warned that the selected
         * store is unusually far away, but they are still allowed to continue
         * checkout with that store.
         */
        distanceWarning: {
          enabled: true,
          thresholdMiles: 20,
        },
      },

      localDelivery: {
        enabled: true,

        /**
         * This is a hard eligibility limit for local delivery.
         * Customers outside this radius may still order for pickup.
         */
        radiusMiles: 15,

        estimatedTimeMinutes: {
          minimum: 20,
          maximum: 90,
        },

        provider: {
          type: "internal",
          name: "Mr. Emilio",
        },
      },
    },

    inventory: {
      tequenos: {
        stock: 20,
        sellingPriceInCents: 1599,
        active: true,
      },

      "suero-llanero": {
        stock: 18,
        sellingPriceInCents: 649,
        active: true,
      },
    },
  },
];

module.exports = warehousesCatalogData;
