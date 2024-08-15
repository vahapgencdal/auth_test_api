// utils/auth.js

// Helper function to decode Base64-URL
function base64UrlDecode(base64Url: string) {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedData = Buffer.from(base64, 'base64').toString('utf-8');
  return decodedData;
}

export function validateToken(token: any) {
  try {
    // Split the token into its parts (header, payload, signature)
    const [header, payload, signature] = token.split('.');

    if (!payload) {
      throw new Error('Invalid token format');
    }

    // Decode the payload
    const decodedPayload = JSON.parse(base64UrlDecode(payload));

    // Get environment variables
    const requiredScope = process.env.SCOPE;
    const issuer = process.env.ISSUER;

    // Check if the token issuer matches the expected issuer
    if (decodedPayload.iss !== issuer) {
      return {
        error: "issuer not same",
        payload :decodedPayload,
        issuer: issuer,
        scope: requiredScope
      }
    }

    // Check if the token contains the required scope
    if (!decodedPayload.scope || !decodedPayload.scope.includes(requiredScope)) {
      return {
        error: "payload not found",
        payload :decodedPayload,
        issuer: issuer,
        scope: requiredScope
      }
    }

    // Return the decoded payload if everything is valid
    return decodedPayload;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
