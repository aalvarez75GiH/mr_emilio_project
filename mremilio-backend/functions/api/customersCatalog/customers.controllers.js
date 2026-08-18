/* eslint-disable */

const { randomUUID } = require("crypto");

const firebaseController = require("../../fb");

const CUSTOMERS_COLLECTION = "customersCatalog";

const CUSTOMER_ACCOUNT_STATUSES = {
  GUEST: "guest",
  REGISTERED: "registered",
};

const normalizeString = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const normalizeEmail = (email) => {
  return normalizeString(email).toLowerCase();
};

const normalizePhone = (phone) => {
  return normalizeString(phone);
};

const normalizeCoordinates = (coordinates) => {
  if (!coordinates || typeof coordinates !== "object") {
    return null;
  }

  const lat = Number(coordinates.lat);
  const lng = Number(coordinates.lng);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return {
    lat,
    lng,
  };
};

const normalizeDeliveryAddress = (address) => {
  if (!address || typeof address !== "object" || Array.isArray(address)) {
    return null;
  }

  const normalizedAddress = {
    street: normalizeString(address.street),
    unit: normalizeString(address.unit),
    city: normalizeString(address.city),
    state: normalizeString(address.state),
    postalCode: normalizeString(address.postalCode),
    formattedAddress: normalizeString(address.formattedAddress),
    placeId: normalizeString(address.placeId),
    coordinates: normalizeCoordinates(address.coordinates),
  };

  if (
    !normalizedAddress.street ||
    !normalizedAddress.city ||
    !normalizedAddress.state ||
    !normalizedAddress.postalCode
  ) {
    return null;
  }

  return normalizedAddress;
};

const validateCustomerPayload = (customer) => {
  if (!customer || typeof customer !== "object" || Array.isArray(customer)) {
    throw new Error("Customer information is required");
  }

  const firstName = normalizeString(customer.firstName);
  const lastName = normalizeString(customer.lastName);
  const email = normalizeEmail(customer.email);
  const phone = normalizePhone(customer.phone);

  if (!firstName) {
    throw new Error("Customer first name is required");
  }

  if (!lastName) {
    throw new Error("Customer last name is required");
  }

  if (!email) {
    throw new Error("Customer email is required");
  }

  if (!phone) {
    throw new Error("Customer phone is required");
  }

  return {
    firstName,
    lastName,
    email,
    phone,
  };
};

const getCustomerByEmail = async (email) => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return null;
  }

  const snapshot = await firebaseController.db
    .collection(CUSTOMERS_COLLECTION)
    .where("email", "==", normalizedEmail)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0].data();
};

const createGuestCustomer = async ({
  customer,
  defaultDeliveryAddress = null,
}) => {
  const normalizedCustomer = validateCustomerPayload(customer);

  const normalizedDeliveryAddress = normalizeDeliveryAddress(
    defaultDeliveryAddress
  );

  const customerId = `customer_${randomUUID()}`;

  const now = new Date().toISOString();

  const customerDocument = {
    id: customerId,

    firstName: normalizedCustomer.firstName,
    lastName: normalizedCustomer.lastName,

    email: normalizedCustomer.email,
    phone: normalizedCustomer.phone,

    userId: null,

    accountStatus: CUSTOMER_ACCOUNT_STATUSES.GUEST,

    defaultDeliveryAddress: normalizedDeliveryAddress,

    createdAt: now,
    updatedAt: now,
  };

  await firebaseController.db
    .collection(CUSTOMERS_COLLECTION)
    .doc(customerId)
    .set(customerDocument);

  return customerDocument;
};

const updateGuestCustomerProfile = async ({
  existingCustomer,
  customer,
  defaultDeliveryAddress = null,
}) => {
  const normalizedCustomer = validateCustomerPayload(customer);

  const normalizedDeliveryAddress = normalizeDeliveryAddress(
    defaultDeliveryAddress
  );

  const customerId = existingCustomer?.id;

  if (!customerId) {
    throw new Error("Existing customer id is required");
  }

  const now = new Date().toISOString();

  const customerUpdates = {
    firstName: normalizedCustomer.firstName,
    lastName: normalizedCustomer.lastName,

    email: normalizedCustomer.email,
    phone: normalizedCustomer.phone,

    updatedAt: now,
  };

  /**
   * Only update the saved delivery address when
   * the current checkout actually provides one.
   *
   * A Pickup checkout must not erase an existing
   * Local Delivery address.
   */
  if (normalizedDeliveryAddress) {
    customerUpdates.defaultDeliveryAddress = normalizedDeliveryAddress;
  }

  await firebaseController.db
    .collection(CUSTOMERS_COLLECTION)
    .doc(customerId)
    .set(customerUpdates, {
      merge: true,
    });

  return {
    ...existingCustomer,
    ...customerUpdates,
  };
};

const resolveGuestCustomer = async ({
  customer,
  defaultDeliveryAddress = null,
}) => {
  const normalizedCustomer = validateCustomerPayload(customer);

  const existingCustomer = await getCustomerByEmail(normalizedCustomer.email);

  if (existingCustomer) {
    return updateGuestCustomerProfile({
      existingCustomer,

      customer: normalizedCustomer,

      defaultDeliveryAddress,
    });
  }

  return createGuestCustomer({
    customer: normalizedCustomer,
    defaultDeliveryAddress,
  });
};
// const resolveGuestCustomer = async ({
//   customer,
//   defaultDeliveryAddress = null,
// }) => {
//   const normalizedCustomer = validateCustomerPayload(customer);

//   const existingCustomer = await getCustomerByEmail(normalizedCustomer.email);

//   if (existingCustomer) {
//     return existingCustomer;
//   }

//   return createGuestCustomer({
//     customer: normalizedCustomer,
//     defaultDeliveryAddress,
//   });
// };

module.exports = {
  getCustomerByEmail,
  createGuestCustomer,
  updateGuestCustomerProfile,
  resolveGuestCustomer,
};
