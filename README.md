# React Native, Web and Sketch Boilerplate

This project is intended a starting point for new projects that want to
target all available React platforms from a single code base.

It includes a number of trivial 'demo' apps that showcase using React Native
components that can targets all platforms.

## Utilising

* [React Native](https://facebook.github.io/react-native/)
* [React Native Web](https://github.com/necolas/react-native-web)
* [React Sketchapp](http://airbnb.io/react-sketchapp/)
* [Sketchapp](https://www.sketchapp.com)
* [Expo](https://expo.io)
* [Webpack](https://webpack.js.org)
* [Babel](https://babeljs.io)
* [Jest](https://facebook.github.io/jest/)
* [Enzyme](http://airbnb.io/enzyme/)

## Code Standard

The project uses some ES7 features and proposals such as arrow functions,
rest/spread (...) and function bind (::).  Babel is used to transpile.

## Scripts

The following scripts are provided:

* ```npm run ios```

  Build app and start the iOS Simulator using the Expo app.  Will watch for
  code changes and reload when needed
  
* ```npm run android```

  Build app and start the Android Simulator using the Expo app.  Will watch for
  code changes and reload when needed (untested)
  
* ```npm run web```

  Build app and run in browser using Webpack Dev Server and Hot Module
  Reloading
  
* ```npm run sketch```

  Build and run app in Sketchapp (MacOS Only), watch for changes and reload
  when needed
  
* ```npm run test:web```

  Run tests for web and common components
  
* ```npm run test:native```

  Run tests for native and common components
  
* ```npm run native:start```

  Start the React Native packager only
  
* ```npm run native:eject```

  Eject the React Native project
  
* ```npm run sketch:build```

  Build only for Sketch target
  
* ```npm run sketch:watch```

  Same as ```sketch```
  
* ```npm run sketch:render:once```

  Builds for Sketch and renders once, doesn't watch.
  
* ```npm run web:build```

  Build only for webpack
