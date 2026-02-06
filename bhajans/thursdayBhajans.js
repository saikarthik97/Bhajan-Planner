  /*
  {
    name: "",
    deity: "",
    speed: "",
    shruthi: { gents: "", ladies: "" },
    day: "",
    dateSung: "",
    startTime: "",
    singer: ''
  },
  */

const thursdayBhajansRawData = [
  // 1st Jan 2026 - Audio: audios/01st Jan 2026.mp3
  {
    name: "Jai Ganesh (3) Deva",
    deity: "ganesha",
    speed: "slow",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "0:24",
    singer: 'Eshwar'
  },
  {
    name: "Man Ek Baar Hari Bol",
    deity: "narayana",
    speed: "slow",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "3:56",
    singer: 'Sunitha'
  },
  {
    name: "Premaswaroopini Janani Maa",
    deity: "devi",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "7:58",
    singer: 'A.Srinivas'
  },
  {
    name: "Shiva Shambho(2) Shiva Shambho Mahadeva",
    deity: "shiva",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "5½P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "12:45",
    singer:'Sri & Sai Harshitha'
  },
  {
    name: "Radhe(3) Radhe Govinda",
    deity: "krishna",
    speed: "slow",
    shruthi: { gents: "4P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "17:07",
    singer: 'Venu'
  },
  {
    name: "Govinda Nam Bhajo Gopala Naam Bhajo",
    deity: "srinivasa",
    speed: "medium",
    shruthi: { ladies: "6½P " },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "20:44",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Raghuvamsa dhama Rama Ranaranga bheema Rama",
    deity: "rama",
    speed: "slow",
    shruthi: { gents: "2½P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "23:22",
    singer: 'Shantha Krishna'
  },
  {
    name: "Sarva Dharma Swaroopa Sai",
    deity: "sarvadharma",
    speed: "fast",
    shruthi: { gents: "5P", ladies: "2½P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "28:52",
    singer:'Chandini & Harshitha' 
  },
  {
    name: "Mana Bangaru Parti Baba",
    deity: "sai",
    speed: "fast",
    shruthi: { gents: "2P", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "33:15",
    singer: 'Sridhar'
  },
  {
    name: "Sai Namame Brahmanandam",
    deity: "sai",
    speed: "medium",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "35:40",
    singer: 'Sunitha'
  },
  {
    name: "Shankara (2) Sadashiva",
    deity: "shiva",
    speed: "fast",
    shruthi: { gents: "6P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "38:46",
    singer: 'Ramakrishna'
  },
  {
    name: "Nanda Kishora Narayana",
    deity: "narayana",
    speed: "fast",
    shruthi: { gents: "6P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "41:10",
    singer:'Chandini, Sai Harshitha & Harshitha'
  },
  {
    name: "Yadukula Nandana Sri Hari Madhava",
    deity: "krishna",
    speed: "fast",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "43:40",
    singer: 'Eshwar'
  },
  {
    name: "Vittala Vittala Hari Vittala",
    deity: "vittala",
    speed: "fast",
    shruthi: { gents: "6P", ladies: "3P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "45:32",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Anandame Sai Bhajana",
    deity: "sai",
    speed: "fast",
    shruthi: { gents: "7P", ladies: "4P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "48:01",
    singer: 'Abhishek'
  },
  {
    name: "Ram(3) parama Sumangala Ram",
    deity: "ram",
    speed: "fast",
    shruthi: { gents: "2½P", ladies: "5½P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "51:33",
    singer: 'Venu'
  },
  {
    name: "Sri Anjaneyam Bhaje Prasannanjaneyam Bhaje",
    deity: "hanuman",
    speed: "fast",
    shruthi: { gents: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "53:40",
    singer: 'Shantha Krishna'
  },
  {
    name: "Sai Prem Dey Shanti Dey",
    deity: "sai",
    speed: "slow",
    shruthi: { gents: "4½P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "58:30",
    singer: 'A.Srinivas'
  },
  //8th jan 2026
  {
    name: "Gajanana Gajanana (2) Prathama",
    deity: "ganesha",
    speed: "slow",
    shruthi: { gents: "1½P", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "0:01",
    singer:'Vathsalya & Shruthi'
  },
  {
    name: "Guru Paada Vandana ShataVandana",
    deity: "guru",
    speed: "slow",
    shruthi: { gents: "3P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "0:28",
    singer: 'A.Srinivas'
  },
  {
    name: "Sangeeta Vani Veena Paani",
    deity: "devi",
    speed: "slow",
    shruthi: { gents: "4½P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "4:02",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Eko Bramha Swaroopa",
    deity: "sarvadharma",
    speed: "slow",
    shruthi: { gents: "1P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: '6:49',
    singer: 'Shantha Krishna'
  },
  {
    name: "Ayodhya Vihari Sri Rama(2)",
    deity: "rama",
    speed: "medium",
    shruthi: { gents: "2½P", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "11:46",
    singer:'Vathsalya & Shruthi'

  },
  {
    name: "Chittha Raja Chitta Raja",
    deity: "sai",
    speed: "slow",
    shruthi: { gents: "5½P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "16:12",
    singer: 'Karthik'
  },
  {
    name: "Bhajaranga Hare Vittala",
    deity: "vittala",
    speed: "fast",
    shruthi: { gents: "2½P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "20:27",
    singer:'Chandini & Praneetha'
  },
  {
    name: "Bolo Bolo Sabmil Bolo Om Namah Shivaya",
    deity: "shiva",
    speed: "fast",
    shruthi: { gents: "1½P", ladies: "5½P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "23:36",
    singer: 'Eshwar'
  },
  {
    name: "Shiva(2) Shambho Tandava Priyakara",
    deity: "shiva",
    speed: "medium",
    shruthi: { gents: "4½P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "27:42",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Govinda Murari Gopala Murari",
    deity: "vittala",
    speed: "slow",
    shruthi: { gents: "1½P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "30:17",
    singer: 'Abhishek'
  },
  {
    name: "Satya Narayana Govinda Madhava",
    deity: "narayana",
    speed: "fast",
    shruthi: { gents: "3P", ladies: "5½P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "34:12",
    singer:'Chandini & Praneetha'
  },
  {
    name: "Sai Ghanashyam (2)",
    deity: "krishna",
    speed: "fast",
    shruthi: { gents: "1P", ladies: "4P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "38:00",
    singer: 'Ramakrishna'
  },
//22nd Jan 2026
{
    name: "Vande Uma Nandanam Gajananam",
    deity: "ganesha",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "7P" },
     day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "00:00",
    singer: 'Vathsalya & Chandini'
},
{
    name: "Sri Charanam Sai Charanam",
    deity: "sai",
    speed: "slow",
    shruthi: { gents: "7P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "2:17",
    singer: 'Shantha Krishna'
},
{
    name: "Jai(2) Bhavani Maa Ambe Bhavani Maa",
    deity: "devi",
    speed: "medium",
    shruthi: { gents: "2P", ladies: "6P" },
     day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "5:52",
    singer: 'Yoshitha & Vani'
},
{
    name: "Madhusudana Hey Muralidhara",
    deity: "krishna",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "6P" },
     day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "8:34",
    singer: 'Ramakrishna'
},
{
    name: "Sriram Jayaram Jaya(2) Ram",
    deity: "rama",
    speed: "medium",
    shruthi: { ladies: "6P" },
     day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "12:51",
    singers: 'Geetha,Jyothi & Eshwari'
},
{
    name: "Aruna Chala Shiva (3) Arunashiva",
    deity: "shiva",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "16:10",
    singer: 'Karthik'
},
{
    name: "Govinda Hare Gopala Hare Hey Gopi Gopa Bala",
    deity: "srinivasa",
    speed: "fast",
    shruthi: { gents: "6P", ladies: "2P" },
     day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "22:03",
    singer: 'Yoshitha & Vani'
},
{
    name: "Jaya Kailashapathe Shiva Shankara",
    deity: "shiva",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "5P" },
     day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "26:21",
    singer: 'Abhishek'
},
{
    name: "Aatma Jyothi Namo Paramatma Jyothi Namo",
    deity: "sai",
    speed: "speed",
    shruthi: { gents: "6P", ladies: "2P" },
     day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "32:02",
    singer: 'Chamundeshwari'
},
{
    name: "Hare Murare Sairam Hare Murare Ram",
    deity: "sarvadharma",
    speed: "fast",
    shruthi: { gents: "6½P", ladies: "2P" },
     day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "35:24",
    singer: 'A.Srinivas'
},
{
    name: "Bhajore Sada Bhajo Ramakrishna Govinda",
    deity: "",
    speed: "fast",
    shruthi: { gents: "1P", ladies: "5P" },
     day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "39:01",
    singer: 'Vathsalya & Chandini'
},
{
    name: "Bhaja Ranga Hare Vittala",
    deity: "vittala",
    speed: "fast",
    shruthi: { gents: "3P", ladies: "7P" },
     day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "41:12",
    singer: 'Charan'
},
//5th Feb 2026
  {
    name: "Gajavadana Gananatha Gajavadana Vinayaka",
    deity: "ganesha",
    speed: "medium",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "0:01",
    singer: 'Chandini'
  },
    {
    name: "Narayan(2) Bhajamana Narayan",
    deity: "narayana",
    speed: "fast",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "3:36",
    singers: 'Geetha,Jyothi & Eshwari'
  },
    {
    name: "Jai (2) Janani Sai Janani Ambe Bhavani Maa",
    deity: "devi",
    speed: "medium",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "7:29",
    singer: 'Abhishek'
  },
    {
    name: "Govinda Rama Jai(2) Gopala Rama",
    deity: "rama",
    speed: "fast",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "12:52",
    singer: 'Chandini'
  },
    {
    name: "Panduranga Vittala Jai Pandarinatha Vittala",
    deity: "vittala",
    speed: "fast",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "15:38",
    singers: 'Geetha,Jyothi & Eshwari'
  },
    {
    name: "Lingodhbhavakara Lingeshwara",
    deity: "shiva",
    speed: "fast",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "19:08",
    singer: 'Ramakrishna'
  },
    {
    name: "Ramakrishna Tumaho Jayaram Jayaram",
    deity: "sarvadharma",
    speed: "fast",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "20:58",
    singer: 'Abhishek'
  },
    {
    name: "Hey Sai Jagannatha",
    deity: "sai",
    speed: "fast",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "25:34",
    singer: 'Chandini'
  },

];
