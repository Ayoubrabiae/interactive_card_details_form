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
const themeBtn = document.querySelector('#theme-btn');
const themeCategoriesContainer = document.querySelector('.theme .categories');

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
          <i class="fa-solid fa-check"></i>
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

// THEME OPTION
const themesCollection = [
  {
    mainBg: 'linear-gradient(to right, #592264, #37103D)',
    activeColor: 'linear-gradient(to right, hsl(249, 99%, 64%), hsl(278, 94%, 30% ))',
    light: 'hsl(279, 6%, 55%)',
    dark: 'hsl(278, 68%, 11%)',
  },
  {
    mainBg: 'linear-gradient(to right, #32504e, #123434)',
    activeColor: 'linear-gradient(to right, hsl(120, 88%, 50%), hsl(160, 85%, 40%))',
    light: 'hsl(170, 20%, 60%)',
    dark: 'hsl(160, 75%, 12%)',
  },
  {
    mainBg: 'linear-gradient(to right, #ff8c42, #f16821)',
    activeColor: 'linear-gradient(to right, hsl(30, 95%, 55%), hsl(12, 92%, 35%))',
    light: 'hsl(40, 10%, 70%)',
    dark: 'hsl(12, 70%, 10%)',
  },
  {
    mainBg: 'linear-gradient(to right, #8c43ff, #6c21f1)',
    activeColor: 'linear-gradient(to right, hsl(270, 85%, 60%), hsl(240, 80%, 40%))',
    light: 'hsl(260, 15%, 75%)',
    dark: 'hsl(240, 60%, 12%)',
  },
  {
    mainBg: 'linear-gradient(to right, #ff5e42, #f12121)',
    activeColor: 'linear-gradient(to right, hsl(0, 95%, 60%), hsl(5, 92%, 35%))',
    light: 'hsl(10, 20%, 70%)',
    dark: 'hsl(5, 70%, 12%)',
  },
  {
    mainBg: 'linear-gradient(to right, #42ff7e, #21f146)',
    activeColor: 'linear-gradient(to right, hsl(120, 80%, 60%), hsl(140, 75%, 40%))',
    light: 'hsl(150, 15%, 75%)',
    dark: 'hsl(140, 60%, 12%)',
  },
  {
    mainBg: 'linear-gradient(to right, #ffbb42, #f19921)',
    activeColor: 'linear-gradient(to right, hsl(45, 85%, 60%), hsl(60, 80%, 40%))',
    light: 'hsl(70, 20%, 70%)',
    dark: 'hsl(60, 60%, 12%)',
  },
  {
    mainBg: 'linear-gradient(to right, #f442ff, #f121aa)',
    activeColor: 'linear-gradient(to right, hsl(300, 80%, 60%), hsl(320, 75%, 40%))',
    light: 'hsl(330, 15%, 75%)',
    dark: 'hsl(320, 60%, 12%)',
  },
  {
    mainBg: 'linear-gradient(to right, #42c8ff, #2191f1)',
    activeColor: 'linear-gradient(to right, hsl(210, 80%, 60%), hsl(230, 75%, 40%))',
    light: 'hsl(240, 15%, 75%)',
    dark: 'hsl(230, 60%, 12%)',
  },
  {
    mainBg: 'linear-gradient(to right, #ff4242, #f12121)',
    activeColor: 'linear-gradient(to right, hsl(0, 80%, 60%), hsl(5, 75%, 40%))',
    light: 'hsl(10, 15%, 75%)',
    dark: 'hsl(5, 60%, 12%)',
  },
];

const changeTheme = (theme) => {
  const rootElement = document.querySelector(':root');
  rootElement.style.setProperty('--main-bg', theme.mainBg);
  rootElement.style.setProperty('--active-border-color', theme.activeColor);
  rootElement.style.setProperty('--dark-grayish', theme.light);
  rootElement.style.setProperty('--very-dark', theme.dark);
};

themesCollection.forEach((theme, i) => {
  const themeCategory = `<span class="category" style="background: ${theme.activeColor}"><span>`;
  const themeCategoryElement = document.createRange().createContextualFragment(themeCategory);

  themeCategoriesContainer.appendChild(themeCategoryElement);
});

document.querySelectorAll('.theme .category').forEach((themeElement, i) => {
  if (i === 0) {
    themeElement.classList.add('active');
  }

  themeElement.addEventListener('click', () => {
    themeElement.parentElement.querySelector('.active').classList.remove('active');
    themeElement.classList.add('active');
    changeTheme(themesCollection[i]);
  });
});

themeBtn.addEventListener('click', () => {
  themeCategoriesContainer.classList.toggle('active');
});
