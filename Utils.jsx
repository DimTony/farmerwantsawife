export const generateUserSummary = (formData) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    currentCity,
    currentState,
    hometownCity,
    hometownState,
    occupation,
    height,
    relationshipStatus,
    noOfChildren,
    cityGirlOrCountryGirl,
    whyApply,
  } = formData;

  // Extract and format the date of birth
  const { day, month, year } = dateOfBirth;
  const formattedDateOfBirth = `${day}/${month}/${year}`;

  // Construct the summary
  const summary = `I am ${firstName} ${lastName}, born on ${formattedDateOfBirth}, a resident of ${currentCity}, ${currentState}. Originally from ${hometownCity}, ${hometownState}, I am currently working as an ${occupation}. Standing at ${height} ft/in, I am ${relationshipStatus} and have ${noOfChildren} ${
    noOfChildren === 1 ? "child" : "children"
  }. I describe myself as more of a ${cityGirlOrCountryGirl.toLowerCase()}, I am applying to the show "Farmer Wants A Wife" because I want ${whyApply.toLowerCase()}.`;

  return summary;
};

export const baseUrl = "https://genericbackend.onrender.com";
// export const baseUrl = 'http://localhost:8080';
