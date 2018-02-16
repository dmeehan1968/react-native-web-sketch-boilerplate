// @flow
declare var module: {
  hot: {
    accept(name: string, callback: () => void): void,
  },
}
