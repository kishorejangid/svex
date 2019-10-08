// Enable WebStorm + RequireJS plugin to resolve paths to module sources.
// Paths are relative to this directory; no environment variables possible.

require.config({
  paths: {
    csui: 'lib/src/csui',
    'svex': 'src'
  }
});
