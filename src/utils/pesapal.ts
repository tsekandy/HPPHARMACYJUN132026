import CryptoJS from 'crypto-js';

// Pesapal configuration
const PESAPAL_CONFIG = {
  consumer_key: 'ca6Wc6jqTVRlcfR2RoxRPXtoiz9LEYG+',
  consumer_secret: 'h84JGaumj6FpdIyOLDT6jlZ79oo=',
  base_url: 'https://cybqa.pesapal.com/pesapalv3', // Sandbox URL
  // For production, use: 'https://pay.pesapal.com/v3'
};

export interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  callback_url: string;
  notification_id: string;
  billing_address: {
    email_address: string;
    phone_number: string;
    country_code: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    line_1: string;
    line_2: string;
    city: string;
    state: string;
    postal_code: string;
    zip_code: string;
  };
}

// Generate OAuth signature for Pesapal API
export function generateOAuthSignature(
  method: string,
  url: string,
  params: Record<string, string>
): string {
  // Sort parameters
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  // Create signature base string
  const signatureBaseString = [
    method.toUpperCase(),
    encodeURIComponent(url),
    encodeURIComponent(sortedParams)
  ].join('&');

  // Create signing key
  const signingKey = `${encodeURIComponent(PESAPAL_CONFIG.consumer_secret)}&`;

  // Generate signature
  const signature = CryptoJS.HmacSHA1(signatureBaseString, signingKey).toString(CryptoJS.enc.Base64);

  return signature;
}

// Get OAuth authorization header
export function getOAuthHeader(method: string, url: string, additionalParams: Record<string, string> = {}): string {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = CryptoJS.lib.WordArray.random(32).toString();

  const oauthParams = {
    oauth_consumer_key: PESAPAL_CONFIG.consumer_key,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp,
    oauth_version: '1.0',
    ...additionalParams
  };

  const signature = generateOAuthSignature(method, url, oauthParams);
  oauthParams.oauth_signature = signature;

  const authHeader = 'OAuth ' + Object.keys(oauthParams)
    .map(key => `${encodeURIComponent(key)}="${encodeURIComponent(oauthParams[key])}"`)
    .join(', ');

  return authHeader;
}

// Submit order to Pesapal
export async function submitOrderToPesapal(paymentData: PaymentRequest): Promise<any> {
  try {
    const url = `${PESAPAL_CONFIG.base_url}/api/Transactions/SubmitOrderRequest`;
    const method = 'POST';

    const authHeader = getOAuthHeader(method, url);

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'Accept': 'application/json'
      },
      body: JSON.stringify(paymentData)
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Pesapal API Error:', error);
    throw error;
  }
}

// Get transaction status
export async function getTransactionStatus(orderTrackingId: string): Promise<any> {
  try {
    const url = `${PESAPAL_CONFIG.base_url}/api/Transactions/GetTransactionStatus`;
    const method = 'GET';

    const params = { orderTrackingId };
    const authHeader = getOAuthHeader(method, url, params);

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${url}?${queryString}`;

    const response = await fetch(fullUrl, {
      method: method,
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json'
      }
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Pesapal Status Check Error:', error);
    throw error;
  }
}