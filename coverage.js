require('should');

require('blanket')({
  // Only files that match the pattern will be instrumented
  pattern: '/src/'
});