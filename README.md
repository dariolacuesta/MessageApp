# WhatsApp & SMS Notification App

This application allows you to send WhatsApp and SMS messages using the Twilio API. It provides a user-friendly interface to select dynamic templates, schedule reminders, and manage automated notifications.

---

## **Features**

- Send WhatsApp messages with customizable templates.
- Send SMS messages with a simple message editor.
- Automatic replies configurable via Webhooks.
- Real-time visualization of incoming messages (optional with WebSocket).

---

## **Requirements**

Before starting, ensure you have the following set up:

1. An active Twilio account (https://www.twilio.com/).
2. A verified WhatsApp number (can be configured in the Twilio console).
3. Templates for whatsapp in twilio.
4. A local development environment with Node.js installed.
5. Ngrok (https://ngrok.com/) (optional, to expose your local server to the internet).

---

## **Installation**

1. Clone this repository:

   ```
   git clone https://github.com/your-repository/whatsapp-sms-app.git
   cd whatsapp-sms-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:

   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_WHATSAPP_NUMBER=your_whatsapp_number
   TWILIO_PHONE_NUMBER=your_sms_number
   API_KEY=any_jwt_token ( this allows the API calls)
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. (Optional) If working locally, run ngrok to expose your server:

   ```
   ngrok http 3000
   ```

   Use the generated ngrok URL as your webhook in Twilio:  
   `https://your-ngrok-url.ngrok.io/api/whatsapp/webhook`

---

## **Usage**

### **Sending WhatsApp Messages**

1. Open the application in your browser.
2. Click the **Send WhatsApp** button to open the modal.
3. Fill in the required fields:
   - Select a template.
   - Enter the recipient's phone number (e.g., +541166778899).
   - Complete the dynamic placeholders.
4. Click **Send Message**.

### **Sending SMS Messages**

1. Click the **Send SMS** button to open the modal.
2. Fill in the recipient's phone number and the message.
3. Click **Send Message**.

---

## **Webhooks**

Set up Twilio webhooks to receive incoming messages or status updates. Use the following webhook URL in the Twilio Console:

`https://your-server/api/whatsapp/webhook`

### **Automatic Replies**

Incoming WhatsApp messages can trigger automated replies. For example:

- If a user sends "Hello," the system replies with "Hi! How can I help you?"

Example code for auto-replies:

```js
if (Body.toLowerCase().includes("hello")) {
  await TwilioClient.messages.create({
    from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
    to: From,
    body: "Hi! How can I help you?",
  });
}
```

---

## **Demo Videos**

1. Sending a WhatsApp Message: [Watch Video](https://youtu.be/o9b4LiOayDM)
2. Sending an SMS Message: [Watch Video](https://youtu.be/anpOQ_zYSC8)
