// Combine Sunday and Thursday bhajans into a single database
const bhajansRawData = [...sundayBhajansRawData, ...thursdayBhajansRawData];
const bhajansDatabase = bhajansRawData.map((bhajan, index) => ({
  id: index + 1,
  ...bhajan,
}));

// Helper function to format timestamp for onclick attribute
function formatTimeAttr(time) {
  if (time === null || time === undefined) return "null";
  return `'${time}'`;
}

// Welcome Screen Curtain Functions
function openCurtains() {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const curtainLeft = document.querySelector(".curtain-left");
  const curtainRight = document.querySelector(".curtain-right");
  // const bgAudio = document.getElementById("bgAudio");
  // const soundToggle = document.getElementById("soundToggle");

  // Add open class to curtains
  curtainLeft.classList.add("open");
  curtainRight.classList.add("open");

  // Start background music (commented out for future use)
  // if (bgAudio) {
  //   bgAudio.volume = 0.1;
  //   bgAudio.play().then(function() {
  //     if (soundToggle) {
  //       soundToggle.textContent = "🔊";
  //       soundToggle.classList.add("playing");
  //     }
  //   }).catch(function(err) {
  //     console.log("Audio play failed:", err);
  //   });
  // }

  // Hide welcome content immediately
  welcomeScreen.classList.add("hidden");

  // Remove welcome screen quickly after curtains open
  setTimeout(function () {
    welcomeScreen.classList.add("fade-out");
    setTimeout(function () {
      welcomeScreen.style.display = "none";
    }, 200);
  }, 600);
}

// Helper function to close all open sections
function closeAllSections() {
  // Close results section
  const resultsSection = document.getElementById("resultsSection");
  if (resultsSection) resultsSection.style.display = "none";

  // Close name search results
  const nameSearchResults = document.getElementById("nameSearchResults");
  if (nameSearchResults) nameSearchResults.innerHTML = "";

  // Close audio bhajan list
  closeAudioBhajanList();
}

// Debounce timer for search
let searchDebounceTimer = null;

// Search by Name Function (Live Search with Date Sung)
function searchByName() {
  // Close other sections first (but keep audio playing)
  const resultsSection = document.getElementById("resultsSection");
  if (resultsSection) resultsSection.style.display = "none";

  const searchTerm = document
    .getElementById("nameSearch")
    .value.toLowerCase()
    .trim();
  const resultsContainer = document.getElementById("nameSearchResults");
  const loadingIndicator = document.getElementById("nameSearchLoading");

  // Clear previous debounce timer
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
  }

  // Hide loading if search term is empty or too short
  if (!searchTerm || searchTerm.length < 3) {
    if (loadingIndicator) loadingIndicator.classList.remove("active");
  }

  // Show loading indicator for valid searches
  if (searchTerm.length >= 3 && loadingIndicator) {
    loadingIndicator.classList.add("active");
    resultsContainer.innerHTML = "";
  }

  // Debounce the search to prevent too many rapid searches
  searchDebounceTimer = setTimeout(function() {
    performSearch(searchTerm, resultsContainer, loadingIndicator);
  }, 350);
}

// Perform the actual search (called after debounce)
function performSearch(searchTerm, resultsContainer, loadingIndicator) {
  // Hide loading indicator
  if (loadingIndicator) loadingIndicator.classList.remove("active");

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
    return words.some((word) => word.startsWith(searchTerm));
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
            <div class="live-result-item clickable-row" onclick="showAudioHint('${bhajan.dateSung}', '${formatDate(
              bhajan.dateSung
            )}')">
                <div class="name-search-line-1">
                    <span class="bhajan-name">${bhajan.name}</span>
                    <span class="bhajan-shruthi">${formatShruthiSimple(bhajan.shruthi)}</span>
                </div>
                <div class="name-search-line-2">
                    <span class="detail-badge day-badge day-${bhajan.day.toLowerCase()}">${bhajan.day}</span>
                    <span class="sung-date">${formatDate(bhajan.dateSung)}</span>
                </div>
                <div class="name-search-line-3">
                    <span class="detail-badge deity-badge">${capitalizeFirst(bhajan.deity)}</span>
                    <span class="detail-badge speed-badge">${formatSpeed(bhajan.speed)}</span>
                </div>
            </div>
        `
      )
      .join("");
  }
}

// Show hint to use Live Audio section
function showAudioHint(dateSung, formattedDate) {
  const modal = document.getElementById("audioHintModal");
  const message = document.getElementById("audioHintMessage");

  // Check if audio is available for this date
  const audioEntry = bhajanAudios.find((audio) => audio.date === dateSung);

  if (audioEntry && audioEntry.audioFile) {
    message.innerHTML = `To hear this bhajan, choose <strong>"${formattedDate}"</strong> from the Live Bhajan Audios list.`;
  } else {
    message.innerHTML = `No audio file available for this bhajan.`;
  }

  modal.style.display = "flex";
}

// Close audio hint modal
function closeAudioHint() {
  const modal = document.getElementById("audioHintModal");
  modal.style.display = "none";
}

// Quick Search Function
function quickSearch() {
  // Close other sections first (but keep audio playing)
  const nameSearchResults = document.getElementById("nameSearchResults");
  if (nameSearchResults) nameSearchResults.innerHTML = "";

  const deity = document.getElementById("deityFilter").value;
  const speed = document.getElementById("speedFilter").value;
  const singer = "all"; // Singer filter is currently disabled

  let results = bhajansDatabase;

  // Filter by deity
  if (deity !== "all") {
    results = results.filter((bhajan) => bhajan.deity === deity);
  }

  // Filter by speed
  if (speed !== "all") {
    results = results.filter((bhajan) => bhajan.speed === speed);
  }

  // Filter by singer
  if (singer !== "all") {
    results = results.filter((bhajan) => bhajan.singer && bhajan.singer.toLowerCase() === singer.toLowerCase());
  }

  displayResults(results, "Quick Search Results");
}

// Populate Singer Dropdown
function populateSingerDropdown() {
  const singerSelect = document.getElementById("singerFilter");
  if (!singerSelect) return;

  // Get unique singers from the database
  const singers = new Set();
  bhajansDatabase.forEach((bhajan) => {
    if (bhajan.singer && bhajan.singer.trim() !== "") {
      singers.add(bhajan.singer.toLowerCase());
    }
  });

  // Sort singers alphabetically
  const sortedSingers = Array.from(singers).sort();

  // Add options for each singer
  sortedSingers.forEach((singer) => {
    const option = document.createElement("option");
    option.value = singer;
    option.textContent = capitalizeFirst(singer);
    singerSelect.appendChild(option);
  });
}

// Search by Date Function
function searchByDate() {
  // Close other sections first (but keep audio playing)
  const nameSearchResults = document.getElementById("nameSearchResults");
  if (nameSearchResults) nameSearchResults.innerHTML = "";

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

// Close Results Section
function closeResults() {
  const resultsSection = document.getElementById("resultsSection");
  resultsSection.style.display = "none";
}

// Close Audio Bhajan List
function closeAudioBhajanList() {
  const audioBhajanList = document.getElementById("audioBhajanList");
  const audioPlayerContainer = document.getElementById("audioPlayerContainer");
  const audioSelectionPrompt = document.getElementById("audioSelectionPrompt");
  const audioDateSelect = document.getElementById("audioDateSelect");
  const audioPlayer = document.getElementById("audioPlayer");
  const showBtn = document.getElementById("showAudioListBtn");

  // Hide the list and related elements
  audioBhajanList.style.display = "none";
  if (audioPlayerContainer) audioPlayerContainer.style.display = "none";
  if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";
  if (showBtn) showBtn.style.display = "none";

  // Reset the dropdown
  if (audioDateSelect) audioDateSelect.value = "";

  // Stop audio if playing
  if (audioPlayer) audioPlayer.pause();
}

// Hide Audio Bhajan List (keeps audio playing)
function hideAudioBhajanList() {
  const audioBhajanList = document.getElementById("audioBhajanList");
  const audioSelectionPrompt = document.getElementById("audioSelectionPrompt");

  // Hide the list but keep audio playing
  if (audioBhajanList) audioBhajanList.style.display = "none";
  if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";

  // Show the "Show" button so user can bring back the list
  const floatingShowBtn = document.getElementById("floatingShowBtn");
  if (floatingShowBtn) floatingShowBtn.style.display = "block";
}

// Show hide button and hide close button when audio is playing
function showHideButton() {
  const hideBtn = document.getElementById("hideAudioListBtn");
  const closeBtn = document.getElementById("closeAudioListBtn");
  const floatingShowBtn = document.getElementById("floatingShowBtn");

  if (hideBtn) hideBtn.style.display = "inline-block";
  if (closeBtn) closeBtn.style.display = "none";
  if (floatingShowBtn) floatingShowBtn.style.display = "none";
}

// Show the audio bhajan list again
function showAudioBhajanList() {
  const audioBhajanList = document.getElementById("audioBhajanList");
  const floatingShowBtn = document.getElementById("floatingShowBtn");

  if (audioBhajanList) audioBhajanList.style.display = "block";
  if (floatingShowBtn) floatingShowBtn.style.display = "none";

  // Scroll to audio section
  const audioSection = document.querySelector(".audio-section");
  if (audioSection) {
    audioSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
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
            <div class="result-item date-result-item clickable-row" onclick="showAudioHint('${bhajan.dateSung}', '${formatDate(
              bhajan.dateSung
            )}')">
                <div class="result-line-1">
                    <span class="result-number">${index + 1}.</span>
                    <h3 class="result-title">${bhajan.name}</h3>
                </div>
                <div class="result-line-2">
                    <span class="detail-badge day-badge day-${bhajan.day.toLowerCase()}">${bhajan.day}</span>
                    <span class="bhajan-shruthi">${formatShruthiSimple(bhajan.shruthi)}</span>
                </div>
            </div>
        `
      )
      .join("");
  }

  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Display Results Function (Quick Search - only name and shruthi)
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
        (bhajan, index) => `
            <div class="result-item quick-search-item clickable-row" onclick="showAudioHint('${bhajan.dateSung}', '${formatDate(
              bhajan.dateSung
            )}')">
                <span class="result-number">${index + 1}.</span>
                <h3 class="result-title">${bhajan.name}</h3>
                <span class="bhajan-shruthi">${formatShruthiSimple(bhajan.shruthi)}</span>
            </div>
        `
      )
      .join("");
  }

  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}
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
    if (shruthi.gents)
      parts.push(
        `<span class="shruthi-gents">Gents: <strong>${shruthi.gents}</strong></span>`
      );
    if (shruthi.ladies)
      parts.push(
        `<span class="shruthi-ladies">Ladies: <strong>${shruthi.ladies}</strong></span>`
      );
    return parts.join(" ");
  }
  return shruthi;
}

// Simple shruthi format for date search results
function formatShruthiSimple(shruthi) {
  if (!shruthi) return "";
  if (typeof shruthi === "string") {
    return `<span class="shruthi-simple">${shruthi}</span>`;
  }
  if (typeof shruthi === "object" && shruthi !== null) {
    const parts = [];
    if (shruthi.gents) parts.push(`Gents: ${shruthi.gents}`);
    if (shruthi.ladies) parts.push(`Ladies: ${shruthi.ladies}`);
    if (parts.length === 0) return "";
    return `<span class="shruthi-simple">${parts.join(" | ")}</span>`;
  }
  return "";
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

// Close all open sections when clicking outside of them

document.addEventListener("click", function (event) {
  // Close results section (date search and quick search)
  const resultsSection = document.getElementById("resultsSection");
  if (resultsSection && resultsSection.style.display !== "none") {
    const isClickInsideResults = resultsSection.contains(event.target);
    const isClickOnSearchButton = event.target.closest('button[onclick="searchByDate()"]') ||
                                   event.target.closest('button[onclick="quickSearch()"]');
    const isClickOnDateInput = event.target.id === "dateFilter";
    const isClickOnQuickSearchFilters = event.target.closest('.quick-search-grid');

    if (!isClickInsideResults && !isClickOnSearchButton && !isClickOnDateInput && !isClickOnQuickSearchFilters) {
      closeResults();
    }
  }

  // Close name search results
  const nameSearchResults = document.getElementById("nameSearchResults");
  if (nameSearchResults && nameSearchResults.innerHTML !== "") {
    const isClickInsideNameResults = nameSearchResults.contains(event.target);
    const isClickOnNameInput = event.target.id === "nameSearch";

    if (!isClickInsideNameResults && !isClickOnNameInput) {
      nameSearchResults.innerHTML = "";
    }
  }
});

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
  if (!audioDateSelect || typeof bhajanAudios === "undefined") return;

  // Clear existing options except the first one
  audioDateSelect.innerHTML = '<option value="">-- Choose a date --</option>';

  // Sort audios by date (newest first)
  const sortedAudios = [...bhajanAudios].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Add options for each available date
  sortedAudios.forEach((audio) => {
    const option = document.createElement("option");
    option.value = audio.date;
    const formattedDate = formatDate(audio.date);
    option.textContent = audio.label
      ? `${formattedDate} - ${audio.label}`
      : formattedDate;
    audioDateSelect.appendChild(option);
  });
}

function loadAudio() {
  // Audio section stays independent - doesn't close other sections

  const audioDateSelect = document.getElementById("audioDateSelect");
  const audioPlayerContainer = document.getElementById("audioPlayerContainer");
  const audioPlayer = document.getElementById("audioPlayer");
  const noAudioMessage = document.getElementById("noAudioMessage");
  const audioBhajanList = document.getElementById("audioBhajanList");
  const audioSelectionPrompt = document.getElementById("audioSelectionPrompt");

  const selectedDate = audioDateSelect.value;

  if (!selectedDate) {
    audioPlayerContainer.style.display = "none";
    noAudioMessage.style.display = "none";
    audioBhajanList.style.display = "none";
    if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";
    if (audioPlayer) audioPlayer.pause();
    return;
  }

  // Hide the audio player until a bhajan is clicked
  audioPlayerContainer.style.display = "none";
  noAudioMessage.style.display = "none";
  if (audioPlayer) audioPlayer.pause();

  // Get bhajans for the selected date
  const bhajansForDate = bhajansDatabase.filter(
    (bhajan) => bhajan.dateSung === selectedDate
  );

  // Check if audio is available for this date
  const audioEntry = bhajanAudios.find((audio) => audio.date === selectedDate);
  const hasAudio = audioEntry && audioEntry.audioFile;

  // Display bhajans list for the selected date
  if (bhajansForDate.length > 0) {
    const dayOfWeek = bhajansForDate[0].day;
    audioBhajanList.innerHTML = `
      <div class="audio-bhajan-list-header">
        <h3 class="audio-bhajan-list-title">Bhajans on ${formatDate(
          selectedDate
        )} - ${dayOfWeek}</h3>
        <button id="closeAudioListBtn" class="close-audio-list-btn" onclick="closeAudioBhajanList()">Close</button>
        <button id="hideAudioListBtn" class="hide-audio-list-btn" onclick="hideAudioBhajanList()" style="display: none;">Hide</button>
      </div>
      <div class="audio-bhajan-items">
        ${bhajansForDate
          .map((bhajan, index) => {
            // Calculate end time as the start time of the next bhajan
            const nextBhajan = bhajansForDate[index + 1];
            const endTime = nextBhajan ? nextBhajan.startTime : null;
            return `
          <div class="audio-bhajan-item ${
            hasAudio ? "has-audio" : "no-audio"
          }" data-bhajan-name="${bhajan.name.replace(/"/g, "&quot;")}" ${
              hasAudio
                ? `onclick="playBhajanAudio('${
                    bhajan.dateSung
                  }', '${bhajan.name.replace(/'/g, "\\'")}', ${formatTimeAttr(
                    bhajan.startTime
                  )}, ${formatTimeAttr(endTime)})"`
                : ""
            }>
            <span class="audio-bhajan-number">${index + 1}.</span>
            <span class="audio-bhajan-name">${bhajan.name}</span>
            <span class="playing-indicator">
              <span class="playing-bar"></span>
              <span class="playing-bar"></span>
              <span class="playing-bar"></span>
            </span>
            <span class="audio-bhajan-shruthi">${formatShruthiSimple(
              bhajan.shruthi
            )}</span>
          </div>
        `;
          })
          .join("")}
      </div>
    `;
    audioBhajanList.style.display = "block";
    // Show the selection prompt if audio is available
    if (hasAudio && audioSelectionPrompt) {
      audioSelectionPrompt.style.display = "block";
    } else if (audioSelectionPrompt) {
      audioSelectionPrompt.style.display = "none";
    }
  } else {
    audioBhajanList.style.display = "none";
    if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";
  }
}

// Play all bhajans sequentially
function playAllBhajans() {
  const audioDateSelect = document.getElementById("audioDateSelect");
  const selectedDate = audioDateSelect.value;

  if (!selectedDate) return;

  // Get bhajans for the selected date
  const bhajansForDate = bhajansDatabase.filter(
    (bhajan) => bhajan.dateSung === selectedDate
  );

  if (bhajansForDate.length > 0) {
    // Play the first bhajan (which starts the full audio)
    const firstBhajan = bhajansForDate[0];
    playBhajanAudio(firstBhajan.dateSung, "All Bhajans", null, null);

    // Hide the selection prompt
    const audioSelectionPrompt = document.getElementById("audioSelectionPrompt");
    if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";
  }
}

// Play audio for a specific bhajan by its dateSung with optional timestamps
// startTime can be in seconds (number) or "MM:SS" format (string)

// Store current date's bhajans for tracking which one is playing
let currentDateBhajans = [];
let currentPlayingBhajanName = "";

// Parse time from either seconds (number) or "MM:SS" string format
function parseTime(time) {
  if (time === null || time === undefined) return null;
  if (typeof time === "number") return time;
  if (typeof time === "string") {
    const parts = time.split(":");
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    if (parts.length === 3) {
      // HH:MM:SS format
      return (
        parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
      );
    }
  }
  return null;
}

function playBhajanAudio(dateSung, bhajanName, startTime, endTime) {
  const audioPlayerContainer = document.getElementById("audioPlayerContainer");
  const audioPlayer = document.getElementById("audioPlayer");
  const audioLabel = document.getElementById("audioLabel");
  const noAudioMessage = document.getElementById("noAudioMessage");
  const audioSection = document.querySelector(".audio-section");
  const audioSelectionPrompt = document.getElementById("audioSelectionPrompt");

  // Remove playing class from all bhajan items
  document.querySelectorAll(".audio-bhajan-item.playing").forEach((item) => {
    item.classList.remove("playing");
  });

  // Add playing class to the selected bhajan item
  const selectedItem = document.querySelector(
    `.audio-bhajan-item[data-bhajan-name="${bhajanName.replace(/"/g, "&quot;")}"]`
  );
  if (selectedItem) {
    selectedItem.classList.add("playing");
  }

  // Parse start timestamp (supports both seconds and "MM:SS" format)
  const startSeconds = parseTime(startTime);

  // Find the audio for the bhajan's dateSung
  const audioEntry = bhajanAudios.find((audio) => audio.date === dateSung);

  if (audioEntry && audioEntry.audioFile) {
    // Update the dropdown to reflect the selected date
    const audioDateSelect = document.getElementById("audioDateSelect");
    if (audioDateSelect) {
      audioDateSelect.value = dateSung;
    }

    // Store the bhajans for this date for tracking
    currentDateBhajans = bhajansDatabase
      .filter((bhajan) => bhajan.dateSung === dateSung)
      .map((bhajan) => ({
        name: bhajan.name,
        startTime: parseTime(bhajan.startTime)
      }))
      .filter((bhajan) => bhajan.startTime !== null);
    currentPlayingBhajanName = bhajanName;

    // Check if timestamps are available
    const hasTimestamps = startSeconds !== null;

    // Set the audio source
    audioPlayer.src = audioEntry.audioFile;

    // Update label with just the bhajan name
    audioLabel.textContent = bhajanName;

    audioPlayerContainer.style.display = "block";
    noAudioMessage.style.display = "none";
    if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";

    // Show the hide button since audio is now playing
    showHideButton();

    // Scroll to audio section
    audioSection.scrollIntoView({ behavior: "smooth", block: "start" });

    audioPlayer.onloadedmetadata = function () {
      if (hasTimestamps) {
        audioPlayer.currentTime = startSeconds;
      }
      audioPlayer.play().catch(function (err) {
        console.log("Audio autoplay prevented:", err);
      });
    };

    // Track which bhajan is playing and update the label
    audioPlayer.ontimeupdate = function () {
      if (currentDateBhajans.length === 0) return;

      const currentTime = audioPlayer.currentTime;
      let currentBhajan = null;

      // Find which bhajan is currently playing based on time
      for (let i = currentDateBhajans.length - 1; i >= 0; i--) {
        if (currentTime >= currentDateBhajans[i].startTime) {
          currentBhajan = currentDateBhajans[i];
          break;
        }
      }

      // Update if bhajan changed
      if (currentBhajan && currentBhajan.name !== currentPlayingBhajanName) {
        currentPlayingBhajanName = currentBhajan.name;

        // Update the label
        audioLabel.textContent = currentBhajan.name;

        // Update the playing indicator in the list
        document.querySelectorAll(".audio-bhajan-item.playing").forEach((item) => {
          item.classList.remove("playing");
        });
        const newPlayingItem = document.querySelector(
          `.audio-bhajan-item[data-bhajan-name="${currentBhajan.name.replace(/"/g, "&quot;")}"]`
        );
        if (newPlayingItem) {
          newPlayingItem.classList.add("playing");
        }
      }
    };

    // Load the audio to trigger onloadedmetadata
    audioPlayer.load();
  } else {
    // No audio available - show message
    audioPlayerContainer.style.display = "none";
    noAudioMessage.style.display = "block";
    noAudioMessage.textContent = `No audio available for "${bhajanName}" (${formatDate(
      dateSung
    )})`;
    audioSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Format seconds to MM:SS display
function formatTimeDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Skip audio forward or backward by specified seconds
function skipAudio(seconds) {
  const audioPlayer = document.getElementById("audioPlayer");
  if (audioPlayer && audioPlayer.src) {
    const newTime = audioPlayer.currentTime + seconds;
    // Ensure we don't go below 0 or beyond duration
    audioPlayer.currentTime = Math.max(
      0,
      Math.min(newTime, audioPlayer.duration || newTime)
    );
  }
}

// Mobile audio player controls
function togglePlayPause() {
  const audioPlayer = document.getElementById("audioPlayer");
  const playBtn = document.getElementById("mobilePlayBtn");
  if (audioPlayer && audioPlayer.src) {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playBtn.textContent = "⏸️";
    } else {
      audioPlayer.pause();
      playBtn.textContent = "▶️";
    }
  }
}

function toggleMute() {
  const audioPlayer = document.getElementById("audioPlayer");
  const muteBtn = document.getElementById("mobileMuteBtn");
  if (audioPlayer) {
    audioPlayer.muted = !audioPlayer.muted;
    muteBtn.textContent = audioPlayer.muted ? "🔇" : "🔊";
  }
}

// Format time for mobile player display
function formatMobileTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Initialize mobile audio player controls
function initMobileAudioPlayer() {
  const audioPlayer = document.getElementById("audioPlayer");
  const seekbar = document.getElementById("mobileSeekbar");
  const currentTimeEl = document.getElementById("mobileCurrentTime");
  const durationEl = document.getElementById("mobileDuration");
  const playBtn = document.getElementById("mobilePlayBtn");

  if (!audioPlayer || !seekbar) return;

  // Update seekbar and time display as audio plays
  audioPlayer.addEventListener("timeupdate", function () {
    if (audioPlayer.duration) {
      const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      seekbar.value = progress;
      currentTimeEl.textContent = formatMobileTime(audioPlayer.currentTime);
    }
  });

  // Update duration when metadata loads
  audioPlayer.addEventListener("loadedmetadata", function () {
    durationEl.textContent = formatMobileTime(audioPlayer.duration);
    seekbar.value = 0;
    currentTimeEl.textContent = "0:00";
    playBtn.textContent = "▶️";
  });

  // Seek when user drags the seekbar
  seekbar.addEventListener("input", function () {
    if (audioPlayer.duration) {
      audioPlayer.currentTime = (seekbar.value / 100) * audioPlayer.duration;
    }
  });

  // Update play button when audio ends
  audioPlayer.addEventListener("ended", function () {
    playBtn.textContent = "▶️";
    // Hide floating show button and update list buttons when audio ends
    hideFloatingShowBtn();
    resetAudioListButtons();
  });

  // Update play button when audio is paused externally
  audioPlayer.addEventListener("pause", function () {
    playBtn.textContent = "▶️";
  });

  audioPlayer.addEventListener("play", function () {
    playBtn.textContent = "⏸️";
  });
}

// Hide the floating show button
function hideFloatingShowBtn() {
  const floatingShowBtn = document.getElementById("floatingShowBtn");
  if (floatingShowBtn) floatingShowBtn.style.display = "none";
}

// Reset audio list buttons - show Close, hide Hide (when audio is not playing)
function resetAudioListButtons() {
  const closeBtn = document.getElementById("closeAudioListBtn");
  const hideBtn = document.getElementById("hideAudioListBtn");

  if (closeBtn) closeBtn.style.display = "inline-block";
  if (hideBtn) hideBtn.style.display = "none";
}

// Initialize mobile player when DOM is ready
document.addEventListener("DOMContentLoaded", initMobileAudioPlayer);
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
  populateSingerDropdown();

  // Set initial volume for background audio (commented out for future use)
  // const bgAudio = document.getElementById("bgAudio");
  // if (bgAudio) {
  //   bgAudio.volume = 0.1;
  // }
});

// Toggle background sound on/off (commented out for future use)
// function toggleSound() {
//   const bgAudio = document.getElementById("bgAudio");
//   const soundToggle = document.getElementById("soundToggle");
//
//   if (bgAudio.paused) {
//     bgAudio.volume = 0.1; // 50% volume
//     bgAudio.play();
//     soundToggle.textContent = "🔊";
//     soundToggle.classList.add("playing");
//   } else {
//     bgAudio.pause();
//     soundToggle.textContent = "🔇";
//     soundToggle.classList.remove("playing");
//   }
// }
