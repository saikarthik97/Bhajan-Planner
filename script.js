// ============================================================================
// BHAJAN PLANNER - MAIN SCRIPT
// ============================================================================

// ============================================================================
// 1. DATABASE INITIALIZATION
// ============================================================================

// Combine Sunday, Thursday, and Special Occasions bhajans into a single database
const bhajansRawData = [...sundayBhajansRawData, ...thursdayBhajansRawData, ...bhogi2026RawData, ...sankranthi2026, ...shivarathri2026RawData, ...ramzan2026RawData, ...aaradhana2026RawData];
const bhajansDatabase = bhajansRawData.map((bhajan, index) => ({
  id: index + 1,
  ...bhajan,
}));

// Festival dates mapping
const festivalDates = {
  "2026-01-14": "Festival - Bhogi",
  "2026-01-15": "Festival - Sankranti",
  "2026-02-15": "Festival - Maha Shivarathri",
  "2026-03-21": "Festival - Ramzan",
  "2026-04-24": "Festival - Aaradhana Mahotsavam"
};

// Get festival name for a given date
function getFestivalName(dateString) {
  return festivalDates[dateString] || null;
}

// ============================================================================
// 2. WELCOME SCREEN CODE
// ============================================================================

// Open curtains animation when user clicks "Enter"
function openCurtains() {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const curtainLeft = document.querySelector(".curtain-left");
  const curtainRight = document.querySelector(".curtain-right");

  // Add open class to curtains
  curtainLeft.classList.add("open");
  curtainRight.classList.add("open");

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

// ============================================================================
// 3. SEARCH BY BHAJAN NAME CODE
// ============================================================================

// Debounce timer for search
let searchDebounceTimer = null;

// Search by Name Function (Live Search with Date Sung)
function searchByName() {
  // Close other sections first (but keep audio playing)
  const resultsSection = document.getElementById("resultsSection");
  if (resultsSection) resultsSection.style.display = "none";

  const nameSearchInput = document.getElementById("nameSearch");
  const searchTerm = nameSearchInput.value.toLowerCase().trim();
  const resultsContainer = document.getElementById("nameSearchResults");
  const loadingIndicator = document.getElementById("nameSearchLoading");
  const clearBtn = document.getElementById("clearNameSearch");

  // Toggle clear button visibility
  if (clearBtn) {
    if (nameSearchInput.value.length > 0) {
      clearBtn.classList.add("visible");
    } else {
      clearBtn.classList.remove("visible");
    }
  }

  // Clear previous debounce timer
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
  }

  // Hide loading if search term is empty or too short
  if (!searchTerm || searchTerm.length < 2) {
    if (loadingIndicator) loadingIndicator.classList.remove("active");
    if (!searchTerm) resultsContainer.innerHTML = "";
  }

  // Show loading indicator for valid searches
  if (searchTerm.length >= 2 && loadingIndicator) {
    loadingIndicator.classList.add("active");
    resultsContainer.innerHTML = "";
  }

  // Debounce the search to prevent too many rapid searches
  searchDebounceTimer = setTimeout(function () {
    performSearch(searchTerm, resultsContainer, loadingIndicator);
  }, 350);
}

// Clear the name search input and results
function clearNameSearch() {
  const nameSearchInput = document.getElementById("nameSearch");
  const resultsContainer = document.getElementById("nameSearchResults");
  const clearBtn = document.getElementById("clearNameSearch");

  if (nameSearchInput) {
    nameSearchInput.value = "";
    nameSearchInput.focus();
  }
  if (resultsContainer) {
    resultsContainer.innerHTML = "";
  }
  if (clearBtn) {
    clearBtn.classList.remove("visible");
  }
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

  // Require at least 2 characters before searching
  if (searchTerm.length < 2) {
    resultsContainer.innerHTML = `
            <div class="live-result-item no-results">
                Type at least 2 characters to search
            </div>
        `;
    return;
  }

  // Filter: typed text (spaces ignored) must be >= 70% of bhajan name length and match from start
  const searchTermLower = searchTerm.toLowerCase();
  const searchCompact = searchTermLower.replace(/\s+/g, "");
  const filteredResults = bhajansDatabase.filter((bhajan) => {
    if (!bhajan.name) return false;
    const nameCompact = bhajan.name.toLowerCase().replace(/\s+/g, "");
    const threshold = Math.ceil(nameCompact.length * 0.6);
    return searchCompact.length >= threshold && nameCompact.startsWith(searchCompact);
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
    const hasAudioSet = new Set(bhajanAudios.map(a => a.date));
    resultsContainer.innerHTML =
      `<div class="search-result-count">${results.length} bhajan${results.length > 1 ? 's' : ''} found</div>` +
      results.map((bhajan) => {
        const hasAudio = hasAudioSet.has(bhajan.dateSung);
        return `
            <div class="live-result-item clickable-row" onclick="showAudioHint('${bhajan.dateSung}', '${formatDate(bhajan.dateSung)}')">
                <div class="name-search-line-1">
                    <span class="bhajan-name">${bhajan.name}</span>
                    ${hasAudio ? '<span class="has-audio-tag">🎵</span>' : ''}
                </div>
                <div class="name-search-line-2">
                    <span class="detail-badge day-badge day-${bhajan.day.toLowerCase()}">${bhajan.day}</span>
                    ${formatShruthiSimple(bhajan.shruthi)}
                </div>
                <div class="name-search-last-sung">
                    <span class="last-sung-label">Last sung on</span>
                    <span class="last-sung-date">${formatDate(bhajan.dateSung)}</span>
                    ${(bhajan.singer || bhajan.singers) ? `<span class="last-sung-by">by <strong>${bhajan.singer || bhajan.singers}</strong></span>` : ''}
                </div>
            </div>
        `;
      }).join("");
  }
}

// Show hint to use Live Audio section
function showAudioHint(dateSung, formattedDate) {
  const modal = document.getElementById("audioHintModal");
  const message = document.getElementById("audioHintMessage");

  // Check if audio is available for this date
  const audioEntry = bhajanAudios.find((audio) => audio.date === dateSung);

  if (audioEntry && audioEntry.audioFile) {
    message.innerHTML = `To hear this bhajan, choose date <strong>"${formattedDate}"</strong> from the Live Bhajan Audios list.`;
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

// ============================================================================
// 4. QUICK SEARCH FEATURE CODE
// ============================================================================

// Reset other filters when one is changed
function resetOtherFilters(changedFilter) {
  if (changedFilter === "singer") {
    // Automatically show songs when singer is selected
    showSingerSongs();
  }
}

// Store current singer filter for show/hide functionality
let currentSingerFilter = null;
let currentSingerResults = [];

const GENTS_SINGERS = new Set([
  // Individual names (matching split values from singer field)
  "A.Srinivas", "Abhishek", "Abhiram", "Ankit", "Charan", "Eshwar", "G.Srinivas", "Lal", "Ganapathi",
  "Sai Karthik", "Ramakrishna", "Santosh", "Shantha Krishna", "Sharath", "Sridhar", "Swaroop", "Venu",
  // Group entries (matching singers field exactly)
  "Abhishek & Swaroop", "Sai Karthik & Abhishek", "Abhishek, Swaroop & Sai Karthik"
].map(s => s.toLowerCase()));

function getSelectedSinger() {
  const gents = document.getElementById("singerFilterGents");
  const ladies = document.getElementById("singerFilterLadies");
  if (gents && gents.value !== "all") return gents.value;
  if (ladies && ladies.value !== "all") return ladies.value;
  return "all";
}

function onSingerDropdownChange(changed) {
  if (changed === "gents") {
    const ladies = document.getElementById("singerFilterLadies");
    if (ladies) ladies.value = "all";
  } else {
    const gents = document.getElementById("singerFilterGents");
    if (gents) gents.value = "all";
  }
}

// Show singer's songs automatically when singer is selected from dropdown
function showSingerSongs() {
  const singerFilter = getSelectedSinger();

  // Clear name search results
  const nameSearchResults = document.getElementById("nameSearchResults");
  if (nameSearchResults) nameSearchResults.innerHTML = "";

  // If no singer selected, hide results
  if (singerFilter === "all") {
    const resultsSection = document.getElementById("resultsSection");
    if (resultsSection) resultsSection.style.display = "none";
    currentSingerFilter = null;
    currentSingerResults = [];
    return;
  }

  // Store the current singer filter
  currentSingerFilter = singerFilter;

  // Filter bhajans by the selected singer, excluding Aaradhana Mahotsavam
  let results = bhajansDatabase.filter((bhajan) => {
    if (bhajan.dateSung === "2026-04-24") return false;
    if (bhajan.singers) {
      return bhajan.singers.trim().toLowerCase() === singerFilter.toLowerCase();
    }
    if (bhajan.singer) {
      const singerList = bhajan.singer.split(/[&,]/).map(s => s.trim().toLowerCase());
      return singerList.includes(singerFilter.toLowerCase());
    }
    return false;
  });

  // Store current results
  currentSingerResults = results;

  // Display the results with clickable audio links
  displaySingerResults(results, singerFilter);
}

// Quick Search Function
function quickSearch() {
  const nameSearchResults = document.getElementById("nameSearchResults");
  if (nameSearchResults) nameSearchResults.innerHTML = "";

  const singerFilter = getSelectedSinger();

  let results = bhajansDatabase;

  if (singerFilter !== "all") {
    results = results.filter((bhajan) => {
      if (bhajan.dateSung === "2026-04-24") return false;
      if (bhajan.singers) {
        return bhajan.singers.trim().toLowerCase() === singerFilter.toLowerCase();
      }
      if (bhajan.singer) {
        const singerList = bhajan.singer.split(/[&,]/).map(s => s.trim().toLowerCase());
        return singerList.includes(singerFilter.toLowerCase());
      }
      return false;
    });
  }

  if (singerFilter !== "all") {
    currentSingerFilter = singerFilter;
    currentSingerResults = results;
    displaySingerResults(results, singerFilter);
  } else {
    displayResults(results, "Quick Search Results");
  }
}

// Populate Singer Dropdowns
function populateSingerDropdown() {
  const gentsSelect = document.getElementById("singerFilterGents");
  const ladiesSelect = document.getElementById("singerFilterLadies");
  if (!gentsSelect || !ladiesSelect) return;

  // Get unique singers from the database
  const allSingers = new Set();
  bhajansDatabase.forEach((bhajan) => {
    if (bhajan.singers && bhajan.singers.trim() !== "") {
      allSingers.add(bhajan.singers.trim());
    } else if (bhajan.singer && bhajan.singer.trim() !== "") {
      bhajan.singer.split(/[&,]/).map(s => s.trim()).filter(s => s).forEach(s => allSingers.add(s));
    }
  });

  const sorted = Array.from(allSingers).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  sorted.forEach((singer) => {
    const option = document.createElement("option");
    option.value = singer;
    option.textContent = singer;
    const isGents = GENTS_SINGERS.has(singer.toLowerCase());
    (isGents ? gentsSelect : ladiesSelect).appendChild(option);
  });
}

// Display singer-specific results with clickable audio links
function displaySingerResults(results, singerName) {
  const resultsSection = document.getElementById("resultsSection");
  const resultsContainer = document.getElementById("resultsContainer");
  const hideBtn = document.getElementById("hideResultsBtn");
  const closeBtn = document.querySelector(".close-results-btn");

  if (results.length === 0) {
    resultsContainer.innerHTML = `
            <div class="result-item">
                <p class="result-title">No bhajans found for ${singerName}</p>
                <p class="result-details">Try selecting a different singer</p>
            </div>
        `;
    // Show Close button only
    if (hideBtn) hideBtn.style.display = "none";
    if (closeBtn) closeBtn.style.display = "inline-block";
  } else {
    resultsContainer.innerHTML = `
      <div class="singer-results-header">
        <h3 class="singer-results-title">Songs by ${singerName}</h3>
        <p class="singer-results-subtitle">Click on any song to play</p>
      </div>
      ${results
        .map((bhajan, index) => {
          // Check if audio is available for this bhajan
          const audioEntry = bhajanAudios.find((audio) => audio.date === bhajan.dateSung);
          const hasAudio = audioEntry && audioEntry.audioFile && bhajan.startTime;

          // Calculate end time as the start time of the next bhajan (if available)
          const bhajansForDate = bhajansDatabase.filter(b => b.dateSung === bhajan.dateSung);
          const bhajanIndex = bhajansForDate.findIndex(b => b.name === bhajan.name);
          const nextBhajan = bhajanIndex >= 0 && bhajanIndex < bhajansForDate.length - 1 ? bhajansForDate[bhajanIndex + 1] : null;
          const endTime = nextBhajan ? nextBhajan.startTime : null;

          return `
            <div class="result-item singer-search-item ${hasAudio ? 'clickable-row has-audio-indicator' : 'no-audio-item'}"
                 ${hasAudio ? `onclick="playBhajanAudioFromSinger('${bhajan.dateSung}', '${bhajan.name.replace(/'/g, "\\'")}', ${formatTimeAttr(bhajan.startTime)}, ${formatTimeAttr(endTime)})"` : ''}>
                <div class="singer-result-content">
                  <span class="result-number">${index + 1}.</span>
                  <h3 class="result-title">${bhajan.name}</h3>
                  ${hasAudio ? '<span class="audio-play-icon">▶</span>' : ''}
                </div>
            </div>
        `;
        })
        .join("")}
    `;
    // Show Hide button so users can collapse/restore the list
    if (hideBtn) hideBtn.style.display = "inline-block";
    if (closeBtn) closeBtn.style.display = "inline-block";
  }

  // Build ordered playlist of this singer's bhajans that have audio
  singerPlaylist = results
    .filter(bhajan => {
      const audioEntry = bhajanAudios.find(a => a.date === bhajan.dateSung);
      return audioEntry && audioEntry.audioFile && bhajan.startTime;
    })
    .map(bhajan => {
      const bhajansForDate = bhajansDatabase.filter(b => b.dateSung === bhajan.dateSung);
      const bIdx = bhajansForDate.findIndex(b => b.name === bhajan.name);
      const nextB = bIdx >= 0 && bIdx < bhajansForDate.length - 1 ? bhajansForDate[bIdx + 1] : null;
      return { dateSung: bhajan.dateSung, name: bhajan.name, startTime: bhajan.startTime, endTime: nextB ? nextB.startTime : null };
    });
  singerPlaylistIndex = -1;

  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Display Results Function (Quick Search)
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
            </div>
        `
      )
      .join("");
  }

  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ============================================================================
// 5. DATE SEARCH CODE
// ============================================================================

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

  displayDateResults(results, dateInput);
}

// Display Date Search Results (simplified - only name and day)
function displayDateResults(results, selectedDate) {
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
    const dayOfWeek = results[0].day;
    const festivalName = getFestivalName(selectedDate);
    const headerHtml = `
      <div class="date-results-header${festivalName ? ' special-occasion-header' : ''}">
        <h3 class="date-results-title">Bhajans on ${formatDate(selectedDate)}</h3>
        <div class="date-results-badges">
          <span class="detail-badge day-badge day-${dayOfWeek.toLowerCase()}">${dayOfWeek}</span>
          ${festivalName ? `<span class="detail-badge festival-badge">${festivalName.replace('Festival - ', '')}</span>` : ''}
        </div>
      </div>
    `;

    resultsContainer.innerHTML = headerHtml + results
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

// ============================================================================
// 6. AUDIO PLAYER CODE
// ============================================================================

// Store current date's bhajans for tracking which one is playing
let currentDateBhajans = [];
let currentPlayingBhajanName = "";

let singerPlaylist = [];
let singerPlaylistIndex = -1;
let isPlayingFromSingerList = false;
let singerEndTimeTriggered = false;

// Populate Audio Dates Dropdown
function populateAudioDates() {
  const audioDateSelect = document.getElementById("audioDateSelect");
  if (!audioDateSelect || typeof bhajanAudios === "undefined") return;

  audioDateSelect.innerHTML = '<option value="">-- Choose a date --</option>';

  // Sort audios by date (newest first)
  const sortedAudios = [...bhajanAudios].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Split into special occasions and regular sessions
  const specialOccasions = sortedAudios.filter((a) => festivalDates[a.date]);
  const regularSessions = sortedAudios.filter((a) => !festivalDates[a.date]);

  // Helper to pick an icon for a festival
  function getFestivalIcon(festival) {
    if (festival.includes("Shivarathri") || festival.includes("Shivaratri")) return "🔱 ";
    if (festival.includes("Bhogi")) return "🔥 ";
    if (festival.includes("Sankranti") || festival.includes("Sankranthi")) return "🌾 ";
    if (festival.includes("Ramzan")) return "🌙 ";
    if (festival.includes("Aaradhana")) return "🙏 ";
    return "";
  }

  // Helper to build an option element
  function makeOption(audio) {
    const option = document.createElement("option");
    option.value = audio.date;
    const formattedDate = formatDate(audio.date);
    const festival = festivalDates[audio.date];
    option.textContent = festival
      ? `${getFestivalIcon(festival)}${formattedDate} - ${festival.replace("Festival - ", "")}`
      : `${formattedDate} - ${audio.label || ""}`;
    return option;
  }

  // Special Occasions group
  if (specialOccasions.length > 0) {
    const group = document.createElement("optgroup");
    group.label = "✨ SPECIAL OCCASIONS ✨";
    specialOccasions.forEach((audio) => group.appendChild(makeOption(audio)));
    audioDateSelect.appendChild(group);
  }

  // Regular Sessions group
  if (regularSessions.length > 0) {
    const group = document.createElement("optgroup");
    group.label = "📅 REGULAR SESSIONS";
    regularSessions.forEach((audio) => group.appendChild(makeOption(audio)));
    audioDateSelect.appendChild(group);
  }

  // Build the custom styled dropdown after populating native select
  buildCustomAudioDropdown();
}

// Build a fully custom dropdown to replace the native <select> for full CSS control
function buildCustomAudioDropdown() {
  const nativeSelect = document.getElementById("audioDateSelect");
  if (!nativeSelect) return;

  // Remove any existing custom dropdown and panel
  const existing = document.getElementById("customAudioDropdown");
  if (existing) existing.remove();
  const existingPanel = document.getElementById("customAudioPanel");
  if (existingPanel) existingPanel.remove();

  // Hide native select
  nativeSelect.style.display = "none";

  // Create wrapper (trigger only — no panel inside)
  const wrapper = document.createElement("div");
  wrapper.id = "customAudioDropdown";
  wrapper.className = "custom-audio-select";

  // Create trigger button
  const trigger = document.createElement("div");
  trigger.className = "custom-audio-trigger";
  trigger.innerHTML =
    '<span class="custom-audio-selected-text" id="customAudioSelectedText">-- Choose a date --</span>' +
    '<span class="custom-audio-arrow" id="customAudioArrow">▼</span>';

  wrapper.appendChild(trigger);
  nativeSelect.parentNode.insertBefore(wrapper, nativeSelect.nextSibling);

  // Create panel — attached to body to escape overflow:hidden on .container
  const panel = document.createElement("div");
  panel.className = "custom-audio-panel";
  panel.id = "customAudioPanel";
  document.body.appendChild(panel);

  // Mirror optgroups and options from native select (no duplicate default option)
  Array.from(nativeSelect.children).forEach((child) => {
    if (child.tagName === "OPTGROUP") {
      const isSpecial = child.label.toUpperCase().includes("SPECIAL");
      const header = document.createElement("div");
      header.className = "custom-audio-group-header " + (isSpecial ? "special" : "regular");
      header.textContent = child.label;
      panel.appendChild(header);

      Array.from(child.children).forEach((optEl) => {
        const opt = document.createElement("div");
        opt.className = "custom-audio-option";
        opt.textContent = optEl.textContent;
        opt.dataset.value = optEl.value;
        panel.appendChild(opt);
      });
    }
  });

  // Position panel using fixed coords based on trigger location
  function positionPanel() {
    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - 8;
    const spaceAbove = rect.top - 8;
    const panelMaxH = 280;

    panel.style.left   = rect.left + "px";
    panel.style.width  = rect.width + "px";
    panel.style.maxHeight = panelMaxH + "px";

    if (spaceBelow >= Math.min(panelMaxH, 120) || spaceBelow >= spaceAbove) {
      // Open downward
      panel.style.top    = rect.bottom + "px";
      panel.style.bottom = "auto";
      panel.style.borderRadius    = "0 0 12px 12px";
      panel.style.borderTop       = "none";
      panel.style.borderBottom    = "2px solid #667eea";
      trigger.style.borderRadius  = "12px 12px 0 0";
      trigger.style.borderBottom  = "2px solid #667eea";
    } else {
      // Open upward
      panel.style.bottom = (window.innerHeight - rect.top) + "px";
      panel.style.top    = "auto";
      panel.style.borderRadius    = "12px 12px 0 0";
      panel.style.borderBottom    = "none";
      panel.style.borderTop       = "2px solid #667eea";
      trigger.style.borderRadius  = "0 0 12px 12px";
      trigger.style.borderTop     = "2px solid #667eea";
    }
  }

  function openPanel() {
    positionPanel();
    panel.classList.add("open");
    wrapper.classList.add("open");
  }

  function closePanel() {
    panel.classList.remove("open");
    wrapper.classList.remove("open");
    trigger.style.borderRadius = "";
    trigger.style.borderTop    = "";
    trigger.style.borderBottom = "";
  }

  // Toggle on trigger click
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    panel.classList.contains("open") ? closePanel() : openPanel();
  });

  // Option selection
  panel.addEventListener("click", (e) => {
    const opt = e.target.closest(".custom-audio-option");
    if (!opt) return;

    const value = opt.dataset.value;
    nativeSelect.value = value;

    const selectedText = document.getElementById("customAudioSelectedText");
    if (selectedText) {
      selectedText.textContent = value ? opt.textContent : "-- Choose a date --";
      selectedText.classList.toggle("has-value", !!value);
    }

    panel.querySelectorAll(".custom-audio-option").forEach((o) => o.classList.remove("selected"));
    if (value) opt.classList.add("selected");

    closePanel();
    loadAudio();
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target) && !panel.contains(e.target)) closePanel();
  });

  // Reposition on scroll/resize
  window.addEventListener("scroll", () => { if (panel.classList.contains("open")) positionPanel(); }, true);
  window.addEventListener("resize", () => { if (panel.classList.contains("open")) positionPanel(); });
}

// Sync custom dropdown display when audioDateSelect.value is set programmatically
function syncCustomDropdown(value) {
  const panel = document.getElementById("customAudioPanel");
  const selectedText = document.getElementById("customAudioSelectedText");
  if (!panel || !selectedText) return;

  panel.querySelectorAll(".custom-audio-option").forEach((o) => o.classList.remove("selected"));

  if (value) {
    const opt = panel.querySelector(`.custom-audio-option[data-value="${value}"]`);
    if (opt) {
      selectedText.textContent = opt.textContent;
      selectedText.classList.add("has-value");
      opt.classList.add("selected");
    }
  } else {
    selectedText.textContent = "-- Choose a date --";
    selectedText.classList.remove("has-value");
  }
}

function loadAudio() {
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
    const festivalName = getFestivalName(selectedDate);
    audioBhajanList.innerHTML = `
      <div class="audio-bhajan-list-header${festivalName ? ' special-occasion-header' : ''}">
        <div class="audio-bhajan-header-content">
          <h3 class="audio-bhajan-list-title">Bhajans on ${formatDate(selectedDate)}</h3>
          <div class="audio-bhajan-badges">
            <span class="detail-badge day-badge day-${dayOfWeek.toLowerCase()}">${dayOfWeek}</span>
            ${festivalName ? `<span class="detail-badge festival-badge">${festivalName.replace('Festival - ', '')}</span>` : ''}
          </div>
        </div>
        <div class="audio-bhajan-header-buttons">
          <button id="closeAudioListBtn" class="close-audio-list-btn" onclick="closeAudioBhajanList()">Close</button>
          <button id="hideAudioListBtn" class="hide-audio-list-btn" onclick="hideAudioBhajanList()" style="display: none;">Hide</button>
        </div>
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
                ? `onclick="isPlayingFromSingerList=false; playBhajanAudio('${
                    bhajan.dateSung
                  }', '${bhajan.name.replace(/'/g, "\\'")}', ${formatTimeAttr(
                    bhajan.startTime
                  )}, ${formatTimeAttr(endTime)})"`
                : ""
            }>
            <span class="audio-bhajan-number">${index + 1}.</span>
            <div class="audio-bhajan-content">
              <span class="audio-bhajan-name">${bhajan.name}</span>
              ${(bhajan.singer || bhajan.singers) ? `<span class="audio-bhajan-singer">${bhajan.singer || bhajan.singers}</span>` : ''}
            </div>
            <span class="playing-indicator">
              <span class="playing-bar"></span>
              <span class="playing-bar"></span>
              <span class="playing-bar"></span>
            </span>
          </div>
        `;
          })
          .join("")}
      </div>
    `;
    audioBhajanList.style.display = "block";
    if (festivalName) {
      audioBhajanList.classList.add("special-occasion-list");
    } else {
      audioBhajanList.classList.remove("special-occasion-list");
    }
    // Auto-play audio from the beginning when a date with audio is selected
    if (hasAudio) {
      if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";
      isPlayingFromSingerList = false;
      playBhajanAudio(selectedDate, "All Bhajans", null, null);
    } else if (audioSelectionPrompt) {
      audioSelectionPrompt.style.display = "none";
    }
  } else {
    audioBhajanList.style.display = "none";
    if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";
    // No bhajan list but audio exists — still play it
    if (hasAudio) {
      isPlayingFromSingerList = false;
      playBhajanAudio(selectedDate, "All Bhajans", null, null);
    }
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
    isPlayingFromSingerList = false;
    playBhajanAudio(firstBhajan.dateSung, "All Bhajans", null, null);

    // Hide the selection prompt
    const audioSelectionPrompt = document.getElementById("audioSelectionPrompt");
    if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";
  }
}

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

// Play audio for a specific bhajan by its dateSung with optional timestamps
function playBhajanAudio(dateSung, bhajanName, startTime, endTime) {
  const endTimeSeconds = parseTime(endTime);
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

  // Remove currently-playing class from all singer search items
  document.querySelectorAll(".singer-search-item.currently-playing").forEach((item) => {
    item.classList.remove("currently-playing");
  });

  // Add playing class to the selected bhajan item
  const selectedItem = document.querySelector(
    `.audio-bhajan-item[data-bhajan-name="${bhajanName.replace(/"/g, "&quot;")}"]`
  );
  if (selectedItem) {
    selectedItem.classList.add("playing");
  }

  // Add currently-playing class to singer search items
  document.querySelectorAll(".singer-search-item").forEach((item) => {
    const itemTitle = item.querySelector(".result-title");
    if (itemTitle && itemTitle.textContent === bhajanName) {
      item.classList.add("currently-playing");
    }
  });

  // Parse start timestamp (supports both seconds and "MM:SS" format)
  const startSeconds = parseTime(startTime);

  // Find the audio for the bhajan's dateSung
  const audioEntry = bhajanAudios.find((audio) => audio.date === dateSung);

  if (audioEntry && audioEntry.audioFile) {
    // Update the dropdown to reflect the selected date
    const audioDateSelect = document.getElementById("audioDateSelect");
    if (audioDateSelect) {
      audioDateSelect.value = dateSung;
      syncCustomDropdown(dateSung);
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

    // Set the audio source and force reload
    audioPlayer.src = audioEntry.audioFile;
    audioPlayer.load();

    // Update label with just the bhajan name
    audioLabel.textContent = bhajanName;

    audioPlayerContainer.style.display = "block";
    noAudioMessage.style.display = "none";
    if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";

    // Show the hide button since audio is now playing
    showHideButton();

    // Show the stop button
    showStopAudioButton();

    // Scroll to audio section
    audioSection.scrollIntoView({ behavior: "smooth", block: "start" });

    audioPlayer.onloadedmetadata = function () {
      if (hasTimestamps) {
        audioPlayer.currentTime = startSeconds;
        const onSeeked = function () {
          audioPlayer.removeEventListener("seeked", onSeeked);
          audioPlayer.play().catch(function (err) {
            console.log("Audio autoplay prevented:", err);
          });
        };
        audioPlayer.addEventListener("seeked", onSeeked);
      } else {
        audioPlayer.play().catch(function (err) {
          console.log("Audio autoplay prevented:", err);
        });
      }
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
        document.querySelectorAll(".singer-search-item.currently-playing").forEach((item) => {
          item.classList.remove("currently-playing");
        });

        const newPlayingItem = document.querySelector(
          `.audio-bhajan-item[data-bhajan-name="${currentBhajan.name.replace(/"/g, "&quot;")}"]`
        );
        if (newPlayingItem) {
          newPlayingItem.classList.add("playing");
        }

        // Update currently-playing class for singer search items
        document.querySelectorAll(".singer-search-item").forEach((item) => {
          const itemTitle = item.querySelector(".result-title");
          if (itemTitle && itemTitle.textContent === currentBhajan.name) {
            item.classList.add("currently-playing");
          }
        });
      }

      // Singer playlist: stop at endTime and advance to next singer bhajan
      if (isPlayingFromSingerList && endTimeSeconds !== null && !singerEndTimeTriggered && currentTime >= endTimeSeconds) {
        singerEndTimeTriggered = true;
        playNextInSingerPlaylist();
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

// ============================================================================
// 7. AUDIO BHAJAN LIST CONTROLS
// ============================================================================

// Close Audio Bhajan List
function closeAudioBhajanList() {
  const audioBhajanList = document.getElementById("audioBhajanList");
  const audioPlayerContainer = document.getElementById("audioPlayerContainer");
  const audioSelectionPrompt = document.getElementById("audioSelectionPrompt");
  const audioDateSelect = document.getElementById("audioDateSelect");
  const audioPlayer = document.getElementById("audioPlayer");
  const showBhajanListContainer = document.getElementById("showBhajanListContainer");

  // Hide the list and related elements
  audioBhajanList.style.display = "none";
  if (audioPlayerContainer) audioPlayerContainer.style.display = "none";
  if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";
  if (showBhajanListContainer) showBhajanListContainer.style.display = "none";

  // Hide stop button
  hideStopAudioButton();

  // Reset the dropdown
  if (audioDateSelect) { audioDateSelect.value = ""; syncCustomDropdown(""); }

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
  const showBhajanListContainer = document.getElementById("showBhajanListContainer");
  if (showBhajanListContainer) showBhajanListContainer.style.display = "block";
}

// Show hide button and hide close button when audio is playing
function showHideButton() {
  const hideBtn = document.getElementById("hideAudioListBtn");
  const closeBtn = document.getElementById("closeAudioListBtn");
  const showBhajanListContainer = document.getElementById("showBhajanListContainer");

  if (hideBtn) hideBtn.style.display = "inline-block";
  if (closeBtn) closeBtn.style.display = "none";
  if (showBhajanListContainer) showBhajanListContainer.style.display = "none";
}

// Show the audio bhajan list again
function showAudioBhajanList() {
  const audioBhajanList = document.getElementById("audioBhajanList");
  const showBhajanListContainer = document.getElementById("showBhajanListContainer");

  if (audioBhajanList) audioBhajanList.style.display = "block";
  if (showBhajanListContainer) showBhajanListContainer.style.display = "none";

  // Scroll to audio section
  const audioSection = document.querySelector(".audio-section");
  if (audioSection) {
    audioSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Hide the floating show button
function hideFloatingShowBtn() {
  const showBhajanListContainer = document.getElementById("showBhajanListContainer");
  if (showBhajanListContainer) showBhajanListContainer.style.display = "none";
}

// Stop audio playback completely
function stopAudioPlayback() {
  const audioPlayer = document.getElementById("audioPlayer");
  const audioPlayerContainer = document.getElementById("audioPlayerContainer");
  const audioBhajanList = document.getElementById("audioBhajanList");
  const audioSelectionPrompt = document.getElementById("audioSelectionPrompt");
  const stopAudioContainer = document.getElementById("stopAudioContainer");
  const showBhajanListContainer = document.getElementById("showBhajanListContainer");
  const resultsSection = document.getElementById("resultsSection");
  const floatingShowSingerBtn = document.getElementById("floatingShowSingerBtn");

  // Stop and reset audio player
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }

  // Hide audio player and related elements
  if (audioPlayerContainer) audioPlayerContainer.style.display = "none";
  if (audioBhajanList) audioBhajanList.style.display = "none";
  if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";
  if (stopAudioContainer) stopAudioContainer.style.display = "none";
  if (showBhajanListContainer) showBhajanListContainer.style.display = "none";

  // Remove playing states from all items
  document.querySelectorAll(".audio-bhajan-item.playing").forEach((item) => {
    item.classList.remove("playing");
  });
  document.querySelectorAll(".singer-search-item.currently-playing").forEach((item) => {
    item.classList.remove("currently-playing");
  });

  // Keep singer results visible if they exist
  if (currentSingerFilter && currentSingerResults.length > 0 && resultsSection) {
    resultsSection.style.display = "block";
    if (floatingShowSingerBtn) floatingShowSingerBtn.style.display = "none";

    // Reset the buttons to show only Close
    const hideBtn = document.getElementById("hideResultsBtn");
    const closeBtn = document.querySelector(".close-results-btn");
    if (hideBtn) hideBtn.style.display = "none";
    if (closeBtn) closeBtn.style.display = "inline-block";
  }

  // Reset audio list buttons
  resetAudioListButtons();

  // Clear current playing bhajan tracking
  currentPlayingBhajanName = "";
  currentDateBhajans = [];
}

// Show stop audio button
function showStopAudioButton() {
  const stopAudioContainer = document.getElementById("stopAudioContainer");
  if (stopAudioContainer) stopAudioContainer.style.display = "block";
}

// Hide stop audio button
function hideStopAudioButton() {
  const stopAudioContainer = document.getElementById("stopAudioContainer");
  if (stopAudioContainer) stopAudioContainer.style.display = "none";
}

// Reset audio list buttons - show Close, hide Hide (when audio is not playing)
function resetAudioListButtons() {
  const closeBtn = document.getElementById("closeAudioListBtn");
  const hideBtn = document.getElementById("hideAudioListBtn");

  if (closeBtn) closeBtn.style.display = "inline-block";
  if (hideBtn) hideBtn.style.display = "none";
}

// ============================================================================
// 8. MOBILE AUDIO PLAYER CONTROLS
// ============================================================================

// Helper: set play button state
function setPlayBtnState(playing) {
  const icon = document.getElementById("cpPlayIcon");
  const label = document.getElementById("cpPlayLabel");
  if (icon) icon.innerHTML = playing ? "&#9646;&#9646;" : "&#9654;";
  if (label) label.textContent = playing ? "Pause" : "Play";
}

// Toggle play/pause
function togglePlayPause() {
  const audioPlayer = document.getElementById("audioPlayer");
  if (audioPlayer && audioPlayer.src) {
    if (audioPlayer.paused) {
      audioPlayer.play();
      setPlayBtnState(true);
    } else {
      audioPlayer.pause();
      setPlayBtnState(false);
    }
  }
}

// Toggle mute
function toggleMute() {
  const audioPlayer = document.getElementById("audioPlayer");
  const muteIcon = document.getElementById("cpMuteIcon");
  const muteLabel = document.getElementById("cpMuteLabel");
  if (audioPlayer) {
    audioPlayer.muted = !audioPlayer.muted;
    if (muteIcon) muteIcon.innerHTML = audioPlayer.muted ? "&#128263;" : "&#128266;";
    if (muteLabel) muteLabel.textContent = audioPlayer.muted ? "Unmute" : "Mute";
  }
}

// Format time display
function formatMobileTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Initialize custom audio player controls
function initMobileAudioPlayer() {
  const audioPlayer = document.getElementById("audioPlayer");
  const seekbar = document.getElementById("cpSeekbar");
  const currentTimeEl = document.getElementById("cpCurrentTime");
  const durationEl = document.getElementById("cpDuration");
  const playBtn = document.getElementById("cpPlayBtn");

  if (!audioPlayer || !seekbar) return;

  // Update seekbar and time display as audio plays
  audioPlayer.addEventListener("timeupdate", function () {
    if (audioPlayer.duration) {
      const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      seekbar.value = progress;
      seekbar.style.setProperty("--cp-progress", `${progress}%`);
      currentTimeEl.textContent = formatMobileTime(audioPlayer.currentTime);
    }
  });

  // Update duration when metadata loads
  audioPlayer.addEventListener("loadedmetadata", function () {
    durationEl.textContent = formatMobileTime(audioPlayer.duration);
    seekbar.value = 0;
    seekbar.style.setProperty("--cp-progress", "0%");
    currentTimeEl.textContent = "0:00";
    setPlayBtnState(false);
  });

  // Seek when user drags the seekbar
  seekbar.addEventListener("input", function () {
    if (audioPlayer.duration) {
      audioPlayer.currentTime = (seekbar.value / 100) * audioPlayer.duration;
      seekbar.style.setProperty("--cp-progress", `${seekbar.value}%`);
    }
  });

  // Update play button when audio ends
  audioPlayer.addEventListener("ended", function () {
    setPlayBtnState(false);
    hideFloatingShowBtn();
    hideStopAudioButton();
    resetAudioListButtons();
    if (isPlayingFromSingerList) {
      playNextInSingerPlaylist();
    }
  });

  // Update play button when audio is paused externally
  audioPlayer.addEventListener("pause", function () {
    setPlayBtnState(false);
  });

  audioPlayer.addEventListener("play", function () {
    setPlayBtnState(true);
  });
}

// ============================================================================
// 9. RESULTS SECTION CONTROLS
// ============================================================================

function playNextInSingerPlaylist() {
  singerPlaylistIndex++;
  if (singerPlaylistIndex < singerPlaylist.length) {
    const next = singerPlaylist[singerPlaylistIndex];
    singerEndTimeTriggered = false;
    playBhajanAudio(next.dateSung, next.name, next.startTime, next.endTime);
  } else {
    isPlayingFromSingerList = false;
    singerPlaylistIndex = -1;
  }
}

// Play audio from singer list (wrapper to track we're playing from singer list)
function playBhajanAudioFromSinger(dateSung, bhajanName, startTime, endTime) {
  isPlayingFromSingerList = true;
  singerEndTimeTriggered = false;
  singerPlaylistIndex = singerPlaylist.findIndex(b => b.name === bhajanName && b.dateSung === dateSung);

  playBhajanAudio(dateSung, bhajanName, startTime, endTime);

  // Show hide button since audio is now playing
  const hideBtn = document.getElementById("hideResultsBtn");
  const closeBtn = document.querySelector(".close-results-btn");
  if (hideBtn) hideBtn.style.display = "inline-block";
  if (closeBtn) closeBtn.style.display = "none";
}

// Hide Results Section (keeps audio playing)
function hideResults() {
  const resultsSection = document.getElementById("resultsSection");
  const floatingShowBtn = document.getElementById("floatingShowSingerBtn");

  if (resultsSection) resultsSection.style.display = "none";

  // Show floating show button if we have singer results
  if (currentSingerFilter && currentSingerResults.length > 0 && floatingShowBtn) {
    floatingShowBtn.style.display = "block";
  }
}

// Show Singer Results again
function showSingerResults() {
  const resultsSection = document.getElementById("resultsSection");
  const floatingShowBtn = document.getElementById("floatingShowSingerBtn");

  if (resultsSection && currentSingerFilter && currentSingerResults.length > 0) {
    // Re-display the singer results
    displaySingerResults(currentSingerResults, currentSingerFilter);

    // Re-enable hide button
    const hideBtn = document.getElementById("hideResultsBtn");
    const closeBtn = document.querySelector(".close-results-btn");
    const audioPlayer = document.getElementById("audioPlayer");

    if (audioPlayer && audioPlayer.src && !audioPlayer.paused) {
      if (hideBtn) hideBtn.style.display = "inline-block";
      if (closeBtn) closeBtn.style.display = "none";
    }
  }

  if (floatingShowBtn) floatingShowBtn.style.display = "none";

  // Scroll to results section
  if (resultsSection) {
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Close Results Section
function closeResults() {
  const resultsSection = document.getElementById("resultsSection");
  const floatingShowBtn = document.getElementById("floatingShowSingerBtn");
  const hideBtn = document.getElementById("hideResultsBtn");
  const closeBtn = document.querySelector(".close-results-btn");
  const audioPlayer = document.getElementById("audioPlayer");

  resultsSection.style.display = "none";

  // Hide floating button and reset buttons
  if (floatingShowBtn) floatingShowBtn.style.display = "none";
  if (hideBtn) hideBtn.style.display = "none";
  if (closeBtn) closeBtn.style.display = "inline-block";

  // Stop audio if playing from singer list
  if (audioPlayer && audioPlayer.src && !audioPlayer.paused) {
    // Check if it was playing from singer results
    const hasPlayingSingerItem = document.querySelector(".singer-search-item.currently-playing");
    if (hasPlayingSingerItem) {
      stopAudioPlayback();
    }
  }

  // Clear singer filter and results
  currentSingerFilter = null;
  currentSingerResults = [];

  // Reset the singer dropdowns
  const gents = document.getElementById("singerFilterGents");
  const ladies = document.getElementById("singerFilterLadies");
  if (gents) gents.value = "all";
  if (ladies) ladies.value = "all";
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

// ============================================================================
// 10. UTILITY FUNCTIONS
// ============================================================================

// Helper function to format timestamp for onclick attribute
function formatTimeAttr(time) {
  if (time === null || time === undefined) return "null";
  return `'${time}'`;
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

// Format date string to readable format
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}


// Close all open sections when clicking outside of them
document.addEventListener("click", function (event) {
  // Check if click is on the audio hint modal - if so, don't close anything
  const audioHintModal = document.getElementById("audioHintModal");
  const isClickOnModal = audioHintModal && audioHintModal.contains(event.target);
  if (isClickOnModal) return;

  // Close results section (date search and quick search)
  // But never auto-close when singer results are active — user must use Close button
  const resultsSection = document.getElementById("resultsSection");
  if (resultsSection && resultsSection.style.display !== "none" && !currentSingerFilter) {
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

// DOM Content Loaded - Initialize everything
document.addEventListener("DOMContentLoaded", function () {
  // Enable Enter key for name search
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

  // Initialize mobile audio player
  initMobileAudioPlayer();

  // Initialize scroll animations
  const sections = document.querySelectorAll(".search-section, .admin-section");
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  // Populate dropdowns
  populateAudioDates();
  populateSingerDropdown();
});

// ============================================================================
// 12. SCROLL ANIMATIONS
// ============================================================================

// Intersection Observer for scroll animations
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
