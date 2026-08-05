export type Service = {
  number: string;
  slug: string;
  title: string;
  icon: string;
  text: string;
  intro: string;
  details: string[];
  benefits: string[];
};

export const services: Service[] = [
  {
    number: "01",
    slug: "elektripaigaldised",
    title: "Elektripaigaldised",
    icon: "power",
    text: "Terviklikud elektripaigaldised projekteerimisest teostuse, mõõdistamise ja dokumentatsioonini.",
    intro: "Rajame töökindlaid elektripaigaldisi uusehitistele ja olemasolevatele hoonetele. Seome projekteerimise, paigalduse, kontrolli ja dokumentatsiooni üheks selge vastutusega tervikuks.",
    details: ["Tugev- ja nõrkvoolupaigaldised", "Kilbid ja jaotussüsteemid", "Valgustus ning jõupaigaldised"],
    benefits: ["Läbimõeldud tehniline lahendus", "Korralik teostus ja tähistus", "Mõõdistatud ning dokumenteeritud tulemus"],
  },
  {
    number: "02",
    slug: "automaatika",
    title: "Automaatika",
    icon: "automation",
    text: "Juhtimis- ja automaatikalahendused, mis panevad hoone tehnosüsteemid ühtse tervikuna tööle.",
    intro: "Loome automaatikalahendusi, mis muudavad tehnosüsteemide juhtimise arusaadavaks, energiatõhusaks ja töökindlaks. Lahendus sünnib hoone tegelikust kasutusvajadusest.",
    details: ["Hooneautomaatika", "KNX-lahendused", "Juhtimis- ja reguleerimissüsteemid"],
    benefits: ["Ühtne ja selge juhtimine", "Tõhusam energiakasutus", "Paindlikult muudetav süsteem"],
  },
  {
    number: "03",
    slug: "norkvool",
    title: "Nõrkvool",
    icon: "signal",
    text: "Turvalised ja töökindlad side-, valve- ning läbipääsusüsteemid elu- ja ärihoonetele.",
    intro: "Ühendame side-, turva- ja nõrkvoolusüsteemid tervikuks, mille erinevad osad töötavad omavahel kooskõlas ning mida on lihtne hallata ja edasi arendada.",
    details: ["Andmesidevõrgud", "Valve- ja läbipääsusüsteemid", "Tulekahju- ja videosüsteemid"],
    benefits: ["Töökindel side ja andmeside", "Läbimõeldud turvalahendus", "Selge süsteemide dokumentatsioon"],
  },
  {
    number: "04",
    slug: "laevaehitus",
    title: "Laevaehitus",
    icon: "marine",
    text: "Elektri- ja automaatikatööd merelises keskkonnas, kus määravad töökindlus, täpsus ja dokumenteeritus.",
    intro: "Teostame laevade elektri- ja automaatikatöid, arvestades merelise keskkonna, piiratud ruumi ja kõrgete töökindlusnõuetega. Täpne teostus käib alati koos korrastatud dokumentatsiooniga.",
    details: ["Laevade elektripaigaldised", "Juhtimis- ja signaalisüsteemid", "Ümberehitus ning hooldus"],
    benefits: ["Merelise keskkonnaga arvestav teostus", "Täpne kaabeldus ja ühendamine", "Kontrollitav ning dokumenteeritud tulemus"],
  },
  {
    number: "05",
    slug: "kait",
    title: "Käit",
    icon: "settings",
    text: "Elektripaigaldiste süsteemne käit ja hooldus, mis aitab ennetada rikkeid ning hoida süsteemid ohutuna.",
    intro: "Korraldame elektripaigaldiste käitu nii, et vajalikud kontrollid, hooldused ja tegevused toimuvad õigel ajal. Eesmärk on ohutu paigaldis, vähem ootamatuid rikkeid ja selge ülevaade süsteemi seisukorrast.",
    details: ["Käidukorraldus", "Hooldus ja kontroll", "Rikete ennetamine ning kõrvaldamine"],
    benefits: ["Pidev ülevaade paigaldise seisust", "Väiksem ootamatute rikete risk", "Korrastatud kontrolli- ja hooldusajalugu"],
  },
  {
    number: "06",
    slug: "taastuvenergia",
    title: "Taastuvenergia",
    icon: "renewable",
    text: "Energiatõhusad lahendused, mis seovad tootmise, salvestamise ja tarbimise toimivaks tervikuks.",
    intro: "Kavandame taastuvenergia lahenduse vastavalt hoone tarbimisele ja kasutuseesmärgile. Seome tootmise, salvestuse ning laadimise süsteemiks, mille toimimine on mõõdetav ja juhitav.",
    details: ["Päikeseelektrijaamad", "Energiasalvestus", "Elektriautode laadimislahendused"],
    benefits: ["Tarbimisele vastav lahendus", "Tootmise ja salvestuse koostöö", "Valmidus tulevaste vajaduste jaoks"],
  },
];
