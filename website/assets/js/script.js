"use strict";

// Function to toggle element class
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar toggle functionality for mobile
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// Skill Progress Bar Animation
document.addEventListener("DOMContentLoaded", function () {
  const skillBars = document.querySelectorAll(".skill-progress-fill");

  skillBars.forEach(bar => {
    let progress = bar.getAttribute("data-progress");
    bar.style.width = progress + "%";
  });
});

// Testimonials Modal Functionality
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal elements
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Function to toggle the modal
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Click event for opening modal
testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

// Click event to close modal
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Project Filtering
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".select-list button[data-select-item]");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-select-item");

      // Toggle active class on buttons
      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      // Show/hide projects based on category
      projectItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category");
        item.style.display = (category === "All" || itemCategory === category) ? "block" : "none";
      });
    });
  });
});



// Custom Select Dropdown
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// Filter Function
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all") {
      item.classList.add("active");
    } else if (selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Large Screen Filter Buttons
const filterBtn = document.querySelectorAll("[data-filter-btn]");
let lastClickedBtn = filterBtn[0];

filterBtn.forEach(button => {
  button.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// Contact Form Validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", function () {
    formBtn.disabled = !form.checkValidity();
  });
});

// Page Navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((navLink, index) => {
  navLink.addEventListener("click", function () {
    pages.forEach((page, i) => {
      if (this.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    });
  });
});

// Profile Views Counter API Call
const counter = document.querySelector(".counter-number");

async function updateCounter() {
  try {
    let response = await fetch("https://ahlfc4csmxl6ttcoizt54wdrgi0qdgqm.lambda-url.ap-south-1.on.aws/");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    counter.innerHTML = 'Profile Views: ' + data;
  } catch (error) {
    console.error("Error fetching counter data:", error);
    counter.innerHTML = 'Profile Views: N/A';
  }
}

updateCounter();

// Open Project Links When Clicking on Projects or Eye Button
document.addEventListener("DOMContentLoaded", function () {
  const projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach(item => {
    item.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent event from propagating
      
      const projectLink = this.querySelector("a");
      if (projectLink) {
        window.open(projectLink.href, "_blank");
      }
    });
  });

  // Ensure the eye button also opens the project link
  const eyeButtons = document.querySelectorAll(".project-item-icon-box");

  eyeButtons.forEach(button => {
    button.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent unwanted bubbling

      const projectItem = this.closest(".project-item");
      const projectLink = projectItem.querySelector("a");

      if (projectLink) {
        window.open(projectLink.href, "_blank");
      }
    });
  });
});
