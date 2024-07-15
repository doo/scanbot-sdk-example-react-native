module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        alias: {
          '@components': './src/components',
          '@context': './src/context',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@theme': './src/theme',
        },
      },
    ],
  ],
};
