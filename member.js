function skillsMember() {
  var skills = document.getElementById("skills").value;
  var skillsError = document.getElementById("skillsError");
  if (skills == "") {
    skillsError.innerHTML = "Skills is required";
    return false;
  }
  if (skills.length < 5) {
    skillsError.innerHTML = "Skills must be at least 5 characters";
    return false;
  }
  if (skills.length > 50) {
    skillsError.innerHTML = "Skills must be less than 50 characters";
    return false;
  }
  skillsError.innerHTML = "";
  return true;
}