const enterButton = document.querySelector(".btn");
const inputFields = document.querySelectorAll(".dayValue");
const errorContainer = document.querySelectorAll(".elem");
const headings = document.querySelectorAll(".dayHeading");
const presentYear = new Date().getFullYear();
const redColor = "hsl(0, 100%, 67%) ";

//set the color of respective html elements and its borders
function setElementColor(input, index) {
  input.style.borderColor = redColor;
  headings[index].style.color = redColor;
}

//To extract max number of days from the month given by the user
function getMaxDays(month, year) {
  const inputMonth = parseInt(month, 10);
  const inputYear = parseInt(year, 10);
  const lastDayOfMonth = new Date(inputYear, inputMonth, 0).getDate();
  return lastDayOfMonth;
}

//To validate the day entered by user
function validateDay(inputValue, index, monthEntered) {
  const p = document.createElement("p");
  p.classList = "error";
  clearError(index);
  if (!monthEntered) {
    p.textContent = "Month is required";
    setElementColor(inputFields[1], 1);
    errorContainer[1].appendChild(p);
    return false;
  }
  const maxDays = getMaxDays(inputFields[1].value, inputFields[2].value);
  if (inputValue > maxDays || inputValue < 1) {
    p.textContent = "Must be valid day";
    setElementColor(inputFields[index], index);
    errorContainer[index].appendChild(p);
    return false;
  }
  console.log("Validation passed.");
  return true;
}

//validate month entered by the user
function validateMonth(inputValue, index) {
  const p = document.createElement("p");
  p.classList = "error";
  if (inputValue > 12 || inputValue < 1) {
    p.textContent = "Must be a valid month";
    setElementColor(inputFields[index], index);
    errorContainer[index].appendChild(p);
    return false;
  }
  return true;
}

// validate year entered by the year 
function validateYear(inputValue, index) {
  const p = document.createElement("p");
  p.classList = "error";
  if (inputValue < 1) {
    p.textContent = "Must be a valid year";
    setElementColor(inputFields[index], index);
    errorContainer[index].appendChild(p);
    return false;
  }
  if (inputValue > presentYear) {
    p.textContent = "Must be in the past";
    setElementColor(inputFields[index], index);
    errorContainer[index].appendChild(p);
    return false;
  }
  return true;
}

// Function to clear errors for specific input
function clearError(index) {
  const existingError = errorContainer[index].querySelector(".error");
  if (existingError) {
    errorContainer[index].removeChild(existingError);
    inputFields[index].style.borderColor = "";
    headings[index].style.color = "";
  }
}

// Function to display error messages for specific input
function displayError(index, message) {
  const p = document.createElement("p");
  p.textContent = message;
  p.classList = "error";
  setElementColor(inputFields[index], index);
  errorContainer[index].appendChild(p);
}

// Function to validate all the input fields
function validation() {
  let monthEntered = false;
  const inputArray = Array.from(inputFields);
  inputArray.forEach((input, index) => {
    const inputValue = parseInt(input.value, 10);
    clearError(index);
    // check if the input field is empty or not a number 
    if (isNaN(inputValue) || input.value.trim() === "") {
      displayError(index, "This field is required");
      return false;
    } else {
      // Validate day, month, and year based on their respective indices
      if (index === 0) {
        monthEntered = true;
        return validateDay(inputValue, index, monthEntered);
      } else if (index === 1) {
        return validateMonth(inputValue, index);
      } else if (index === 2) {
        return validateYear(inputValue, index);
      }
    }
  });
  return true;
}

// Function to get the last day of a month for a given month and year
function getLastDayofMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

// Function to calculate age
function ageCalcultor(day, month, year) {
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();

  //Additional Feature to check the leap year
  // const isLeapYear = (year) => {
  //   return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  // };

  let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageInMonths = currentDate.getMonth() - birthDate.getMonth();
  let ageInDays = currentDate.getDate() - birthDate.getDate();
  if (ageInDays < 0) {
    ageInMonths--;
    ageInDays += getLastDayofMonth(
      birthDate.getMonth(),
      birthDate.getFullYear()
    );
  }
  if (ageInMonths < 0) {
    ageInYears--;
    ageInMonths += 12;
  }

  // if (isLeapYear(birthDate.getFullYear()) && birthDate.getMonth() <= 1) {
  //   ageInDays++;
  // }
  return {
    years: ageInYears,
    months: ageInMonths,
    days: ageInDays,
  };
}
const yearDisplay = document.querySelector(".years");
const monthDisplay = document.querySelector(".months");
const dayDisplay = document.querySelector(".days");

// Function to handle the Enter key press
function handleEnterKey() {
  const day = parseInt(inputFields[0].value);
  const month = parseInt(inputFields[1].value);
  const year = parseInt(inputFields[2].value);
  if (validation()) {
    const age = ageCalcultor(day, month, year);
    dayDisplay.innerHTML = age.days;
    monthDisplay.innerHTML = age.months;
    yearDisplay.innerHTML = age.years;
  }
}

//Process to run after clicking ener
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    handleEnterKey();
  }
});

//Process to run aftern clicking button
enterButton.addEventListener("click", handleEnterKey);
