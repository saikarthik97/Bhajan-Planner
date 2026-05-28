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
  ...shivarathri2026RawData,
  ...ramzan2026RawData,
  ...aaradhana2026RawData,
].map((bhajan, index) => ({ id: index + 1, ...bhajan }));

const festivalDates = {
  "2026-01-14": "Festival - Bhogi",
  "2026-01-15": "Festival - Sankranti",
  "2026-02-15": "Festival - Maha Shivarathri",
  "2026-03-21": "Festival - Ramzan",
  "2026-04-24": "Festival - Aaradhana Mahotsavam",
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
      return `
        <div class="live-result-item ${hasAudio ? "clickable-row" : ""}" ${hasAudio ? `onclick="playFromNameSearch('${bhajan.dateSung}', '${bhajan.name.replace(/'/g, "\\'")}')"` : ""}>
          <div class="name-search-line-1">
            <span class="bhajan-name">${bhajan.name}</span>
            ${hasAudio ? '<span class="has-audio-tag">🎵</span>' : ""}
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

function playFromNameSearch(dateSung, bhajanName) {
  const bhajansForDate = bhajansDatabase.filter((b) => b.dateSung === dateSung);
  const bhajan = bhajansForDate.find((b) => b.name === bhajanName);
  if (!bhajan) return;
  const idx = bhajansForDate.indexOf(bhajan);
  const nextWithTime = bhajansForDate.slice(idx + 1).find((b) => b.startTime && parseTime(b.startTime) !== null);
  isPlayingFromSingerList = false;
  playBhajanAudio(dateSung, bhajanName, bhajan.startTime || null, nextWithTime ? nextWithTime.startTime : null);
}

function showAudioHint(dateSung, formattedDate) {
  const modal = document.getElementById("audioHintModal");
  const message = document.getElementById("audioHintMessage");
  const audioEntry = bhajanAudios.find((audio) => audio.date === dateSung);
  message.innerHTML = audioEntry && audioEntry.audioFile
    ? `To hear this bhajan, choose date <strong>"${formattedDate}"</strong> from the Live Bhajan Audios list.`
    : `No audio file available for this bhajan.`;
  modal.style.display = "flex";
}

function closeAudioHint() {
  document.getElementById("audioHintModal").style.display = "none";
}

// ============================================================================
// 5. SINGER FILTER & QUICK SEARCH
// Populates gents/ladies singer dropdowns, filters bhajans by selected singer,
// and builds the singer results list with clickable audio rows.
// ============================================================================

const GENTS_SINGERS = new Set([
  "A.Srinivas", "Abhishek", "Abhiram", "Ankit", "Charan", "Eshwar", "G.Srinivas",
  "Lal", "Ganapathi", "Sai Karthik", "Ramakrishna", "Santosh", "Shantha Krishna",
  "Sharath", "Neeraj", "Sridhar", "Swaroop", "Venu",
  "Abhishek & Swaroop", "Sai Karthik & Abhishek", "Abhishek, Swaroop & Sai Karthik",
].map((s) => s.toLowerCase()));

let currentSingerFilter = null;
let currentSingerResults = [];
let singerPlaylist = [];
let singerPlaylistIndex = -1;
let isPlayingFromSingerList = false;
let singerEndTimeTriggered = false;

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
  return bhajansDatabase.filter((bhajan) => {
    if (bhajan.dateSung === "2026-04-24") return false;
    if (bhajan.singers) return bhajan.singers.trim().toLowerCase() === singerName.toLowerCase();
    if (bhajan.singer) {
      return bhajan.singer.split(/[&,]/).map((s) => s.trim().toLowerCase()).includes(singerName.toLowerCase());
    }
    return false;
  });
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
        const bhajansForDate = bhajansDatabase.filter((b) => b.dateSung === bhajan.dateSung);
        const bhajanIndex = bhajansForDate.findIndex((b) => b.name === bhajan.name);
        const nextWithTime = bhajansForDate.slice(bhajanIndex + 1).find((b) => b.startTime && parseTime(b.startTime) !== null);
        const endTime = nextWithTime ? nextWithTime.startTime : null;
        return `
          <div class="result-item singer-search-item ${hasAudio ? "clickable-row has-audio-indicator" : "no-audio-item"}"
               ${hasAudio ? `onclick="playBhajanAudioFromSinger('${bhajan.dateSung}', '${bhajan.name.replace(/'/g, "\\'")}', ${formatTimeAttr(bhajan.startTime)}, ${formatTimeAttr(endTime)})"` : ""}>
            <div class="singer-result-content">
              <span class="result-number">${index + 1}.</span>
              <div class="singer-result-text">
                <h3 class="result-title">${bhajan.name}</h3>
                ${formatShruthiSimple(bhajan.shruthi)}
              </div>
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

function playBhajanAudioFromSinger(dateSung, bhajanName, startTime, endTime) {
  isPlayingFromSingerList = true;
  singerEndTimeTriggered = false;
  singerPlaylistIndex = singerPlaylist.findIndex((b) => b.name === bhajanName && b.dateSung === dateSung);
  playBhajanAudio(dateSung, bhajanName, startTime, endTime);
  const hideBtn = document.getElementById("hideResultsBtn");
  const closeBtn = document.querySelector(".close-results-btn");
  if (hideBtn) hideBtn.style.display = "inline-block";
  if (closeBtn) closeBtn.style.display = "none";
}

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
      results.map((bhajan, index) => `
        <div class="result-item date-result-item clickable-row" onclick="showAudioHint('${bhajan.dateSung}', '${formatDate(bhajan.dateSung)}')">
          <div class="result-line-1">
            <span class="result-number">${index + 1}.</span>
            <h3 class="result-title">${bhajan.name}</h3>
          </div>
          <div class="result-line-2">
            <span class="bhajan-shruthi">${formatShruthiSimple(bhajan.shruthi)}</span>
          </div>
        </div>`).join("");
  }

  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ============================================================================
// 8. AUDIO PLAYER
// Handles the audio date dropdown (custom-styled), bhajan list population,
// audio playback with seek-to-timestamp, and live "now playing" tracking.
// ============================================================================

let currentDateBhajans = [];
let currentPlayingBhajanName = "";

function populateAudioDates() {
  const audioDateSelect = document.getElementById("audioDateSelect");
  if (!audioDateSelect || typeof bhajanAudios === "undefined") return;

  audioDateSelect.innerHTML = '<option value="">-- Choose a date --</option>';

  const sortedAudios = [...bhajanAudios].sort((a, b) => new Date(b.date) - new Date(a.date));
  const specialOccasions = sortedAudios.filter((a) => festivalDates[a.date]);
  const regularSessions = sortedAudios.filter((a) => !festivalDates[a.date]);

  function getFestivalIcon(festival) {
    if (festival.includes("Shivarathri") || festival.includes("Shivaratri")) return "🔱 ";
    if (festival.includes("Bhogi")) return "🔥 ";
    if (festival.includes("Sankranti") || festival.includes("Sankranthi")) return "🌾 ";
    if (festival.includes("Ramzan")) return "🌙 ";
    if (festival.includes("Aaradhana")) return "🙏 ";
    return "";
  }

  function makeOption(audio) {
    const option = document.createElement("option");
    option.value = audio.programme ? `${audio.date}|${audio.programme}` : audio.date;
    const festival = festivalDates[audio.date];
    option.textContent = festival
      ? `${getFestivalIcon(festival)}${formatDate(audio.date)} - ${audio.label || festival.replace("Festival - ", "")}`
      : `${formatDate(audio.date)} - ${audio.label || ""}`;
    return option;
  }

  if (specialOccasions.length > 0) {
    const group = document.createElement("optgroup");
    group.label = "✨ SPECIAL OCCASIONS ✨";
    specialOccasions.forEach((a) => group.appendChild(makeOption(a)));
    audioDateSelect.appendChild(group);
  }

  if (regularSessions.length > 0) {
    const group = document.createElement("optgroup");
    group.label = "📅 REGULAR SESSIONS";
    regularSessions.forEach((a) => group.appendChild(makeOption(a)));
    audioDateSelect.appendChild(group);
  }

  buildCustomAudioDropdown();
}

// Builds a fully custom dropdown to replace the native <select> for full CSS control
function buildCustomAudioDropdown() {
  const nativeSelect = document.getElementById("audioDateSelect");
  if (!nativeSelect) return;

  const existing = document.getElementById("customAudioDropdown");
  if (existing) existing.remove();
  const existingPanel = document.getElementById("customAudioPanel");
  if (existingPanel) existingPanel.remove();

  nativeSelect.style.display = "none";

  const wrapper = document.createElement("div");
  wrapper.id = "customAudioDropdown";
  wrapper.className = "custom-audio-select";

  const trigger = document.createElement("div");
  trigger.className = "custom-audio-trigger";
  trigger.innerHTML =
    '<span class="custom-audio-selected-text" id="customAudioSelectedText">-- Choose a date --</span>' +
    '<span class="custom-audio-arrow" id="customAudioArrow">▼</span>';
  wrapper.appendChild(trigger);
  nativeSelect.parentNode.insertBefore(wrapper, nativeSelect.nextSibling);

  // Panel is appended to body to escape any overflow:hidden on .container
  const panel = document.createElement("div");
  panel.className = "custom-audio-panel";
  panel.id = "customAudioPanel";
  document.body.appendChild(panel);

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

  function positionPanel() {
    const rect = trigger.getBoundingClientRect();
    const panelMaxH = 280;
    const spaceBelow = window.innerHeight - rect.bottom - 8;
    const spaceAbove = rect.top - 8;

    panel.style.left = rect.left + "px";
    panel.style.width = rect.width + "px";
    panel.style.maxHeight = panelMaxH + "px";

    if (spaceBelow >= Math.min(panelMaxH, 120) || spaceBelow >= spaceAbove) {
      panel.style.top = rect.bottom + "px";
      panel.style.bottom = "auto";
      panel.style.borderRadius = "0 0 12px 12px";
      panel.style.borderTop = "none";
      panel.style.borderBottom = "2px solid #667eea";
      trigger.style.borderRadius = "12px 12px 0 0";
      trigger.style.borderBottom = "2px solid #667eea";
    } else {
      panel.style.bottom = window.innerHeight - rect.top + "px";
      panel.style.top = "auto";
      panel.style.borderRadius = "12px 12px 0 0";
      panel.style.borderBottom = "none";
      panel.style.borderTop = "2px solid #667eea";
      trigger.style.borderRadius = "0 0 12px 12px";
      trigger.style.borderTop = "2px solid #667eea";
    }
  }

  function openPanel() { positionPanel(); panel.classList.add("open"); wrapper.classList.add("open"); }
  function closePanel() {
    panel.classList.remove("open"); wrapper.classList.remove("open");
    trigger.style.borderRadius = "";
    trigger.style.borderTop = "";
    trigger.style.borderBottom = "";
  }

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    panel.classList.contains("open") ? closePanel() : openPanel();
  });

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

  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target) && !panel.contains(e.target)) closePanel();
  });

  window.addEventListener("scroll", () => { if (panel.classList.contains("open")) positionPanel(); }, true);
  window.addEventListener("resize", () => { if (panel.classList.contains("open")) positionPanel(); });
}

function syncCustomDropdown(value) {
  const panel = document.getElementById("customAudioPanel");
  const selectedText = document.getElementById("customAudioSelectedText");
  if (!panel || !selectedText) return;

  panel.querySelectorAll(".custom-audio-option").forEach((o) => o.classList.remove("selected"));
  if (value) {
    const opt = panel.querySelector(`.custom-audio-option[data-value="${value}"]`);
    if (opt) { selectedText.textContent = opt.textContent; selectedText.classList.add("has-value"); opt.classList.add("selected"); }
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
  const selectedValue = audioDateSelect.value;

  if (!selectedValue) {
    audioPlayerContainer.style.display = "none";
    noAudioMessage.style.display = "none";
    audioBhajanList.style.display = "none";
    if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";
    if (audioPlayer) audioPlayer.pause();
    return;
  }

  audioPlayerContainer.style.display = "none";
  noAudioMessage.style.display = "none";
  if (audioPlayer) audioPlayer.pause();

  const [selectedDate, selectedProgramme] = selectedValue.includes("|")
    ? selectedValue.split("|") : [selectedValue, null];

  const audioEntry = selectedProgramme
    ? bhajanAudios.find((a) => a.date === selectedDate && a.programme === selectedProgramme)
    : bhajanAudios.find((a) => a.date === selectedDate);
  const hasAudio = audioEntry && audioEntry.audioFile;

  const bhajansForDate = bhajansDatabase.filter(
    (b) => b.dateSung === selectedDate && (!selectedProgramme || b.programme === selectedProgramme)
  );

  if (bhajansForDate.length > 0) {
    const dayOfWeek = bhajansForDate[0].day;
    const festivalName = getFestivalName(selectedDate);
    audioBhajanList.innerHTML = `
      <div class="audio-bhajan-list-header${festivalName ? " special-occasion-header" : ""}">
        <div class="audio-bhajan-header-content">
          <h3 class="audio-bhajan-list-title">Bhajans on ${formatDate(selectedDate)}</h3>
          <div class="audio-bhajan-badges">
            <span class="detail-badge day-badge day-${dayOfWeek.toLowerCase()}">${dayOfWeek}</span>
            ${festivalName ? `<span class="detail-badge festival-badge">${festivalName.replace("Festival - ", "")}</span>` : ""}
          </div>
        </div>
        <div class="audio-bhajan-header-buttons">
          <button id="closeAudioListBtn" class="close-audio-list-btn" onclick="closeAudioBhajanList()">Close</button>
          <button id="hideAudioListBtn" class="hide-audio-list-btn" onclick="hideAudioBhajanList()" style="display: none;">Hide</button>
        </div>
      </div>
      <div class="audio-bhajan-items">
        ${bhajansForDate.map((bhajan, index) => {
          const nextBhajan = bhajansForDate[index + 1];
          const endTime = nextBhajan ? nextBhajan.startTime : null;
          return `
            <div class="audio-bhajan-item ${hasAudio ? "has-audio" : "no-audio"}" data-bhajan-name="${bhajan.name.replace(/"/g, "&quot;")}"
                 ${hasAudio ? `onclick="isPlayingFromSingerList=false; playBhajanAudio('${bhajan.dateSung}', '${bhajan.name.replace(/'/g, "\\'")}', ${formatTimeAttr(bhajan.startTime)}, ${formatTimeAttr(endTime)}, '${audioEntry.audioFile.replace(/'/g, "\\'")}')"` : ""}>
              <span class="audio-bhajan-number">${index + 1}.</span>
              <div class="audio-bhajan-content">
                <span class="audio-bhajan-name">${bhajan.name}</span>
                ${(bhajan.singer || bhajan.singers) ? `<span class="audio-bhajan-singer">${bhajan.singer || bhajan.singers}</span>` : ""}
              </div>
              <span class="playing-indicator">
                <span class="playing-bar"></span>
                <span class="playing-bar"></span>
                <span class="playing-bar"></span>
              </span>
            </div>`;
        }).join("")}
      </div>`;

    audioBhajanList.style.display = "block";
    audioBhajanList.classList.toggle("special-occasion-list", !!festivalName);
    if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";

    if (hasAudio) {
      isPlayingFromSingerList = false;
      playBhajanAudio(selectedDate, "All Bhajans", null, null, audioEntry.audioFile);
    }
  } else {
    audioBhajanList.style.display = "none";
    if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";
    if (hasAudio) {
      isPlayingFromSingerList = false;
      playBhajanAudio(selectedDate, "All Bhajans", null, null, audioEntry.audioFile);
    }
  }
}

function playAllBhajans() {
  const audioDateSelect = document.getElementById("audioDateSelect");
  const selectedDate = audioDateSelect.value;
  if (!selectedDate) return;

  const bhajansForDate = bhajansDatabase.filter((b) => b.dateSung === selectedDate);
  if (bhajansForDate.length > 0) {
    isPlayingFromSingerList = false;
    playBhajanAudio(bhajansForDate[0].dateSung, "All Bhajans", null, null);
    const audioSelectionPrompt = document.getElementById("audioSelectionPrompt");
    if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";
  }
}

function playBhajanAudio(dateSung, bhajanName, startTime, endTime, audioFile = null) {
  const endTimeSeconds = parseTime(endTime);
  const audioPlayerContainer = document.getElementById("audioPlayerContainer");
  const audioPlayer = document.getElementById("audioPlayer");
  const audioLabel = document.getElementById("audioLabel");
  const noAudioMessage = document.getElementById("noAudioMessage");
  const audioSection = document.querySelector(".audio-section");
  const audioSelectionPrompt = document.getElementById("audioSelectionPrompt");

  document.querySelectorAll(".audio-bhajan-item.playing").forEach((el) => el.classList.remove("playing"));
  document.querySelectorAll(".singer-search-item.currently-playing").forEach((el) => el.classList.remove("currently-playing"));

  const selectedItem = document.querySelector(`.audio-bhajan-item[data-bhajan-name="${bhajanName.replace(/"/g, "&quot;")}"]`);
  if (selectedItem) selectedItem.classList.add("playing");

  document.querySelectorAll(".singer-search-item").forEach((item) => {
    const title = item.querySelector(".result-title");
    if (title && title.textContent === bhajanName) item.classList.add("currently-playing");
  });

  const startSeconds = parseTime(startTime);
  const audioEntry = audioFile
    ? bhajanAudios.find((a) => a.audioFile === audioFile)
    : bhajanAudios.find((a) => a.date === dateSung);

  if (audioEntry && audioEntry.audioFile) {
    const audioDateSelect = document.getElementById("audioDateSelect");
    if (audioDateSelect) {
      const compositeKey = audioEntry.programme ? `${audioEntry.date}|${audioEntry.programme}` : audioEntry.date;
      audioDateSelect.value = compositeKey;
      syncCustomDropdown(compositeKey);
    }

    currentDateBhajans = bhajansDatabase
      .filter((b) => b.dateSung === dateSung && (!audioEntry.programme || b.programme === audioEntry.programme))
      .map((b) => ({ name: b.name, startTime: parseTime(b.startTime) }))
      .filter((b) => b.startTime !== null);
    currentPlayingBhajanName = bhajanName;

    audioPlayer.src = audioEntry.audioFile;
    audioPlayer.load();
    audioLabel.textContent = bhajanName;
    audioPlayerContainer.style.display = "block";
    noAudioMessage.style.display = "none";
    if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";

    showHideButton();
    showStopAudioButton();
    audioSection.scrollIntoView({ behavior: "smooth", block: "start" });

    audioPlayer.onloadedmetadata = function () {
      if (startSeconds !== null) {
        audioPlayer.currentTime = startSeconds;
        const onSeeked = function () {
          audioPlayer.removeEventListener("seeked", onSeeked);
          audioPlayer.play().catch(() => {});
        };
        audioPlayer.addEventListener("seeked", onSeeked);
      } else {
        audioPlayer.play().catch(() => {});
      }
    };

    audioPlayer.ontimeupdate = function () {
      if (!currentDateBhajans.length) return;
      const currentTime = audioPlayer.currentTime;
      let currentBhajan = null;
      for (let i = currentDateBhajans.length - 1; i >= 0; i--) {
        if (currentTime >= currentDateBhajans[i].startTime) { currentBhajan = currentDateBhajans[i]; break; }
      }
      if (currentBhajan && currentBhajan.name !== currentPlayingBhajanName) {
        currentPlayingBhajanName = currentBhajan.name;
        audioLabel.textContent = currentBhajan.name;
        document.querySelectorAll(".audio-bhajan-item.playing").forEach((el) => el.classList.remove("playing"));
        document.querySelectorAll(".singer-search-item.currently-playing").forEach((el) => el.classList.remove("currently-playing"));
        const nowPlaying = document.querySelector(`.audio-bhajan-item[data-bhajan-name="${currentBhajan.name.replace(/"/g, "&quot;")}"]`);
        if (nowPlaying) nowPlaying.classList.add("playing");
        document.querySelectorAll(".singer-search-item").forEach((item) => {
          const title = item.querySelector(".result-title");
          if (title && title.textContent === currentBhajan.name) item.classList.add("currently-playing");
        });
      }

      if (isPlayingFromSingerList && endTimeSeconds !== null && !singerEndTimeTriggered && currentTime >= endTimeSeconds) {
        singerEndTimeTriggered = true;
        playNextInSingerPlaylist();
      }
    };

    audioPlayer.load();
  } else {
    audioPlayerContainer.style.display = "none";
    noAudioMessage.style.display = "block";
    noAudioMessage.textContent = `No audio available for "${bhajanName}" (${formatDate(dateSung)})`;
    audioSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function skipAudio(seconds) {
  const audioPlayer = document.getElementById("audioPlayer");
  if (audioPlayer && audioPlayer.src) {
    audioPlayer.currentTime = Math.max(0, Math.min(audioPlayer.currentTime + seconds, audioPlayer.duration || Infinity));
  }
}

// ============================================================================
// 9. AUDIO BHAJAN LIST CONTROLS
// Controls for showing, hiding, and closing the bhajan list panel inside the
// audio section, and the stop button that halts playback entirely.
// ============================================================================

function closeAudioBhajanList() {
  const audioBhajanList = document.getElementById("audioBhajanList");
  const audioPlayerContainer = document.getElementById("audioPlayerContainer");
  const audioSelectionPrompt = document.getElementById("audioSelectionPrompt");
  const audioDateSelect = document.getElementById("audioDateSelect");
  const audioPlayer = document.getElementById("audioPlayer");
  const showBhajanListContainer = document.getElementById("showBhajanListContainer");

  audioBhajanList.style.display = "none";
  if (audioPlayerContainer) audioPlayerContainer.style.display = "none";
  if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";
  if (showBhajanListContainer) showBhajanListContainer.style.display = "none";
  if (audioDateSelect) { audioDateSelect.value = ""; syncCustomDropdown(""); }
  if (audioPlayer) audioPlayer.pause();
  hideStopAudioButton();
}

function hideAudioBhajanList() {
  const audioBhajanList = document.getElementById("audioBhajanList");
  const audioSelectionPrompt = document.getElementById("audioSelectionPrompt");
  const showBhajanListContainer = document.getElementById("showBhajanListContainer");

  if (audioBhajanList) audioBhajanList.style.display = "none";
  if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";
  if (showBhajanListContainer) showBhajanListContainer.style.display = "block";
}

function showAudioBhajanList() {
  const audioBhajanList = document.getElementById("audioBhajanList");
  const showBhajanListContainer = document.getElementById("showBhajanListContainer");

  if (audioBhajanList) audioBhajanList.style.display = "block";
  if (showBhajanListContainer) showBhajanListContainer.style.display = "none";

  const audioSection = document.querySelector(".audio-section");
  if (audioSection) audioSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showHideButton() {
  const hideBtn = document.getElementById("hideAudioListBtn");
  const closeBtn = document.getElementById("closeAudioListBtn");
  const showBhajanListContainer = document.getElementById("showBhajanListContainer");

  if (hideBtn) hideBtn.style.display = "inline-block";
  if (closeBtn) closeBtn.style.display = "none";
  if (showBhajanListContainer) showBhajanListContainer.style.display = "none";
}

function hideFloatingShowBtn() {
  const showBhajanListContainer = document.getElementById("showBhajanListContainer");
  if (showBhajanListContainer) showBhajanListContainer.style.display = "none";
}

function showStopAudioButton() {
  const stopAudioContainer = document.getElementById("stopAudioContainer");
  if (stopAudioContainer) stopAudioContainer.style.display = "block";
}

function hideStopAudioButton() {
  const stopAudioContainer = document.getElementById("stopAudioContainer");
  if (stopAudioContainer) stopAudioContainer.style.display = "none";
}

function resetAudioListButtons() {
  const closeBtn = document.getElementById("closeAudioListBtn");
  const hideBtn = document.getElementById("hideAudioListBtn");
  if (closeBtn) closeBtn.style.display = "inline-block";
  if (hideBtn) hideBtn.style.display = "none";
}

function stopAudioPlayback() {
  const audioPlayer = document.getElementById("audioPlayer");
  const audioPlayerContainer = document.getElementById("audioPlayerContainer");
  const audioBhajanList = document.getElementById("audioBhajanList");
  const audioSelectionPrompt = document.getElementById("audioSelectionPrompt");
  const stopAudioContainer = document.getElementById("stopAudioContainer");
  const showBhajanListContainer = document.getElementById("showBhajanListContainer");
  const resultsSection = document.getElementById("resultsSection");
  const floatingShowSingerBtn = document.getElementById("floatingShowSingerBtn");

  if (audioPlayer) { audioPlayer.pause(); audioPlayer.currentTime = 0; }
  if (audioPlayerContainer) audioPlayerContainer.style.display = "none";
  if (audioBhajanList) audioBhajanList.style.display = "none";
  if (audioSelectionPrompt) audioSelectionPrompt.style.display = "none";
  if (stopAudioContainer) stopAudioContainer.style.display = "none";
  if (showBhajanListContainer) showBhajanListContainer.style.display = "none";

  document.querySelectorAll(".audio-bhajan-item.playing").forEach((el) => el.classList.remove("playing"));
  document.querySelectorAll(".singer-search-item.currently-playing").forEach((el) => el.classList.remove("currently-playing"));

  if (currentSingerFilter && currentSingerResults.length > 0 && resultsSection) {
    resultsSection.style.display = "block";
    if (floatingShowSingerBtn) floatingShowSingerBtn.style.display = "none";
    const hideBtn = document.getElementById("hideResultsBtn");
    const closeBtn = document.querySelector(".close-results-btn");
    if (hideBtn) hideBtn.style.display = "none";
    if (closeBtn) closeBtn.style.display = "inline-block";
  }

  resetAudioListButtons();
  currentPlayingBhajanName = "";
  currentDateBhajans = [];
}

// ============================================================================
// 10. CUSTOM AUDIO PLAYER CONTROLS
// Seekbar, play/pause toggle, mute toggle, and time display for the
// custom audio player UI (replaces the native browser audio controls).
// ============================================================================

function setPlayBtnState(playing) {
  const icon = document.getElementById("cpPlayIcon");
  const label = document.getElementById("cpPlayLabel");
  if (icon) icon.innerHTML = playing ? "&#9646;&#9646;" : "&#9654;";
  if (label) label.textContent = playing ? "Pause" : "Play";
}

function togglePlayPause() {
  const audioPlayer = document.getElementById("audioPlayer");
  if (audioPlayer && audioPlayer.src) {
    if (audioPlayer.paused) { audioPlayer.play(); setPlayBtnState(true); }
    else { audioPlayer.pause(); setPlayBtnState(false); }
  }
}

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

function initCustomAudioPlayer() {
  const audioPlayer = document.getElementById("audioPlayer");
  const seekbar = document.getElementById("cpSeekbar");
  const currentTimeEl = document.getElementById("cpCurrentTime");
  const durationEl = document.getElementById("cpDuration");
  if (!audioPlayer || !seekbar) return;

  audioPlayer.addEventListener("timeupdate", function () {
    if (!audioPlayer.duration) return;
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    seekbar.value = progress;
    seekbar.style.setProperty("--cp-progress", `${progress}%`);
    currentTimeEl.textContent = formatMobileTime(audioPlayer.currentTime);
  });

  audioPlayer.addEventListener("loadedmetadata", function () {
    durationEl.textContent = formatMobileTime(audioPlayer.duration);
    seekbar.value = 0;
    seekbar.style.setProperty("--cp-progress", "0%");
    currentTimeEl.textContent = "0:00";
    setPlayBtnState(false);
  });

  seekbar.addEventListener("input", function () {
    if (audioPlayer.duration) {
      audioPlayer.currentTime = (seekbar.value / 100) * audioPlayer.duration;
      seekbar.style.setProperty("--cp-progress", `${seekbar.value}%`);
    }
  });

  audioPlayer.addEventListener("ended", function () {
    setPlayBtnState(false);
    hideFloatingShowBtn();
    hideStopAudioButton();
    resetAudioListButtons();
    if (isPlayingFromSingerList) playNextInSingerPlaylist();
  });

  audioPlayer.addEventListener("pause", () => setPlayBtnState(false));
  audioPlayer.addEventListener("play", () => setPlayBtnState(true));
}

// ============================================================================
// 11. OLD BHAJANS DROPDOWN
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

  // Initialize custom audio player controls
  initCustomAudioPlayer();

  // Set up scroll fade-in animations for all sections
  document.querySelectorAll(".search-section, .admin-section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  // Populate dropdowns
  populateAudioDates();
  populateSingerDropdown();
});
