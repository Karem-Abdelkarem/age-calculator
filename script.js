const inputElements = document.querySelectorAll(".card__input");
const submitButton = document.querySelector(".card__button");

const validatDay = (day) => {
  if (day && day > 0 && day <= 31) {
    return true;
  }
};

const validatMonth = (month) => {
  if (month && month > 0 && month <= 12) {
    return true;
  }
};
const validatYear = (year) => {
  const currentYear = new Date().getFullYear();
  if (year && year > 0 && year <= currentYear) {
    return true;
  }
};

const isDateValid = (yearInput, monthInput, dayInput) => {
  let isValid = [false, false, false];

  if (!validatDay(dayInput.value)) {
    dayInput.classList.add("card__input--error");
  } else {
    isValid[0] = true;
    dayInput.classList.remove("card__input--error");
  }

  if (!validatMonth(monthInput.value)) {
    monthInput.classList.add("card__input--error");
  } else {
    isValid[1] = true;
    monthInput.classList.remove("card__input--error");
  }
  if (!validatYear(yearInput.value)) {
    yearInput.classList.add("card__input--error");
  } else {
    isValid[2] = true;
    yearInput.classList.remove("card__input--error");
  }

  return isValid.every((item) => item === true);
};

const ageCalculator = (year, month, day) => {
  const today = new Date();
  const birthdate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }
  return age;
};

const onClickHandler = () => {
  const dayInput = document.querySelector('.card__input[name="day"]');
  const monthInput = document.querySelector('.card__input[name="month"]');
  const yearInput = document.querySelector('.card__input[name="year"]');
  const resultElement = document.querySelector(".card__resultValue");

  if (!isDateValid(yearInput, monthInput, dayInput)) {
    resultElement.textContent = "--";
    return;
  }

  resultElement.textContent = ageCalculator(
    yearInput.value,
    monthInput.value,
    dayInput.value
  );
};

inputElements.forEach((item) => {
  item.addEventListener(
    "keydown",
    (e) => e.key === "Enter" && onClickHandler()
  );
});

submitButton.addEventListener("click", onClickHandler);
