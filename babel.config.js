module.exports = function (api) {
  api.cache(true);
  return {
    compact: false,
    presets: [
      'module:metro-react-native-babel-preset',
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            appRedux: './src/appRedux',
            assets: './src/assets',
            components: './src/components',
            helpers: './src/helpers',
            hooks: './src/hooks',
            navigation: './src/navigation',
            screens: './src/screens',
            utils: './src/utils',
            locales: './src/locales',
            animations: './src/animations',
          },
        },
      ],
      // [
      //   'module:react-native-dotenv',
      //   {
      //     moduleName: '@env',
      //     path: '.env',
      //     blacklist: null,
      //     whitelist: null,
      //     safe: false,
      //     allowUndefined: false,
      //   },
      // ],
      'react-native-reanimated/plugin',
    ],
  };
};
