import type { APIRoute } from 'astro';
import type { FormData } from '../../interfaces/post-data';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // Parse the JSON body

  console.log('*** ', FormData);
  // ClickUp API credentials and list ID
  const clickUpToken = 'pk_152639259_U3LIJRBM0D7S8AB7CUHDM6ZQV316S07Q';
  const listId = '901205577229';
  console.log('*** ', 'submiting');

  try {
    const { title, description }: FormData = await request.json();
    // Make the API request to ClickUp to create a new task
    const response = await fetch(
      `https://api.clickup.com/api/v2/list/${listId}/task`,
      {
        method: 'POST',
        headers: {
          Authorization: clickUpToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: title,
          description: description,
        }),
      }
    );
    console.log('*** ', response);
    // Check if the ClickUp API request was successful
    if (!response.ok) {
      const errorMessage = await response.text();
      return new Response(
        JSON.stringify({ message: `Failed to create ticket: ${errorMessage}` }),
        { status: response.status }
      );
    }

    return new Response(JSON.stringify({ message: `All Done` }), {
      status: response.status,
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: e.message }));
  }
};