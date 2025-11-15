import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  
  // Security Headers for improved SEO ranking and protection
  
  // Prevent clickjacking attacks
  response.headers.set('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy (formerly Feature Policy)
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Content Security Policy
  // Note: Adjusted to allow Google Tag Manager, Klaro, Umami, Web3Forms, and external resources
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cdn.kiprotect.com https://cloud.umami.is",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.kiprotect.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://api.web3forms.com https://cloud.umami.is",
      "frame-src https://www.googletagmanager.com",
      "media-src 'self' blob:"
    ].join('; ')
  );
  
  // Strict Transport Security (force HTTPS) - uncomment when SSL is confirmed working
  // response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  return response;
};
