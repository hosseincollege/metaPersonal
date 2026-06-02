  // src/lessons/university/5- شبکه های گسترده.js

export default {
  // ================== فصل 5- شبکه های گسترده ==================

    section: "5- شبکه های گسترده",
    topics: [
      {
        title: "🔸 دفتر شبکه های گسترده",
        content:
          "🔸 استاد:سید محمد مهدی فیض \n"+
          "📘✅ 1- Introduction to WAN.pdf 🚧 شامل 13 فصل و 139 صفحه \n"+
          "📘✅ 2- X.25.pdf 🚧 شامل 11 فصل و 32 صفحه \n"+
          "📘✅ 3- Frame Relay.pdf 🚧 شامل 14 فصل و 33 صفحه \n"+
          "📘✅ 4- ATM.pdf 🚧 شامل 13 فصل و 32 صفحه \n"+
          "🔸 کانال بله درس های کارشناسی علمی کاربردی عضو شدم \n"+
          "🔸 از 23 فروردین 🚧 یکشنبه ها ساعت 18:00 \n"+
          "🔸 مطالب میانترم شبکه گسترده برای پایانترم حذف شد \n"+
          "✅ حذف اسلاید 1-69 از فایل 1- Introduction to WAN  ",
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
            "✅ یکشنبه 03 خرداد ۱۴۰۵ 🚧 شرکت کردم 🚧 ص 130 sonet , WAN و x25 هم اوایل اون تدریس شد \n"+
            "✅ یکشنبه 10 خرداد ۱۴۰۵ 🚧 شرکت کردم 🚧 تدریس x.25 بود  \n"
          },
        ]
      },
      {
        title: "1⃣ 🔸 1- مقدمه",
        content:
          "مروری بر مفاهیم پایه WAN، چیستی شبکه‌های گسترده و انگیزه/ضرورت استفاده از آن‌ها در ارتباطات امروزی.",
        subtopics: [
          {
            title: "مقدمه‌ای بر شبکه‌های گسترده",
            content: "تعریف کلی WAN و تفاوت‌های بنیادین آن با LAN."
          },
          {
            title: "معرفی شبکه‌های گسترده",
            content: "نمای کلی از کاربردها، ویژگی‌ها و جایگاه WAN در شبکه‌های امروزی."
          },
          {
            title: "معرفی WAN",
            content: "آشنایی اولیه با مفهوم WAN و سناریوهای متداول استفاده."
          },
          {
            title: "WAN چیست؟",
            content: "تعریف دقیق Wide Area Network و محدوده پوشش جغرافیایی آن."
          },
          {
            title: "چرا WANها ضروری هستند؟",
            content: "نیاز سازمان‌ها به اتصال شعب، یکپارچه‌سازی منابع و دسترسی راه‌دور."
          }
        ]
      },
      {
        title: "1⃣ 🔸 2- تحول یک شرکت",
        content:
          "سیر تکامل نیازهای شبکه در سازمان‌ها از ساختارهای ساده تا سازمان‌های چندشعبه‌ای و ورود WAN.",
        subtopics: [
          {
            title: "تحول یک شرکت (Enterprise Evolving)",
            content: "بررسی روند رشد سازمان و تغییر معماری شبکه همگام با توسعه کسب‌وکار."
          }
        ]
      },
      {
        title: "1⃣ 🔸 3- معماری سازمانی سیسکو",
        content:
          "مروری بر معماری Enterprise سیسکو و ماژول‌های اصلی آن برای طراحی شبکه سازمانی.",
        subtopics: [
          {
            title: "معماری سازمانی سیسکو",
            content: "معرفی نمای کلی معماری Enterprise و نگاه ماژولار سیسکو به طراحی شبکه."
          }
        ]
      },
      {
        title: "1⃣ 🔸 4- مفاهیم",
        content:
          "-",
        subtopics: [
          {
            title: "اصطلاحات فنی لایه فیزیکی WAN",
            content: "بررسی مفاهیم و واژه‌های رایج در لایه فیزیکی شبکه‌های گسترده شامل CPE، DCE، DTE، حلقه محلی (Local Loop)، نقطه Demarcation و دفتر مرکزی (Central Office).",
          },
          {
            title: "تجهیزات WAN",
            content: "آشنایی با تجهیزات مورد استفاده در شبکه‌های WAN از جمله Modem، CSU/DSU، Access Server، WAN Switch، Router و Core Router و نقش هرکدام در ارتباطات WAN.",
          },
          {
            title: "پروتکل‌های پیوند داده WAN",
            content: "معرفی پروتکل‌های لایه دوم در شبکه‌های WAN شامل HDLC، PPP، Frame Relay، ATM و MPLS و بررسی نقش آن‌ها در انتقال داده.",
          },
          {
            title: "کپسوله‌سازی در WAN",
            content: "بررسی فرآیند Encapsulation در لایه پیوند داده، نحوه قرار گرفتن داده لایه شبکه داخل فریم‌های WAN و ساختار فریم HDLC.",
          },
          {
            title: "سوئیچینگ مداری (Circuit Switching)",
            content: "بررسی نحوه ایجاد یک مدار اختصاصی قبل از انتقال داده، عملکرد TDM و نمونه‌هایی از شبکه‌های سوئیچینگ مداری مانند PSTN و ISDN.",
          },
          {
            title: "سوئیچینگ بسته‌ای (Packet Switching)",
            content: "بررسی انتقال داده به صورت بسته‌های مستقل در شبکه، امکان اشتراک لینک‌ها بین کاربران و مقایسه با سوئیچینگ مداری.",
          },
          {
            title: "مدار مجازی (Virtual Circuit)",
            content: "آشنایی با مفهوم Virtual Circuit در شبکه‌های Packet Sw و بررسی انواع آن شامل PVC (Permanent Virtual Circuit) و SVC (Switched Virtual Circuit).",
          },

        ]
      },
      {
        title: "1⃣ 🔸 5- شبکه تلفن عمومی سوئیچ‌شده (PSTN)",
        content:
          "آشنایی با PSTN به‌عنوان بستر سنتی ارتباطات تلفنی و نقش آن در برخی سرویس‌های WAN.",
        subtopics: [
          {
            title: "شبکه تلفن عمومی سوئیچ‌شده (PSTN)",
            content: "تعریف PSTN، ساختار کلی و کاربردهای آن در ارتباطات راه‌دور."
          }
        ]
      },
      {
        title: "1⃣ 🔸 6- شبکه دیجیتال خدمات یکپارچه (ISDN)",
        content:
          "معرفی ISDN و انواع دسترسی‌های آن برای انتقال دیجیتال داده/صوت روی شبکه تلفن.",
        subtopics: [
          {
            title: "شبکه دیجیتال خدمات یکپارچه (ISDN)",
            content: "آشنایی با مفهوم ISDN و سرویس‌دهی دیجیتال روی زیرساخت مخابراتی."
          },
          {
            title: "ISDN-BRI",
            content: "بررسی Basic Rate Interface، کانال‌ها و ویژگی‌های اصلی BRI."
          },
          {
            title: "ISDN-PRI",
            content: "بررسی Primary Rate Interface، ظرفیت‌ها و کاربردهای PRI در سازمان‌ها."
          }
        ]
      },
      {
        title: "1⃣ 🔸 7- Point-to-Point WANs",
        content:
          "مبانی ارتباطات نقطه‌به‌نقطه در WAN و تکنولوژی‌های رایج دسترسی در این مدل.",
        subtopics: [
          {
            title: "Point-to-Point WANs",
            content: "تعریف ارتباط نقطه‌به‌نقطه، سناریوها و مزایا/محدودیت‌ها."
          }
        ]
      },
      {
        title: "1⃣ 🔸 8- xDSL",
        content:
          "معرفی خانواده DSL به‌عنوان دسترسی پهن‌باند روی زوج‌سیم مسی و انواع آن.",
        subtopics: [
          {
            title: "xDSL",
            content: "مروری بر خانواده فناوری‌های DSL و ایده کلی انتقال دیتا روی خط تلفن."
          },
          {
            title: "ADSL",
            content: "معرفی ADSL و ویژگی نامتقارن بودن سرعت دانلود/آپلود."
          },
          {
            title: "HDSL",
            content: "معرفی HDSL و کاربردهای آن در لینک‌های دیجیتال روی مس."
          },
          {
            title: "DSL Variations: Upload Speed / Download Speed",
            content: "مقایسه کلی تغییرات DSL از نظر نرخ ارسال/دریافت داده."
          }
        ]
      },
      {
        title: "1⃣ 🔸 9- Cable Modem",
        content:
          "آشنایی با دسترسی اینترنت/داده از طریق شبکه کابلی و نقش Cable Modem در اتصال WAN.",
        subtopics: [
          {
            title: "Cable Modem",
            content: "مبانی مودم کابلی، بستر انتقال و ویژگی‌های کلی این نوع دسترسی."
          }
        ]
      },
      {
        title: "1⃣ 🔸 10- T-Carrier",
        content:
          "معرفی خطوط حامل T به‌عنوان بسترهای دیجیتال اجاره‌ای و کاربردشان در WAN.",
        subtopics: [
          {
            title: "T-Carrier",
            content: "مروری بر T1/T3 و مفهوم خطوط اجاره‌ای دیجیتال برای اتصال نقطه‌به‌نقطه."
          }
        ]
      },
      {
        title: "1⃣ 🔸 11- SONET",
        content:
          "آشنایی با SONET به‌عنوان استاندارد انتقال نوری در شبکه‌های نقطه‌به‌نقطه و ستون فقرات مخابراتی.",
        subtopics: [
          {
            title: "SONET",
            content: "معرفی SONET و کاربردهای آن در شبکه‌های نوری و WAN."
          },
          {
            title: "اجزای اصلی شبکه SONET",
            content: "معرفی اجزای کلیدی و نقش تجهیزات اصلی در معماری SONET."
          }
        ]
      },
      {
        title: "1⃣ 🔸 12- PPP (Point-to-Point Protocol)",
        content:
          "معرفی PPP به‌عنوان پروتکل لینک داده برای ارتباطات نقطه‌به‌نقطه و قابلیت‌های آن.",
        subtopics: [
          {
            title: "PPP (Point-to-Point Protocol)",
            content: "مبانی PPP، محل قرارگیری در مدل لایه‌ای و موارد استفاده در WAN."
          }
        ]
      },
      {
        title: "1⃣ 🔸 13- Switched WANs",
        content:
          "معرفی WANهای سوئیچ‌شده و ایده کلی سوئیچینگ در بستر WAN.",
        subtopics: [
          {
            title: "Switched WANs",
            content: "تعریف Switched WANs و تمایز کلی آن با لینک‌های اختصاصی نقطه‌به‌نقطه."
          }
        ]
      },
      {
        title: "2⃣ 🔸 1- Introduction",
        content:
          "معرفی X.25 به‌عنوان یکی از اولین WANهای سوئیچ‌شده؛ کاربردها در PDNها، سرویس انتها به انتها، نحوه کار به‌صورت packet switching، مزایا/معایب، چالش کپسوله‌سازی IP در X.25، سرعت‌های 56/64K و مدیریت استاندارد توسط ITU-T.",
        subtopics: [
          {
            title: "پروتکل X.25",
            content:
              "X.25 یک استاندارد ارتباطی WAN است که ایجاد و نگهداری اتصال بین تجهیزات کاربر و تجهیزات شبکه را تعریف می‌کند."
          },
          {
            title: "Introduction to X.25",
            content:
              "معرفی تاریخی X.25 (دهه 1970)، استفاده در شبکه‌های عمومی داده (PDN) و محبوبیت در اروپا و آمریکا."
          },
          {
            title: "مزیت‌ها و معایب X.25",
            content:
              "مزیت: استاندارد جهانی. معایب: سربار کپسوله‌سازی IP و کنترل خطای گسترده که باعث کاهش سرعت و محبوبیت می‌شود."
          },
          {
            title: "استانداردسازی (ITU-T)",
            content:
              "استاندارد X.25 توسط ITU-T نگهداری/مدیریت می‌شود و برای شبکه‌های عمومی داده توسعه یافت."
          }
        ]
      },
      {
        title: "2⃣ 🔸 2- Devices and Protocol Operation",
        content:
          "معرفی اجزای اصلی شبکه X.25 و نقش هرکدام در شبکه‌های switched-packet: DTE، DCE، PSE و عملکرد کلی تبادل بسته در PSN.",
        subtopics: [
          {
            title: "X.25 Devices and Protocol Operation",
            content:
              "دستگاه‌های X.25 به سه دسته اصلی تقسیم می‌شوند: DTE، DCE و PSE و باهم جریان ارسال/دریافت بسته‌ها را شکل می‌دهند."
          },
          {
            title: "Data Terminal Equipment (DTE)",
            content:
              "سیستم‌های انتهایی (مثل PC/Host) که معمولاً مالکیت آن‌ها با مشترک است و از طریق X.25 ارتباط برقرار می‌کنند."
          },
          {
            title: "Data Circuit-terminating Equipment (DCE)",
            content:
              "تجهیزات ارتباطی/واسط (مثل مودم‌ها و تجهیزات حامل) که بین DTE و شبکه حامل/سوئیچینگ قرار می‌گیرند."
          },
          {
            title: "Packet Switching Exchange (PSE)",
            content:
              "سوئیچ‌های بسته‌ای داخل شبکه حامل که بسته‌ها را در شبکه X.25 (PSN) مسیریابی/Forward می‌کنند."
          }
        ]
      },
      {
        title: "2⃣ 🔸 3- Packet Assembler/Disassembler (PAD)",
        content:
          "معرفی PAD به‌عنوان تجهیز رایج X.25 بین DTE و DCE و تشریح سه وظیفه اصلی آن: Buffering، Packet Assembly و Packet Disassembly.",
        subtopics: [
          {
            title: "Packet Assembler/Disassembler (PAD)",
            content:
              "PAD معمولاً بین DTE و DCE قرار می‌گیرد و داده را برای ارسال/دریافت روی شبکه X.25 آماده می‌کند."
          },
          {
            title: "Buffering",
            content:
              "ذخیره‌سازی داده تا زمانی که مقصد/پردازش‌گر آماده دریافت یا پردازش باشد."
          },
          {
            title: "Packet Assembly",
            content:
              "اسمبل کردن داده خروجی در قالب بسته و ارسال به DCE (همراه با افزودن سرآیند X.25)."
          },
          {
            title: "Packet Disassembly",
            content:
              "جدا کردن بسته‌های ورودی قبل از تحویل داده به DTE (از جمله حذف سرآیند X.25)."
          }
        ]
      },
      {
        title: "2⃣ 🔸 4- Session Establishment",
        content:
          "مراحل ایجاد، قبول/رد و خاتمه یک جلسه ارتباطی X.25 بین دو DTE و شروع انتقال اطلاعات دوطرفه پس از پذیرش اتصال.",
        subtopics: [
          {
            title: "X.25 Session Establishment",
            content:
              "جلسه زمانی ایجاد می‌شود که یک DTE برای برقراری ارتباط با DTE دیگر تماس/درخواست اتصال ارسال کند."
          },
          {
            title: "Accept/Reject Connection",
            content:
              "DTE مقصد می‌تواند درخواست را بپذیرد یا رد کند؛ در صورت پذیرش ارتباط دوطرفه آغاز می‌شود."
          },
          {
            title: "Session Termination",
            content:
              "هر یک از طرفین می‌تواند اتصال را خاتمه دهد؛ برای ارتباط مجدد نیاز به جلسه جدید است."
          }
        ]
      },
      {
        title: "2⃣ 🔸 5- Virtual Circuits",
        content:
          "تعریف مدار مجازی در X.25 و تشریح انواع SVC و PVC، امکان چند VC روی یک مدار فیزیکی، و روند عبور بسته‌ها از DTE→DCE→PSE تا رسیدن به مقصد.",
        subtopics: [
          {
            title: "X.25 Virtual Circuits",
            content:
              "مدار مجازی یک اتصال منطقی دوطرفه برای ارتباط مطمئن بین دو DTE از طریق شبکه X.25 است."
          },
          {
            title: "Switched Virtual Circuits (SVCs)",
            content:
              "اتصال موقتی؛ هر بار که نیاز باشد جلسه ایجاد/نگهداری/خاتمه می‌شود (مناسب ترافیک پراکنده)."
          },
          {
            title: "Permanent Virtual Circuits (PVCs)",
            content:
              "اتصال پایدار و دائمی؛ همیشه فعال است و معمولاً نیازی به ایجاد/خاتمه جلسه برای شروع ارسال ندارد."
          },
          {
            title: "Packet Path (DTE → DCE → PSE)",
            content:
              "DCE با بررسی سرآیند بسته، VC را تشخیص می‌دهد و بسته را به PSEها ارسال می‌کند تا در مسیر به DCE و سپس DTE مقصد برسد."
          }
        ]
      },
      {
        title: "2⃣ 🔸 6- Protocol Suite",
        content:
          "نگاشت مجموعه پروتکل X.25 به سه لایه پایینی OSI و معرفی اجزای کلیدی: PLP در لایه شبکه، LAPB در لایه پیوند، و استانداردهای فیزیکی/سریال.",
        subtopics: [
          {
            title: "X.25 Protocol Suite",
            content:
              "X.25 به سه لایه پایین OSI نگاشت می‌شود و معمولاً شامل PLP، LAPB و استانداردهای فیزیکی/اینترفیس است."
          },
          {
            title: "Packet-Layer Protocol (PLP)",
            content:
              "پروتکل لایه شبکه X.25 برای مدیریت تبادل بسته‌ها و کنترل‌های مرتبط در مدار مجازی."
          },
          {
            title: "Link Access Procedure, Balanced (LAPB)",
            content:
              "پروتکل لایه پیوند برای فریمینگ و تضمین ارسال مرتب و بدون خطا بین DTE و DCE."
          },
          {
            title: "Physical Interfaces",
            content:
              "استانداردهای فیزیکی/سریال (مانند EIA/TIA-232، EIA/TIA-449، G.703 و ...) در پیاده‌سازی‌ها دیده می‌شوند."
          }
        ]
      },
      {
        title: "2⃣ 🔸 7- Packet-Layer Protocol (PLP)",
        content:
          "جزئیات PLP: نقش PLP در مدیریت تبادل بسته‌ها در VC، مدهای کاری (Call Setup, Data Transfer, Idle, Call Clearing, Restarting) و فیلدهای اصلی بسته (GFI/LCI/PTI/User Data).",
        subtopics: [
          {
            title: "Packet-Layer Protocol (PLP)",
            content:
              "PLP پروتکل لایه شبکه X.25 است و مبادله بسته‌ها بین DTEها در مدارهای مجازی را مدیریت می‌کند."
          },
          {
            title: "PLP Modes",
            content:
              "Call Setup، Data Transfer، Idle، Call Clearing و Restarting."
          },
          {
            title: "General Format Identifier (GFI)",
            content:
              "پارامترهای کلی بسته را مشخص می‌کند (کنترلی/کاربر، نیاز به تأیید تحویل و ...)."
          },
          {
            title: "Logical Channel Identifier (LCI)",
            content:
              "کانال/مدار مجازی مورد استفاده توسط DTE/DCE محلی را مشخص می‌کند."
          },
          {
            title: "Packet Type Identifier (PTI) و User Data",
            content:
              "PTI نوع بسته PLP را مشخص می‌کند؛ User Data شامل داده/کپسوله‌سازی لایه‌های بالاتر است (در بسته‌های داده)."
          }
        ]
      },
      {
        title: "2⃣ 🔸 8- Link Access Procedure, Balanced (LAPB)",
        content:
          "بررسی LAPB به‌عنوان پروتکل پیوندِ مبتنی بر بیت برای تضمین ترتیب و صحت فریم‌ها؛ معرفی انواع فریم I/S/U و وظایف کنترل جریان/خطا.",
        subtopics: [
          {
            title: "Link Access Procedure, Balanced (LAPB)",
            content:
              "LAPB ارتباط و فریمینگ بین DTE و DCE را انجام می‌دهد و انتقال بدون خطا و مرتب فریم‌ها را تضمین می‌کند."
          },
          {
            title: "Information Frame (I-frame)",
            content:
              "حامل داده لایه‌های بالاتر + اطلاعات کنترلی؛ شامل sequencing، کنترل جریان و تشخیص/بازیابی خطا."
          },
          {
            title: "Supervisory Frame (S-frame)",
            content:
              "فریم کنترلی برای درخواست/تعلیق انتقال، گزارش وضعیت و تأیید دریافت I-frame."
          },
          {
            title: "Unnumbered Frame (U-frame)",
            content:
              "فریم کنترلی برای ایجاد/قطع اتصال و گزارش خطا؛ بدون شماره ترتیبی."
          }
        ]
      },
      {
        title: "2⃣ 🔸 9- X.21bis Protocol",
        content:
          "معرفی X.21bis به‌عنوان پروتکل لایه فیزیکی مورد استفاده در X.25؛ تعریف رویه‌های مکانیکی/الکتریکی، فعال/غیرفعال‌سازی رسانه فیزیکی و ویژگی‌های ارتباط نقطه‌به‌نقطه.",
        subtopics: [
          {
            title: "X.21bis Protocol",
            content:
              "پروتکل فیزیکی برای تعریف ویژگی‌های مکانیکی/الکتریکی رسانه و مدیریت فعال‌سازی/غیرفعال‌سازی لینک بین DTE و DCE."
          },
          {
            title: "Physical Link Characteristics",
            content:
              "پشتیبانی از ارتباط نقطه‌به‌نقطه، همزمانی و سرعت‌های مشخص‌شده در اسلاید (مثلاً تا 19.2Kbps) روی رسانه‌های 4 سیمه."
          }
        ]
      },
      {
        title: "2⃣ 🔸 10- LAPB Frame Format",
        content:
          "تشریح قالب فریم LAPB شامل Header، Data و Trailer و معرفی فیلدهای Flag، Address، Control، DATA و FCS.",
        subtopics: [
          {
            title: "LAPB Frame Format",
            content:
              "فریم LAPB شامل سرآیند، داده کپسوله‌شده و دنباله است."
          },
          {
            title: "Flag / Address / Control",
            content:
              "Flag مرز شروع/پایان فریم را مشخص می‌کند؛ Address نوع command/response را نشان می‌دهد؛ Control نوع فریم (I/S/U) و اطلاعات ترتیبی را تعیین می‌کند."
          },
          {
            title: "DATA / FCS",
            content:
              "DATA محتوای لایه بالاتر را حمل می‌کند؛ FCS برای کنترل خطا و صحت داده استفاده می‌شود."
          }
        ]
      },
      {
        title: "2⃣ 🔸 11- X.121 Address Format",
        content:
          "معرفی قالب آدرس‌دهی X.121 برای ایجاد SVC در Call Setup؛ توضیح اجزای IDN/DNIC/NTN و نقش DNIC در تعیین کشور و PSN مقصد.",
        subtopics: [
          {
            title: "X.121 Address Format",
            content:
              "آدرس‌دهی X.121 توسط PLP در Call Setup برای ایجاد SVC استفاده می‌شود."
          },
          {
            title: "DNIC",
            content:
              "کدی (اختیاری در برخی مکالمات داخلی) برای مشخص کردن شبکه داده مقصد؛ شامل زیر فیلدهای Country و PSN."
          },
          {
            title: "NTN",
            content:
              "شماره ترمینال ملی؛ تعیین می‌کند بسته به کدام DTE در PSN مقصد هدایت شود (طول متغیر)."
          }
        ]
      },
      {
        title: "2⃣ 🔸 12- مراجع",
        content:
          "فهرست منابع مورد استفاده برای این بخش (طبق متن ارائه‌شده).",
        subtopics: [
          {
            title: "TCP/IP protocol Suite by Behrouz Forouzan",
            content: "منبع برای مفاهیم پایه شبکه و پروتکل‌ها."
          },
          {
            title: "Internetworking Technologies Handbook (Cisco Press)",
            content: "Fourth edition, 2003."
          }
        ]
      },

      {
        title: "3⃣🔸 1- Introduction",
        content:
          "معرفی Frame Relay به عنوان یک فناوری WAN مبتنی بر packet switching با فریم‌های طول متغیر و Statistical Multiplexing که برای ارتباطات سریع‌تر و ساده‌تر نسبت به X.25 طراحی شده است.",
        subtopics: [
          {
            title: "تعریف Frame Relay",
            content: "آشنایی با Frame Relay به عنوان یک پروتکل WAN برای انتقال داده با کارایی بالا."
          },
          {
            title: "Packet Switching",
            content: "استفاده از بسته‌ها/فریم‌های با طول متغیر برای انتقال داده در شبکه."
          },
          {
            title: "Statistical Multiplexing",
            content: "اشتراک‌گذاری پهنای باند میان چندین اتصال برای افزایش بهره‌وری لینک."
          },
          {
            title: "مقایسه با X.25",
            content: "سادگی بیشتر، سربار کمتر، و حذف بسیاری از مکانیزم‌های کنترل خطای داخلی برای دستیابی به سرعت بالاتر."
          }
        ]
      },
      {
        title: "3⃣🔸 2- Standardization",
        content:
          "بررسی روند استانداردسازی Frame Relay و نقش شرکت‌ها و نهادهای بین‌المللی در توسعه و پذیرش آن.",
        subtopics: [
          {
            title: "توسعه اولیه",
            content: "مشارکت شرکت‌هایی مانند Cisco، DEC، Northern Telecom و StrataCom در شکل‌گیری اولیه فناوری."
          },
          {
            title: "نقش ITU-T",
            content: "استانداردسازی مفاهیم و خدمات مرتبط با Frame Relay در توصیه‌های مخابراتی."
          },
          {
            title: "نقش ANSI",
            content: "ارائه استانداردهای تکمیلی برای پیاده‌سازی و سازگاری تجهیزات."
          },
          {
            title: "اهمیت استانداردسازی",
            content: "ایجاد قابلیت همکاری بین تجهیزات کاربران و شبکه‌های ارائه‌دهندگان سرویس."
          }
        ]
      },
      {
        title: "3⃣🔸 3- Devices",
        content:
          "معرفی تجهیزات اصلی مورد استفاده در شبکه Frame Relay و نقش هر کدام در ارتباط WAN.",
        subtopics: [
          {
            title: "DTE",
            content: "Data Terminal Equipment مانند روتر یا تجهیزات کاربر که داده را ارسال و دریافت می‌کنند."
          },
          {
            title: "DCE",
            content: "Data Circuit-Terminating Equipment مانند تجهیزات شبکه ارائه‌دهنده که ارتباط را برقرار می‌کنند."
          },
          {
            title: "سوئیچ‌های Frame Relay",
            content: "تجهیزات داخل شبکه که فریم‌ها را بر اساس DLCI هدایت می‌کنند."
          },
          {
            title: "رابط کاربر و شبکه",
            content: "ارتباط بین DTE و DCE از طریق رابط استاندارد در لایه فیزیکی و پیوند داده."
          }
        ]
      },
      {
        title: "3⃣🔸 4- Virtual Circuits",
        content:
          "آشنایی با مفهوم مدار مجازی در Frame Relay و نحوه استفاده از مسیرهای منطقی به‌جای اتصال فیزیکی مستقیم.",
        subtopics: [
          {
            title: "مدار مجازی چیست؟",
            content: "یک مسیر منطقی در شبکه Frame Relay که بین دو نقطه برای تبادل داده تعریف می‌شود."
          },
          {
            title: "مزیت مدار مجازی",
            content: "استفاده بهینه از منابع شبکه بدون نیاز به لینک اختصاصی دائمی برای هر ارتباط."
          },
          {
            title: "انواع مدار مجازی",
            content: "تقسیم‌بندی به SVC و PVC برای پاسخ‌گویی به نیازهای مختلف ارتباطی."
          }
        ]
      },
      {
        title: "3⃣🔸 5- Switched Virtual Circuits (SVC)",
        content:
          "بررسی مدارات مجازی سوئیچ‌شونده که در صورت نیاز برقرار می‌شوند و پس از پایان ارتباط آزاد می‌گردند.",
        subtopics: [
          {
            title: "Call Setup",
            content: "مرحله برقراری ارتباط پیش از انتقال داده."
          },
          {
            title: "Data Transfer",
            content: "مرحله تبادل داده پس از شکل‌گیری مدار مجازی."
          },
          {
            title: "Idle",
            content: "وضعیت بیکار در زمانی که ارتباط برقرار است اما داده‌ای رد و بدل نمی‌شود."
          },
          {
            title: "Call Termination",
            content: "اتمام ارتباط و آزادسازی منابع شبکه."
          }
        ]
      },
      {
        title: "3⃣🔸 6- Permanent Virtual Circuits (PVC)",
        content:
          "معرفی مدارات مجازی دائمی که به‌صورت ثابت توسط ارائه‌دهنده سرویس پیکربندی می‌شوند و همیشه آماده استفاده هستند.",
        subtopics: [
          {
            title: "تعریف PVC",
            content: "مداری مجازی که بدون نیاز به برقراری تماس اولیه، همواره در دسترس است."
          },
          {
            title: "کاربرد PVC",
            content: "مناسب برای ارتباطات دائمی و پرتکرار بین شعب یا سایت‌های سازمانی."
          },
          {
            title: "مزیت نسبت به SVC",
            content: "سادگی بیشتر در بهره‌برداری و حذف تأخیر ناشی از برقراری اولیه ارتباط."
          }
        ]
      },
      {
        title: "3⃣🔸 7- Data-Link Connection Identifier (DLCI)",
        content:
          "بررسی شناسه DLCI که برای شناسایی منطقی مدارهای مجازی در لینک Frame Relay استفاده می‌شود.",
        subtopics: [
          {
            title: "تعریف DLCI",
            content: "یک شناسه محلی برای تشخیص مسیر منطقی هر مدار مجازی روی یک رابط."
          },
          {
            title: "اهمیت محلی بودن",
            content: "DLCI فقط در محدوده لینک محلی معنا دارد و الزاماً در کل شبکه یکتا نیست."
          },
          {
            title: "نقش در سوئیچینگ",
            content: "سوئیچ‌های Frame Relay با استفاده از DLCI فریم‌ها را به سمت مقصد مناسب هدایت می‌کنند."
          }
        ]
      },
      {
        title: "3⃣🔸 8- Congestion-Control Mechanism",
        content:
          "مکانیزم‌های کنترل ازدحام در Frame Relay برای مدیریت ترافیک و کاهش اثر اشباع شبکه.",
        subtopics: [
          {
            title: "FECN",
            content: "Forward Explicit Congestion Notification برای اعلام ازدحام به سمت گیرنده."
          },
          {
            title: "BECN",
            content: "Backward Explicit Congestion Notification برای اعلام ازدحام به سمت فرستنده."
          },
          {
            title: "DE",
            content: "Discard Eligibility برای مشخص کردن فریم‌هایی که در شرایط ازدحام اولویت حذف دارند."
          },
          {
            title: "مدیریت بار شبکه",
            content: "کمک به کاهش نرخ ارسال یا کنترل جریان داده در زمان ازدحام."
          }
        ]
      },
      {
        title: "3⃣🔸 9- Local Management Interface (LMI)",
        content:
          "معرفی LMI به عنوان رابط مدیریتی بین روتر کاربر و سوئیچ Frame Relay برای تبادل اطلاعات کنترلی و وضعیت مدارها.",
        subtopics: [
          {
            title: "وظیفه LMI",
            content: "ارائه پیام‌های مدیریتی بین DTE و DCE برای نگهداری و نظارت بر اتصال."
          },
          {
            title: "Status Messages",
            content: "اعلام وضعیت PVCها و در دسترس بودن مدارهای مجازی."
          },
          {
            title: "Keepalive Mechanism",
            content: "بررسی زنده بودن لینک و اطمینان از فعال بودن ارتباط."
          },
          {
            title: "LMI Extensions",
            content: "قابلیت‌هایی مانند گزارش وضعیت مدارها و برخی امکانات مدیریتی توسعه‌یافته."
          }
        ]
      },
      {
        title: "3⃣🔸 10- Network Implementation",
        content:
          "روش‌های پیاده‌سازی Frame Relay در شبکه‌های WAN و مدل‌های استقرار آن توسط سرویس‌دهنده یا سازمان.",
        subtopics: [
          {
            title: "مدل پیاده‌سازی",
            content: "چگونگی اتصال سایت‌ها از طریق شبکه Frame Relay."
          },
          {
            title: "زیرساخت ارائه‌دهنده",
            content: "استفاده از شبکه Carrier برای ایجاد ارتباط بین نقاط مختلف."
          },
          {
            title: "پیاده‌سازی سازمانی",
            content: "کاربرد Frame Relay در سناریوهای بین‌شعبه‌ای و WAN سازمانی."
          }
        ]
      },
      {
        title: "3⃣🔸 11- Public Carrier-Provided Networks",
        content:
          "بررسی استفاده از شبکه‌های عمومی ارائه‌شده توسط سرویس‌دهندگان مخابراتی برای پیاده‌سازی Frame Relay.",
        subtopics: [
          {
            title: "شبکه عمومی",
            content: "زیرساختی که توسط شرکت مخابراتی یا سرویس‌دهنده WAN ارائه می‌شود."
          },
          {
            title: "مزایا",
            content: "کاهش هزینه راه‌اندازی، سادگی توسعه، و استفاده از زیرساخت آماده."
          },
          {
            title: "محدودیت‌ها",
            content: "وابستگی به ارائه‌دهنده و کنترل کمتر بر جزئیات داخلی شبکه."
          }
        ]
      },
      {
        title: "3⃣🔸 12- Private Enterprise Networks",
        content:
          "بررسی پیاده‌سازی خصوصی Frame Relay در سازمان‌ها برای ایجاد کنترل بیشتر روی ارتباطات WAN.",
        subtopics: [
          {
            title: "شبکه خصوصی سازمانی",
            content: "استفاده از زیرساخت اختصاصی یا نیمه‌اختصاصی برای ارتباط بین واحدها و شعب."
          },
          {
            title: "مزایا",
            content: "امنیت بیشتر، کنترل مدیریتی بالاتر، و امکان طراحی متناسب با نیاز سازمان."
          },
          {
            title: "کاربردها",
            content: "مناسب برای سازمان‌های بزرگ با ترافیک مداوم و حساس."
          }
        ]
      },
      {
        title: "3⃣🔸 13- Frame Formats",
        content:
          "بررسی ساختار فریم در Frame Relay و نقش فیلدهای مختلف در انتقال داده و کنترل ارتباط.",
        subtopics: [
          {
            title: "Flag Fields",
            content: "فیلدهای آغاز و پایان فریم برای مشخص‌کردن مرز فریم."
          },
          {
            title: "Address Field",
            content: "شامل DLCI و بیت‌های کنترلی مورد نیاز برای مدیریت و هدایت فریم."
          },
          {
            title: "Data Field",
            content: "بخش اصلی حاوی داده کاربر."
          },
          {
            title: "FCS/CRC",
            content: "فیلد تشخیص خطا برای بررسی صحت فریم."
          }
        ]
      },
      {
        title: "3⃣🔸 14- LMI Frame Format",
        content:
          "ساختار فریم‌های ویژه LMI برای تبادل پیام‌های مدیریتی و وضعیت مدارها بین تجهیزات کاربر و شبکه.",
        subtopics: [
          {
            title: "LMI Frame Structure",
            content: "ساختار کلی فریم‌های مدیریتی مورد استفاده در LMI."
          },
          {
            title: "Status Inquiry",
            content: "پیام درخواست وضعیت برای بررسی شرایط مدارها و لینک."
          },
          {
            title: "Status Message",
            content: "پاسخ شبکه شامل وضعیت PVCها و اطلاعات مدیریتی."
          },
          {
            title: "کاربرد مدیریتی",
            content: "استفاده برای پایش، نگهداری، و مدیریت لینک Frame Relay."
          }
        ]
      },

      {
        title: "4⃣🔸 1- Asynchronous Transfer Mode",
        content:
          "معرفی ATM به عنوان یک فناوری WAN مبتنی بر cell relay با اندازه ثابت که توسط ITU-T استاندارد شده و برای انتقال همزمان داده، صدا و ویدیو طراحی شده است.",
        subtopics: [
          {
            title: "تعریف ATM",
            content: "ATM یک فناوری اتصال‌گرا و مبتنی بر مدار مجازی است که اطلاعات را در قالب سلول‌های کوچک و با اندازه ثابت منتقل می‌کند."
          },
          {
            title: "استانداردسازی توسط ITU-T",
            content: "استانداردهای ATM توسط ITU-T تعریف شدند تا یک بستر یکپارچه برای سرویس‌های مختلف فراهم شود."
          },
          {
            title: "پشتیبانی از چند نوع سرویس",
            content: "ATM برای انتقال داده، صدا و ویدیو در یک شبکه واحد طراحی شده است."
          },
          {
            title: "Connection-Oriented Network",
            content: "شبکه ATM از نوع اتصال‌گرا است و قبل از انتقال داده باید مسیر منطقی ارتباط برقرار شود."
          }
        ]
      },
      {
        title: "4⃣🔸 2- Devices and Network Environment",
        content:
          "بررسی محیط شبکه ATM و ویژگی‌های cell switching و multiplexing که مزایای circuit switching و packet switching را با هم ترکیب می‌کند.",
        subtopics: [
          {
            title: "Cell Switching",
            content: "ATM داده را در قالب سلول‌های ثابت جابه‌جا می‌کند تا انتقال یکنواخت‌تر و قابل پیش‌بینی‌تر باشد."
          },
          {
            title: "Multiplexing",
            content: "ATM با بهره‌گیری از multiplexing امکان اشتراک کارآمد ظرفیت لینک بین چند جریان داده را فراهم می‌کند."
          },
          {
            title: "ترکیب مزایای دو روش",
            content: "ATM مزایای پهنای باند تضمین‌شده و تأخیر قابل پیش‌بینی در circuit switching را با انعطاف‌پذیری packet switching ترکیب می‌کند."
          },
          {
            title: "مقایسه با TDM",
            content: "برخلاف TDM، در ATM منابع فقط هنگام نیاز مصرف می‌شوند و شکاف زمانی بلااستفاده هدر نمی‌رود."
          }
        ]
      },
      {
        title: "4⃣🔸 3- Cell Basic Format",
        content:
          "بررسی ساختار سلول ATM و دلیل استفاده از سلول‌های کوچک و با اندازه ثابت برای انتقال کارآمد داده‌های حساس به تأخیر.",
        subtopics: [
          {
            title: "ساختار 53 بایتی سلول",
            content: "هر سلول ATM از 5 بایت header و 48 بایت payload تشکیل می‌شود."
          },
          {
            title: "Header",
            content: "بخش header شامل اطلاعات کنترلی و مسیریابی مورد نیاز برای هدایت سلول در شبکه است."
          },
          {
            title: "Payload",
            content: "بخش payload داده کاربر را حمل می‌کند."
          },
          {
            title: "مزیت اندازه ثابت",
            content: "سلول‌های کوچک و ثابت برای سرویس‌های حساس به تأخیر مانند صوت و ویدیو مناسب هستند."
          }
        ]
      },
      {
        title: "4⃣🔸 4- Devices",
        content:
          "معرفی تجهیزات اصلی در شبکه ATM و نقش switchها و endpointها در انتقال سلول‌ها.",
        subtopics: [
          {
            title: "ATM Switch",
            content: "سوئیچ ATM سلول‌ها را دریافت کرده، header را بررسی و به‌روزرسانی می‌کند و آن‌ها را به مسیر خروجی مناسب هدایت می‌کند."
          },
          {
            title: "ATM Endpoint",
            content: "Endpointها شامل سیستم‌های انتهایی مجهز به رابط ATM هستند که داده را وارد شبکه می‌کنند یا از آن دریافت می‌کنند."
          },
          {
            title: "نمونه Endpointها",
            content: "ایستگاه‌های کاری، روترها، LAN switchها، DSUها و video coder-decoderها از نمونه‌های endpoint هستند."
          },
          {
            title: "نقش تجهیزات در شبکه",
            content: "Switchها مسئول سوئیچینگ درون شبکه و endpointها مسئول تولید یا مصرف داده هستند."
          }
        ]
      },
      {
        title: "4⃣🔸 5- Network Interfaces",
        content:
          "معرفی واسط‌های ارتباطی شبکه ATM و تفاوت رابط‌های UNI و NNI در محیط‌های عمومی و خصوصی.",
        subtopics: [
          {
            title: "UNI",
            content: "User-to-Network Interface برای اتصال endpointهای ATM مانند میزبان و روتر به ATM switch به‌کار می‌رود."
          },
          {
            title: "NNI",
            content: "Network-to-Network Interface برای اتصال دو ATM switch استفاده می‌شود."
          },
          {
            title: "Private Interfaces",
            content: "در شبکه خصوصی، UNI و NNI میان تجهیزات داخل سازمان برقرار می‌شوند."
          },
          {
            title: "Public Interfaces",
            content: "در شبکه عمومی، endpoint یا سوئیچ خصوصی به سوئیچ شبکه عمومی متصل می‌شود."
          }
        ]
      },
      {
        title: "4⃣🔸 6- Cell Header Format",
        content:
          "بررسی دو قالب اصلی header در ATM یعنی UNI Header و NNI Header و تفاوت‌های آن‌ها.",
        subtopics: [
          {
            title: "UNI Header",
            content: "در ارتباط بین ATM endpoint و ATM switch استفاده می‌شود و شامل فیلد GFC است."
          },
          {
            title: "NNI Header",
            content: "در ارتباط بین ATM switchها استفاده می‌شود و به‌جای GFC از بیت‌های بیشتر برای VPI بهره می‌برد."
          },
          {
            title: "تفاوت UNI و NNI",
            content: "تفاوت اصلی این دو قالب در نحوه استفاده از بیت‌های header، به‌ویژه در فیلدهای GFC و VPI است."
          }
        ]
      },
      {
        title: "4⃣🔸 7- Cell Header Fields",
        content:
          "توضیح فیلدهای اصلی header سلول ATM و نقش هر کدام در کنترل و هدایت سلول‌ها.",
        subtopics: [
          {
            title: "GFC",
            content: "Generic Flow Control یک فیلد 4 بیتی در UNI است که برای کنترل جریان محلی در نظر گرفته شده و معمولاً استفاده نمی‌شود."
          },
          {
            title: "VPI",
            content: "Virtual Path Identifier برای شناسایی مسیر مجازی در شبکه ATM به‌کار می‌رود."
          },
          {
            title: "VCI",
            content: "Virtual Channel Identifier همراه با VPI برای شناسایی کانال مجازی و مقصد بعدی سلول استفاده می‌شود."
          },
          {
            title: "PT",
            content: "Payload Type نوع داده سلول را مشخص می‌کند؛ مانند داده کاربر، داده کنترلی و وضعیت ازدحام."
          },
          {
            title: "CLP",
            content: "Cell Loss Priority مشخص می‌کند آیا سلول در شرایط ازدحام در اولویت حذف قرار دارد یا نه."
          },
          {
            title: "HEC",
            content: "Header Error Control برای تشخیص و در برخی موارد تصحیح خطای header و همچنین کمک به تشخیص مرز سلول به‌کار می‌رود."
          }
        ]
      },
      {
        title: "4⃣🔸 8- Services",
        content:
          "معرفی انواع سرویس‌های ATM و تفاوت میان مدارهای مجازی دائمی، سوئیچ‌شونده و سرویس بدون اتصال.",
        subtopics: [
          {
            title: "Permanent Virtual Circuit (PVC)",
            content: "یک اتصال از پیش تعریف‌شده و پایدار است که بدون نیاز به call setup در دسترس قرار دارد."
          },
          {
            title: "مزایا و محدودیت‌های PVC",
            content: "PVC همیشه در دسترس است، اما ایستا بوده و پیکربندی آن معمولاً به‌صورت دستی انجام می‌شود."
          },
          {
            title: "Switched Virtual Circuit (SVC)",
            content: "یک اتصال پویا است که هنگام نیاز برقرار شده و پس از پایان ارتباط آزاد می‌شود."
          },
          {
            title: "مزایا و محدودیت‌های SVC",
            content: "SVC انعطاف‌پذیری بیشتری دارد، اما برقراری آن به زمان و سربار سیگنالینگ نیاز دارد."
          },
          {
            title: "Connectionless Service",
            content: "در برخی کاربردها نوعی سرویس بدون اتصال نیز مطرح می‌شود."
          }
        ]
      },
      {
        title: "4⃣🔸 9- Virtual Connection",
        content:
          "بررسی مفهوم اتصال مجازی در ATM و نقش Virtual Path و Virtual Channel در ساختار سلسله‌مراتبی ارتباط.",
        subtopics: [
          {
            title: "Connection-Oriented Nature",
            content: "در ATM پیش از ارسال داده باید یک کانال یا مسیر مجازی برقرار شود."
          },
          {
            title: "Virtual Path (VP)",
            content: "VP مجموعه‌ای از Virtual Channelها است که بر پایه یک VPI مشترک گروه‌بندی می‌شوند."
          },
          {
            title: "Virtual Channel (VC)",
            content: "VC مسیر منطقی انتقال داده است که با VCI شناسایی می‌شود."
          },
          {
            title: "اعتبار محلی VPI/VCI",
            content: "مقادیر VPI و VCI در هر لینک به‌صورت محلی معتبرند و در هر سوئیچ ممکن است دوباره نگاشت شوند."
          },
          {
            title: "Transmission Path",
            content: "رسانه فیزیکی‌ای که VPها و VCها را حمل می‌کند."
          }
        ]
      },
      {
        title: "4⃣🔸 10- Switching Operations",
        content:
          "توضیح نحوه عملکرد ATM switch در جستجوی جدول ترجمه و هدایت سلول‌ها به خروجی مناسب.",
        subtopics: [
          {
            title: "دریافت سلول",
            content: "سوئیچ سلول را همراه با مقادیر VPI و VCI از یک لینک ورودی دریافت می‌کند."
          },
          {
            title: "جستجو در Translation Table",
            content: "سوئیچ با مراجعه به جدول ترجمه محلی، پورت خروجی و شناسه‌های جدید مسیر را تعیین می‌کند."
          },
          {
            title: "نگاشت مجدد VPI/VCI",
            content: "چون VPI و VCI محلی هستند، ممکن است در هر سوئیچ دوباره مقداردهی شوند."
          },
          {
            title: "ارسال به لینک خروجی",
            content: "در نهایت سلول با شناسه‌های مناسب از پورت خروجی به مسیر بعدی ارسال می‌شود."
          }
        ]
      },
      {
        title: "4⃣🔸 11- Reference Model",
        content:
          "مدل مرجع ATM شامل planeها و لایه‌هایی است که عملکرد کلی شبکه ATM را توصیف می‌کنند.",
        subtopics: [
          {
            title: "Control Plane",
            content: "مسئول ایجاد، مدیریت و کنترل سیگنالینگ و برقراری اتصال‌ها است."
          },
          {
            title: "User Plane",
            content: "وظیفه انتقال داده کاربر را برعهده دارد."
          },
          {
            title: "Management Plane",
            content: "برای مدیریت کل سیستم و همچنین مدیریت وظایف خاص هر لایه استفاده می‌شود."
          },
          {
            title: "Physical Layer",
            content: "لایه فیزیکی مسئول انتقال وابسته به رسانه است."
          },
          {
            title: "ATM Layer",
            content: "این لایه وظایفی مانند cell multiplexing و cell relay را انجام می‌دهد."
          },
          {
            title: "ATM Adaptation Layer (AAL)",
            content: "این لایه داده لایه‌های بالاتر را برای انتقال روی ATM سازگار می‌کند."
          }
        ]
      },
      {
        title: "4⃣🔸 12- Physical Layer",
        content:
          "بررسی وظایف لایه فیزیکی ATM و معرفی دو زیرلایه اصلی PMD و TC.",
        subtopics: [
          {
            title: "وظایف لایه فیزیکی",
            content: "تبدیل سلول‌ها به جریان بیت، کنترل ارسال و دریافت بیت، دنبال‌کردن مرز سلول‌ها و قراردادن سلول‌ها در فریم مناسب."
          },
          {
            title: "PMD Sublayer",
            content: "Physical Medium-Dependent وظایف وابسته به رسانه فیزیکی مانند همگام‌سازی، نوع کابل و رابط فیزیکی را مدیریت می‌کند."
          },
          {
            title: "TC Sublayer",
            content: "Transmission Convergence وظایفی مانند cell delineation، تولید و بررسی HEC، cell rate decoupling و frame adaptation را انجام می‌دهد."
          }
        ]
      },
      {
        title: "4⃣🔸 13- Adaptation Layer (AAL)",
        content:
          "معرفی لایه تطبیق ATM و انواع AAL برای پشتیبانی از سرویس‌های مختلف مانند صوت، ویدیو و داده.",
        subtopics: [
          {
            title: "نقش AAL",
            content: "AAL داده لایه‌های بالاتر را برای تبدیل به payload سلول‌های ATM آماده می‌کند و عملیات segmentation and reassembly را انجام می‌دهد."
          },
          {
            title: "AAL1 و AAL2",
            content: "برای کاربردهایی طراحی شده‌اند که به نرخ بیت تضمین‌شده و انتقال بلادرنگ نیاز دارند."
          },
          {
            title: "AAL3/4",
            content: "برای سرویس‌های داده‌ای اتصال‌گرا و بدون اتصال در نظر گرفته شد."
          },
          {
            title: "AAL5",
            content: "به‌عنوان یک گزینه ساده‌تر و کارآمدتر برای کاربردهای داده‌ای معرفی شد و کاربرد گسترده‌ای پیدا کرد."
          }
        ]
      }

    ]
  };