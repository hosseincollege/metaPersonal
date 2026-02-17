// src/projects.js

// ======================
// PERSONAL
// ======================
import personalCareer from "./lessons/personal/career";
import personalEducation from "./lessons/personal/education";
import personalFamily from "./lessons/personal/family";
import personalHistory from "./lessons/personal/history";
import personalNow from "./lessons/personal/now";
import personalSelfKnowledge from "./lessons/personal/selfKnowledge";
import personalTaqwa from "./lessons/personal/taqwa";
import personalTawhid from "./lessons/personal/tawhid";
import personalThree from "./lessons/personal/three";

// ======================
// HIWEB
// ======================
import hiwebADSL from "./lessons/hiweb/ADSL";
import hiwebFiber from "./lessons/hiweb/fiber";
import hiwebFlow from "./lessons/hiweb/flow";
import hiwebMicrowave from "./lessons/hiweb/microwave";
import hiwebRahcom from "./lessons/hiweb/rahcom";
import hiwebSafety from "./lessons/hiweb/safety";
import hiwebTelecom from "./lessons/hiweb/telecom";
import hiwebUSO from "./lessons/hiweb/USO";
import hiwebVSAT from "./lessons/hiweb/VSAT";

// ======================
// COMPUTER
// ======================
import computerPython from "./lessons/computer/python";

// ======================
// uni404
// ======================
import uniAlgorithms from "./lessons/uni404/algorithms";
import uniAlguni from "./lessons/uni404/alguni";
import uniCircuits from "./lessons/uni404/circuits";
import uniCiruni from "./lessons/uni404/ciruni";
import uniCloud from "./lessons/uni404/cloud";
import uniClouni from "./lessons/uni404/clouni";
import uniIot from "./lessons/uni404/iot";
import uniIotuni from "./lessons/uni404/iotuni";
import uniJame from "./lessons/uni404/jame";
import uniNetworks from "./lessons/uni404/networks";
import uniNetuni from "./lessons/uni404/netuni";
import uniPytam from "./lessons/uni404/pytam";
import uniPython from "./lessons/uni404/python";
import uniPytuni from "./lessons/uni404/pytuni";

// ======================
// TARH KOLI
// ======================
import tarhIman from "./lessons/TarhKoli/iman";
import tarhNubuwwah from "./lessons/TarhKoli/nubuwwah";
import tarhTawhid from "./lessons/TarhKoli/tawhid";
import tarhWilayah from "./lessons/TarhKoli/wilayah";

// ======================
// PROJECT CONFIG
// ======================
const PROJECTS = {
  personal: {
    key: "personal",
    title: "شخصی",
    color: "#e5533d",
    lessons: [
      { key: "per-career", title: "مسیر شغلی", color: "#ef6a52", raw: personalCareer },
      { key: "per-education", title: "تحصیل", color: "#e5533d", raw: personalEducation },
      { key: "per-family", title: "خانواده", color: "#d94832", raw: personalFamily },
      { key: "per-history", title: "تاریخچه", color: "#c93f2b", raw: personalHistory },
      { key: "per-now", title: "اکنون", color: "#b83726", raw: personalNow },
      { key: "per-self", title: "خودشناسی", color: "#a73022", raw: personalSelfKnowledge },
      { key: "per-taqwa", title: "تقوا", color: "#96301f", raw: personalTaqwa },
      { key: "per-tawhid", title: "توحید", color: "#85301f", raw: personalTawhid },
      { key: "per-three", title: "Three.js", color: "#74301f", raw: personalThree },
    ],
  },

  hiweb: {
    key: "hiweb",
    title: "های‌وب",
    color: "#2f80ed",
    lessons: [
      { key: "hw-adsl", title: "ADSL", color: "#4f9cf5", raw: hiwebADSL },
      { key: "hw-fiber", title: "Fiber", color: "#2f80ed", raw: hiwebFiber },
      { key: "hw-flow", title: "Flow", color: "#2975d9", raw: hiwebFlow },
      { key: "hw-microwave", title: "Microwave", color: "#236ac5", raw: hiwebMicrowave },
      { key: "hw-rahcom", title: "Rahcom", color: "#1f5fb1", raw: hiwebRahcom },
      { key: "hw-safety", title: "Safety", color: "#1b549d", raw: hiwebSafety },
      { key: "hw-telecom", title: "Telecom", color: "#174a8a", raw: hiwebTelecom },
      { key: "hw-uso", title: "USO", color: "#144078", raw: hiwebUSO },
      { key: "hw-vsat", title: "VSAT", color: "#103665", raw: hiwebVSAT },
    ],
  },

  computer: {
    key: "computer",
    title: "کامپیوتر",
    color: "#2bb673",
    lessons: [
      { key: "uni-python", title: "Python", color: "#239b63", raw: computerPython },
    ],
  },

  uni404: {
    key: "uni404",
    title: "uni404",
    color: "#6f5bd3",
    lessons: [
      { key: "u404-algorithms", title: "Algorithms", color: "#7c6fe0", raw: uniAlgorithms },
      { key: "u404-alguni", title: "Alg uni", color: "#6f5bd3", raw: uniAlguni },
      { key: "u404-circuits", title: "Circuits", color: "#6550c8", raw: uniCircuits },
      { key: "u404-ciruni", title: "Cir uni", color: "#5a46bc", raw: uniCiruni },
      { key: "u404-cloud", title: "Cloud", color: "#503cb0", raw: uniCloud },
      { key: "u404-clouni", title: "Cloud uni", color: "#4633a4", raw: uniClouni },
      { key: "u404-iot", title: "IoT", color: "#3d2b97", raw: uniIot },
      { key: "u404-iotuni", title: "IoT uni", color: "#34238a", raw: uniIotuni },
      { key: "u404-jame", title: "Jame", color: "#2c1c7d", raw: uniJame },
      { key: "u404-networks", title: "Networks", color: "#26186f", raw: uniNetworks },
      { key: "u404-netuni", title: "Net uni", color: "#211462", raw: uniNetuni },
      { key: "u404-pytam", title: "Pytam", color: "#1d1155", raw: uniPytam },
      { key: "u404-python", title: "Python", color: "#191049", raw: uniPython },
      { key: "u404-pytuni", title: "Pyt uni", color: "#150f3d", raw: uniPytuni },
    ],
  },

  TarhKoli: {
    key: "TarhKoli",
    title: "طرح کلی",
    color: "#f2b705",
    lessons: [
      { key: "tk-iman", title: "ایمان", color: "#f5c842", raw: tarhIman },
      { key: "tk-nubuwwah", title: "نبوت", color: "#f2b705", raw: tarhNubuwwah },
      { key: "tk-tawhid", title: "توحید", color: "#e0a800", raw: tarhTawhid },
      { key: "tk-wilayah", title: "ولایت", color: "#c99300", raw: tarhWilayah },
    ],
  },
};

export default PROJECTS;
