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
  return moment.utc(date).format("MMMM Do YYYY, [at] h:mm a");
}

function getCanvasSize() {
  if (!isBrowser()) {
    return false;
  }

  let canvasSize;

  if (window.innerWidth > 1024) {
    canvasSize = 600;
  } else if (window.innerWidth > 768) {
    canvasSize = 440;
  } else {
    canvasSize = 300;
  }

  return canvasSize;
}

function isGeoIpDataValid(geoIpData) {
  if (!geoIpData) {
    return false;
  }

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

function validContributionBody(contributionBody) {
  if (!contributionBody) return false;
  if (!contributionBody.canvas || !contributionBody.color) return false;

  return true;
}

function getNumBoxesPerRow() {
  if (!isBrowser()) {
    return 0;
  }

  let numBoxesPerRow;
  if (window.innerWidth > 1024) {
    numBoxesPerRow = 8;
  } else if (window.innerWidth > 768) {
    numBoxesPerRow = 6;
  } else {
    numBoxesPerRow = 2;
  }

  return numBoxesPerRow;
}

module.exports = {
  getNumBoxesPerRow,
  validContributionBody,
  getCanvasSize,
  isDesktop,
  isLocalDevIp,
  isBrowser,
  formatUtcToHumanReadable,
  isGeoIpDataValid,
  getLocationString,
};
