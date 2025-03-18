import { UAParser } from "ua-parser-js"; // ✅ Correct import

export const getDeviceInfo = () => {
  const parser = new UAParser(); // ✅ Now works correctly
  const result = parser.getResult();

  return {
    deviceType: result.device.type || "Desktop",
    os: result.os.name + " " + (result.os.version || ""),
    browser: result.browser.name + " " + (result.browser.version || ""),
    userAgent: navigator.userAgent,
  };
};
