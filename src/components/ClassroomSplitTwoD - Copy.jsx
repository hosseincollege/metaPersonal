import React, { useState, useMemo, useCallback, useRef } from "react";

// تابع استایل‌دهی
const getThemeStyles = (isDark, collapsed) => ({
    mainContainer: {
        width: "100vw",
        height: "100vh",
        backgroundColor: isDark ? "#080808" : "#f8fafc",
        display: "flex",
        flexDirection: "column",
        color: isDark ? "white" : "#0f172a",
        direction: "rtl",
        fontFamily: "'Vazirmatn', sans-serif",
        position: "relative",
        transition: "background-color 0.3s ease, color 0.3s ease",
    },
    topToolbar: {
        position: "absolute",
        top: 4,
        right: 6,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: isDark ? "rgba(20,20,20,0.85)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(8px)",
        borderRadius: "8px",
        padding: "6px 10px",
        border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)",
        color: isDark ? "white" : "#1e293b",
        boxShadow: isDark ? "none" : "0 2px 10px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
    },
    iconButtonStyle: (isActive, activeColor = "white") => {
        const inactiveColor = isDark ? "#64748b" : "#94a3b8";
        return {
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: isActive ? activeColor : inactiveColor,
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.2s ease",
        };
    },
    headerSpacer: {
        height: "60px",
        width: "100%",
    },
    fourColumnSplit: {
        display: "flex",
        flex: 1,
        overflow: "hidden",
    },
    chapterNavPanel: {
        width: collapsed ? "60px" : "280px",
        minWidth: collapsed ? "60px" : "280px",
        backgroundColor: isDark ? "#0f0f0f" : "#ffffff",
        padding: "12px 10px",
        overflowY: "auto",
        borderLeft: isDark ? "1px solid #262626" : "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        transition: "all 0.3s ease",
    },
    topicListPanel: {
        width: collapsed ? "60px" : "260px",
        minWidth: collapsed ? "60px" : "260px",
        backgroundColor: isDark ? "#131313" : "#f1f5f9",
        padding: "12px 10px",
        overflowY: "auto",
        borderLeft: isDark ? "1px solid #262626" : "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        transition: "all 0.3s ease",
    },
    // استایل ستون جدید (لیست جزئیات)
    thirdColumnPanel: (isVisible) => ({
        width: isVisible ? "240px" : "0px",
        minWidth: isVisible ? "240px" : "0px",
        backgroundColor: isDark ? "#161616" : "#ffffff",
        padding: isVisible ? "12px 10px" : "0",
        overflowY: "auto",
        borderLeft: isVisible ? (isDark ? "1px solid #262626" : "1px solid #e2e8f0") : "none",
        display: "flex",
        flexDirection: "column",
        gap: "4px", // فاصله کمتر برای لیست‌های متوالی
        opacity: isVisible ? 1 : 0,
        transition: "all 0.3s ease",
        visibility: isVisible ? "visible" : "hidden",
    }),
    contentPanelArea: {
        flex: 1,
        padding: "14px 18px",
        overflowY: "auto",
        backgroundColor: isDark ? "transparent" : "#ffffff",
    },
    chapterButtonVertical: {
        padding: "8px 10px",
        borderRight: "3px solid",
        background: "transparent",
        color: isDark ? "#9ca3af" : "#64748b",
        cursor: "pointer",
        transition: "0.2s",
        whiteSpace: "nowrap",
        textAlign: "right",
        width: "100%",
        marginBottom: "6px",
        lineHeight: "1.7",
        fontSize: "1.05rem",
    },
    topicList: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    topicHeader: {
        fontSize: "1.3rem",
        margin: "0 0 10px 0",
        paddingBottom: "6px",
        borderBottom: isDark ? "2px solid #334155" : "2px solid #cbd5e1",
    },
    topicItem: {
        padding: "8px 10px",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "0.2s",
        lineHeight: "1.8",
        fontSize: "1.05rem",
        color: isDark ? "white" : "#334155",
    },
    topicTitle: {
        fontSize: "1.05rem",
        display: "block",
        margin: 0,
        padding: 0,
    },
    contentHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "10px",
        marginBottom: "14px",
        borderBottom: isDark ? "1px dashed #334155" : "1px dashed #cbd5e1",
    },
    // استایل‌های جدید برای آیتم‌های لیست جزئیات
    detailListItem: {
        padding: "6px 8px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "0.95rem",
        lineHeight: "1.5",
        borderRight: "3px solid transparent",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    subtopicTitleStyle: {
        margin: "0 0 4px 0",
        fontSize: "1rem",
        fontWeight: "600",
        color: isDark ? "#d1d5db" : "#374151",
    },
    detailTitleStyle: {
        margin: "0",
        fontSize: "0.9rem",
        fontWeight: "400",
        color: isDark ? "#38bdf8" : "#0284c7", // رنگ متفاوت برای دیتیل‌ها
    },
});

const pickText = (...values) => {
    for (const v of values) {
        if (typeof v === "string" && v.trim()) return v;
    }
    return "";
};

// تابع هوشمند برای تبدیل هر ساختاری به درخت واحد
const normalizeRecursive = (items) => {
    if (!Array.isArray(items)) return [];
    return items.map((it) => ({
        title: pickText(it.title, it.unitTitle, it.topicTitle, it.subtopicTitle, it.section),
        content: pickText(it.content, it.unitContent, it.topicContent, it.subtopicContent),
        children: normalizeRecursive([
            ...(Array.isArray(it.units) ? it.units : []),
            ...(Array.isArray(it.topics) ? it.topics : []),
            ...(Array.isArray(it.subtopics) ? it.subtopics : []),
            ...(Array.isArray(it.details) ? it.details : []),
            ...(Array.isArray(it.items) ? it.items : []),
            ...(Array.isArray(it.chapters) ? it.chapters : []),
        ])
    }));
};

export default function ClassroomSplitTwoD({ lesson, onBack, onSwitchTo3D, theme = "dark" }) {
    const [collapsed, setCollapsed] = useState(false);
    const [isThirdColumnVisible, setIsThirdColumnVisible] = useState(true); 
    const isDark = theme === "dark";
    const styles = useMemo(() => getThemeStyles(isDark, collapsed), [isDark, collapsed]);
    const topicListRef = useRef(null);
    const thirdColumnListRef = useRef(null);

    const sections = useMemo(() => {
        const raw = Array.isArray(lesson) ? lesson : (lesson?.sections || lesson?.chapters || lesson?.items || []);
        return normalizeRecursive(raw);
    }, [lesson]);

    const [activeSectionIdx, setActiveSectionIdx] = useState(0);
    const [activeUnitIdx, setActiveUnitIdx] = useState(0);
    
    // اینت برای ذخیره آدرس دقیق آیتم کلیک شده در ستون سوم (برای هایلایت کردن)
    const [activeDetailPath, setActiveDetailPath] = useState(null);

    const lessonColor = !Array.isArray(lesson) && lesson?.color ? lesson.color : "#38bdf8";
    const secondaryColor = "#f59e0b";
    
    const lessonTitle = !Array.isArray(lesson) 
        ? pickText(lesson?.title, lesson?.name, lesson?.lessonTitle, "محتوای آموزشی")
        : "محتوای آموزشی";

    const detectDir = useCallback((text) => {
        const persianRegex = /[\u0600-\u06FF]/;
        return persianRegex.test(text || "") ? "rtl" : "ltr";
    }, []);

    const activeSection = sections[activeSectionIdx] || null;
    // activeUnit می‌تواند خودِ واحد باشد یا یکی از دیتیل‌های داخل آن
    const activeUnit = activeSection?.children?.[activeUnitIdx] || null;

    const handleSectionChange = (index) => {
        setActiveSectionIdx(index);
        setActiveUnitIdx(0);
        setActiveDetailPath(null); // ریست کردن انتخاب دیتیل
        topicListRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        if (thirdColumnListRef.current) thirdColumnListRef.current.scrollTop = 0;
    };

    // تابع برای پیدا کردن یک آیتم خاص در درخت بر اساس عنوان (برای پیدا کردن ایندکس در لیست واحدها)
    // این تابع کمک می‌کند وقتی روی دیتیل کلیک کردیم، بفهمیم در کدام "واحد" (Unit) قرار دارد
    const findUnitIndexForItem = (items, targetTitle, currentIndex = 0) => {
        if (!items) return -1;
        for (let i = 0; i < items.length; i++) {
            if (items[i].title === targetTitle) return currentIndex + i;
            const foundInChild = findUnitIndexForItem(items[i].children, targetTitle, currentIndex + i);
            if (foundInChild !== -1) return foundInChild;
        }
        return -1;
    };

    const handleDetailClick = (item) => {
        // 1. اگر آیتم کلیک شده خودش یک "واحد" است (یعنی children دارد و تاپیک نیست)، مستقیم انتخابش کن
        if (activeSection?.children?.find(u => u.title === item.title)) {
             setActiveUnitIdx(activeSection.children.findIndex(u => u.title === item.title));
             setActiveDetailPath(null);
             return;
        }

        // 2. اگر آیتم یک زیرمجموعه است (Detail/Subtopic)
        // باید پیدا کنیم این آیتم متعلق به کدام واحد (Unit) است تا آن واحد را در لیست راست انتخاب کنیم
        // و همچنین محتوای این آیتم خاص را نمایش دهیم.
        
        // پیدا کردن ایندکس واحدی که این آیتم در آن وجود دارد
        const unitIndex = findUnitIndexForItem(activeSection?.children, item.title);
        
        if (unitIndex !== -1) {
            setActiveUnitIdx(unitIndex); // واحد والد را فعال کن
            // اینجا نکته مهم است: ما می‌خواهیم محتوای "item" را نشان دهیم، نه محتوای واحد والد را.
            // اما ساختار فعلی activeUnit را بر اساس ایندکس می‌گیرد.
            // راه حل: ما activeUnit را به صورت دستی در JSX مدیریت می‌کنیم یا از یک state جداگانه استفاده می‌کنیم.
            // برای سادگی، ما activeUnit را به خودِ "item" تغییر می‌دهیم، اما باید مراقب باشیم که ایندکس لیست واحدها هم درست باشد.
            
            // برای هماهنگی با لیست سمت راست (Topics)، باید ایندکس واحد والد را ست کنیم.
            // اما محتوای نمایشی باید مربوط به خودِ item باشد.
            
            // بیایید یک state جدید برای "Active Content Item" داشته باشیم؟ 
            // خیر، برای سادگی کد، فرض می‌کنیم وقتی روی دیتیل کلیک می‌شود، ما محتوای دیتیل را نمایش می‌دهیم
            // اما ساختار فعلی از activeUnitIdx استفاده می‌کند.
            
            // بیایید activeUnit را مستقیماً روی item ست کنیم (در JSX) و ایندکس را هم ست کنیم تا لیست بالا هایلایت شود.
            setActiveDetailPath(item.title);
            
            // اسکرول به آیتم در لیست ستون سوم (اختیاری)
            // setTimeout(() => { ... }, 100);
        }
    };

    // استخراج تایتل‌ها به همراه ساختار درختی برای رندر
    const extractTitlesWithRef = (items, depth = 0, parentRef = null) => {
        if (!items || !Array.isArray(items)) return [];
        let titles = [];
        items.forEach((item) => {
            titles.push({ ...item, depth, ref: parentRef });
            if (item.children && item.children.length > 0) {
                titles = [...titles, ...extractTitlesWithRef(item.children, depth + 1, item)];
            }
        });
        return titles;
    };

    const renderItemsRecursive = (items, depth = 0) => {
        if (!items || items.length === 0) return null;
        const detailTitleColor = isDark ? "#9bded5" : "#0f766e"; 

        return (
            <div style={{ marginTop: depth === 0 ? "14px" : "10px" }}>
                {items.map((item, idx) => {
                    const isLast = idx === items.length - 1;
                    const numberPrefix = depth === 0 ? `${idx + 1}- ` : "";

                    return (
                        <div
                            key={idx}
                            style={{
                                marginBottom: depth === 0 ? "18px" : "14px",
                                paddingBottom: depth === 0 ? "14px" : "0",
                                borderBottom: (depth === 0 && !isLast)
                                    ? (isDark ? "1px solid #334155" : "1px solid #e2e8f0")
                                    : "none",
                            }}
                        >
                            {item.title && (
                                <h5
                                    style={{
                                        margin: "0 0 6px 0",
                                        fontSize: depth === 0 ? "1.1rem" : "1rem",
                                        fontWeight: "bold",
                                        color: depth === 0 ? secondaryColor : detailTitleColor,
                                        lineHeight: "1.6",
                                    }}
                                >
                                    {numberPrefix}{item.title}
                                </h5>
                            )}

                            {item.content && (
                                <p
                                    style={{
                                        whiteSpace: "pre-line",
                                        margin: 0,
                                        fontSize: depth === 0 ? "1.05rem" : "1rem",
                                        lineHeight: "1.8",
                                        color: isDark ? "#cbd5e1" : "#475569",
                                    }}
                                >
                                    {item.content}
                                </p>
                            )}

                            {item.children?.length > 0 && (
                                <div style={{ marginTop: "12px", paddingRight: "18px" }}>
                                    {renderItemsRecursive(item.children, depth + 1)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    if (!sections.length) {
        return (
            <div style={{ backgroundColor: isDark ? "#080808" : "#fff", color: isDark ? "white" : "black", width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", direction: "rtl" }}>
                محتوای درس یافت نشد.
            </div>
        );
    }

    // محاسبه محتوای نمایشی: اگر روی یک دیتیل کلیک شده، محتوای همان دیتیل را نشان بده، وگرنه محتوای واحد اصلی را
    const contentToRender = activeDetailPath 
        ? (() => {
            // پیدا کردن آیتم بر اساس پث کلیک شده
            const findItem = (items) => {
                for (let item of items) {
                    if (item.title === activeDetailPath) return item;
                    if (item.children) {
                        const found = findItem(item.children);
                        if (found) return found;
                    }
                }
                return null;
            };
            return findItem(activeSection?.children?.[activeUnitIdx]?.children || []);
        })()
        : activeUnit;

    return (
        <div style={styles.mainContainer}>
            <div style={styles.topToolbar}>
                <button onClick={onSwitchTo3D} style={styles.iconButtonStyle(true, "#38bdf8")}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l10 6v6l-10 6-10-6V9z"></path><path d="M22 9l-10 6-10-6"></path></svg>
                </button>
                <div style={{ width: 1, height: 20, background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)", margin: "0 4px" }} />
                <h3 style={{ margin: "0 4px", fontSize: "1.1rem", fontWeight: "700", color: isDark ? "#e2e8f0" : "#334155", whiteSpace: "nowrap" }}>{lessonTitle}</h3>
                <div style={{ width: 1, height: 20, background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)", margin: "0 4px" }} />
                
                <button onClick={() => setCollapsed(!collapsed)} style={styles.iconButtonStyle(true, collapsed ? "#38bdf8" : "#fbbf24")}>
                    {collapsed ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    )}
                </button>

                <button 
                    onClick={() => setIsThirdColumnVisible(!isThirdColumnVisible)} 
                    style={styles.iconButtonStyle(true, isThirdColumnVisible ? "#38bdf8" : "#94a3b8")}
                    title="نمایش/مخفی کردن فهرست جزئیات"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="9" y1="3" x2="9" y2="21"></line>
                    </svg>
                </button>

                <div style={{ display: "flex", gap: "4px", marginLeft: "auto" }}>
                    <button onClick={onBack} style={styles.iconButtonStyle(true, "#f87171")}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    </button>
                </div>
            </div>

            <div style={styles.headerSpacer} />

            <div style={styles.fourColumnSplit}>
                
                {/* ستون ۱: فصل‌ها */}
                <div style={styles.chapterNavPanel}>
                    <h2 style={{ ...styles.topicHeader, color: lessonColor, borderBottom: `2px solid ${lessonColor}` }}>بخش‌ها</h2>
                    {sections.map((sec, index) => (
                        <button
                            key={index}
                            style={{
                                ...styles.chapterButtonVertical,
                                borderColor: activeSectionIdx === index ? lessonColor : (isDark ? "#374151" : "#e2e8f0"),
                                backgroundColor: activeSectionIdx === index ? (isDark ? "rgba(55,65,81,0.6)" : "rgba(59, 130, 246, 0.1)") : "transparent",
                                color: activeSectionIdx === index ? (isDark ? "white" : "#0f172a") : (isDark ? "#9ca3af" : "#64748b"),
                                fontWeight: activeSectionIdx === index ? "bold" : "normal",
                            }}
                            onClick={() => handleSectionChange(index)}
                        >
                            {collapsed ? (sec.title || "").substring(0, 2) : sec.title}
                        </button>
                    ))}
                </div>

                {/* ستون ۲: واحدها */}
                <div style={styles.topicListPanel} ref={topicListRef}>
                    <h2 style={{ ...styles.topicHeader, color: lessonColor }}>{collapsed ? "واحد" : (activeSection?.title || "واحدها")}</h2>
                    <div style={styles.topicList}>
                        {activeSection?.children?.map((u, index) => (
                            <div
                                key={index}
                                style={{
                                    ...styles.topicItem,
                                    backgroundColor: activeUnitIdx === index ? (isDark ? "rgba(55,65,81,0.4)" : "#fff") : "transparent",
                                    border: activeUnitIdx === index ? (isDark ? "none" : "1px solid #e2e8f0") : "1px solid transparent",
                                    borderRight: activeUnitIdx === index ? `3px solid ${lessonColor}` : "3px solid transparent",
                                }}
                                onClick={() => {
                                    setActiveUnitIdx(index);
                                    setActiveDetailPath(null); // ریست کردن دیتیل با انتخاب واحد جدید
                                }}
                            >
                                <span style={styles.topicTitle}>{collapsed ? (u.title || "").substring(0, 2) : u.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ستون ۳: لیست جزئیات (کلیک‌پذیر) */}
                <div style={styles.thirdColumnPanel(isThirdColumnVisible)} ref={thirdColumnListRef}>
                    <h2 style={{ ...styles.topicHeader, color: lessonColor, fontSize: "1.1rem", margin: "0 0 10px 0" }}>
                        {isThirdColumnVisible ? (activeUnit?.title || "جزئیات") : ""}
                    </h2>
                    {activeUnit && isThirdColumnVisible && activeUnit.children ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            {extractTitlesWithRef(activeUnit.children).map((item, idx) => {
                                const isDetail = item.depth > 0;
                                const isActive = activeDetailPath === item.title;
                                
                                return (
                                    <div 
                                        key={idx} 
                                        onClick={() => handleDetailClick(item)}
                                        style={{
                                            ...styles.detailListItem,
                                            // تورفتگی برای دیتیل‌ها
                                            paddingRight: isDetail ? `${12 + (item.depth * 8)}px` : '12px',
                                            backgroundColor: isActive 
                                                ? (isDark ? "rgba(56, 189, 248, 0.15)" : "rgba(56, 189, 248, 0.1)") 
                                                : "transparent",
                                            borderRightColor: isActive ? lessonColor : "transparent",
                                            color: isDetail 
                                                ? (isDark ? "#38bdf8" : "#0284c7") // رنگ آبی برای دیتیل‌ها
                                                : (isDark ? "#e2e8f0" : "#334155"), // رنگ تیره برای ساب‌تاپیک‌ها
                                            fontWeight: isDetail ? "400" : "600",
                                            fontSize: isDetail ? "0.9rem" : "1rem",
                                        }}
                                    >
                                        {isDetail ? `• ${item.title}` : item.title}
                                    </div>
                                );
                            })}
                        </div>
                    ) : isThirdColumnVisible ? (
                        <div style={{ textAlign: "center", padding: "10px", color: isDark ? "#64748b" : "#94a3b8", fontSize: "0.9rem" }}>
                            واحدی انتخاب نشده
                        </div>
                    ) : null}
                </div>

                {/* ستون ۴: محتوا */}
                <div style={{ ...styles.contentPanelArea, direction: detectDir(contentToRender?.content || contentToRender?.title || "") }}>
                    {contentToRender ? (
                        <>
                            <div style={styles.contentHeader}>
                                <h3 style={{ margin: 0, fontSize: "1.35rem", color: lessonColor, lineHeight: "1.7" }}>
                                    {contentToRender.title}
                                </h3>
                            </div>
                            {contentToRender.content ? (
                                <p style={{ whiteSpace: "pre-line", margin: "0 0 16px 0", fontSize: "1.2rem", lineHeight: "1.9", color: isDark ? "#e5e7eb" : "#334155" }}>
                                    {contentToRender.content}
                                </p>
                            ) : (
                                <div style={{ padding: "12px", borderRadius: "8px", background: isDark ? "#111827" : "#f8fafc", color: isDark ? "#cbd5e1" : "#475569", marginBottom: "16px" }}>
                                    {contentToRender === activeUnit ? "این بخش دارای زیرمجموعه است. لطفاً از منوی سمت چپ یکی را انتخاب کنید." : "متن این بخش خالی است."}
                                </div>
                            )}
                            {/* اگر محتوای نمایشی همان activeUnit است، رندر بازگشتی را نشان بده */}
                            {contentToRender === activeUnit && renderItemsRecursive(activeUnit.children)}
                        </>
                    ) : (
                        <div style={{ textAlign: "center", marginTop: "40px" }}>لطفاً یک واحد یا بخش را انتخاب کنید.</div>
                    )}
                </div>

            </div>
        </div>
    );
}