  // src/lessons/university/section0.js

export default {
  // ================== فصل 5- شبکه های گسترده ==================

    section: "5- شبکه های گسترده",
    topics: [
      {
        title: "🔸 دفتر شبکه های گسترده",
        content:
          "🔸 استاد:سید محمد مهدی فیض \n"+
          "📘 1- Introduction to WAN.pdf 🚧 شامل ... فصل و 139 صفحه \n"+
          "📘 2- X.25.pdf 🚧 شامل ... فصل و 32 صفحه \n"+
          "📘 3- Frame Relay.pdf 🚧 شامل ... فصل و 33 صفحه \n"+
          "📘 4- ATM.pdf 🚧 شامل ... فصل و 32 صفحه \n"+
          "🔸 کانال بله درس های کارشناسی علمی کاربردی عضو شدم \n"+
          "🔸 از 23 فروردین 🚧 یکشنبه ها ساعت 18:00 \n",
        subtopics: [
          {
            title: "تکلیف، آزمون و غیره",
            content:
            "-"
          },
          {
            title: "موارد انجام شده",
            content:
            "✅ آزمون میانترم  1- Introduction to WAN اسلاید 1-69 شرکت نمودم \n"
          },
          {
            title: "ریلاین",
            content: "🔸 یکشنبه ۲۳ فروردین ۱۴۰۵ 🚧 وسط کلاس میپره / 1- Introduction to WAN \n"+
            "🔸 یکشنبه ۳۰ فروردین ۱۴۰۵ 🚧 1- Introduction to WAN \n"+
            "🔸 یکشنبه ۰۶ اردیبهشت ۱۴۰۵ 🚧 وسط کلاس میپره / 1- Introduction to WAN \n"+
            "🔸 یکشنبه ۱۳ اردیبهشت ۱۴۰۵ 🚧 وسط کلاس میپره / 1- Introduction to WAN \n"+
            "🔸 یکشنبه 20 اردیبهشت ۱۴۰۵ 🚧 توضیح میانترم \n"+
            "🔸 جبرانی 1 و 2 و 3 ATM دانلود شد \n"+
            "🔸 یکشنبه 27 اردیبهشت ۱۴۰۵ 🚧 گوش ندادم \n"+
            "✅ یکشنبه 03 خرداد ۱۴۰۵ 🚧 شرکت کردم 🚧 ص 130 sonet , WAN و x25 هم اوایل اون تدریس شد \n"
          },
        ]
      },
      {
        title: "WAN 🔸 1- مقدمه و معرفی شبکه‌های گسترده",
        content:
          "آشنایی با مفاهیم پایه شبکه‌های گسترده، تعریف WAN و ضرورت استفاده از آن‌ها در ارتباطات امروزی.",
        subtopics: [
          {
            title: "مقدمه‌ای بر شبکه‌های گسترده",
            content: "تعریف کلی و تفاوت‌های بنیادین با شبکه‌های محلی."
          },
          {
            title: "WAN چیست؟",
            content: "توضیح دقیق مفهوم Wide Area Network و پوشش جغرافیایی آن."
          },
          {
            title: "چرا WANها ضروری هستند؟",
            content: "بررسی نیاز سازمان‌ها به ارتباطات فراساحوی و یکپارچه‌سازی منابع."
          }
        ]
      },
      {
        title: "WAN 🔸 2- تحول یک شرکت",
        content:
          "سیر تکامل ساختار شبکه در سازمان‌ها از دفاتر کوچک تا شرکت‌های چند شعبه‌ای.",
        subtopics: [
          {
            title: "دفتری کوچک با یک LAN",
            content: "شروع کار با شبکه‌های محلی ساده برای یک مکان فیزیکی."
          },
          {
            title: "شبکه LAN گسترش‌یافته شرکت SPAN",
            content: "اتصال چندین شبکه محلی در یک campus یا منطقه نزدیک."
          },
          {
            title: "شعبه‌ها (WANها)",
            content: "نیاز به ارتباط بین شعب پراکنده جغرافیایی و ظهور WAN."
          }
        ]
      },
      {
        title: "WAN 🔸 3- مدل شبکه‌ای سلسله مراتبی",
        content:
          "معرفی مدل طراحی سه لایه‌ای که استاندارد صنعتی برای طراحی شبکه‌های بزرگ است.",
        subtopics: [
          {
            title: "لایه دسترسی (Access Layer)",
            content: "نقطه ورود کاربران و دستگاه‌ها به شبکه؛ شامل امنیت پایه و VLAN."
          },
          {
            title: "لایه توزیع (Distribution Layer)",
            content: "مرزبندی بین لایه دسترسی و هسته؛ اعمال سیاست‌ها و مسیریابی."
          },
          {
            title: "لایه هسته (Core Layer)",
            content: "ستون فقرات شبکه؛ سرعت بالا و انتقال سریع داده‌ها بدون پردازش پیچیده."
          }
        ]
      },
      {
        title: "WAN 🔸 4- معماری سازمانی سیسکو",
        content:
          "بررسی معماری جامع Enterprise مندرج در کتاب CCNP Routing and Switching که تمام جنبه‌های شبکه سازمانی را پوشش می‌دهد.",
        subtopics: [
          {
            title: "ماژول‌های معماری سازمانی",
            content: "نمای کلی از اجزای تشکیل‌دهنده معماری Enterprise Cisco."
          },
          {
            title: "معماری پردیس سازمانی (Campus)",
            content: "طراحی شبکه داخلی سازمان و ارتباطات درون‌سازمانی."
          },
          {
            title: "معماری شعبه‌های سازمانی (Branch)",
            content: "ارتباط شعب دورافتاده با مرکز سازمان و اینترنت."
          },
          {
            title: "معماری مرکز داده سازمانی (Data Center)",
            content: "زیرساخت‌های میزبانی سرویس‌ها، سرورها و ذخیره‌سازی."
          },
          {
            title: "معماری دورکاری سازمانی (Teleworker)",
            content: "تأمین دسترسی امن برای کارکنان خارج از محل کار."
          },
          {
            title: "معماری لبه سازمانی (Edge)",
            content: "مرز بین شبکه داخلی سازمان و اینترنت جهانی."
          }
        ]
      },
      {
        title: "WAN 🔸 5- معماری پردیس سازمانی",
        content:
          "جزئیات فنی طراحی شبکه Campus شامل لایه‌های دسترسی، توزیع، هسته و سرورها.",
        subtopics: [
          {
            title: "زیرماژول دسترسی ساختمان",
            content: "سوئیچ‌های لایه ۲ و اتصال نهایی کاربران."
          },
          {
            title: "زیرماژول توزیع ساختمان",
            content: "اجرای مسیریابی، فیلترینگ و امنیت در سطح ساختمان."
          },
          {
            title: "زیرماژول هسته پردیس",
            content: "تبادل داده‌های با سرعت بالا بین ساختمان‌های مختلف."
          },
          {
            title: "سرورهای گروهی",
            content: "موقعیت سرورها در معماری Campus و نحوه دسترسی به آن‌ها."
          }
        ]
      },
      {
        title: "WAN 🔸 6- مفاهیم سوییچینگ",
        content:
          "بررسی فناوری‌های انتقال داده در شبکه‌های گسترده، به ویژه سوییچینگ بسته‌ای و مدار مجازی.",
        subtopics: [
          {
            title: "سوییچینگ بسته‌ای (ادامه)",
            content: "مروری بر نحوه ارسال داده‌ها به صورت بسته‌های مجزا."
          },
          {
            title: "غیراتصال‌گرا (Connectionless)",
            content: "ارسال بسته‌ها بدون برقراری مسیر اختصاصی قبلی (مانند IP)."
          },
          {
            title: "اتصال‌گرا (Connection-oriented)",
            content: "ایجاد مسیر مشخص قبل از انتقال داده‌ها (مانند Frame Relay یا ATM)."
          },
          {
            title: "مدار مجازی (Virtual Circuit)",
            content: "مفهوم ایجاد مسیر منطقی روی زیرساخت فیزیکی مشترک."
          },
          {
            title: "Permanent Virtual Circuit (PVC)",
            content: "مدار مجازی دائمی که همیشه فعال و اختصاص داده شده است."
          },
          {
            title: "Switched Virtual Circuit (SVC)",
            content: "مدار مجازی سوئیچ‌شده که فقط هنگام نیاز برقراری می‌شود."
          }
        ]
      },
      {
        title: "WAN 🔸 7- SONET",
        content:
          "معماری استاندارد سونیک برای انتقال همزمان داده در شبکه‌های نوری و نقطه به نقطه.",
        subtopics: [
          {
            title: "اجزای اصلی شبکه SONET",
            content: "معرفی تجهیزات سخت‌افزاری کلیدی در لینک‌های نوری."
          },
          {
            title: "STS Multiplexer / Demultiplexer",
            content: "تجهیزاتی برای ترکیب و تفکیک سیگنال‌های STS."
          },
          {
            title: "Regenerator",
            content: "تجدید سیگنال برای جبران افت قدرت در مسافت‌های طولانی."
          },
          {
            title: "Add/Drop Multiplexer",
            content: "امکان اضافه یا کم کردن ترافیک در نقاط میانی لینک."
          },
          {
            title: "چرا از SONET استفاده می‌شود؟",
            content: "مزایایی مانند پهنای باند بالا، قابلیت اطمینان و مدیریت آسان."
          },
          {
            title: "اتصالات SONET (Section, Line, Path)",
            content: "لایه‌های نظارتی و مدیریت در پروتکل SONET."
          }
        ]
      },
      {
        title: "X.25 🔸 1- مقدمه و معرفی",
        content:
          "بررسی تاریخچه، دلایل محبوبیت، ساختار کلی، مزایا، معایب، سرعت انتقال و معماری استاندارد X.25.",
        subtopics: [
          {
            title: "تاریخچه و محبوبیت X.25",
            content: "چگونه X.25 به عنوان یکی از اولین پروتکل‌های بسته‌ای جهانی محبوب شد."
          },
          {
            title: "ساختار کلی و معماری",
            content: "نمای کلی از لایه‌های پروتکل و محل استفاده آن در شبکه‌های قدیمی."
          },
          {
            title: "مزایا و معایب",
            content: "بررسی نقاط قوت (مانند قابلیت اطمینان بالا) و ضعف (مانند سرعت پایین) نسبت به تکنولوژی‌های جدیدتر."
          },
          {
            title: "استانداردسازی ITU-T",
            content: "نقش اتحادیه بین‌المللی مخابرات در تعریف استانداردهای X.25."
          }
        ]
      },
      {
        title: "X.25 🔸 2- دستگاه‌ها و عملیات پروتکل",
        content:
          "معرفی تجهیزات کلیدی شبکه X.25 از جمله DTE، DCE، PSE و دستگاه‌های مبدل PAD.",
        subtopics: [
          {
            title: "انواع دستگاه‌ها",
            content: "تفاوت بین تجهیزات ترمینال داده (DTE)، تجهیزات پایان مدار داده (DCE) و تعویض‌گر بسته‌ای (PSE)."
          },
          {
            title: "Packet Assembler/Disassembler (PAD)",
            content: "نقش PAD در تبدیل داده‌های متوالی دستگاه‌های ناسازگار به بسته‌های X.25."
          },
          {
            title: "عملیات بافرینگ و اسمبلینگ",
            content: "فرآیند جمع‌آوری داده‌ها در بافر و تشکیل بسته‌های قابل انتقال."
          }
        ]
      },
      {
        title: "X.25 🔸 3- برقراری جلسه در",
        content:
          "مراحل فنی برقراری، مدیریت و خاتمه یک جلسه ارتباطی در شبکه X.25.",
        subtopics: [
          {
            title: "فرآیند برقراری جلسه",
            content: "مراحل درخواست اتصال و تأیید طرف مقابل (Call Request/Confirm)."
          },
          {
            title: "قبول و رد جلسه",
            content: "منطق پشت پاسخ‌های مثبت یا منفی به درخواست اتصال."
          },
          {
            title: "انتقال داده دوطرفه",
            content: "نحوه تبادل داده‌ها پس از برقراری اتصال."
          },
          {
            title: "خاتمه اتصال",
            content: "پروتکل‌های منظم برای قطع ارتباط و آزادسازی منابع."
          }
        ]
      },
      {
        title: "X.25 🔸 4- مدارهای مجازی در",
        content:
          "توضیح مفهوم مدار مجازی و انواع آن (SVC و PVC) در بستر شبکه X.25.",
        subtopics: [
          {
            title: "تعریف مدار مجازی (Virtual Circuit)",
            content: "مفهوم مسیر منطقی که روی زیرساخت فیزیکی مشترک ایجاد می‌شود."
          },
          {
            title: "Switched Virtual Circuits (SVC)",
            content: "مدارهای سوئیچ‌شده که فقط هنگام نیاز برقراری می‌شوند."
          },
          {
            title: "Permanent Virtual Circuits (PVC)",
            content: "مدارهای دائمی که همیشه فعال و از پیش تعریف شده هستند."
          },
          {
            title: "مسیر عبور بسته‌ها",
            content: "سیر حرکت داده از DTE به DCE و سپس به PSE."
          }
        ]
      },
      {
        title: "X.25 🔸 5- مجموعه پروتکل‌های",
        content:
          "نگاشت لایه‌های X.25 به مدل مرجع OSI و معرفی پروتکل‌های اصلی.",
        subtopics: [
          {
            title: "نگاشت به مدل OSI",
            content: "مقایسه لایه‌های X.25 (فیزیکی، پیوند، شبکه) با مدل هفت‌لایه OSI."
          },
          {
            title: "پروتکل لایه بسته (PLP)",
            content: "نقش PLP در مدیریت اتصالات و انتقال داده در لایه شبکه."
          },
          {
            title: "لایه پیوند (LAPB)",
            content: "مسئولیت انتقال قابل اطمینان داده بین دو گره متصل مستقیم."
          },
          {
            title: "لایه فیزیکی",
            content: "استانداردهای سخت‌افزاری مانند X.21bis، EIA-232 و EIA-449."
          }
        ]
      },
      {
        title: "X.25 🔸 6- پروتکل لایه بسته (PLP)",
        content:
          "جزئیات فنی پروتکل لایه بسته، حالت‌های عملکرد و ساختار هدر بسته.",
        subtopics: [
          {
            title: "وظیفه PLP",
            content: "مدیریت برقراری، نگهداری و قطع اتصالات منطقی."
          },
          {
            title: "حالت‌های عملکرد",
            content: "Call Setup، Data Transfer، Idle، Call Clearing و Restarting."
          },
          {
            title: "ساختار بسته PLP",
            content: "توضیح فیلدهای GFI، LCI، PTI و بخش داده کاربر (User Data)."
          }
        ]
      },
      {
        title: "X.25 🔸 7- پروتکل LAPB",
        content:
          "بررسی دقیق پروتکل دسترسی به پیوند متوازن، انواع فریم‌ها و ساختار آن.",
        subtopics: [
          {
            title: "وظیفه LAPB",
            content: "تضمین انتقال بدون خطا و کنترل جریان بین دو گره."
          },
          {
            title: "انواع فریم‌ها",
            content: "I-frame (داده)، S-frame (کنترل) و U-frame (مدیریت اتصال)."
          },
          {
            title: "ساختار فریم",
            content: "فیلدهای Flag، Address، Control، Data و FCS (کنترل خطا)."
          }
        ]
      },
      {
        title: "X.25 🔸 8- پروتکل X.21bis",
        content:
          "تعریف پروتکل فیزیکی X.21bis و نقش آن در ارتباطات سریال X.25.",
        subtopics: [
          {
            title: "تعریف و نقش",
            content: "استاندارد لایه فیزیکی برای اتصال DTE به DCE در شبکه‌های X.25."
          },
          {
            title: "ویژگی‌های ارتباطی",
            content: "سرعت‌های مجاز و پین‌های کابل مورد استفاده."
          },
          {
            title: "ارتباط با لایه‌های بالاتر",
            content: "نحوه نگاشت داده‌های فریم LAPB و بسته PLP بر روی سیگنال‌های فیزیکی."
          }
        ]
      },
      {
        title: "X.25 🔸 9- فرمت آدرس X.121",
        content:
          "ساختار آدرس‌دهی در شبکه‌های X.25 برای شناسایی یکتای ترمینال‌ها.",
        subtopics: [
          {
            title: "ساختار کلی آدرس",
            content: "توضیح اجزای تشکیل‌دهنده آدرس X.121."
          },
          {
            title: "DNIC (کد شناسایی شبکه)",
            content: "بخشی از آدرس که کشور و ارائه‌دهنده سرویس را مشخص می‌کند."
          },
          {
            title: "NTN (شماره ترمینال ملی)",
            content: "بخشی که ترمینال خاص را در شبکه ملی شناسایی می‌کند."
          }
        ]
      },
      {
        title: "X.25 🔸 10- مراجع",
        content:
          "منابع علمی و فنی مورد استفاده برای تدوین جزوه.",
        subtopics: [
          {
            title: "کتاب TCP/IP Suite اثر Forouzan",
            content: "منبع اصلی برای درک مفاهیم شبکه و پروتکل‌ها."
          },
          {
            title: "Cisco Internetworking Technologies Handbook",
            content: "منبع تکمیلی برای مباحث فنی و پیاده‌سازی‌های عملی."
          }
        ]
      },
      {
        title: "Frame Relay 🔸 1- مقدمه Introduction",
        content:
          "معرفی پروتکل Frame Relay به عنوان یک تکنولوژی WAN با کارایی بالا، مبتنی بر سوییچینگ بسته‌ای با طول متغیر و تسهیم آماری.",
        subtopics: [
          {
            title: "تکنیک‌های Switching-Packet",
            content: "توضیح مفهوم بسته‌های با طول متغیر و تسهیم آماری (Statistical Multiplexing) برای افزایش بهره‌وری."
          },
          {
            title: "مقایسه با X.25",
            content: "بررسی مزایای Frame Relay نسبت به X.25، از جمله حذف کنترل خطای پیچیده و افزایش سرعت پردازش."
          },
          {
            title: "دلایل عملکرد بالاتر",
            content: "چرا Frame Relay برای لینک‌های با خطای کمتر و پهنای باند بیشتر مناسب‌تر است."
          }
        ]
      },
      {
        title: "Frame Relay 🔸 2- استانداردسازی",
        content:
          "تاریخچه شکل‌گیری این استاندارد توسط کنسرسیومی از شرکت‌های بزرگ و نقش نهادهای استانداردساز.",
        subtopics: [
          {
            title: "تاریخچه و کنسرسیوم",
            content: "نقش شرکت‌هایی مانند سیسکو، DEC، Northern Telecom و StrataCom در توسعه اولیه."
          },
          {
            title: "استانداردهای بین‌المللی",
            content: "نقش ITU-T (پیشنهاد I.121) و ANSI در یکسان‌سازی پروتکل."
          },
          {
            title: "معرفی LMI",
            content: "نیاز به یک رابط محلی برای مدیریت ارتباط بین تجهیزات کاربر و شبکه."
          }
        ]
      },
      {
        title: "Frame Relay 🔸 3- تجهیزات Devices",
        content:
          "معرفی تجهیزات سخت‌افزاری لازم برای اتصال به شبکه Frame Relay و نقش لایه‌های فیزیکی و پیوند.",
        subtopics: [
          {
            title: "Data Terminal Equipment (DTE)",
            content: "تجهیزات کاربر (مانند روترها) که داده‌ها را تولید یا مصرف می‌کنند."
          },
          {
            title: "Data Circuit-Terminating Equipment (DCE)",
            content: "تجهیزات شبکه (مانند سوئیچ‌های Frame Relay) که مسئول انتقال داده هستند."
          },
          {
            title: "اجزای لایه فیزیکی و پیوند",
            content: "استانداردهای کابل‌کشی و پروتکل‌های کنترل لینک در ارتباط DTE و DCE."
          }
        ]
      },
      {
        title: "Frame Relay 🔸 4- مدارات مجازی Virtual Circuits",
        content:
          "بررسی مفهوم مدار مجازی، شناسه‌های DLCI و تفاوت بین مدارات سوئیچ‌شده (SVC) و دائمی (PVC).",
        subtopics: [
          {
            title: "شناسه اتصال (DLCI)",
            content: "نقش Data-Link Connection Identifier در شناسایی منطقی مدارها در لینک محلی."
          },
          {
            title: "Switched Virtual Circuits (SVCs)",
            content: "مداراتی که به صورت پویا برقراری، داده‌رسانی و قطع می‌شوند."
          },
          {
            title: "Permanent Virtual Circuits (PVCs)",
            content: "مداراتی که به صورت ثابت و از پیش تعریف شده توسط ارائه‌دهنده سرویس فعال هستند."
          },
          {
            title: "وضعیت‌های جلسه",
            content: "مراحل Call Setup، Data Transfer، Idle و Call Termination در SVCها."
          }
        ]
      },
      {
        title: "Frame Relay 🔸 5- مکانیزم‌های کنترل ازدحام Congestion-Control",
        content:
          "روش‌های مدیریت ترافیک در شبکه Frame Relay برای جلوگیری از اشباع و حفظ کیفیت سرویس.",
        subtopics: [
          {
            title: "اخطارهای ازدحام",
            content: "توضیح FECN (اطلاع به گیرنده) و BECN (اطلاع به فرستنده) برای کاهش نرخ ارسال داده."
          },
          {
            title: "اولویت‌بندی ترافیک (DE)",
            content: "استفاده از بیت Discard Eligibility برای مشخص کردن بسته‌هایی که در صورت ازدحام اول حذف می‌شوند."
          },
          {
            title: "بررسی خطا (CRC)",
            content: "استفاده از CRC برای تشخیص خطا در فریم‌ها (بدون تصحیح خودکار، فقط تشخیص و دورریز)."
          }
        ]
      },
      {
        title: "Frame Relay 🔸 6- مدیریت محلی (LMI - Local Management Interface)",
        content:
          "جزئیات رابط محلی مدیریت که برای هماهنگی بین روتر و سوئیچ شبکه استفاده می‌شود.",
        subtopics: [
          {
            title: "آدرس‌دهی جهانی",
            content: "امکان استفاده از آدرس‌های X.121 در محیط LMI."
          },
          {
            title: "پیام‌های وضعیت مدار مجازی",
            content: "ارسال اطلاعات درباره وضعیت فعال بودن PVCها."
          },
          {
            title: "چندپخشی (Multicasting)",
            content: "قابلیت ارسال یک فریم به چندین مقصد مشخص شده در یک مدار مجازی."
          }
        ]
      },
      {
        title: "Frame Relay 🔸 7- پیاده‌سازی شبکه Network Implementation",
        content:
          "روش‌های مختلف استقرار شبکه Frame Relay در محیط‌های سازمانی و عمومی.",
        subtopics: [
          {
            title: "شبکه‌های عمومی",
            content: "استفاده از زیرساخت ارائه‌دهندگان سرویس (Carrier-Provided) برای ارتباطات WAN."
          },
          {
            title: "شبکه‌های خصوصی سازمانی",
            content: "ایجاد شبکه اختصاصی برای سازمان‌های بزرگ با نیازهای امنیتی و پهنای باند خاص."
          }
        ]
      },
      {
        title: "Frame Relay 🔸 8- فرمت‌های فریم",
        content:
          "ساختار دقیق فریم‌های داده و فریم‌های مدیریت محلی (LMI) در پروتکل Frame Relay.",
        subtopics: [
          {
            title: "فرمت فریم اصلی",
            content: "فیلدهای Flag، Address (شامل DLCI و بیت‌های کنترلی)، Data و CRC."
          },
          {
            title: "فیلدهای Address",
            content: "توضیح بیت‌های R/C (Reliability/Command) و CFI (Circuit Status)."
          },
          {
            title: "فرمت فریم LMI",
            content: "ساختار خاص برای پیام‌های Status Inquiry و Status شامل DLCI و Type Message."
          }
        ]
      },
      {
        title: "ATM 🔸 1- معرفی Introduction",
        content:
          "تعریف پروتکل ATM به عنوان تکنولوژی سوییچینگ سلول با اندازه ثابت، استاندارد ITU-T و قابلیت انتقال همزمان داده، صدا و ویدیو.",
        subtopics: [
          {
            title: "ساختار سلولی و Virtual Circuit",
            content: "انتقال اطلاعات در سلول‌های کوچک با اندازه ثابت و ماهیت Connection-Oriented شبکه."
          },
          {
            title: "استانداردسازی",
            content: "نقش ITU-T در تعریف استانداردهای ATM."
          },
          {
            title: "کاربرد سرویس‌ها",
            content: "پشتیبانی از سرویس‌های Real-time (صدا/ویدیو) و داده‌ای."
          }
        ]
      },
      {
        title: "ATM 🔸 2- محیط شبکه و تجهیزات",
        content:
          "بررسی محیط عملیاتی ATM، تکنولوژی Cell Switching و مقایسه آن با سایر روش‌های سوئیچینگ.",
        subtopics: [
          {
            title: "تکنولوژی Cell Switching و Multiplexing",
            content: "ترکیب مزایای Circuit Switching و Packet Switching."
          },
          {
            title: "مقایسه با TDM",
            content: "تفاوت‌های کلیدی بین ATM و تقسیم‌بندی زمان (Time Division Multiplexing)."
          }
        ]
      },
      {
        title: "ATM 🔸 3- قالب اصلی سلول",
        content:
          "ساختار دقیق سلول ATM و دلیل انتخاب اندازه ۵۳ بایتی برای بهینه‌سازی انتقال صدا و ویدیو.",
        subtopics: [
          {
            title: "ساختار سلول",
            content: "۵ بایت هدر (Header) و ۴۸ بایت داده کاربر (Payload)."
          },
          {
            title: "مناسب بودن برای VoIP و Video",
            content: "چرا اندازه کوچک سلول‌ها تأخیر (Latency) را کاهش می‌دهد."
          }
        ]
      },
      {
        title: "ATM 🔸 4- تجهیزات",
        content:
          "معرفی تجهیزات سخت‌افزاری لازم برای پیاده‌سازی شبکه ATM.",
        subtopics: [
          {
            title: "اجزای شبکه",
            content: "تفاوت بین ATM Switch (مرکز شبکه) و ATM Endpoint (دستگاه کاربر)."
          },
          {
            title: "نمونه Endpointها",
            content: "کارستیشن‌ها، روترها، LAN Switches، DSU و کدر/دکدرهای ویدیو."
          }
        ]
      },
      {
        title: "ATM 🔸 5- واسط‌های شبکه",
        content:
          "انواع واسط‌های ارتباطی در شبکه ATM و دسته‌بندی آن‌ها.",
        subtopics: [
          {
            title: "User-to-Network Interface (UNI)",
            content: "ارتباط بین تجهیزات کاربر و سوئیچ شبکه."
          },
          {
            title: "Network-to-Network Interface (NNI)",
            content: "ارتباط بین دو سوئیچ ATM در شبکه ارائه‌دهنده سرویس."
          },
          {
            title: "انواع پیاده‌سازی",
            content: "تفاوت بین واسط‌های خصوصی (Private) و عمومی (Public)."
          }
        ]
      },
      {
        title: "ATM 🔸 6- قالب سرآیند سلول",
        content:
          "تفاوت‌های ساختاری هدر سلول در واسط‌های UNI و NNI.",
        subtopics: [
          {
            title: "UNI Header",
            bit: "شامل فیلد GFC برای کنترل جریان در لینک کاربر."
          },
          {
            title: "NNI Header",
            content: "فاقد فیلد GFC و استفاده از بیت‌های اضافی برای VPI."
          }
        ]
      },
      {
        title: "ATM 🔸 7- فیلدهای سرآیند سلول",
        content:
          "توضیح دقیق فیلدهای موجود در هدر سلول و وظیفه هر یک.",
        subtopics: [
          {
            title: "GFC (Generic Flow Control)",
            content: "کنترل جریان ورودی از طرف کاربر."
          },
          {
            title: "VPI و VCI",
            content: "شناسگرهای مسیر مجازی و کانال مجازی برای مسیریابی."
          },
          {
            title: "PT (Payload Type)",
            content: "مشخص کردن نوع داده (مثلاً بارگذاری داده کاربر یا کنترل شبکه)."
          },
          {
            title: "CLP (Cell Loss Priority)",
            content: "اولویت حذف سلول در صورت ازدحام (CLP=1 یعنی قابل حذف)."
          },
          {
            title: "HEC (Header Error Control)",
            content: "کنترل خطا در هدر و تشخیص مرز سلول."
          }
        ]
      },
      {
        title: "ATM 🔸 8- سرویس‌های",
        content:
          "انواع سرویس‌های ارائه شده توسط پروتکل ATM.",
        subtopics: [
          {
            title: "Permanent Virtual Circuit (PVC)",
            content: "مدار دائمی و از پیش تعریف شده."
          },
          {
            title: "Switched Virtual Circuit (SVC)",
            content: "مدار سوئیچ‌شده و پویا که هنگام نیاز برقراری می‌شود."
          },
          {
            title: "Connectionless Service",
            content: "ارسال داده بدون برقراری اتصال قبلی (در برخی پیاده‌سازی‌ها)."
          }
        ]
      },
      {
        title: "ATM 🔸 9- اتصال مجازی در",
        content:
          "ساختار سلسله‌مراتبی اتصالات مجازی در ATM.",
        subtopics: [
          {
            title: "Virtual Path (VP)",
            content: "گروهی از Virtual Channels که با یک VPI شناسایی می‌شوند."
          },
          {
            title: "Virtual Channel (VC)",
            content: "مسیر نهایی انتقال داده که با VCI شناسایی می‌شود."
          },
          {
            title: "نقش VPI و VCI",
            content: "استفاده از این شناسه‌ها برای مسیریابی سلول‌ها در شبکه."
          }
        ]
      },
      {
        title: "ATM 🔸 10- عملیات سوئیچینگ در",
        content:
          "فرآیند داخلی سوئیچ‌های ATM برای انتقال سلول‌ها.",
        subtopics: [
          {
            title: "فرآیند مسیریابی",
            content: "دریافت سلول، جستجو در جدول ترجمه (Translation Table) و تعیین پورت خروجی."
          },
          {
            title: "نگاشت مجدد VPI/VCI",
            content: "تغییر شناسه‌های مسیر در هر سوئیچ برای هدایت سلول به مقصد نهایی."
          }
        ]
      },
      {
        title: "ATM 🔸 11- مدل مرجع",
        content:
          "مدل لایه‌بندی شده ATM شامل Planeها و لایه‌های فنی.",
        subtopics: [
          {
            title: "Planeهای مدل",
            content: "Control Plane (کنترل اتصال)، User Plane (انتقال داده) و Management Plane (مدیریت)."
          },
          {
            title: "لایه‌های فنی",
            content: "Physical Layer، ATM Layer و ATM Adaptation Layer (AAL)."
          }
        ]
      },
      {
        title: "ATM 🔸 12- لایه فیزیکی",
        content:
          "جزئیات لایه فیزیکی، وظایب آن و زیرلایه‌های PMD و TC.",
        subtopics: [
          {
            title: "وظایف لایه فیزیکی",
            content: "تبدیل سلول به بیت، کنترل ارسال/دریافت و تشخیص مرز سلول‌ها."
          },
          {
            title: "زیرلایه PMD",
            content: "وابسته به محیط فیزیکی (نوری یا الکتریکی)."
          },
          {
            title: "زیرلایه TC",
            content: "وظایف شامل Cell Delineation، HEC، Cell Rate Decoupling و Frame Adaptation."
          }
        ]
      },
      {
        title: "ATM 🔸 13- لایه تطبیق (AAL)",
        content:
          "نقش لایه AAL در سازگاری داده‌های کاربر با سلول‌های ATM و انواع آن.",
        subtopics: [
          {
            title: "انواع AAL",
            content: "AAL1، AAL2، AAL3/4 و AAL5."
          },
          {
            title: "کاربردها",
            content: "AAL1 و AAL2 برای سرویس‌های با نرخ ثابت (صدا/ویدیو)؛ AAL3/4 و AAL5 برای داده."
          },
          {
            title: "AAL5",
            content: "نسخه بهینه‌شده و پرکاربرد برای انتقال داده‌های IP و LAN Emulation."
          }
        ]
      }
    ]
  };