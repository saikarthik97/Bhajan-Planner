/*
{
  name: "",
  day: "Thursday",
  dateSung: "2026-02-12",
  startTime: "",
  singer: ''
},
*/

const thursdayBhajansRawData = [
  // 1st Jan 2026 - Audio: audios/01st Jan 2026.mp3
  {
    name: "Jai Ganesh (3) Deva",
    deity: "ganesha",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "0:24",
    singer: 'Eshwar'
  },
  {
    name: "Man Ek Baar Hari Bol",
    deity: "narayana",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "3:56",
    singer: 'Sunitha'
  },
  {
    name: "Premaswaroopini Janani Maa",
    deity: "devi",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "7:58",
    singer: 'A.Srinivas'
  },
  {
    name: "Shiva Shambho(2) Shiva Shambho Mahadeva",
    deity: "shiva",
    shruthi: { gents: "2P", ladies: "5½P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "12:45",
    singer: 'Sri & Sai Harshitha'
  },
  {
    name: "Radhe(3) Radhe Govinda",
    deity: "krishna",
    shruthi: { gents: "4P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "17:07",
    singer: 'Venu'
  },
  {
    name: "Govinda Nam Bhajo Gopala Naam Bhajo",
    deity: "srinivasa",
    shruthi: { ladies: "6½P " },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "20:44",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Raghuvamsa dhama Rama Ranaranga bheema Rama",
    deity: "rama",
    shruthi: { gents: "2½P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "23:22",
    singer: 'Shantha Krishna'
  },
  {
    name: "Sarva Dharma Swaroopa Sai",
    deity: "sarvadharma",
    shruthi: { gents: "5P", ladies: "2½P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "28:52",
    singer: 'Chandini & Harshitha'
  },
  {
    name: "Mana Bangaru Parti Baba",
    deity: "sai",
    shruthi: { gents: "2P", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "33:15",
    singer: 'Sridhar'
  },
  {
    name: "Sai Namame Brahmanandam",
    deity: "sai",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "35:40",
    singer: 'Sunitha'
  },
  {
    name: "Shankara (2) Sadashiva",
    deity: "shiva",
    shruthi: { gents: "6P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "38:46",
    singer: 'Ramakrishna'
  },
  {
    name: "Nanda Kishora Narayana",
    deity: "narayana",
    shruthi: { gents: "6P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "41:10",
    singer: 'Chandini, Sai Harshitha & Harshitha'
  },
  {
    name: "Yadukula Nandana Sri Hari Madhava",
    deity: "krishna",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "43:40",
    singer: 'Eshwar'
  },
  {
    name: "Vittala Vittala Hari Vittala",
    deity: "vittala",
    shruthi: { gents: "6P", ladies: "3P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "45:32",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Anandame Sai Bhajana",
    deity: "sai",
    shruthi: { gents: "7P", ladies: "4P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "48:01",
    singer: 'Abhishek'
  },
  {
    name: "Ram(3) parama Sumangala Ram",
    deity: "ram",
    shruthi: { gents: "2½P", ladies: "5½P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "51:33",
    singer: 'Venu'
  },
  {
    name: "Sri Anjaneyam Bhaje Prasannanjaneyam Bhaje",
    deity: "hanuman",
    shruthi: { gents: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "53:40",
    singer: 'Shantha Krishna'
  },
  {
    name: "Sai Prem Dey Shanti Dey",
    deity: "sai",
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
    shruthi: { gents: "1½P", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "0:01",
    singer: 'Vathsalya & Shruthi'
  },
  {
    name: "Guru Paada Vandana ShataVandana",
    deity: "guru",
    shruthi: { gents: "3P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "0:28",
    singer: 'A.Srinivas'
  },
  {
    name: "Sangeeta Vani Veena Paani",
    deity: "devi",
    shruthi: { gents: "4½P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "4:02",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Eko Bramha Swaroopa",
    deity: "sarvadharma",
    shruthi: { gents: "1P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: '6:49',
    singer: 'Shantha Krishna'
  },
  {
    name: "Ayodhya Vihari Sri Rama(2)",
    deity: "rama",
    shruthi: { gents: "2½P", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "11:46",
    singer: 'Vathsalya & Shruthi'

  },
  {
    name: "Chittha Raja Chitta Raja",
    deity: "sai",
    shruthi: { gents: "5½P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "16:12",
    singer: 'Karthik'
  },
  {
    name: "Bhajaranga Hare Vittala",
    deity: "vittala",
    shruthi: { gents: "2½P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "20:27",
    singer: 'Chandini & Praneetha'
  },
  {
    name: "Bolo Bolo Sabmil Bolo Om Namah Shivaya",
    deity: "shiva",
    shruthi: { gents: "1½P", ladies: "5½P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "23:36",
    singer: 'Eshwar'
  },
  {
    name: "Shiva(2) Shambho Tandava Priyakara",
    deity: "shiva",
    shruthi: { gents: "4½P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "27:42",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Govinda Murari Gopala Murari",
    deity: "vittala",
    shruthi: { gents: "1½P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "30:17",
    singer: 'Abhishek'
  },
  {
    name: "Satya Narayana Govinda Madhava",
    deity: "narayana",
    shruthi: { gents: "3P", ladies: "5½P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "34:12",
    singer: 'Chandini & Praneetha'
  },
  {
    name: "Sai Ghanashyam (2)",
    deity: "krishna",
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
    shruthi: { gents: "2P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "00:00",
    singer: 'Vathsalya & Chandini'
  },
  {
    name: "Sri Charanam Sai Charanam",
    deity: "sai",
    shruthi: { gents: "7P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "2:17",
    singer: 'Shantha Krishna'
  },
  {
    name: "Jai(2) Bhavani Maa Ambe Bhavani Maa",
    deity: "devi",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "5:52",
    singer: 'Yoshitha & Vani'
  },
  {
    name: "Madhusudana Hey Muralidhara",
    deity: "krishna",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "8:34",
    singer: 'Ramakrishna'
  },
  {
    name: "Sriram Jayaram Jaya(2) Ram",
    deity: "rama",
    shruthi: { ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "12:51",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Aruna Chala Shiva (3) Arunashiva",
    deity: "shiva",
    shruthi: { gents: "2P", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "16:10",
    singer: 'Karthik'
  },
  {
    name: "Govinda Hare Gopala Hare Hey Gopi Gopa Bala",
    deity: "srinivasa",
    shruthi: { gents: "6P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "22:03",
    singer: 'Yoshitha & Vani'
  },
  {
    name: "Jaya Kailashapathe Shiva Shankara",
    deity: "shiva",
    shruthi: { gents: "2P", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "26:21",
    singer: 'Abhishek'
  },
  {
    name: "Aatma Jyothi Namo Paramatma Jyothi Namo",
    deity: "sai",
    shruthi: { gents: "6P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "32:02",
    singer: 'Chamundeshwari'
  },
  {
    name: "Hare Murare Sairam Hare Murare Ram",
    deity: "sarvadharma",
    shruthi: { gents: "6½P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "35:24",
    singer: 'A.Srinivas'
  },
  {
    name: "Bhajore Sada Bhajo Ramakrishna Govinda",
    deity: "",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "39:01",
    singer: 'Vathsalya & Chandini'
  },
  {
    name: "Bhaja Ranga Hare Vittala",
    deity: "vittala",
    shruthi: { gents: "3P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "41:12",
    singer: 'Charan'
  },
  //5th Feb 2026
  {
    name: "Gajavadana Gananatha Gajavadana Vinayaka",
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "0:01",
    singer: 'Chandini'
  },
  {
    name: "Narayan(2) Bhajamana Narayan",
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "3:36",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Jai (2) Janani Sai Janani Ambe Bhavani Maa",
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "7:29",
    singer: 'Abhishek'
  },
  {
    name: "Govinda Rama Jai(2) Gopala Rama",
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "12:52",
    singer: 'Chandini'
  },
  {
    name: "Panduranga Vittala Jai Pandarinatha Vittala",
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "15:38",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Lingodhbhavakara Lingeshwara",
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "19:08",
    singer: 'Ramakrishna'
  },
  {
    name: "Ramakrishna Tumaho Jayaram Jayaram",
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "20:58",
    singer: 'Abhishek'
  },
  {
    name: "Hey Sai Jagannatha",
    day: "Thursday",
    dateSung: "2026-02-05",
    startTime: "25:34",
    singer: 'Chandini'
  },
  //12th Feb 2026
  {
    name: "Matanga Vadana Maam palaya",
    deity: "ganesha",
    shruthi: { gents: "", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "0:01",
    singer: 'Chandini & Vathsalya'
  },
  {
    name: "Jaya Guru(2) Sairam",
    deity: "guru",
    shruthi: { gents: "2P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "2:32",
    singer: 'Ramakrishna'
  },
  {
    name: "Durga Amba Bhavani Jai (2)",
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "6:02",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Rama Chandra Sriram",
    deity: "rama",
    shruthi: { gents: "3P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "9:02",
    singer: 'A.Srinivas'
  },
  {
    name: "Rahiman(2) Ram Rahim",
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "14:01",
    singer: 'Vani & Yoshitha'
  },
  {
    name: "Murali Manohara Shyama Murari",
    deity: "krishna",
    shruthi: { gents: "4P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "17:22",
    singer: 'Karthik'
  },
  {
    name: "Deena Bandho Vittala Jai",
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "21:24",
    singer: 'Praneetha & Vani'
  },
  {
    name: "Hara Hara Shankara Sai",
    deity: "shiva",
    shruthi: { gents: "2P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "25:46",
    singer: 'Shantha Krishna'
  },
  {
    name: "Sri Rama Jaya Rama Jaya(2) Ram",
    deity: "rama",
    shruthi: { gents: "", ladies: "4P" },
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "29:22",
    singer: 'Chandini & Vathsalya'
  },
  {
    name: "Hari (6) Bolo",
    deity: "narayana",
    shruthi: { gents: "3P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "31:44",
    singer: 'Abhishek'
  },
  {
    name: "Narayana Hari(2) Narayana Veda Parayana",
    deity: "narayana",
    shruthi: { gents: "7P", ladies: "4P" },
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "35:12",
    singer: 'Praneetha, Vani & Yoshitha'
  },
  {
    name: "Jai(3) Manamohana Jai(3) Madhusudana",
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "37:42",
    singer: 'Eshwar'
  },
  {
    name: "Bhashma Vibhushitha Bhavani Shankara",
    deity: "shiva",
    shruthi: { gents: "7P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "39:53",
    singer: 'Ramakrishna'
  },
  // 5th March 2026
  {
    name: "Jai Ganesh (3) Deva",
    deity: "ganesha",
    shruthi: { gents: "7P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "0:00",
    singer: 'Eshwar',
  },
  {
    name: "Gurudeva Priyadeva Saideva Dayamaya",
    deity: "guru",
    shruthi: { gents: "2½P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "",
    singer: 'Karthik'
  },
  {
    name: "Satyaswaroopini Maa",
    deity: "devi",
    shruthi: { gents: "", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "",
    singer: 'Vathsalya & Chandini'
  },
  {
    name: "Ravikula Ranjana Ram Sri Rama",
    deity: "rama",
    shruthi: { gents: "1P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "",
    singer: 'Shantha Krishna'
  },
  {
    name: "Govinda Hare Gopala Hare ",
    deity: "sai",
    shruthi: { gents: "2½P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "",
    singer: 'Abhishek'
  },
  {
    name: "Krishna Krishna Govinda Narayana",
    deity: "krishna",
    shruthi: { ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "",
    singer: 'Chandini and Harshitha'
  },
  {
    name: "Mahadeva Maheshwara",
    deity: "sarvadharma",
    shruthi: { gents: "4P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "",
    singer: 'A.Srinivas'
  },
  {
    name: "Aao Pyaare Nayan Hamare",
    deity: "sai",
    shruthi: { gents: "7P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "",
    singer: 'Santosh'
  },
  {
    name: "Rama(4) Rama Nama tarakam",
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Shanakra(2) Sadashiva",
    deity: "shiva",
    shruthi: { gents: "6P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "",
    singer: 'Ramakrishna'
  },
  {
    name: "Ramachandra Raghuveera Ramachandra Ranadheera",
    deity: "rama",
    shruthi: { gents: "7P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "",
    singer: 'Abhishek'
  },
  //   {
  //   name: "",
  //   deity: "",
  //   shruthi: { gents: "", ladies: "" },
  //   day: "",
  //   dateSung: "",
  //   startTime: "",
  //   singer: ''
  // }
];
