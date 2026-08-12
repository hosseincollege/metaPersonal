// src/Section.js

import hiweb from "./lessons/hiweb/index";
import university from "./lessons/university/index";
import computer from "./lessons/computer/index";
import complex from "./lessons/complex/index";
import quranThought from "./lessons/quranThought";
import uniother from "./lessons/uniother/index";
import hihi from "./lessons/hihi/index";

// ======================
// LESSONS
// ======================
const SECTIONS = [
  { key: "hiweb", title: "1. های وب", color: "#e81b1b", raw: hiweb },
  { key: "university", title: "2. دانشگاه", color: "#ead80d", raw: university },
  { key: "computer", title: "3. کامپیوتر", color: "#3b73ff", raw: computer },
  { key: "complex", title: "4. مجتمع", color: "#ff7043", raw: complex },
  { key: "quran", title: "5. طرح کلی اندیشه اسلامی", color: "#19d219", raw: quranThought },
  { key: "uniother", title: "6. سایر دروس", color: "#eabe0d", raw: uniother },
  { key: "hihi", title: "7. های های", color: "#d4ff00", raw: hihi },
];

export default SECTIONS;
