// pages/api/_middleware.js

export function middleware(req, event) {
    // Set CORS headers
    const responseHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    };
  
    // Handle OPTIONS requests (for CORS preflight requests)
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: responseHeaders,
      });
    }
  
    // Proceed with the request and attach CORS headers to the response
    const response = event.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  
    return response;
  }
  