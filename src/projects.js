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
import personalFuture from "./lessons/personal/future";

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
// DevAI
// ======================
import DevAIPython from "./lessons/DevAI/python";

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
    color: "#e04b3f",
    lessons: [
      { key: "per-self", title: "1. خودشناسی", color: "#ff7043", raw: personalSelfKnowledge },
      { key: "per-taqwa", title: "2. تقوا", color: "#f4511e", raw: personalTaqwa },
      { key: "per-tawhid", title: "3. توحید", color: "#e53935", raw: personalTawhid },
      { key: "per-education", title: "4. تحصیل", color: "#d32f2f", raw: personalEducation },
      { key: "per-career", title: "5. شغل", color: "#c62828", raw: personalCareer },
      { key: "per-family", title: "6. خانواده", color: "#b71c1c", raw: personalFamily },
      { key: "per-history", title: "7. تاریخچه", color: "#ab1b1b", raw: personalHistory },
      { key: "per-now", title: "8. اکنون", color: "#a01818", raw: personalNow },
      { key: "per-future", title: "9. آینده", color: "#8f1414", raw: personalFuture },
    ],
  },

  hiweb: {
    key: "hiweb",
    title: "های‌وب",
    color: "#1e88e5",
    lessons: [
      { key: "hw-adsl", title: "1. ADSL", color: "#26c6da", raw: hiwebADSL },
      { key: "hw-fiber", title: "2. Fiber", color: "#00acc1", raw: hiwebFiber },
      { key: "hw-flow", title: "3. Flow", color: "#039be5", raw: hiwebFlow },
      { key: "hw-microwave", title: "4. Microwave", color: "#1e88e5", raw: hiwebMicrowave },
      { key: "hw-rahcom", title: "5. Rahcom", color: "#1976d2", raw: hiwebRahcom },
      { key: "hw-safety", title: "6. Safety", color: "#1565c0", raw: hiwebSafety },
      { key: "hw-telecom", title: "7. Telecom", color: "#0d47a1", raw: hiwebTelecom },
      { key: "hw-uso", title: "8. USO", color: "#0b3c91", raw: hiwebUSO },
      { key: "hw-vsat", title: "9. VSAT", color: "#08306b", raw: hiwebVSAT },
    ],
  },

  computer: {
    key: "DevAI",
    title: "هوش مصنوعی",
    color: "#26a69a",
    lessons: [
      { key: "DevAI-python", title: "1. Python", color: "#2e7d32", raw: DevAIPython },
    ],
  },

  uni404: {
    key: "uni404",
    title: "uni404",
    color: "#5e60ce",
    lessons: [
      { key: "u404-algorithms", title: "1. Algorithms", color: "#4ea8de", raw: uniAlgorithms },
      { key: "u404-alguni", title: "2. Alg uni", color: "#5390d9", raw: uniAlguni },
      { key: "u404-circuits", title: "3. Circuits", color: "#5e60ce", raw: uniCircuits },
      { key: "u404-ciruni", title: "4. Cir uni", color: "#6930c3", raw: uniCiruni },
      { key: "u404-cloud", title: "5. Cloud", color: "#7400b8", raw: uniCloud },
      { key: "u404-clouni", title: "6. Cloud uni", color: "#6a00a8", raw: uniClouni },
      { key: "u404-iot", title: "7. IoT", color: "#5a189a", raw: uniIot },
      { key: "u404-iotuni", title: "8. IoT uni", color: "#4c1d95", raw: uniIotuni },
      { key: "u404-jame", title: "9. Jame", color: "#3c096c", raw: uniJame },
      { key: "u404-networks", title: "10. Networks", color: "#3a0ca3", raw: uniNetworks },
      { key: "u404-netuni", title: "11. Net uni", color: "#2f0a8d", raw: uniNetuni },
      { key: "u404-pytam", title: "12. Pytam", color: "#3f37c9", raw: uniPytam },
      { key: "u404-python", title: "13. Python", color: "#4361ee", raw: uniPython },
      { key: "u404-pytuni", title: "14. Pyt uni", color: "#4895ef", raw: uniPytuni },
    ],
  },

  TarhKoli: {
    key: "TarhKoli",
    title: "طرح کلی",
    color: "#f4a261",
    lessons: [
      { key: "tk-iman", title: "1. ایمان", color: "#ffd166", raw: tarhIman },
      { key: "tk-tawhid", title: "2. توحید", color: "#fcbf49", raw: tarhTawhid },
      { key: "tk-nubuwwah", title: "3. نبوت", color: "#f4a261", raw: tarhNubuwwah },
      { key: "tk-wilayah", title: "4. ولایت", color: "#e76f51", raw: tarhWilayah },
    ],
  },
};

export default PROJECTS;
