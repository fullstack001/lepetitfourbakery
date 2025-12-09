# Order Confirmation Email Troubleshooting Guide

## Problem
Customers are not receiving order confirmation emails after placing orders.

## Common Causes & Solutions

### 1. **Environment Configuration** ⚠️ MOST COMMON
**Issue**: Emails only send in `staging` or `production` environments.

**Check**:
```bash
php artisan tinker
>>> config('app.env')
```

**Solution**: 
- Ensure your `.env` file has `APP_ENV=production` or `APP_ENV=staging`
- If testing locally, temporarily change line 63 in `HandleCheckoutSessionCompleted.php` to include your local environment

### 2. **Queue Worker Not Running**
**Issue**: If using database/redis queues, jobs won't process without a queue worker.

**Check**:
```bash
# Check if queue worker is running
ps aux | grep "queue:work"

# Check for failed jobs
php artisan queue:failed
```

**Solution**:
```bash
# Start queue worker (if using database/redis queues)
php artisan queue:work

# Or use supervisor/systemd to keep it running
```

**Note**: If `QUEUE_CONNECTION=sync` in `.env`, emails send immediately (no queue worker needed).

### 3. **Email Configuration Issues**
**Check your `.env` file**:
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailgun.org
MAIL_PORT=587
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@lepetitfourbakery.com
MAIL_FROM_NAME="Le Petit Four Bakery"
```

**Test email configuration**:
```bash
php artisan tinker
>>> Mail::raw('Test email', function($msg) { $msg->to('your-email@example.com')->subject('Test'); });
```

### 4. **Invalid or Missing Email Address**
**Issue**: Order email field is empty or invalid.

**Check logs** for messages like:
- "Invalid or missing email address"
- "Invalid email address: [email]"

**Solution**: Verify orders have valid email addresses in the database.

### 5. **Email Service Provider Issues**
**Check**:
- Mailgun/SES/Postmark account status
- API keys are valid and not expired
- Sending limits not exceeded
- Domain verification status

### 6. **Email Going to Spam**
**Check**:
- SPF records configured
- DKIM records configured
- DMARC policy set
- Email content not triggering spam filters

## How to Check Logs

### View Recent Email Logs
```bash
tail -f storage/logs/laravel.log | grep "Order confirmation email"
```

### Search for Specific Order
```bash
grep "Order #12345" storage/logs/laravel.log
```

### Check for Errors
```bash
grep -i "error\|failed\|exception" storage/logs/laravel.log | grep -i "email\|order"
```

## Manual Email Resend

If you need to manually resend an order confirmation email:

1. **Find the order** in your database/admin panel
2. **Get the order details**:
   - Order number
   - Customer email
   - Stripe session ID

3. **Use tinker to resend**:
```php
php artisan tinker

$order = \App\Models\Order::where('number', 'ORDER_NUMBER')->first();
$user = $order->user;
$settings = \App\Models\Settings::first();
$data = [
    'order_number' => $order->number,
    'user_name' => $user->name ?? $order->full_name ?? 'Customer',
    'user_email' => $order->email,
    'admin_email' => env('ADMIN_EMAIL'),
    'amount_formatted' => '$' . number_format($order->amount, 2, '.', ','),
    'date_formatted' => $order->created_at_formatted,
    'pickup_formatted' => $order->datetime_formatted,
    'our_address_1' => $settings->our_address_1,
    'our_address_2' => $settings->our_address_2,
    'our_city_postcode' => $settings->our_city_postcode,
    'our_phone_number' => $settings->our_phone_number,
    'items' => $order->items,
    'custom_message' => 'Thank you for your order!',
    'is_pickup' => false,
];

\Illuminate\Support\Facades\Mail::to($order->email)->send(
    new \App\Mail\OrderNotification('Your order with Le Petit Four Bakery', $data)
);
```

## Quick Diagnostic Checklist

- [ ] `APP_ENV` is set to `production` or `staging`
- [ ] Queue worker is running (if not using `sync`)
- [ ] Email credentials in `.env` are correct
- [ ] Email service provider account is active
- [ ] Order has valid email address
- [ ] Check `storage/logs/laravel.log` for errors
- [ ] Check `failed_jobs` table for failed email jobs
- [ ] Test email sending manually

## Recent Code Improvements

The code has been updated to:
- ✅ Log when emails are skipped due to environment
- ✅ Validate email addresses before sending
- ✅ Provide detailed error messages in logs
- ✅ Log success/failure for each email recipient separately
- ✅ Include order number and email in all log messages

## Need More Help?

Check the Laravel logs at: `storage/logs/laravel.log`

Look for log entries starting with "Order confirmation email:" to see detailed information about what's happening with each email send attempt.

