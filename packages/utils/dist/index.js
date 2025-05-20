var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  adjustBottomFixed: () => adjustBottomFixed,
  isCellularConnection: () => isCellularConnection,
  isEmpty: () => isEmpty
});
module.exports = __toCommonJS(src_exports);

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

// src/adjustBottomFixed.ts
function adjustBottomFixed(selector) {
  const el = document.querySelector(selector);
  if (!el)
    return;
  let initialHeight = window.innerHeight;
  const originalStyle = {
    position: el.style.position || "",
    bottom: el.style.bottom || ""
  };
  function updatePosition() {
    if (!el)
      return;
    const currentHeight = window.innerHeight;
    const keyboardHeight = initialHeight - currentHeight;
    if (keyboardHeight > 150) {
      el.style.position = "absolute";
      el.style.bottom = `${keyboardHeight}px`;
    } else {
      el.style.position = originalStyle.position;
      el.style.bottom = originalStyle.bottom;
    }
  }
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", updatePosition);
  } else {
    window.addEventListener("resize", updatePosition);
  }
  window.addEventListener("focusin", updatePosition);
  window.addEventListener("focusout", () => {
    el.style.position = originalStyle.position;
    el.style.bottom = originalStyle.bottom;
  });
  window.addEventListener("load", () => {
    initialHeight = window.innerHeight;
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  adjustBottomFixed,
  isCellularConnection,
  isEmpty
});
