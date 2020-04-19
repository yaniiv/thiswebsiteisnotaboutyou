function isLocalDevIp(ip) {
  return ip === "::ffff:127.0.0.1" || ip === "::1";
}

function isBrowser() {
  return typeof window !== "undefined";
}

module.exports = {
  isLocalDevIp,
  isBrowser,
};
