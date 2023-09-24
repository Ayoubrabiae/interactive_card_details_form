const inputs = document.querySelectorAll('input');
const form = document.querySelector('form');
const formContainer = document.querySelector('.form-container');
const cardNameInput = document.querySelector('#card-name');
const cardNameOutput = document.querySelector('.card-info .name');
const cardNumberInput = document.querySelector('#card-number');
const cardNumberOutput = document.querySelector('.card-info .number');
const cardMonthInput = document.querySelector('#exp-month');
const cardMonthOutput = document.querySelector('.date .month');
const cardYearInput = document.querySelector('#exp-year');
const cardYearOutput = document.querySelector('.date .year');
const cvcInput = document.querySelector('#cvc');
const cvcOutput = document.querySelector('.cvc');
const submitBtn = document.querySelector('.submit-btn');

// ADD ACTIVE COLOR TO THE FOCUSED INPUT
inputs.forEach((inp) => {
  const input = inp;
  input.addEventListener('focusin', () => {
    input.parentElement.classList.add('focus');
  });
  input.addEventListener('focusout', () => {
    input.parentElement.classList.remove('focus');
  });
});

// Fucntion to add errors highlight
const showError = (inp, msg) => {
  const input = inp;
  input.focus();
  input.parentElement.parentElement.querySelector('.error-label').textContent = msg;
  input.parentElement.parentElement.classList.add('error-container');
  input.parentElement.style.background = 'var(--error-color)';
};
// Function to remove errors highlight
const hideError = (inp) => {
  const input = inp;
  input.parentElement.parentElement.querySelector('.error-label').textContent = '';
  input.parentElement.parentElement.classList.remove('error-container');
  input.parentElement.style.background = 'var(--active-border-color)';
};

// ADD ALL INFORMATION TO CART
const cardItems = [{ output: cardNameOutput, input: cardNameInput, defaultValue: 'Jane Appleseed' },
  { output: cardNumberOutput, input: cardNumberInput, defaultValue: '0000 0000 0000 0000' },
  { output: cardMonthOutput, input: cardMonthInput, defaultValue: '00' },
  { output: cardYearOutput, input: cardYearInput, defaultValue: '00' },
  { output: cvcOutput, input: cvcInput, defaultValue: '000' }];

const addInfoCard = (inp, output, defaultValue) => {
  const outputContainer = output;
  if (inp.value === '') {
    outputContainer.textContent = defaultValue;
    showError(inp, "Can't be blank");
    return;
  }
  hideError(inp);
  outputContainer.textContent = inp.value;
};

cardItems.forEach((item) => {
  item.input.addEventListener('input', (e) => addInfoCard(e.target, item.output, item.defaultValue));
});

// COMPLETE FUNCTION (SUBMIT THE FORM)

const completeForm = () => {
  const completeStringElement = `
      <div class="complete">
          <img src="images/icon-complete.svg" alt="complete icon">
          <h3>Thank you</h3>
          <p>We've added your card details</p>
        </div>
  `;
  const completeElement = document.createRange().createContextualFragment(completeStringElement);
  formContainer.remove();
  form.prepend(completeElement);
  submitBtn.textContent = 'Continue';
  submitBtn.addEventListener('click', () => window.location.reload());
};

// CHECK INPUTS IN THE SUBMIT
const checkInputs = () => {
  const numRegExp = /\d{4}\s\d{4}\s\d{4}\s\d{4}/;

  if (cardNumberInput.value.length < 16 && cardNumberInput.value.length > 1) {
    showError(cardNumberInput, 'You must enter 16 numbers');
  } else if (!numRegExp.test(cardNumberInput.value)) {
    showError(cardNumberInput, 'Wrong format');
  } else if (Number(cardMonthInput.value) < 1 || Number(cardMonthInput.value) > 12) {
    showError(cardMonthInput, 'Wrong Date');
  } else if (Number(cardYearInput.value) < 23 || Number(cardYearInput.value) > 40) {
    showError(cardYearInput, 'Wrong Date');
  } else if (cvcInput.value.length !== 3) {
    showError(cardYearInput, 'Wrong CVC');
  } else {
    completeForm();
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
});
