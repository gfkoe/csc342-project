const crypto = require('crypto');

const TOKEN_COOKIE_NAME = "Token";

// Use a secret key for signing tokens
const API_SECRET = "urmomhahaha"; 

// Create a base64 URL encoding utility
const base64url = require('base64url');

// JWT Header 
const header = {
  alg: 'HS256',
  typ: 'JWT'
};

// Encode header to base64 url safe string
const encodedHeader = base64url(JSON.stringify(header));

// Create a token from user data
function generateToken(user) {

  // JWT Payload
  const payload = {
    user: user,
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // Expires in 1 hour
  };

  // Encode payload to base64 url safe string
  const encodedPayload = base64url(JSON.stringify(payload));

  // Create signature based on header, payload, and secret
  const signature = crypto.createHmac('sha256', API_SECRET)
                        .update(encodedHeader + "." + encodedPayload)
                        .digest('base64url');

  // Put together full JWT
  return encodedHeader + "." + encodedPayload + "." + signature;

}

// Verify and decode a JWT
function verifyToken(token) {

  // Split the JWT into header, payload and signature
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  // Recompute the signature
  const expectedSignature = crypto.createHmac('sha256', API_SECRET)
                                .update(encodedHeader + "." + encodedPayload)
                                .digest('base64url');

  // Compare signatures 
  if (signature !== expectedSignature) {
    throw new Error('Invalid signature');
  }

  // Decode payload
  const payload = JSON.parse(base64url.decode(encodedPayload));

  // Validate expiration
  if (payload.exp < (Math.floor(Date.now() / 1000))) {
    throw new Error('Token expired');
  }

  return payload;

}


// Middleware to authenticate request
exports.TokenMiddleware = (req, res, next) => {

  // Get token from cookie or authorization header
  let token = req.cookies[TOKEN_COOKIE_NAME];
  if (!token) {
    const authHeader = req.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  // No token
  if (!token) {
    return res.status(401).json({error: 'Not authenticated'});
  }

  // Validate and decode token
  try {
    const payload = verifyToken(token);
    req.user = payload.user;
    next();
  } catch (err) {
    return res.status(401).json({error: 'Not authenticated'});
  }

};

// Generate and set token cookie
exports.generateToken = (req, res, user) => {

  const token = generateToken(user);

  res.cookie(TOKEN_COOKIE_NAME, token, { 
    httpOnly: true, 
    secure: true,
    maxAge: 2 * 60 * 1000
  });

};

// Clear token cookie
exports.removeToken = (req, res) => {
  
  res.cookie(TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    maxAge: -360000
  });

};