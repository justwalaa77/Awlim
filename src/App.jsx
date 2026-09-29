import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Menu,
  X,
  ArrowUpLeft,
  ArrowUpRight,
  Bookmark,
  Plus,
  Trash2,
  Pencil,
  LogOut,
  Globe2,
  ArrowLeft,
} from "lucide-react";

/* =========================
   SEED ARTICLES
========================= */

const seedArticles = [
  {
    id: 1,
    title_ar: "ما وراء الشاشة: كيف تغيّر التقنية تفاصيل حياتنا؟",
    title_en: "Beyond the Screen: How Technology Changes Everyday Life",

    excerpt_ar:
      "ليست التقنية أجهزةً حولنا فحسب؛ إنها تفاصيل صغيرة تعيد تشكيل الطريقة التي نعيش ونفكر ونتواصل بها.",
    excerpt_en:
      "Technology is not only the devices around us; it is the small details reshaping how we live, think and connect.",

    body_ar:
      "ليست التقنية أجهزةً حولنا فحسب؛ إنها تفاصيل صغيرة تعيد تشكيل الطريقة التي نعيش ونفكر ونتواصل بها.\n\nوبين شاشة وأخرى، تتغير عاداتنا وأسئلتنا وعلاقاتنا بالأشياء من حولنا.\n\nفي عَولِم نبحث عن هذه التفاصيل؛ عن السؤال الذي يستحق أن نتوقف عنده، وعن التجربة التي تحمل أكثر مما يبدو في ظاهرها.",
    body_en:
      "Technology is not only the devices around us; it is the small details reshaping how we live, think and connect.\n\nBetween one screen and another, our habits, questions and relationships with the world around us continue to change.\n\nAt AWLIM, we look for these details: questions worth pausing over and experiences that carry more than they first reveal.",

    category: "Technology",
    author: "Walaa",
    date: "2026-09-20",
    read: 6,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
  },

  {
    id: 2,
    title_ar: "حين تصبح الحكاية ذاكرة",
    title_en: "When a Story Becomes Memory",

    excerpt_ar:
      "بعض الحكايات لا تنتهي حين تُروى؛ تبدأ هناك، في ذاكرة من سمعها.",
    excerpt_en:
      "Some stories do not end when they are told; they begin in the memory of the person who heard them.",

    body_ar:
      "بعض الحكايات لا تنتهي حين تُروى؛ تبدأ هناك، في ذاكرة من سمعها.\n\nنحن لا نتذكر كل التفاصيل، لكننا نحتفظ بالشعور الذي تركته الحكاية فينا.\n\nولهذا تبقى بعض القصص معنا طويلًا، حتى بعد أن ننسى متى وأين سمعناها.",
    body_en:
      "Some stories do not end when they are told; they begin in the memory of the person who heard them.\n\nWe may not remember every detail, but we remember the feeling a story left behind.\n\nThat is why some stories stay with us long after we forget when and where we first heard them.",

    category: "Culture",
    author: "Siba",
    date: "2026-09-16",
    read: 4,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: 3,
    title_ar: "الأفكار التي تستحق مساحة",
    title_en: "Ideas That Deserve Space",

    excerpt_ar:
      "في كل مكان فكرة صغيرة تنتظر من يمنحها وقتًا ومساحة وصوتًا.",
    excerpt_en:
      "Everywhere, a small idea waits for someone to give it time, space and a voice.",

    body_ar:
      "في كل مكان فكرة صغيرة تنتظر من يمنحها وقتًا ومساحة وصوتًا.\n\nقد تبدأ الفكرة كسؤال بسيط، أو ملاحظة عابرة، أو تجربة لم تجد طريقها بعد.\n\nلكن الأفكار تكبر حين تجد مساحة آمنة تُناقش فيها، وتُختبر، وتتحول إلى شيء يمكن مشاركته مع الآخرين.",
    body_en:
      "Everywhere, a small idea waits for someone to give it time, space and a voice.\n\nAn idea may begin as a simple question, a passing observation or an experience that has not yet found its way.\n\nIdeas grow when they find a space where they can be discussed, tested and shared with others.",

    category: "Ideas",
    author: "Lina",
    date: "2026-09-12",
    read: 5,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
  },
];

/* =========================
   CATEGORIES
========================= */

const categories = [
  "Culture",
  "Technology",
  "AI",
  "Science",
  "Design",
  "Society",
  "Business",
  "Arts",
  "Travel",
  "Ideas",
  "Opinion",
  "Creativity",
  "Lifestyle",
  "Youth",
  "Community",
];

/* =========================
   LANGUAGE
========================= */

function useLang() {
  const [lang, setLang] = useState(
    localStorage.getItem("awlim-lang") || "ar"
  );

  useEffect(() => {
    localStorage.setItem("awlim-lang", lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return [lang, setLang];
}

/* =========================
   LOGO
========================= */

function Logo() {
  return (
    <div className="brand">
      <div className="brand-name">عَولِم</div>
      <div className="brand-en">AWLIM</div>
    </div>
  );
}

/* =========================
   HEADER
========================= */

function Header({ lang, setLang, onNav }) {
  const [open, setOpen] = useState(false);

  const nav =
    lang === "ar"
      ? [
          ["home", "الرئيسية"],
          ["articles", "المقالات"],
          ["issues", "الأعداد"],
          ["categories", "التصنيفات"],
          ["alumni", "الخريجون"],
          ["about", "من نحن"],
        ]
      : [
          ["home", "Home"],
          ["articles", "Articles"],
          ["issues", "Issues"],
          ["categories", "Categories"],
          ["alumni", "Alumni"],
          ["about", "About"],
        ];

  return (
    <header className="header">
      <button
        className="mobile-menu"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        {open ? <X /> : <Menu />}
      </button>

      <Logo />

      <nav className={open ? "nav open" : "nav"}>
        {nav.map(([id, label]) => (
          <button
            key={id}
            onClick={() => {
              onNav(id);
              setOpen(false);
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button
          className="lang"
          onClick={() => setLang(lang === "ar" ? "en" : "ar")}
        >
          <Globe2 size={16} />
          {lang === "ar" ? "EN" : "العربية"}
        </button>

        <button
          className="search-button"
          onClick={() => onNav("search")}
          aria-label="Search"
        >
          <Search size={19} />
        </button>
      </div>
    </header>
  );
}

/* =========================
   FOOTER
========================= */

function Footer({ lang, onNav }) {
  const links =
    lang === "ar"
      ? [
          ["home", "الرئيسية"],
          ["articles", "المقالات"],
          ["issues", "الأعداد"],
          ["categories", "التصنيفات"],
          ["alumni", "الخريجون"],
          ["about", "من نحن"],
        ]
      : [
          ["home", "Home"],
          ["articles", "Articles"],
          ["issues", "Issues"],
          ["categories", "Categories"],
          ["alumni", "Alumni"],
          ["about", "About"],
        ];

  return (
    <footer className="footer">
      <div className="footer-statement">
        <span className="eyebrow">AWLIM / عَولِم</span>

        <h2>
          {lang === "ar"
            ? "نترك أثرًا يشبه الحكايات التي نحبها؛ يُروى، ويُكتشف، ويبقى."
            : "We leave traces like the stories we love — told, discovered, and remembered."}
        </h2>

        <p>
          {lang === "ar"
            ? "مساحة للأفكار التي تستحق أن تُروى."
            : "A space for ideas worth telling."}
        </p>
      </div>

      <div className="footer-row">
        <Logo />

        <div className="footer-links">
          {links.map(([id, label]) => (
            <button key={id} onClick={() => onNav(id)}>
              {label}
            </button>
          ))}
        </div>

        <button
          className="lang footer-lang"
          onClick={() => onNav("home")}
        >
          {lang === "ar" ? "العربية | English" : "English | العربية"}
        </button>
      </div>

      <div className="copyright">
        © 2026 AWLIM — Independent editorial magazine
      </div>
    </footer>
  );
}

/* =========================
   HOME
========================= */

function Home({ lang, articles, onNav }) {
  const featured = articles.find((a) => a.featured) || articles[0];

  if (!featured) {
    return (
      <main className="page">
        <div className="page-intro">
          <h1>{lang === "ar" ? "لا توجد مقالات" : "No articles yet"}</h1>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            {lang === "ar"
              ? "مجلة مستقلة من المنطقة"
              : "AN INDEPENDENT MAGAZINE FROM THE REGION"}
          </div>

          <h1>
            {lang === "ar"
              ? "الأفكار لا تحتاج ضجيجًا، تحتاج مساحة."
              : "Ideas don't need noise. They need space."}
          </h1>

          <p>
            {lang === "ar"
              ? "عَولِم مساحة تُروى فيها القصص، وتلتقي فيها الثقافة بالأفكار والإنسان بالتغيير."
              : "AWLIM is a space where stories meet culture, ideas and the people shaping change."}
          </p>

          <button
            className="text-link"
            onClick={() => onNav("articles")}
          >
            {lang === "ar" ? "اكتشف المقالات" : "Explore stories"}

            {lang === "ar" ? (
              <ArrowUpLeft size={18} />
            ) : (
              <ArrowUpRight size={18} />
            )}
          </button>
        </div>

        <div className="hero-image">
          <img src={featured.image} alt="" />

          <div className="hero-caption">
            <span>{featured.category}</span>

            <strong>
              {lang === "ar"
                ? featured.title_ar
                : featured.title_en}
            </strong>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">
              {lang === "ar" ? "مختارات" : "SELECTED STORIES"}
            </span>

            <h2>
              {lang === "ar" ? "أبرز المقالات" : "Featured Articles"}
            </h2>
          </div>

          <button
            className="text-link"
            onClick={() => onNav("articles")}
          >
            {lang === "ar" ? "كل المقالات" : "All articles"} →
          </button>
        </div>

        <div className="editorial-grid">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              lang={lang}
              onClick={() => onNav("article", article.id)}
            />
          ))}
        </div>
      </section>

      <section className="issue-banner">
        <div>
          <span className="eyebrow">
            {lang === "ar" ? "إصدار خاص" : "SPECIAL ISSUE"}
          </span>

          <h2>
            {lang === "ar"
              ? "وطنٌ يُكتب في القلب"
              : "A Homeland Written in the Heart"}
          </h2>

          <p>
            {lang === "ar"
              ? "العدد الخاص باليوم الوطني السعودي — ٩٦"
              : "AWLIM National Day Special — 96"}
          </p>
        </div>

        <button
          className="button dark"
          onClick={() => onNav("issues")}
        >
          {lang === "ar" ? "استكشف العدد" : "Explore issue"}
        </button>
      </section>
    </main>
  );
}

/* =========================
   ARTICLE CARD
========================= */

function ArticleCard({ article, lang, onClick }) {
  return (
    <article className="card" onClick={onClick}>
      <div className="card-image">
        <img src={article.image} alt="" />

        <span className="card-category">
          {article.category}
        </span>
      </div>

      <div className="card-meta">
        {article.author} · {article.read} min
      </div>

      <h3>
        {lang === "ar" ? article.title_ar : article.title_en}
      </h3>

      <p>
        {lang === "ar"
          ? article.excerpt_ar
          : article.excerpt_en}
      </p>
    </article>
  );
}

/* =========================
   ARTICLES
========================= */

function Articles({ lang, articles, onNav }) {
  const [filter, setFilter] = useState("All");

  const list =
    filter === "All"
      ? articles
      : articles.filter((article) => article.category === filter);

  return (
    <main className="page">
      <div className="page-intro">
        <span className="eyebrow">
          {lang === "ar" ? "الأرشيف" : "ARCHIVE"}
        </span>

        <h1>{lang === "ar" ? "المقالات" : "Articles"}</h1>

        <p>
          {lang === "ar"
            ? "أفكار وقصص وأصوات من المساحات التي تستحق أن تُرى."
            : "Ideas, stories and voices from spaces worth noticing."}
        </p>
      </div>

      <div className="filters">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          {lang === "ar" ? "الكل" : "All"}
        </button>

        {categories.map((category) => (
          <button
            className={filter === category ? "active" : ""}
            key={category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="editorial-grid">
        {list.length > 0 ? (
          list.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              lang={lang}
              onClick={() => onNav("article", article.id)}
            />
          ))
        ) : (
          <p>
            {lang === "ar"
              ? "لا توجد مقالات في هذا التصنيف."
              : "No articles in this category."}
          </p>
        )}
      </div>
    </main>
  );
}

/* =========================
   ARTICLE PAGE
========================= */

function Article({ lang, article }) {
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("awlim-saved") || "[]"
      ).includes(article.id);
    } catch {
      return false;
    }
  });

  const toggle = () => {
    let old = [];

    try {
      old = JSON.parse(
        localStorage.getItem("awlim-saved") || "[]"
      );
    } catch {
      old = [];
    }

    const next = saved
      ? old.filter((id) => id !== article.id)
      : [...old, article.id];

    localStorage.setItem(
      "awlim-saved",
      JSON.stringify(next)
    );

    setSaved(!saved);
  };

  const fallbackAr =
    "ليست الحكاية عن التقنية وحدها، بل عن التفاصيل التي تتسلل إلى يومنا حتى تصبح جزءًا من الطريقة التي نرى بها العالم.";

  const fallbackEn =
    "The story is not only about technology, but about the small details that quietly become part of how we see the world.";

  const body =
    lang === "ar"
      ? article.body_ar || fallbackAr
      : article.body_en || fallbackEn;

  return (
    <main className="article-page">
      <div className="article-head">
        <span className="eyebrow">{article.category}</span>

        <h1>
          {lang === "ar"
            ? article.title_ar
            : article.title_en}
        </h1>

        <p>
          {lang === "ar"
            ? article.excerpt_ar
            : article.excerpt_en}
        </p>

        <div className="article-meta">
          {article.author} · {article.date} · {article.read} min

          <button onClick={toggle} className="save">
            <Bookmark
              size={17}
              fill={saved ? "currentColor" : "none"}
            />

            {lang === "ar"
              ? saved
                ? "محفوظ"
                : "حفظ"
              : saved
              ? "Saved"
              : "Save"}
          </button>
        </div>
      </div>

      <img
        className="article-cover"
        src={article.image}
        alt=""
      />

      <div className="article-body">
        {body
          .split("\n")
          .filter(Boolean)
          .map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

        <blockquote>
          {lang === "ar"
            ? "كل فكرة تبدأ صغيرة، لكنها تكبر حين تجد من يصغي إليها."
            : "Every idea begins small, and grows when someone chooses to listen."}
        </blockquote>
      </div>
    </main>
  );
}

/* =========================
   ABOUT
========================= */

function About({ lang }) {
  return (
    <main className="about">
      <section className="about-hero">
        <span className="eyebrow">AWLIM / عَولِم</span>

        <h1>
          {lang === "ar" ? "من نحن" : "About AWLIM"}
        </h1>

        <p>
          {lang === "ar"
            ? "مساحة للأفكار التي تستحق أن تُروى، وللقصص التي لا ينبغي أن تمرّ دون أثر."
            : "A space for ideas worth telling and stories that should not pass without leaving a trace."}
        </p>
      </section>

      <section className="story">
        <div className="story-number">01</div>

        <div>
          <span className="eyebrow">
            {lang === "ar" ? "قصتنا" : "OUR STORY"}
          </span>

          <h2>
            {lang === "ar"
              ? "من هنا بدأت الحكاية"
              : "This is where the story began"}
          </h2>

          <p>
            {lang === "ar"
              ? "لم تبدأ عَولِم من فكرةٍ مكتملة، بل من رغبةٍ في أن يكون للأفكار مكانٌ تُروى فيه، وللأصوات مساحةٌ تُسمع، وللتجارب معنى يتجاوز لحظتها."
              : "AWLIM did not begin as a finished idea, but as a desire to give ideas a place to be told, voices a space to be heard, and experiences a meaning beyond their moment."}
          </p>

          <p>
            {lang === "ar"
              ? "التقينا، واختلفنا، وتعلمنا أن الاختلاف لا يبعدنا عن بعضنا؛ بل يوسّع الحكاية. ومن هذه المساحة وُلدت عَولِم."
              : "We met, differed, and learned that difference does not pull us apart; it expands the story. AWLIM was born from that space."}
          </p>
        </div>
      </section>

      <section className="founders">
        <span className="eyebrow">
          {lang === "ar" ? "ثلاثة أصوات" : "THREE VOICES"}
        </span>

        <div className="founder-grid">
          {["Lina", "Siba", "Walaa"].map((name, index) => (
            <div key={name} className="founder">
              <span>0{index + 1}</span>

              <h3>{name}</h3>

              <p>
                {lang === "ar"
                  ? "صوت مختلف، ونظرة تضيف شيئًا إلى الحكاية."
                  : "A different voice, adding another way of seeing."}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

/* =========================
   ISSUES
========================= */

function Issues({ lang }) {
  return (
    <main className="page">
      <div className="page-intro">
        <span className="eyebrow">
          {lang === "ar" ? "الأرشيف" : "ARCHIVE"}
        </span>

        <h1>{lang === "ar" ? "الأعداد" : "Issues"}</h1>

        <p>
          {lang === "ar"
            ? "كل عدد مساحة جديدة لفكرة تستحق أن تعاش وتُروى."
            : "Every issue is a new space for an idea worth living and telling."}
        </p>
      </div>

      <div className="issues-grid">
        <div className="issue-card">
          <div className="issue-cover">
            <span>٩٦</span>

            <strong>
              وطنٌ
              <br />
              يُكتب
              <br />
              في القلب
            </strong>

            <small>AWLIM</small>
          </div>

          <div>
            <span className="eyebrow">
              SPECIAL ISSUE
            </span>

            <h3>
              {lang === "ar"
                ? "اليوم الوطني السعودي"
                : "Saudi National Day"}
            </h3>

            <p>
              {lang === "ar"
                ? "إصدار خاص"
                : "Special edition"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================
   CATEGORIES PAGE
========================= */

function CategoriesPage({ lang, articles, onNav }) {
  return (
    <main className="page">
      <div className="page-intro">
        <span className="eyebrow">
          {lang === "ar" ? "استكشف" : "EXPLORE"}
        </span>

        <h1>
          {lang === "ar" ? "التصنيفات" : "Categories"}
        </h1>

        <p>
          {lang === "ar"
            ? "اكتشف المقالات حسب الموضوع."
            : "Explore stories by topic."}
        </p>
      </div>

      <div className="filters">
        {categories.map((category) => {
          const count = articles.filter(
            (article) => article.category === category
          ).length;

          return (
            <button
              key={category}
              onClick={() => onNav("category", category)}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>
    </main>
  );
}

/* =========================
   CATEGORY PAGE
========================= */

function CategoryPage({ lang, articles, category, onNav }) {
  const list = articles.filter(
    (article) => article.category === category
  );

  return (
    <main className="page">
      <div className="page-intro">
        <span className="eyebrow">CATEGORY</span>

        <h1>{category}</h1>
      </div>

      <div className="editorial-grid">
        {list.length > 0 ? (
          list.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              lang={lang}
              onClick={() => onNav("article", article.id)}
            />
          ))
        ) : (
          <p>
            {lang === "ar"
              ? "لا توجد مقالات هنا حتى الآن."
              : "No articles here yet."}
          </p>
        )}
      </div>
    </main>
  );
}

/* =========================
   ALUMNI
========================= */

function Alumni({ lang }) {
  const people = [
    {
      name: "Lina",
      text_ar: "صوت يضيف زاوية مختلفة إلى الحكاية.",
      text_en: "A voice adding another angle to the story.",
    },
    {
      name: "Siba",
      text_ar: "تجربة مختلفة ونظرة تستحق أن تُسمع.",
      text_en: "A different experience and a perspective worth hearing.",
    },
    {
      name: "Walaa",
      text_ar: "شغف بالتقنية والأفكار الجديدة.",
      text_en: "A passion for technology and new ideas.",
    },
  ];

  return (
    <main className="page">
      <div className="page-intro">
        <span className="eyebrow">AWLIM</span>

        <h1>
          {lang === "ar" ? "الخريجون" : "Alumni"}
        </h1>

        <p>
          {lang === "ar"
            ? "أصوات وتجارب من مرّت حكاياتهم عبر عَولِم."
            : "Voices and experiences that have passed through AWLIM."}
        </p>
      </div>

      <div className="founder-grid">
        {people.map((person, index) => (
          <div className="founder" key={person.name}>
            <span>0{index + 1}</span>

            <h3>{person.name}</h3>

            <p>
              {lang === "ar"
                ? person.text_ar
                : person.text_en}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

/* =========================
   SEARCH
========================= */

function SearchPage({ lang, articles, onNav }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return [];

    return articles.filter((article) => {
      return [
        article.title_ar,
        article.title_en,
        article.excerpt_ar,
        article.excerpt_en,
        article.body_ar,
        article.body_en,
        article.category,
        article.author,
      ]
        .filter(Boolean)
        .some((value) =>
          value.toLowerCase().includes(q)
        );
    });
  }, [query, articles]);

  return (
    <main className="page">
      <div className="page-intro">
        <span className="eyebrow">
          {lang === "ar" ? "بحث" : "SEARCH"}
        </span>

        <h1>
          {lang === "ar" ? "ابحث في عَولِم" : "Search AWLIM"}
        </h1>

        <p>
          {lang === "ar"
            ? "ابحث عن مقال، كاتب أو موضوع."
            : "Search for an article, author or topic."}
        </p>
      </div>

      <div className="admin-form">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={
            lang === "ar"
              ? "اكتب كلمة البحث..."
              : "Type your search..."
          }
        />
      </div>

      {query && (
        <div className="editorial-grid">
          {results.length > 0 ? (
            results.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                lang={lang}
                onClick={() =>
                  onNav("article", article.id)
                }
              />
            ))
          ) : (
            <p>
              {lang === "ar"
                ? "لم نجد نتائج."
                : "No results found."}
            </p>
          )}
        </div>
      )}
    </main>
  );
}

/* =========================
   ADMIN
========================= */

function Admin({
  lang,
  articles,
  setArticles,
  onLogout,
}) {
  const emptyForm = {
    title_ar: "",
    title_en: "",
    excerpt_ar: "",
    excerpt_en: "",
    body_ar: "",
    body_en: "",
    category: "Culture",
    author: "Walaa",
    image: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const isEditing = editingId !== null;

  const updateField = (field, value) => {
    setForm((old) => ({
      ...old,
      [field]: value,
    }));
  };

  const saveArticle = () => {
    if (!form.title_ar.trim()) {
      alert("Please enter the Arabic title.");
      return;
    }

    if (!form.title_en.trim()) {
      alert("Please enter the English title.");
      return;
    }

    if (isEditing) {
      setArticles((oldArticles) =>
        oldArticles.map((article) =>
          article.id === editingId
            ? {
                ...article,
                ...form,
              }
            : article
        )
      );

      setEditingId(null);
      setForm(emptyForm);
      return;
    }

    const newArticle = {
      ...form,
      id: Date.now(),
      date: new Date()
        .toISOString()
        .slice(0, 10),
      read: 5,
      featured: false,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    };

    setArticles((oldArticles) => [
      newArticle,
      ...oldArticles,
    ]);

    setForm(emptyForm);
  };

  const editArticle = (article) => {
    setEditingId(article.id);

    setForm({
      title_ar: article.title_ar || "",
      title_en: article.title_en || "",
      excerpt_ar: article.excerpt_ar || "",
      excerpt_en: article.excerpt_en || "",
      body_ar: article.body_ar || "",
      body_en: article.body_en || "",
      category: article.category || "Culture",
      author: article.author || "Walaa",
      image: article.image || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteArticle = (id) => {
    const confirmed = window.confirm(
      lang === "ar"
        ? "هل أنت متأكدة من حذف المقال؟"
        : "Are you sure you want to delete this article?"
    );

    if (!confirmed) return;

    setArticles((oldArticles) =>
      oldArticles.filter(
        (article) => article.id !== id
      )
    );

    if (editingId === id) {
      setEditingId(null);
      setForm(emptyForm);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <main className="admin">
      <aside>
        <Logo />

        <span className="eyebrow">OWNER</span>

        <h2>Admin</h2>

        <button className="admin-active">
          Articles
        </button>

        <button>Issues</button>
        <button>Categories</button>
        <button>Authors</button>
        <button>Alumni</button>
        <button>Users</button>
        <button>Settings</button>

        <button onClick={onLogout}>
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      <section className="admin-main">
        <div className="admin-head">
          <div>
            <span className="eyebrow">
              CONTENT MANAGEMENT
            </span>

            <h1>Articles</h1>
          </div>
        </div>

        <div className="admin-form">
          <h2>
            {isEditing ? "Edit article" : "Add article"}
          </h2>

          <div className="form-grid">
            <input
              placeholder="title_ar"
              value={form.title_ar}
              onChange={(e) =>
                updateField(
                  "title_ar",
                  e.target.value
                )
              }
            />

            <input
              placeholder="title_en"
              value={form.title_en}
              onChange={(e) =>
                updateField(
                  "title_en",
                  e.target.value
                )
              }
            />

            <input
              placeholder="excerpt_ar"
              value={form.excerpt_ar}
              onChange={(e) =>
                updateField(
                  "excerpt_ar",
                  e.target.value
                )
              }
            />

            <input
              placeholder="excerpt_en"
              value={form.excerpt_en}
              onChange={(e) =>
                updateField(
                  "excerpt_en",
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="body_ar"
              value={form.body_ar}
              onChange={(e) =>
                updateField(
                  "body_ar",
                  e.target.value
                )
              }
              rows="7"
            />

            <textarea
              placeholder="body_en"
              value={form.body_en}
              onChange={(e) =>
                updateField(
                  "body_en",
                  e.target.value
                )
              }
              rows="7"
            />

            <input
              placeholder="author"
              value={form.author}
              onChange={(e) =>
                updateField(
                  "author",
                  e.target.value
                )
              }
            />

            <input
              placeholder="image URL"
              value={form.image}
              onChange={(e) =>
                updateField(
                  "image",
                  e.target.value
                )
              }
            />
          </div>

          <select
            value={form.category}
            onChange={(e) =>
              updateField(
                "category",
                e.target.value
              )
            }
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

          <div className="admin-actions">
            <button
              className="button dark"
              onClick={saveArticle}
            >
              {isEditing ? (
                <>
                  <Pencil size={17} />
                  Save changes
                </>
              ) : (
                <>
                  <Plus size={17} />
                  Add article
                </>
              )}
            </button>

            {isEditing && (
              <button
                className="button"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="admin-list">
          {articles.map((article) => (
            <div
              className="admin-row"
              key={article.id}
            >
              <div>
                <strong>
                  {article.title_ar}
                </strong>

                <small>
                  {article.category} ·{" "}
                  {article.author}
                </small>
              </div>

              <div>
                <button
                  onClick={() =>
                    editArticle(article)
                  }
                  aria-label="Edit"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() =>
                    deleteArticle(article.id)
                  }
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

/* =========================
   LOGIN
========================= */

function Login({ onLogin, lang }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (event) => {
    event.preventDefault();

    if (
      email === "owner@awlim.test" &&
      password === "awlim-demo"
    ) {
      onLogin(true);
    } else {
      alert(
        lang === "ar"
          ? "بيانات الدخول غير صحيحة."
          : "Incorrect login details."
      );
    }
  };

  return (
    <main className="login">
      <form onSubmit={submit}>
        <span className="eyebrow">
          OWNER ACCESS
        </span>

        <h1>
          {lang === "ar"
            ? "دخول المالك"
            : "Owner Login"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button className="button dark">
          Sign in
        </button>

        <small>
          Demo: owner@awlim.test / awlim-demo
        </small>
      </form>
    </main>
  );
}

/* =========================
   APP
========================= */

export default function App() {
  const [lang, setLang] = useLang();

  const [route, setRoute] = useState("home");

  const [selected, setSelected] = useState(null);

  const [articles, setArticles] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "awlim-articles"
      );

      return saved
        ? JSON.parse(saved)
        : seedArticles;
    } catch {
      return seedArticles;
    }
  });

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "awlim-articles",
      JSON.stringify(articles)
    );
  }, [articles]);

  const nav = (routeName, id) => {
    setRoute(routeName);
    setSelected(id ?? null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  let content;

  if (route === "home") {
    content = (
      <Home
        lang={lang}
        articles={articles}
        onNav={nav}
      />
    );
  } else if (route === "articles") {
    content = (
      <Articles
        lang={lang}
        articles={articles}
        onNav={nav}
      />
    );
  } else if (route === "article") {
    const article =
      articles.find(
        (item) => item.id === selected
      ) || articles[0];

    content = article ? (
      <Article
        lang={lang}
        article={article}
      />
    ) : (
      <Home
        lang={lang}
        articles={articles}
        onNav={nav}
      />
    );
  } else if (route === "issues") {
    content = <Issues lang={lang} />;
  } else if (route === "categories") {
    content = (
      <CategoriesPage
        lang={lang}
        articles={articles}
        onNav={nav}
      />
    );
  } else if (route === "category") {
    content = (
      <CategoryPage
        lang={lang}
        articles={articles}
        category={selected}
        onNav={nav}
      />
    );
  } else if (route === "alumni") {
    content = <Alumni lang={lang} />;
  } else if (route === "about") {
    content = <About lang={lang} />;
  } else if (route === "search") {
    content = (
      <SearchPage
        lang={lang}
        articles={articles}
        onNav={nav}
      />
    );
  } else if (route === "admin") {
    content = admin ? (
      <Admin
        lang={lang}
        articles={articles}
        setArticles={setArticles}
        onLogout={() => setAdmin(false)}
      />
    ) : (
      <Login
        lang={lang}
        onLogin={() => setAdmin(true)}
      />
    );
  } else {
    content = (
      <Home
        lang={lang}
        articles={articles}
        onNav={nav}
      />
    );
  }

  return (
    <div className="app">
      {route !== "admin" && (
        <Header
          lang={lang}
          setLang={setLang}
          onNav={nav}
        />
      )}

      {content}

      {route !== "admin" && (
        <Footer
          lang={lang}
          onNav={nav}
        />
      )}

      {route !== "admin" && (
        <button
          className="owner-link"
          onClick={() => nav("admin")}
        >
          Owner
        </button>
      )}
    </div>
  );
}