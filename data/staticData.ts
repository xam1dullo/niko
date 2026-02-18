export interface DistrictInfo {
  name: string;
  code: string;
}

export interface RegionData {
  name: string;
  districts: DistrictInfo[];
  center: [number, number];
  zoom: number;
}

export interface Dispensary {
  id: number;
  title: string;
  subtitle: string;
  address: string;
  addressNote: string | null;
  hours: string;
  phones: string[] | null;
  coords: [number, number] | null;
}

export interface PolyclinicTest {
  step: number;
  name: string;
  location: string;
  tag: string;
  special: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DistrictData {
  district_name: string;
  region_name: string;
  has_data: boolean;
  dispensaries: Dispensary[];
  polyclinicTests: PolyclinicTest[];
  conclusion: {
    location: string;
    description: string;
  };
  contact: {
    name: string;
    description: string;
    phone: string | null;
    telegram: string | null;
  };
  faq: FAQItem[];
}

export const REGIONS: Record<string, RegionData> = {
  toshkent_shahar: {
    name: "Toshkent shahri",
    center: [41.311081, 69.240562],
    zoom: 11,
    districts: [
      { name: "Bektemir", code: "bektemir" },
      { name: "Chilonzor", code: "chilanzar" },
      { name: "Mirobod", code: "mirabad" },
      { name: "Mirzo Ulug'bek", code: "mirzo_ulugbek" },
      { name: "Olmazor", code: "almazar" },
      { name: "Sergeli", code: "sergeli" },
      { name: "Shayxontohur", code: "shaykhantokhur" },
      { name: "Uchtepa", code: "uchtepa" },
      { name: "Yakkasaroy", code: "yakkasaray" },
      { name: "Yangihayot", code: "yangihayot" },
      { name: "Yashnobod", code: "yashnobod" },
      { name: "Yunusobod", code: "yunusabad" },
    ],
  },
  toshkent_viloyat: {
    name: "Toshkent viloyati",
    center: [41.162, 69.86],
    zoom: 9,
    districts: [
        {name: "Bekobod", code: "bekabad"},
        {name: "Boʻstonliq", code: "bostanlik"},
        {name: "Boʻka", code: "buka"},
        {name: "Chinoz", code: "chinaz"},
        {name: "Qibray", code: "kibray"},
        {name: "Ohangaron", code: "akhangaran"},
        {name: "Oqqoʻrgʻon", code: "akkurgan"},
        {name: "Parkent", code: "parkent"},
        {name: "Piskent", code: "pskent"},
        {name: "Quyi Chirchiq", code: "kuyichirchik"},
        {name: "Oʻrta Chirchiq", code: "urtachirchik"},
        {name: "Yangiyoʻl", code: "yangiyul"},
        {name: "Yuqori Chirchiq", code: "yukarichirchik"},
        {name: "Zangiota", code: "zangiata"}
    ]
  },
  andijon: {
    name: "Andijon viloyati",
    center: [40.7821, 72.3442],
    zoom: 10,
    districts: [
      { name: "Andijon sh.", code: "andijan" },
      { name: "Ulug'nor", code: "ulugnar" },
      { name: "Xo'jaobod", code: "khadjaabad" },
      { name: "Marhamat", code: "markhamat" },
      { name: "Asaka", code: "asaka" },
      { name: "Shahrixon", code: "shakhrixan" },
      { name: "Bo'ston", code: "boz" },
      { name: "Jalaquduq", code: "djalalkuduk" },
      { name: "Buloqboshi", code: "bulakbashi" },
      { name: "Qo'rg'ontepa", code: "kurgantepa" },
      { name: "Baliqchi", code: "balikchi" },
      { name: "Xonobod", code: "khanabad" },
      { name: "Oltinko'l", code: "altinkul" },
      { name: "Andijon t.", code: "andijan" },
      { name: "Izboskan", code: "izboskan" },
      { name: "Paxtaobod", code: "paxtaabad" }
    ],
  },
  buxoro: {
    name: "Buxoro viloyati",
    center: [39.7747, 64.4286],
    zoom: 9,
    districts: [
        { name: "G'ijduvon", code: "gijduvan" },
        { name: "Jondor", code: "jondor" },
        { name: "Olot", code: "alat" },
        { name: "Kogon", code: "kagan" },
        { name: "Shofirkon", code: "shafirkan" },
        { name: "Romitan", code: "rаmitan" },
        { name: "Peshku", code: "peshku" },
        { name: "Vobkent", code: "vabkent" },
        { name: "Buxoro sh.", code: "bukhara" },
        { name: "Buxoro t.", code: "bukhara" },
        { name: "Qorako'l", code: "karakul" },
        { name: "Qorovulbozor", code: "karaulbazar" }
    ],
  },
  fargona: {
    name: "Farg'ona viloyati",
    center: [40.3863, 71.7865],
    zoom: 9,
    districts: [
        { name: "Qo'qon", code: "kokand" },
        { name: "Furqat", code: "furkat" },
        { name: "O'zbekiston", code: "uzbekistan" },
        { name: "Beshariq", code: "besharik" },
        { name: "So'x", code: "sokh" },
        { name: "Farg'ona", code: "fergana" },
        { name: "Qo'shtepa", code: "kushtepa" },
        { name: "Buvayda", code: "buvayda" },
        { name: "Dang'ara", code: "dangara" },
        { name: "Yozyovon", code: "yazyavan" },
        { name: "Quva", code: "kuva" },
        { name: "Toshloq", code: "tashlak" },
        { name: "Marg'ilon", code: "margilan" },
        { name: "Uchko'prik", code: "uchkuprik" },
        { name: "Quvasoy", code: "kuvasay" },
        { name: "Oltiariq", code: "altiarik" },
        { name: "Rishton", code: "rishtan" },
        { name: "Bog'dod", code: "bagdad" }
    ],
  },
  jizzax: {
    name: "Jizzax viloyati",
    center: [40.1169, 67.8415],
    zoom: 9,
    districts: [
        { name: "Forish", code: "farish" },
        { name: "Mirzacho'l", code: "mirzachul" },
        { name: "Arnasoy", code: "arnasay" },
        { name: "Yangiobod", code: "yangiabad" },
        { name: "Jizzax", code: "dzhizak" },
        { name: "Baxmal", code: "bakhmal" },
        { name: "G'allaorol", code: "gallyaaral" },
        { name: "Do'stlik", code: "dustlik" },
        { name: "Zafarobod", code: "zafarabad" },
        { name: "Zomin", code: "zaаmin" },
        { name: "Zarbdor", code: "zarbdar" },
        { name: "Paxtakor", code: "paxtakor" },
        { name: "Sharof Rashidov", code: "sharof" }
    ],
  },
  namangan: {
    name: "Namangan viloyati",
    center: [40.9984, 71.6726],
    zoom: 10,
    districts: [
        { name: "Yangiqo'rg'on", code: "yangikurgan" },
        { name: "Kosonsoy", code: "kasansay" },
        { name: "Namangan sh.", code: "namangan" },
        { name: "Uychi", code: "uychi" },
        { name: "Chortoq", code: "chartak" },
        { name: "Norin", code: "narin" },
        { name: "Uchqo'rg'on", code: "uchkurgan" },
        { name: "Mingbuloq", code: "mingbulak" },
        { name: "Chust", code: "chust" },
        { name: "Pop", code: "pap" },
        { name: "To'raqo'rg'on", code: "turakurgan" }
    ],
  },
  navoiy: {
    name: "Navoiy viloyati",
    center: [40.1031, 65.3725],
    zoom: 8,
    districts: [
        { name: "Karmana", code: "karmana" },
        { name: "Uchquduq", code: "uchkuduk" },
        { name: "Konimex", code: "kanimekh" },
        { name: "Tomdi", code: "tamdi" },
        { name: "Navbahor", code: "navbakhor" },
        { name: "Nurota", code: "nurata" },
        { name: "Navoiy", code: "navoi" },
        { name: "Qiziltepa", code: "kiziltepa" },
        { name: "Xatirchi", code: "khatirchi" },
        { name: "Zarafshon", code: "zarafshan" }
    ],
  },
  qashqadaryo: {
    name: "Qashqadaryo viloyati",
    center: [38.8605, 66.0464],
    zoom: 8,
    districts: [
        { name: "Yakkabog'", code: "yakkabag" },
        { name: "Kitob", code: "kitab" },
        { name: "Qamashi", code: "kamashi" },
        { name: "Qarshi", code: "karshi" },
        { name: "Kasbi", code: "kasbi" },
        { name: "Mirishkor", code: "mirishkar" },
        { name: "Nishon", code: "nishan" },
        { name: "G'uzor", code: "guzar" },
        { name: "Dehqonobod", code: "dehkanabad" },
        { name: "Koson", code: "kasan" },
        { name: "Muborak", code: "mubarek" },
        { name: "Chiroqchi", code: "chirakchi" },
        { name: "Shahrisabz", code: "shakhrisabz" }
    ],
  },
  samarqand: {
    name: "Samarqand viloyati",
    center: [39.6542, 66.9597],
    zoom: 9,
    districts: [
        { name: "Bulung'ur", code: "bulungur" },
        { name: "Paxtachi", code: "pakhtachi" },
        { name: "Pastdarg'om", code: "pastdargom" },
        { name: "Ishtixon", code: "ishtikhan" },
        { name: "Narpay", code: "narpay" },
        { name: "Kattaqo'rg'on sh.", code: "kattakurgan" },
        { name: "Kattaqo'rg'on t.", code: "kattakurgan" },
        { name: "Qo'shrabot", code: "koshrabad" },
        { name: "Samarqand t.", code: "samarkand" },
        { name: "Urgut", code: "urgut" },
        { name: "Samarqand sh.", code: "samarkand" },
        { name: "Toyloq", code: "taylak" },
        { name: "Jomboy", code: "dzhambay" },
        { name: "Payariq", code: "payarik" },
        { name: "Oqdaryo", code: "akdarya" },
        { name: "Nurobod", code: "nurabad" }
    ],
  },
  sirdaryo: {
    name: "Sirdaryo viloyati",
    center: [40.8422, 68.6631],
    zoom: 9,
    districts: [
        { name: "Guliston t.", code: "gulistan" },
        { name: "Sayxunobod", code: "saykhunabad" },
        { name: "Guliston sh.", code: "gulistan" },
        { name: "Oqoltin", code: "akaltin" },
        { name: "Sirdaryo", code: "sirdarya" },
        { name: "Boyovut", code: "bayaut" },
        { name: "Shirin", code: "shirin" },
        { name: "Yangiyer", code: "yangiyer" },
        { name: "Sardoba", code: "sardoba" },
        { name: "Xovos", code: "khavas" },
        { name: "Mirzaobod", code: "mirzaabad" }
    ],
  },
  surxondaryo: {
    name: "Surxondaryo viloyati",
    center: [37.934, 67.5507],
    zoom: 8,
    districts: [
        { name: "Boysun", code: "baysun" },
        { name: "Muzrabot", code: "muzrabad" },
        { name: "Sherobod", code: "sherabad" },
        { name: "Angor", code: "angor" },
        { name: "Termiz sh.", code: "termez" },
        { name: "Termiz t.", code: "termez" },
        { name: "Sariosiyo", code: "sariasiya" },
        { name: "Jarqo'rg'on", code: "dzharkurgan" },
        { name: "Qiziriq", code: "kizirik" },
        { name: "Sho'rchi", code: "shurchi" },
        { name: "Qumqo'rg'on", code: "kumkurgan" },
        { name: "Uzun", code: "uzun" },
        { name: "Oltinsoy", code: "altinsay" },
        { name: "Denov", code: "denau" }
    ],
  },
  xorazm: {
    name: "Xorazm viloyati",
    center: [41.55, 60.6333],
    zoom: 9,
    districts: [
        { name: "Bog'ot", code: "bagat" },
        { name: "Gurlan", code: "gurlen" },
        { name: "Qo'shko'pir", code: "koshkupir" },
        { name: "Shovot", code: "shavat" },
        { name: "Xiva t.", code: "khiva" },
        { name: "Xazorasp", code: "khazarasp" },
        { name: "Xonqa", code: "khanka" },
        { name: "Yangiariq", code: "yangiarik" },
        { name: "Yangibozor", code: "yangibazar" },
        { name: "Urganch", code: "urgench" },
        { name: "Xiva sh.", code: "khiva" }
    ],
  },
   qoraqalpogiston: {
    name: "Qoraqalpog'iston Respublikasi",
    center: [43.6667, 59.2],
    zoom: 7,
    districts: [
        { name: "Amudaryo", code: "amudarya" },
        { name: "Chimboy", code: "chimbay" },
        { name: "Qanliko'l", code: "kanlikul" },
        { name: "Shumanay", code: "shumanay" },
        { name: "Xo'jayli", code: "khojeyli" },
        { name: "Kegeyli", code: "kegeyli" },
        { name: "Mo'ynoq", code: "muynak" },
        { name: "Nukus", code: "nukus" },
        { name: "Qorao'zak", code: "karauzyak" },
        { name: "Qo'ng'irot", code: "kungrad" },
        { name: "Taxtako'pir", code: "takhtakupir" },
        { name: "To'rtko'l", code: "turtkul" },
        { name: "Beruniy", code: "beruniy" },
        { name: "Ellikqala", code: "ellikkala" }
    ],
  }
};

export const MIROBOD_DATA: DistrictData = {
  "district_name": "Mirobod",
  "region_name": "Toshkent shahri",
  "has_data": true,

  "dispensaries": [
    {
      "id": 1,
      "title": "🔬 Dermatovenerolog",
      "subtitle": "8-sonli Tumanlararo Teri-tanosil kasalliklar dispanseri",
      "address": "Yashnobod tumani, Zoxidov ko'chasi, 8-uy",
      "addressNote": "(Jarqo'rg'on, Davr bekati)",
      "hours": "08:00 – 12:00",
      "phones": ["71-291-47-80", "71-291-33-71"],
      "coords": [41.3672, 69.3116]
    },
    {
      "id": 2,
      "title": "🫁 Ftiziator",
      "subtitle": "5-son Tumanlararo Ftiziateriya dispanseri",
      "address": "Mirobod tumani, 8-Mart ko'chasi, 59-uy",
      "addressNote": null,
      "hours": "08:00 – 16:00",
      "phones": ["71-283-98-81"],
      "coords": [41.2809, 69.2954]
    },
    {
      "id": 3,
      "title": "🧠 Psixiatr",
      "subtitle": "2-son Shahar Ruhiy-asab kasalliklari dispanseri",
      "address": "Yashnobod tumani, Qorasuv ko'chasi, 25-uy",
      "addressNote": "(Lisunova, Dvorets Aviastroiteley)",
      "hours": "08:00 – 16:00",
      "phones": ["71-294-74-65"],
      "coords": [41.2939, 69.3400]
    },
    {
      "id": 4,
      "title": "💊 Narkolog",
      "subtitle": "Narkologiya dispanseri — Toshkent shahar filiali (RIRSITMNB)",
      "address": "Yunusobod tumani, Bobodehqon MFY, 19-mavze, 51-uy",
      "addressNote": "(Nuroniylar sanatoriyasi yaqinida)",
      "hours": "08:00 – 15:00",
      "phones": null,
      "coords": [41.3804, 69.3166]
    }
  ],

  "polyclinicTests": [
    {
      "step": 1,
      "name": "OIV tekshiruvi (117-kod)",
      "location": "🚪 1-qavat, 14a-xona",
      "tag": "Du/Chor/Ju 08–09",
      "special": true
    },
    {
      "step": 2,
      "name": "Umumiy qon va qondagi qand",
      "location": "🚪 2-qavat, 35-xona",
      "tag": "Laboratoriya",
      "special": false
    },
    {
      "step": 3,
      "name": "EKG (elektrokardiogramma)",
      "location": "🚪 2-qavat, 32-xona",
      "tag": "Yurak",
      "special": false
    },
    {
      "step": 4,
      "name": "UTT tekshiruvi (ultratovush)",
      "location": "🚪 1-qavat, 14-xona",
      "tag": "Ultratovush",
      "special": false
    },
    {
      "step": 5,
      "name": "Ginekolog",
      "location": "🚪 2-qavat, 17-xona",
      "tag": "Ayollar",
      "special": false
    },
    {
      "step": 6,
      "name": "Urolog",
      "location": "🚪 2-qavat, 30-xona",
      "tag": "Erkaklar",
      "special": false
    },
    {
      "step": 7,
      "name": "Endokrinolog",
      "location": "🚪 2-qavat, 24-xona",
      "tag": "Gormon",
      "special": false
    },
    {
      "step": 8,
      "name": "Revmatolog",
      "location": "🚪 2-qavat, 29-xona",
      "tag": "Bo'g'im",
      "special": false
    }
  ],

  "conclusion": {
    "location": "Mirobod TTB MKP — 3-qavat, 49-xona",
    "description": "Barcha dispanser va poliklinika ma'lumotnomalarini olib keling. Shu yerda yakuniy tibbiy xulosa beriladi."
  },

  "contact": {
    "name": "Mirobod TTB — Masul Shaxs",
    "description": "Nikoh tibbiy ko'rigi bo'yicha barcha savollaringizga javob beramiz",
    "phone": null,
    "telegram": "MN_889G"
  },

  "faq": [
    {
      "question": "📋 Qanday hujjatlar kerak?",
      "answer": "Pasport asl nusxasi va fotokopiyasi, propiska (ro'yxatdan o'tish) fotokopiyasi. Ayrim joylar qo'shimcha hujjat so'rashi mumkin."
    },
    {
      "question": "⏱️ Hammasi qancha vaqt oladi?",
      "answer": "Odatda 2–4 kun. Dispanserlarga alohida kunlarda borish qulay. Poliklinika tekshiruvlarini bir kunda o'tish mumkin, lekin OIV uchun faqat Du/Chor/Juma kunlari boring."
    },
    {
      "question": "💰 Tekshiruvlar pulli yoki beplatmi?",
      "answer": "Asosiy tibbiy ko'rik bepul. Lekin ba'zi dispanserlarda hujjat rasmiylashtiruvi uchun to'lov bo'lishi mumkin. Aniq ma'lumot uchun masul shaxs bilan bog'laning."
    },
    {
      "question": "🕐 Qaysi dispanserlarga avval borish kerak?",
      "answer": "Ketma-ketlik muhim emas. Lekin Dermatovenerologga 08:00–12:00 orasida boring (qabul vaqti qisqa). Narkolog 08:00–15:00 gacha."
    },
    {
      "question": "📞 Savollarim bo'lsa kimga murojaat qilaman?",
      "answer": "Quyidagi \"Bog'lanish\" bo'limidagi telefon yoki Telegram orqali masul shaxs bilan bog'laning. Javob vaqti — ish kuni soatlari ichida."
    }
  ]
};
