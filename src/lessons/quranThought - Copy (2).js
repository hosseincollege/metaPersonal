export default [
  // ================== فصل 1 : معرفی ADSL ==================
  {
    section: "فصل 1 : معرفی ADSL",
    units: [
      {
        unitTitle: "1-تعریف ADSL",
        unitContent: "ADSL مخفف Asymmetric Digital Subscriber Line است و یک فناوری دسترسی به اینترنت بر بستر خط تلفن ثابت (زوج سیم مسی) می‌باشد که امکان استفاده همزمان از اینترنت و مکالمه تلفنی را فراهم می‌کند.",
        topics: [
          {
            topicTitle: "مخفف ADSL",
            topicContent: "Asymmetric Digital Subscriber Line به معنی خط اشتراک دیجیتال نامتقارن است.",
            subtopics: [
              {
                subtopicTitle: "بستر ارتباطی",
                subtopicContent: "این سرویس روی سیم مسی تلفن ثابت ارائه می‌شود."
              }
            ]
          }
        ]
      },
      {
        unitTitle: "2-ویژگی نامتقارن ADSL",
        unitContent: "در ADSL سرعت دانلود بیشتر از سرعت آپلود است و این ویژگی متناسب با مصرف کاربران خانگی طراحی شده است.",
        topics: [
          {
            topicTitle: "سرعت در ADSL",
            topicContent: "بررسی تفاوت سرعت در دو جهت:",
            subtopics: [
              {
                subtopicTitle: "دانلود",
                subtopicContent: "دریافت اطلاعات از اینترنت به سمت کاربر با سرعت بالاتر."
              },
              {
                subtopicTitle: "آپلود",
                subtopicContent: "ارسال اطلاعات از سمت کاربر به اینترنت با سرعت کمتر."
              }
            ]
          }
        ]
      }
    ]
  },

  // ================== فصل 2 : مشترک ADSL ==================
  {
    section: "فصل 2 : مشترک ADSL",
    units: [
      {
        unitTitle: "1-تعریف مشترک ADSL",
        unitContent: "مشترک ADSL شخص یا سازمانی است که دارای خط تلفن ثابت فعال بوده و سرویس اینترنت ADSL دریافت می‌کند.",
        topics: [
          {
            topicTitle: "انواع کاربران",
            topicContent: "دسته بندی استفاده کنندگان از سرویس:",
            subtopics: [
              {
                subtopicTitle: "کاربر خانگی",
                subtopicContent: "بیشترین استفاده ADSL در مصارف خانگی است."
              },
              {
                subtopicTitle: "کاربر سازمانی",
                subtopicContent: "برخی شرکت‌ها برای ارتباط پشتیبان از ADSL استفاده می‌کنند."
              }
            ]
          }
        ]
      },
      {
        unitTitle: "2-پیش‌نیازهای دریافت سرویس",
        unitContent: "برای فعال‌سازی ADSL باید شرایط فنی مشخصی برقرار باشد.",
        topics: [
          {
            topicTitle: "بررسی فنی خط",
            topicContent: "پیش از ثبت‌نام موارد زیر بررسی می‌شود:",
            subtopics: [
              {
                subtopicTitle: "سلامت خط تلفن",
                subtopicContent: "خط نباید نویز شدید یا قطعی مداوم داشته باشد."
              },
              {
                subtopicTitle: "عدم فیبر نوری",
                subtopicContent: "خط نباید FTTH باشد، چون ADSL روی سیم مسی کار می‌کند."
              },
              {
                subtopicTitle: "رانژه بودن خط",
                subtopicContent: "خط باید در مرکز مخابرات به DSLAM متصل شده باشد."
              }
            ]
          }
        ]
      }
    ]
  }
];
