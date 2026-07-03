  // src/lessons/university/7- نصب.js

export default {
  // ================== فصل 7- نصب و پیکربندی تجهیزات ==================

    section: "7- نصب و پیکربندی تجهیزات",
    topics: [
      {
        title: "1- دفتر تجهیزات",
        content:
          "🔸 استاد:وجیهه برومند - شماره تلفن ایتا \n"+
          "📘✅ پیکربندی.pdf 🚧 شامل ... فصل و 250 صفحه \n"+
          "🔸 چندتا فایل زیپ \n"+
          "🔸 ویندوز سرور 2019 \n"+
          "🔸 VMware را نصب می‌کنید، ویندوز سرور ۲۰۱۹ را دانلود می‌کنید و طبق همون فیلم نصب می‌کنید. بعد Active Directory نصب می‌کنیم، چند تا سناریو روی Active Directory، چند تا DHCP، یه مقدار DNS، یه مقدار هم دابل DNS و بقیه گزینه‌ها را یکی‌یکی روش کار می‌کنیم.هر کدوم از دانشجوهایی که انجام دادن می‌تونن تو ایتا، به این شماره‌ای که می‌گم، برای من اطلاعات بفرستن. برگزاری در ریلاین \n"+
          "🔸 از 23 فروردین 🚧 یکشنبه ها ساعت 13:00 ",
        subtopics: [
          {
            title: "تکلیف، آزمون و غیره",
            content:
            "🔸 تکلیف 10 خرداد  \n"
          },
          {
            title: "موارد انجام شده",
            content:
            "✅ سناریو 1 🚧 انجام شد \n"+
            "✅ سناریو 2، dhcp 🚧 انجام شد \n"
          },
          {
            title: "دانلود کلیپ ها",
            content:
              "اطلاع به استاد برومند در گروه ایتا برای بارگذاری تمام فایل ها در ساعت صبح"
          },
          {
            title: "ریلاین",
            content: "🔸 یکشنبه ۲۳ فروردین ۱۴۰۵ 🚧 PDF \n"+
            "🔸 یکشنبه ۳۰ فروردین ۱۴۰۵ 🚧 PDF \n"+
            "🔸 یکشنبه ۰۶ اردیبهشت ۱۴۰۵ 🚧 PDF page 88 \n"+
            "🔸 یکشنبه ۱۳ اردیبهشت ۱۴۰۵ 🚧 PDF + whiteboard + سناریو و تکلیف دقیقه 45-57 - تا ص 126 \n"+
            "🔸 یکشنبه 20 اردیبهشت ۱۴۰۵ 🚧 میپره بیرون \n"+
            "🔸 یکشنبه 27 اردیبهشت ۱۴۰۵ 🚧 میپره بیرون \n"+
            "✅ یکشنبه 03 خرداد ۱۴۰۵ 🚧 شرکت کردم 🚧 سوال امتحانی دورا dhcp توضیح بدید \n"+
            "✅ یکشنبه 10 خرداد ۱۴۰۵ 🚧 شرکت کردم 🚧 نوت برداری نکردم \n"+
            "🔸 یکشنبه 17 خرداد ۱۴۰۵ 🚧 \n"+
            "🔸 یکشنبه 24 خرداد ۱۴۰۵ 🚧 گوش ندادم \n"
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
        content: "🔸 مباحث مدیریت شبکه و ویندوز سرور \n",
        subtopics: [
          {
            title: "نصب 🛠️",
            content: "بررسی فرآیندهای نصب ویندوز سرور، محیط‌های مجازی‌سازی و ابزارهای آماده‌سازی سیستم‌عامل.",
            details: [
              {
                title: "نصب در محیط مجازی (VMware Installation)",
                description: "آشنایی با بستر مجازی‌سازی و نحوه ایجاد ماشین مجازی برای میزبانی ویندوز سرور."
              },
              {
                title: "نصب ویندوز سرور (Windows Server 2019 Installation)",
                description: "بررسی مراحل استاندارد نصب سیستم‌عامل سرور و پیکربندی‌های اولیه سخت‌افزاری."
              },
              {
                title: "محیط‌های پیش‌نصب (PE / OOBE)",
                description: "آشنایی با محیط Preinstallation Environment و فرآیند Out-of-Box Experience برای تکمیل تنظیمات پس از نصب."
              },
              {
                title: "روش‌های تکثیر سیستم (Copy and Clone via Sysprep)",
                description: "استفاده از ابزار Sysprep برای آماده‌سازی ایمیج جهت کپی یا کلون کردن سرورها بدون تداخل در شناسه سیستم."
              }
            ]
          },
          {
            title: "مدیریت اولیه سرور و تنظیمات شبکه 🖥️",
            content: "آشنایی با ابزارهای مدیریتی اصلی و پیکربندی کارت‌های شبکه در محیط فیزیکی و مجازی.",
            details: [
              {
                title: "مدیریت نقش‌ها (Server Manager)",
                description: "استفاده از ابزار مرکزی Server Manager برای مدیریت نقش‌ها (Roles)، قابلیت‌ها (Features) و تنظیمات پایه سرور."
              },
              {
                title: "دیواره آتش (Firewall Configuration)",
                description: "پیکربندی Firewall برای مدیریت ترافیک ورودی/خروجی و تامین امنیت شبکه."
              },
              {
                title: "تنظیمات آداپتور شبکه (Network Adapter Settings)",
                description: "پیکربندی پارامترهای IP، Subnet Mask، Gateway و DNS Server بر روی کارت شبکه."
              },
              {
                title: "شبکه‌های مجازی (Virtual Network Settings)",
                description: "تنظیمات نحوه اتصال ماشین مجازی (NAT، Bridged، Host-Only) برای برقراری ارتباط صحیح با شبکه."
              }
            ]
          },
          {
            title: "اکتیو دایرکتوری و مدیریت اشیا 📂",
            content: "مدیریت متمرکز منابع، کاربران و کامپیوترها در ساختار دامین.",
            details: [
              {
                title: "سرویس دایرکتوری (Active Directory - AD)",
                description: "سرویس دایرکتوری مایکروسافت برای مدیریت هویت‌ها و منابع شبکه در محیط دامنه."
              },
              {
                title: "ارتقای سطح عملکرد (Domain Functional Level)",
                description: "فرآیند Raise کردن Domain برای فعال‌سازی قابلیت‌های جدیدتر سرویس‌های اکتیو دایرکتوری."
              },
              {
                title: "کنسول مدیریت (Active Directory Users and Computers - ADUC)",
                description: "مدیریت اشیاء دایرکتوری شامل کاربران، گروه‌ها و کامپیوترها در کنسول ADUC."
              },
              {
                title: "واحدهای سازمانی (Organizational Units - OU)",
                description: "ساختاربندی اشیاء در OUها جهت اعمال سیاست‌های مدیریتی و دسترسی‌های اختصاصی."
              },
              {
                title: "جستجوی پیشرفته (Active Directory Query)",
                description: "ایجاد Queryهای سفارشی برای یافتن سریع اشیاء خاص بر اساس فیلترهای مشخص."
              },
              {
                title: "بازیابی اشیاء (Recycle Bin Activation)",
                description: "فعال‌سازی ویژگی Recycle Bin برای بازیابی آسان اشیاء حذف شده بدون نیاز به Restore کامل دیتابیس."
              },
              {
                title: "شناسه کامل شیء (Distinguished Name - DN)",
                description: "استفاده از DN به عنوان شناسه منحصربه‌فرد برای شناسایی هر شیء در سلسله‌مراتب دایرکتوری."
              },
              {
                title: "مدیریت با خط فرمان (CMD Object Management)",
                description: "ایجاد و ویرایش اشیاء دایرکتوری با استفاده از دستورات متنی و ابزارهای Command Line."
              },
              {
                title: "تفویض اختیار (Delegation)",
                description: "واگذاری بخش‌های مشخصی از اختیارات مدیریتی به کاربران یا گروه‌های خاص."
              },
              {
                title: "عضویت در دامنه (Domain Joining: Pre-stage/Post-stage)",
                description: "اتصال کامپیوترها به دامنه با روش‌های عادی یا Pre-staging جهت کنترل بیشتر بر عضویت کلاینت‌ها."
              }
            ]
          },
          {
            title: "Group Policy و سیاست‌های مدیریتی 📜",
            content: "اعمال تنظیمات متمرکز و کنترل دسترسی‌ها در سطح دامنه.",
            details: [
              {
                title: "خط‌مشی گروهی (Group Policy Object - GPO)",
                description: "سازوکار مرکزی برای اعمال تنظیمات استاندارد روی کاربران و سیستم‌های عضو دامنه."
              },
              {
                title: "سیاست‌های رمز عبور (Password Policy)",
                description: "تعریف قوانین امنیتی رمز عبور شامل پیچیدگی، طول و تاریخ انقضا."
              },
              {
                title: "مجوزهای دسترسی (NTFS vs Share Permissions)",
                description: "بررسی همزمان مجوزهای NTFS و Share برای تعیین سطح دسترسی دقیق کاربران به فایل‌ها و پوشه‌ها."
              }
            ]
          },
          {
            title: "DNS و نام‌گذاری در شبکه 🌐",
            content: "سیستم ترجمه نام به IP و مدیریت زیرساخت‌های نام‌گذاری.",
            details: [
              {
                title: "سامانه نام دامنه (Domain Name System - DNS)",
                description: "سرویس حیاتی ترجمه نام‌های میزبان (Hostname) به آدرس‌های IP و بالعکس."
              },
              {
                title: "روش‌های نام‌گذاری (Naming Conventions: NetBIOS/FQDN)",
                description: "تفاوت‌های نام‌گذاری ساده (NetBIOS) و نام‌های کامل دامنه (Fully Qualified Domain Name)."
              },
              {
                title: "تست و عیب‌یابی (NSLookup)",
                description: "استفاده از ابزار NSLookup برای بررسی ترجمه نام‌ها و عیب‌یابی رکوردهای DNS."
              },
              {
                title: "کش دی‌ان‌اس (DNS Cache)",
                description: "مکانیزم ذخیره‌سازی موقت پاسخ‌های DNS برای افزایش سرعت دسترسی به منابع شبکه."
              },
              {
                title: "انواع رکوردهای دی‌ان‌اس (DNS Records)",
                description: "معرفی رکوردهای کاربردی نظیر A (آدرس)، PTR (معکوس)، CNAME (مستعار) و MX (ایمیل)."
              },
              {
                title: "تنظیمات سرور (DNS Server Settings)",
                description: "مدیریت Zoneها و تنظیمات پاسخ‌دهی سرور به درخواست‌های کلاینت‌ها."
              },
              {
                title: "جستجوهای پیشرفته (Forwarder & Conditional Forwarder)",
                description: "هدایت درخواست‌های ناشناس به سرورهای دیگر (Forwarder) یا دامنه‌های خاص (Conditional Forwarder)."
              },
              {
                title: "پرس‌وجوی بازگشتی و ریشه (Recursive Query & Root Hints)",
                description: "روش‌های یافتن پاسخ برای درخواست‌های خارجی با استفاده از پرس‌وجوی بازگشتی و سرورهای ریشه."
              }
            ]
          },
          {
            title: "DHCP و تخصیص خودکار آدرس 📡",
            content: "پروتکل اختصاص پویا آدرس‌های IP و مدیریت محدوده‌های آدرس‌دهی.",
            details: [
              {
                title: "پروتکل پیکربندی میزبان (DHCP & DORA Process)",
                description: "تشریح چرخه چهارمرحله‌ای DORA (Discover, Offer, Request, Acknowledge) برای اختصاص IP."
              },
              {
                title: "نصب و مجوزدهی (DHCP Authorization)",
                description: "نصب سرویس DHCP و Authorize کردن آن در Active Directory جهت تایید صلاحیت سرویس‌دهی."
              },
              {
                title: "محدوده‌های آدرس‌دهی (DHCP Scope Configuration)",
                description: "تعریف Scopeها شامل Range، Subnet Mask، Gateway و DNS اختصاصی برای کلاینت‌ها."
              }
            ]
          },
          {
            title: "نصب سیستم‌عامل و به‌روزرسانی در شبکه 📥",
            content: "استقرار خودکار سیستم‌عامل (WDS) و مدیریت متمرکز آپدیت‌ها (WSUS).",
            details: [
              {
                title: "سرویس استقرار ویندوز (Windows Deployment Services - WDS)",
                description: "راه‌اندازی نصب ویندوز از طریق شبکه با استفاده از تکنولوژی PXE."
              },
              {
                title: "ایمیج‌های بوت و نصب (Boot and Install Images)",
                description: "تفکیک فایل‌های Boot برای شروع نصب و Install برای استقرار سیستم‌عامل روی کلاینت‌ها."
              },
              {
                title: "سرویس به‌روزرسانی (Windows Server Update Services - WSUS)",
                description: "مدیریت متمرکز آپدیت‌های مایکروسافت جهت کنترل ترافیک و امنیت سیستم‌ها."
              },
              {
                title: "مدیریت آپدیت‌ها (Update Approval and Proxy Settings)",
                description: "فرآیند تایید (Approve) و دانلود آپدیت‌ها با تنظیمات Upstream/Downstream و Proxy."
              },
              {
                title: "اتصال کلاینت‌ها (WSUS via Group Policy)",
                description: "اعمال سیاست‌های دریافت آپدیت از سرور WSUS بر روی کلاینت‌ها با استفاده از Group Policy."
              }
            ]
          }
        ]
      },

      {
        title: "3- تکالیف",
        content: "🔸 پروژه‌ها و تکالیف عملی مدیریت سرویس‌های شبکه \n",
        subtopics: [
          {
            title: "پروژه اول: RR (Round Robin) در DNS",
            content: "پیکربندی توزیع بار نوبتی کلاینت‌ها بین چند سرور با استفاده از قابلیت Round Robin در سرویس DNS.",
            details: [
              {
                title: "مفهوم نوبت‌دهی چرخشی (DNS Round Robin Concept)",
                description: "توزیع بار کاری بین چند وب‌سرور مشابه با بازگرداندن چرخشی و نوبتی آدرس‌های IP مختلف به درخواست‌دهندگان جهت جلوگیری از سرریز بار روی یک سرور خاص."
              },
              {
                title: "فعال‌سازی قابلیت در سرور (Enabling Round Robin on DNS Server)",
                description: "روش باز کردن کنسول مدیریت DNS (با دستور dnsmgmt.msc)، ورود به تنظیمات Properties سرور و فعال‌سازی گزینه Enable round robin در تب Advanced."
              },
              {
                title: "ایجاد رکوردهای هم‌نام (Creating Identical A Records)",
                description: "تعریف چندین رکورد میزبان (A Record) با نام کاملاً یکسان (مثلاً web) اما با آدرس‌های IP متفاوت در ناحیه جستجوی مستقیم (Forward Lookup Zone)."
              },
              {
                title: "تست و پاکسازی کش کلاینت (Client-Side Verification and Cache Flush)",
                description: "اجرای دستور ipconfig /flushdns جهت پاک کردن کش محلی و سپس تست با nslookup برای مشاهده تغییر نوبتی ترتیب IPهای خروجی."
              }
            ]
          },
          {
            title: "پروژه دوم: Delegation در DNS",
            content: "واگذاری و تفویض اختیار مدیریت یک زیردامنه مشخص به یک سرور DNS مجزا در شبکه.",
            details: [
              {
                title: "مفهوم تفویض حوزه (DNS Delegation Concept)",
                description: "سپردن مسئولیت پاسخ‌گویی به درخواست‌های مربوط به یک زیردامنه (Subdomain) مانند shop.test.local به یک سرور DNS ثانویه در سازمان."
              },
              {
                title: "راه‌اندازی سرور مقصد (Destination DNS Server Setup)",
                description: "نصب نقش DNS Server روی سرور دوم و آماده‌سازی آن برای پذیرش رکوردهای زیردامنه جدید."
              },
              {
                title: "ایجاد تفویض اختیار در سرور اصلی (Configuring New Delegation)",
                description: "راست‌کلیک روی دامنه اصلی در سرور اول، انتخاب گزینه New Delegation، مشخص کردن نام زیردامنه و معرفی نام یا آدرس IP سرور دوم."
              },
              {
                title: "بررسی صحت ارجاع (Verification of Name Resolution Referral)",
                description: "بررسی نحوه ارجاع خودکار کلاینت‌ها توسط سرور اصلی به سرور دوم هنگام درخواست آدرس‌های مربوط به زیردامنه تفویض‌شده."
              }
            ]
          },
          {
            title: "پروژه سوم: Duplicate DNS Records",
            content: "بررسی مفاهیم رکوردهای تکراری DNS جهت ایجاد افزونگی یا سناریوی همتاسازی دامین کنترلر دوم.",
            details: [
              {
                title: "رکوردهای تکراری برای افزونگی (Duplicate Records for Redundancy)",
                description: "ساخت رکوردهای هم‌نام با آدرس‌های متفاوت برای فراهم کردن مسیرهای جایگزین در صورت در دسترس نبودن یکی از سرورها."
              },
              {
                title: "دامین کنترلر پشتیبان (Additional Domain Controller - ADC)",
                description: "نصب نقش Active Directory Domain Services روی سرور دوم و انتخاب گزینه Add a domain controller to an existing domain جهت همتاسازی داده‌های دایرکتوری و بالا بردن ضریب اطمینان شبکه (High Availability)."
              }
            ]
          },
          {
            title: "پروژه چهارم: WDS (Windows Deployment Services)",
            content: "راه‌اندازی سرویس استقرار سیستم‌عامل تحت شبکه برای نصب خودکار و بدون دیسک ویندوز روی کلاینت‌ها.",
            details: [
              {
                title: "پیکربندی اولیه سرویس (WDS Role Configuration)",
                description: "نصب نقش WDS از طریق Server Manager، اجرای ویزارد پیکربندی (Configure Server) و تعیین مسیر ذخیره‌سازی فایل‌های نصب ایمیج‌ها."
              },
              {
                title: "افزودن ایمیج‌های راه‌انداز و نصب (Adding Boot and Install Images)",
                description: "مونت کردن فایل ISO ویندوز و وارد کردن فایل boot.wim به بخش Boot Images و فایل install.wim به بخش Install Images سرویس WDS."
              },
              {
                title: "نصب تحت شبکه کلاینت (PXE Boot and Network Installation)",
                description: "ایجاد یک ماشین مجازی فاقد سیستم‌عامل، تنظیم بوت روی حالت Network Boot (با کلید F12) و شروع فرآیند نصب سیستم‌عامل از روی سرور WDS."
              }
            ]
          }
        ]
      },

      {
        title: "4- ارائه پروژه‌های عملی",
        content: "🔸 ارائه و پیاده‌سازی پروژه‌های عملی سرویس‌های شبکه (DNS, DHCP, WDS, Domain Join)",
        subtopics: [
          {
            title: "پروژه اول: RR (Round Robin) در DNS",
            content: "توزیع بار چرخشی بین چند سرور با استفاده از رکوردهای هم‌نام در سرویس DNS.",
            details: [
              {
                title: "مفهوم نوبت‌دهی چرخشی (DNS Round Robin Concept)",
                description: "توزیع بار بین چند سرور از طریق برگرداندن IPهای مختلف برای یک نام دامنه یکسان، به صورت نوبتی و بدون نیاز به Load Balancer."
              },
              {
                title: "فعال‌سازی گزینه چرخش (Enable Round Robin)",
                description: "ورود به DNS Manager → Properties → تب Advanced → فعال‌سازی گزینه Enable round robin."
              },
              {
                title: "ساخت رکوردهای هم‌نام (Identical A Records)",
                description: "ایجاد چند رکورد A با یک Hostname (مثل web) و IPهای متفاوت جهت چرخش پاسخ‌ها."
              },
              {
                title: "تست عملکرد کلاینت (Client Testing via NSLookup)",
                description: "پاک‌سازی کش (ipconfig /flushdns) و اجرای nslookup جهت مشاهده تغییر نوبتی IPهای خروجی."
              }
            ]
          },

          {
            title: "پروژه دوم: Delegation در DNS",
            content: "واگذاری مدیریت زیردامنه‌ها مانند shop.test.local به سرور DNS دوم.",
            details: [
              {
                title: "مفهوم تفویض مدیریت (DNS Delegation Concept)",
                description: "انتقال کنترل یک Subdomain مشخص به سرور DNS دیگر برای سازمان‌دهی و توزیع مسئولیت نام‌گذاری."
              },
              {
                title: "راه‌اندازی سرور دوم (Secondary DNS Setup)",
                description: "نصب نقش DNS روی سرور دوم جهت مدیریت زیردامنه‌ای که قرار است تفویض شود."
              },
              {
                title: "ایجاد تفویض (New Delegation Wizard)",
                description: "DNS Manager → روی دامنه اصلی راست‌کلیک → New Delegation → وارد کردن نام زیردامنه (shop) → معرفی سرور دوم."
              },
              {
                title: "بررسی کارکرد (Resolution Verification)",
                description: "اطمینان از این‌که درخواست‌های مربوط به زیردامنه به سرور دوم هدایت می‌شوند."
              }
            ]
          },

          {
            title: "پروژه سوم: Duplicate DNS Records",
            content: "ساخت رکوردهای هم‌نام برای افزونگی یا ایجاد Domain Controller دوم جهت High Availability.",
            details: [
              {
                title: "رکوردهای IP چندگانه (Duplicate DNS Records)",
                description: "استفاده از رکوردهای هم‌نام با IPهای متفاوت برای ایجاد افزونگی و توزیع بار."
              },
              {
                title: "دامین کنترلر دوم (Additional Domain Controller - ADC)",
                description: "نصب ADDS روی سرور دوم و انتخاب گزینه Add a domain controller to an existing domain جهت Replication اطلاعات."
              },
              {
                title: "همگام‌سازی دایرکتوری (Directory Replication)",
                description: "اطمینان از انتقال اطلاعات بین دو دامین کنترلر جهت جلوگیری از خرابی سرویس در صورت Down شدن یکی از سرورها."
              }
            ]
          },

          {
            title: "پروژه چهارم: DHCP",
            content: "راه‌اندازی DHCP برای اختصاص خودکار IP، Subnet Mask، Gateway و DNS.",
            details: [
              {
                title: "پروتکل پیکربندی پویا (Dynamic Host Configuration Protocol - DHCP)",
                description: "پروتکلی برای تخصیص خودکار تنظیمات شبکه به کلاینت‌ها بدون نیاز به تنظیمات دستی."
              },
              {
                title: "تعریف محدوده (Scope Configuration)",
                description: "ایجاد Scope شامل Range آدرس‌ها، Subnet Mask، Default Gateway و گزینه‌های مرتبط."
              },
              {
                title: "فعال‌سازی و تست (Activation & ipconfig /renew)",
                description: "فعال کردن Scope و دریافت IP توسط کلاینت با دستور ipconfig /renew."
              }
            ]
          },

          {
            title: "پروژه پنجم: WDS (Windows Deployment Services)",
            content: "راه‌اندازی سرویس نصب ویندوز از طریق شبکه با PXE Boot.",
            details: [
              {
                title: "سرویس استقرار ویندوز (Windows Deployment Services)",
                description: "نصب و پیکربندی WDS جهت ارائه نصب ویندوز از طریق شبکه بدون نیاز به فلش یا DVD."
              },
              {
                title: "افزودن ایمیج‌های بوت و نصب (Boot & Install Images)",
                description: "افزودن boot.wim به Boot Images و install.wim به Install Images پس از Mount کردن فایل ISO."
              },
              {
                title: "نصب تحت شبکه (PXE Network Boot)",
                description: "روشن کردن کلاینت بدون سیستم‌عامل، انتخاب Network Boot (F12) و شروع فرآیند نصب."
              }
            ]
          },

          {
            title: "پروژه ششم: Domain Join",
            content: "اتصال یک کلاینت یا سرور به دامین اکتیو دایرکتوری.",
            details: [
              {
                title: "عضویت در دامین (Active Directory Domain Join)",
                description: "افزودن کامپیوتر به ساختار دامین برای مدیریت متمرکز کاربران، گروه‌ها و سیاست‌ها."
              },
              {
                title: "تنظیمات DNS کلاینت (Domain DNS Requirement)",
                description: "کلاینت باید DNS سرور دامین را بشناسد تا بتواند فرآیند Join را انجام دهد."
              },
              {
                title: "تغییر حالت سیستم (Workgroup → Domain)",
                description: "System Properties → Change → وارد کردن نام دامنه → ارائه اطلاعات کاربری ادمین."
              },
              {
                title: "تکمیل فرآیند (Restart & Login)",
                description: "پس از Restart، سیستم عضو دامنه شده و کاربران دامنه امکان ورود دارند."
              }
            ]
          }
        ]
      },

    ]
  };