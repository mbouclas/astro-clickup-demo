<script lang="ts">
 let title = '';
  let description = '';
  let submitting = false;
  let responseMessage = '';
let message = ' '
  // Handle form submission
  const submitForm = async (event: Event) => {
    event.preventDefault(); // Prevent default form submission

    // Set submitting state to true
    submitting = true;

    // Prepare data to be sent
    const data = { title, description };

    try {
      const response = await fetch('/api/submit-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Send as JSON
        },
        body: JSON.stringify(data), // Convert data to JSON
      });

      const result = await response.json();
      if (response.ok) {
        responseMessage = 'Ticket created successfully!';
      } else {
        responseMessage = `Error: ${result.error || 'An unknown error occurred'}`;
      }
    } catch (error) {
      responseMessage = 'Error: Failed to send the request';
    } finally {
      submitting = false; // Reset submitting state
    }
  };
</script>

<form on:submit|preventDefault={submitForm} class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-semibold text-center mb-4">Submit a Ticket</h2>

  <!-- Title Field -->
  <div class="mb-4">
    <label for="title" class="block text-sm font-medium text-gray-700">Title:</label>
    <input
      type="text"
      id="title"
      bind:value={title}
      required
      class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  <!-- Description Field -->
  <div class="mb-4">
    <label for="description" class="block text-sm font-medium text-gray-700">Description:</label>
    <textarea
      id="description"
      bind:value={description}
      required
      class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      rows="4"
    ></textarea>
  </div>

  <!-- Submit Button -->
  <div class="flex justify-center">
    <button
      type="submit"
      class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      disabled={submitting}
    >
      {submitting ? 'Submitting...' : 'Submit'}
    </button>
  </div>

  <!-- Response Message -->
  {#if responseMessage}
    <div class="mt-4 text-center text-sm text-gray-700">
      {responseMessage}
    </div>
  {/if}
</form>
{#if message}
  <p>{message}</p>
{/if}
