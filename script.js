// ============================================================================
// BHAJAN PLANNER — MAIN SCRIPT

// ============================================================================
// 1. DATABASE INITIALIZATION
// Combines all bhajan data files into a single indexed database.
// Also holds festival date labels used across search and audio sections.
// ============================================================================

const bhajansDatabase = [
  ...sundayBhajansRawData,
  ...thursdayBhajansRawData,
  ...bhogi2026RawData,
  ...sankranthi2026,
  ...gurupoornima2026RawData,
  ...aaradhana2026RawData,
].map((bhajan, index) => ({ id: index + 1, ...bhajan }));

const festivalDates = {
  "2026-01-14": "Festival - Bhogi",
  "2026-01-15": "Festival - Sankranti",
  "2026-02-15": "Festival - Maha Shivarathri",
  "2026-03-21": "Festival - Ramzan",
  "2026-04-24": "Festival - Aaradhana Mahotsavam",
  "2026-07-29": "Festival - Guru Poornima",
};

function getFestivalName(dateString) {
  return festivalDates[dateString] || null;
}

// ============================================================================
// 2. UTILITY FUNCTIONS
// Shared helpers used across all sections.
// ============================================================================

// Format a YYYY-MM-DD date string to "Month Day, Year"
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Render shruthi object or string as an HTML badge
function formatShruthiSimple(shruthi) {
  if (!shruthi) return "";
  if (typeof shruthi === "string") {
    return `<span class="shruthi-simple">${shruthi}</span>`;
  }
  if (typeof shruthi === "object") {
    const parts = [];
    if (shruthi.gents) parts.push(`Gents: ${shruthi.gents}`);
    if (shruthi.ladies) parts.push(`Ladies: ${shruthi.ladies}`);
    return parts.length ? `<span class="shruthi-simple">${parts.join(" | ")}</span>` : "";
  }
  return "";
}

// Safely format a time value for use inside an onclick attribute string
function formatTimeAttr(time) {
  if (time === null || time === undefined) return "null";
  return `'${time}'`;
}

// Parse a time value (seconds number or "MM:SS" / "HH:MM:SS" string) to seconds
function parseTime(time) {
  if (time === null || time === undefined) return null;
  if (typeof time === "number") return time;
  if (typeof time === "string") {
    const parts = time.split(":");
    if (parts.length === 2) return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    if (parts.length === 3) return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
  }
  return null;
}

// Format seconds to "M:SS" display string
function formatMobileTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ============================================================================
// 3. WELCOME SCREEN
// Handles the curtain open animation on the landing screen.
// ============================================================================

function openCurtains() {
  const welcomeScreen = document.getElementById("welcomeScreen");
  document.querySelector(".curtain-left").classList.add("open");
  document.querySelector(".curtain-right").classList.add("open");
  welcomeScreen.classList.add("hidden");
  setTimeout(function () {
    welcomeScreen.classList.add("fade-out");
    setTimeout(function () {
      welcomeScreen.style.display = "none";
    }, 200);
  }, 600);
}

// ============================================================================
// 4. BHAJAN NAME SEARCH
// Live search-as-you-type by bhajan name with debounce. Results show shruthi,
// day, last sung date, singer, and a 🎵 tag if audio is available.
// Clicking a result with audio plays it directly.
// ============================================================================

let searchDebounceTimer = null;

function searchByName() {
  const resultsSection = document.getElementById("resultsSection");
  if (resultsSection) resultsSection.style.display = "none";

  const nameSearchInput = document.getElementById("nameSearch");
  const searchTerm = nameSearchInput.value.toLowerCase().trim();
  const resultsContainer = document.getElementById("nameSearchResults");
  const loadingIndicator = document.getElementById("nameSearchLoading");
  const clearBtn = document.getElementById("clearNameSearch");

  if (clearBtn) clearBtn.classList.toggle("visible", nameSearchInput.value.length > 0);

  if (searchDebounceTimer) clearTimeout(searchDebounceTimer);

  if (!searchTerm || searchTerm.length < 2) {
    if (loadingIndicator) loadingIndicator.classList.remove("active");
    if (!searchTerm) resultsContainer.innerHTML = "";
    return;
  }

  if (loadingIndicator) loadingIndicator.classList.add("active");
  resultsContainer.innerHTML = "";

  searchDebounceTimer = setTimeout(function () {
    performSearch(searchTerm, resultsContainer, loadingIndicator);
  }, 350);
}

function clearNameSearch() {
  const nameSearchInput = document.getElementById("nameSearch");
  const resultsContainer = document.getElementById("nameSearchResults");
  const clearBtn = document.getElementById("clearNameSearch");
  if (nameSearchInput) { nameSearchInput.value = ""; nameSearchInput.focus(); }
  if (resultsContainer) resultsContainer.innerHTML = "";
  if (clearBtn) clearBtn.classList.remove("visible");
}

function performSearch(searchTerm, resultsContainer, loadingIndicator) {
  if (loadingIndicator) loadingIndicator.classList.remove("active");
  if (!searchTerm) { resultsContainer.innerHTML = ""; return; }

  if (searchTerm.length < 2) {
    resultsContainer.innerHTML = `<div class="live-result-item no-results">Type at least 2 characters to search</div>`;
    return;
  }

  const searchCompact = searchTerm.replace(/\s+/g, "");
  const filteredResults = bhajansDatabase.filter((bhajan) => {
    if (!bhajan.name) return false;
    const nameCompact = bhajan.name.toLowerCase().replace(/\s+/g, "");
    const threshold = Math.ceil(nameCompact.length * 0.4);
    return searchCompact.length >= threshold && nameCompact.includes(searchCompact);
  });

  // Keep only the most recently sung entry per unique bhajan name
  const latestByName = {};
  filteredResults.forEach((bhajan) => {
    const key = bhajan.name.toLowerCase();
    if (!latestByName[key] || bhajan.dateSung > latestByName[key].dateSung) {
      latestByName[key] = bhajan;
    }
  });
  const results = Object.values(latestByName);

  if (results.length === 0) {
    resultsContainer.innerHTML = `<div class="live-result-item no-results">No bhajans found matching "${searchTerm}"</div>`;
    return;
  }

  const hasAudioSet = new Set(bhajanAudios.map((a) => a.date));
  resultsContainer.innerHTML =
    `<div class="search-result-count">${results.length} bhajan${results.length > 1 ? "s" : ""} found</div>` +
    results.map((bhajan) => {
      const hasAudio = hasAudioSet.has(bhajan.dateSung);
      const hasYoutube = !hasAudio && bhajanYoutubeLinks.some((y) => y.date === bhajan.dateSung);
      const rowClick = hasAudio
        ? `playFromNameSearch('${bhajan.dateSung}', '${bhajan.name.replace(/'/g, "\\'")}')`
        : hasYoutube
          ? `openBhajanOnYoutube(event, '${bhajan.dateSung}', ${formatTimeAttr(bhajan.startTime)})`
          : "";
      return `
        <div class="live-result-item ${hasAudio || hasYoutube ? "clickable-row" : ""}" ${rowClick ? `onclick="${rowClick}"` : ""}>
          <div class="name-search-line-1">
            <span class="bhajan-name">${bhajan.name}</span>
            ${hasAudio ? '<span class="has-audio-tag">🎵</span>' : ""}
            ${hasYoutube ? `<button type="button" class="youtube-btn" title="Watch on YouTube" aria-label="Watch on YouTube" onclick="openBhajanOnYoutube(event, '${bhajan.dateSung}', ${formatTimeAttr(bhajan.startTime)})"><svg viewBox="0 0 30 14" width="30" height="14"><rect width="30" height="14" rx="5" fill="#FF0000"/><path d="M12.5 4.3l5.5 2.7-5.5 2.7z" fill="#fff"/></svg></button>` : ""}
          </div>
          <div class="name-search-line-2">
            <span class="detail-badge day-badge day-${bhajan.day.toLowerCase()}">${bhajan.day}</span>
            ${formatShruthiSimple(bhajan.shruthi)}
          </div>
          <div class="name-search-last-sung">
            <span class="last-sung-label">Last sung on</span>
            <span class="last-sung-date">${formatDate(bhajan.dateSung)}</span>
            ${(bhajan.singer || bhajan.singers) ? `<span class="last-sung-by">by <strong>${bhajan.singer || bhajan.singers}</strong></span>` : ""}
          </div>
        </div>
      `;
    }).join("");
}

// ============================================================================
// 5. SINGER FILTER & QUICK SEARCH
// Populates gents/ladies singer dropdowns, filters bhajans by selected singer,
// and builds the singer results list with clickable audio rows.
// ============================================================================

const GENTS_SINGERS = new Set([
  "A.Srinivas", "Abhishek", "Abhiram", "Ankit", "Charan", "Eshwar", "G.Srinivas",
  "Lal", "Ganapathi", "Sai Karthik", "Ramakrishna", "Santosh", "Shantha Krishna",
  "Sharath", "Sharat", "Neeraj", "Sridhar", "Swaroop", "Venu",
  "Abhishek & Swaroop", "Sai Karthik & Abhishek", "Abhishek, Swaroop & Sai Karthik",
].map((s) => s.toLowerCase()));

let currentSingerFilter = null;
let currentSingerResults = [];

function populateSingerDropdown() {
  const gentsSelect = document.getElementById("singerFilterGents");
  const ladiesSelect = document.getElementById("singerFilterLadies");
  if (!gentsSelect || !ladiesSelect) return;

  const allSingers = new Set();
  bhajansDatabase.forEach((bhajan) => {
    if (bhajan.singers && bhajan.singers.trim()) {
      allSingers.add(bhajan.singers.trim());
    } else if (bhajan.singer && bhajan.singer.trim()) {
      bhajan.singer.split(/[&,]/).map((s) => s.trim()).filter(Boolean).forEach((s) => allSingers.add(s));
    }
  });

  Array.from(allSingers)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .forEach((singer) => {
      const option = document.createElement("option");
      option.value = singer;
      option.textContent = singer;
      (GENTS_SINGERS.has(singer.toLowerCase()) ? gentsSelect : ladiesSelect).appendChild(option);
    });
}

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
  showSingerSongs();
}

function filterBhajansBySinger(singerName) {
  return bhajansDatabase
    .filter((bhajan) => {
      if (bhajan.dateSung === "2026-04-24") return false;
      if (bhajan.singers) return bhajan.singers.trim().toLowerCase() === singerName.toLowerCase();
      if (bhajan.singer) {
        return bhajan.singer.split(/[&,]/).map((s) => s.trim().toLowerCase()).includes(singerName.toLowerCase());
      }
      return false;
    })
    .sort((a, b) => (a.dateSung < b.dateSung ? 1 : a.dateSung > b.dateSung ? -1 : 0));
}

function showSingerSongs() {
  document.getElementById("nameSearchResults").innerHTML = "";
  const singerFilter = getSelectedSinger();

  if (singerFilter === "all") {
    const resultsSection = document.getElementById("resultsSection");
    if (resultsSection) resultsSection.style.display = "none";
    currentSingerFilter = null;
    currentSingerResults = [];
    return;
  }

  currentSingerFilter = singerFilter;
  currentSingerResults = filterBhajansBySinger(singerFilter);
  displaySingerResults(currentSingerResults, singerFilter);
}

function quickSearch() {
  document.getElementById("nameSearchResults").innerHTML = "";
  const singerFilter = getSelectedSinger();

  if (singerFilter !== "all") {
    currentSingerFilter = singerFilter;
    currentSingerResults = filterBhajansBySinger(singerFilter);
    displaySingerResults(currentSingerResults, singerFilter);
  } else {
    displayResults(bhajansDatabase, "Quick Search Results");
  }
}

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
      </div>`;
    if (hideBtn) hideBtn.style.display = "none";
    if (closeBtn) closeBtn.style.display = "inline-block";
  } else {
    resultsContainer.innerHTML = `
      <div class="singer-results-header">
        <h3 class="singer-results-title">Songs by ${singerName}</h3>
        <p class="singer-results-subtitle">Click on any song to play</p>
      </div>
      ${results.map((bhajan, index) => {
        const audioEntry = bhajanAudios.find((a) => a.date === bhajan.dateSung);
        const hasAudio = audioEntry && audioEntry.audioFile && bhajan.startTime;
        const hasYoutube = !hasAudio && bhajanYoutubeLinks.some((y) => y.date === bhajan.dateSung);
        const bhajansForDate = bhajansDatabase.filter((b) => b.dateSung === bhajan.dateSung);
        const bhajanIndex = bhajansForDate.findIndex((b) => b.name === bhajan.name);
        const nextWithTime = bhajansForDate.slice(bhajanIndex + 1).find((b) => b.startTime && parseTime(b.startTime) !== null);
        const endTime = nextWithTime ? nextWithTime.startTime : null;
        const rowClick = hasAudio
          ? `playBhajanAudioFromSinger('${bhajan.dateSung}', '${bhajan.name.replace(/'/g, "\\'")}', ${formatTimeAttr(bhajan.startTime)}, ${formatTimeAttr(endTime)})`
          : hasYoutube
            ? `openBhajanOnYoutube(event, '${bhajan.dateSung}', ${formatTimeAttr(bhajan.startTime)})`
            : "";
        return `
          <div class="result-item singer-search-item ${hasAudio || hasYoutube ? "clickable-row has-audio-indicator" : "no-audio-item"}"
               ${rowClick ? `onclick="${rowClick}"` : ""}>
            <div class="singer-result-content">
              <span class="result-number">${index + 1}.</span>
              <div class="singer-result-text">
                <h3 class="result-title">${bhajan.name}</h3>
                ${formatShruthiSimple(bhajan.shruthi)}
              </div>
              ${hasYoutube ? `<button type="button" class="youtube-btn" title="Watch on YouTube" aria-label="Watch on YouTube" onclick="openBhajanOnYoutube(event, '${bhajan.dateSung}', ${formatTimeAttr(bhajan.startTime)})"><svg viewBox="0 0 30 14" width="30" height="14"><rect width="30" height="14" rx="5" fill="#FF0000"/><path d="M12.5 4.3l5.5 2.7-5.5 2.7z" fill="#fff"/></svg></button>` : ""}
              ${hasAudio ? '<span class="audio-play-icon">▶</span>' : ""}
            </div>
          </div>`;
      }).join("")}`;
    if (hideBtn) hideBtn.style.display = "inline-block";
    if (closeBtn) closeBtn.style.display = "inline-block";
  }

  // Build ordered playlist for sequential playback from singer list
  singerPlaylist = results
    .filter((bhajan) => {
      const audioEntry = bhajanAudios.find((a) => a.date === bhajan.dateSung);
      return audioEntry && audioEntry.audioFile && bhajan.startTime;
    })
    .map((bhajan) => {
      const bhajansForDate = bhajansDatabase.filter((b) => b.dateSung === bhajan.dateSung);
      const bIdx = bhajansForDate.findIndex((b) => b.name === bhajan.name);
      const nextWithTime = bhajansForDate.slice(bIdx + 1).find((b) => b.startTime && parseTime(b.startTime) !== null);
      return { dateSung: bhajan.dateSung, name: bhajan.name, startTime: bhajan.startTime, endTime: nextWithTime ? nextWithTime.startTime : null };
    });
  singerPlaylistIndex = -1;

  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function displayResults(results, title) {
  const resultsSection = document.getElementById("resultsSection");
  const resultsContainer = document.getElementById("resultsContainer");

  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="result-item">
        <p class="result-title">No bhajans found</p>
        <p class="result-details">Try adjusting your search criteria</p>
      </div>`;
  } else {
    resultsContainer.innerHTML = results.map((bhajan, index) => `
      <div class="result-item quick-search-item clickable-row" onclick="showAudioHint('${bhajan.dateSung}', '${formatDate(bhajan.dateSung)}')">
        <span class="result-number">${index + 1}.</span>
        <h3 class="result-title">${bhajan.name}</h3>
      </div>`).join("");
  }

  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ============================================================================
// 6. SINGER RESULTS PANEL CONTROLS
// Show, hide, and close the singer results panel. Hide keeps audio playing;
// close stops audio and resets the singer dropdowns.
// ============================================================================

function hideResults() {
  const resultsSection = document.getElementById("resultsSection");
  const floatingShowBtn = document.getElementById("floatingShowSingerBtn");
  if (resultsSection) resultsSection.style.display = "none";
  if (currentSingerFilter && currentSingerResults.length > 0 && floatingShowBtn) {
    floatingShowBtn.style.display = "block";
  }
}

function showSingerResults() {
  const resultsSection = document.getElementById("resultsSection");
  const floatingShowBtn = document.getElementById("floatingShowSingerBtn");

  if (resultsSection && currentSingerFilter && currentSingerResults.length > 0) {
    displaySingerResults(currentSingerResults, currentSingerFilter);
    const audioPlayer = document.getElementById("audioPlayer");
    const hideBtn = document.getElementById("hideResultsBtn");
    const closeBtn = document.querySelector(".close-results-btn");
    if (audioPlayer && audioPlayer.src && !audioPlayer.paused) {
      if (hideBtn) hideBtn.style.display = "inline-block";
      if (closeBtn) closeBtn.style.display = "none";
    }
  }

  if (floatingShowBtn) floatingShowBtn.style.display = "none";
  if (resultsSection) resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeResults() {
  const resultsSection = document.getElementById("resultsSection");
  const floatingShowBtn = document.getElementById("floatingShowSingerBtn");
  const hideBtn = document.getElementById("hideResultsBtn");
  const closeBtn = document.querySelector(".close-results-btn");
  const audioPlayer = document.getElementById("audioPlayer");

  resultsSection.style.display = "none";
  if (floatingShowBtn) floatingShowBtn.style.display = "none";
  if (hideBtn) hideBtn.style.display = "none";
  if (closeBtn) closeBtn.style.display = "inline-block";

  // Stop audio if it was playing from the singer results
  if (audioPlayer && audioPlayer.src && !audioPlayer.paused) {
    if (document.querySelector(".singer-search-item.currently-playing")) stopAudioPlayback();
  }

  currentSingerFilter = null;
  currentSingerResults = [];
  const gents = document.getElementById("singerFilterGents");
  const ladies = document.getElementById("singerFilterLadies");
  if (gents) gents.value = "all";
  if (ladies) ladies.value = "all";
}

// ============================================================================
// 7. DATE SEARCH
// Filters bhajans by a selected date and displays results with day badge
// and festival label if applicable.
// ============================================================================

function searchByDate() {
  document.getElementById("nameSearchResults").innerHTML = "";
  const dateInput = document.getElementById("dateFilter").value;

  if (!dateInput) { alert("Please select a date"); return; }

  displayDateResults(bhajansDatabase.filter((b) => b.dateSung === dateInput), dateInput);
}

// Build a YouTube link for a bhajan's date, jumping to its startTime if known
function buildYoutubeTimestampUrl(baseUrl, startTime) {
  const seconds = parseTime(startTime);
  if (seconds === null) return baseUrl;
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}t=${Math.floor(seconds)}s`;
}

function openBhajanOnYoutube(event, dateSung, startTime) {
  event.stopPropagation();
  const entry = bhajanYoutubeLinks.find((y) => y.date === dateSung);
  if (!entry) return;
  window.open(buildYoutubeTimestampUrl(entry.url, startTime), "_blank", "noopener");
}

function displayDateResults(results, selectedDate) {
  const resultsSection = document.getElementById("resultsSection");
  const resultsContainer = document.getElementById("resultsContainer");

  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="result-item">
        <p class="result-title">No bhajans found</p>
        <p class="result-details">Try selecting a different date</p>
      </div>`;
  } else {
    const dayOfWeek = results[0].day;
    const festivalName = getFestivalName(selectedDate);
    resultsContainer.innerHTML = `
      <div class="date-results-header${festivalName ? " special-occasion-header" : ""}">
        <h3 class="date-results-title">Bhajans on ${formatDate(selectedDate)}</h3>
        <div class="date-results-badges">
          <span class="detail-badge day-badge day-${dayOfWeek.toLowerCase()}">${dayOfWeek}</span>
          ${festivalName ? `<span class="detail-badge festival-badge">${festivalName.replace("Festival - ", "")}</span>` : ""}
        </div>
      </div>` +
      results.map((bhajan, index) => {
        const hasAudio = bhajanAudios.some((a) => a.date === bhajan.dateSung);
        const hasYoutube = !hasAudio && bhajanYoutubeLinks.some((y) => y.date === bhajan.dateSung);
        const rowClick = hasYoutube
          ? `openBhajanOnYoutube(event, '${bhajan.dateSung}', ${formatTimeAttr(bhajan.startTime)})`
          : `showAudioHint('${bhajan.dateSung}', '${formatDate(bhajan.dateSung)}')`;
        return `
        <div class="result-item date-result-item clickable-row" onclick="${rowClick}">
          <div class="result-line-1">
            <span class="result-number">${index + 1}.</span>
            <h3 class="result-title">${bhajan.name}</h3>
            ${hasYoutube ? `<button type="button" class="youtube-btn" title="Watch on YouTube" aria-label="Watch on YouTube" onclick="openBhajanOnYoutube(event, '${bhajan.dateSung}', ${formatTimeAttr(bhajan.startTime)})"><svg viewBox="0 0 30 14" width="30" height="14"><rect width="30" height="14" rx="5" fill="#FF0000"/><path d="M12.5 4.3l5.5 2.7-5.5 2.7z" fill="#fff"/></svg></button>` : ""}
          </div>
          <div class="result-line-2">
            ${(bhajan.singer || bhajan.singers) ? `<span class="date-result-singer">&#9835; ${bhajan.singer || bhajan.singers}</span>` : ""}
            <span class="bhajan-shruthi">${formatShruthiSimple(bhajan.shruthi)}</span>
          </div>
        </div>`;
      }).join("");
  }

  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ============================================================================
// 8. OLD BHAJANS DROPDOWN
// Toggle open/close for the Old Bhajans Collection panel. List items are
// rendered once from oldBhajansCollection (bhajans/oldBhajans.js) on first open.
// ============================================================================

function toggleOldBhajans() {
  const panel = document.getElementById("oldBhajansList");
  const arrow = document.getElementById("oldBhajansArrow");
  const ol = document.getElementById("oldBhajansOl");

  if (panel.style.display === "none") {
    if (ol.children.length === 0) {
      Object.entries(oldBhajansCollection).forEach(([deity, bhajans]) => {
        const section = document.createElement("li");
        section.className = "old-bhajan-deity-section";

        const header = document.createElement("div");
        header.className = "old-bhajan-deity-header";
        header.innerHTML = `
          <span class="old-bhajan-deity-name">${deity}</span>
          <span class="old-bhajan-deity-count">${bhajans.length}</span>
          <span class="old-bhajan-deity-arrow">&#9660;</span>
        `;

        const list = document.createElement("ul");
        list.className = "old-bhajan-sublist";
        bhajans.forEach((name, idx) => {
          const li = document.createElement("li");
          li.className = "old-bhajan-item";
          li.textContent = `${idx + 1}. ${name}`;
          list.appendChild(li);
        });

        header.addEventListener("click", () => {
          const isOpen = section.classList.toggle("open");
          list.style.display = isOpen ? "block" : "none";
        });

        list.style.display = "none";
        section.appendChild(header);
        section.appendChild(list);
        ol.appendChild(section);
      });
    }
    panel.style.display = "block";
    arrow.innerHTML = "&#9650;";
  } else {
    panel.style.display = "none";
    arrow.innerHTML = "&#9660;";
  }
}

// ============================================================================
// 12. SCROLL ANIMATIONS
// Fade-in + slide-up effect for each section as it enters the viewport.
// Observer is defined here so DOMContentLoaded can reference it.
// ============================================================================

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

// ============================================================================
// 13. GLOBAL EVENT LISTENERS & INITIALIZATION
// Sets up click-outside handlers and initializes all components on page load.
// ============================================================================

// Close results and name search when clicking outside their containers
document.addEventListener("click", function (event) {
  const audioHintModal = document.getElementById("audioHintModal");
  if (audioHintModal && audioHintModal.contains(event.target)) return;

  // Close date/quick search results on outside click (not when singer results are active)
  const resultsSection = document.getElementById("resultsSection");
  if (resultsSection && resultsSection.style.display !== "none" && !currentSingerFilter) {
    if (
      !resultsSection.contains(event.target) &&
      !event.target.closest('button[onclick="searchByDate()"]') &&
      !event.target.closest('button[onclick="quickSearch()"]') &&
      event.target.id !== "dateFilter" &&
      !event.target.closest(".quick-search-grid")
    ) {
      closeResults();
    }
  }

  // Close name search live results on outside click
  const nameSearchResults = document.getElementById("nameSearchResults");
  if (nameSearchResults && nameSearchResults.innerHTML !== "") {
    if (!nameSearchResults.contains(event.target) && event.target.id !== "nameSearch") {
      nameSearchResults.innerHTML = "";
    }
  }

  // Close old bhajans panel on outside click
  const wrap = document.querySelector(".old-bhajans-dropdown-wrap");
  const oldPanel = document.getElementById("oldBhajansList");
  const oldArrow = document.getElementById("oldBhajansArrow");
  if (oldPanel && oldPanel.style.display !== "none" && wrap && !wrap.contains(event.target)) {
    oldPanel.style.display = "none";
    oldArrow.innerHTML = "&#9660;";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Enter key triggers name search
  const nameSearchInput = document.getElementById("nameSearch");
  if (nameSearchInput) {
    nameSearchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") searchByName();
    });
  }

  // Restrict date filter range
  const dateFilter = document.getElementById("dateFilter");
  if (dateFilter) {
    dateFilter.setAttribute("min", "2025-01-01");
    dateFilter.setAttribute("max", new Date().toISOString().split("T")[0]);
  }

  // Set up scroll fade-in animations for all sections
  document.querySelectorAll(".search-section, .admin-section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  // Populate dropdowns
  populateSingerDropdown();
});
