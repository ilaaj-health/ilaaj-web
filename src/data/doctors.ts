export interface Doctor {
  slug: string;
  name: string;
  spec: string;
  qual: string;
  exp: string;
  photo: string;
  photoLg: string;
}

function opt(url: string, w: number) {
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${w},h_${w},c_fill,g_face/`);
}

const C = 'https://res.cloudinary.com/dpaz2mhy6/image/upload/';
const PLACEHOLDER = 'v1774861881/placeholder-doctor.png';

const raw = [
  { name: 'Dr. M Mujeeb ur Rehman', spec: 'General Physician', qual: 'MBBS, RMP', exp: '5 Yrs', img: 'v1774861881/l2qbg2ewfvhjvg2rmxsl.jpg' },
  { name: 'Dr. Maria Mohsin', spec: 'General Physician', qual: 'MBBS', exp: '4 Yrs', img: 'v1774970468/n6aksbu49oalzyjl4qzg.jpg' },
  { name: 'Dr. Sikandar Zulfiqar', spec: 'General Physician', qual: 'MBBS', exp: '4 Yrs', img: 'v1774955149/edxuypgskvkedpdq5dqd.jpg' },
  { name: 'Dr. Tabinda', spec: 'General Physician', qual: 'MBBS', exp: '4 Yrs', img: 'v1775058269/xetfs13oxme0bkvqpnpj.jpg' },
  { name: 'Dr. Wasifa Ahmad', spec: 'General Practitioner', qual: 'MBBS', exp: '4+ Yrs', img: 'v1775137767/wrihl0ul6buppj7conzr.jpg' },
  { name: 'Dr. Sabeen Fatima Rizvi', spec: 'General Practitioner', qual: 'MBBS, MCPS', exp: '10+ Yrs', img: 'v1775648768/e2j611x9q2viow8s6mbt.png' },
  { name: 'Dr. Sara Ali Khan', spec: 'Gynaecologist', qual: 'MBBS, FCPS, MRCOG-1', exp: '10 Yrs', img: 'v1776350887/ged3x1h29plfzzblkrwh.png' },
  { name: 'Dr. Saira Zafar', spec: 'General Practitioner', qual: 'MBBS, MHPE', exp: '10.5 Yrs', img: 'v1776334958/zwpaowaamnt8euxzlkzh.png' },
  { name: 'Dr. Umme Aeman Khan', spec: 'Dermatologist', qual: 'FCPS Derm, SCE UK', exp: '11 Yrs', img: 'v1777285210/hjtt4bqgajqutvxsh783.png' },
  { name: 'Dr. Hadia Nadeem', spec: 'General Physician', qual: 'MBBS (RMP)', exp: '6 Yrs', img: 'v1777026468/djo9viajggkqf2kjkn0j.jpg' },
  { name: 'Dr. Muneeb Mubashar', spec: 'General Practitioner', qual: 'MBBS, MPH', exp: '4 Yrs', img: 'v1776844359/qdfkg95niecs74jtefgm.jpg' },
  { name: 'Dr. Ibtasam Ahmad', spec: 'General Practitioner', qual: 'MBBS, PGR', exp: '7 Yrs', img: 'v1777365610/pbf9ztkeyfytmbtm4dsc.jpg' },
  { name: 'Dr. Ayesha Rashid', spec: 'General Physician', qual: 'MBBS, RMP', exp: '2 Yrs', img: 'v1781080297/zz9azsaxwivd7lq4dvdf.jpg' },
  { name: 'Dr. Waqas Gondal', spec: 'General Physician', qual: 'BSc, MBBS, MD', exp: '10 Yrs', img: 'v1777463924/houbvfpagsenyg03ltur.jpg' },
  { name: 'Dr. Muhammad Waqas', spec: 'General Physician', qual: 'MBBS', exp: '3 Yrs', img: 'v1776319721/ihntsflyie7xx0gw6awl.jpg' },
  { name: 'Dr. Muhammad Ammad', spec: 'General Physician', qual: 'MBBS, BSc', exp: '2 Yrs', img: 'v1775052795/neutkyyyjgrq5gcoz5rj.jpg' },
  { name: 'Dr. Wadood Khan', spec: 'General Physician', qual: 'MBBS', exp: '11 Yrs', img: 'v1773748446/fi3hmia3erqrxpfsba8w.webp' },
  { name: 'Dr. Altaf H. Malik', spec: 'Dermatologist', qual: 'MBBS, FCPS Derm', exp: '10 Yrs', img: 'v1773748446/fi3hmia3erqrxpfsba8w.webp' },
  { name: 'Dr. Saira Zahid Khan', spec: 'General Physician', qual: 'MBBS', exp: '6 Yrs', img: 'v1780304931/muyu69ivrafbkjqrqu2d.jpg' },
  { name: 'Dr. Mahnoor Zafar', spec: 'General Physician', qual: 'MBBS', exp: '5 Yrs', img: 'v1776350887/ged3x1h29plfzzblkrwh.png' },
];

export const doctors: Doctor[] = raw.map((d) => ({
  slug: d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  name: d.name,
  spec: d.spec,
  qual: d.qual,
  exp: d.exp,
  photo: opt(C + (d.img || PLACEHOLDER), 176),
  photoLg: opt(C + (d.img || PLACEHOLDER), 320),
}));

export function getDoctor(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}
