/*
    name: "",
    day: "",
    dateSung: "",
    startTime: "",
    singer: ''
  },*/

const sundayBhajansRawData = [
  // 28th Dec 2025 - Audio: audios/28th December.mp3
  {
    name: "Gajanana Hey Shubhanana Parama Niranjana Gajavadana",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "0:30",
    singer: "Lal",
  },
  {
    name: "Karunakaro Sai Dev",
    shruthi: { ladies: "6½P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "4:30",
    singer: "Sunitha",
  },
  {
    name: "Jaya Maa Ananda Mayi Janani",
    shruthi: { gents: "2P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "8:32",
    singer: "A.Srinivas",
  },
  {
    name: "Govinda Madhava Gopala Keshava (Jaya Nanda Mukunda)",
    shruthi: { gents: "2P", ladies: "5½P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "12:50",
    singer: "Lavanya",
  },
  {
    name: "Ravikula Ranjana Rama Sri Rama",
    shruthi: { gents: "2P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "18:36",
    singer: "Shantha Krishna",
  },
  {
    name: "Namo Namo Nataraja Namo",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "23:15",
    singer: "Gayathri",
  },
  {
    name: "Radheshyama Hey Ghanashyama",
    shruthi: { gents: "4P", ladies: "1P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "27:36",
    singer: "G.Srinivas",
  },
  {
    name: "Satya Dharma Shanti Prema Swaroopa Prashanthi Nilaya Deva",
    shruthi: { gents: "3P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "32:30",
    singer: "Vani & Praneetha",
  },
  {
    name: "Hey Ayodhya Vasi Ram(2) Dasaratha Nandana Ram",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "36:47",
    singer: "Sridhar",
  },
  {
    name: "Subha Aur Shyam Bol Hari Naam",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "40:42",
    singer: "Vathsalya & Sai Shruthi & Harshitha",
  },
  {
    name: "Manamohana Krishna Kunja Vihari",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "43:08",
    singer: "Swaroop",
  },
  // 30th Nov 2025 - Audio: audios/30th+Nov+2025.mp3
  {
    name: "Lambodara Hey Gowri Nandana",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "0:00",
    singer: "Sai Karthik",
  },
  {
    name: "Satya Dharma Shanti prema Sabko Deejo",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "3:09",
    singer: "Vathsalya & Chandini & Yoshitha",
  },
  {
    name: "Maata Maheshwari Tribhuvani Janani",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "6:03",
    singer: "A.Srinivas",
  },
  {
    name: "Sita Rama Sri Raghurama",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "10:21",
    singer: "Sunitha",
  },
  {
    name: "Ghana Ghana Neela Vadana Ati Sundara",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "14:20",
    singer: "Sharat",
  },
  {
    name: "Yuga Yuga Ke Avataara Tum Hi Ho",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "18:27",
    singer: "sahiti",
  },
  {
    name: "Tum ho Shankara Daata Sai Shankara",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "22:57",
    singer: "Abhishek",
  },
  {
    name: "Manuva Bolo Radhe(3) Shyama Naam",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "26:20",
    singer: "Eshwar",
  },
  {
    name: "Jaya Jaya Mangala Sai Namo",
    shruthi: { gents: "4P", ladies: "1P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "30:11",
    singer: "Sridhar",
  },
  {
    name: "Bhajo Mathura Hari Naam Nirantara",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "32:48",
    singer: "Vathsalya & Chandini & Yoshitha",
  },
  {
    name: "Nandalala(2) Nanda Mukunda Hari Nandalala",
    shruthi: { gents: "7P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "35:58",
    singer: "Sharat",
  },
  {
    name: "Aao Pyaare Nayan Hamare ",
    shruthi: { gents: "6½P", ladies: "4½P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "38:04",
    singer: "sahiti",
  },
  {
    name: "Sharanu Ghosha Priyaney Ayyappa",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "42:00",
    singer: "G.Srinivas",
  },
  // 4th Jan 2026 - Audio: audios/4th Jan 2026.mp3
  {
    name: "Prathama Sharana Gananayaka",
    shruthi: { gents: "1½P", ladies: "5½P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "0:29",
    singer: "Lavanya",
  },
  {
    name: "Jaya Guru Omkara Sadguru Omkaara",
    shruthi: { gents: "2P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "3:32",
    singer: "A.Srinivas",
  },
  {
    name: "Jaya Maa Hey Sai Maa",
    shruthi: { ladies: "5P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "7:46",
    singer: "Sunitha",
  },
  {
    name: "Narayana Hari Narayana",
    shruthi: { gents: "2½P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "12:31",
    singer: "Abhishek",
  },
  {
    name: "Murali Krishna mukunda krishna",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "19:05",
    singers: "Geetha,Jyothi & Eshwari",
  },
  {
    name: "Srirama Bhadra Sri rama chandra Sri Rama Jaya Sri Ram",
    shruthi: { gents: "1P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "22:52",
    singer: "Shantha Krishna",
  },
  {
    name: "Hari Om Namah Shivaya",
    shruthi: { gents: "4P", ladies: "1P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "28:02",
    singer: "Lavanya",
  },
  {
    name: "Jai(3) Manamohana Jai(3) Madhusudana",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "31:51",
    singer: "Eshwar",
  },
  {
    name: "Sitaram Nama Bhajo",
    shruthi: { gents: "7P", ladies: "4P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "34:07",
    singer: "Harshitha & Sri",
  },
  {
    name: "Shiva(2) Shambho hara(2) Shambho Sai Shambho Shankara ",
    shruthi: { gents: "3P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "36:10",
    // singers:'Rajesh'
  },
  {
    name: "Seeta Rakshaka Rama Doota",
    shruthi: { gents: "7P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "39:20",
    singer: "Sunitha",
  },
  {
    name: "Sri Ranga Hare Vittala Sai Ranga hare vittala",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "41:22",
    singer: "Venu",
  },
  //19th Oct 2025
  {
    name: "Neela Greeva Kumara",
    shruthi: { gents: "4P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "01:36",
    singer: "G.Srinivas",
  },
  {
    name: "Jaya Guru Shankara Girija Ramana",
    shruthi: { ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "04:19",
    singer: "Lavanya",
  },
  {
    name: "Janani Sai Devi Dayamayi",
    shruthi: { gents: "2½P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "07:25",
    singer: "Venu",
  },
  {
    name: "Ajanubahum Aravinda Netram",
    shruthi: { gents: "1½P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "10:55",
    singer: "Chandini & Harshitha",
  },
  {
    name: "Chaitanya Mayi Sai",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "14:36",
    singer: "Lal",
  },
  {
    name: "Govinda Sai Krishna Govinda(2)",
    shruthi: { gents: "1½P", ladies: "5½P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "20:32",
    singer: "Vani & Yoshitha",
  },
  {
    name: "Madhura(2) hey Muralidhari",
    shruthi: { gents: "1½P", ladies: "5½P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "23:33",
    singer: "Sridhar",
  },
  {
    name: "Rama hare Sai Krishna Hare Sarvadharma Priya",
    shruthi: { gents: "2½P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "26:13",
    singer: "Sai Harshitha & Ravali",
  },
  {
    name: "Jaya(2) Rama Jaya Raghurama",
    shruthi: { gents: "2P", ladies: "5½P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "29:55",
    singer: "A.Srinivas",
  },
  {
    name: "Panduranga Vittala Jai Pandarinatha Vittala",
    shruthi: { gents: "4P", ladies: "1P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "33:55",
    singers: "Geetha,Jyothi & Eshwari",
  },
  {
    name: "Shambho Murarey Shankara Murarey",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "37:13",
    singer: "Eshwar",
  },
  {
    name: "Rama Lakshmana Janaki Jai Bolo Hanuman Ki",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "39:28",
    singer: "Lavanya",
  },
  {
    name: "Meeru Meghalaya Mayurasana",
    shruthi: { gents: "5P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "43:06",
    singer: "G.Srinivas",
  },
  //31st August 2025
  {
    name: "Sri Ganapati Hari Om",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "0:00",
    singer: "A.Srinivas",
  },
  {
    name: "Sri Sai Natha Guru Govinda",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "4:31",
    singer: "Vathsalya & Sai Shruthi",
  },
  {
    name: "Devi Bhavani Jagat Janani",
    shruthi: { gents: "1½P", ladies: "5½P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "6:54",
    singer: "Sridhar",
  },
  {
    name: "Jaya Jaya Shankara Kailaasa Vaasi",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "10:35",
    singer: "Lavanya",
  },
  {
    name: "Madhuvana Sanchari Shyama Murari",
    shruthi: { gents: "6P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "14:42",
    singer: "Abhishek",
  },
  {
    name: "Jaya(2) Mangala Sai Namo",
    shruthi: { gents: "4P", ladies: "1P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "18:16",
    singer: "Vani & Vathsalya",
  },
  {
    name: "Shiva(2) Shankara Hara Parameshwara",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "20:58",
    singer: "Venu",
  },
  {
    name: "Hari Narayana Govinda Jaya Narayana Gopala",
    shruthi: { gents: "6P", ladies: "3P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "24:24",
    singers: "Geetha,Jyothi & Eshwari",
  },
  {
    name: "Sri Rama Paratparara Ram Hey Rajeeva Lochana Ram",
    shruthi: { gents: "5P", ladies: "7P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "26:24",
    singer: "Eshwar",
  },
  {
    name: "Bhavasagara Se Paar Uthaaro",
    shruthi: { gents: "1½P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "30:03",
    singer: "Lavanya",
  },
  {
    name: "Sai Natha Bhagawaan",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "34:21",
    singer: "Venu",
  },
  {
    name: "Vittala Vittala Sai Narayana",
    shruthi: { gents: "6½P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "38:26",
    singer: "Abhishek",
  },
  //21st September 2025 Add
  {
    name: "Namami Nityam Smarami Nityam Gajavadanam",
    day: "Sunday",
    shruthi: { gents: "4P", ladies: "1P" },
    dateSung: "2025-09-21",
    startTime: "0:00",
    singer: "Vathsalya & Sai Shruthi",
  },
  {
    name: "Aruna Ramana Sri Gurudeva",
    shruthi: { gents: "1½P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "2:18",
    singer: "A.Srinivas",
  },
  {
    name: "Durga Amba Bhavani Jai Jai",
    shruthi: { gents: "2½P", ladies: "6½P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "7:18",
  },
  {
    name: "Kausalya Nandana Vaidehi Mohana",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "9:56",
    singer: "Lal",
  },
  {
    name: "Kamala Nayana Narayana",
    shruthi: { gents: "7P", ladies: "4½P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "14:32",
    singer: "Sunitha",
  },
  {
    name: "Satya Dharma Shanti Prema Swaroopa Prashanthi Nilaya Deva",
    shruthi: { gents: "4P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "16:49",
    singer: "Sai Karthik",
  },
  {
    name: "Atma Ram Aananda Ram",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "21:22",
    singers: "Geetha,Jyothi & Eshwari",
  },
  {
    name: "Madhava Madhusudana Muralidhara Mohana",
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "24:10",
    singer: "Venu",
  },
  {
    name: "Ganga Jatadhara Gowri Shankara Girija Mano Ramana",
    shruthi: { gents: "5½P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "26:22",
    singer: "Sai Harshitha & Ravali",
  },
  {
    name: "Hari Narayana Govinda Jaya Narayana Gopala",
    shruthi: { gents: "6P", ladies: "3P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "30:22",
    singer: "Eshwar",
  },
  {
    name: "Manamohana Nandalaal",
    shruthi: { gents: "4P", ladies: "1P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "32:32",
    singer: "Surekha & Praneetha",
  },
  {
    name: "Vaheguru(3)Ji Bolo",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "35:53",
    singer: "Abhishek",
  },
  {
    name: "Hey Rama Doota Hey Rama Bhakta",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "40:24",
    singer: "Yoshitha & Vani",
  },
  {
    name: "Om Shivaaya Shivaaya",
    shruthi: { gents: "7P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "43:15",
    singer: "Lavanya",
  },
  //11th January 2026
  {
    name: "Gajamukha Gajamukha",
    shruthi: { gents: "2P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "0:00",
    singer: "Abhiram",
  },
  {
    name: "Karunya Roopa Sri Sai Deva",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "3:13",
    singer: "Lavanya",
  },
  {
    name: "Jaya Devi Bhavani Maa",
    shruthi: { gents: "1½P", ladies: "5½P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "6:39",
    singer: "G.Srinivas",
  },
  {
    name: "Allah Sai Allah Maula Sai Maula",
    shruthi: { gents: "2½P", ladies: "6½P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "11:40",
    singer: "Gayathri",
  },
  {
    name: "Kodanda Rama Kalyana Rama",
    shruthi: { gents: "1½P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "16:26",
    singer: "Shantha Krishna",
  },
  {
    name: "Panduranga(3) Vittala",
    shruthi: { ladies: "6P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "20:20",
    singers: "Geetha,Jyothi & Eshwari",
  },
  {
    name: "Ram(2) Bhajamana Hare Hare",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "23:40",
    singer: "Sridhar",
  },
  {
    name: "Sarvatra Govinda Namasankeerthana Govinda Haro Govinda",
    shruthi: { gents: "7P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "26:49",
    singer: "Vathsalya & Chandini",
  },
  {
    name: "Nandalala(2) Nanda Mukunda Hari Nandalala",
    shruthi: { gents: "1½P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "29:51",
    singer: "Abhishek",
  },
  {
    name: "Jai Hari Bol Jai Sitaram",
    shruthi: { gents: "7P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "31:52",
    singer: "Vani & Praneetha",
  },
  {
    name: "Vanamali Vasudeva Jaganmohana Radha Ramana",
    shruthi: { gents: "6P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "35:36",
    singer: "Abhiram",
  },
  {
    name: "Shambho Shankara Parvati Ramana Pasupati Paramesha",
    shruthi: { gents: "1P", ladies: "5½P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "39:20",
    singer: "Sowmya & Sri Vidya",
  },
  {
    name: "Rama Lakshmana Janaki Jai Bolo Hanuman Ki",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "41:39",
    singer: "Swaroop",
  },
  //18th Jan 2026
  {
    name: "Parvati Nandana Gajanana",
    shruthi: { gents: "5½P", ladies: "" },
    day: "sunday",
    dateSung: "2026-01-18",
    startTime: "0:00",
    singer: "Abhishek",
  },
  {
    name: "Gurudeva Priyadeva Saideva Dayamaya",
    shruthi: { gents: "7", ladies: "" },
    day: "sunday",
    dateSung: "2026-01-18",
    startTime: "3:32",
    singer: "Gayathri",
  },
  {
    name: "Devi Sai Maa Devi Saraswati Maa",
    shruthi: { gents: "1", ladies: "" },
    day: "sunday",
    dateSung: "2026-01-18",
    startTime: "8:52",
    singer: "Sridhar",
  },
  {
    name: "Govinda Bolo Gopala Bolo",
    shruthi: { gents: "2½P", ladies: "" },
    day: "sunday",
    dateSung: "2026-01-18",
    startTime: "12:45",
    singer: "A.Srinivas",
  },
  {
    name: "Tumaho Ram Tumaho Shyam",
    shruthi: { gents: "7½P", ladies: "" },
    day: "sunday",
    dateSung: "2026-01-18",
    startTime: "17:32",
    singer: "Sai Shruthi & Vathsalya",
  },
  {
    name: "Jaya Jaya Ram Jagadabhi Ram",
    shruthi: { gents: "2", ladies: "" },
    day: "sunday",
    dateSung: "2026-01-18",
    startTime: "20:45",
    singer: "Ganapathi",
  },
  {
    name: "Hey Partipurisha Prashanthi Vaasa Sai Murari",
    shruthi: { gents: "1½P", ladies: "" },
    day: "sunday",
    dateSung: "2026-01-18",
    startTime: "25:57",
    singer: "Sai Karthik",
  },
  {
    name: "Kodanda Rama Raghava Jaya Kalyana Krishna Keshava",
    shruthi: { gents: "6", ladies: "" },
    day: "sunday",
    dateSung: "2026-01-18",
    startTime: "30:32",
    singer: "Chandini & Praneetha",
  },
  {
    name: "Hey Govinda Hey Ananda Nanda Gopala",
    shruthi: { gents: "2½P", ladies: "" },
    day: "sunday",
    dateSung: "2026-01-18",
    startTime: "34:38",
    singer: "Charan",
  },
  {
    name: "Rama Jai Jai Ram Sai Ram Jai Jai Ram",
    shruthi: { gents: "1½P", ladies: "" },
    day: "sunday",
    dateSung: "2026-01-18",
    startTime: "36:56",
    singer: "G.Srinivas",
  },
  {
    name: "Arunachala Shiva Shiva Shankara SambaShiva",
    shruthi: { gents: "4", ladies: "" },
    day: "sunday",
    dateSung: "2026-01-18",
    startTime: "40:17",
    singer: "Shantha Krishna",
  },
  {
    name: "Narayana Hari Nama Bhajore Narayana Veda Parayana",
    shruthi: { gents: "1½P", ladies: "" },
    day: "sunday",
    dateSung: "2026-01-18",
    startTime: "44:06",
    singer: "G.Srinivas",
  },
  //1st February 2026
  {
    name: "Amba Bhavani Shiva Shambhu Kumara",
    shruthi: { gents: "2P", ladies: "5P" },
    day: "sunday",
    dateSung: "2026-02-01",
    startTime: "0:01",
    singer: "Lal",
  },
  {
    name: "Guru Dhyaaye Guru Dhyaaye",
    shruthi: { ladies: "3P" },
    day: "sunday",
    dateSung: "2026-02-01",
    startTime: "2:13",
    singer: "Sunitha",
  },
  {
    name: "Devi Bhavani Maa Satya Sai Bhavani Maa",
    shruthi: { gents: "2½ P" },
    day: "sunday",
    dateSung: "2026-02-01",
    startTime: "4:08",
    singer: "Sai Karthik",
  },
  {
    name: "Hey Deena Dayala Sai Rama Ram",
    shruthi: { gents: "2P", ladies: "7P" },
    day: "sunday ",
    dateSung: "2026-02-01",
    startTime: "8:00",
    singer: "Praneetha & Vani",
  },
  {
    name: "Nache Tribhanga Krishna Murari",
    shruthi: { gents: "4P" },
    day: "sunday",
    dateSung: "2026-02-01",
    startTime: "11:20",
    singer: "Venu",
  },
  {
    name: "Shiva(4) Shiridipurishwara Shambho Shankara",
    shruthi: { gents: "6P", ladies: "3P" },
    day: "sunday",
    dateSung: "2026-02-01",
    startTime: "13:46",
    singer: "Chandini, Sri & Sai Harshitha",
  },
  {
    name: "Giridhari Murari Govinda",
    shruthi: { gents: "4P" },
    day: "sunday",
    dateSung: "2026-02-01",
    startTime: "18:08",
    singer: "Sridhar",
  },
  {
    name: "Raghupathe Sri Ramachandra Raghava Dayanidhe",
    shruthi: { gents: "3P", ladies: "6P" },
    day: "sunday",
    dateSung: "2026-02-01",
    startTime: "20:44",
    singer: "Abhishek",
  },
  {
    name: "Madhuvana Murali Shyama Murari",
    shruthi: { gents: "2P" },
    day: "sunday",
    dateSung: "2026-02-01",
    startTime: "23:30",
    singer: "A.Srinivas",
  },
  {
    name: "Jayaho Nataraj",
    shruthi: { gents: "1½ P", ladies: "5P" },
    day: "sunday",
    dateSung: "2026-02-01",
    startTime: "26:39",
    singer: "G.Srinivas",
  },
  {
    name: "Sarvadharma Priya Deva",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "sunday",
    dateSung: "2026-02-01",
    startTime: "29:20",
    singer: "Shantha Krishna",
  },
  {
    name: "Jaya Nandalala Jai Jai Gopala",
    shruthi: { gents: "4P" },
    day: "sunday",
    dateSung: "2026-02-01",
    startTime: "32:00",
    singer: "Lal",
  },
  {
    name: "Rama Sai(2) Rama Sai Rama Sai Ram",
    shruthi: { gents: "1½", ladies: "5P" },
    day: "sunday",
    dateSung: "2026-02-01",
    startTime: "33:55",
    singer: "Eshwar",
  },
  {
    name: "Hari Narayana Govinda Jaya Narayana Gopala",
    shruthi: { gents: "6P", ladies: "3P" },
    day: "sunday",
    dateSung: "2026-02-01",
    startTime: "38:02",
    singers: "Geetha,Jyothi & Eshwari",
  },
  // 1st March 2026
  {
    name: "Jaya Sri Ganesha Vigna Nasha Gajanana",
    shruthi: { gents: "2P" },
    day: "Sunday",
    dateSung: "2026-03-01",
    startTime: "0:01",
    singer: "A.Srinivas",
  },
  {
    name: "Hare Sai(2) Sai Sai Hare(2)",
    day: "Sunday",
    dateSung: "2026-03-01",
    startTime: "4:30",
    singer: "Harshitha & Chandini",
  },
  {
    name: "Jaya Jaya Shankari Jaya Parameshwari",
    shruthi: { gents: "6P" },
    day: "Sunday",
    dateSung: "2026-03-01",
    startTime: "8:15",
    singer: "Sai Karthik",
  },
  {
    name: "Sri Sai Padam Shiva Sai Padam",
    day: "Sunday",
    dateSung: "2026-03-01",
    startTime: "12:47",
    singer: "Lavanya",
  },
  {
    name: "Manuva Bolo Radhe(4) Shyama Shyam",
    shruthi: { gents: "5P" },
    day: "Sunday",
    dateSung: "2026-03-01",
    startTime: "17:22",
    singer: "Charan",
  },
  {
    name: "Dasaratha Nandana Rama Dayasagara Rama",
    shruthi: { ladies: "6P" },
    day: "Sunday",
    dateSung: "2026-03-01",
    startTime: "21:30",
    singer: "Praneetha & Chandini",
  },
  {
    name: "Neelakanta Mahadeva Gowri Vandana",
    shruthi: { gents: "5P", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-01",
    startTime: "25:56",
    singer: "Eshwar",
  },
  {
    name: "Mohana mukunda hari Giridhara Govinda hari",
    day: "Sunday",
    dateSung: "2026-03-01",
    startTime: "28:17",
    singer: "Gayathri",
  },
  {
    name: "Sai Rama Hey Parandhama",
    day: "Sunday",
    dateSung: "2026-03-01",
    startTime: "32:10",
    singer: "G.Srinivas",
  },
  {
    name: "Krishna(2) Mukunda Janardhana ",
    day: "Sunday",
    dateSung: "2026-03-01",
    startTime: "37:25",
    singer: "Yoshitha & Sai Shruthi",
  },
  {
    name: "Manamohana Muraligopala",
    day: "Sunday",
    dateSung: "2026-03-01",
    startTime: "39:28",
    singer: "Lal",
  },
  {
    name: "Shyama Komala Krishna Murari",
    day: "Sunday",
    dateSung: "2026-03-01",
    startTime: "41:42",
    singers: "Gayathri & Lavanya",
  },
  //8 mar 2026
  {
    name: "Parvati Tanaya Vighna Vinashaka",
    deity: "ganesha",
    speed: "slow",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-08",
    startTime: "0:01",
    singer: 'A.Srinivas'
  },
  {
    name: "Hari Om Namo Shiva Shakthi Namo",
    deity: "guru",
    speed: "medium",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-08",
    startTime: "5:08",
    singer: 'Vathsalya & Sai Harshitha'
  }, {
    name: "Jagadhodharini Mata Durga ",
    deity: "devi",
    speed: "slow",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-08",
    startTime: "8:08",
    singer: 'G.Srinivas'
  }, {
    name: "Sai narayana (2) Mangala Naam",
    deity: "sai",
    speed: "medium",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-08",
    startTime: "12:22",
    singer: 'Yoshitha & Vani'
  }, {
    name: "Antaryaami Sai",
    deity: "krishna",
    speed: "slow",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-08",
    startTime: "16:00",
    singer: 'Abhishek'
  }, {
    name: "Shiridi Sai parti sai Humko Deejo",
    deity: "sai",
    speed: "medium",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-08",
    startTime: "21:48",
    singer: 'Chandini & Harshitha'
  }, {
    name: "Gopala giridhara Baala",
    deity: "krishna",
    speed: "slow",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-08",
    startTime: "26:32",
    singer: 'Eshwar'
  }, {
    name: "Jaya ho Sairam(2)",
    deity: "sarvadharma",
    speed: "speed",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-08",
    startTime: "30:09",
    singer: 'Praneetha & Vani'
  }, {
    name: "Hari Om Namah Shivaya ",
    deity: "shiva",
    speed: "speed",
    shruthi: { gents: "6P", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-08",
    startTime: "35:18",
    singer: 'Charan'
  }, {
    name: "Ram (2) Bhajaman Hare Hare",
    deity: "rama",
    speed: "speed",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-08",
    startTime: "37:50",
    singers: 'Geetha,Jyothi & Eshwari'
  }, {
    name: "Vittala Narayana",
    deity: "vittala",
    speed: "speed",
    shruthi: { gents: "", ladies: "6P" },
    day: "Sunday",
    dateSung: "2026-03-08",
    startTime: "40:21",
    singer: 'Lavanya'
  },
  // 22 march 2206
  {
    name: "Jai (3) Gananayaka",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-22",
    startTime: "0:05",
    singer: "Lavanya"
  },
  {
    name: "Gurudev (2) Satya sai Natha sadguru Dev",
    shruthi: { gents: "2P", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-22",
    startTime: "4:22",
    singer: "Lal"
  },
  {
    name: "Triloka Palini Jagadeeshwari",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-22",
    startTime: "8:35",
    singers: "Geetha,Jyothi & Eshwari"
  },
  {
    name: "Jaya Jaya Govinda Narayana",
    shruthi: { gents: "1½ P", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-22",
    startTime: "11:23",
    singer: "Sai Karthik"
  },
  {
    name: "Neela Megha Shyama Krishna",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-22",
    startTime: "15:53",
    singer: "Sai Harshitha & Sri"
  },
  {
    name: "Veera Dheera Shoora Hanuman Ki Jai",
    shruthi: { gents: "2P", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-22",
    startTime: "19:38",
    singer: "Sridhar"
  },
  {
    name: "Eshwaramba Priya Nandana",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-22",
    startTime: "23:35",
    singer: "Chandini & Praneetha"
  },
  {
    name: "Hari Nam Gathe Chalo",
    shruthi: { gents: "4P", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-22",
    startTime: "28:22",
    singer: "Santosh"
  },
  {
    name: "Beda Paar karo mere sai",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-22",
    startTime: "33:15",
    singer: "Lavanya"
  },
  {
    name: "Namami Brahma Namami Vishnu",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-22",
    startTime: "36:52",
    singer: "Lal"
  },
  {
    name: "Sri Rama Charanam (3) Bhaje",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-22",
    startTime: "39:20",
    singer: "G.Srinivas"
  },
  {
    name: "Meeru Meghalaya Mayurasana",
    shruthi: { gents: "5P", ladies: "" },
    day: "Sunday",
    dateSung: "2026-03-22",
    startTime: "45:31",
    singer: "Sai Karthik"
  },
  //5th apr 2026
  {
    name: "Maha Ganapathe Gajanana",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-04-05",
    startTime: "0:01",
    singer: 'Lavanya'
  },
  {
    name: "Gurudeva(3) Sharanam",
    shruthi: { gents: "2P" },
    day: "Sunday",
    dateSung: "2026-04-05",
    startTime: "3:32",
    singer: 'A.Srinivas'
  },
  {
    name: "Devi Lakshmi Mam Paahi",
    shruthi: { ladies: "7P" },
    day: "Sunday",
    dateSung: "2026-04-05",
    startTime: "7:33",
    singer: 'Sri Vidya'
  },
  {
    name: "Govinda Gopala Jaya",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-04-05",
    startTime: "10:08",
    singer: 'Abhishek'
  },
  {
    name: "Aananda Maya Bhagawan",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-04-05",
    startTime: "15:06",
    singer: ''
  },
  {
    name: "Satya Sai Rama Shiva Shakthi Roopa",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-04-05",
    startTime: "19:35",
    singer: 'Lal'
  },
  {
    name: "Nanda Kishora navaneetha Chora",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-04-05",
    startTime: "23:15",
    singer: 'Sowmya'
  },
  {
    name: "Allah Eshwar Tumaho",
    shruthi: { gents: "2P", ladies: "" },
    day: "Sunday",
    dateSung: "2026-04-05",
    startTime: "25:48",
    singer: 'Sai Karthik'
  },
  {
    name: "Dhimitha Dhim(2) Nache Bhola Naam",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-04-05",
    startTime: "28:05",
    singer: 'Praneetha & Yoshitha'
  },
  {
    name: "Hari Narayana Govinda Jaya Narayana Gopala",
    shruthi: { gents: "5P", ladies: "" },
    day: "Sunday",
    dateSung: "2026-04-05",
    startTime: "31:58",
    singer: 'Eshwar'
  },
  {
    name: "Bolo Narayana Jai Jai Vittala",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-04-05",
    startTime: "34:05",
    singer: 'Vathsalya & Sai Shruthi'
  },
  {
    name: "Apaara Mahima Gunavantha",
    shruthi: { gents: "6P", ladies: "" },
    day: "Sunday",
    dateSung: "2026-04-05",
    startTime: "36:44",
    singer: 'Swaroop'
  },
  {
    name: "Aanand Se Bolo Jai Baba Jai",
    shruthi: { gents: "", ladies: "" },
    day: "Sunday",
    dateSung: "2026-04-05",
    startTime: "39:30",
    singer: ''
  },
  //19th April 2026
  {
    name: "Ganapathi Om Jaya Ganapathi Om",
    shruthi: { gents: "", ladies: "7P" },
    day: "sunday",
    dateSung: "2026-04-19",
    startTime: "0:01",
    singer: 'Gayathri',
  },
   {
    name: "Satya Sai Smaranam(2)",
    shruthi: { gents: "4P", ladies: "" },
    day: "sunday",
    dateSung: "2026-04-19",
    startTime: "2:30",
    singer: 'Lal',
  },
   {
    name: "Jaya Maa Hey Sai Maa",
    shruthi: { gents: "", ladies: "" },
    day: "sunday",
    dateSung: "2026-04-19",
    startTime: "6:26",
    singer: 'Sunitha',
  },
   {
    name: "Dayakaro Sai Narayana (Raag pilu) ",
    shruthi: { gents: "3P", ladies: "" },
    day: "sunday",
    dateSung: "2026-04-19",
    startTime: "10:38",
    singer: 'Sai Karthik',
  },
   {
    name: "Aao Aao Sai Pyaare",
    shruthi: { gents: "", ladies: "" },
    day: "sunday",
    dateSung: "2026-04-19",
    startTime: "15:33",
    singer: 'Lavanya',
  },
   {
    name: "Raghukula Bhushana Rajeeva Nayana",
    shruthi: { gents: "2P", ladies: "" },
    day: "sunday",
    dateSung: "2026-04-19",
    startTime: "19:03",
    singer: 'Swaroop',
  },
   {
    name: "Madhava Gopala Nanda Nandana Ghana Shyama Gopala",
    shruthi: { gents: "", ladies: "4P" },
    day: "sunday",
    dateSung: "2026-04-19",
    startTime: "23:26",
    singer: 'Sri Vidya & Vani',
  },
   {
    name: "Sarva Dharma Swaroopa Sai",
    shruthi: { gents: "5P", ladies: "" },
    day: "sunday",
    dateSung: "2026-04-19",
    startTime: "27:00",
    singer: 'G.Srinivas',
  },
   {
    name: "Rama(4) Rama Naama Tarakam",
    shruthi: { gents: "", ladies: "2P" },
    day: "sunday",
    dateSung: "2026-04-19",
    startTime: "31:37",
    singers: 'Geetha,Jyothi & Eshwari',
  },
   {
    name: "Hey Nanda(2) Gopala Aananda(2) Gopala",
    shruthi: { gents: "5P", ladies: "" },
    day: "sunday",
    dateSung: "2026-04-19",
    startTime: "34:08",
    singer: 'Eshwar',
  },
   {
    name: "Shankaram Bhaje Shankaram Bhaje",
    shruthi: { gents: "", ladies: "4P" },
    day: "sunday",
    dateSung: "2026-04-19",
    startTime: "36:11",
    singer: 'Yoshitha & Vathsalya',
  },
   {
    name: "Giridhara Gopala (2)",
    shruthi: { gents: "4P", ladies: "" },
    day: "sunday",
    dateSung: "2026-04-19",
    startTime: "38:33",
    singer: 'Venu',
  },
   {
    name: "Subramanyam Sai Bolo Subramanyam Sai",
    shruthi: { gents: "4P", ladies: "" },
    day: "sunday",
    dateSung: "2026-04-19",
    startTime: "41:37",
    singer: 'Sridhar',
  },
  // 26th April 2026
  {
    name: "Sai Mukunda Janardhana",
    day: "Sunday",
    dateSung: "2026-04-26",
    startTime: "0:01",
    singer: "G.Srinivas"
  },
  {
    name: "Neela Kanta Gangadhara Hara Umapathe",
    day: "Sunday",
    dateSung: "2026-04-26",
    startTime: "2:56",
    singer: "Eshwar"
  },
  {
    name: "Deena Dayala Hari Parama Dayala",
    day: "Sunday",
    dateSung: "2026-04-26",
    startTime: "6:24",
    singers: "Geetha,Jyothi & Eshwari"
  },
  {
    name: "Jaya Kausalya Nandana Ram",
    day: "Sunday",
    dateSung: "2026-04-26",
    startTime: "9:52",
    singer: "Lal"
  },
  {
    name: "Parthishwara Satya Saishwara",
    day: "Sunday",
    dateSung: "2026-04-26",
    startTime: "13:59",
    singer: "Sai Karthik"
  },
  {
    name: "Radhe Govinda Hare Murare - [ Malkauns ]",
    day: "Sunday",
    dateSung: "2026-04-26",
    startTime: "18:48",
    singer: "Gayathri"
  },
  {
    name: "Rama Kaho Krishna Kaho",
    day: "Sunday",
    dateSung: "2026-04-26",
    startTime: "21:48",
    singer: "Sridhar"
  },
  {
    name: "Vittobha Vittala Panduranga",
    day: "Sunday",
    dateSung: "2026-04-26",
    startTime: "25:34",
    singer: "G.Srinivas"
  },
  {
    name: "Gopala Sai Gopala",
    day: "Sunday",
    dateSung: "2026-04-26",
    startTime: "28:40",
    singer: "Lal"
  },
  {
    name: "Rama Lakshmana Janaki Jai Bolo Hanuman Ki",
    day: "Sunday",
    dateSung: "2026-04-26",
    startTime: "30:45",
    singer: "Sai Karthik"
  },
  //17th May 2026
    {
    name: "Hey Gananatha Gajanana",
    day: "Sunday",
    shruthi: { gents: "2P"},
    dateSung: "2026-05-17",
    startTime: "0:00",
    singer: "Sai Karthik"
  },
  {
    name: "Sada Shiva Ranjani Sai Janani",
    day: "Sunday",
    dateSung: "2026-05-17",
    startTime: "3:50",
    singer: "Neeraj"
  },
  {
    name: "Jaya Jaya Shankara Kailasa Vaasi",
    day: "Sunday",
    dateSung: "2026-05-17",
    startTime: "7:00",
    singer: "Neeraj"
  },
  {
    name: "Sri Rama Chandra Jaya Rama Chandra",
    day: "Sunday",
    dateSung: "2026-05-17",
    startTime: "11:30",
    singer: "Lal"
  },
  {
    name: "Giridhara Gopala Muralidhara Harey",
    day: "Sunday",
    dateSung: "2026-05-17",
    startTime: "15:10",
    singer: "Praneetha & Vani"
  },
  //24th May 2026
    {
    name: "Pashupati Tanaya Bala Gajanana",
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "0:01",
    singer: "G.Srinivas"
  },
   {
    name: "Sadguru Brahma Sanatana Hey",
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "4:14",
    singer: "Lavanya"
  },
   {
    name: "Jagat Janani Shiva Sai Shankari",
    shruthi: { gents: "7P" },
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "9:00",
    singer: "Sai Karthik"
  },
   {
    name: "Sundara Padam Sai Padam",
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "13:21",
    singer: "sahiti"
  },
   {
    name: "Premamrutha Barsaao baba",
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "18:13",
    singer: "A.Srinivas"
  },
   {
    name: "Sitarama Sri Raghurama",
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "24:44",
    singer: "Yoshitha & Vani"
  },
    {
    name: "Boloram Sairam Satyasai Ram",
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "27:50",
    singer: "Lal"
  },
    {
    name: "Shankara Naam Bhajo",
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "31:40",
    singer: "Praneetha & Vani"
  },

   {
    name: "Rajeeva Lochana Jaya Jaya Ram",
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "34:52",
    singer: "Neeraj"
  },
   {
    name: "Govinda Govinda Bhajaman Radhe Govinda",
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "38:53",
    singers: "Geetha,Jyothi & Eshwari"
  },
   {
    name: "Neela Megha Shyama Krishna Gopala Krishna",
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "42:20",
    singer: "Sridhar"
  },
   {
    name: "Allah Sai Bolo Maula Sai Bolo",
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "45:40",
    singer: "Vathsalya & Sai Shruthi"
  },
   {
    name: "Yadukula Nandana Sri Hari Madhava",
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "48:18",
    singer: "Eshwar"
  },
   {
    name: "Shambho Shankara Parvati Ramana Pashupathi Paramesha",
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "50:16",
    singer: "Divya & L.Gayatri"
  },
   {
    name: "Veera Hanumana Ati Balavana Raam Naam Japiyaare",
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "52:57",
    singer: "G.Srinivas"
  },
   {
    name: "Bolo Jai Sairam (2)",
    day: "Sunday",
    dateSung: "2026-05-24",
    startTime: "56:14",
    singer: "Neeraj"
  },
  //31st May 2026
    {
    name: "Ambika Tanaya Gajanana",
    day: "Sunday",
    dateSung: "2026-05-31",
    startTime: "0:01",
    singer: "Lavanya"
  },
   {
    name: "Hey Parthipurisha Prashanthivasa Sadguru Sairam",
    day: "Sunday",
    dateSung: "2026-05-31",
    startTime: "4:28",
    singer: "Lal"
  },
   {
    name: "Ganapriye Sai Karunamayi",
    day: "Sunday",
    dateSung: "2026-05-31",
    startTime: "9:45",
    singer: "Gayathri"
  },
   {
    name: "Bhavanasha Puttaparthipurisha",
    day: "Sunday",
    dateSung: "2026-05-31",
    startTime: "14:00",
    singer: "Neeraj"
  },
   {
    name: "Madhuvana murali Shyama Murari",
    day: "Sunday",
    dateSung: "2026-05-31",
    startTime: "18:36",
    singer: "sahiti"
  },
   {
    name: "Sundara Vadana Sarasija Nayana",
    day: "Sunday",
    dateSung: "2026-05-31",
    startTime: "22:21",
    singer: "Sai Karthik"
  },
   {
    name: "Rama(3) Jaya Kodanda Rama",
    day: "Sunday",
    dateSung: "2026-05-31",
    startTime: "27:30",
    singers: "Geetha,Jyothi & Eshwari"
  },
   {
    name: "Hey Nirakaari Allah",
    day: "Sunday",
    dateSung: "2026-05-31",
    startTime: "30:42",
    singer: "G.Srinivas"
  },
   {
    name: "Hara Bholanatha Umapathey",
    day: "Sunday",
    dateSung: "2026-05-31",
    startTime: "36:12",
    singer:"Yoshitha & Sai Harshitha"
  },
   {
    name: "Deena Bandhu vittala Jai",
    day: "Sunday",
    dateSung: "2026-05-31",
    startTime: "39:15",
    singer: "Sridhar"
  },
   {
    name: "Rama Lakshmana Janaki Jai Bolo Hanuman Ki",
    day: "Sunday",
    dateSung: "2026-05-31",
    startTime: "42:34",
    singer: "Neeraj"
  },
  //14th June 2026
  {
    name: "Jaya Pandarinatha Panduranga Pundaleeka Varaa",
    day: "Sunday",
    dateSung: "2026-06-14",
    startTime: "0:05",
    singer: "sahiti"
  },
  {
    name: "Hey Shyama Sundara Hey Sai Sundara",
    day: "Sunday",
    dateSung: "2026-06-14",
    startTime: "6:48",
    singer: "Abhishek"
  },
  {
    name: "Tumaho Shyama Ram Rahim",
    day: "Sunday",
    dateSung: "2026-06-14",
    startTime: "11:39",
    singer: "Gayathri"
  },
  {
    name: "Saibaba Saibaba",
    day: "Sunday",
    dateSung: "2026-06-14",
    startTime: "15:01",
    singer: "A.Srinivas"
  },
  {
    name: "Hari(6) Bolo",
    day: "Sunday",
    dateSung: "2026-06-14",
    startTime: "18:41",
    singer: "Vathsalya"
  },
  {
    name: "Shiridi Sai Hey Bhagawan",
    day: "Sunday",
    dateSung: "2026-06-14",
    startTime: "22:35",
    singer: "Lal"
  },
  {
    name: "Sitaram Naama Bhajo",
    day: "Sunday",
    dateSung: "2026-06-14",
    startTime: "25:42",
    singers: "Geetha,Jyothi & Eshwari"
  },
  {
    name: "Hey Nanda Nanda Gopala Aananda Gopala",
    day: "Sunday",
    dateSung: "2026-06-14",
    startTime: "27:40",
    singer: "Eshwar"
  },
  {
    name: "Om Shivaaya",
    day: "Sunday",
    dateSung: "2026-06-14",
    startTime: "29:36",
    singer: "Lavanya"
  },
  {
    name: "Sai Siva Siva Subramanyam",
    day: "Sunday",
    dateSung: "2026-06-14",
    startTime: "31:25",
    singer: "Venu & Sridhar"
  },
  //21st June 2026
  {
    name: "Prathama Vandana Gowri Nandana",
    day: "Sunday",
    dateSung: "2026-06-21",
    startTime: "0:15",
    singer: "Sharat"
  },
  {
    name: "Gurupadavandana Shatavandana",
    day: "Sunday",
    dateSung: "2026-06-21",
    startTime: "3:54",
    singer: "Sridhar"
  },
  {
    name: "Durga Amba Bhavani Jai Jai",
    day: "Sunday",
    dateSung: "2026-06-21",
    startTime: "7:17",
    singer: "Sai Shruthi & Vathsalya"
  },
  {
    name: "Radhe Govinda Gopala Jaya Govinda Radhe Gopala",
    day: "Sunday",
    dateSung: "2026-06-21",
    startTime: "10:05",
    singer: "Venu"
  },
  {
    name: "Bhuvana Bandhava Sai Bhagawaan",
    day: "Sunday",
    dateSung: "2026-06-21",
    startTime: "14:23",
    singer: "G.Srinivas"
  },
  {
    name: "Maithilipathe Raghunandana",
    day: "Sunday",
    dateSung: "2026-06-21",
    startTime: "18:35",
    singer: "Sunitha"
  },
  {
    name: "Shailagirishwara Uma Maheshwara",
    day: "Sunday",
    dateSung: "2026-06-21",
    startTime: "21:27",
    singer: "Eshwar"
  },
  {
    name: "Hey Kamala Vadana Sai Ranga",
    day: "Sunday",
    dateSung: "2026-06-21",
    startTime: "23:38",
    singer: "Sharat"
  },
  {
    name: "Narayana Hari Narayana",
    day: "Sunday",
    dateSung: "2026-06-21",
    startTime: "26:54",
    singer: "Sunitha"
  },
  //28th June 2026
  {
    name: "Gananatha Pahi Gajanana",
    day: "Sunday",
    dateSung: "2026-06-28",
    startTime: "0:06",
    singer: "Lal"
  },
  {
    name: "Soham Soham Dhyana Karo",
    day: "Sunday",
    dateSung: "2026-06-28",
    startTime: "4:37",
    singer: "Lavanya"
  },
  {
    name: "Jaya Maa (2) Jagadeeshwari Sai Maa",
    day: "Sunday",
    dateSung: "2026-06-28",
    startTime: "8:47",
    singer: "Ganapathi"
  },
  {
    name: "Jaya Sai Shankara Jaya Abhayankara",
    day: "Sunday",
    dateSung: "2026-06-28",
    startTime: "15:23",
    singer: "sahiti"
  },
  {
    name: "Prem Eshwar Hai Eshwari Prem Hai",
    day: "Sunday",
    dateSung: "2026-06-28",
    startTime: "19:56",
    singer: "Abhishek"
  },
  {
    name: "Hare Ram (2) Hare Rama Krishna Hare Ram",
    day: "Sunday",
    dateSung: "2026-06-28",
    startTime: "23:23",
    singer: "Yoshitha & Sai Shruthi"
  },
  {
    name: "Mandir Mein Aao Madhava",
    day: "Sunday",
    dateSung: "2026-06-28",
    startTime: "29:06",
    singer: "A.Srinivas"
  },
  {
    name: "Kanhaiyya Teri Bansi Bhaje Mere Lal",
    day: "Sunday",
    dateSung: "2026-06-28",
    startTime: "33:57",
    singer: "Chandini & Harshitha"
  },
  {
    name: "Sankata Harana Govinda",
    day: "Sunday",
    dateSung: "2026-06-28",
    startTime: "37:46",
    singer: "Venu"
  },
  {
    name: "Sita Rakshaka Rama Doota",
    day: "Sunday",
    dateSung: "2026-06-28",
    startTime: "41:33",
    singer: "Praneetha & Vani"
  },
  {
    name: "Narayana (2) Jaya Govinda Hare",
    day: "Sunday",
    dateSung: "2026-06-28",
    startTime: "43:37",
    singer: "Sridhar"
  },

//12th July 2026
  {
    name: "Gowri Sutaya Om Namah Om",
    day: "Sunday",
    shruthi: { gents: "6P" },
    dateSung: "2026-07-12",
    singer: "Sai Karthik"
  },
  {
    name: "Gurudeva Priya Deva Sai Deva Dayamaya",
    day: "Sunday",
    dateSung: "2026-07-12",
    singer: "Lal"
  },
  {
    name: "Amba Mandahasa Vadani",
    day: "Sunday",
    dateSung: "2026-07-12",
    singers: "Sai Harshitha & Vathsalya"
  },
  {
    name: "Jaya Jagadeesha Harey Jaya Govinda Harey",
    day: "Sunday",
    dateSung: "2026-07-12",
    singer: "A.Srinivas"
  },
  {
    name: "Patita Pavana Ram Partipurishwara Ram",
    day: "Sunday",
    shruthi: { gents: "2P" },
    dateSung: "2026-07-12",
    singer: "Sai Karthik"
  },
  {
    name: "Aao Aao Sai Pyaare",
    day: "Sunday",
    dateSung: "2026-07-12",
    singers: "Praneetha & Vani"
  },
  {
    name: "Guru Nanak Ji Ki Jai Jai Kaar",
    day: "Sunday",
    dateSung: "2026-07-12",
    singer: "Lal"
  },
  {
    name: "Jai Sairam Jai Sairam",
    day: "Sunday",
    dateSung: "2026-07-12",
    singers: "Sruthi & Vathsalya"
  },
  {
    name: "Hey Viswa Pala Gopala",
    day: "Sunday",
    dateSung: "2026-07-12",
    singer: "Eshwar"
  },
  {
    name: "Vittala Bhajo Sai Vittala Bhajo",
    day: "Sunday",
    shruthi: { gents: "4P" },
    dateSung: "2026-07-12",
    singer: "Sai Karthik"
  },
  {
    name: "Hari Narayana Govinda Jaya Narayana Gopala",
    day: "Sunday",
    dateSung: "2026-07-12",
    singers: "Geetha & Vathsalya"
  },
  {
    name: "Sai Baba Bolo",
    day: "Sunday",
    dateSung: "2026-07-12",
    singer: "A.Srinivas"
  },
  //2nd Aug 2026
  {
    name: "Sharanam Sharanam Paahi Gajananam",
    day: "Sunday",
    dateSung: "2026-08-02",
    startTime: "0:39",
    singer: "Swaroop"
  },
  {
    name: "Sai Pita Aur Mata Sai",
    day: "Sunday",
    dateSung: "2026-08-02",
    startTime: "4:49",
    singer: "A.Srinivas"
  },
  {
    name: "JagatJanani Maa Ambe Bhavani",
    day: "Sunday",
    dateSung: "2026-08-02",
    startTime: "9:12",
    singers: "Geetha,Jyothi & Eshwari"
  },
  {
    name: "Parthishwara Satya Saishwara",
    day: "Sunday",
    dateSung: "2026-08-02",
    startTime: "12:18",
    singer: "Abhishek"
  },
  {
    name: "Kamalanetra Saishwara",
    day: "Sunday",
    dateSung: "2026-08-02",
    startTime: "15:35",
    singer: "Lal"
  },
  {
    name: "Krishna Krishna Yaduvara Krishna",
    day: "Sunday",
    dateSung: "2026-08-02",
    startTime: "20:16",
    singers: "Yoshitha & Vani"
  },
  {
    name: "Ram Rahim ko Bhajanewaale Tere Pujari Baba",
    day: "Sunday",
    dateSung: "2026-08-02",
    startTime: "23:56",
    singer: "Venu"
  },
  {
    name: "Ram (3) Paramasumangala Ram(3)",
    day: "Sunday",
    dateSung: "2026-08-02",
    startTime: "29:08",
    singer: "Sridhar"
  },
  {
    name: "Sai Hai Jeevan Jeevan Satyasai",
    day: "Sunday",
    dateSung: "2026-08-02",
    startTime: "31:27",
    singers: "Praneetha & Vani"
  },
  {
    name: "Panduranga Vittala Jai Pandarinatha Vittala",
    day: "Sunday",
    dateSung: "2026-08-02",
    startTime: "34:42"
  },
  {
    name: "Hey Nanda Nanda Gopala Aananda Nanda Gopala",
    day: "Sunday",
    dateSung: "2026-08-02",
    startTime: "37:57",
    singer: "Eshwar"
  },
  {
    name: "Bhashma Vibhushitha Bhavani Shankara",
    day: "Sunday",
    dateSung: "2026-08-02",
    startTime: "39:36",
    singers: "Abhishek & Swaroop"
  },
  //23rd Aug 2026 Eve
  {
    name: "Jaya ho(2) mooshika Vaahana",
    day: "Sunday",
    dateSung: "2026-08-23",
    startTime: "0:39",
    singer: "Lal"
  },
  {
    name: "Jaya Guru Omkaara Sadguru Omkaara",
    day: "Sunday",
    dateSung: "2026-08-23",
    startTime: "4:04",
    singer: "A.Srinivas"
  },
  {
    name: "Mangala Shubhakari Maata Maheshwari",
    day: "Sunday",
    dateSung: "2026-08-23",
    startTime: "8:27",
    singer: "Lavanya"
  },
  {
    name: "Kaanha Kanhaiyya Bansi Adhariya",
    day: "Sunday",
    dateSung: "2026-08-23",
    startTime: "11:58",
    singer: "Sai Karthik"
  },
  {
    name: "Arunachala Shiva (3) Arunashiva",
    day: "Sunday",
    dateSung: "2026-08-23",
    startTime: "16:34",
    singer: "Abhishek"
  },
  {
    name: "Patita Pavana Ram",
    day: "Sunday",
    dateSung: "2026-08-23",
    startTime: "21:24",
    singers: "Lavanya & Vani"
  },
  {
    name: "Sai Narayana Narayana",
    day: "Sunday",
    dateSung: "2026-08-23",
    startTime: "25:16",
    singer: "Sridhar"
  },
  {
    name: "Yuga Yuga Ke Avataraa Sai Rama Sai Krishna Sai Baba",
    day: "Sunday",
    dateSung: "2026-08-23",
    startTime: "27:34",
    singer: "Venu"
  },
  {
    name: "Radhe(3)shyam Rakumayi Vittala",
    day: "Sunday",
    dateSung: "2026-08-23",
    startTime: "32:08"
  },
  {
    name: "Yadukula Nandana Srihari Madhava",
    day: "Sunday",
    dateSung: "2026-08-23",
    startTime: "34:58",
    singer: "Eshwar"
  },
  {
    name: "Narayana hari Nama bhajore",
    day: "Sunday",
    dateSung: "2026-08-23",
    startTime: "36:54",
    singer: "Lavanya"
  },
  {
    name: "Neela kanta neeleshwara Bhole Bhandari",
    day: "Sunday",
    dateSung: "2026-08-23",
    startTime: "39:34",
    singer: "A.Srinivas"
  },
  {
    name: "Hara Hara Mahadeva SatyaSai Mahadeva",
    day: "Sunday",
    dateSung: "2026-08-23",
    startTime: "43:10",
    singer: "Lal"
  },

]
