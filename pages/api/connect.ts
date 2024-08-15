// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from '@/utils/auth';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader('Access-Control-Allow-Origin', '*');  // Adjust '*' for security reasons
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    // Extract the token from the Authorization header (assuming Bearer token format)
    const token = authHeader.split(' ')[1];

    // Validate the token
    const { decodedPayload } = validateToken(token);

    console.log('Token payload:', decodedPayload);

    // Return the result as JSON
    res.status(200).json({ result: decodedPayload });
  } catch (error: any) {
    // If validation fails, return an error response
    res.status(401).json({ error: error.message });
  }
}