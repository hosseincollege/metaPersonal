// src/Section.js

import hiweb from "./lessons/hiweb/index";
import university from "./lessons/university/index";
import computer from "./lessons/computer/index";
import history from "./lessons/history";
import complex from "./lessons/complex";
import advancedNet from "./lessons/advancedNet";
import arshad from "./lessons/arshad";
import quranThought from "./lessons/quranThought";

// ======================
// LESSONS
// ======================
const SECTIONS = [
  { key: "hiweb", title: "1. های وب", color: "#d21919", raw: hiweb },
  { key: "university", title: "2. دانشگاه", color: "#feed00", raw: university },
  { key: "computer", title: "3. کامپیوتر", color: "#023ee3", raw: computer },
  { key: "history", title: "4. تاریخ", color: "#43d3ff", raw: history },
  { key: "complex", title: "5. مجتمع", color: "#ff7043", raw: complex },
  { key: "advancedNet", title: "6. شبکه های پیشرفته", color: "#39ab52", raw: advancedNet },
  { key: "arshad", title: "7. arshad", color: "#37c943", raw: arshad },
  { key: "quran", title: "8. اندیشه اسلامی", color: "#6cff43", raw: quranThought },
];

export default SECTIONS;
