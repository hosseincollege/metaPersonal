// src/Section.js

import hiweb from "./lessons/hiweb/index";
import university from "./lessons/university/index";
import computer from "./lessons/computer/index";
import complex from "./lessons/complex/index";
import quranThought from "./lessons/quranThought";

// ======================
// LESSONS
// ======================
const SECTIONS = [
  { key: "hiweb", title: "1. های وب", color: "#d21919", raw: hiweb },
  { key: "university", title: "2. دانشگاه", color: "#d2c319", raw: university },
  { key: "computer", title: "3. کامپیوتر", color: "#1960d2", raw: computer },
  { key: "complex", title: "4. مجتمع", color: "#ff7043", raw: complex },
  { key: "quran", title: "5. طرح کلی اندیشه اسلامی", color: "#19d219", raw: quranThought },
];

export default SECTIONS;
