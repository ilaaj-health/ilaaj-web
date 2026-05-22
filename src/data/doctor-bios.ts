// Hand-written, unique bios per doctor (keyed by slug). en = English, pk = Roman Urdu.
export interface Bio { en: string; pk: string; }

export const bios: Record<string, Bio> = {
  'dr-m-mujeeb-ur-rehman': {
    en: 'Dr. M Mujeeb ur Rehman is a PMDC-registered General Physician (MBBS, RMP) with 5 years of frontline clinical practice. He focuses on accurate first-contact diagnosis for everyday complaints — fevers, infections, body aches and seasonal illness — and is known for explaining conditions in simple, reassuring language. On Ilaaj AI he reviews each patient case and signs off prescriptions personally.',
    pk: 'Dr. M Mujeeb ur Rehman aik PMDC-registered General Physician (MBBS, RMP) hain jinke paas 5 saal ka clinical tajurba hai. Woh bukhar, infections, jismani dard aur mausmi bimariyon ki sahih tashkhees par tawajjo dete hain aur mareezon ko aasan zubaan mein samjhate hain. Ilaaj AI par har prescription woh khud review kar ke approve karte hain.',
  },
  'dr-maria-mohsin': {
    en: 'Dr. Maria Mohsin is an MBBS General Physician with 4 years of experience managing common adult and family-health concerns. She takes a careful, patient-first approach to fever, flu, stomach issues and minor infections, and is mindful about prescribing antibiotics only when truly needed. Every prescription she approves on Ilaaj AI is doctor-verified.',
    pk: 'Dr. Maria Mohsin aik MBBS General Physician hain jinke paas 4 saal ka tajurba hai. Woh bukhar, flu, pet ke masail aur maamooli infections mein mareez-dost approach rakhti hain aur antibiotics sirf zaroorat par tajweez karti hain. Ilaaj AI par unki approve ki gayi har prescription doctor-verified hoti hai.',
  },
  'dr-sikandar-zulfiqar': {
    en: 'Dr. Sikandar Zulfiqar is a PMDC-registered General Physician (MBBS) with 4 years treating patients across general medicine, both in person and online. He has a practical, evidence-based style and is comfortable triaging a wide range of day-to-day symptoms quickly and safely. He personally reviews each Ilaaj AI case before a prescription is issued.',
    pk: 'Dr. Sikandar Zulfiqar aik PMDC-registered General Physician (MBBS) hain jo 4 saal se general medicine mein mareezon ka ilaj kar rahe hain. Unka andaz amli aur evidence-based hai aur woh rozmarra ki alamaat ko jaldi aur mehfooz tareeqe se handle karte hain. Har Ilaaj AI case ko prescription se pehle woh khud dekhte hain.',
  },
  'dr-tabinda': {
    en: 'Dr. Tabinda is an MBBS General Physician with 4 years of clinical experience and a special interest in everyday health needs of women and children. She is approachable and thorough, making her a good fit for families seeking quick, trustworthy medical advice. On Ilaaj AI she ensures every prescription meets PMDC standards.',
    pk: 'Dr. Tabinda aik MBBS General Physician hain jinke paas 4 saal ka tajurba hai, aur woh khaaskar khawateen aur bachon ki rozmarra sehat mein dilchaspi rakhti hain. Woh khush-akhlaq aur ba-tafseel hain, isliye un families ke liye munasib hain jo jaldi aur qabil-e-aitmaad mashwara chahti hain. Ilaaj AI par har prescription PMDC standard ke mutabiq hoti hai.',
  },
  'dr-wasifa-ahmad': {
    en: 'Dr. Wasifa Ahmad is a General Practitioner (MBBS) with over 4 years of primary-care experience. She emphasises preventive health — early screening, lifestyle guidance and timely treatment — alongside managing acute illnesses. Patients on Ilaaj AI receive her doctor-verified review on every case.',
    pk: 'Dr. Wasifa Ahmad aik General Practitioner (MBBS) hain jinke paas 4 saal se zyada primary-care ka tajurba hai. Woh ehtiyaati sehat — waqt par screening, lifestyle guidance aur fori ilaj — par zor deti hain. Ilaaj AI par har case par unka doctor-verified review milta hai.',
  },
  'dr-sabeen-fatima-rizvi': {
    en: 'Dr. Sabeen Fatima Rizvi is a senior General Practitioner (MBBS, MCPS) with more than 10 years of clinical experience. Her postgraduate MCPS training adds depth in managing chronic conditions like diabetes and hypertension alongside routine family care. She brings a decade of judgement to every prescription she verifies on Ilaaj AI.',
    pk: 'Dr. Sabeen Fatima Rizvi aik senior General Practitioner (MBBS, MCPS) hain jinke paas 10 saal se zyada ka clinical tajurba hai. Unki MCPS training se unhein diabetes aur blood pressure jaisi chronic bimariyon ko sanbhalne mein khaas mahaarat hai. Ilaaj AI par har prescription mein unka aik dahaai ka tajurba shaamil hota hai.',
  },
  'dr-sara-ali-khan': {
    en: 'Dr. Sara Ali Khan is a PMDC-registered Gynaecologist (MBBS, FCPS, MRCOG-1) with 10 years of experience in women\'s health. She supports patients through menstrual concerns, pregnancy care, PCOS, fertility questions and reproductive health, with international MRCOG-1 training behind her clinical approach. On Ilaaj AI she personally reviews gynaecology cases.',
    pk: 'Dr. Sara Ali Khan aik PMDC-registered Gynaecologist (MBBS, FCPS, MRCOG-1) hain jinke paas khawateen ki sehat mein 10 saal ka tajurba hai. Woh menstrual masail, hamal, PCOS, fertility aur reproductive health mein madad farmati hain, aur unki training mein international MRCOG-1 bhi shaamil hai. Ilaaj AI par woh gynae cases khud review karti hain.',
  },
  'dr-saira-zafar': {
    en: 'Dr. Saira Zafar is a General Practitioner (MBBS, MHPE) with over 10 years of experience and a Master\'s in Health Professions Education. She blends hands-on patient care with a teacher\'s clarity, helping patients genuinely understand their condition and treatment. Every Ilaaj AI prescription she approves is carefully reviewed.',
    pk: 'Dr. Saira Zafar aik General Practitioner (MBBS, MHPE) hain jinke paas 10 saal se zyada tajurba aur Health Professions Education mein Master\'s degree hai. Woh ilaj ke saath saath mareez ko uski bimari aur treatment achi tarah samjhati hain. Ilaaj AI par unki approve ki gayi har prescription ghor se review hoti hai.',
  },
  'dr-umme-aeman-khan': {
    en: 'Dr. Umme Aeman Khan is a PMDC-registered Dermatologist (FCPS Dermatology, SCE UK) with 11 years of specialist experience in skin, hair and nail conditions. From acne, eczema and pigmentation to hair fall and allergic rashes, she offers evidence-based dermatology backed by UK specialty certification. She reviews every skin case on Ilaaj AI herself.',
    pk: 'Dr. Umme Aeman Khan aik PMDC-registered Dermatologist (FCPS Dermatology, SCE UK) hain jinke paas jild, baal aur nakhun ke masail mein 11 saal ka mahir tajurba hai. Acne, eczema, pigmentation, baal girne aur allergic rashes — sab mein woh UK certification ke saath evidence-based ilaj faraham karti hain. Ilaaj AI par har skin case woh khud dekhti hain.',
  },
  'dr-hadia-nadeem': {
    en: 'Dr. Hadia Nadeem is a PMDC-registered General Physician (MBBS, RMP) with 6 years of clinical practice. She handles a broad mix of everyday illnesses — respiratory infections, digestive complaints, fever and general wellness — with a calm, detail-oriented manner. On Ilaaj AI, prescriptions are issued only after her review.',
    pk: 'Dr. Hadia Nadeem aik PMDC-registered General Physician (MBBS, RMP) hain jinke paas 6 saal ka clinical tajurba hai. Woh saans ke infections, hazmay ke masail, bukhar aur aam sehat ko pur-sukoon aur ba-tafseel andaz mein dekhti hain. Ilaaj AI par prescription sirf unke review ke baad jaari hoti hai.',
  },
  'dr-muneeb-mubashar': {
    en: 'Dr. Muneeb Mubashar is a General Practitioner (MBBS, MPH) with 4 years of experience and a Master\'s in Public Health. His public-health background means he looks beyond the symptom to prevention, lifestyle and long-term wellbeing. He personally verifies the cases he treats on Ilaaj AI.',
    pk: 'Dr. Muneeb Mubashar aik General Practitioner (MBBS, MPH) hain jinke paas 4 saal ka tajurba aur Public Health mein Master\'s hai. Unka public-health background unhein alamat se aage barh kar ehtiyaat, lifestyle aur lambay arsay ki sehat dekhne par maael karta hai. Ilaaj AI par jin cases ka ilaj karte hain unhein khud verify karte hain.',
  },
  'dr-ibtasam-ahmad': {
    en: 'Dr. Ibtasam Ahmad is a PMDC-registered General Practitioner (MBBS, PGR) with 7 years of clinical experience, including ongoing postgraduate training. He manages a wide spectrum of general-medicine concerns and stays current with up-to-date treatment guidelines. Every prescription he approves on Ilaaj AI is doctor-verified.',
    pk: 'Dr. Ibtasam Ahmad aik PMDC-registered General Practitioner (MBBS, PGR) hain jinke paas 7 saal ka clinical tajurba hai, jis mein jaari postgraduate training bhi shaamil hai. Woh general medicine ke wasee masail sanbhalte hain aur latest treatment guidelines se waqif rehte hain. Ilaaj AI par unki approve ki gayi har prescription doctor-verified hoti hai.',
  },
};
