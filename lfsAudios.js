// LFS-hosted audio files (GitHub Media)
// These 5 dates could not be hosted on Cloudinary (file size >100MB)
// Files live in lfs-audios/ and are served via GitHub LFS media URLs
const lfsAudios = [
  { date: '2025-10-19', audioFile: "https://media.githubusercontent.com/media/saikarthik97/Bhajan-Planner/psk/lfs-audios/19th%20october.mp3", label: "Sunday Bhajans" },
  { date: '2026-03-22', audioFile: "https://media.githubusercontent.com/media/saikarthik97/Bhajan-Planner/psk/lfs-audios/22%20Mar%202026.mp3", label: "Sunday Bhajans" },
  { date: '2026-05-24', audioFile: "https://media.githubusercontent.com/media/saikarthik97/Bhajan-Planner/psk/lfs-audios/24th%20may%202026.mp3", label: "Sunday Bhajans" },
  { date: '2026-06-11', audioFile: "https://media.githubusercontent.com/media/saikarthik97/Bhajan-Planner/psk/lfs-audios/11th%20June%202026.mp3", label: "Thursday Bhajans" },
  { date: '2026-06-14', audioFile: "https://media.githubusercontent.com/media/saikarthik97/Bhajan-Planner/psk/lfs-audios/14th%20June%202026.mp3", label: "Sunday Bhajans" },
];

// Merge into the main bhajanAudios array (loaded from audios.js before this file)
lfsAudios.forEach(entry => bhajanAudios.push(entry));
