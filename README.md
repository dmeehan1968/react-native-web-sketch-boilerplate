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

## Demos

The demos are wrapped in a universal 'split' navigator, much like found on
iOS as a 'master/detail' view.  The navigator dynamically changes depending on
the viewport width.  Essentially:

* Phones

  Should show a 'stack' view, with a list of demos, when clicked/pressed
  that is replaced with the demo app screen.

  The back button will 'pop' the view from the stack.

* Tablet Portrait

  Should display the first 'demo' screen ("Hello World"), with a back button
  that will slide the 'master' navigator out from the left of the screen
  (a 'drawer').  Clicking an item in the master will switch the main view and
  dismiss the drawer.  Clicking outside the drawer will dismiss the drawer.

* Tablet Landscape

  Should display a fixed 'split' view with master on the left, taking
  approximately 33% of the viewport, and a detail view on the right, showing
  the selected demo.

* Web Browser

  As above, depending on viewport width.  Try resizing your browser window
  or use "Responsive Design Mode" to try different widths.

### HelloWorld

Yep, that old chestnut.  Displays HelloWorld in the middle of the viewport.

### Draggable Box

Displays a square box in the middle of the viewport, you can click/press and
hold, then drag the box around the viewport.  When you release, it will
'spring' back to me middle with a little message.

This demonstrates using the Animated API in different environments.

### Lock Screen

Displays a 'simulated' lockscreen, with a clock, text message and a slider
that when dragged to the furthest right position will cause the unlock action,
which in the demo just updates the test message to read 'unlocked'.

When the slider is released, it springs back to the left position, regardless
of whether it unlocked or not.

This demonstrates using interval timers, and the Animated API.

### Todo List

A simple list of things, no checkboxes at this stage, and clicking/pressing
on an item will just move to another placeholder screen for the item.

This demonstrates pushing items on the the navigation stack regardless of
which mode the split navigator is currently in.

### Text Wrap

A longer chunk of test, centered in the viewport.  A bug was encountered
during development that prevented the text from wrapping, and was down to a
missing 'flex' style on an intermediate ancestor.  This only manifested itself
in 'web' mode and is down to flexbox implementation differences across
platforms.

The purpose of this demo was to test and validate the above bug.
