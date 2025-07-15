export async function sendGotifyNotification(title, message, priority = 5) {
  const gotifyUrl = process.env.GOTIFY_URL;
  const gotifyToken = process.env.GOTIFY_TOKEN;

  if (!gotifyUrl || !gotifyToken) {
    console.log('Gotify URL or Token not provided, skipping notification');
    return;
  }

  try {
    const formData = new URLSearchParams();
    formData.append('title', title);
    formData.append('message', message);
    formData.append('priority', priority.toString());

    const response = await fetch(`${gotifyUrl}/message?token=${gotifyToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
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