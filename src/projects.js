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
// CMPUNI404
// ======================
import cmpAlgorithms from "./lessons/Cmpuni404/algorithms";
import cmpAlguni from "./lessons/Cmpuni404/alguni";
import cmpCircuits from "./lessons/Cmpuni404/circuits";
import cmpCiruni from "./lessons/Cmpuni404/ciruni";
import cmpCloud from "./lessons/Cmpuni404/cloud";
import cmpClouni from "./lessons/Cmpuni404/clouni";
import cmpIot from "./lessons/Cmpuni404/iot";
import cmpIotuni from "./lessons/Cmpuni404/iotuni";
import cmpJame from "./lessons/Cmpuni404/jame";
import cmpNetworks from "./lessons/Cmpuni404/networks";
import cmpNetuni from "./lessons/Cmpuni404/netuni";
import cmpPytam from "./lessons/Cmpuni404/pytam";
import cmpPython from "./lessons/Cmpuni404/python";
import cmpPytuni from "./lessons/Cmpuni404/pytuni";

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
    title: "متاورس شخصی",
    color: "#ff6b6b",
    lessons: [
      { key: "per-career", title: "مسیر شغلی", color: "#ff8787", raw: personalCareer },
      { key: "per-education", title: "تحصیل", color: "#ff6b6b", raw: personalEducation },
      { key: "per-family", title: "خانواده", color: "#fa5252", raw: personalFamily },
      { key: "per-history", title: "تاریخچه", color: "#f03e3e", raw: personalHistory },
      { key: "per-now", title: "اکنون", color: "#e03131", raw: personalNow },
      { key: "per-self", title: "خودشناسی", color: "#c92a2a", raw: personalSelfKnowledge },
      { key: "per-taqwa", title: "تقوا", color: "#b02525", raw: personalTaqwa },
      { key: "per-tawhid", title: "توحید", color: "#8f1f1f", raw: personalTawhid },
      { key: "per-three", title: "Three.js", color: "#6f1818", raw: personalThree },
    ],
  },

  hiweb: {
    key: "hiweb",
    title: "متاورس های‌وب",
    color: "#4dabf7",
    lessons: [
      { key: "hw-adsl", title: "ADSL", color: "#74c0fc", raw: hiwebADSL },
      { key: "hw-fiber", title: "Fiber", color: "#4dabf7", raw: hiwebFiber },
      { key: "hw-flow", title: "Flow", color: "#339af0", raw: hiwebFlow },
      { key: "hw-microwave", title: "Microwave", color: "#228be6", raw: hiwebMicrowave },
      { key: "hw-rahcom", title: "Rahcom", color: "#1c7ed6", raw: hiwebRahcom },
      { key: "hw-safety", title: "Safety", color: "#1971c2", raw: hiwebSafety },
      { key: "hw-telecom", title: "Telecom", color: "#1864ab", raw: hiwebTelecom },
      { key: "hw-uso", title: "USO", color: "#15559a", raw: hiwebUSO },
      { key: "hw-vsat", title: "VSAT", color: "#0b3d91", raw: hiwebVSAT },
    ],
  },

  computer: {
    key: "computer",
    title: "متاورس کامپیوتر",
    color: "#1dd1a1",
    lessons: [
      { key: "cmp-python", title: "Python", color: "#10ac84", raw: computerPython },
    ],
  },

  Cmpuni404: {
    key: "Cmpuni404",
    title: "Cmpuni404",
    color: "#845ef7",
    lessons: [
      { key: "u404-algorithms", title: "Algorithms", color: "#9775fa", raw: cmpAlgorithms },
      { key: "u404-alguni", title: "Alg Uni", color: "#845ef7", raw: cmpAlguni },
      { key: "u404-circuits", title: "Circuits", color: "#7950f2", raw: cmpCircuits },
      { key: "u404-ciruni", title: "Cir Uni", color: "#7048e8", raw: cmpCiruni },
      { key: "u404-cloud", title: "Cloud", color: "#6741d9", raw: cmpCloud },
      { key: "u404-clouni", title: "Cloud Uni", color: "#5f3dc4", raw: cmpClouni },
      { key: "u404-iot", title: "IoT", color: "#5c32a3", raw: cmpIot },
      { key: "u404-iotuni", title: "IoT Uni", color: "#4c2a85", raw: cmpIotuni },
      { key: "u404-jame", title: "Jame", color: "#3f216d", raw: cmpJame },
      { key: "u404-networks", title: "Networks", color: "#352057", raw: cmpNetworks },
      { key: "u404-netuni", title: "Net Uni", color: "#2b1d45", raw: cmpNetuni },
      { key: "u404-pytam", title: "Pytam", color: "#241837", raw: cmpPytam },
      { key: "u404-python", title: "Python", color: "#1e142d", raw: cmpPython },
      { key: "u404-pytuni", title: "Pyt Uni", color: "#171022", raw: cmpPytuni },
    ],
  },

  TarhKoli: {
    key: "TarhKoli",
    title: "طرح کلی",
    color: "#ffd43b",
    lessons: [
      { key: "tk-iman", title: "ایمان", color: "#ffe066", raw: tarhIman },
      { key: "tk-nubuwwah", title: "نبوت", color: "#ffd43b", raw: tarhNubuwwah },
      { key: "tk-tawhid", title: "توحید", color: "#fcc419", raw: tarhTawhid },
      { key: "tk-wilayah", title: "ولایت", color: "#fab005", raw: tarhWilayah },
    ],
  },
};

export default PROJECTS;
