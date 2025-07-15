export async function sendGotifyNotification(title, message, priority = 5) {
  const gotifyUrl = process.env.GOTIFY_URL;
  const gotifyToken = process.env.GOTIFY_TOKEN;

  if (!gotifyUrl || !gotifyToken) {
    console.log('Gotify URL or Token not provided, skipping notification');
    return;
  }

  try {
    const response = await fetch(`${gotifyUrl}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Gotify-Key': gotifyToken
      },
      body: JSON.stringify({
        title: title,
        message: message,
        priority: priority
      })
    });

    if (response.ok) {
      console.log('Gotify notification sent successfully');
    } else {
      console.error('Failed to send Gotify notification:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending Gotify notification:', error.message);
  }
}