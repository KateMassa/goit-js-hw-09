document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.feedback-form');

  // Check local storage for saved data
  const savedState = localStorage.getItem('feedback-form-state');
  if (savedState) {
    try {
      const { email, message } = JSON.parse(savedState);

      // Check if email and message are defined before setting values
      if (savedState.email !== undefined && savedState.message !== undefined) {
        form.elements.email.value = savedState.email;
        form.elements.message.value = savedState.message;
      }
    } catch (error) {
      console.error('Error parsing saved state:', error);
    }
  }

  // Save data to local storage on input
  form.addEventListener('input', function (event) {
    const { name, value } = event.target;
    const currentState =
      JSON.parse(localStorage.getItem('feedback-form-state')) || {};
    // Remove leading and trailing spaces
    currentState[name] = value.trim();
    localStorage.setItem('feedback-form-state', JSON.stringify(currentState));
  });

  // Submit form
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const { email, message } = form.elements;

    // Check if both fields are filled
    if (email.value.trim() !== '' && message.value.trim() !== '') {
      // Log data to console
      console.log({
        email: email.value.trim(),
        message: message.value.trim(),
      });

      // Clear local storage and form fields
      localStorage.removeItem('feedback-form-state');
      form.reset();
    }
  });
});
