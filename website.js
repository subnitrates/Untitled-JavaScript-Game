const tabs = document.querySelector(".wrapper");
const tabButton = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".content");

tabs.onclick = e => {
    const id = e.target.dataset.id;
    console.log("id:", id);
    if (id) {
        tabButton.forEach(btn => {
            btn.classList.remove("active");
        });
        e.target.classList.add("active");

        contents.forEach(content => {
            content.classList.remove("active");
        });
        const element = document.getElementById(id);
        console.log(`id: ${id}, element: ${element}`);
        element.classList.add("active");
    }
}

// sets dark mode toggle and saves preference
const darkModeToggle = document.querySelector("#darkModeToggle");
const body = document.querySelector("body");
const content = document.querySelector(".content");

const isDarkModeEnabled = () => body.classList.contains("dark-mode");

const enableDarkMode = () => {
  body.classList.add("dark-mode");
  content.classList.add("dark-mode");
  darkModeToggle.textContent = "Light Mode";
};

const disableDarkMode = () => {
  body.classList.remove("dark-mode");
  content.classList.remove("dark-mode");
  darkModeToggle.textContent = "Dark Mode";
};

const isStoredDarkModeEnabled = localStorage.getItem("darkModeEnabled");
if (isStoredDarkModeEnabled === "true") {
  enableDarkMode();
} else {
  disableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
  if (isDarkModeEnabled()) {
    disableDarkMode();
    localStorage.setItem("darkModeEnabled", false);
  } else {
    enableDarkMode();
    localStorage.setItem("darkModeEnabled", true);
  }
});
