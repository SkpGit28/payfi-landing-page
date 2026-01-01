/**
 * PAYFI DOCUMENTATION HUB - MOCK DATA
 * Comprehensive data for Integration, API Reference, and No-Code Guides
 * 
 * This file contains:
 * - Integration guides (step-by-step tutorials)
 * - API reference (endpoints, parameters, responses)
 * - No-Code guides (dashboard features, payment links, webhooks)
 */

// ============================================================================
// TYPES
// ============================================================================

interface CodeBlock {
  language: string;
  content: string;
}

interface Subsection {
  title: string;
  description: string;
}

interface Card {
  title: string;
  description: string;
}

interface IntegrationGuide {
  id: number;
  title: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: string;
  content: string;
  code?: CodeBlock;
  output?: Record<string, any>;
  focusLines?: number[];
  subsections?: Subsection[];
  doCards?: Card[];
  dontCards?: Card[];
  tips?: string[];
}

interface Parameter {
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

interface ErrorResponse {
  code: string;
  message: string;
  solution: string;
  status: number;
}

interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  category: string;
  parameters?: Record<string, Parameter>;
  response?: Record<string, any>;
  errors?: ErrorResponse[];
}

interface Step {
  number: number;
  title: string;
  description: string;
  visual: string;
}

interface Metric {
  title: string;
  value: string;
  change: string;
  period: string;
  icon: string;
}

interface Role {
  name: string;
  permissions: string[];
}

interface NoCodeGuide {
  id: number;
  title: string;
  icon: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  steps?: Step[];
  features?: string[];
  benefits?: string[];
  metrics?: Metric[];
  insights?: string[];
  roles?: Role[];
}

interface GuideSection {
  title: string;
  guides?: IntegrationGuide[];
  endpoints?: Record<string, APIEndpoint>;
}

interface QuickLink {
  title: string;
  url: string;
}

interface PopularGuide {
  title: string;
  icon: string;
  time: string;
}

interface PaymentMethod {
  method: string;
  supported: boolean;
  description: string;
}

interface Currency {
  currency: string;
  supported: boolean;
}

interface Feature {
  name: string;
  available: boolean;
}

interface FeatureComparison {
  paymentMethods: PaymentMethod[];
  currencies: Currency[];
  features: Feature[];
}

interface CodeSnippet {
  language: string;
  setup?: string;
  initialize?: string;
  payment?: string;
}

interface CodeSnippets {
  node: CodeSnippet;
  python: CodeSnippet;
  php: CodeSnippet;
  ruby: CodeSnippet;
  curl: CodeSnippet;
}

// ============================================================================
// INTEGRATION GUIDES DATA
// ============================================================================

export const INTEGRATION_GUIDES: IntegrationGuide[] = [
  {
    id: 1,
    title: 'Get Your API Credentials',
    duration: '2 min',
    difficulty: 'Beginner',
    icon: '🔑',
    content: `Your API credentials are the keys to authenticating requests to Payfi.
There are two types: Test (for development) and Live (for production).
Always start with test credentials to avoid any production issues.`,
    code: {
      language: 'bash',
      content: `# 1. Log in to dashboard.payfi.io
# 2. Navigate to Settings → API Keys
# 3. You'll see:

sk_test_4e7ChQQvP8nK3mL9qR2S    # Secret key (test)
pk_test_7aB9cD0eF1g2hI3jK4l     # Public key (test)

sk_live_8mN9oP0qR1sT2uV3wX4y    # Secret key (live)
pk_live_5xY6zA7bC8dE9fG0hI1j    # Public key (live)

# Store these in your .env file
PAYFI_SECRET_KEY=sk_test_xxx
PAYFI_PUBLIC_KEY=pk_test_xxx`,
    },
    subsections: [
      {
        title: 'Test vs Live Mode',
        description: 'Test credentials use sandbox data. Live credentials process real payments. Never use live keys in development.',
      },
      {
        title: 'Rotating Keys Safely',
        description: 'Regenerate keys without downtime. Old keys stop working after 24h grace period. Useful for security updates.',
      },
      {
        title: 'Environment Setup',
        description: 'Configure your environment variables in .env, .env.local, or your deployment platform.',
      },
    ],
    doCards: [
      {
        title: 'Store keys in environment variables',
        description: 'Use .env files or secrets manager. Never hardcode in source.',
      },
      {
        title: 'Use test keys first',
        description: 'Always integrate and test with sk_test_* before going live.',
      },
      {
        title: 'Rotate periodically',
        description: 'Update keys every 90 days for security best practices.',
      },
    ],
    dontCards: [
      {
        title: 'Never commit API keys to Git',
        description: 'If you do, immediately rotate the key from dashboard.',
      },
      {
        title: 'Don\'t share live secret keys',
        description: 'This would give anyone the ability to process payments.',
      },
      {
        title: 'Don\'t expose public keys on frontend',
        description: 'Public keys can be used, but verify all sensitive data server-side.',
      },
    ],
  },
  {
    id: 2,
    title: 'Accept Your First Payment',
    duration: '5 min',
    difficulty: 'Intermediate',
    icon: '💳',
    content: 'Create a payment request and handle the response. This is the core of payment processing.',
    code: {
      language: 'javascript',
      content: `import Payfi from '@payfi/sdk';

const payfi = new Payfi({
  apiKey: process.env.PAYFI_SECRET_KEY
});

// Create a payment
const payment = await payfi.payments.create({
  amount: 2999,           // Amount in paise (₹299.99)
  currency: 'INR',
  description: 'Premium subscription',
  customerEmail: 'user@example.com',
  customerName: 'John Doe',
  orderId: 'order_2024_001',
  returnUrl: 'https://your-app.com/checkout/success',
  cancelUrl: 'https://your-app.com/checkout/cancel',
  metadata: {
    userId: 'user_12345',
    plan: 'premium'
  }
});

console.log(payment);
// {
//   id: 'pay_7A8bC9dE0f',
//   status: 'authorized',
//   amount: 2999,
//   currency: 'INR',
//   paymentUrl: 'https://checkout.payfi.io/pay_7A8bC9dE0f',
//   expiresAt: '2024-01-15T10:45:00Z'
// }`,
    },
    output: {
      id: 'pay_7A8bC9dE0f',
      status: 'authorized',
      amount: 2999,
      currency: 'INR',
      paymentUrl: 'https://checkout.payfi.io/pay_7A8bC9dE0f',
      expiresAt: new Date(Date.now() + 15 * 60000).toISOString(),
    },
    focusLines: [7, 8, 9, 10, 11, 12, 13, 14, 15],
    tips: [
      'Amount is in lowest currency unit (paise for INR)',
      'Include customer information for better analytics',
      'Set metadata to track orders in your system',
      'Payment expires in 15 minutes by default',
    ],
  },
  {
    id: 3,
    title: 'Handle Webhooks & Notifications',
    duration: '7 min',
    difficulty: 'Advanced',
    icon: '🔔',
    content: 'Receive real-time payment status updates via webhooks. Critical for fulfilling orders.',
    code: {
      language: 'javascript',
      content: `// Express.js example - Webhook Handler
const crypto = require('crypto');
const express = require('express');
const app = express();

app.use(express.json());

// Webhook endpoint
app.post('/webhooks/payfi', async (req, res) => {
  const signature = req.headers['x-payfi-signature'];
  const timestamp = req.headers['x-payfi-timestamp'];
  
  // Verify webhook signature (CRITICAL!)
  const payload = JSON.stringify(req.body);
  const message = \`\${timestamp}.\${payload}\`;
  const expected = crypto
    .createHmac('sha256', process.env.PAYFI_WEBHOOK_SECRET)
    .update(message)
    .digest('hex');
  
  if (!crypto.timingSafeEqual(signature, \`v1,\${expected}\`)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Handle different webhook events
  const { event, data } = req.body;
  
  try {
    if (event === 'payment.captured') {
      // ✓ Payment successful - fulfill order
      await fulfillOrder(data.orderId);
      await sendConfirmationEmail(data.customerEmail);
    } 
    else if (event === 'payment.failed') {
      // ✗ Payment failed - notify customer
      await notifyCustomerOfFailure(data.customerEmail);
      await retryPayment(data.orderId);
    }
    else if (event === 'payment.refunded') {
      // ↩ Payment refunded - update inventory
      await processRefund(data.orderId, data.refundAmount);
    }
    else if (event === 'payment.expired') {
      // ⏰ Payment expired - clean up
      await expireOrder(data.orderId);
    }
    
    res.json({ success: true, processed: true });
  } catch (error) {
    console.error('Webhook error:', error);
    // Always return 200 to acknowledge receipt
    res.status(200).json({ success: false, error: error.message });
  }
});

// Helper functions
async function fulfillOrder(orderId: string): Promise<void> {
  const order = await Order.findById(orderId);
  order.status = 'fulfilled';
  await order.save();
}

async function sendConfirmationEmail(email: string): Promise<void> {
  // Send email via your email service
}

async function notifyCustomerOfFailure(email: string): Promise<void> {
  // Notify customer about failed payment
}

async function processRefund(orderId: string, amount: number): Promise<void> {
  // Update inventory and accounting
}

app.listen(3000, () => console.log('Webhook server running'));`,
    },
    focusLines: [1, 2, 3, 4, 5, 20, 21, 22],
    tips: [
      'Always verify webhook signature to prevent spoofing',
      'Return 200 OK even if processing fails (webhook will retry)',
      'Store webhook events in database for audit trail',
      'Implement idempotency to handle duplicate webhooks',
      'Test webhooks using ngrok or similar tunneling',
    ],
  },
  {
    id: 4,
    title: 'Implement Refunds',
    duration: '4 min',
    difficulty: 'Intermediate',
    icon: '↩️',
    content: 'Process refunds for payments. Handle full and partial refunds.',
    code: {
      language: 'javascript',
      content: `// Full Refund
const fullRefund = await payfi.refunds.create({
  paymentId: 'pay_7A8bC9dE0f',
  reason: 'Customer requested cancellation'
});

// Partial Refund
const partialRefund = await payfi.refunds.create({
  paymentId: 'pay_7A8bC9dE0f',
  amount: 1500,  // Refund ₹15 out of ₹299.99
  reason: 'Partial discount applied'
});

// Check refund status
const refund = await payfi.refunds.retrieve(fullRefund.id);
console.log(refund.status);  // 'processed', 'pending', 'failed'`,
    },
    focusLines: [1, 2, 3, 4, 8, 9, 10, 11, 12],
  },
  {
    id: 5,
    title: 'Error Handling & Recovery',
    duration: '6 min',
    difficulty: 'Advanced',
    icon: '⚠️',
    content: 'Handle errors gracefully and implement retry logic.',
    code: {
      language: 'javascript',
      content: `// Comprehensive Error Handling
try {
  const payment = await payfi.payments.create({
    amount: 2999,
    currency: 'INR',
    customerEmail: 'user@example.com',
  });
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    // Invalid parameters
    console.error('Validation error:', error.message);
    // Return user-friendly error
  } 
  else if (error.code === 'AUTHENTICATION_ERROR') {
    // Invalid API key
    console.error('Auth error - check your API key');
  }
  else if (error.code === 'RATE_LIMIT_ERROR') {
    // Too many requests
    console.error('Rate limited - implement exponential backoff');
  }
  else if (error.code === 'NETWORK_ERROR') {
    // Network timeout - retry
    console.error('Network error - retrying...');
    await retryWithBackoff(async () => 
      payfi.payments.create({ amount: 2999, currency: 'INR' })
    );
  }
  else {
    // Unknown error
    console.error('Unexpected error:', error);
  }
}

// Retry with exponential backoff
async function retryWithBackoff(fn: () => Promise<any>, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      const delay = Math.pow(2, i) * 1000;  // 1s, 2s, 4s
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}`,
    },
    focusLines: [1, 2, 3, 8, 9, 10, 11, 30, 31, 32],
  },
];

// ============================================================================
// API REFERENCE DATA
// ============================================================================

export const API_ENDPOINTS: Record<string, APIEndpoint> = {
  'Create Payment': {
    method: 'POST',
    path: '/v1/payments',
    description: 'Initiate a payment request',
    category: 'Payments',
    parameters: {
      amount: {
        type: 'integer',
        required: true,
        description: 'Amount in lowest unit (paise for INR)',
        example: '2999'
      },
      currency: {
        type: 'string',
        required: true,
        description: 'Currency code (INR, USD, EUR, etc)',
        example: 'INR'
      },
      customerEmail: {
        type: 'string',
        required: true,
        description: 'Customer email for order confirmation',
        example: 'user@example.com'
      },
      customerName: {
        type: 'string',
        required: false,
        description: 'Customer full name',
        example: 'John Doe'
      },
      orderId: {
        type: 'string',
        required: false,
        description: 'Your order reference ID',
        example: 'order_12345'
      },
      description: {
        type: 'string',
        required: false,
        description: 'Payment description shown to customer',
        example: 'Premium subscription'
      },
      metadata: {
        type: 'object',
        required: false,
        description: 'Custom data for tracking',
        example: '{"userId": "user_123", "plan": "pro"}'
      },
    },
    response: {
      id: 'pay_7A8bC9dE0f',
      status: 'authorized',
      amount: 2999,
      currency: 'INR',
      customerEmail: 'user@example.com',
      orderId: 'order_2024_001',
      paymentUrl: 'https://checkout.payfi.io/pay_7A8bC9dE0f',
      createdAt: '2024-01-15T10:30:00Z',
      expiresAt: '2024-01-15T10:45:00Z',
    },
    errors: [
      {
        code: 'VALIDATION_ERROR',
        message: 'Amount must be at least 100 paise',
        solution: 'Ensure amount >= 100',
        status: 400,
      },
      {
        code: 'AUTHENTICATION_ERROR',
        message: 'Invalid API key',
        solution: 'Check your API key in Settings',
        status: 401,
      },
      {
        code: 'RATE_LIMIT_ERROR',
        message: 'Too many requests',
        solution: 'Wait before retrying (max 100 req/min)',
        status: 429,
      },
      {
        code: 'INVALID_CURRENCY',
        message: 'Currency not supported',
        solution: 'Use supported currencies: INR, USD, EUR, GBP',
        status: 400,
      },
    ],
  },
  'List Payments': {
    method: 'GET',
    path: '/v1/payments',
    description: 'Retrieve paginated list of payments',
    category: 'Payments',
    parameters: {
      limit: {
        type: 'integer',
        required: false,
        description: 'Max results per page (default 10, max 100)',
        example: '20'
      },
      offset: {
        type: 'integer',
        required: false,
        description: 'Number of items to skip',
        example: '10'
      },
      status: {
        type: 'string',
        required: false,
        description: 'Filter by status: authorized, captured, failed, refunded, expired',
        example: 'captured'
      },
      customerId: {
        type: 'string',
        required: false,
        description: 'Filter by customer email',
        example: 'user@example.com'
      },
      from: {
        type: 'string (ISO 8601)',
        required: false,
        description: 'Start date for filtering',
        example: '2024-01-01T00:00:00Z'
      },
      to: {
        type: 'string (ISO 8601)',
        required: false,
        description: 'End date for filtering',
        example: '2024-01-31T23:59:59Z'
      },
    },
    response: {
      data: [
        {
          id: 'pay_7A8bC9dE0f',
          status: 'captured',
          amount: 2999,
          currency: 'INR',
          customerEmail: 'user@example.com',
          createdAt: '2024-01-15T10:30:00Z',
        },
      ],
      pagination: {
        limit: 10,
        offset: 0,
        total: 150,
      },
    },
  },
  'Retrieve Payment': {
    method: 'GET',
    path: '/v1/payments/{paymentId}',
    description: 'Get details of a specific payment',
    category: 'Payments',
    parameters: {
      paymentId: {
        type: 'string (path)',
        required: true,
        description: 'Unique payment ID',
        example: 'pay_7A8bC9dE0f'
      },
    },
    response: {
      id: 'pay_7A8bC9dE0f',
      status: 'captured',
      amount: 2999,
      currency: 'INR',
      customerEmail: 'user@example.com',
      orderId: 'order_2024_001',
      paymentMethod: 'card',
      last4: '4242',
      createdAt: '2024-01-15T10:30:00Z',
      capturedAt: '2024-01-15T10:31:00Z',
      metadata: { userId: 'user_123' },
    },
  },
  'Refund Payment': {
    method: 'POST',
    path: '/v1/payments/{paymentId}/refund',
    description: 'Refund a captured payment (full or partial)',
    category: 'Payments',
    parameters: {
      paymentId: {
        type: 'string (path)',
        required: true,
        description: 'Payment ID to refund',
        example: 'pay_7A8bC9dE0f'
      },
      amount: {
        type: 'integer',
        required: false,
        description: 'Refund amount (full if omitted)',
        example: '1500'
      },
      reason: {
        type: 'string',
        required: true,
        description: 'Reason for refund',
        example: 'Customer requested cancellation'
      },
    },
    response: {
      id: 'ref_9C7dE1fG2h',
      paymentId: 'pay_7A8bC9dE0f',
      amount: 2999,
      status: 'processed',
      reason: 'Customer requested',
      processedAt: '2024-01-15T10:45:00Z',
    },
    errors: [
      {
        code: 'PAYMENT_NOT_FOUND',
        message: 'Payment does not exist',
        solution: 'Verify payment ID is correct',
        status: 404,
      },
      {
        code: 'REFUND_NOT_ALLOWED',
        message: 'Payment status does not allow refunds',
        solution: 'Only captured payments can be refunded',
        status: 400,
      },
      {
        code: 'INSUFFICIENT_BALANCE',
        message: 'Refund amount exceeds payment amount',
        solution: 'Ensure refund amount <= payment amount',
        status: 400,
      },
    ],
  },
  'Create Webhook': {
    method: 'POST',
    path: '/v1/webhooks',
    description: 'Register a webhook endpoint',
    category: 'Webhooks',
    parameters: {
      url: {
        type: 'string (URL)',
        required: true,
        description: 'HTTPS endpoint to receive webhooks',
        example: 'https://your-app.com/webhooks/payfi'
      },
      events: {
        type: 'array',
        required: true,
        description: 'List of events to subscribe to',
        example: '["payment.captured", "payment.failed", "payment.refunded"]'
      },
      active: {
        type: 'boolean',
        required: false,
        description: 'Enable/disable webhook',
        example: 'true'
      },
    },
    response: {
      id: 'wh_5xY6zA7bC8',
      url: 'https://your-app.com/webhooks/payfi',
      events: ['payment.captured', 'payment.failed'],
      active: true,
      createdAt: '2024-01-15T10:30:00Z',
    },
  },
  'List Disputes': {
    method: 'GET',
    path: '/v1/disputes',
    description: 'Get all payment disputes and chargebacks',
    category: 'Disputes',
    parameters: {
      status: {
        type: 'string',
        required: false,
        description: 'Filter by: open, won, lost, under_review',
        example: 'open'
      },
      limit: {
        type: 'integer',
        required: false,
        description: 'Max results',
        example: '10'
      },
    },
    response: {
      data: [
        {
          id: 'disp_8nM7oL6kJ5',
          paymentId: 'pay_7A8bC9dE0f',
          status: 'open',
          amount: 2999,
          reason: 'Unauthorized transaction',
          dueDate: '2024-01-25T00:00:00Z',
        },
      ],
      total: 5,
    },
  },
};

// ============================================================================
// NO-CODE GUIDES DATA
// ============================================================================

export const NO_CODE_GUIDES: NoCodeGuide[] = [
  {
    id: 1,
    title: 'Accept Payments with Payment Links',
    icon: '🔗',
    duration: '3 min',
    difficulty: 'Beginner',
    description: 'Create shareable payment links without writing code',
    steps: [
      {
        number: 1,
        title: 'Go to Payment Links',
        description: 'Login to dashboard.payfi.io and click "Payment Links" in the sidebar',
        visual: '📊',
      },
      {
        number: 2,
        title: 'Click Create Link',
        description: 'Click the blue "Create Payment Link" button in the top right',
        visual: '➕',
      },
      {
        number: 3,
        title: 'Fill in Details',
        description: 'Enter amount, description, and customer email (optional)',
        visual: '📝',
      },
      {
        number: 4,
        title: 'Copy & Share',
        description: 'Copy the link and share via email, SMS, or social media',
        visual: '📤',
      },
    ],
    features: [
      'No coding required',
      'Works on any device',
      'Track payment status in real-time',
      'Customize payment page branding',
      'Set expiration time',
    ],
    benefits: [
      '1-minute setup',
      'Convert 30% more customers',
      'Mobile-optimized checkout',
      'Automatic invoice generation',
    ],
  },
  {
    id: 2,
    title: 'Manage Invoices & Billing',
    icon: '📄',
    duration: '5 min',
    difficulty: 'Beginner',
    description: 'Create and send invoices directly from Payfi',
    steps: [
      {
        number: 1,
        title: 'Create Invoice',
        description: 'Go to Invoices tab and click "New Invoice"',
        visual: '📋',
      },
      {
        number: 2,
        title: 'Add Line Items',
        description: 'Add products/services with amounts and quantities',
        visual: '➕',
      },
      {
        number: 3,
        title: 'Set Due Date',
        description: 'Choose payment due date (14 days, 30 days, custom)',
        visual: '📅',
      },
      {
        number: 4,
        title: 'Send Invoice',
        description: 'Send via email or generate shareable link',
        visual: '✉️',
      },
    ],
    features: [
      'Professional invoice templates',
      'Recurring billing support',
      'Automatic reminders',
      'Multi-currency support',
      'Tax calculation',
    ],
    benefits: [
      'Save 5 hours/week on billing',
      'Never miss a payment',
      'Professional appearance',
      'Improved cash flow',
    ],
  },
  {
    id: 3,
    title: 'Setup Webhooks for Real-Time Updates',
    icon: '🔔',
    duration: '7 min',
    difficulty: 'Intermediate',
    description: 'Receive instant notifications when payments are made',
    steps: [
      {
        number: 1,
        title: 'Go to Settings',
        description: 'Navigate to Settings → Webhooks',
        visual: '⚙️',
      },
      {
        number: 2,
        title: 'Add Endpoint',
        description: 'Click "Add Webhook" and enter your HTTPS endpoint URL',
        visual: '🌐',
      },
      {
        number: 3,
        title: 'Select Events',
        description: 'Choose events: payment.captured, payment.failed, refund.processed',
        visual: '✅',
      },
      {
        number: 4,
        title: 'Test Webhook',
        description: 'Click "Test" button to verify your endpoint is working',
        visual: '🧪',
      },
      {
        number: 5,
        title: 'Monitor Deliveries',
        description: 'View webhook delivery logs and retry failed webhooks',
        visual: '📊',
      },
    ],
    features: [
      'Real-time payment notifications',
      'Automatic retries (up to 5 attempts)',
      'Webhook signing for security',
      'Detailed delivery logs',
      'Multiple endpoints supported',
    ],
    benefits: [
      'Instant order fulfillment',
      'Auto-trigger business processes',
      'Customer notifications',
      'Inventory updates',
    ],
  },
  {
    id: 4,
    title: 'Process Refunds & Disputes',
    icon: '↩️',
    duration: '4 min',
    difficulty: 'Beginner',
    description: 'Handle refunds and resolve customer disputes',
    steps: [
      {
        number: 1,
        title: 'Find Payment',
        description: 'Go to Payments and find the transaction to refund',
        visual: '🔍',
      },
      {
        number: 2,
        title: 'Click Refund',
        description: 'Click the "Refund" button on the payment detail page',
        visual: '↩️',
      },
      {
        number: 3,
        title: 'Choose Type',
        description: 'Select full refund or enter partial amount',
        visual: '💰',
      },
      {
        number: 4,
        title: 'Add Note',
        description: 'Optional: Add reason for customer reference',
        visual: '📝',
      },
      {
        number: 5,
        title: 'Confirm',
        description: 'Click "Process Refund" - customer receives money in 2-5 days',
        visual: '✅',
      },
    ],
    features: [
      'Full & partial refunds',
      'Instant processing',
      'Refund status tracking',
      'Dispute management',
      'Chargeback protection',
    ],
    benefits: [
      'Happy customers',
      '99.9% refund success rate',
      'Dispute resolution help',
      'Fraud protection',
    ],
  },
  {
    id: 5,
    title: 'View Detailed Analytics',
    icon: '📊',
    duration: '3 min',
    difficulty: 'Beginner',
    description: 'Track performance with comprehensive dashboard metrics',
    metrics: [
      {
        title: 'Total Revenue',
        value: '₹45,23,450',
        change: '+18.5%',
        period: 'This Month',
        icon: '💵',
      },
      {
        title: 'Payments Processed',
        value: '1,234',
        change: '+12.3%',
        period: 'This Month',
        icon: '💳',
      },
      {
        title: 'Success Rate',
        value: '98.7%',
        change: '+0.8%',
        period: 'This Month',
        icon: '✅',
      },
      {
        title: 'Failed Transactions',
        value: '16',
        change: '-2.1%',
        period: 'This Month',
        icon: '❌',
      },
      {
        title: 'Avg Transaction Value',
        value: '₹3,667',
        change: '+5.2%',
        period: 'This Month',
        icon: '📈',
      },
      {
        title: 'Refund Rate',
        value: '1.2%',
        change: '-0.3%',
        period: 'This Month',
        icon: '↩️',
      },
    ],
    insights: [
      'Peak transaction time: 6 PM - 9 PM',
      'Most used payment method: UPI (45%)',
      'Top customer location: Delhi',
      'Mobile checkout: 72% of total',
      'Repeat customer rate: 34%',
    ],
  },
  {
    id: 6,
    title: 'Manage Team & Permissions',
    icon: '👥',
    duration: '5 min',
    difficulty: 'Intermediate',
    description: 'Add team members with role-based access control',
    steps: [
      {
        number: 1,
        title: 'Go to Team Settings',
        description: 'Navigate to Settings → Team & Permissions',
        visual: '⚙️',
      },
      {
        number: 2,
        title: 'Click Add Member',
        description: 'Enter team member email address',
        visual: '➕',
      },
      {
        number: 3,
        title: 'Select Role',
        description: 'Choose: Admin, Finance, Support, or Viewer',
        visual: '🎯',
      },
      {
        number: 4,
        title: 'Set Permissions',
        description: 'Customize specific permissions (view, process, refund)',
        visual: '🔐',
      },
      {
        number: 5,
        title: 'Send Invite',
        description: 'Member receives email invite and can login',
        visual: '✉️',
      },
    ],
    roles: [
      { name: 'Admin', permissions: ['Full access', 'Manage team', 'Billing', 'Settings'] },
      { name: 'Finance', permissions: ['View reports', 'Process refunds', 'Export data'] },
      { name: 'Support', permissions: ['View payments', 'View disputes', 'Contact customers'] },
      { name: 'Viewer', permissions: ['View reports only', 'Read-only access'] },
    ],
  },
];

// ============================================================================
// GUIDE SECTIONS
// ============================================================================

export const GUIDE_SECTIONS: Record<string, GuideSection> = {
  gettingStarted: {
    title: 'Getting Started',
    guides: INTEGRATION_GUIDES.slice(0, 2),
  },
  paymentProcessing: {
    title: 'Payment Processing',
    guides: INTEGRATION_GUIDES.slice(2, 5),
  },
  noCodeFeatures: {
    title: 'No-Code Features',
    guides: NO_CODE_GUIDES,
  },
  apiReference: {
    title: 'API Reference',
    endpoints: API_ENDPOINTS,
  },
};

// ============================================================================
// QUICK LINKS & RESOURCES
// ============================================================================

export const QUICK_LINKS: QuickLink[] = [
  { title: 'API Documentation', url: '/docs/api' },
  { title: 'SDK Reference', url: '/docs/sdk' },
  { title: 'Error Codes', url: '/docs/errors' },
  { title: 'Rate Limits', url: '/docs/rate-limits' },
  { title: 'Webhooks', url: '/docs/webhooks' },
  { title: 'FAQs', url: '/docs/faq' },
];

export const POPULAR_GUIDES: PopularGuide[] = [
  { title: 'Quickstart', icon: '🚀', time: '5 min' },
  { title: 'Authentication', icon: '🔐', time: '3 min' },
  { title: 'Handle Errors', icon: '⚠️', time: '8 min' },
  { title: 'Best Practices', icon: '⭐', time: '10 min' },
  { title: 'Security', icon: '🛡️', time: '7 min' },
  { title: 'Testing', icon: '🧪', time: '6 min' },
];

// ============================================================================
// FEATURE COMPARISON DATA
// ============================================================================

export const FEATURE_COMPARISON: FeatureComparison = {
  paymentMethods: [
    { method: 'Credit/Debit Card', supported: true, description: 'Visa, Mastercard, RuPay' },
    { method: 'UPI', supported: true, description: 'All major UPI providers' },
    { method: 'Net Banking', supported: true, description: '50+ banks supported' },
    { method: 'Wallets', supported: true, description: 'Apple Pay, Google Pay, Samsung Pay' },
    { method: 'Buy Now Pay Later', supported: true, description: 'Flipkart, Amazon, Simpl' },
  ],
  currencies: [
    { currency: 'INR', supported: true },
    { currency: 'USD', supported: true },
    { currency: 'EUR', supported: true },
    { currency: 'GBP', supported: true },
    { currency: 'AED', supported: true },
  ],
  features: [
    { name: 'Real-time Webhooks', available: true },
    { name: 'Recurring Billing', available: true },
    { name: 'Payment Links', available: true },
    { name: 'Smart Routing', available: true },
    { name: 'Fraud Detection', available: true },
    { name: 'Invoice Management', available: true },
  ],
};

// ============================================================================
// CODE SNIPPETS BY LANGUAGE
// ============================================================================

export const CODE_SNIPPETS: CodeSnippets = {
  node: {
    language: 'JavaScript / Node.js',
    setup: `npm install @payfi/sdk`,
    initialize: `const Payfi = require('@payfi/sdk');
const payfi = new Payfi({ apiKey: 'sk_test_xxx' });`,
    payment: `const payment = await payfi.payments.create({
  amount: 2999,
  currency: 'INR',
  customerEmail: 'user@example.com'
});`,
  },
  python: {
    language: 'Python',
    setup: `pip install payfi`,
    initialize: `import payfi
client = payfi.Client(api_key='sk_test_xxx')`,
    payment: `payment = client.payments.create(
    amount=2999,
    currency='INR',
    customer_email='user@example.com'
)`,
  },
  php: {
    language: 'PHP',
    setup: `composer require payfi/sdk`,
    initialize: `require 'vendor/autoload.php';
$payfi = new Payfi\\Client('sk_test_xxx');`,
    payment: `$payment = $payfi->payments->create([
    'amount' => 2999,
    'currency' => 'INR',
    'customer_email' => 'user@example.com'
]);`,
  },
  ruby: {
    language: 'Ruby',
    setup: `gem 'payfi'`,
    initialize: `require 'payfi'
Payfi.api_key = 'sk_test_xxx'`,
    payment: `payment = Payfi::Payment.create(
  amount: 2999,
  currency: 'INR',
  customer_email: 'user@example.com'
)`,
  },
  curl: {
    language: 'cURL',
    setup: 'No installation needed',
    payment: `curl -X POST https://api.payfi.io/v1/payments \\
  -H "Authorization: Bearer sk_test_xxx" \\
  -d "amount=2999" \\
  -d "currency=INR" \\
  -d "customer_email=user@example.com"`,
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  INTEGRATION_GUIDES,
  API_ENDPOINTS,
  NO_CODE_GUIDES,
  GUIDE_SECTIONS,
  QUICK_LINKS,
  POPULAR_GUIDES,
  FEATURE_COMPARISON,
  CODE_SNIPPETS,
};
