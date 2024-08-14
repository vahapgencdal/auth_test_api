// utils/auth.js
import jwt from 'jsonwebtoken';

export function validateToken(token: any) {
  try {
    // Decode the token without verification to check the payload
    const decodedToken = jwt.decode(token, { complete: true });

    if (!decodedToken) {
      throw new Error('Invalid token');
    }

    // Get environment variables
    const requiredScope = process.env.SCOPE;
    const issuer = process.env.ISSUER;

    // Check if the token issuer matches the expected issuer
    if (decodedToken.payload.iss !== issuer) {
      throw new Error('Invalid issuer; '+ decodedToken.payload.iss);
    }

    // Check if the token contains the required scope
    if (!decodedToken.payload.scope || !decodedToken.payload.scope.includes(requiredScope)) {
      throw new Error('Insufficient scope '+ decodedToken.payload.scope);
    }

    // Verify the token (signature and expiration)
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret or public key

    // Return both the decoded payload and the verified token
    return {
      verifiedToken,
      decodedPayload: decodedToken.payload,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
