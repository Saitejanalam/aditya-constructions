# EmailJS Setup Instructions

## 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account (phanitech2020@gmail.com)
5. Note down your **Service ID** (replace `service_abc123` in the code)

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Enquiry from {{from_name}} - Sri Aditya Developers

**Content:**
```
Hello,

You have received a new enquiry through the Sri Aditya Developers website.

Customer Details:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone_number}}
- Company: {{company_name}}

Message:
{{message}}

---
This email was sent from the Sri Aditya Developers website contact form.
```

4. Save the template and note down your **Template ID** (replace `template_xyz789` in the code)

## 4. Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (replace `user_public_key_123` in the code)

## 5. Update Code
Replace these values in `/components/Landing/Home.js`:

```javascript
const EMAILJS_SERVICE_ID = 'your_actual_service_id';
const EMAILJS_TEMPLATE_ID = 'your_actual_template_id';
const EMAILJS_PUBLIC_KEY = 'your_actual_public_key';
```

## 6. Test the Form
1. Fill out the contact form on your website
2. Submit it to test if emails are being sent to phanitech2020@gmail.com
3. Check both the success message and your email inbox

## Template Variables Used:
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{phone_number}}` - Customer's phone
- `{{message}}` - Customer's message
- `{{company_name}}` - "Sri Aditya Developers"
- `{{to_email}}` - "phanitech2020@gmail.com"

## Notes:
- EmailJS free plan allows 200 emails/month
- For production, consider upgrading to a paid plan
- Keep your credentials secure and don't commit them to version control
