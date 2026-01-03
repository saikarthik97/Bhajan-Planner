// Bhajan Database
// Add bhajans in the format below:
// {
//     id: <unique number>,
//     name: "Bhajan Name",
//     deity: "ganesha|guru|devi|eshwaramba|sai|sarvadharma|vittala|rama|dattatreya|krishna|narayana|shiva|srinivasa|hanuman|subramanya",
//     beat: 6 or 7,
//     speed: "slow|medium|mediumfast|fast|third",
//     shruthi: "1.5M" (shruti value like 1M, 1.5M, 2M, 2.5M, 1P, 1.5P, 2P, etc.),
//     dateSung: "YYYY-MM-DD" or "Never"
// }

const bhajansDatabase = [
    {
        id: 1,
        name: "Jaya Ganesh (3) Deva",
        deity: "ganesha",
        beat: 8,
        speed: "medium",
        shruthi: { gents: "5P", ladies: "2P" },
        dateSung: "2026-01-01"
    },
    {
        id: 2,
        name: "Man Ek Baar Hari Bol",
        deity: "narayana",
        beat: 8,
        speed: "slow",
        shruthi: "2P",
        dateSung: "2026-01-01"
    },
    {
        id: 3,
        name: "Premaswaroopini Janani Maa",
        deity: "devi",
        beat: 8,
        speed: "slow",
        shruthi: { gents: "2P", ladies: "6P" },
        dateSung: "2026-01-01"
    },
    {
        id: 4,
        name: "Shiva Shambho(2) Shiva Shambho Mahadeva",
        deity: "shiva",
        beat: 8,
        speed: "slow",
        shruthi: { gents: "2P", ladies: "5.5P" },
        dateSung: "2026-01-01"
    },
    {
        id: 5,
        name: "Radhe Radhe Nanda Mukunda",
        deity: "krishna",
        beat: 8,
        speed: "slow",
        shruthi: { gents: "4P"},
        dateSung: "2026-01-01"
    },
    {
        id: 6,
        name: "Govinda Nam Bhajo Gopala Naam Bhajo",
        deity: "srinivasa",
        beat: 8,
        speed: "medium",
        shruthi: { ladies:"6.5P " },
        dateSung: "2026-01-01"
    },
    {
        id: 7,
        name: "Raghuvamsa dhama Rama Ranaranga bheema Rama",
        deity: "rama",
        beat: 6,
        speed: "slow",
        shruthi: "2.5P",
        dateSung: "2026-01-01"
    },
    {
        id: 8,
        name: "Sarva Dharma Swaroopa Sai",
        deity: "sarvadharma",
        beat: 8,
        speed: "medium",
        shruthi: {gents: "5P",ladies : "2.5P" },
        dateSung: "2026-01-01"
    },
    {
        id: 9,
        name: "Mana Bangaru Parti Baba",
        deity: "sai",
        beat: 8,
        speed: "speed",
        shruthi: {gents :"2P", ladies: "5P"},
        dateSung: "2026-01-01"
    },
    {
        id: 10,
        name: "Sai Namame Brahmanandam",
        deity: "sai",
        beat: 8,
        speed: "medium",
        shruthi: {gents :"5P", ladies: "2P"},
        dateSung: "2026-01-01"
    },
    {
        id: 11,
        name: "Shankara (2) Sadashiva",
        deity: "shiva",
        beat: 8,
        speed: "fast",
        shruthi: {gents:"6P",ladies: "2P"},
        dateSung: "2026-01-01"
    },
    {
        id: 12,
        name: "Nanda Kishora Narayana",
        deity: "narayana",
        beat: 8,
        speed: "fast",
        shruthi: {gents:"6P",ladies: "2P"},
        dateSung: "2026-01-01"
    },
    {
        id: 13,
        name: "Yadukula Nandana Sri Hari Madhava",
        deity: "krishna",
        beat: 8,
        speed: "fast",
        shruthi: {gents:"1P",ladies: "5P"},
        dateSung: "2026-01-01"
    },
    {
        id: 14,
        name: "Vittala Vittala Hari Vittala",
        deity: "vittala",
        beat: 8,
        speed: "fast",
        shruthi: {gents:"6P",ladies: "3P"},
        dateSung: "2026-01-01"
    },
    {
        id: 15,
        name: "Anandame Sai Bhajana",
        deity: "sai",
        beat: 8,
        speed: "fast",
        shruthi: { gents:"7P", ladies: "4P"},
        dateSung: "2026-01-01" 
    },
    {
        id: 16,
        name: "Ram(3) parama Sumangala Ram",
        deity: "ram",
        beat: 8,
        speed: "fast",
        shruthi: {gents:"2.5P",ladies: "5.P"},
        dateSung: "2026-01-01"
    },
    {
        id: 17,
        name: "Sri Anjaneyam Bhaje Prasannanjaneyam Bhaje",
        deity: "hanuman",
        beat: 8,
        speed: "fast",
        shruthi: { gents:"2P"},
        dateSung: "2026-01-01"
    },
      {
        id: 18,
        name: "Sai Prem Dey Shanti Dey",
        deity: "sai",
        beat: 8,
        speed: "slow",
        shruthi: {gents:"4.5P",ladies: "7P"},
        dateSung: "2026-01-01"
    },




    // Add more bhajans below this line
    // Copy the format above and paste, updating the id, name, deity, beat, speed, shruthi, and dateSung
];
