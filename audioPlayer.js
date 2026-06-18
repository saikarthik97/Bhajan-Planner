// ============================================================================
// LIVE AUDIO SECTION
// All code below belongs to the "Live Bhajan Audios" section.
// To remove the audio feature entirely:
//   1. Delete this file (audioPlayer.js)
//   2. Remove <script src="audioPlayer.js"> from index.html
//   3. Remove <script src="audios.js"> from index.html
//   4. Remove the audio-section <section> block from index.html
//   5. Remove the audioHintModal <div> from index.html
// ============================================================================

// ----------------------------------------------------------------------------
// STATE VARIABLES
// ----------------------------------------------------------------------------

let singerPlaylist = [];
let singerPlaylistIndex = -1;
let isPlayingFromSingerList = false;
let singerEndTimeTriggered = false;
let currentDateBhajans = [];
let currentPlayingBhajanName = "";

// ----------------------------------------------------------------------------
// AUDIO HINT MODAL
// Called from name-search and date-search result items to show which date
// to select in the audio dropdown to hear a specific bhajan.
// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------
// PLAY FROM NAME SEARCH
// Called when a 🎵-tagged result is tapped in the name-search live results.
// ----------------------------------------------------------------------------

function playFromNameSearch(dateSung, bhajanName) {
  const bhajansForDate = bhajansDatabase.filter((b) => b.dateSung === dateSung);
  const bhajan = bhajansForDate.find((b) => b.name === bhajanName);
  if (!bhajan) return;
  const idx = bhajansForDate.indexOf(bhajan);
  const nextWithTime = bhajansForDate.slice(idx + 1).find((b) => b.startTime && parseTime(b.startTime) !== null);
  isPlayingFromSingerList = false;
  playBhajanAudio(dateSung, bhajanName, bhajan.startTime || null, nextWithTime ? nextWithTime.startTime : null);
}

// ----------------------------------------------------------------------------
// PLAY FROM SINGER LIST
// Called when a singer-result row is tapped; also manages sequential playback
// through the ordered singerPlaylist.
// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------
// AUDIO DATE DROPDOWN
// Populates the native <select> with sorted audio dates (special occasions
// first, then regular sessions) then builds the custom-styled dropdown.
// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------
// LOAD AUDIO
// Called when user picks a date from the dropdown. Fetches the audio file,
// builds the bhajan list for that date, and auto-starts playback.
// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------
// PLAY BHAJAN AUDIO (core)
// Finds the audio file, seeks to startTime, begins playback, and wires up
// the live "now playing" tracker via ontimeupdate.
// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------
// AUDIO BHAJAN LIST CONTROLS
// Controls for showing, hiding, and closing the bhajan list panel inside the
// audio section, and the stop button that halts playback entirely.
// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------
// CUSTOM AUDIO PLAYER CONTROLS
// Seekbar, play/pause toggle, mute toggle, and time display.
// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------
// INITIALIZATION
// Called once the DOM is ready.
// ----------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  initCustomAudioPlayer();
  populateAudioDates();
});
