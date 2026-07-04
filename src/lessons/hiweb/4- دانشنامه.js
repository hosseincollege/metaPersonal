// src/lessons/hiweb/4- دانشنامه.js

export default {
  // ================== فصل 4- دانشنامه ==================
  section: "4- دانشنامه",
  topics: [
    {
      title: "1- اسکریپت مودم SXT",
      content:
        "در این مرحله تنظیمات کامل RouterOS شامل interface lte ، ip firewall ، system script ، system scheduler ، tool netwatch و Queue Tree اعمال می‌شود تا ارتباط LTE برقرار، امنیت مدیریتی تضمین، مانیتورینگ SNMP فعال و مکانیزم‌های خودکار پایداری لینک، سوییچ سیم‌کارت، تهیه و ارسال Backup و مدیریت ترافیک اجرا شوند.",
      subtopics: [
        {
          title: "interface lte apn و تنظیم LTE",
          content: "تنظیمات APN، باندها و حالت شبکه برای فعال‌سازی LTE.",
          details: [
            {
              title: "تعریف پروفایل APN",
              content:
                "در بخش interface lte apn پروفایل APN اپراتور تعریف می‌شود تا مودم بتواند به شبکه دیتای موبایل متصل گردد."
            },
            {
              title: "تنظیم پارامترهای LTE",
              content:
                "در interface lte تنظیماتی مانند:\n- network-mode=lte\n- band=1,3,7\n- allow-roaming=yes\n\nاعمال می‌شود تا مودم روی باندهای مشخص فعال شده و امکان Roaming فراهم گردد."
            }
          ]
        },
        {
          title: "snmp و Community Configuration",
          content: "ایمن‌سازی SNMP و فعال‌سازی مانیتورینگ.",
          details: [
            {
              title: "تنظیم دسترسی SNMP Community",
              content:
                "در بخش snmp community دسترسی پیش‌فرض محدود می‌شود (read-access=no) و Community جدید با addresses مشخص تعریف می‌گردد."
            },
            {
              title: "فعال‌سازی Trap برای مانیتورینگ",
              content:
                "در snmp سرویس فعال شده و پارامترهای trap-community و trap-version=2 تنظیم می‌شوند تا مودم در سیستم NOC قابل مانیتور باشد."
            }
          ]
        },
        {
          title: "ip address تنظیم IP داخلی",
          content: "تعریف IP روی پورت مدیریتی مودم.",
          details: [
            {
              title: "تعریف آدرس داخلی",
              content:
                "در بخش ip address یک IP برای interface=ether1 تنظیم می‌شود تا دسترسی مدیریتی داخلی بین مودم و تجهیزات برقرار گردد."
            }
          ]
        },
        {
          title: "ip firewall nat تنظیم NAT و Port Access",
          content: "ایجاد Masquerade و مدیریت پورت‌های مدیریتی.",
          details: [
            {
              title: "قانون Masquerade",
              content:
                "در ip firewall nat قانون:\n- chain=srcnat\n- action=masquerade\n- out-interface=lte1\nایجاد می‌شود تا ترافیک داخلی به اینترنت ارسال گردد."
            },
            {
              title: "قوانین dstnat",
              content: "قوانین dstnat جهت انتقال پورت‌های مدیریتی، SNMP و سرویس‌های خاص تنظیم می‌شوند."
            }
          ]
        },
        {
          title: "ip firewall address-list لیست Trusted",
          content: "ثبت IPهای مجاز دسترسی.",
          details: [
            {
              title: "تعریف Trusted Addresses",
              content:
                "در ip firewall address-list آدرس‌های NOC، VPN، LAN و WAN در لیست Trusted اضافه می‌شوند تا فقط این IPها به سرویس‌ها دسترسی داشته باشند."
            }
          ]
        },
        {
          title: "ip firewall filter قوانین امنیتی",
          content: "محدودسازی دسترسی مدیریتی.",
          details: [
            {
              title: "تنظیم chain=input",
              content:
                "در ip firewall filter قوانین chain=input تعریف می‌شود تا فقط src-address-list=Trusted بتواند به dst-portهای مدیریتی دسترسی داشته باشد و بقیه Drop شوند."
            }
          ]
        },
        {
          title: "ip service سخت‌سازی سرویس‌ها",
          content: "غیرفعال‌سازی سرویس‌های غیرضروری.",
          details: [
            {
              title: "سخت‌سازی سرویس‌ها",
              content:
                "در ip service:\n- پورت‌های SSH، Winbox و API تغییر داده می‌شوند.\n- سرویس‌های ftp و www غیرفعال می‌گردند.\nاین کار جهت افزایش امنیت انجام می‌شود."
            }
          ]
        },
        {
          title: "system ntp client و Clock",
          content: "تنظیم زمان دقیق دستگاه.",
          details: [
            {
              title: "تنظیم NTP و Time Zone",
              content:
                "در system ntp client سرورهای NTP تعریف می‌شوند و در system clock منطقه زمانی تنظیم می‌گردد تا زمان لاگ‌ها صحیح باشد."
            }
          ]
        },
        {
          title: "system scheduler و LTE Monitoring",
          content: "پایش وضعیت LTE و رفع اختلال خودکار.",
          details: [
            {
              title: "اسکریپت‌های پایش LTE",
              content:
                "با system scheduler اسکریپت‌های LTE-Check و LTE-Run-Check اجرا می‌شوند تا وضعیت running بودن interface lte بررسی شود. در صورت Down شدن، ریبوت یا Enable مجدد انجام می‌شود."
            }
          ]
        },
        {
          title: "Auto SIM Switch با Ping Monitoring",
          content: "جابجایی خودکار سیم‌کارت بر اساس Packet Loss.",
          details: [
            {
              title: "مکانیزم Ping Monitoring",
              content:
                "اسکریپت Schedule-LTE-Automation با ping روی interface=lte1 میزان Packet Loss را بررسی می‌کند.\nدر صورت Loss زیاد:\n- با interface lte settings set sim-slot دستگاه بین سیم‌کارت‌های a و b جابه‌جا می‌شود."
            }
          ]
        },
        {
          title: "tool netwatch مانیتورینگ لینک",
          content: "پایش لحظه‌ای Host و اجرای اسکریپت‌های Up/Down.",
          details: [
            {
              title: "Netwatch Actions",
              content:
                "در tool netwatch:\n- در صورت Down شدن: اسکریپت LTE-DOWN اجرا می‌شود.\n- در صورت Up شدن: اسکریپت LTE-UP اجرا می‌گردد."
            }
          ]
        },
        {
          title: "system script Backup Automation",
          content: "تعریف اسکریپت‌های تولید بکاپ.",
          details: [
            {
              title: "اسکریپت‌های Mik-Backup",
              content:
                "در system script اسکریپت‌های Mik-Backup و Mik-Backup-RHCM ایجاد می‌شوند که با export و system backup save فایل‌های .rsc و .backup را تولید می‌کنند."
            }
          ]
        },
        {
          title: "ارسال Backup با tool fetch (FTP Upload)",
          content: "ارسال فایل بکاپ به سرور مرکزی.",
          details: [
            {
              title: "ارسال و پاک‌سازی فایل",
              content:
                "با tool fetch mode=ftp upload=yes فایل‌های backup روی سرور آپلود، و سپس با file remove از حافظه حذف می‌شوند."
            }
          ]
        },
        {
          title: "queue tree مدیریت پهنای باند LTE",
          content: "اولویت‌دهی ترافیک مهم مثل ICMP.",
          details: [
            {
              title: "Queue و Mangle",
              content:
                "در queue tree یک Parent روی lte1 تعریف می‌شود.\nدر ip firewall mangle با mark-packet=ICMP ترافیک Ping اولویت‌دهی می‌شود تا مانیتورینگ حتی در بار شبکه بالا پایدار باقی بماند."
            }
          ]
        },
        {
          title: "system logging بهینه‌سازی لاگ",
          content: "حذف لاگ‌های غیرضروری و مدیریت حافظه.",
          details: [
            {
              title: "تنظیمات Logging",
              content:
                "در system logging مقدار disk-lines-per-file افزایش می‌یابد و با تنظیم topics=\"!lte,!gsm,!snmp,!ntp\" از ثبت لاگ‌های غیرضروری جلوگیری می‌شود."
            }
          ]
        }
      ]
    },

    // ========================== اسکریپت روتر 951 ==========================

    {
      title: "2- اسکریپت روتر 951",
      content:
        "در این مرحله روتر MikroTik سایت پیکربندی می‌شود تا ارتباط بین مودم LTE، تجهیزات محلی شامل کامپیوتر، دوربین و رادار برقرار شده و تونل‌های ارتباطی با سرورهای مرکزی ایجاد شوند. همچنین تنظیمات امنیتی، مانیتورینگ، مدیریت کاربران، پایش تجهیزات و تهیه نسخه پشتیبان به‌صورت خودکار از طریق قابلیت‌های RouterOS انجام می‌گیرد.",
      subtopics: [
        {
          title: "interface ethernet نام‌گذاری اینترفیس‌ها",
          content: "تعیین نقش هر پورت فیزیکی دستگاه.",
          details: [
            {
              title: "نام‌گذاری پورت‌ها",
              content:
                "ether1 برای مودم LTE، ether2 برای کامپیوتر، ether3 برای دوربین، ether4 برای رادار و ether5 به‌عنوان پورت رزرو تعیین می‌شود."
            }
          ]
        },
        {
          title: "interface bridge ایجاد Bridge شبکه تجهیزات",
          content: "تجمیع تجهیزات لوکال در یک Bridge.",
          details: [
            {
              title: "تعریف Bridge",
              content:
                "در interface bridge یک Bridge با نام Bridge-Camera ایجاد می‌شود و در interface bridge port پورت‌های تجهیزات اضافه می‌گردند."
            }
          ]
        },
        {
          title: "ip address تنظیم آدرس‌های IP",
          content: "تعریف IP روی اینترفیس‌های داخلی و WAN.",
          details: [
            {
              title: "تعریف IP برای LTE و Bridge",
              content:
                "برای اینترفیس متصل به مودم LTE و همچنین Bridge داخلی تجهیزات، IPهای مربوطه اعمال می‌شوند."
            }
          ]
        },
        {
          title: "ip route تنظیم مسیرهای استاتیک",
          content: "تعریف مسیرهای اصلی و پشتیبان.",
          details: [
            {
              title: "Static Routing",
              content:
                "مسیرهای مختلف برای دسترسی به سرورها و شبکه‌های دیگر تعریف می‌شوند. مسیرهای جایگزین با distance بالاتر برای redundancy استفاده می‌شوند."
            }
          ]
        },
        {
          title: "interface l2tp-client ایجاد تونل‌های L2TP",
          content: "ایجاد سه تونل ارتباطی.",
          details: [
            {
              title: "تونل‌های اصلی، پشتیبان و مدیریتی",
              content:
                "دو تونل L2TP برای ارتباط اصلی و backup با شبکه مرکزی و یک تونل برای مدیریت روتر ایجاد می‌شود."
            }
          ]
        },
        {
          title: "system identity تنظیم نام دستگاه",
          content: "سازگار کردن نام سیستم با استاندارد پروژه.",
          details: [
            {
              title: "فرمت نام استاندارد",
              content:
                "نام Router مطابق استاندارد شامل استان، نام پروژه و کد سایت تنظیم می‌شود."
            }
          ]
        },
        {
          title: "ip dns تنظیم DNS",
          content: "تنظیم DNSهای کاربردی.",
          details: [
            {
              title: "تعریف DNS Server",
              content:
                "سرورهای DNS جهت تبدیل نام دامنه به IP برای اتصال سرویس‌ها تعریف می‌گردند."
            }
          ]
        },
        {
          title: "ip firewall address-list تعریف لیست Trusted",
          content: "ایمن‌سازی دسترسی مدیریتی.",
          details: [
            {
              title: "Trusted Networks",
              content:
                "آدرس‌های IP مانیتورینگ، شبکه داخلی پروژه و اپراتور در لیست Trusted افزوده می‌شوند."
            }
          ]
        },
        {
          title: "ip firewall filter قوانین امنیتی",
          content: "محدود کردن پورت‌های مدیریتی.",
          details: [
            {
              title: "قوانین ورودی",
              content:
                "فقط IPهای Trusted اجازه دسترسی به پورت‌های مدیریتی را دارند و باقی درخواست‌ها Drop می‌شوند."
            }
          ]
        },
        {
          title: "ip firewall connection tracking بهینه‌سازی پردازش",
          content: "افزایش عملکرد با غیرفعال‌سازی ConnTrack.",
          details: [
            {
              title: "غیرفعال‌سازی ConnTrack",
              content:
                "در بخش ip firewall connection tracking این قابلیت غیرفعال می‌شود تا مصرف منابع کم شود و پردازش سریع‌تر گردد."
            }
          ]
        },
        {
          title: "ip service مدیریت سرویس‌های مدیریتی",
          content: "غیرفعال‌سازی سرویس‌های غیرضروری.",
          details: [
            {
              title: "مدیریت سرویس‌ها",
              content:
                "سرویس ftp و www غیرفعال شده و ssh و api با پورت‌های اختصاصی فعال می‌مانند."
            }
          ]
        },
        {
          title: "system ntp client و Clock",
          content: "تنظیم ساعت و Time Zone.",
          details: [
            {
              title: "تنظیم زمان",
              content:
                "NTP Client فعال شده و اسامی سرورها ثبت می‌شود. Time Zone مطابق منطقه پروژه تنظیم می‌گردد."
            }
          ]
        },
        {
          title: "snmp فعال‌سازی مانیتورینگ",
          content: "افزودن SNMP با محدودیت IP.",
          details: [
            {
              title: "SNMP Configuration",
              content:
                "Communityهای SNMP تعریف می‌شوند، آدرس‌های مجاز تعیین می‌شود و سرویس SNMP فعال می‌گردد."
            }
          ]
        },
        {
          title: "مدیریت کاربران و احراز هویت",
          content: "ایمن‌سازی دسترسی Userها.",
          details: [
            {
              title: "User + Radius",
              content:
                "دسترسی admin امن شده، گروه‌ها تعریف شده و احراز هویت برخی کاربران از طریق RADIUS انجام می‌شود."
            }
          ]
        },
        {
          title: "system package بهینه‌سازی سیستم",
          content: "غیرفعال‌سازی Packageهای غیرضروری.",
          details: [
            {
              title: "Package Optimization",
              content:
                "پکیج‌هایی مثل mpls و hotspot جهت کاهش مصرف منابع و افزایش امنیت غیرفعال می‌شوند."
            }
          ]
        },
        {
          title: "اسکریپت تشخیص پورت تجهیزات",
          content: "شناسایی خودکار MAC دستگاه‌ها.",
          details: [
            {
              title: "تشخیص پورت",
              content:
                "با بررسی ARP و Bridge Host و اسکریپت RouterOS مشخص می‌شود هر تجهیز روی کدام پورت قرار دارد."
            }
          ]
        },
        {
          title: "system script ریست پورت تجهیزات",
          content: "اسکریپت ریست هوشمند هر تجهیز.",
          details: [
            {
              title: "Port Reset",
              content:
                "برای هر دستگاه اسکریپت ریست تعریف می‌شود که پورت را چند ثانیه Down کرده و سپس Up می‌کند."
            }
          ]
        },
        {
          title: "tool netwatch پایش تجهیزات",
          content: "پایش لحظه‌ای و اجرای اسکریپت ریست.",
          details: [
            {
              title: "Netwatch Monitoring",
              content:
                "در صورت عدم پاسخ تجهیزات، اسکریپت ریست پورت مربوطه اجرا می‌شود."
            }
          ]
        },
        {
          title: "system scheduler زمان‌بندی اسکریپت‌ها",
          content: "اجرای دوره‌ای عملیات نگهداری.",
          details: [
            {
              title: "Tasks Scheduling",
              content:
                "شامل اجرای اسکریپت‌های نگهداری، ریست شمارنده‌های اینترفیس، بروزرسانی متغیرهای سیستمی و سایر عملیات زمان‌بندی‌شده."
            }
          ]
        },
        {
          title: "تهیه نسخه پشتیبان خودکار",
          content: "ایجاد فایل‌های تنظیمات و بکاپ.",
          details: [
            {
              title: "Backup Scripts",
              content:
                "روتر دوره‌ای export و system backup save را اجرا می‌کند تا فایل‌های .rsc و .backup تهیه شوند."
            }
          ]
        },
        {
          title: "ارسال بکاپ به سرور مرکزی",
          content: "آپلود FTP فایل بکاپ.",
          details: [
            {
              title: "ارسال از طریق Fetch",
              content:
                "فایل‌ها از طریق tool fetch روی سرور مرکزی آپلود شده و پس از موفقیت حذف می‌شوند."
            }
          ]
        }
      ]
    },

    // ========================== مایکروویو ==========================

    {
      title: "3- مایکروویو",
      content:
        "ارتباطات مایکروویو (Microwave) یک روش انتقال داده بی‌سیم در فرکانس‌های بالا است که برای ایجاد لینک‌های نقطه به نقطه (Point-to-Point) استفاده می‌شود.",
      subtopics: [
        {
          title: "طیف فرکانسی و اصول انتشار",
          content: "معرفی فرکانس‌ها، Line of Sight و منطقه فرنل.",
          details: [
            {
              title: "باندهای فرکانسی",
              content:
                "- باند 6 تا 11GHz برای مسافت‌های طولانی\n- باند 18 تا 80GHz برای مسافت کوتاه با ظرفیت بالا"
            },
            {
              title: "اصول انتشار",
              content:
                "سه اصل کلیدی:\n1) LOS\n2) Fresnel Zone\n3) جلوگیری از تداخل فرکانسی"
            }
          ]
        },
        {
          title: "روند اجرایی و نصب رادیو",
          content: "مراحل Mounting تا Alignment.",
          details: [
            {
              title: "مراحل نصب",
              content:
                "1) نصب Mount\n2) نصب آنتن و رادیو\n3) کابل‌کشی SFTP یا فیبر\n4) تنظیم دقیق جهت با RSSI"
            }
          ]
        },
        {
          title: "عیب‌یابی و پشتیبانی لینک",
          content: "بررسی RSSI، تداخل و Fading.",
          details: [
            {
              title: "مراحل عیب‌یابی",
              content:
                "- بررسی RSSI\n- بررسی تداخل\n- بررسی اثر باران\n- بررسی کابل‌ها و PoE"
            }
          ]
        }
      ]
    },

    // ========================== فیبر نوری ==========================

    {
      title: "4- فیبر نوری",
      content:
        "فیبر نوری تکنولوژی انتقال اطلاعات به صورت پالس‌های نوری است. در شبکه‌های مدرن، از فیبر هم برای Backhaul و هم برای FTTH استفاده می‌شود.",
      subtopics: [
        {
          title: "تجهیزات و مفاهیم اجرایی",
          content: "معرفی کابل، OLT، ONT و باکس‌های FAT/Closure.",
          details: [
            {
              title: "تجهیزات اصلی",
              content:
                "- کابل فیبر نوری\n- OLT\n- ONT/ONU\n- FAT/Closure"
            },
            {
              title: "انواع تار نوری",
              content:
                "Single Mode (طولانی)\nMulti Mode (کوتاه)"
            }
          ]
        },
        {
          title: "عملیات فیوژن و تست شبکه",
          content: "فیوژن، OTDR و پاورمتر.",
          details: [
            {
              title: "فیوژن",
              content:
                "اتصال تارها با قوس الکتریکی توسط دستگاه Splicer."
            },
            {
              title: "تست مسیر",
              content:
                "OTDR برای مشاهده مسیر و شکستگی.\nPower Meter برای اندازه‌گیری dBm.\nافت استاندارد هر فیوژن زیر 0.02dB."
            }
          ]
        }
      ]
    }
  ]
};
