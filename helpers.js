const moment = require("moment");

function isLocalDevIp(ip) {
  return ip === "::ffff:127.0.0.1" || ip === "::1";
}

function isBrowser() {
  return typeof window !== "undefined";
}

function isDesktop() {
  if (!isBrowser()) {
    return false;
  }

  return window.innerWidth >= 768;
}

function formatUtcToHumanReadable(date) {
  return moment.utc(date).format("MMMM Do YYYY, [at] h:mm:ss a");
}

function getCanvasSize() {
  if (!isBrowser()) {
    return false;
  }

  let canvasSize;

  if (window.innerWidth > 1024) {
    canvasSize = 800;
  } else if (window.innerWidth > 800) {
    canvasSize = 700;
  } else if (window.innerWidth > 700) {
    canvasSize = 600;
  } else if (window.innerWidth > 600) {
    canvasSize = 500;
  } else if (window.innerWidth > 500) {
    canvasSize = 400;
  } else {
    canvasSize = 300;
  }

  return canvasSize;
}

function isGeoIpDataValid(geoIpData) {
  if (geoIpData.error) {
    return false;
  }

  if (geoIpData === undefined) {
    return false;
  }

  if (!geoIpData.country) {
    return false;
  }

  return true;
}

function getLocationString(geoIpData) {
  const { range, country, region, eu, timezone, city, ll, metro } = geoIpData;

  let clientLocationString = "";
  if (country && region && city) {
    clientLocationString = `, from ${city} ${region}, ${country}`;
  } else if (country && region) {
    clientLocationString = `, from ${city}, ${region}`;
  } else if (country) {
    clientLocationString = `, from ${country}`;
  }

  return clientLocationString;
}

module.exports = {
  getCanvasSize,
  isDesktop,
  isLocalDevIp,
  isBrowser,
  formatUtcToHumanReadable,
  isGeoIpDataValid,
  getLocationString,
};
