
window.onload = () => {
    GrabCourseDataFromAPI();
}
const BASE_URl = "http://localhost:8081/api/";

function GrabCourseDataFromAPI() {
  fetch("http://localhost:8081/api/courses").then((response) =>
    response.json().then((data) => GenerateDropdown(data))
  );
}

const fetchCourses = async () => {
  try {
    const response = await fetch(`${BASE_URl}courses`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response}`);
    }
    const data = await response.json();
    GenerateDropdown(data);
  } catch (error) {
    console.error("Error fetching courses", error);
  }
};

const GenerateDropdown = (_data) => {
  const courseDropdown = document.getElementById("dropdownContainer");
  courseDropdown.innerHTML = "";
  _data.forEach((x) => {
    const optionElement = document.createElement("option");
    optionElement.value = x.courseName;
    optionElement.textContent = x.courseName;
    courseDropdown.appendChild(optionElement);
  });
};

const displayCourse = async () => {
  const courseDropdown = document.getElementById("dropdownContainer");
  const selectCourses = courseDropdown.value;

  try {
    const response = await fetch(`${BASE_URl}courses/${selectCourses}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    src = data.courseName;
  } catch (error) {
    console.error("Error fetching course name", error);
  }
};
