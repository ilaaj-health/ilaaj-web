export const catsPk = [
  { id: 'general', label: 'Aam Sawalat' },
  { id: 'security', label: 'Privacy & Data' },
  { id: 'medical', label: 'Medical & Doctors' },
  { id: 'prescription', label: 'Prescription' },
];

export const sectionsPk = [
  { id: 'general', title: 'Aam Sawalat', items: [
    { q: 'Ilaaj AI kya hai aur yeh kaise kaam karta hai?', a: 'Ilaaj AI Pakistan ka pehla AI-powered digital health platform hai. Aap apne symptoms bataen, AI assess karta hai, aur PMDC-verified doctor verify karta hai. 24/7 available.' },
    { q: 'Kya yeh service poore Pakistan mein available hai?', a: 'Haan — digital consultation aur AI diagnostics poore mulk mein available hain. Medicine delivery aur lab tests Karachi, Lahore, Islamabad aur Faisalabad mein operate karte hain.' },
    { q: 'Ilaaj AI ki qeemat kitni hai?', a: 'Doctor-verified consultation paid hai aur Pakistani Rupees (PKR) mein priced hai. Fees fixed nahi — doctor aur specialty ke mutabiq mukhtalif hoti hai, aam tor par PKR 200 se PKR 1,500 fi consultation, jis mein prescription verification shamil hai. Exact fee payment se pehle dikhai jaati hai. Koi hidden charges nahi. Tafseel ke liye hamara Pricing page dekhein.' },
  ]},
  { id: 'security', title: 'Privacy & Data', items: [
    { q: 'Kya mera medical data secure hai?', a: 'Haan. Hum bank-grade AES-256 encryption use karte hain, HIPAA principles follow karte hain. Aapki medical history sirf aap aur jo doctor aap choose karein unhe accessible hai.' },
    { q: 'Meri diagnostic results kaun dekh sakta hai?', a: 'Sirf aap. Agar aap consultation book karte hain, assigned PMDC-verified doctor temporarily aapki health history access karta hai accurate second opinion ke liye.' },
    { q: 'Kya main sensitive health topics ke liye use kar sakta hoon?', a: 'Bilkul. Aap anonymously chat kar sakte hain — bina naam ya phone number reveal kiye. Private concerns ke liye ideal, clinic jane se pehle.' },
  ]},
  { id: 'medical', title: 'Medical & Doctors', items: [
    { q: 'Doctor verification kaise hoti hai?', a: 'Har doctor PMDC registry ke against verify hota hai — license number, specialty, aur active practicing status confirm hota hai kisi bhi case review se pehle.' },
    { q: 'Main kis language mein chat kar sakta hoon?', a: 'English, Urdu (Nastaleeq), aur Roman Urdu. AI automatically aapki language detect karta hai aur usi mein reply karta hai. Mix karna bhi perfectly kaam karta hai.' },
    { q: 'Family members kaise add karein?', a: "Chat sidebar se 'Add family member' tap karein, naam, umar aur relationship enter karein. Har member ka apna thread aur medical history hoga aapke account mein." },
  ]},
  { id: 'prescription', title: 'Prescription & Delivery', items: [
    { q: 'Prescription approval mein kitna time lagta hai?', a: 'Typically 15–30 minute, often faster. PMDC doctor se approve hone ke baad prescription downloadable PDF ke roop mein aapke chat thread mein aa jaata hai.' },
    { q: 'Emergency mein kya karein?', a: 'Ilaaj AI emergency services ka replacement nahi hai. Life-threatening symptoms ke liye 1122 call karein ya nearest emergency room jayen — foran.' },
  ]},
];
