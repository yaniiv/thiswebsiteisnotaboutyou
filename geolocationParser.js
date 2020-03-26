const geoip = require("geoip-lite");

const isLocalDevIp = ip => ip === "127.0.0.1" || ip === "::1";

function getIpIfAvailable(req) {
  // if request routed via proxy, req.ip contains x-forwarded-for original IP
  let ip = req.ip || req.connection.remoteAddress || false;
  console.warn("ip", ip);
  if (isLocalDevIp(ip)) {
    console.warn(`DETECTED local dev`);
    return false;
  }
  // IPV6 address can look like ::ffff:192.168.0.1'
  if (ip && ip.includes("::ffff:")) {
    ip = ip.split(":").reverse()[0];
  }

  return ip;
}

const geolocationParser = function(req, res, next) {
  let geoIpData;
  let parsedIp;

  if (req && req.query && req.query.ip) {
    parsedIp = req.query.ip;
  } else {
    parsedIp = getIpIfAvailable(req);
  }

  // TODO: probably remove this
  req.parsedIp = parsedIp;

  if (parsedIp) {
    geoIpData = geoip.lookup(ip);
    req.geoIpData = geoIpData;
  }

  next();
};

module.exports = geolocationParser;
