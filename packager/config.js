const config = {
  transformer: {
    getTransformOptions: () => {
      return {
        transform: { inlineRequires: true },
      };
    },
  },
  projectRoot: '/Users/mikewhite/projects/RamBundleInvestigation',
};
  
module.exports = config;
