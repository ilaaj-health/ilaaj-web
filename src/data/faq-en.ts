export const catsEn = [
  { id: 'general', label: 'General' },
  { id: 'security', label: 'Security' },
  { id: 'medical', label: 'Medical' },
  { id: 'prescription', label: 'Prescription' },
];

export const sectionsEn = [
  { id: 'general', title: 'General Questions', items: [
    { q: 'What is Ilaaj AI and how does it work?', a: 'Ilaaj AI is a Pakistan-centric digital healthcare platform using advanced AI to provide preliminary diagnostics and connect you with PMDC-verified doctors. Our AI analyzes your symptoms and guides you to the right specialist.' },
    { q: 'Is Ilaaj AI free to use?', a: 'Chatting with the AI health assistant and getting a preliminary symptom assessment is free. You only pay when a PMDC-verified doctor reviews your case and issues a verified prescription — fees start around PKR 200 and are always shown before you confirm.' },
    { q: 'How much does Ilaaj AI cost?', a: 'Doctor-verified consultations are priced in Pakistani Rupees (PKR). Fees vary by doctor and specialty, typically PKR 200 to PKR 1,500 per consultation with prescription verification included. The exact fee is shown before you pay — no hidden charges. See our Pricing page for details.' },
    { q: 'Is the service available across all cities?', a: 'Yes — online AI diagnostics and doctor consultations are available nationwide, including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad and beyond. Physical services like medicine delivery and lab tests operate in major cities.' },
    { q: 'How is Ilaaj AI different from Marham or oladoc?', a: 'Instead of only listing doctors, Ilaaj AI first understands your symptoms with AI in Urdu or English, then routes your case to a PMDC-verified doctor for a verified prescription — often in 15–30 minutes, without leaving home.' },
  ]},
  { id: 'security', title: 'Data & Privacy', items: [
    { q: 'Is my medical data secure?', a: 'Yes. We use bank-grade AES-256 encryption for all data, following HIPAA principles and local data-protection regulations. Your medical history is accessible only to you and doctors you choose.' },
    { q: 'Who can see my diagnostic results?', a: 'Only you. If you book a consultation, the assigned PMDC-verified doctor receives temporary access to your health history for an accurate second opinion.' },
    { q: 'Can I use it for sensitive health topics?', a: 'Absolutely. You can chat anonymously without revealing your name or phone number — ideal for private concerns before approaching a clinic.' },
  ]},
  { id: 'medical', title: 'Medical & Doctors', items: [
    { q: 'Can the AI doctor diagnose my illness?', a: 'The AI provides a preliminary assessment and points you to the right specialty — it does not replace a doctor. Every diagnosis and prescription is reviewed and approved by a licensed, PMDC-registered doctor before you receive it.' },
    { q: 'How does the doctor verification work?', a: 'Every doctor is verified against the PMDC registry — license number, specialty, and active practicing status confirmed before any case review.' },
    { q: 'Is an online consultation as reliable as visiting a clinic?', a: 'For common conditions — fever, allergies, skin issues, follow-ups and medication questions — an online doctor-verified consultation is safe and convenient. For emergencies or conditions needing a physical exam, we advise an in-person visit.' },
    { q: 'What languages can I chat in?', a: 'English, Urdu (Nastaleeq), and Roman Urdu. The AI auto-detects your language and replies in kind. Mixing languages works perfectly too.' },
    { q: 'How do I add family members?', a: "From the chat sidebar tap 'Add family member', enter their name, age, and relationship. Each member gets their own thread and medical history under your account." },
  ]},
  { id: 'prescription', title: 'Prescription & Delivery', items: [
    { q: 'Is an Ilaaj AI online prescription valid at pharmacies in Pakistan?', a: 'Yes. Prescriptions are issued by PMDC-registered doctors and arrive as a downloadable PDF with the doctor’s details, so they are accepted at pharmacies across Pakistan.' },
    { q: 'How long does prescription approval take?', a: 'Typically 15–30 minutes during peak hours, often faster. Once approved by a PMDC doctor, your prescription arrives as a downloadable PDF in your chat thread.' },
    { q: 'Can I get medicine delivered?', a: 'Yes — in supported cities you can order the prescribed medicines for home delivery directly after your consultation. Availability is shown at checkout.' },
    { q: 'What should I do in an emergency?', a: 'Ilaaj AI is not a replacement for emergency services. For life-threatening symptoms call 1122 or go to the nearest emergency room immediately.' },
  ]},
];
