// File: E:\metaPersonal\src\components\TwoDMobile\utils.js

// توابع کمکی برای پردازش متن و تشخیص جهت
export const pickText = (...values) => {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
};

export const detectDir = (text = "") => {
  const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  return rtlRegex.test(text) ? "rtl" : "ltr";
};

export const shortLabel = (text = "", max = 3) => {
  const clean = String(text || "").trim();
  if (!clean) return "";
  return clean.slice(0, max);
};

// تابع نرمال‌سازی درختی با حفظ شناسه‌های پایدار جهت اجرای روان ترنزیشن‌ها
export const normalizeRecursive = (items, path = "root") => {
  if (!Array.isArray(items)) return [];
  return items.map((item, index) => {
    // استفاده از شناسه موجود یا تولید شناسه پایدار
    const id = item?.id ? String(item.id) : `${path}-${index}`;
    const children = normalizeRecursive(
      [
        ...(Array.isArray(item?.chapters) ? item.chapters : []),
        ...(Array.isArray(item?.sections) ? item.sections : []),
        ...(Array.isArray(item?.units) ? item.units : []),
        ...(Array.isArray(item?.topics) ? item.topics : []),
        ...(Array.isArray(item?.subtopics) ? item.subtopics : []),
        ...(Array.isArray(item?.details) ? item.details : []),
        ...(Array.isArray(item?.items) ? item.items : []),
        ...(Array.isArray(item?.children) ? item.children : []),
      ],
      id
    );

    return {
      id,
      title: pickText(
        item?.title,
        item?.chapterTitle,
        item?.sectionTitle,
        item?.unitTitle,
        item?.topicTitle,
        item?.subtopicTitle,
        item?.name
      ),
      content: pickText(
        item?.content,
        item?.description,
        item?.body,
        item?.text,
        item?.chapterContent,
        item?.sectionContent,
        item?.unitContent,
        item?.topicContent,
        item?.subtopicContent
      ),
      color: item?.color || item?.accentColor || item?.themeColor || null,
      children,
    };
  });
};

// تبدیل درخت به ساختار فلت به همراه شماره‌گذاری و عمق
export const flattenTree = (items, depth = 0, parentNumber = "") => {
  if (!Array.isArray(items)) return [];
  return items.flatMap((item, index) => {
    const number = parentNumber ? `${parentNumber}.${index + 1}` : `${index + 1}`;
    const current = { ...item, depth, number };
    return [current, ...flattenTree(item?.children || [], depth + 1, number)];
  });
};
