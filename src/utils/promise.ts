import Promise from 'bluebird';

// replace global promise with bluebird

global.Promise = Promise as any;
if (/dev/i.test(process.env.NODE_ENV)) {
  // Configure webpack and browserify for development/debugging
  Promise.config({
    longStackTraces: true,
    warnings: true, // note, run node with --trace-warnings to see full stack traces for warnings
    // Enable cancellation
    cancellation: true
  });
} else {
  // Configure webpack and browserify for production/performance
  Promise.config({
    longStackTraces: false,
    warnings: false,
    // Enable cancellation
    cancellation: true
  });
}

export default Promise;
