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
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "0:24",
    singer: 'Eshwar'
  },
  {
    name: "Man Ek Baar Hari Bol",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "3:56",
    singer: 'Sunitha'
  },
  {
    name: "Premaswaroopini Janani Maa",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "7:58",
    singer: 'A.Srinivas'
  },
  {
    name: "Shiva Shambho(2) Shiva Shambho Mahadeva",
    shruthi: { gents: "2P", ladies: "5½P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "12:45",
    singer: 'Sri & Sai Harshitha'
  },
  {
    name: "Radhe(3) Radhe Govinda",
    shruthi: { gents: "4P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "17:07",
    singer: 'Venu'
  },
  {
    name: "Govinda Nam Bhajo Gopala Naam Bhajo",
    shruthi: { ladies: "6½P " },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "20:44",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Raghuvamsa dhama Rama Ranaranga bheema Rama",
    shruthi: { gents: "2½P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "23:22",
    singer: 'Shantha Krishna'
  },
  {
    name: "Sarva Dharma Swaroopa Sai",
    shruthi: { gents: "5P", ladies: "2½P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "28:52",
    singer: 'Chandini & Harshitha'
  },
  {
    name: "Mana Bangaru Parti Baba",
    shruthi: { gents: "2P", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "33:15",
    singer: 'Sridhar'
  },
  {
    name: "Sai Namame Brahmanandam",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "35:40",
    singer: 'Sunitha'
  },
  {
    name: "Shankara (2) Sadashiva",
    shruthi: { gents: "6P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "38:46",
    singer: 'Ramakrishna'
  },
  {
    name: "Nanda Kishora Narayana",
    shruthi: { gents: "6P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "41:10",
    singer: 'Chandini, Sai Harshitha & Harshitha'
  },
  {
    name: "Yadukula Nandana Sri Hari Madhava",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "43:40",
    singer: 'Eshwar'
  },
  {
    name: "Vittala Vittala Hari Vittala",
    shruthi: { gents: "6P", ladies: "3P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "45:32",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Anandame Sai Bhajana",
    shruthi: { gents: "7P", ladies: "4P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "48:01",
    singer: 'Abhishek'
  },
  {
    name: "Ram(3) parama Sumangala Ram",
    shruthi: { gents: "2½P", ladies: "5½P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "51:33",
    singer: 'Venu'
  },
  {
    name: "Sri Anjaneyam Bhaje Prasannanjaneyam Bhaje",
    shruthi: { gents: "2P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "53:40",
    singer: 'Shantha Krishna'
  },
  {
    name: "Sai Prem Dey Shanti Dey",
    shruthi: { gents: "4½P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-01",
    startTime: "58:30",
    singer: 'A.Srinivas'
  },
  //8th jan 2026
  {
    name: "Gajanana Gajanana (2) Prathama",
    shruthi: { gents: "1½P", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "0:01",
    singer: 'Vathsalya & Sai Shruthi'
  },
  {
    name: "Guru Paada Vandana ShataVandana",
    shruthi: { gents: "3P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "0:28",
    singer: 'A.Srinivas'
  },
  {
    name: "Sangeeta Vani Veena Paani",
    shruthi: { gents: "4½P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "4:02",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Eko Bramha Swaroopa",
    shruthi: { gents: "1P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: '6:49',
    singer: 'Shantha Krishna'
  },
  {
    name: "Ayodhya Vihari Sri Rama(2)",
    shruthi: { gents: "2½P", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "11:46",
    singer: 'Vathsalya & Sai Shruthi'

  },
  {
    name: "Chittha Raja Chitta Raja",
    shruthi: { gents: "5½P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "16:12",
    singer: 'Sai Karthik'
  },
  {
    name: "Bhajaranga Hare Vittala",
    shruthi: { gents: "2½P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "20:27",
    singer: 'Chandini & Praneetha'
  },
  {
    name: "Bolo Bolo Sabmil Bolo Om Namah Shivaya",
    shruthi: { gents: "1½P", ladies: "5½P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "23:36",
    singer: 'Eshwar'
  },
  {
    name: "Shiva(2) Shambho Tandava Priyakara",
    shruthi: { gents: "4½P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "27:42",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Govinda Murari Gopala Murari",
    shruthi: { gents: "1½P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "30:17",
    singer: 'Abhishek'
  },
  {
    name: "Satya Narayana Govinda Madhava",
    shruthi: { gents: "3P", ladies: "5½P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "34:12",
    singer: 'Chandini & Praneetha'
  },
  {
    name: "Sai Ghanashyam (2)",
    shruthi: { gents: "1P", ladies: "4P" },
    day: "Thursday",
    dateSung: "2026-01-08",
    startTime: "38:00",
    singer: 'Ramakrishna'
  },
  //22nd Jan 2026
  {
    name: "Vande Uma Nandanam Gajananam",
    shruthi: { gents: "2P", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "00:00",
    singer: 'Vathsalya & Chandini'
  },
  {
    name: "Sri Charanam Sai Charanam",
    shruthi: { gents: "7P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "2:17",
    singer: 'Shantha Krishna'
  },
  {
    name: "Jai(2) Bhavani Maa Ambe Bhavani Maa",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "5:52",
    singer: 'Yoshitha & Vani'
  },
  {
    name: "Madhusudana Hey Muralidhara",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "8:34",
    singer: 'Ramakrishna'
  },
  {
    name: "Sriram Jayaram Jaya(2) Ram",
    shruthi: { ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "12:51",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Aruna Chala Shiva (3) Arunashiva",
    shruthi: { gents: "2P", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "16:10",
    singer: 'Sai Karthik'
  },
  {
    name: "Govinda Hare Gopala Hare Hey Gopi Gopa Bala",
    shruthi: { gents: "6P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "22:03",
    singer: 'Yoshitha & Vani'
  },
  {
    name: "Jaya Kailashapathe Shiva Shankara",
    shruthi: { gents: "2P", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "26:21",
    singer: 'Abhishek'
  },
  {
    name: "Aatma Jyothi Namo Paramatma Jyothi Namo",
    shruthi: { gents: "6P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "32:02",
    singer: 'Chamundeshwari'
  },
  {
    name: "Hare Murare Sairam Hare Murare Ram",
    shruthi: { gents: "6½P", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "35:24",
    singer: 'A.Srinivas'
  },
  {
    name: "Bhajore Sada Bhajo Ramakrishna Govinda",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-01-22",
    startTime: "39:01",
    singer: 'Vathsalya & Chandini'
  },
  {
    name: "Bhaja Ranga Hare Vittala",
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
    shruthi: { gents: "", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "0:01",
    singer: 'Chandini & Vathsalya'
  },
  {
    name: "Jaya Guru(2) Sairam",
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
    shruthi: { gents: "4P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "17:22",
    singer: 'Sai Karthik'
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
    shruthi: { gents: "2P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "25:46",
    singer: 'Shantha Krishna'
  },
  {
    name: "Sri Rama Jaya Rama Jaya(2) Ram",
    shruthi: { gents: "", ladies: "4P" },
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "29:22",
    singer: 'Chandini & Vathsalya'
  },
  {
    name: "Hari (6) Bolo",
    shruthi: { gents: "3P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "31:44",
    singer: 'Abhishek'
  },
  {
    name: "Narayana Hari(2) Narayana Veda Parayana",
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
    shruthi: { gents: "7P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-02-12",
    startTime: "39:53",
    singer: 'Ramakrishna'
  },
  // 5th March 2026
  {
    name: "Jai Ganesh (3) Deva",
    shruthi: { gents: "7P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "0:01",
    singer: 'Eshwar',
  },
  {
    name: "Gurudeva Priyadeva Saideva Dayamaya",
    shruthi: { gents: "2½P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "3:52",
    singer: 'Sai Karthik'
  },
  {
    name: "Satyaswaroopini Maa",
    shruthi: { gents: "", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "9:36",
    singer: 'Vathsalya & Vani'
  },
  {
    name: "Ravikula Ranjana Ram Sri Rama",
    shruthi: { gents: "1P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "14:39",
    singer: 'Shantha Krishna'
  },
  {
    name: "Govinda Hare Gopala Hare ",
    shruthi: { gents: "2½P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "18:50",
    singer: 'Abhishek'
  },
  {
    name: "Krishna Krishna Govinda Narayana",
    shruthi: { ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "23:50",
    singer: 'Chandini & Harshitha'
  },
  {
    name: "Mahadeva Maheshwara",
    shruthi: { gents: "4P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "26:41",
    singer: 'A.Srinivas'
  },
  {
    name: "Aao Pyaare Nayan Hamare",
    shruthi: { gents: "7P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "33:02",
    singer: 'Santosh'
  },
  {
    name: "Rama(4) Rama Nama tarakam",
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "36:56",
    singers: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Shanakra(2) Sadashiva",
    shruthi: { gents: "6P" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "39:40",
    singer: 'Ramakrishna'
  },
  {
    name: "Ramachandra Raghuveera Ramachandra Ranadheera",
    shruthi: { gents: "7P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-03-05",
    startTime: "41:58",
    singer: 'Abhishek'
  },
  //16th April
    {
    name: "Ganesha Sharanam Parama Pavanam",
    shruthi: { gents: "2P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-04-16",
    startTime: "0:01",
    singer: 'A.Srinivas'
  },
  {
    name: "Jaya Guru(2) Sairam",
    shruthi: { gents: "", ladies: "5.5P" },
    day: "Thursday",
    dateSung: "2026-04-16",
    startTime: "5:08",
    singers: 'Geetha,Jyothi & Eshwari'
  },
   {
    name: "Jagadeshwari Dayakaro Maa",
    shruthi: { gents: "4P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-04-16",
    startTime: "8:34",
    singer: 'Eshwar'
  },
   {
    name: "Bala Gopala(2) Bala Gopala",
    shruthi: { gents: "", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-04-16",
    startTime: "11:27",
    singer: 'Praneetha & Sri'
  },
   {
    name: "Bhajare Rama Charan",
    shruthi: { gents: "1P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-04-16",
    startTime: "17:06",
    singer: 'Santosh'
  },
   {
    name: "Allah Sai Allah Maula Sai Allah",
    shruthi: { gents: "", ladies: "1P" },
    day: "Thursday",
    dateSung: "2026-04-16",
    startTime: "21:27",
    singer: 'Lavanya'
  },
   {
    name: "Vinati Suno Mere Sai Bhagawan",
    shruthi: { gents: "4P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-04-16",
    startTime: "26:35",
    singer: 'Sai Karthik'
  },
   {
    name: "Shailaja Vallabha Shambho Shiva",
    shruthi: { gents: "", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-04-16",
    startTime: "30:10",
    singers: 'Geetha,Jyothi & Eshwari'
  },
   {
    name: "Raksha Raksha Jagadeeshwara",
    shruthi: { gents: "5.5P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-04-16",
    startTime: "33:20",
    singer: 'Ankit'
  },
   {
    name: "Bhajo Mathura Naam Niranthara",
    shruthi: { gents: "", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-04-16",
    startTime: "35:22",
    singer: 'Praneetha & Sri'
  },
   {
    name: "Padmanabha Narayana",
    shruthi: { gents: "1P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-04-16",
    startTime: "38:24",
    singer: 'A.Srinivas'
  },
   {
    name: "Pavanasuta Hanuman ki Jai",
    shruthi: { gents: "", ladies: "6P" },
    day: "Thursday",
    dateSung: "2026-04-16",
    startTime: "40:53",
    singer: 'Lavanya'
  },
  // 14th May 2026
   {
    name: "Matanga Vadana Mampalaya",
    shruthi: { gents: "4P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-14",
    startTime: "0:01",
    singer: 'Sai Karthik'
  },
   {
    name: "Guru Bhagawan Sairam",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-14",
    startTime: "2:37",
    singer: 'Geetha,Jyothi & Eshwari'
  },
   {
    name: "Jai Jai Bhavani Maa",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-14",
    startTime: "5:53",
    singer: 'Sunitha'
  },
   {
    name: "Ayodhya Vihari Sri Rama Rama Rama",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-14",
    startTime: "8:35",
    singer: 'Yoshitha'
  },
   {
    name: "Man Me Mere Gopala Shyama Radhe Nandala",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-14",
    startTime: "13:08",
    singer: 'Neeraj'
  },
   {
    name: "Jaya Jaya Rama Janaki Rama",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-14",
    startTime: "18:07",
    singer: 'Chamundeshwari'
  },
   {
    name: "Hara Shiva Shankara Bholanath",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-14",
    startTime: "21:25",
    singer: 'Geetha,Jyothi & Ishwari'
  },
   {
    name: "Bhajare Manasa Sairam",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-14",
    startTime: "24:55",
    singer: 'Neeraj'
  },
   {
    name: "Sada Nirantara Hari Guna Gao",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-14",
    startTime: "28:24",
    singer: 'Sunitha'
  },
   {
    name: "Sai Narayana Narayana",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-14",
    startTime: "32:00",
    singer: 'Yoshitha'
  },
   {
    name: "Hari Hari Govinda Narayana",
    shruthi: { gents: "5.5P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-14",
    startTime: "34:11",
    singer: 'Sai Karthik'
  },
   {
    name: "Rama Rama Sai Rama",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-14",
    startTime: "37:02",
    singer: 'Geetha,Jyothi & Eshwari'
  },
   {
    name: "Vayukumara Vanara Veera",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-14",
    startTime: "40:19",
    singer: 'Neeraj'
  },
  //21st May 2026
   {
    name: "Baba Aao Mere Keerthan Mein",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-21",
    startTime: "0:01",
    singer: 'sahiti'
  },
   {
    name: "Eshwar Allah Terenam Sai Terenam",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-21",
    startTime: "4:00",
    singer: 'Sridhar'
  },
  {
    name: "Hey madhava Hey Madhusudana",
    day: "Thursday",
    dateSung: "2026-05-21",
    startTime: "7:50",
    singer: 'Yoshitha & Vani'
  },
  {
    name: "Jagatpalana Jaganmohana",
    shruthi: { gents: "2P"},
    day: "Thursday",
    dateSung: "2026-05-21",
    startTime: "11:00",
    singer: 'Sai Karthik'
  },
  {
    name: "Jaya Ho Sairam (2)",
    shruthi: { gents: "", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-05-21",
    startTime: "15:25",
    singer: 'sahiti & Praneetha'
  },
  {
    name: "Bolo Narayana Jai(2) Vittala",
    shruthi: { gents: "", ladies: "7P" },
    day: "Thursday",
    dateSung: "2026-05-21",
    startTime: "22:13",
    singer: 'Chamundeshwari '
  },
  {
    name: "Gangadhara Hara Gangadhara Hara Kailasa natha prabho",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-21",
    startTime: "25:10",
    singer: 'Vathsalya & Sai Shruthi'
  },
  {
    name: "Sharavana Bhavatava Sharanam(2)",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-21",
    startTime: "27:15",
    singer: 'Lal '
  },
  //28th May 2026
  {
    name: "Sharanam Sharanam Pahi Gajanana",
    shruthi: { gents: "4P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-28",
    startTime: "0:01",
    singer: 'Neeraj'
  },
  {
    name: "Budha Mahavir Eshu Sai",
    shruthi: { gents: "", ladies: "5P" },
    day: "Thursday",
    dateSung: "2026-05-28",
    startTime: "4:32",
    singer: 'sahiti'
  },
  {
    name: "Omkaara Bheejaakshari Saishwari",
    shruthi: { gents: "", ladies: "1P" },
    day: "Thursday",
    dateSung: "2026-05-28",
    startTime: "9:06",
    singer: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Raghunandana Raghava Rama Hare",
    shruthi: { gents: "3P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-28",
    startTime: "12:15",
    singer: 'Sai Karthik'
  },
  {
    name: "Mohana Mukunda Hari Giridhara Govinda Hari",
    shruthi: { gents: "", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-28",
    startTime: "17:56",
    singer: 'Praneetha & Vani'
  },
  {
    name: "Sarvadharma Swaroopa Sai",
    shruthi: { gents: "", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-05-28",
    startTime: "22:25",
    singer: 'Sai Harshitha & Yoshitha'
  },
  {
    name: "Gopala Giridhara Bala",
    shruthi: { gents: "4P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-28",
    startTime: "27:08",
    singer: 'Eshwar'
  },
  {
    name: "Keshava Madhava Tumaho Aatma Rama",
    shruthi: { gents: "", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-05-28",
    startTime: "31:08",
    singer: 'Geetha,Jyothi & Eshwari'
  },
  {
    name: "Chandravadana Kamala Nayana",
    shruthi: { gents: "", ladies: "3P" },
    day: "Thursday",
    dateSung: "2026-05-28",
    startTime: "34:28",
    singer: 'Chamundeshwari'
  },
  {
    name: "Shath Baar Kahore Sairam",
    shruthi: { gents: "4P", ladies: "" },
    day: "Thursday",
    dateSung: "2026-05-28",
    startTime: "36:48",
    singer: 'Neeraj'
  },
  {
    name: "Gurunanak jiki Jai Jai Kaar",
    shruthi: { gents: "", ladies: "2P" },
    day: "Thursday",
    dateSung: "2026-05-28",
    startTime: "40:46",
    singer: 'sahiti & Yoshitha'
  },
  {
    name: "Sarvadharma Priya Deva",
    shruthi: { gents: "", ladies: "4P" },
    day: "Thursday",
    dateSung: "2026-05-28",
    startTime: "44:25",
    singer: 'Sai Harshitha & Vani'
  },
  {
    name: "Jai Ganesh(3) Deva",
    day: "Thursday",
    dateSung: "2026-06-04",
    startTime: "0:01",
    singer: 'Sai Harshitha & Vathsalya'
  },
   {
    name: "Sadguru Sairam Jai Bolo Sadguru Sairam",
    day: "Thursday",
    dateSung: "2026-06-04",
    startTime: "4:10",
    singer: 'Lal'
  },
   {
    name: "Jaya Devi Durga gowri Shankari parvati",
    day: "Thursday",
    dateSung: "2026-06-04",
    startTime: "9:00",
    singer: 'Praneetha & Vani'
  },
   {
    name: "Pannaga Sayana Kali Avatara",
    day: "Thursday",
    dateSung: "2026-06-04",
    startTime: "13:58",
    singer: 'A.Srinivas'
  },
   {
    name: "Jaya(2)Rama Jaya Raghurama Dasaratha Nandana",
    day: "Thursday",
    dateSung: "2026-06-04",
    startTime: "19:34",
    singer: 'sahiti'
  },
   {
    name: "Dayakaro Sai Narayana",
    day: "Thursday",
    dateSung: "2026-06-04",
    startTime: "24:08",
    singer: 'Abhishek'
  },
   {
    name: "Radhe Radhe Govinda Gopala Radhe",
    day: "Thursday",
    dateSung: "2026-06-04",
    startTime: "29:43",
    singer: 'Geetha,Jyothi & Eshwari'
  },
   {
    name: "Bhajamana Panduranga Vittala Jai Vittala",
    day: "Thursday",
    dateSung: "2026-06-04",
    startTime: "32:23",
    singer: 'Sai Karthik'
  },
   {
    name: "Kailasa Nathaya Namah Om",
    day: "Thursday",
    dateSung: "2026-06-04",
    startTime: "35:19",
    singer: 'Chamundeshwari'
  },
   {
    name: "Satyam Gnanamanantham Brahma",
    day: "Thursday",
    dateSung: "2026-06-04",
    startTime: "37:50",
    singer: 'Eshwar'
  },
   {
    name: "Nandalala yadu nandalala",
    day: "Thursday",
    dateSung: "2026-06-04",
    startTime: "40:03",
    singer: 'Vathsalya & Nivedita'
  },
   {
    name: "Gopala Sai gopala",
    day: "Thursday",
    dateSung: "2026-06-04",
    startTime: "42:07",
    singer: 'Lal'
  },

];
