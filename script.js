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
  const filteredResults = bhajansDatabase.filter((bhajan) => {
    const bhajanName = bhajan.name.toLowerCase();
    // Check if name starts with search term
    if (bhajanName.startsWith(searchTerm)) {
      return true;
    }
    // Check if any word in the name starts with search term
    const words = bhajanName.split(/\s+/);
    return words.some(word => word.startsWith(searchTerm));
  });

  // Deduplicate by name, keeping only the latest dateSung
  const latestByName = {};
  filteredResults.forEach((bhajan) => {
    const name = bhajan.name.toLowerCase();
    if (!latestByName[name] || bhajan.dateSung > latestByName[name].dateSung) {
      latestByName[name] = bhajan;
    }
  });
  const results = Object.values(latestByName);

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
                <span class="bhajan-day">${bhajan.day}</span>
                <span class="bhajan-shruthi"><strong>Shruthi:</strong> ${formatShruthi(bhajan.shruthi)}</span>
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
  // Beat filter (commented out for future use)
  // const beat6 = document.getElementById("beat6").checked;
  // const beat7 = document.getElementById("beat7").checked;
  // const beat8 = document.getElementById("beat8").checked;
  const speed = document.getElementById("speedFilter").value;

  let results = bhajansDatabase;

  // Filter by deity
  if (deity !== "all") {
    results = results.filter((bhajan) => bhajan.deity === deity);
  }

  // Filter by beat (commented out for future use)
  // if (beat6 || beat7 || beat8) {
  //   results = results.filter((bhajan) => {
  //     if (beat6 && bhajan.beat === 6) return true;
  //     if (beat7 && bhajan.beat === 7) return true;
  //     if (beat8 && bhajan.beat === 8) return true;
  //     return false;
  //   });
  // }

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

  displayDateResults(results);
}

// Display Date Search Results (simplified - only name and day)
function displayDateResults(results) {
  const resultsSection = document.getElementById("resultsSection");
  const resultsContainer = document.getElementById("resultsContainer");

  if (results.length === 0) {
    resultsContainer.innerHTML = `
            <div class="result-item">
                <p class="result-title">No bhajans found</p>
                <p class="result-details">Try selecting a different date</p>
            </div>
        `;
  } else {
    resultsContainer.innerHTML = results
      .map(
        (bhajan, index) => `
            <div class="result-item date-result-item">
                <span class="result-number">${index + 1}.</span>
                <h3 class="result-title">${bhajan.name}</h3>
                <span class="detail-badge day-badge">${bhajan.day}</span>
                <div class="result-shruthi-simple">
                    ${formatShruthiSimple(bhajan.shruthi)}
                </div>
            </div>
        `
      )
      .join("");
  }

  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
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
                <div class="result-details">
                    <span class="detail-badge deity-badge">${capitalizeFirst(bhajan.deity)}</span>
                    <!-- Beat badge (commented out for future use)
                    <span class="detail-badge beat-badge">${bhajan.beat} Beat</span>
                    -->
                    <span class="detail-badge speed-badge">${formatSpeed(bhajan.speed)}</span>
                    <span class="detail-badge day-badge">${bhajan.day}</span>
                </div>
                <div class="result-shruthi">
                    ${formatShruthi(bhajan.shruthi)}
                </div>
                <div class="result-date">
                    <span class="date-badge">Last Sung: ${formatDate(bhajan.dateSung)}</span>
                </div>
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
    return `<span class="shruthi-value">${shruthi}</span>`;
  }
  if (typeof shruthi === "object" && shruthi !== null) {
    const parts = [];
    if (shruthi.gents) parts.push(`<span class="shruthi-gents">Gents: <strong>${shruthi.gents}</strong></span>`);
    if (shruthi.ladies) parts.push(`<span class="shruthi-ladies">Ladies: <strong>${shruthi.ladies}</strong></span>`);
    return parts.join(" ");
  }
  return shruthi;
}

// Simple shruthi format for date search results
function formatShruthiSimple(shruthi) {
  if (typeof shruthi === "string") {
    return `<span class="shruthi-simple">${shruthi}</span>`;
  }
  if (typeof shruthi === "object" && shruthi !== null) {
    const parts = [];
    if (shruthi.gents) parts.push(`Gents: ${shruthi.gents}`);
    if (shruthi.ladies) parts.push(`Ladies: ${shruthi.ladies}`);
    return `<span class="shruthi-simple">${parts.join(" | ")}</span>`;
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

  // Set min date to 2025-01-01 and max date to today
  const dateFilter = document.getElementById("dateFilter");
  if (dateFilter) {
    const today = new Date().toISOString().split("T")[0];
    dateFilter.setAttribute("min", "2025-01-01");
    dateFilter.setAttribute("max", today);
  }
});

// Audio Player Functions
function populateAudioDates() {
  const audioDateSelect = document.getElementById("audioDateSelect");
  if (!audioDateSelect || typeof bhajanAudios === 'undefined') return;

  // Clear existing options except the first one
  audioDateSelect.innerHTML = '<option value="">-- Choose a date --</option>';

  // Sort audios by date (newest first)
  const sortedAudios = [...bhajanAudios].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  // Add options for each available date
  sortedAudios.forEach(audio => {
    const option = document.createElement("option");
    option.value = audio.date;
    const formattedDate = formatDate(audio.date);
    option.textContent = audio.label ? `${formattedDate} - ${audio.label}` : formattedDate;
    audioDateSelect.appendChild(option);
  });
}

function loadAudio() {
  const audioDateSelect = document.getElementById("audioDateSelect");
  const audioPlayerContainer = document.getElementById("audioPlayerContainer");
  const soundcloudPlayer = document.getElementById("soundcloudPlayer");
  const audioLabel = document.getElementById("audioLabel");
  const noAudioMessage = document.getElementById("noAudioMessage");

  const selectedDate = audioDateSelect.value;

  if (!selectedDate) {
    audioPlayerContainer.style.display = "none";
    noAudioMessage.style.display = "none";
    return;
  }

  // Find the audio for the selected date
  const audioEntry = bhajanAudios.find(audio => audio.date === selectedDate);

  if (audioEntry && audioEntry.soundcloudUrl) {
    // Create SoundCloud embed URL
    const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(audioEntry.soundcloudUrl)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
    soundcloudPlayer.src = embedUrl;
    audioLabel.textContent = audioEntry.label || `Bhajans - ${formatDate(audioEntry.date)}`;
    audioPlayerContainer.style.display = "block";
    noAudioMessage.style.display = "none";
  } else {
    audioPlayerContainer.style.display = "none";
    noAudioMessage.style.display = "block";
  }
}

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

  // Populate audio dates dropdown
  populateAudioDates();
});
