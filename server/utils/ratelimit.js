import setRateLimit from "express-rate-limit"; // import express-rate-limit package

export const rateLimitMiddleware = (signUpOrLogin = false) => {
  let maxRequests = process.env.RATE_LIMIT_MAX;

  if (signUpOrLogin) {
    maxRequests = process.env.RATE_LIMIT_MAX_REQUESTS_LOGIN;
  }
  // Rate limit middleware
  return setRateLimit({
    // create rate limit middleware
    windowMs: process.env.RATE_LIMIT_WINDOW_MS, // define windowMs property
    max: maxRequests, // define max property
    message: "You have exceeded your requests per minute limit.", // send error message
    headers: true, // send custom rate limit header with limit and remaining
  });
};

// // Rate limit middleware
// export const rateLimitMiddleware = setRateLimit({
//   // create rate limit middleware
//   windowMs: process.env.RATE_LIMIT_WINDOW_MS, // define windowMs property
//   max: process.env.RATE_LIMIT_MAX, // define max property
//   message: "You have exceeded your requests per minute limit.", // send error message
//   headers: true, // send custom rate limit header with limit and remaining
// });

// Source: https://github.com/thombergs/code-examples/blob/master/nodejs/nodejs-rate-limiter/middlewares/ratelimit.js
