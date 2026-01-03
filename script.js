// Bhajan data is loaded from bhajans.js file
// Search by Name Function (Live Search with Date Sung)
function searchByName() {
  const searchTerm = document
    .getElementById("nameSearch")
    .value.toLowerCase()
    .trim();
  const resultsContainer = document.getElementById("nameSearchResults");

  // Clear results if search term is empty
  if (!searchTerm) {
    resultsContainer.innerHTML = "";
    return;
  }

  // Require at least 3 characters before searching
  if (searchTerm.length < 3) {
    resultsContainer.innerHTML = `
            <div class="live-result-item no-results">
                Please enter at least 3 characters to search
            </div>
        `;
    return;
  }

  // Filter bhajans where search term matches the start of the name or start of any word
  const results = bhajansDatabase.filter((bhajan) => {
    const bhajanName = bhajan.name.toLowerCase();
    // Check if name starts with search term
    if (bhajanName.startsWith(searchTerm)) {
      return true;
    }
    // Check if any word in the name starts with search term
    const words = bhajanName.split(/\s+/);
    return words.some(word => word.startsWith(searchTerm));
  });

  if (results.length === 0) {
    resultsContainer.innerHTML = `
            <div class="live-result-item no-results">
                No bhajans found matching "${searchTerm}"
            </div>
        `;
  } else {
    resultsContainer.innerHTML = results
      .map(
        (bhajan) => `
            <div class="live-result-item">
                <span class="bhajan-name">${bhajan.name}</span>
                <span class="bhajan-shruthi">Shruthi: ${formatShruthi(bhajan.shruthi)}</span>
                <span class="sung-date">Last sung: ${formatDate(
                  bhajan.dateSung
                )}</span>
            </div>
        `
      )
      .join("");
  }
}

// Quick Search Function
function quickSearch() {
  const deity = document.getElementById("deityFilter").value;
  const beat6 = document.getElementById("beat6").checked;
  const beat7 = document.getElementById("beat7").checked;
  const speed = document.getElementById("speedFilter").value;

  let results = bhajansDatabase;

  // Filter by deity
  if (deity !== "all") {
    results = results.filter((bhajan) => bhajan.deity === deity);
  }

  // Filter by beat
  if (beat6 || beat7) {
    results = results.filter((bhajan) => {
      if (beat6 && beat7) return true;
      if (beat6) return bhajan.beat === 6;
      if (beat7) return bhajan.beat === 7;
      return false;
    });
  }

  // Filter by speed
  if (speed !== "all") {
    results = results.filter((bhajan) => bhajan.speed === speed);
  }

  displayResults(results, "Quick Search Results");
}

// Search by Date Function
function searchByDate() {
  const dateInput = document.getElementById("dateFilter").value;

  if (!dateInput) {
    alert("Please select a date");
    return;
  }

  const results = bhajansDatabase.filter(
    (bhajan) => bhajan.dateSung === dateInput
  );

  displayResults(results, `Bhajans sung on: ${formatDate(dateInput)}`);
}

// Display Results Function
function displayResults(results, title) {
  const resultsSection = document.getElementById("resultsSection");
  const resultsContainer = document.getElementById("resultsContainer");

  if (results.length === 0) {
    resultsContainer.innerHTML = `
            <div class="result-item">
                <p class="result-title">No bhajans found</p>
                <p class="result-details">Try adjusting your search criteria</p>
            </div>
        `;
  } else {
    resultsContainer.innerHTML = results
      .map(
        (bhajan) => `
            <div class="result-item">
                <h3 class="result-title">${bhajan.name}</h3>
                <p class="result-details">
                    <strong>Deity:</strong> ${capitalizeFirst(bhajan.deity)} |
                    <strong>Beat:</strong> ${bhajan.beat} |
                    <strong>Speed:</strong> ${formatSpeed(bhajan.speed)} |
                    <strong>Shruthi:</strong> ${formatShruthi(bhajan.shruthi)} |
                    <strong>Last Sung:</strong> ${formatDate(bhajan.dateSung)}
                </p>
            </div>
        `
      )
      .join("");
  }

  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Login Modal Functions
// function showLogin() {
//     document.getElementById('loginModal').style.display = 'flex';
// }

// function closeLogin() {
//     document.getElementById('loginModal').style.display = 'none';
// }

// function handleLogin(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     // In production, this would validate against a backend
//     if (username && password) {
//         alert('Login functionality would be connected to backend in production');
//         closeLogin();
//         // Clear form
//         document.getElementById('username').value = '';
//         document.getElementById('password').value = '';
//     }
// }

// Utility Functions
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatSpeed(speed) {
  const speedMap = {
    slow: "Slow",
    medium: "Medium",
    fast: "Fast",
  };
  return speedMap[speed] || speed;
}

function formatShruthi(shruthi) {
  if (typeof shruthi === "string") {
    return shruthi;
  }
  if (typeof shruthi === "object" && shruthi !== null) {
    const parts = [];
    if (shruthi.gents) parts.push(`Gents: ${shruthi.gents}`);
    if (shruthi.ladies) parts.push(`Ladies: ${shruthi.ladies}`);
    return parts.join(", ");
  }
  return shruthi;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("loginModal");
  if (event.target === modal) {
    closeLogin();
  }
};

// Enable Enter key for search
document.addEventListener("DOMContentLoaded", function () {
  const nameSearchInput = document.getElementById("nameSearch");

  if (nameSearchInput) {
    nameSearchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        searchByName();
      }
    });
  }

  // Set max date for date picker to today
  const dateFilter = document.getElementById("dateFilter");
  if (dateFilter) {
    const today = new Date().toISOString().split("T")[0];
    dateFilter.setAttribute("max", today);
  }
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".search-section, .admin-section");
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });
});
