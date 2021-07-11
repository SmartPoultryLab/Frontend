export interface ExaminationData {
  Clinical_Signs:string[],
  Diagnoses:string[],
  PM_Lesions:string[],

}
export const Clinical_Signs = [
  "Anaemia",
  "Anorexia",
  "Bloody diarrhea",
  "Blue and cyanotic comb",
  "Brown diarrhea",
  "Bursitis sternalis (inflammation of the sternal bursa)",
  "Chickens are drowsy, with eyes closed, ruffled feathers and grouped near the sources of heat.",
  "Coma (HSMS)",
  "Conjunctivitis",
  "Coughing",
  "Coughing, sneezing, rales (IB)",
  "Crop fluid visible from oral cavity",
  "Depression and ruffled feathers",
  "Diarrhea, dehydration and pasted vent",
  "Dyspnea and rales (IB)",
  "Edema of eyelid and periorbital sinus (MG)",
  "Epiphora (increased lacrimation) (IB)",
  "Facial edema",
  "Feathers around the vent are usually stained with faeces containing plenty of urates (G).",
  "Gasping and respiratory distress (IB)",
  "Green and watery diarrhea",
  "Head tremors",
  "Huddling, trembling, blindness (HSMS)",
  "Incoordination and ataxia",
  "Lameness",
  "Loud chirping, litter eating, ataxia (HSMS)",
  "Macerated abdominal wall",
  "Muscular tremors",
  "Nasal discharge",
  "Oedema of tibiotarsal joints",
  "Orange mucoid droppings (NE,HSMS)",
  "Panophthalmitis (inflammation of all tissues of the eyeball).",
  "Paralysis",
  "Pododermatitis and inflamed footpad",
  "Prostration with outstretched legs (HSMS)",
  "Reluctant to move",
  "Sneezing and cough",
  "The area around the vent is stained with blood",
  "Torticollis",
  "Tracheal rales",
  "Watery diarrhea",
  "White diarrhea",
  "Yellow diarrhea",
];


export const Diagnoses = [
  "Acute selenium intoxication",
  "Amyloidosis",
  "Ascaridiosis",
  "Aspergillosis",
  "Aspergillus granulomatous dermatitis",
  "Associated Adenovirus Infections",
  "Avian influenza",
  "Avian Neoplastic Diseases",
  "Avian tuberculosis",
  "Botulism",
  "Candidiasis",
  "Cannibalism",
  "CCRD",
  "Cholangiohepatitis (CAH) in broiler",
  "Coccidiosis",
  "Colibacillosis",
  "CRD",
  "Crop impaction",
  "Egg drop syndrome",
  "Fatty liver haemorrhagic syndrome (FLHS)",
  "Fowl cholera",
  "Fowl paratyphoid",
  "Fowl pox",
  "Fowl typhoid",
  "Gangrenous dermatitis",
  "Gizzard impaction",
  "Gout",
  "Haemorrhagic enteritis (HE) of turkey",
  "Histomonosis",
  "Infectious Bronchitis (IB)",
  "Infectious bursal disease (IBD, Gumboro)",
  "Infectious encephalomyelitis (IEM)",
  "Infectious Laryngotracheitis (ILT)",
  "Infectious sinusitis in turkeys (Mycoplasmoses)",
  "Intestinal volvulus",
  "Lymphoid leukosis (LL)",
  "Marek's Disease",
  "Mycoplasma synoviae (MS) infections",
  "Mycoplasmoses",
  "Mycotoxicoses",
  "Necrotic enteritis",
  "Newcastle disease (ND)",
  "Overheating and Asphyxia",
  "Pasted vent",
  "Pseudomonas aeruginosa infection",
  "Pullorum disease",
  "Pulmonary hypertension syndrome (PHS) or ascitis",
  "Reovirus Infections (Viral arthritis-tenosynovitis-Stunting syndrome in broilers)",
  "Riemerella anatipestifer infection",
  "Slipped Tendon (Perosis)",
  "Spirochaetosis",
  "Staphylococcus aureus infections",
  "Streptococcosis",
  "Subcutaneous emphysema",
  "Swollen head syndrome (SHS)",
  "Ulcerative enteritis",
  "Viral inclusion body hepatitis (IBH)",
  "Vitamin A deficiency",
  "Vitamin B1 deficiency (Stargazing)",
  "Vitamin B2 deficiency (Curled toes paralysis)",
  "Vitamin D3 deficiency (Rachitis)",
  "Vitamin E Deficiency (Encephalomalacia-crazy chick disease)",
]


export const PM_Lesions = [
  //Intestine
  "Ballooning of small intestine (E. maxima)",
  "Discrete rounded lesions of E. mivati on the duodenal loop",
  "Enteritis",
  "Excess fluid accumulation in the lower intestines",
  "Intestinal content is mixed with blood (coc)",
  "Intestinal lumen is filled with brownish watery content, mixed with gas bubbles.",
  "Intestinal mucous coat is mottled with multiple petechial haemorrhages (coc)",
  "Intestinal serosal surface has numerous petechiae and the intestinal is orange (E. maxima)",
  "Mucoid enteritis",
  "Necrosis and hemorrhage of small intestinal lymphoid patches (Peyer’s patches).",
  "Necrotic intestinal mucosa",
  "Orange mucoid enteritis in the jejunum",
  "Petechiae and white plaques on the intestinal serosal surface (“salt and pepper” appearance) (E. necatrix)",
  "Serosal petechial haemorrhages in the lower part of small intestine (E. brunetti)",
  "White streaks of E. acervulina on the duodenal loop.",
  //Airsacs
  "Airsacculitis with caseous exudate and increased vascularization (MG)",
  "Foamy aerosacculitis",
  "Foamy, white, creamy “yogurt-like” exudate in the air sacs (ORT)",
  "Serofibrinous aerosacculitis",
  "Severe airsacculitis with abundant foam and aggregates of caseous exudate (MG)",
  //Kidney
  "Acute diffuse edema and congestion with urate retention in the kidney (AI)",
  "kidneys are affected by a severe urate diathesis (G)",
  "kidneys are swollen and there is urolithiasis of the ureters (IB)",
  "Moderate edema and congestion with urate retention in the kidney (AI)",
  "Swollen and pale kidney (IB)",
  "Swollen kidneys with severe accumulation of white urates (IB).",
  "The collecting tubules of kidneys are distended with white urates (IB)",
  "Ureters are filled with urates",
  "Ureters are very distended with white urates (IB)",
  //Liver
  "Bronze greenish tint of liver.",
  "Dark red to black liver",
  "Deposition of urates on the surfaces of the liver (IB).",
  "Gallbladder is distended (Mycotoxicosis)",
  "Greyish-whitish nodes in liver.",
  "Liver enlargement",
  "Liver hemorrhage",
  "Liver hyperemia",
  "Liver is enlarged, pale, and friable (aflatoxicosis)",
  "Liver is mottled with multiple milliary necrosis",
  "Liver is small, firm, and nodular (Mycotoxicosis)",
  "Liver necrosis",
  "Serofibrinous perihepatitis",

  //Ceacum
  "Caeca are filled with gelatinous, fibrinous, cheese-like exudate",
  "Enterocolitis",
  "Marked typhlitis and haemorrhages (Caecal coccidiosis)",
  "Scattered petechiae on the serosal surface of cecum (E. tenella)",
  "Small hemorrhagic streaks and coagulated material appear mixed with the cecal contents (E. brunetti)",
  "The caeca are filled with blood (E. tenella)",

  //Bursa
  "Bursa is atrophied (G)",
  "Bursa is enlarged, oedematous and covered with a gelatinous transudate (G)",
  "Bursa is filled with coagulated fibrinous exudate (G)",
  "Edema and hemorrhages of the bursal mucosa (ND)",
  "Moderate acute edema of Bursa (AI)",
  "Moderate edema with multifocal petechial of Bursa (AI)",
  "Serous bursitis (G)",

  //General
  "Anaemic appearance of internal organs",
  "E. coli septicemia",
  "Greyish-whitish nodes in the peritoneum",
  "Omphalitis (navel infection)",
  "Peritonitis",
  "Subserous petechial haemorrhages in the abdominal fat",
  "The subcutaneous fat and the body fat have an icteric tint (CAH)",
  "Yolk sac is unabsorbed",


  //Muscles
  "Accumulation of exudate between the superficial and deep pectoral muscles",
  "Haemorrhages in the abdominal muscles (G)",
  "Haemorrhages in the pectoral muscles (G)",
  "Haemorrhages in the thigh muscles (G, Mycotoxins)",
  "Keel and pectoral muscles is covered by fibrin (MG)",

  //Gizzard
  "Erosions and a roughened lining of the gizzard (typical in aflatoxicosis)",
  "Gizzard have ulcers (Mycotoxins)",
  "Greyish-whitish nodes in gizzard walls",
  "Subserous petechial or ecchymosed haemorrhages in the gizzard",
]

/*
export interface PMLesion {
  organ:string,
  lesions:string[]
}
export const PM_Lesions:PMLesion[] = [
  {
    organ:"Intestine",
    lesions:[
      "Ballooning of small intestine (E. maxima)",
      "Discrete rounded lesions of E. mivati on the duodenal loop",
      "Enteritis",
      "Excess fluid accumulation in the lower intestines",
      "Intestinal content is mixed with blood (coc)",
      "Intestinal lumen is filled with brownish watery content, mixed with gas bubbles.",
      "Intestinal mucous coat is mottled with multiple petechial haemorrhages (coc)",
      "Intestinal serosal surface has numerous petechiae and the intestinal is orange (E. maxima)",
      "Mucoid enteritis",
      "Necrosis and hemorrhage of small intestinal lymphoid patches (Peyer’s patches).",
      "Necrotic intestinal mucosa",
      "Orange mucoid enteritis in the jejunum",
      "Petechiae and white plaques on the intestinal serosal surface (“salt and pepper” appearance) (E. necatrix)",
      "Serosal petechial haemorrhages in the lower part of small intestine (E. brunetti)",
      "White streaks of E. acervulina on the duodenal loop.",
]
  },
  {
    organ:"Airsacs",
    lesions:[
      "",
      "",
      "",
      "",
    ]
  },
  {
    organ:"Airsacs",
    lesions:[
      "",
      "",
      "",
      "",
    ]
  },
  {
    organ:"Airsacs",
    lesions:[
      "",
      "",
      "",
      "",
    ]
  },
  {
    organ:"Airsacs",
    lesions:[
      "",
      "",
      "",
      "",
    ]
  },
  {
    organ:"Airsacs",
    lesions:[
      "",
      "",
      "",
      "",
    ]
  },
  {
    organ:"Airsacs",
    lesions:[
      "",
      "",
      "",
      "",
    ]
  },
  {
    organ:"Airsacs",
    lesions:[
      "",
      "",
      "",
      "",
    ]
  },
  {
    organ:"Airsacs",
    lesions:[
      "",
      "",
      "",
      "",
    ]
  },
  {
    organ:"Airsacs",
    lesions:[
      "",
      "",
      "",
      "",
    ]
  },
]*/
