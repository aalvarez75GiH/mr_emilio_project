const PRODUCT_BENEFIT_TYPES = Object.freeze({
  KEEP_FROZEN: "keepFrozen",
  KEEP_REFRIGERATED: "keepRefrigerated",
  READY_TO_COOK: "readyToCook",
  READY_TO_SERVE: "readyToServe",
  FAMILY_SIZE: "familySize",
  SNACK_FAVORITE: "snackFavorite",
  BREAKFAST_FAVORITE: "breakfastFavorite",
  VENEZUELAN_STYLE: "venezuelanStyle",
  VENEZUELAN_FAVORITE: "venezuelanFavorite",
  CARAMEL_SPREAD: "caramelSpread",
  HIGH_PROTEIN: "highProtein",
  PERFECT_FOR_GRILLING: "perfectForGrilling",
  KIDS_FAVORITE: "kidsFavorite",
  PARTY_FAVORITE: "partyFavorite",
  PIECE_COUNT: "pieceCount",
});

const PRODUCT_BENEFIT_VALUES = Object.freeze(
  Object.values(PRODUCT_BENEFIT_TYPES)
);

module.exports = {
  PRODUCT_BENEFIT_TYPES,
  PRODUCT_BENEFIT_VALUES,
};
