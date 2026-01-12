const sundayBhajansRawData = [
  // 28th Dec 2025 - Audio: audios/28th December.mp3
  {
    name: "Gajanana Hey Shubhanana Parama Niranjana Gajavadana",
    deity: "ganesha",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "0:30",
    singer: 'Lal'
  },
  {
    name: "Karunakaro Sai Dev",
    deity: "devi",
    speed: "slow",
    shruthi: { ladies: "6.5P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "4:30",
    singer: 'Sunitha'

  },
  {
    name: "Jaya Maa Ananda Mayi Janani",
    deity: "devi",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "8:32",
    singer: 'A.Srinivas'

  },
  {
    name: "Govinda Madhava Gopala Keshava (Jaya Nanda Mukunda)",
    deity: "krishna",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "5.5P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "12:50",
    singer: 'Lavanya'

  },
  {
    name: "Ravikula Bhanjana Rama Sri Rama",
    deity: "rama",
    speed: "slow",
    shruthi: { gents: "2P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "18:36",
    singer: 'Shanta Krishna'

  },
  {
    name: "Namo Namo Nataraja Namo",
    deity: "shiva",
    speed: "medium",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "23:15",
    singer: 'Gayathri'
  },
  {
    name: "Radheshyama Hey Ghanashyama",
    deity: "krishna",
    speed: "slow",
    shruthi: { gents: "4P", ladies: "1P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "27:36",
    singer: 'G.Srinivas'
  },
  {
    name: "Satya Dharma Shanti Prema Swaroopa Prashanthi Nilaya Deva",
    deity: "sarvadharma",
    speed: "medium",
    shruthi: { gents: "3P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "32:30",
    singers:'Vani & Praneetha'
  },
  {
    name: "Hey Ayodhya Vasi Ram(2) Dasaratha Nandana Ram",
    deity: "rama",
    speed: "fast",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "36:47",
    singer: 'Sridhar'
  },
  {
    name: "Shubha Aur Shyam Bol Hari Naam",
    deity: "sai",
    speed: "fast",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "40:42",
    singers:'Vathsalya Shruthi & Harshitha'
  },
  {
    name: "Manamohana Krishna Kunja Vihari",
    deity: "vittala",
    speed: "medium",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-12-28",
    startTime: "43:08",
    singer: 'Swaroop'
  },
  // 21st Dec 2025 - No audio file available
  {
    name: "Sri Ganapathi Hari Om",
    deity: "ganesha",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-12-21",
    startTime: null,
  },
  {
    name: "Maata Pita Guru Bandhu Sakha",
    deity: "sarvadharma",
    speed: "slow",
    shruthi: { gents: "4P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-12-21",
    startTime: null,
  },
  {
    name: "Nada Brahma Nayi Sai Eshwari",
    deity: "shiva",
    speed: "medium",
    shruthi: { gents: "4P", ladies: "1P" },
    day: "Sunday",
    dateSung: "2025-12-21",
    startTime: null,
  },
  {
    name: "Sai Charan Sukhdaayiman",
    deity: "sai",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "5.5P" },
    day: "Sunday",
    dateSung: "2025-12-21",
    startTime: null,
  },
  {
    name: "Muralidhara Gopal Madhura",
    deity: "krishna",
    speed: "medium",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-12-21",
    startTime: null,
  },
  {
    name: "Nacho Hey Nataraj shiva shambho",
    deity: "shiva",
    speed: "medium",
    shruthi: { gents: "4P", ladies: "1P" },
    day: "Sunday",
    dateSung: "2025-12-21",
    startTime: null,
  },
  {
    name: "Radhe Govinda Krishna Murari",
    deity: "krishna",
    speed: "medium",
    shruthi: { gents: "4P", ladies: "1P" },
    day: "Sunday",
    dateSung: "2025-12-21",
    startTime: null,
  },
  {
    name: "Prabhu Ramachandra Ke",
    deity: "hanuman",
    speed: "fast",
    shruthi: { gents: "3P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-12-21",
    startTime: null,
  },
  {
    name: "Hari Ananda Maya Jaya",
    deity: "narayana",
    speed: "fast",
    shruthi: { gents: "7P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-12-21",
    startTime: null,
  },
  {
    name: "Mandir Mein Aao Madhava",
    deity: "vittala",
    speed: "slow",
    shruthi: { gents: "6P", ladies: "4P" },
    day: "Sunday",
    dateSung: "2025-12-21",
    startTime: null,
  },
  {
    name: "Hey Sai Jagannatha",
    deity: "sai",
    speed: "medium",
    shruthi: { gents: "1.5P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-12-21",
    startTime: null,
  },
  // 30th Nov 2025 - Audio: audios/30th+Nov+2025.mp3
  {
    name: "Lambodara Hey Gowri Nandana",
    deity: "ganesha",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "0:00",
    singer: 'Karthik'
  },
  {
    name: "Satya Dharma Shanti prema Sabko Deejo",
    deity: "sarvadharma",
    speed: "medium",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "3:09",
    singer: 'Vathsalya Chandini & Yoshitha'
  },
  {
    name: "Maata Maheshwari Tribhuvani Janani",
    deity: "devi",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "6:03",
    singer: 'A.Srinivas'
  },
  {
    name: "Sita Rama Sri Raghurama",
    deity: "rama",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "10:21",
    singer: 'Sunitha'
  },
  {
    name: "Ghana Ghana Neela Vadana Ati Sundara",
    deity: "krishna",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "14:20",
    singer: 'Sharath'
  },
  {
    name: "Yuga Yuga Ke Avataara Tum Hi Ho",
    deity: "sarvadharma",
    speed: "medium",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "18:27",
    singer: 'Sahiti'
  },
  {
    name: "Tum ho Shankara Daata Sai Shankara",
    deity: "shiva",
    speed: "medium",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "22:57",
    singer: 'Abhishek'
  },
  {
    name: "Manuva Bolo Radhe(3) Shyama Naam",
    deity: "vittala",
    speed: "medium",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "26:20",
    singer: 'Eshwar'

  },
  {
    name: "Jaya Jaya Mangala Sai Namo",
    deity: "sai",
    speed: "fast",
    shruthi: { gents: "4P", ladies: "1P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "30:11",
    singer: 'Sridhar'
  },
  {
    name: "Bhajo Mathura Hari Naam Nirantara",
    deity: "sai",
    speed: "fast",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "32:48",
    singers:'Vathsalya Chandini & Yoshitha'
  },
  {
    name: "Nandalala(2) Nanda Mukunda Hari Nandalala",
    deity: "krishna",
    speed: "fast",
    shruthi: { gents: "7P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "35:58",
    singer: 'Sharath'
  },
  {
    name: "Aao Pyaare Nayan Hamare ",
    deity: "sai",
    speed: "fast",
    shruthi: { gents: "6.5P", ladies: "4.5P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "38:04",
    singer: 'Sahiti'
  },
  {
    name: "Sharanu Ghosha Priyaney Ayyappa",
    deity: "subramanya",
    speed: "fast",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-11-30",
    startTime: "42:00",
    singer: 'G.Srinivas'
  },
  // 4th Jan 2026 - Audio: audios/4th Jan 2026.mp3
  {
    name: "Prathama Sharana Gananayaka",
    deity: "ganesha",
    speed: "slow",
    shruthi: { gents: "1.5P", ladies: "5.5P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "0:29",
    singer: 'Lavanya'
  },
  {
    name: "Jaya Guru Omkara Sadguru Omkaara",
    deity: "sarvadharma",
    speed: "slow",
    shruthi: { gents: "2P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "3:32",
    singer: 'A.Srinivas'
  },
  {
    name: "Jaya Maa Hey Sai Maa",
    deity: "devi",
    speed: "slow",
    shruthi: { ladies: "5P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "7:46",
    singer: 'Sunitha'
  },
  {
    name: "Narayana Hari Narayana",
    deity: "narayana",
    speed: "slow",
    shruthi: { gents: "2.5P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "12:31",
    singer: 'Abhishek'
  },
  {
    name: "Murali Krishna mukunda krishna",
    deity: "krishna",
    speed: "medium",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "19:05",
    singer: 'Geetha Jyothi & Eshwari'
  },
  {
    name: "Srirama Bhadra Sri rama chandra Sri Rama Jaya Sri Ram",
    deity: "rama",
    speed: "slow",
    shruthi: { gents: "1P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "22:52",
    singer: 'Shanta Krishna'
  },
  {
    name: "Hari Om Namah Shivaya",
    deity: "shiva",
    speed: "slow",
    shruthi: { gents: "4P", ladies: "1P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "28:02",
    singer: 'Lavanya'
  },
  {
    name: "Jai(3) Manamohana Jai(3) Madhusudana",
    deity: "krishna",
    speed: "fast",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "31:51",
    singer: 'Eshwar'
  },
  {
    name: "Sitaram Nama Bhajo",
    deity: "rama",
    speed: "fast",
    shruthi: { gents: "7P", ladies: "4P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "34:07",
    singers:'Harshitha & Sri'

  },
  {
    name: "Shiva(2) Shambho hara(2) Shambho Sai Shambho Shankara ",
    deity: "shiva",
    speed: "fast",
    shruthi: { gents: "3P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "36:10",
    // singers:'Rajesh'

  },
  {
    name: "Seeta Rakshaka Rama Doota",
    deity: "hanuman",
    speed: "fast",
    shruthi: { gents: "7P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "39:20",
    singer: 'Sunitha'

  },
  {
    name: "Sri Ranga Hare Vittala Sai Ranga hare vittala",
    deity: "vittala",
    speed: "fast",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2026-01-04",
    startTime: "41:22",
    singer: 'Venu'

  },
  //19th Oct 2025
   {
    name: "Neela Greeva Kumara",
    deity: "ganesha",
    speed: "slow",
    shruthi: { gents: "4P"},
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "01:36",
    singer: 'G.Srinivas'

  },
   {
    name: "Jaya Guru Shankara Girija Ramana",
    deity: "guru",
    speed: "slow",
    shruthi: {ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "04:19",
    singer: 'Lavanya'
    
  },
   {
    name: "Janani Sai Devi Dayamayi",
    deity: "devi",
    speed: "slow",
    shruthi: { gents: "2.5P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "07:25",
        singer: 'Venu'

  },
   {
    name: "Ajanubahum Aravinda Netram",
    deity: "sai",
    speed: "slow",
    shruthi: { gents: "1.5P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "10:55",
    singers:'Chandini & Harshitha'

  },
   {
    name: "Chaitanya Mayi Sai",
    deity: "sai",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "14:36",
    singer: 'Lal'

  },
   {
    name: "Govinda Sai Krishna Govinda(2)",
    deity: "krishna",
    speed: "medium",
    shruthi: { gents: "1.5P", ladies: "5.5P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "20:32",
    singers:'Vani & Yoshitha'

  },
   {
    name: "Madhura(2) hey Muralidhari",
    deity: "krishna",
    speed: "fast",
    shruthi: { gents: "1.5P", ladies: "5.5P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "23:33",
    singer: 'Sridhar'

  },
{
    name: "Rama hare Sai Krishna Hare Sarvadharma Priya",
    deity: "sarvadharma",
    speed: "fast",
    shruthi: { gents: "2.5P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "26:13",
    singers:'Sai Harshitha & Ravali'

  },
  {
    name: "Jaya(2) Rama Jaya Raghurama",
    deity: "rama",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "5.5P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "29:55",
        singer: 'A.Srinivas'

  },
  {
    name: "Panduranga Vittala Jai Pandarinatha Vittala",
    deity: "vittala",
    speed: "fast",
    shruthi: { gents: "4P", ladies: "1P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "33:55",
    singer: 'Geetha Jyothi & Eshwari'

  },
  {
    name: "Shambho Murarey Shankara Murarey",
    deity: "shiva",
    speed: "fast",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "37:13",
    singer: 'Eshwar'
  },
  {
    name: "Rama Lakshmana Janaki Jai Bolo Hanuman Ki",
    deity: "hanuman",
    speed: "fast",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "39:28",
    singer: 'Lavanya'
  },
  {
    name: "Meeru Meghalaya Mayurasana",
    deity: "subramanya",
    speed: "fast",
    shruthi: { gents: "5P"},
    day: "Sunday",
    dateSung: "2025-10-19",
    startTime: "43:06",
    singer: 'G.Srinivas'
  },
  //31st August 2025
   {
    name: "Sri Ganapati Hari Om",
    deity: "ganesha",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "0:00",
    singer: 'A.Srinivas'
  },
  {
    name: "Sri Sai Natha Guru Govinda",
    deity: "guru",
    speed: "medium",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "4:31",
    singers:'Vathsalya & Shruthi'
  },
  {
    name: "Devi Bhavani Jagat Janani",
    deity: "devi",
    speed: "slow",
    shruthi: { gents: "1.5P", ladies: "5.5P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "6:54",
    singer: 'Sridhar'
  },
  {
    name: "Jaya Jaya Shankara Kailaasa Vaasi",
    deity: "shiva",
    speed: "slow",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "10:35",
    singer: 'Lavanya'
  },
  {
    name: "Madhuvana Sanchari Shyama Murari",
    deity: "krishna",
    speed: "slow",
    shruthi: { gents: "6P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "14:42",
    singer: 'Abhishek'
  },
  {
    name: "Jaya(2) Mangala Sai Namo",
    deity: "sai",
    speed: "fast",
    shruthi: { gents: "4P", ladies: "1P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "18:16",
    singers:'Vani & Vathsalya'
  },
  {
    name: "Shiva(2) Shankara Hara Parameshwara",
    deity: "shiva",
    speed: "slow",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "20:58",
    singer: 'Venu'
  },
  {
    name: "Hari Narayana Govinda Jaya Narayana Gopala",
    deity: "narayana",
    speed: "fast",
    shruthi: { gents: "6P", ladies: "3P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "24:24",
    singer: 'Geetha Jyothi & Eshwari'
  },
  {
    name: "Sri Rama Paratparara Ram Hey Rajeeva Lochana Ram",
    deity: "rama",
    speed: "medium",
    shruthi: { gents: "5P", ladies: "7P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "26:24",
    singer: 'Eshwar'
  },
  {
    name: "Bhavasagara Se Paar Uthaaro",
    deity: "sarvadharma",
    speed: "slow",
    shruthi: { gents: "1.5P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "30:03",
    singer: 'Lavanya'
  },
  {
    name: "Sai Natha Bhagawaan",
    deity: "sarvadharma",
    speed: "fast",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "34:21",
    singer: 'Venu'
  },
  {
    name: "Vittala Vittala Sai Narayana",
    deity: "vittala",
    speed: "fast",
    shruthi: { gents: "6.5P"},
    day: "Sunday",
    dateSung: "2025-08-31",
    startTime: "38:26",
    singer: 'Abhishek'
  },
//21st September 2025 Add
{
    name: "Namami Nityam Smarami Nityam Gajavadanam",
    deity: "ganesha",
    speed: "medium",
    day: "Sunday",
    shruthi: { gents: "4P", ladies: "1P" },
    dateSung: "2025-09-21",
    startTime: "0:00",
    singers:'Vathsalya & Shruthi'
  },
  {
    name: "Aruna Ramana Sri Gurudeva",
    deity: "guru",
    speed: "slow",
    shruthi: { gents: "1.5P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "2:36",
    singer: 'A.Srinivas'
  },
  {
    name: "Durga Amba Bhavani Jai Jai",
    deity: "devi",
    speed: "slow",
    shruthi: { gents: "2.5P", ladies: "6.5P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "7:18",
  },
  {
    name: "Kausalya Nandana Vaidehi Mohana",
    deity: "rama",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "9:56",
    singer: 'Lal'
  },
  {
    name: "Kamala Nayana Narayana",
    deity: "narayana",
    speed: "medium",
    shruthi: { gents: "7P", ladies: "4.5P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "14:32",
    singer: 'Sunitha'
  },
  {
    name: "Satya Dharma Shanti Prema Swaroopa Prashanthi Nilaya Deva",
    deity: "sarvadharma",
    speed: "medium",
    shruthi: { gents: "4P", ladies: "6P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "17:04",
    singer: 'Karthik'
  },
  {
    name: "Atma Ram Aananda Ram",
    deity: "rama",
    speed: "fast",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "21:27",
  },
  {
    name: "Madhava Madhusudana Muralidhara Mohana",
    deity: "krishna",
    speed: "fast",
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "23:54",
  },
  {
    name: "Ganga Jatadhara Gowri Shankara Girija Mano Ramana",
    deity: "shiva",
    speed: "fast",
    shruthi: { gents: "5.5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "26:08",
  },
  {
    name: "Hari Narayana Govinda Jaya Narayana Gopala",
    deity: "narayana",
    speed: "fast",
    shruthi: { gents: "6P", ladies: "3P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "29:40",
  },
  {
    name: "Manamohana Nandalaal",
    deity: "krishna",
    speed: "fast",
    shruthi: { gents: "4P", ladies: "1P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "31:47",
  },
  {
    name: "Vaheguru(3)Ji Bolo",
    deity: "guru",
    speed: "fast",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "35:14",
    singer: 'Abhishek'
  },
  {
    name: "Hey Rama Doota Hey Rama Bhakta",
    deity: "hanuman",
    speed: "fast",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "39:57",
  },
  {
    name: "Om Shivaaya Shivaaya",
    deity: "shiva",
    speed: "fast",
    shruthi: { gents: "7P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2025-09-21",
    startTime: "43:10",
    singer: 'Lavanya'
  },
  //11th January 2026
  {
    name: "Gajamukha Gajamukha",
    deity: "ganesha",
    speed: "slow",
    shruthi: { gents: "2P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "0:00",
    singer: 'Abhiram'
  },
  {
    name: "Karunya Roopa Sri Sai Deva",
    deity: "guru",
    speed: "slow",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "3:13",
    singer: 'Lavanya'
  },
  {
    name: "Jaya Devi Bhavani Maa",
    deity: "devi",
    speed: "slow",
    shruthi: { gents: "1.5P", ladies: "5.5P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "6:39",
    singer: 'G.Srinivas'
  },
  {
    name: "Allah Sai Allah Maula Sai Maula",
    deity: "sarvadharma",
    speed: "slow",
    shruthi: { gents: "2.5P", ladies: "6.5P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "11:40",
    singer: 'Gayathri'
  },
  {
    name: "Kodanda Rama Kalyana Rama",
    deity: "rama",
    speed: "slow",
    shruthi: { gents: "1.5P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "16:26",
    singer: 'Shanta Krishna'
  },
  {
    name: "Panduranga(3) Vittala",
    deity: "vittala",
    speed: "medium",
    shruthi: { ladies: "6P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "20:20",
    singer: 'Geetha Jyothi & Eshwari'
  },
  {
    name: "Ram(2) Bhajamana Hare Hare",
    deity: "rama",
    speed: "fast",
    shruthi: { gents: "5P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "23:40",
    singer: 'Sridhar'
  },
  {
    name: "Sarvatra Govinda Namasankeerthana Govinda Haro Govinda",
    deity: "sai",
    speed: "fast",
    shruthi: { gents: "7P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "26:49",
    singers:'Vathsalya & Chandini'
  },
  {
    name: "Nandalala(2) Nanda Mukunda Hari Nandalala",
    deity: "krishna",
    speed: "fast",
    shruthi: { gents: "1.5P"},
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "29:51",
    singer: 'Abhishek'
  },
  {
    name: "Jai Hari Bol Jai Sitaram",
    deity: "rama",
    speed: "fast",
    shruthi: { gents: "7P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "31:52",
    singers:'Vani & Praneetha'
  },
  {
    name: "Vanamali Vasudeva Jaganmohana Radha Ramana",
    deity: "krishna",
    speed: "fast",
    shruthi: { gents: "6P", ladies: "2P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "35:36",
    singer: 'Abhiram'
  },
  {
    name: "Shambho Shankara Parvati Ramana Pasupati Paramesha",
    deity: "shiva",
    speed: "fast",
    shruthi: { gents: "1P", ladies: "5.5P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "39:20",
    singer:'Sowmya & Sri Vidya'
  },
  {
    name: "Rama Lakshmana Janaki Jai Bolo Hanuman Ki",
    deity: "hanuman",
    speed: "fast",
    shruthi: { gents: "1P", ladies: "5P" },
    day: "Sunday",
    dateSung: "2026-01-11",
    startTime: "41:39",
    singer:'Swaroop'
  },
];
