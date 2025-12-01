const getImagePrefix = () => {
  return process.env.NODE_ENV === "production"
    ? "/SahoolatAi/"
    : "";
};

export { getImagePrefix };
 
