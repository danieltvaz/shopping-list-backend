export const DB_RESPONSE_MESSAGE = {
  INSERT_DB_SUCCESS: { statusMessage: "Dxx1s", code: 200 },
  INSERT_DB_ERROR: { statusMessage: "Dxx1f", code: 500 },
};

export const ROUTE_RESPONSE_MESSAGE = {
  ROUTE_SUCCESS: { statusMessage: "Rxx1s", code: 200 },
  ROUTE_INSUFICIENT_DATA: { statusMessage: "Rxx1f", code: 400 },
  ROUTE_SIGNIN_SUCCESS: { statusMessage: "Rxx2s", code: 200 },
  ROUTE_SIGNIN_ERROR: { statusMessage: "Rxx2F", code: 401 },
  ROUTE_UNAUTHORIZED_ERROR: { statusMessage: "Rxx3f", code: 401 },
};
