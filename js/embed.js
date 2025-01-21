window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('Webflow script execution started');

  // Initialize form state
  const formState = {
    currentStep: 0
  };
  // Get form elements
  const nextButtons = document.querySelectorAll('[data-action="next"]');
  const prevButtons = document.querySelectorAll('[data-action="previous"]');
  const slider = document.querySelector('.contact_slider');
  // Function to go to the next slide
  function goToNextStep() {
    console.log('Attempting to go to next step:', formState.currentStep);
    if (validationRules[formState.currentStep]()) {
      console.log('Validation passed for step:', formState.currentStep);
      formState.currentStep++;
      console.log('Advanced to step:', formState.currentStep);
      // Trigger the next slide using Webflow's slider API
      $(slider).find('.w-slider-arrow-right').click();
    } else {
      console.log('Validation failed for step:', formState.currentStep);
    }
  }
  // Function to go to the previous slide
  function goToPreviousStep() {
    if (formState.currentStep > 0) {
      formState.currentStep--;
      console.log('Returned to step:', formState.currentStep);
      // Trigger the previous slide using Webflow's slider API
      $(slider).find('.w-slider-arrow-left').click();
    } else {
      console.log('Already at the first step, cannot go back further.');
    }
  }
  // Event listeners for next buttons
  nextButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Next button clicked at step:', formState.currentStep);
      goToNextStep();
    });
  });
  // Event listeners for previous buttons
  prevButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Previous button clicked');
      goToPreviousStep();
    });
  });
  // Initialize slide visibility
  console.log('Slider initialized, current step:', formState.currentStep);
  const validationRules = {
    0: () => true, // Temporarily allow step 0 to always pass validation
    1: () => {
      const isValid = validateStep1();
      console.log('Validation result for step 1:', isValid);
      return isValid;
    },
    2: () => {
      const isValid = validateStep2();
      console.log('Validation result for step 2:', isValid);
      return isValid;
    },
    3: () => {
      const isValid = validateStep3();
      console.log('Validation result for step 3:', isValid);
      return isValid;
    },
    4: () => true // Confirmation step
  };
  function validateStep1() {
    const firstName = document.getElementById('First-name').value;
    const lastName = document.getElementById('Last-name').value;
    const email = document.getElementById('Email-address').value;
    const phone = document.getElementById('Phone-number').value;
    const products = document.querySelectorAll('#product-type input[type="checkbox"]:checked');
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Products selected:', products.length);
    // Show/hide error messages
    toggleError('first-name-error', !firstName);
    toggleError('last-name', !lastName);
    toggleError('email-address', !isValidEmail(email));
    toggleError('phone-number', !isValidPhone(phone));
    toggleError('product', products.length === 0);
    return firstName && lastName && isValidEmail(email) && isValidPhone(phone) && products.length > 0;
  }
  function validateStep2() {
    // Add your validation logic for step 2 here
    // For example, check if a certain field is filled
    const someField = document.getElementById('some-field-id').value;
    const isValid = someField !== '';
    console.log('Step 2 validation:', isValid, 'Field value:', someField);
    return isValid;
  }
  function validateStep3() {
    // Add your validation logic for step 3 here
    // For example, check if a certain field is filled
    const anotherField = document.getElementById('another-field-id').value;
    const isValid = anotherField !== '';
    console.log('Step 3 validation:', isValid, 'Field value:', anotherField);
    return isValid;
  }
 
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  const selectElement = document.querySelector('[fs-combobox-element="select"].combobox_select.w-select');
  const selectedWrapper = document.querySelector('.form_combobox-select-wrapper');

  if (selectElement && selectedWrapper) {
    console.log('Combobox and selected wrapper elements found');

    selectElement.addEventListener('change', (event) => {
      const selectedOptions = Array.from(selectElement.selectedOptions);
      selectedWrapper.innerHTML = ''; // Clear existing selections

      selectedOptions.forEach(option => {
        const stateWrapper = document.createElement('a');
        stateWrapper.classList.add('form_combobox-selected-state-wrapper', 'w-inline-block');
        stateWrapper.href = '#';

        const stateText = document.createElement('div');
        stateText.classList.add('form_combobox-selected-state-text');
        stateText.textContent = option.value; // Use the option's value

        const removeIcon = document.createElement('div');
        removeIcon.classList.add('combobox_reset', 'w-embed');
        removeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"></path>
                                </svg>`;

        // Append text and remove icon to the state wrapper
        stateWrapper.appendChild(stateText);
        stateWrapper.appendChild(removeIcon);

        // Append the state wrapper to the selected wrapper
        selectedWrapper.appendChild(stateWrapper);

        // Add event listener to remove the selected state
        removeIcon.addEventListener('click', (e) => {
          e.preventDefault();
          option.selected = false; // Deselect the option
          stateWrapper.remove(); // Remove the element from the DOM
        });
      });

      console.log('Selected options updated');
    });
  } else {
    console.error('Combobox or selected wrapper element not found');
  }
});
