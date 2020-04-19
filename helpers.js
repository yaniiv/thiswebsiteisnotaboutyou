const isLocalDevIp = (ip) => ip === "::ffff:127.0.0.1" || ip === "::1";

module.exports = {
  isLocalDevIp,
};
