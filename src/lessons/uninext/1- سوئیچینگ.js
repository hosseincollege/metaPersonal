  // src/lessons/university/3- سوئیچینگ.js

export default {
  // ================== فصل 3- سوئیچینگ و مسیریابی ==================

    section: "3- سوئیچینگ و مسیریابی",
    topics: [
      {
        title: "1- دفتر سوئیچینگ",
        content:
          "🔸 استاد:عباس تاتایی \n"+
          "📘✅ Jozveh Switching.pdf 🚧 شامل 4 فصل و 56 صفحه \n"+
          "🔸 انجام پروگرمینگ در برنامه پکت تریسر \n"+
          "🔸 از 18 فروردین 🚧 سه شنبه ها ساعت 14:00 \n",
        subtopics: [
          {
            title: "تکلیف، آزمون و غیره",
            content:
            "🔸 تاریخ 26 خرداد امتحان عملی 🚧 حضوری 🚧 راس ساعت کلاس 14 سایت دانشگاه  \n"
          },
          {
            title: "موارد انجام شده",
            content:
            "✅ 1 پیکربندی روتر جهت ارتباط telnet \n"+
            "✅ 2 پیکربندی DHCP بر روی یک اینترفیس روتر \n"+
            "✅ 3 پیکربندی سوئیج و روتر برای VLAN \n"+
            "✅ 4 پیکربندی VTP سوئیچ \n"+
            "✅ 5 تکلیف STP \n"+
            "✅ 6 sttic route 🚧 فک کنم سر کاری بود \n"+
            "✅ 7 RIP - OSPF - EIGRP Routing \n"
          },
          {
            title: "ریلاین",
            content: "🔸1 سه شنبه ۱۸ فروردین ۱۴۰۵ 🚧 وسط جلسه میپره کلاس/همون دوره CCNA Cisco/سوییچ های سیسکو/کدنویسی و پروگرم سیسکو/End device/NIC/کابلها \n"+
            "🔸2 سه شنبه ۰۱ اردیبهشت ۱۴۰۵ 🚧 وسط جلسه میپره کلاس/IMP/کابل BNC/ فیبر نوری/ \n"+
            "🔸3 سه شنبه ۰۸ اردیبهشت ۱۴۰۵ 🚧 سیسکو پکت تریسر /کانفیگ \n"+
            "🔸4 پارت یک- سه شنبه ۱۵ اردیبهشت ۱۴۰۵ 🚧 صدا بده/سیسکو پکت تریسر \n"+
            "🔸5 پارت دو -سه شنبه ۱۵ اردیبهشت ۱۴۰۵ 🚧 صدا بده/18 دقیقه توضیح تکالیف \n"+
            "🔸6 سه شنبه ۲۲ اردیبهشت ۱۴۰۵ 🚧 کامل گوش دادم /vtp /vlan trunking protocol پکت تریسر 3 تا سوییچ و هر کدوم سه تا پی سی و 1 سوییچ کور تکلیف همین سناریو \n"+
            "🔸7 سه شنبه 29 اردیبهشت ۱۴۰۵ 🚧 پروتکل STP \n"+
            "🔸8 سه شنبه 05 خرداد ۱۴۰۵ 🚧 روتینگ و مسیریابی استاتیک \n"+
            "✅9 سه شنبه 12 خرداد ۱۴۰۵ 🚧 شرکت کردم 🚧 نصفه \n"+
            "🔸 سه شنبه 19 خرداد ۱۴۰۵ 🚧 آنلاین 🚧 ندیدم هنوز \n"
          },
          {
            title: "دانلود فایل ها، جلسات جبرانی و آفلاین",
            content:
              "-"
          },
        ]
      },

      {
        title: "2- جزوه",
        content: "🔸 جزوه \n",
        subtopics: [
          {
            title: "مفاهیم پایه 🌐",
            content: "این فصل به مفاهیم پایه شبکه، دستگاه‌های پایانی و نقش کارت شبکه در برقراری ارتباط در شبکه آشنا می‌شویم.",
            details: [
              {
                title: "مفاهیم پایه",
                content: "شبکه مجموعه‌ای از دستگاه‌هاست که برای تبادل اطلاعات و اشتراک منابع به یکدیگر متصل شده‌اند. این ارتباط می‌تواند از طریق کابل یا به صورت بی‌سیم برقرار شود."
              },
              {
                title: "End device",
                content: "End Device به دستگاه‌هایی گفته می‌شود که کاربران مستقیماً با آن‌ها کار می‌کنند و در ابتدا یا انتهای مسیر ارتباط شبکه قرار دارند؛ مانند کامپیوتر، لپ‌تاپ، موبایل و پرینتر شبکه."
              },
              {
                title: "سرور / Host / میزبان",
                content: "سرور یا میزبان سیستمی است که منابع، داده‌ها یا سرویس‌هایی مانند فایل، وب یا پایگاه داده را در اختیار سایر دستگاه‌های شبکه قرار می‌دهد."
              },
              {
                title: "کلاینت / Terminal / سرویس‌گیرنده",
                content: "کلاینت دستگاهی است که برای دریافت خدمات به سرور متصل می‌شود و از منابع یا سرویس‌های ارائه‌شده در شبکه استفاده می‌کند."
              },
              {
                title: "NIC : Network Interface Card",
                content: "کارت شبکه یک قطعه سخت‌افزاری است که امکان اتصال یک دستگاه به شبکه را فراهم می‌کند و ارتباط میان سیستم و رسانه انتقال را برقرار می‌سازد."
              },
              {
                title: "وظایف NIC",
                content: "کارت شبکه مسئول ارسال و دریافت داده در شبکه، مدیریت آدرس MAC و آماده‌سازی اطلاعات برای انتقال روی رسانه شبکه است."
              },
              {
                title: "تبدیل سیگنال دیجیتال به آنالوگ و بالعکس",
                content: "کارت شبکه داده‌های دیجیتال سیستم را برای ارسال روی رسانه انتقال به سیگنال مناسب تبدیل می‌کند و در سمت دریافت نیز سیگنال را دوباره به داده دیجیتال تبدیل می‌کند."
              },
              {
                title: "تبدیل داده‌های موازی به سریال و بالعکس",
                content: "داده‌ها در داخل سیستم به صورت موازی پردازش می‌شوند اما برای انتقال روی کابل شبکه به صورت سریال ارسال می‌شوند و در مقصد دوباره به حالت موازی تبدیل می‌شوند."
              }
            ]
          },
          {
            title: "مدیا یا رسانه انتقال 📡",
            content: "این فصل به انواع رسانه‌های انتقال داده در شبکه شامل رسانه‌های بی‌سیم و کابلی و استانداردهای کابل‌کشی آشنا می‌شویم.",
            details: [
              {
                title: "Media یا رسانه انتقال",
                content: "رسانه انتقال بستری است که داده‌ها از طریق آن بین دستگاه‌های شبکه جابجا می‌شوند و می‌تواند به صورت سیمی یا بی‌سیم باشد."
              },
              {
                title: "رسانه بی‌سیم",
                content: "در ارتباطات بی‌سیم داده‌ها از طریق امواج الکترومغناطیسی منتقل می‌شوند و نیازی به کابل فیزیکی وجود ندارد."
              },
              {
                title: "Wifi",
                content: "WiFi فناوری شبکه بی‌سیم برای شبکه‌های محلی است که بر اساس استاندارد IEEE 802.11 کار می‌کند."
              },
              {
                title: "Wimax",
                content: "WiMAX فناوری بی‌سیم با برد بالا برای ارتباطات در مقیاس شهری است و می‌تواند مسافت‌های طولانی‌تری نسبت به WiFi پوشش دهد."
              },
              {
                title: "Microwave",
                content: "در ارتباط مایکروویو داده‌ها از طریق امواج رادیویی با فرکانس بالا منتقل می‌شوند و معمولاً برای ارتباط نقطه به نقطه در فاصله‌های طولانی استفاده می‌شود."
              },
              {
                title: "Infrared",
                content: "این نوع ارتباط از نور مادون قرمز برای انتقال داده در فاصله کوتاه استفاده می‌کند."
              },
              {
                title: "Lazer",
                content: "ارتباط لیزری برای انتقال داده با سرعت بالا از طریق نور لیزر در فضا یا فیبر استفاده می‌شود."
              },
              {
                title: "رسانه کابلی",
                content: "در این نوع ارتباط داده‌ها از طریق کابل‌های فیزیکی منتقل می‌شوند که پایداری و امنیت بیشتری دارند."
              },
              {
                title: "Twisted Pair",
                content: "کابل زوج به هم تابیده یکی از رایج‌ترین کابل‌های شبکه است که شامل چند زوج سیم پیچیده به هم برای کاهش نویز است."
              },
              {
                title: "Cat 2 تا Cat 7",
                content: "کابل‌های شبکه در دسته‌بندی‌های مختلفی از Cat2 تا Cat7 تولید می‌شوند که هر کدام سرعت و پهنای باند متفاوتی دارند."
              },
              {
                title: "استانداردهای رنگ‌بندی کابل ۸ رشته‌ای",
                content: "برای اتصال صحیح کابل شبکه از استانداردهای مشخص رنگ‌بندی استفاده می‌شود تا ترتیب سیم‌ها در سوکت RJ45 درست باشد."
              },
              {
                title: "568A",
                content: "یکی از استانداردهای رنگ‌بندی کابل شبکه است که ترتیب خاصی برای سیم‌ها در سوکت تعیین می‌کند."
              },
              {
                title: "568B",
                content: "استاندارد رایج دیگر برای کابل‌کشی شبکه است که تفاوت آن با 568A در ترتیب برخی سیم‌هاست."
              },
              {
                title: "Through / Straight / Cross / Over",
                content: "این اصطلاحات به نوع اتصال کابل شبکه اشاره دارند؛ کابل Straight برای اتصال دستگاه‌های متفاوت و کابل Cross برای اتصال دستگاه‌های مشابه استفاده می‌شود."
              },
              {
                title: "کاربردهای کابل Over-Roll",
                content: "این نوع کابل برای اتصال مستقیم دو دستگاه مشابه مانند دو کامپیوتر یا دو سوئیچ بدون استفاده از تجهیزات واسط به کار می‌رود."
              }
            ]
          },
          {
            title: "IMP یا واسط پیغام رسان 📦",
            content: "این فصل به تجهیزات اصلی شبکه و نقش آن‌ها در لایه‌های مختلف مدل شبکه آشنا می‌شویم.",
            details: [
              {
                title: "Protocol Messaging Interface (IMP)",
                content: "IMP یکی از مفاهیم اولیه در شبکه‌های قدیمی است که برای مدیریت ارسال پیام‌ها بین گره‌های شبکه استفاده می‌شد."
              },
              {
                title: "لایه 1",
                content: "لایه فیزیکی پایین‌ترین لایه شبکه است و مسئول انتقال بیت‌ها از طریق رسانه فیزیکی مانند هاب، کابل یا امواج است."
              },
              {
                title: "لایه 2",
                content: "سوئیچ در لایه دوم شبکه کار می‌کند و با استفاده از آدرس MAC داده‌ها را فقط به پورت مقصد ارسال می‌کند."
              },
              {
                title: "لایه 3",
                content: "روتر در لایه شبکه کار می‌کند و وظیفه مسیریابی بسته‌ها بین شبکه‌های مختلف را بر اساس آدرس IP بر عهده دارد."
              },
              {
                title: "لایه 4",
                content: "در این بخش به مفاهیم لایه چهارم ارتباطی و نحوه پیاده‌سازی مسیریابی با استفاده از فناوری Router MPLS پرداخته می‌شود."
              }
            ]
          },
          {
            title: "Packet Tracer 💻",
            content: "در این فصل با مفاهیم و پروتکل‌های مهمی که در نرم‌افزار Cisco Packet Tracer پیاده‌سازی و شبیه‌سازی می‌شوند آشنا می‌شویم.",
            details: [
              {
                title: "VLAN",
                content: "VLAN مخفف Virtual Local Area Network است. در Packet Tracer از VLAN برای تقسیم یک سوئیچ فیزیکی به چند شبکه منطقی استفاده می‌شود تا Broadcast Domain ها جدا شوند و امنیت و مدیریت شبکه افزایش یابد."
              },
              {
                title: "SSH",
                content: "SSH مخفف Secure Shell است. این پروتکل برای مدیریت امن روتر و سوئیچ از راه دور استفاده می‌شود. در Packet Tracer می‌توان برای دسترسی امن به تجهیزات شبکه، SSH را پیکربندی کرد."
              },
              {
                title: "Telnet",
                content: "Telnet یک پروتکل دسترسی از راه دور است که به صورت غیر رمزنگاری شده کار می‌کند. در Packet Tracer برای مدیریت تجهیزات شبکه از طریق CLI استفاده می‌شود اما از نظر امنیتی نسبت به SSH ضعیف‌تر است."
              },
              {
                title: "HTTP",
                content: "HTTP مخفف HyperText Transfer Protocol است. این پروتکل برای انتقال صفحات وب استفاده می‌شود. در Packet Tracer می‌توان سرور HTTP راه‌اندازی کرد تا کلاینت‌ها از طریق مرورگر به آن متصل شوند."
              },
              {
                title: "DNS",
                content: "DNS مخفف Domain Name System است. این سرویس وظیفه تبدیل نام دامنه به آدرس IP را بر عهده دارد. در Packet Tracer می‌توان DNS Server تنظیم کرد تا نام‌ها به IP تبدیل شوند."
              },
              {
                title: "DHCP",
                content: "DHCP مخفف Dynamic Host Configuration Protocol است. این پروتکل به صورت خودکار به دستگاه‌ها IP Address، Subnet Mask و Gateway اختصاص می‌دهد. در Packet Tracer می‌توان DHCP Server برای تخصیص خودکار IP تنظیم کرد."
              },
              {
                title: "VTP",
                content: "VTP مخفف VLAN Trunking Protocol است. این پروتکل برای مدیریت و همگام‌سازی VLAN ها بین چند سوئیچ استفاده می‌شود. در Packet Tracer می‌توان VTP را در حالت Server، Client یا Transparent تنظیم کرد."
              },
              {
                title: "STP",
                content: "STP مخفف Spanning Tree Protocol است. این پروتکل از ایجاد Loop در شبکه‌های سوئیچینگ جلوگیری می‌کند. در Packet Tracer می‌توان عملکرد STP را در توپولوژی‌های دارای مسیرهای افزونه مشاهده کرد."
              },
              {
                title: "Static Route",
                content: "Static Route مسیریابی ایستا است که به صورت دستی روی روتر تنظیم می‌شود. در Packet Tracer می‌توان مسیرهای ثابت تعریف کرد تا بسته‌ها به مقصد مشخص هدایت شوند."
              },
              {
                title: "EIGRP Routing",
                content: "EIGRP مخفف Enhanced Interior Gateway Routing Protocol است. این یک پروتکل مسیریابی دینامیک پیشرفته از شرکت Cisco است که از الگوریتم DUAL برای انتخاب بهترین مسیر استفاده می‌کند."
              },
              {
                title: "RIP",
                content: "RIP مخفف Routing Information Protocol است. یک پروتکل مسیریابی دینامیک ساده است که بر اساس تعداد Hop بهترین مسیر را انتخاب می‌کند. در Packet Tracer می‌توان نسخه 2 آن را برای شبکه‌های کوچک تنظیم کرد."
              },
              {
                title: "OSPF",
                content: "OSPF مخفف Open Shortest Path First است. یک پروتکل مسیریابی دینامیک مبتنی بر Link-State است که با استفاده از الگوریتم SPF بهترین مسیر را محاسبه می‌کند."
              },
              {
                title: "PPP",
                content: "PPP مخفف Point-to-Point Protocol است. این پروتکل در ارتباطات سریال بین دو روتر استفاده می‌شود و امکان احراز هویت و مدیریت اتصال را فراهم می‌کند."
              },
              {
                title: "Port Security",
                content: "Port Security قابلیتی در سوئیچ‌های سیسکو است که تعداد و نوع MAC Address های مجاز روی هر پورت را محدود می‌کند تا از دسترسی غیرمجاز جلوگیری شود."
              },
              {
                title: "کانفیگ سوئیچ و روتر، انواع مودها",
                content: "در Packet Tracer برای پیکربندی تجهیزات از محیط CLI استفاده می‌شود. مودهای اصلی شامل User EXEC Mode، Privileged EXEC Mode، Global Configuration Mode و Interface Configuration Mode هستند. هر مود سطح دسترسی و نوع دستورات مخصوص به خود را دارد."
              }
            ]
          }
        ]
      },

      {
        title: "3- Packet Tracer 💻",
        content: "در این فصل با مفاهیم و پروتکل‌های مهمی که در نرم‌افزار Cisco Packet Tracer پیاده‌سازی و شبیه‌سازی می‌شوند آشنا می‌شویم.",
        subtopics: [
          {
            title: "VLAN 🟦",
            content: "مبحث VLAN برای بخش‌بندی منطقی سوئیچ فیزیکی.",
            details: [
              {
                title: "تعریف VLAN",
                content: "VLAN مخفف Virtual Local Area Network است. در Packet Tracer از VLAN برای تقسیم یک سوئیچ فیزیکی به چند شبکه منطقی استفاده می‌شود تا Broadcast Domain ها از هم جدا شوند و امنیت و مدیریت شبکه بهتر شود."
              },
              {
                title: "سناریوی ساده",
                content: "یک سوئیچ 2960 و دو عدد PC قرار بده. PC1 را به پورت Fa0/1 و PC2 را به پورت Fa0/2 وصل کن. برای کابل‌ها معمولاً می‌توانی از Automatic Connection استفاده کنی تا خود Packet Tracer کابل مناسب را انتخاب کند."
              },
              {
                title: "آدرس دهی IP",
                content: "برای VLAN 10 از شبکه 192.168.10.0/24 استفاده می‌کنیم.\nبرای VLAN 20 از شبکه 192.168.20.0/24 استفاده می‌کنیم.\nPC1: 192.168.10.10 / 255.255.255.0\nPC2: 192.168.20.10 / 255.255.255.0\nدلیل این رنج این است که هر VLAN باید در یک Subnet جدا باشد."
              },
              {
                title: "مراحل انجام کار",
                content: "1- یک Switch مدل 2960 قرار بده.\n2- دو PC قرار بده.\n3- PC1 را به Fa0/1 و PC2 را به Fa0/2 وصل کن.\n4- روی PC1 و PC2 از Desktop > IP Configuration آی‌پی‌ها را تنظیم کن.\n5- وارد CLI سوئیچ شو و VLANها را بساز.\n6- پورت Fa0/1 را عضو VLAN 10 و پورت Fa0/2 را عضو VLAN 20 کن."
              },
              {
                title: "دستورهای سوئیچ CLI",
                content: "enable\nconfigure terminal\nvlan 10\nname VLAN10\nvlan 20\nname VLAN20\ninterface fastethernet 0/1\nswitchport mode access\nswitchport access vlan 10\ninterface fastethernet 0/2\nswitchport mode access\nswitchport access vlan 20\nend\nwrite"
              },
              {
                title: "تست و ارزیابی",
                content: "از PC1 دستور ping 192.168.20.10 را بزن. در حالت عادی نباید پاسخ بگیری چون VLANها از هم جدا هستند و هنوز Routing بین VLANها انجام نشده است."
              }
            ]
          },
          {
            title: "SSH 🔐",
            content: "پروتکل امن دسترسی از راه دور.",
            details: [
              {
                title: "تعریف SSH",
                content: "SSH مخفف Secure Shell است. این پروتکل برای مدیریت امن روتر و سوئیچ از راه دور استفاده می‌شود و نسبت به Telnet امن‌تر است چون اطلاعات را رمزنگاری می‌کند."
              },
              {
                title: "سناریوی ساده",
                content: "یک Router مدل 1941 و یک PC قرار بده. PC را به اینترفیس G0/0 روتر وصل کن. برای کابل می‌توانی از Automatic Connection استفاده کنی."
              },
              {
                title: "آدرس دهی IP",
                content: "Router G0/0: 192.168.1.1 / 255.255.255.0\nPC: 192.168.1.10 / 255.255.255.0\nDefault Gateway روی PC برابر 192.168.1.1 باشد."
              },
              {
                title: "مراحل انجام کار",
                content: "1- روتر و PC را در محیط قرار بده.\n2- بین آن‌ها اتصال برقرار کن.\n3- روی PC آی‌پی تنظیم کن.\n4- روی روتر hostname و domain-name تنظیم کن.\n5- یک username و password بساز.\n6- کلید RSA تولید کن.\n7- روی line vty فقط SSH را فعال کن."
              },
              {
                title: "دستورهای روتر CLI",
                content: "enable\nconfigure terminal\nhostname R1\nip domain-name ccna.local\nusername admin secret 1234\ncrypto key generate rsa\n1024\nline vty 0 4\ntransport input ssh\nlogin local\ninterface gigabitethernet 0/0\nip address 192.168.1.1 255.255.255.0\nno shutdown\nip ssh version 2\nend\nwrite"
              },
              {
                title: "تست و ارزیابی",
                content: "روی PC از Desktop > Command Prompt دستور زیر را بزن:\nssh -l admin 192.168.1.1\nسپس پسورد 1234 را وارد کن. اگر وارد محیط روتر شدی یعنی SSH درست کار می‌کند."
              }
            ]
          },
          {
            title: "Telnet 🖥️",
            content: "پروتکل دسترسی از راه دور بدون رمزنگاری.",
            details: [
              {
                title: "تعریف Telnet",
                content: "Telnet یک پروتکل برای دسترسی از راه دور به تجهیزات شبکه است. در Packet Tracer می‌توان از آن برای مدیریت روتر و سوئیچ استفاده کرد، اما از نظر امنیتی ضعیف است چون اطلاعات را بدون رمزنگاری ارسال می‌کند."
              },
              {
                title: "سناریوی ساده",
                content: "یک Router مدل 1941 و یک PC قرار بده. PC را به G0/0 روتر متصل کن. برای کابل می‌توانی از Automatic Connection استفاده کنی."
              },
              {
                title: "آدرس دهی IP",
                content: "Router G0/0: 192.168.1.1 / 255.255.255.0\nPC: 192.168.1.10 / 255.255.255.0\nGateway: 192.168.1.1"
              },
              {
                title: "مراحل انجام کار",
                content: "1- روتر و PC را اضافه کن.\n2- اتصال را برقرار کن.\n3- IPهای لازم را روی PC و روتر تنظیم کن.\n4- روی line vty یک پسورد تعریف کن.\n5- Telnet را فعال کن."
              },
              {
                title: "دستورهای روتر CLI",
                content: "enable\nconfigure terminal\nhostname R1\nenable secret class\nline vty 0 4\npassword 1234\nlogin\ntransport input telnet\ninterface gigabitethernet 0/0\nip address 192.168.1.1 255.255.255.0\nno shutdown\nend\nwrite"
              },
              {
                title: "تست و ارزیابی",
                content: "روی PC در Command Prompt دستور زیر را وارد کن:\ntelnet 192.168.1.1\nبعد پسورد 1234 را بزن. اگر وارد CLI روتر شدی یعنی Telnet درست تنظیم شده است."
              }
            ]
          },
          {
            title: "HTTP 🌍",
            content: "سرویس وب برای نمایش صفحات در شبکه.",
            details: [
              {
                title: "تعریف HTTP",
                content: "HTTP مخفف HyperText Transfer Protocol است. این پروتکل برای نمایش صفحات وب استفاده می‌شود. در Packet Tracer می‌توان یک Server را به عنوان وب‌سرور فعال کرد تا کلاینت‌ها با مرورگر به آن متصل شوند."
              },
              {
                title: "سناریوی ساده",
                content: "یک Server، یک PC و یک Switch 2960 قرار بده. Server و PC را به سوئیچ متصل کن. برای کابل می‌توانی از Automatic Connection استفاده کنی."
              },
              {
                title: "آدرس دهی IP",
                content: "Server: 192.168.1.2 / 255.255.255.0\nPC: 192.168.1.10 / 255.255.255.0\nچون هر دو در یک شبکه هستند، در این سناریوی ساده Gateway لازم نیست."
              },
              {
                title: "مراحل انجام کار",
                content: "1- یک Switch، یک PC و یک Server قرار بده.\n2- آن‌ها را به هم وصل کن.\n3- روی Server آی‌پی بده.\n4- از بخش Services روی Server وارد HTTP شو و آن را On کن.\n5- روی PC آی‌پی تنظیم کن.\n6- از مرورگر PC آدرس سرور را باز کن."
              },
              {
                title: "تنظیمات Server",
                content: "Desktop > IP Configuration\nIP: 192.168.1.2\nMask: 255.255.255.0\n\nServices > HTTP > On"
              },
              {
                title: "تنظیمات PC و تست",
                content: "تنظیمات PC:\nDesktop > IP Configuration\nIP: 192.168.1.10\nMask: 255.255.255.0\n\nتست:\nروی PC از Desktop > Web Browser آدرس زیر را وارد کن:\nhttp://192.168.1.2\nاگر صفحه وب باز شد یعنی HTTP Server درست کار می‌کند."
              }
            ]
          },
          {
            title: "DNS 🧭",
            content: "سامانه نام دامنه برای تبدیل نام به IP.",
            details: [
              {
                title: "تعریف DNS",
                content: "DNS مخفف Domain Name System است. وظیفه DNS تبدیل نام دامنه به IP Address است. در Packet Tracer می‌توان یک DNS Server ساخت تا به جای حفظ کردن IP، با نام دامنه به سرویس دسترسی داشته باشیم."
              },
              {
                "title": "سناریوی ساده",
                content: "یک Server، یک PC و یک Switch قرار بده. Server نقش DNS Server را دارد. برای کابل می‌توانی از Automatic Connection استفاده کنی."
              },
              {
                title: "آدرس دهی IP",
                content: "DNS Server: 192.168.1.2 / 255.255.255.0\nPC: 192.168.1.10 / 255.255.255.0\nDNS روی PC باید برابر 192.168.1.2 تنظیم شود."
              },
              {
                title: "مراحل انجام کار",
                content: "1- تجهیزات را قرار بده و به هم وصل کن.\n2- روی Server آی‌پی تنظیم کن.\n3- از بخش Services، سرویس DNS را روشن کن.\n4- یک رکورد DNS ایجاد کن.\n5- روی PC آی‌پی و DNS Server را وارد کن.\n6- با نام دامنه تست بگیر."
              },
              {
                title: "تنظیمات تجهیزات",
                content: "تنظیمات Server:\nIP: 192.168.1.2 / Mask: 255.255.255.0\nServices > DNS > On\nName: www.site.com\nAddress: 192.168.1.2\n\nتنظیمات PC:\nIP: 192.168.1.10 / Mask: 255.255.255.0\nDNS Server: 192.168.1.2"
              },
              {
                title: "تست و ارزیابی",
                content: "در Web Browser روی PC آدرس www.site.com را وارد کن. اگر صفحه باز شد یعنی DNS درست کار می‌کند."
              }
            ]
          },
          {
            title: "DHCP 📡",
            content: "تخصیص خودکار آدرس‌های IP و تنظیمات شبکه.",
            details: [
              {
                title: "تعریف DHCP",
                content: "DHCP مخفف Dynamic Host Configuration Protocol است. این سرویس به‌صورت خودکار به کلاینت‌ها IP Address، Subnet Mask، Gateway و DNS می‌دهد. در Packet Tracer می‌توان DHCP را روی Server یا Router راه‌اندازی کرد."
              },
              {
                title: "سناریوی ساده",
                content: "یک Server، یک PC و یک Switch قرار بده. Server را به عنوان DHCP Server تنظیم کن. برای کابل‌ها می‌توانی از Automatic Connection استفاده کنی."
              },
              {
                title: "آدرس دهی IP",
                content: "Server: 192.168.1.2 / 255.255.255.0\nGateway فرضی شبکه: 192.168.1.1\nPool DHCP از 192.168.1.100 شروع می‌شود."
              },
              {
                title: "مراحل انجام کار",
                content: "1- Server و PC و Switch را قرار بده.\n2- تجهیزات را به هم متصل کن.\n3- روی Server آی‌پی ثابت بده.\n4- از بخش Services، DHCP را روشن کن.\n5- یک Pool تعریف کن.\n6- روی PC گزینه DHCP را بزن."
              },
              {
                title: "تنظیمات Server و PC",
                content: "تنظیمات Server:\nIP: 192.168.1.2 / Mask: 255.255.255.0 / Gateway: 192.168.1.1\nServices > DHCP > On\nPool Name: LAN / Default Gateway: 192.168.1.1 / DNS Server: 192.168.1.2\nStart IP: 192.168.1.100 / Mask: 255.255.255.0 / Max Users: 50\n\nتنظیمات PC:\nDesktop > IP Configuration > DHCP"
              },
              {
                title: "تست و ارزیابی",
                content: "اگر PC به‌صورت خودکار IP مثل 192.168.1.100 یا بالاتر گرفت، یعنی DHCP درست کار می‌کند."
              }
            ]
          },
          {
            title: "VTP 🔁",
            content: "پروتکل همگام‌سازی اطلاعات VLANها روی سوئیچ‌ها.",
            details: [
              {
                title: "تعریف VTP",
                content: "VTP مخفف VLAN Trunking Protocol است. این پروتکل برای مدیریت و همگام‌سازی VLANها بین چند سوئیچ سیسکو استفاده می‌شود. در این حالت اگر VLAN روی سوئیچ Server ساخته شود، روی سوئیچ Client هم دریافت می‌شود."
              },
              {
                title: "سناریوی ساده و توپولوژی",
                content: "دو سوئیچ 2960 و دو PC قرار بده. بین دو سوئیچ یک لینک Trunk برقرار کن. برای کابل‌ها می‌توانی از Automatic Connection استفاده کنی.\n\nتوپولوژی:\nPC1 -- SW1 ==== SW2 -- PC2\nعلامت ==== یعنی لینک Trunk بین دو سوئیچ."
              },
              {
                title: "آدرس دهی IP",
                content: "PC1: 192.168.10.10 / 255.255.255.0\nPC2: 192.168.10.20 / 255.255.255.0"
              },
              {
                title: "مراحل انجام کار",
                content: "1- دو سوئیچ و دو PC قرار بده.\n2- SW1 و SW2 را به هم وصل کن.\n3- پورت بین دو سوئیچ را Trunk کن.\n4- روی SW1 حالت VTP Server و روی SW2 حالت VTP Client بگذار.\n5- روی SW1 یک VLAN بساز.\n6- بررسی کن که VLAN روی SW2 هم دیده شود."
              },
              {
                title: "دستورهای سوئیچ‌ها CLI",
                content: "دستورهای SW1:\nenable\nconfigure terminal\nvtp mode server\nvtp domain cisco\nvlan 10\nname SALES\ninterface fastethernet 0/24\nswitchport mode trunk\nend\nwrite\n\nدستورهای SW2:\nenable\nconfigure terminal\nvtp mode client\nvtp domain cisco\ninterface fastethernet 0/24\nswitchport mode trunk\nend\nwrite"
              },
              {
                title: "تست و ارزیابی",
                content: "روی SW2 دستور show vlan brief را بزن. اگر VLAN 10 را دیدی یعنی VTP درست کار می‌کند. نکته مهم این است که VTP Domain روی هر دو سوئیچ باید یکسان باشد."
              }
            ]
          },
          {
            title: "STP 🌲",
            content: "پروتکل جلوگیری از لوپ در لایه دو سوئیچینگ.",
            details: [
              {
                title: "تعریف STP",
                content: "STP مخفف Spanning Tree Protocol است. این پروتکل برای جلوگیری از Loop در شبکه‌های سوئیچینگ استفاده می‌شود. اگر بین سوئیچ‌ها مسیر اضافی وجود داشته باشد، STP یکی از مسیرها را Block می‌کند تا شبکه دچار Broadcast Storm نشود."
              },
              {
                title: "سناریوی ساده و توپولوژی",
                content: "سه سوئیچ 2960 قرار بده و آن‌ها را به‌صورت مثلثی به هم وصل کن. برای کابل‌ها می‌توانی از Automatic Connection استفاده کنی.\n\nتوپولوژی:\nSW1 ----- SW2\n\\       /\n  \\     /\n    SW3"
              },
              {
                title: "مراحل انجام کار و دستور بررسی",
                content: "1- سه سوئیچ قرار بده.\n2- هر سه سوئیچ را به شکلی وصل کن که یک Loop به‌وجود بیاید.\n3- صبر کن تا STP به‌صورت خودکار عمل کند.\n4- روی یکی از سوئیچ‌ها وضعیت spanning-tree را بررسی کن.\n\nدستور بررسی:\nenable\nshow spanning-tree"
              },
              {
                title: "تست و نتیجه",
                content: "می‌بینی که یکی از پورت‌ها در حالت Blocking قرار می‌گیرد. این یعنی STP فعال شده و از ایجاد Loop جلوگیری کرده است. به صورت پیش‌فرض روی سوئیچ‌های سیسکو فعال است."
              }
            ]
          },
          {
            title: "Static Route 🛣️",
            content: "مسیریابی ثابت و دستی روی روترها.",
            details: [
              {
                title: "تعریف Static Route",
                content: "Static Route یعنی مسیریابی ایستا. در این روش، مدیر شبکه مسیر رسیدن به شبکه‌های دیگر را به‌صورت دستی روی روتر وارد می‌کند. این روش برای شبکه‌های کوچک مناسب است."
              },
              {
                title: "سناریوی ساده و توپولوژی",
                content: "دو روتر و دو PC قرار بده. PC1 به R1 و PC2 به R2 وصل باشد و بین دو روتر هم یک لینک وجود داشته باشد. برای کابل‌ها می‌توانی از Automatic Connection استفاده کنی.\n\nتوپولوژی:\nPC1 --- R1 --- R2 --- PC2"
              },
              {
                title: "آدرس دهی IP",
                content: "PC1: 192.168.1.10 / 255.255.255.0\nR1 G0/0: 192.168.1.1 / 255.255.255.0\nR1 G0/1: 10.0.0.1 / 255.255.255.252\nR2 G0/0: 10.0.0.2 / 255.255.255.252\nR2 G0/1: 192.168.2.1 / 255.255.255.0\nPC2: 192.168.2.10 / 255.255.255.0\nGateway برای PC1 برابر 192.168.1.1 و برای PC2 برابر 192.168.2.1 است. از 10.0.0.0/30 برای ارتباط بهینه بین دو روتر استفاده می‌شود."
              },
              {
                title: "دستورهای روترها CLI",
                content: "دستورهای R1:\nenable\nconfigure terminal\ninterface g0/0\nip address 192.168.1.1 255.255.255.0\nno shutdown\ninterface g0/1\nip address 10.0.0.1 255.255.255.252\nno shutdown\nip route 192.168.2.0 255.255.255.0 10.0.0.2\nend\nwrite\n\nدستورهای R2:\nenable\nconfigure terminal\ninterface g0/0\nip address 10.0.0.2 255.255.255.252\nno shutdown\ninterface g0/1\nip address 192.168.2.1 255.255.255.0\nno shutdown\nip route 192.168.1.0 255.255.255.0 10.0.0.1\nend\nwrite"
              },
              {
                title: "تنظیمات PC و تست",
                content: "تنظیمات PC1:\nIP: 192.168.1.10 / Gateway: 192.168.1.1\n\nتنظیمات PC2:\nIP: 192.168.2.10 / Gateway: 192.168.2.1\n\nتست:\nاز PC1 دستور ping 192.168.2.10 را بزن. اگر پاسخ گرفتی یعنی Static Route درست تنظیم شده است."
              }
            ]
          },
          {
            title: "EIGRP Routing ⚡",
            content: "پروتکل مسیریابی داینامیک پیشرفته سیسکو.",
            details: [
              {
                title: "تعریف EIGRP",
                content: "EIGRP مخفف Enhanced Interior Gateway Routing Protocol است. این پروتکل مسیریابی داینامیک ساخت Cisco است و از الگوریتم DUAL استفاده می‌کند. برای شبکه‌های کوچک و متوسط، پیاده‌سازی آن در Packet Tracer رایج است."
              },
              {
                title: "سناریوی ساده و آدرس دهی",
                content: "همان سناریوی دو روتر و دو PC مثل Static Route را استفاده کن، اما این بار به‌جای route دستی از EIGRP استفاده کن.\n\nآدرس دهی:\nR1 G0/0: 192.168.1.1 / 24\nR1 G0/1: 10.0.0.1 / 30\nR2 G0/0: 10.0.0.2 / 30\nR2 G0/1: 192.168.2.1 / 24\nPC1: 192.168.1.10 / 24 Gateway 192.168.1.1\nPC2: 192.168.2.10 / 24 Gateway 192.168.2.1"
              },
              {
                title: "دستورهای روترها CLI",
                content: "دستورهای R1:\nenable\nconfigure terminal\ninterface g0/0\nip address 192.168.1.1 255.255.255.0\nno shutdown\ninterface g0/1\nip address 10.0.0.1 255.255.255.252\nno shutdown\nrouter eigrp 100\nno auto-summary\nnetwork 192.168.1.0 0.0.0.255\nnetwork 10.0.0.0 0.0.0.3\nend\nwrite\n\nدستورهای R2:\nenable\nconfigure terminal\ninterface g0/0\nip address 10.0.0.2 255.255.255.252\nno shutdown\ninterface g0/1\nip address 192.168.2.1 255.255.255.0\nno shutdown\nrouter eigrp 100\nno auto-summary\nnetwork 192.168.2.0 0.0.0.255\nnetwork 10.0.0.0 0.0.0.3\nend\nwrite"
              },
              {
                title: "نکته فنی و تست",
                content: "نکته: عدد 100 همان AS Number است و باید روی هر دو روتر یکسان باشد.\n\nتست:\nدستور show ip route را بزن. اگر مسیرها را با حرف D دیدی یعنی EIGRP درست کار می‌کند."
              }
            ]
          },
          {
            title: "RIP 📍",
            content: "پروتکل مسیریابی داینامیک بر اساس بردار فاصله.",
            details: [
              {
                title: "تعریف RIP",
                content: "RIP مخفف Routing Information Protocol است. این پروتکل یک پروتکل مسیریابی داینامیک ساده است که بر اساس تعداد Hop تصمیم می‌گیرد. در Packet Tracer معمولاً از RIP Version 2 استفاده می‌شود."
              },
              {
                title: "سناریوی ساده و آدرس دهی",
                content: "دو روتر و دو PC مانند سناریوی قبلی قرار بده. این بار به‌جای Static Route از RIP v2 استفاده کن.\n\nآدرس دهی:\nR1 G0/0: 192.168.1.1 / 24\nR1 G0/1: 10.0.0.1 / 30\nR2 G0/0: 10.0.0.2 / 30\nR2 G0/1: 192.168.2.1 / 24\nPC1: 192.168.1.10 / 24 Gateway 192.168.1.1\nPC2: 192.168.2.10 / 24 Gateway 192.168.2.1"
              },
              {
                title: "دستورهای روترها CLI",
                content: "دستورهای R1:\nenable\nconfigure terminal\ninterface g0/0\nip address 192.168.1.1 255.255.255.0\nno shutdown\ninterface g0/1\nip address 10.0.0.1 255.255.255.252\nno shutdown\nrouter rip\nversion 2\nno auto-summary\nnetwork 192.168.1.0\nnetwork 10.0.0.0\nend\nwrite\n\nدستورهای R2:\nenable\nconfigure terminal\ninterface g0/0\nip address 10.0.0.2 255.255.255.252\nno shutdown\ninterface g0/1\nip address 192.168.2.1 255.255.255.0\nno shutdown\nrouter rip\nversion 2\nno auto-summary\nnetwork 10.0.0.0\nnetwork 192.168.2.0\nend\nwrite"
              },
              {
                title: "تست و ارزیابی",
                content: "دستور show ip route را بزن. اگر مسیرها را با حرف R دیدی یعنی RIP درست تنظیم شده است."
              }
            ]
          },
          {
            title: "OSPF 🧠",
            content: "پروتکل مسیریابی حالت لینک برای پروژه‌های بزرگتر.",
            details: [
              {
                title: "تعریف OSPF",
                content: "OSPF مخفف Open Shortest Path First است. این پروتکل از نوع Link-State است و یکی از مهم‌ترین پروتکل‌های مسیریابی داینامیک محسوب می‌شود. در Packet Tracer معمولاً برای سناریوهای آموزشی از Area 0 استفاده می‌شود."
              },
              {
                title: "سناریوی ساده و آدرس دهی",
                content: "دو روتر و دو PC مثل سناریوهای قبل قرار بده و این بار OSPF را فعال کن.\n\nآدرس دهی:\nR1 G0/0: 192.168.1.1 / 24\nR1 G0/1: 10.0.0.1 / 30\nR2 G0/0: 10.0.0.2 / 30\nR2 G0/1: 192.168.2.1 / 24\nPC1: 192.168.1.10 / 24 Gateway 192.168.1.1\nPC2: 192.168.2.10 / 24 Gateway 192.168.2.1"
              },
              {
                title: "دستورهای روترها CLI",
                content: "دستورهای R1:\nenable\nconfigure terminal\ninterface g0/0\nip address 192.168.1.1 255.255.255.0\nno shutdown\ninterface g0/1\nip address 10.0.0.1 255.255.255.252\nno shutdown\nrouter ospf 1\nnetwork 192.168.1.0 0.0.0.255 area 0\nnetwork 10.0.0.0 0.0.0.3 area 0\nend\nwrite\n\nدستورهای R2:\nenable\nconfigure terminal\ninterface g0/0\nip address 10.0.0.2 255.255.255.252\nno shutdown\ninterface g0/1\nip address 192.168.2.1 255.255.255.0\nno shutdown\nrouter ospf 1\nnetwork 10.0.0.0 0.0.0.3 area 0\nnetwork 192.168.2.0 0.0.0.255 area 0\nend\nwrite"
              },
              {
                title: "تست و ارزیابی",
                content: "با دستور show ip route بررسی کن. اگر مسیرها با حرف O نمایش داده شدند یعنی OSPF درست کار می‌کند."
              }
            ]
          },
          {
            title: "PPP 🔗",
            content: "پروتکل نقطه به نقطه برای لینک‌های سریال بین دو روتر.",
            details: [
              {
                title: "تعریف PPP",
                content: "PPP مخفف Point-to-Point Protocol است. این پروتکل روی لینک‌های سریال بین دو روتر استفاده می‌شود و نسبت به HDLC امکانات بیشتری مثل احراز هویت دارد."
              },
              {
                title: "سناریوی ساده و آدرس دهی",
                content: "دو روتر قرار بده و با کابل Serial آن‌ها را به هم وصل کن. اگر لازم بود ماژول سریال را روی روترها اضافه کن. یکی از سمت‌ها باید DCE باشد تا بتوان clock rate تنظیم کرد.\n\nآدرس دهی:\nR1 S0/0/0: 10.0.0.1 / 255.255.255.252\nR2 S0/0/0: 10.0.0.2 / 255.255.255.252"
              },
              {
                title: "مراحل انجام کار",
                content: "1- دو روتر قرار بده.\n2- اگر روتر پورت سریال نداشت، ماژول مناسب اضافه کن.\n3- با کابل Serial بین دو روتر اتصال برقرار کن.\n4- روی هر دو روتر آی‌پی تنظیم کن.\n5- Encapsulation را روی PPP قرار بده.\n6- روی سمت DCE دستور clock rate بده."
              },
              {
                title: "دستورهای روترها CLI",
                content: "دستورهای R1:\nenable\nconfigure terminal\ninterface serial 0/0/0\nip address 10.0.0.1 255.255.255.252\nencapsulation ppp\nclock rate 64000\nno shutdown\nend\nwrite\n\nدستورهای R2:\nenable\nconfigure terminal\ninterface serial 0/0/0\nip address 10.0.0.2 255.255.255.252\nencapsulation ppp\nno shutdown\nend\nwrite"
              },
              {
                title: "تست و ارزیابی",
                content: "از R1 دستور ping 10.0.0.2 را بزن. اگر پاسخ گرفتی یعنی PPP درست کار می‌کند."
              }
            ]
          },
          {
            title: "Port Security 🔒",
            content: "مکانیزم حفاظتی لایه دو روی پورت سوئیچ.",
            details: [
              {
                title: "تعریف Port Security",
                content: "Port Security قابلیتی در سوئیچ‌های سیسکو است که اجازه می‌دهد تعداد MAC Address های مجاز روی یک پورت محدود شود. این کار باعث می‌شود افراد غیرمجاز نتوانند به‌راحتی از آن پورت استفاده کنند."
              },
              {
                title: "سناریوی ساده و مراحل انجام کار",
                content: "یک سوئیچ 2960 و یک PC قرار بده. PC را به پورت Fa0/1 سوئیچ وصل کن. برای کابل می‌توانی از Automatic Connection استفاده کنی.\n\nمراحل:\n1- سوئیچ و PC را قرار بده.\n2- PC را به Fa0/1 وصل کن.\n3- وارد CLI سوئیچ شو.\n4- روی Fa0/1 حالت access بگذار.\n5- Port Security را فعال کن.\n6- حداکثر یک MAC را مجاز کن.\n7- روش ثبت MAC را sticky قرار بده."
              },
              {
                title: "دستورهای سوئیچ CLI",
                content: "enable\nconfigure terminal\ninterface fastethernet 0/1\nswitchport mode access\nswitchport port-security\nswitchport port-security maximum 1\nswitchport port-security violation shutdown\nswitchport port-security mac-address sticky\nend\nwrite"
              },
              {
                title: "تست و ارزیابی",
                content: "اگر بعداً یک دستگاه دیگر را به همان پورت وصل کنی، در صورت مغایرت MAC ممکن است پورت به حالت shutdown برود. برای بررسی می‌توانی از دستور show port-security interface fastethernet 0/1 استفاده کنی."
              }
            ]
          },
          {
            title: "کانفیگ سوئیچ و روتر ، انواع مود ها ⚙️",
            content: "آشنایی با CLI و سطوح دسترسی در سیستم‌عامل سیسکو.",
            details: [
              {
                title: "مودهای اصلی دسترسی",
                content: "1- User EXEC Mode: با علامت > دیده می‌شود (مانند Router>). دسترسی محدود است.\n2- Privileged EXEC Mode: با علامت # دیده می‌شود (مانند Router#). با دستور enable وارد این مود می‌شوی.\n3- Global Configuration Mode: با علامت (config)# دیده می‌شود. با دستور configure terminal وارد آن می‌شوی.\n4- Interface Configuration Mode: با علامت (config-if)# دیده می‌شود. برای ورود از دستور interface g0/0 استفاده می‌کنی.\n5- Line Configuration Mode: با علامت (config-line)# برای تنظیم کنسول، telnet و ssh استفاده می‌شود."
              },
              {
                title: "پیکربندی پایه روتر CLI",
                content: "enable\nconfigure terminal\nhostname R1\nenable secret class\ninterface g0/0\nip address 192.168.1.1 255.255.255.0\nno shutdown\nend\nwrite"
              },
              {
                title: "پیکربندی پایه سوئیچ CLI",
                content: "enable\nconfigure terminal\nhostname SW1\ninterface vlan 1\nip address 192.168.1.2 255.255.255.0\nno shutdown\nip default-gateway 192.168.1.1\nend\nwrite"
              },
              {
                title: "نکات ذخیره سازی",
                content: "دستور end برای خروج سریع به حالت Privileged EXEC است. دستور write یا copy running-config startup-config برای ذخیره تنظیمات استفاده می‌شود."
              }
            ]
          }
        ]
      }

    ]
  };