# Razorpay Payment Integration Setup

## Step 1: Create Razorpay Account

1. Go to https://razorpay.com/
2. Click "Sign Up" and create an account
3. Complete KYC verification (required for live payments)
4. For testing, you can use Test Mode without KYC

## Step 2: Get API Keys

1. Login to Razorpay Dashboard: https://dashboard.razorpay.com/
2. Go to Settings → API Keys
3. Generate Test Keys (for development)
4. Copy both:
   - Key ID (starts with `rzp_test_`)
   - Key Secret

## Step 3: Update Environment Variables

Open `.env` file and update:

```env
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

## Step 4: Install Dependencies

```bash
npm install razorpay
```

## Step 5: Test Payment

1. Start your backend: `npm run server:dev`
2. Start your frontend: `npm run dev`
3. Go to Store page
4. Click on any product
5. Click "Purchase Now"
6. Use test card details:

### Test Card Details (Razorpay Test Mode)

**Card Number:** 4111 1111 1111 1111
**CVV:** Any 3 digits
**Expiry:** Any future date
**Name:** Any name

Or use UPI: `success@razorpay`

## Step 6: Go Live (Production)

1. Complete KYC verification in Razorpay Dashboard
2. Activate your account
3. Generate Live API Keys (starts with `rzp_live_`)
4. Update `.env` with live keys
5. Deploy your application

## Features Implemented

✅ Real-time payment processing
✅ Razorpay checkout modal
✅ Payment verification with signature
✅ Order history in user profile
✅ Secure payment handling
✅ Indian Rupee (₹) currency
✅ Email notifications (optional)

## Payment Flow

1. User clicks "Purchase Now"
2. Backend creates Razorpay order
3. Frontend opens Razorpay checkout modal
4. User completes payment
5. Backend verifies payment signature
6. Order saved to database
7. User redirected to profile with order history

## Security Features

- Payment signature verification
- Server-side order creation
- Secure key storage in environment variables
- HTTPS required for production

## Testing

### Successful Payment
- Card: 4111 1111 1111 1111
- UPI: success@razorpay

### Failed Payment
- Card: 4000 0000 0000 0002
- UPI: failure@razorpay

## Support

For issues:
- Razorpay Docs: https://razorpay.com/docs/
- Support: https://razorpay.com/support/

## Important Notes

⚠️ Never commit `.env` file to Git
⚠️ Use Test Mode for development
⚠️ Complete KYC before going live
⚠️ Keep API keys secure
⚠️ Enable webhooks for production (optional)
