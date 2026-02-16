export default [

  /* ============================================================
    فصل ۱ — Introduction to Internet of Things (IoT)
  ============================================================ */
  {
    section: "فصل ۱: مقدمه | Introduction",
    topics: [
      {
        title: "1- Internet of Things (IoT)",
        content: "اینترنت اشیاء به شبکه‌ای از اشیاء فیزیکی گفته می‌شود که با استفاده از سنسورها، نرم‌افزار و اتصال به اینترنت، داده جمع‌آوری و تبادل می‌کنند.",
        subtopics: [
          {
            title: "Connected Devices",
            content: "دستگاه‌هایی که به اینترنت متصل هستند و قادر به ارسال و دریافت داده‌اند."
          },
          {
            title: "Smart Objects",
            content: "اشیایی که می‌توانند داده را تحلیل کرده و تصمیم‌های هوشمند بگیرند."
          }
        ]
      },
      {
        title: "2- History of IoT",
        content: "روند شکل‌گیری اینترنت اشیاء همزمان با توسعه اینترنت و شبکه‌های اولیه آغاز شد.",
        subtopics: [
          {
            title: "Birth of Internet",
            content: "پروژه ARPANET به‌عنوان پایه اینترنت امروزی."
          },
          {
            title: "Early IoT Devices",
            content: "توستر متصل به اینترنت، وب‌کم دانشگاه کمبریج و فناوری‌های پوشیدنی اولیه."
          }
        ]
      },
      {
        title: "3- Global Growth of IoT",
        content: "با ظهور گوشی‌های هوشمند و رایانش ابری، اینترنت اشیاء به‌صورت جهانی گسترش یافت.",
        subtopics: [
          {
            title: "Smartphone Era",
            content: "معرفی آیفون و رشد شدید اکوسیستم IoT."
          },
          {
            title: "IoT Ecosystem Expansion",
            content: "افزایش دستگاه‌های متصل، پلتفرم‌های ابری و شهرهای هوشمند."
          }
        ]
      }
    ]
  },

  /* ============================================================
    فصل ۲ — Common IoT Terms
  ============================================================ */
  {
    section: "فصل ۲: اصطلاحات |Terms",
    topics: [
      {
        title: "1- Things",
        content: "اشیاء فیزیکی که به اینترنت متصل می‌شوند.",
        subtopics: [
          {
            title: "Physical Objects",
            content: "مانند خودرو، ساعت هوشمند، سنسورها و لوازم خانگی."
          }
        ]
      },
      {
        title: "2- Sensor",
        content: "حسگر ابزاری برای اندازه‌گیری کمیت‌های فیزیکی است.",
        subtopics: [
          {
            title: "Sensor as Transducer",
            content: "تبدیل پارامترهای فیزیکی به سیگنال الکتریکی."
          },
          {
            title: "Sensor Examples",
            content: "دما، رطوبت، صدا، حرکت و نور."
          }
        ]
      },
      {
        title: "3- Actuator",
        content: "محرک قطعه‌ای است که بر اساس فرمان، عمل فیزیکی انجام می‌دهد.",
        subtopics: [
          {
            title: "Types of Actuators",
            content: "الکتریکی، هیدرولیکی و پنوماتیکی."
          }
        ]
      },
      {
        title: "4- Edge Computing",
        content: "پردازش داده نزدیک به منبع تولید داده انجام می‌شود.",
        subtopics: [
          {
            title: "Benefits",
            content: "کاهش تأخیر، مصرف کمتر پهنای باند و افزایش امنیت."
          }
        ]
      }
    ]
  },

  /* ============================================================
    فصل ۳ — IoT Architecture
  ============================================================ */
  {
    section: "فصل ۳: معماری | Architecture",
    topics: [
      {
        title: "1- Three-Layer Architecture",
        content: "مدل پایه معماری اینترنت اشیاء شامل سه لایه اصلی است.",
        subtopics: [
          {
            title: "Perception Layer",
            content: "شامل سنسورها، RFID، دوربین‌ها و جمع‌آوری داده."
          },
          {
            title: "Network Layer",
            content: "انتقال داده با استفاده از شبکه‌های مختلف."
          },
          {
            title: "Application Layer",
            content: "ارائه خدمات به کاربر نهایی."
          }
        ]
      },
      {
        title: "2- Four-Layer Architecture",
        content: "با افزودن لایه پشتیبان، پردازش و امنیت تقویت می‌شود.",
        subtopics: [
          {
            title: "Support Layer",
            content: "شامل رایانش ابری، محاسبات لبه و پردازش داده."
          }
        ]
      },
      {
        title: "3- Five-Layer Architecture",
        content: "مدل پیشرفته معماری IoT با تمرکز بر مدیریت و تحلیل داده.",
        subtopics: [
          {
            title: "Middleware Layer",
            content: "ذخیره و پردازش داده‌ها."
          },
          {
            title: "Business Layer",
            content: "تحلیل داده و تصمیم‌سازی."
          }
        ]
      }
    ]
  },

  /* ============================================================
    فصل ۴ — IoT Applications
  ============================================================ */
  {
    section: "فصل ۴: کاربردها | Applications",
    topics: [
      {
        title: "1- Smart Cities",
        content: "استفاده از IoT برای مدیریت هوشمند خدمات شهری.",
        subtopics: [
          {
            title: "Traffic and Energy Management",
            content: "کنترل ترافیک و بهینه‌سازی مصرف انرژی."
          }
        ]
      },
      {
        title: "2- Industrial IoT (IIoT)",
        content: "افزایش بهره‌وری و ایمنی در صنایع.",
        subtopics: [
          {
            title: "Smart Factories",
            content: "نگهداری پیش‌بینانه و تولید خودکار."
          }
        ]
      },
      {
        title: "3- Healthcare",
        content: "پایش سلامت و مدیریت داده‌های پزشکی.",
        subtopics: [
          {
            title: "Remote Monitoring",
            content: "کنترل علائم حیاتی بیماران از راه دور."
          }
        ]
      },
      {
        title: "4- Agriculture",
        content: "افزایش بهره‌وری کشاورزی با IoT.",
        subtopics: [
          {
            title: "Smart Farming",
            content: "مدیریت آبیاری و پایش شرایط خاک."
          }
        ]
      }
    ]
  },

  /* ============================================================
    فصل ۵ — IoT for Business
  ============================================================ */
  {
    section: "فصل ۵: کسب‌وکار |Business",
    topics: [
      {
        title: "1- Business Benefits of IoT",
        content: "اینترنت اشیاء باعث کاهش هزینه و افزایش بهره‌وری می‌شود.",
        subtopics: [
          {
            title: "Cost and Time Efficiency",
            content: "کاهش هزینه‌های عملیاتی و افزایش سرعت تصمیم‌گیری."
          }
        ]
      },
      {
        title: "2- Key Business Areas",
        content: "حوزه‌هایی که بیشترین تأثیر را از IoT می‌گیرند.",
        subtopics: [
          {
            title: "Smart Factories",
            content: "اتوماسیون صنعتی و پایش تجهیزات."
          },
          {
            title: "Remote Work",
            content: "پایش عملکرد و تحلیل داده‌های کاری از راه دور."
          }
        ]
      }
    ]
  },

  /* ============================================================
    فصل ۶ — Benefits of IoT
  ============================================================ */
  {
    section: "فصل ۶: مزایا | Benefits",
    topics: [
      {
        title: "1- Increased Efficiency",
        content: "IoT باعث خودکارسازی فرآیندها و افزایش بهره‌وری می‌شود.",
        subtopics: [
          {
            title: "Process Automation",
            content: "کاهش کارهای تکراری و افزایش دقت."
          }
        ]
      },
      {
        title: "2- Cost Saving",
        content: "کاهش هزینه با استفاده بهینه از منابع.",
        subtopics: [
          {
            title: "Resource Optimization",
            content: "مدیریت بهتر انرژی و تجهیزات."
          }
        ]
      },
      {
        title: "3- Predictive Maintenance",
        content: "پیش‌بینی خرابی تجهیزات قبل از وقوع.",
        subtopics: [
          {
            title: "Failure Prediction",
            content: "کاهش توقف سیستم‌ها و هزینه نگهداری."
          }
        ]
      }
    ]
  },
  /* ============================================================
    فصل ۷ — IoT Challenges
  ============================================================ */
  {
    section: "فصل ۷: چالش‌ها | Challenges",
    topics: [
      {
        title: "1- Security Risks",
        content: "ریسک‌های امنیتی یکی از مهم‌ترین چالش‌های اینترنت اشیاء هستند.",
        subtopics: [
          {
            title: "Common Security Threats",
            content: "احراز هویت ضعیف، رمزنگاری ناکافی، فریمور قدیمی و حملات سایبری."
          },
          {
            title: "System-Level Security",
            content: "استفاده از مکانیزم‌های شناسایی، بروزرسانی منظم و تشخیص حمله."
          }
        ]
      },
      {
        title: "2- Data Privacy",
        content: "دستگاه‌های IoT داده‌های حساس کاربران را جمع‌آوری می‌کنند.",
        subtopics: [
          {
            title: "Privacy Issues",
            content: "نقض حریم خصوصی و افشای داده‌های شخصی."
          },
          {
            title: "Privacy Protection",
            content: "رمزنگاری، ذخیره‌سازی امن و Privacy by Design."
          }
        ]
      },
      {
        title: "3- Interoperability",
        content: "عدم سازگاری بین پروتکل‌ها و تجهیزات مختلف.",
        subtopics: [
          {
            title: "Standardization",
            content: "استانداردسازی برای افزایش هماهنگی بین دستگاه‌ها."
          }
        ]
      },
      {
        title: "4- Scalability",
        content: "مدیریت تعداد بسیار زیاد دستگاه‌ها در مقیاس بزرگ.",
        subtopics: [
          {
            title: "Large-Scale Deployment",
            content: "حفظ کارایی سیستم در حضور میلیون‌ها دستگاه."
          }
        ]
      },
      {
        title: "5- Connectivity and Power",
        content: "چالش‌های اتصال پایدار و مصرف انرژی.",
        subtopics: [
          {
            title: "Energy Consumption",
            content: "محدودیت باتری در دستگاه‌های بی‌سیم."
          },
          {
            title: "Power Optimization",
            content: "افزایش عمر باتری و عملکرد بهینه."
          }
        ]
      },
      {
        title: "6- Cost",
        content: "هزینه یکی از موانع اصلی توسعه IoT است.",
        subtopics: [
          {
            title: "Cost Factors",
            content: "هزینه سخت‌افزار، زیرساخت، نگهداری و عملیات."
          }
        ]
      }
    ]
  },

  /* ============================================================
    فصل ۸ — IoT Boards
  ============================================================ */
  {
    section: "فصل ۸: برد | Boards",
    topics: [
      {
        title: "1- IoT Boards Overview",
        content: "بردهای IoT سخت‌افزارهای الکترونیکی کوچک اما قدرتمند هستند.",
        subtopics: [
          {
            title: "Board Types",
            content: "بردهای مبتنی بر میکروکنترلر و میکروپردازنده."
          }
        ]
      },
      {
        title: "2- Microcontroller Based Boards",
        content: "مناسب سیستم‌های توکار با مصرف انرژی کم.",
        subtopics: [
          {
            title: "Programming",
            content: "عموماً با زبان C یا ++C برنامه‌نویسی می‌شوند."
          }
        ]
      },
      {
        title: "3- Microprocessor Based Boards",
        content: "دارای سیستم‌عامل و قدرت پردازش بالا.",
        subtopics: [
          {
            title: "Operating Systems",
            content: "اجرای لینوکس و سیستم‌عامل‌های مشابه."
          }
        ]
      },
      {
        title: "4- Popular IoT Boards",
        content: "بردهای رایج مورد استفاده در آموزش و صنعت.",
        subtopics: [
          {
            title: "Arduino",
            content: "Open Source، مبتنی بر Atmega328 با پین‌های دیجیتال و آنالوگ."
          },
          {
            title: "Raspberry Pi",
            content: "Single Board Computer با Ethernet و Bluetooth."
          },
          {
            title: "NodeMCU (ESP8266)",
            content: "برد سریع با Wi‑Fi داخلی."
          }
        ]
      }
    ]
  },

  /* ============================================================
    فصل ۹ — IoT Protocols
  ============================================================ */
  {
    section: "فصل ۹: پروتکل‌ها | Protocols",
    topics: [
      {
        title: "1- IoT Data Protocols",
        content: "پروتکل‌هایی برای تبادل پیام و داده.",
        subtopics: [
          {
            title: "MQTT",
            content: "سبک، سریع و مبتنی بر Publish/Subscribe."
          },
          {
            title: "AMQP",
            content: "قابل اعتماد با ساختار Queue و Exchange."
          },
          {
            title: "DDS",
            content: "مناسب سیستم‌های Real-Time با تأخیر کم."
          }
        ]
      },
      {
        title: "2- IoT Network Protocols",
        content: "پروتکل‌های ارتباطی در سطح شبکه.",
        subtopics: [
          {
            title: "Short Range Protocols",
            content: "Wi‑Fi، Bluetooth/BLE و ZigBee."
          },
          {
            title: "Long Range Protocols",
            content: "LoRaWAN و NB‑IoT."
          }
        ]
      }
    ]
  },

  /* ============================================================
    فصل ۱۰ — Internet Delivery Models
  ============================================================ */
  {
    section: "فصل ۱۰: مدل‌های تحویل | Delivery Models",
    topics: [
      {
        title: "1- Delivery Models Overview",
        content: "روش‌های مختلف ارسال داده در شبکه.",
        subtopics: [
          {
            title: "Unicast",
            content: "ارسال یک به یک."
          },
          {
            title: "Broadcast",
            content: "ارسال یک به همه."
          },
          {
            title: "Multicast",
            content: "ارسال به گروه مشخص."
          },
          {
            title: "Anycast",
            content: "ارسال به بهترین مقصد ممکن."
          }
        ]
      }
    ]
  },

  /* ============================================================
    فصل ۱۱ — IoT Security
  ============================================================ */
  {
    section: "فصل ۱۱: امنیت | Security",
    topics: [
      {
        title: "1- Importance of IoT Security",
        content: "امنیت در IoT حیاتی است زیرا دستگاه‌ها داده‌های حساس را مدیریت می‌کنند.",
        subtopics: [
          {
            title: "Threat Impact",
            content: "نفوذ می‌تواند منجر به کنترل غیرمجاز دستگاه‌ها شود."
          }
        ]
      },
      {
        title: "2- Core Elements of Security",
        content: "عناصر اصلی امنیت در اینترنت اشیاء.",
        subtopics: [
          {
            title: "Security Components",
            content: "احراز هویت، ارتباط امن، رمزنگاری، بروزرسانی و آگاهی کاربران."
          }
        ]
      },
      {
        title: "3- Secure Communication",
        content: "ارتباط امن بین دستگاه‌ها و سرورها.",
        subtopics: [
          {
            title: "Best Practices",
            content: "استفاده از HTTPS و MQTT همراه TLS."
          }
        ]
      },
      {
        title: "4- Data Privacy Regulations",
        content: "قوانین حفاظت از داده در IoT.",
        subtopics: [
          {
            title: "GDPR",
            content: "حفاظت از داده‌های شهروندان اتحادیه اروپا."
          },
          {
            title: "HIPAA",
            content: "حفاظت از داده‌های سلامت در آمریکا."
          }
        ]
      },
      {
        title: "5- Case Studies and Best Practices",
        content: "مطالعه نمونه‌های واقعی نقض امنیت.",
        subtopics: [
          {
            title: "Lessons Learned",
            content: "رمزنگاری قوی، رضایت کاربر و ممیزی امنیتی منظم."
          }
        ]
      }
    ]
  },

  /* ============================================================
    فصل ۱۲S — خلاصه کل درس اینترنت اشیاء
  ============================================================ */
  {
    section: "فصل ۱۲S: خلاصه کل درس اینترنت اشیاء",
    topics: [

      {
        title: "1- مقدمه و تاریخچه IoT",
        content: "IoT، اشیاء هوشمند، دستگاه متصل، رشد جهانی",
        subtopics: [
          { title: "1-1 Internet of Things", content: "Connected Devices" },
          { title: "1-2 Smart Objects", content: "تصمیم‌گیری هوشمند" },
          { title: "1-3 History of IoT", content: "ARPANET، IoT اولیه" },
          { title: "1-4 Global Growth", content: "Smartphone، Cloud" }
        ]
      },

      {
        title: "2- اصطلاحات پایه IoT",
        content: "Thing، Sensor، Actuator، Edge Computing",
        subtopics: [
          { title: "2-1 Things", content: "اشیاء فیزیکی متصل" },
          { title: "2-2 Sensor", content: "Transducer، اندازه‌گیری" },
          { title: "2-3 Actuator", content: "عمل فیزیکی کنترلی" },
          { title: "2-4 Edge Computing", content: "کاهش تأخیر، پردازش محلی" }
        ]
      },

      {
        title: "3- معماری IoT",
        content: "Three-Layer، Four-Layer، Five-Layer Architecture",
        subtopics: [
          { title: "3-1 Perception Layer", content: "Sensors، RFID" },
          { title: "3-2 Network Layer", content: "انتقال داده" },
          { title: "3-3 Application Layer", content: "خدمات کاربر" },
          { title: "3-4 Support Layer", content: "Cloud، Edge" },
          { title: "3-5 Middleware Layer", content: "پردازش، ذخیره" },
          { title: "3-6 Business Layer", content: "تحلیل و تصمیم‌سازی" }
        ]
      },

      {
        title: "4- کاربردهای IoT",
        content: "Smart City، IIoT، Healthcare، Agriculture",
        subtopics: [
          { title: "4-1 Smart Cities", content: "Traffic، Energy" },
          { title: "4-2 Industrial IoT", content: "Smart Factory" },
          { title: "4-3 Healthcare", content: "Remote Monitoring" },
          { title: "4-4 Agriculture", content: "Smart Farming" }
        ]
      },

      {
        title: "5- اینترنت اشیاء در کسب‌وکار",
        content: "Business Value، Automation، Remote Monitoring",
        subtopics: [
          { title: "5-1 Business Benefits", content: "Cost، Productivity" },
          { title: "5-2 Smart Factories", content: "Industrial Automation" },
          { title: "5-3 Remote Work", content: "Data Analysis" }
        ]
      },

      {
        title: "6- مزایای اینترنت اشیاء",
        content: "Efficiency، Cost Saving، Predictive Maintenance",
        subtopics: [
          { title: "6-1 Increased Efficiency", content: "Process Automation" },
          { title: "6-2 Cost Saving", content: "Resource Optimization" },
          { title: "6-3 Predictive Maintenance", content: "Failure Prediction" }
        ]
      },

      {
        title: "7- چالش‌های IoT",
        content: "Security، Privacy، Interoperability، Scalability، Cost",
        subtopics: [
          { title: "7-1 Security Risks", content: "Cyber Attacks" },
          { title: "7-2 Data Privacy", content: "Privacy Protection" },
          { title: "7-3 Interoperability", content: "Standardization" },
          { title: "7-4 Scalability", content: "Large-Scale Systems" },
          { title: "7-5 Connectivity & Power", content: "Energy Consumption" },
          { title: "7-6 Cost", content: "Hardware، Maintenance" }
        ]
      },

      {
        title: "8- بردهای اینترنت اشیاء",
        content: "Microcontroller، Microprocessor، Arduino، Raspberry Pi",
        subtopics: [
          { title: "8-1 IoT Boards", content: "Embedded Hardware" },
          { title: "8-2 Microcontroller Boards", content: "Low Power" },
          { title: "8-3 Microprocessor Boards", content: "Operating System" },
          { title: "8-4 Arduino", content: "Open Source" },
          { title: "8-5 Raspberry Pi", content: "Single Board Computer" },
          { title: "8-6 NodeMCU", content: "ESP8266 Wi-Fi" }
        ]
      },

      {
        title: "9- پروتکل‌های IoT",
        content: "MQTT، AMQP، DDS، Wi-Fi، LoRaWAN",
        subtopics: [
          { title: "9-1 MQTT", content: "Publish/Subscribe" },
          { title: "9-2 AMQP", content: "Queue-Based" },
          { title: "9-3 DDS", content: "Real-Time Systems" },
          { title: "9-4 Short Range", content: "Wi-Fi، BLE، ZigBee" },
          { title: "9-5 Long Range", content: "LoRaWAN، NB-IoT" }
        ]
      },

      {
        title: "10- مدل‌های تحویل داده",
        content: "Unicast، Broadcast، Multicast، Anycast",
        subtopics: [
          { title: "10-1 Unicast", content: "One-to-One" },
          { title: "10-2 Broadcast", content: "One-to-All" },
          { title: "10-3 Multicast", content: "Group Communication" },
          { title: "10-4 Anycast", content: "Nearest Node" }
        ]
      },

      {
        title: "11- امنیت اینترنت اشیاء",
        content: "Authentication، Encryption، TLS، Privacy Regulations",
        subtopics: [
          { title: "11-1 IoT Security Importance", content: "Sensitive Data" },
          { title: "11-2 Security Components", content: "Auth، Encryption" },
          { title: "11-3 Secure Communication", content: "HTTPS، MQTT TLS" },
          { title: "11-4 Data Privacy Laws", content: "GDPR، HIPAA" },
          { title: "11-5 Best Practices", content: "Audit، Strong Encryption" }
        ]
      }

    ]
  }

];
