const getEnv = () => {
  return {
    DB_URI: process.env.DB_URI,
    COLLECTION: process.env.COLLECTION,
  };
};

module.exports = { getEnv };
