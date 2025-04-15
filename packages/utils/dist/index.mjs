// src/isEmpty.ts
function isEmpty(value) {
  if (value == null)
    return true;
  if (typeof value === "string" || Array.isArray(value))
    return value.length === 0;
  if (typeof value === "object")
    return Object.keys(value).length === 0;
  return false;
}

// src/isCellularConnection.ts
function isCellularConnection() {
  try {
    return navigator && "connection" in navigator && navigator.connection && navigator.connection.type === "cellular";
  } catch (e) {
    return false;
  }
}
export {
  isCellularConnection,
  isEmpty
};
