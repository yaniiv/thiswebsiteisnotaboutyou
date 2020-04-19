const geoip = require("geoip-lite");
const get_ip = require("ipware")().get_ip;

const geolocationParser = function (req, res, next) {
  const clientIp = get_ip(req).clientIp;

  let geoIpData = geoip.lookup(clientIp);
  if (!geoIpData) {
    geoIpData = { error: "no geo ip data found" };
  }

  req.clientIp = clientIp;
  req.geoIpData = geoIpData;

  next();
};

module.exports = geolocationParser;
