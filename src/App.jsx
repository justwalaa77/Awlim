import React, { useEffect, useMemo, useState } from "react";
import { Search, Menu, X, ArrowUpLeft, ArrowUpRight, Bookmark, Plus, Trash2, Pencil, LogOut, Globe2 } from "lucide-react";

const seedArticles = [
  {
    id: 1,
    title_ar: "ما وراء الشاشة: كيف تغيّر التقنية تفاصيل حياتنا؟",
    title_en: "Beyond the Screen: How Technology Changes Everyday Life",
    excerpt_ar: "ليست التقنية أجهزةً حولنا فحسب؛ إنها تفاصيل صغيرة تعيد تشكيل الطريقة التي نعيش ونفكر ونتواصل بها.",
    excerpt_en: "Technology is not only the devices around us; it is the small details reshaping how we live, think and connect.",
    category: "Technology",
    author: "Walaa",
    date: "2026-09-20",
    read: 6,
    featured: true,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: 2,
    title_ar: "حين تصبح الحكاية ذاكرة",
    title_en: "When a Story Becomes Memory",
    excerpt_ar: "بعض الحكايات لا تنتهي حين تُروى؛ تبدأ هناك، في ذاكرة من سمعها.",
    excerpt_en: "Some stories do not end when they are told; they begin in the memory of the person who heard them.",
    category: "Culture",
    author: "Siba",
    date: "2026-09-16",
    read: 4,
    featured: false,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title_ar: "الأفكار التي تستحق مساحة",
    title_en: "Ideas That Deserve Space",
    excerpt_ar: "في كل مكان فكرة صغيرة تنتظر من يمنحها وقتًا ومساحة وصوتًا.",
    excerpt_en: "Everywhere, a small idea waits for someone to give it time, space and a voice.",
    category: "Ideas",
    author: "Lina",
    date: "2026-09-12",
    read: 5,
    featured: false,
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
  }
];

const categories = ["Culture","Technology","AI","Science","Design","Society","Business","Arts","Travel","Ideas","Opinion","Creativity","Lifestyle","Youth","Community"];

function useLang() {
  const [lang, setLang] = useState(localStorage.getItem("awlim-lang") || "ar");
  useEffect(() => {
    localStorage.setItem("awlim-lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  return [lang, setLang];
}

function Logo() {
  return <div className="brand"><div className="brand-name">عَولِم</div><div className="brand-en">AWLIM</div></div>;
}

function Header({lang,setLang,onNav}) {
  const [open,setOpen] = useState(false);
  const nav = lang === "ar"
    ? [["home","الرئيسية"],["articles","المقالات"],["issues","الأعداد"],["categories","التصنيفات"],["alumni","الخريجون"],["about","من نحن"]]
    : [["home","Home"],["articles","Articles"],["issues","Issues"],["categories","Categories"],["alumni","Alumni"],["about","About"]];
  return <header className="header">
    <button className="mobile-menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    <Logo/>
    <nav className={open?"nav open":"nav"}>{nav.map(([id,label])=><button key={id} onClick={()=>{onNav(id);setOpen(false)}}>{label}</button>)}</nav>
    <div className="header-actions">
      <button className="lang" onClick={()=>setLang(lang==="ar"?"en":"ar")}><Globe2 size={16}/>{lang==="ar"?"EN":"العربية"}</button>
      <button className="search-button" onClick={()=>onNav("search")}><Search size={19}/></button>
    </div>
  </header>
}

function Footer({lang,onNav}) {
  const links = lang==="ar"
    ? [["home","الرئيسية"],["articles","المقالات"],["issues","الأعداد"],["categories","التصنيفات"],["alumni","الخريجون"],["about","من نحن"]]
    : [["home","Home"],["articles","Articles"],["issues","Issues"],["categories","Categories"],["alumni","Alumni"],["about","About"]];
  return <footer className="footer">
    <div className="footer-statement">
      <span className="eyebrow">AWLIM / عَولِم</span>
      <h2>{lang==="ar" ? "نترك أثرًا يشبه الحكايات التي نحبها؛ يُروى، ويُكتشف، ويبقى." : "We leave traces like the stories we love — told, discovered, and remembered."}</h2>
      <p>{lang==="ar" ? "مساحة للأفكار التي تستحق أن تُروى." : "A space for ideas worth telling."}</p>
    </div>
    <div className="footer-row">
      <Logo/>
      <div className="footer-links">{links.map(([id,l])=><button key={id} onClick={()=>onNav(id)}>{l}</button>)}</div>
      <button className="lang footer-lang" onClick={()=>{}}>{lang==="ar"?"العربية | English":"English | العربية"}</button>
    </div>
    <div className="copyright">© 2026 AWLIM — Independent editorial magazine</div>
  </footer>
}

function Home({lang,articles,onNav}) {
  const featured=articles.find(a=>a.featured)||articles[0];
  return <main>
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">{lang==="ar"?"مجلة مستقلة من المنطقة":"AN INDEPENDENT MAGAZINE FROM THE REGION"}</div>
        <h1>{lang==="ar"?"الأفكار لا تحتاج ضجيجًا، تحتاج مساحة.":"Ideas don't need noise. They need space."}</h1>
        <p>{lang==="ar"?"عَولِم مساحة تُروى فيها القصص، وتلتقي فيها الثقافة بالأفكار والإنسان بالتغيير.":"AWLIM is a space where stories meet culture, ideas and the people shaping change."}</p>
        <button className="text-link" onClick={()=>onNav("articles")}>{lang==="ar"?"اكتشف المقالات":"Explore stories"} {lang==="ar"?<ArrowUpLeft size={18}/>:<ArrowUpRight size={18}/>}</button>
      </div>
      <div className="hero-image"><img src={featured.image}/><div className="hero-caption"><span>{featured.category}</span><strong>{lang==="ar"?featured.title_ar:featured.title_en}</strong></div></div>
    </section>

    <section className="section">
      <div className="section-head"><div><span className="eyebrow">{lang==="ar"?"مختارات":"SELECTED STORIES"}</span><h2>{lang==="ar"?"أبرز المقالات":"Featured Articles"}</h2></div><button className="text-link" onClick={()=>onNav("articles")}>{lang==="ar"?"كل المقالات":"All articles"} →</button></div>
      <div className="editorial-grid">{articles.map(a=><ArticleCard key={a.id} article={a} lang={lang} onClick={()=>onNav("article",a.id)}/>)}</div>
    </section>

    <section className="issue-banner">
      <div><span className="eyebrow">{lang==="ar"?"إصدار خاص":"SPECIAL ISSUE"}</span><h2>{lang==="ar"?"وطنٌ يُكتب في القلب":"A Homeland Written in the Heart"}</h2><p>{lang==="ar"?"العدد الخاص باليوم الوطني السعودي — ٩٦":"AWLIM National Day Special — 96"}</p></div>
      <button className="button dark" onClick={()=>onNav("issues")}>{lang==="ar"?"استكشف العدد":"Explore issue"}</button>
    </section>
  </main>
}

function ArticleCard({article,lang,onClick}) {
  return <article className="card" onClick={onClick}>
    <div className="card-image"><img src={article.image}/><span className="card-category">{article.category}</span></div>
    <div className="card-meta">{article.author} · {article.read} min</div>
    <h3>{lang==="ar"?article.title_ar:article.title_en}</h3>
    <p>{lang==="ar"?article.excerpt_ar:article.excerpt_en}</p>
  </article>
}

function Articles({lang,articles,onNav}) {
  const [filter,setFilter]=useState("All");
  const list=filter==="All"?articles:articles.filter(a=>a.category===filter);
  return <main className="page">
    <div className="page-intro"><span className="eyebrow">{lang==="ar"?"الأرشيف":"ARCHIVE"}</span><h1>{lang==="ar"?"المقالات":"Articles"}</h1><p>{lang==="ar"?"أفكار وقصص وأصوات من المساحات التي تستحق أن تُرى.":"Ideas, stories and voices from spaces worth noticing."}</p></div>
    <div className="filters"><button className={filter==="All"?"active":""} onClick={()=>setFilter("All")}>{lang==="ar"?"الكل":"All"}</button>{categories.map(c=><button className={filter===c?"active":""} key={c} onClick={()=>setFilter(c)}>{c}</button>)}</div>
    <div className="editorial-grid">{list.map(a=><ArticleCard key={a.id} article={a} lang={lang} onClick={()=>onNav("article",a.id)}/>)}</div>
  </main>
}

function Article({lang,article,onNav}) {
  const [saved,setSaved]=useState(()=>JSON.parse(localStorage.getItem("awlim-saved")||"[]").includes(article.id));
  const toggle=()=>{const old=JSON.parse(localStorage.getItem("awlim-saved")||"[]");const next=saved?old.filter(x=>x!==article.id):[...old,article.id];localStorage.setItem("awlim-saved",JSON.stringify(next));setSaved(!saved)};
  return <main className="article-page">
    <div className="article-head"><span className="eyebrow">{article.category}</span><h1>{lang==="ar"?article.title_ar:article.title_en}</h1><p>{lang==="ar"?article.excerpt_ar:article.excerpt_en}</p><div className="article-meta">{article.author} · {article.date} · {article.read} min <button onClick={toggle} className="save"><Bookmark size={17} fill={saved?"currentColor":"none"}/>{lang==="ar"?(saved?"محفوظ":"حفظ"):saved?"Saved":"Save"}</button></div></div>
    <img className="article-cover" src={article.image}/>
    <div className="article-body">
      <p>{lang==="ar"?"ليست الحكاية عن التقنية وحدها، بل عن التفاصيل التي تتسلل إلى يومنا حتى تصبح جزءًا من الطريقة التي نرى بها العالم. وبين شاشة وأخرى، تتغير عاداتنا وأسئلتنا وعلاقاتنا بالأشياء من حولنا.":"The story is not only about technology, but about the small details that quietly become part of how we see the world."}</p>
      <p>{lang==="ar"?"في عَولِم نبحث عن هذه التفاصيل؛ عن السؤال الذي يستحق أن نتوقف عنده، وعن التجربة التي تحمل أكثر مما يبدو في ظاهرها.":"At AWLIM, we look for these details: questions worth pausing over and experiences that carry more than they first reveal."}</p>
      <blockquote>{lang==="ar"?"كل فكرة تبدأ صغيرة، لكنها تكبر حين تجد من يصغي إليها.":"Every idea begins small, and grows when someone chooses to listen."}</blockquote>
      <p>{lang==="ar"?"هذه المساحة مفتوحة للحكايات التي لا تكتفي بأن تُخبرنا بما حدث، بل تجعلنا نرى ما حولنا بطريقة مختلفة.":"This space is for stories that do more than tell us what happened; they help us see what surrounds us differently."}</p>
    </div>
  </main>
}

function About({lang}) {
  return <main className="about">
    <section className="about-hero"><span className="eyebrow">AWLIM / عَولِم</span><h1>{lang==="ar"?"من نحن":"About AWLIM"}</h1><p>{lang==="ar"?"مساحة للأفكار التي تستحق أن تُروى، وللقصص التي لا ينبغي أن تمرّ دون أثر.":"A space for ideas worth telling and stories that should not pass without leaving a trace."}</p></section>
    <section className="story"><div className="story-number">01</div><div><span className="eyebrow">{lang==="ar"?"قصتنا":"OUR STORY"}</span><h2>{lang==="ar"?"من هنا بدأت الحكاية":"This is where the story began"}</h2><p>{lang==="ar"?"لم تبدأ عَولِم من فكرةٍ مكتملة، بل من رغبةٍ في أن يكون للأفكار مكانٌ تُروى فيه، وللأصوات مساحةٌ تُسمع، وللتجارب معنى يتجاوز لحظتها.":"AWLIM did not begin as a finished idea, but as a desire to give ideas a place to be told, voices a space to be heard, and experiences a meaning beyond their moment."}</p><p>{lang==="ar"?"التقينا، واختلفنا، وتعلمنا أن الاختلاف لا يبعدنا عن بعضنا؛ بل يوسّع الحكاية. ومن هذه المساحة وُلدت عَولِم.":"We met, differed, and learned that difference does not pull us apart; it expands the story. AWLIM was born from that space."}</p></div></section>
    <section className="founders"><span className="eyebrow">{lang==="ar"?"ثلاثة أصوات":"THREE VOICES"}</span><div className="founder-grid">{["Lina","Siba","Walaa"].map((n,i)=><div key={n} className="founder"><span>0{i+1}</span><h3>{n}</h3><p>{lang==="ar"?"صوت مختلف، ونظرة تضيف شيئًا إلى الحكاية.":"A different voice, adding another way of seeing."}</p></div>)}</div></section>
  </main>
}

function Issues({lang}) {
  return <main className="page"><div className="page-intro"><span className="eyebrow">{lang==="ar"?"الأرشيف":"ARCHIVE"}</span><h1>{lang==="ar"?"الأعداد":"Issues"}</h1><p>{lang==="ar"?"كل عدد مساحة جديدة لفكرة تستحق أن تعاش وتُروى.":"Every issue is a new space for an idea worth living and telling."}</p></div><div className="issues-grid"><div className="issue-card"><div className="issue-cover"><span>٩٦</span><strong>وطنٌ<br/>يُكتب<br/>في القلب</strong><small>AWLIM</small></div><div><span className="eyebrow">SPECIAL ISSUE</span><h3>{lang==="ar"?"اليوم الوطني السعودي":"Saudi National Day"}</h3><p>{lang==="ar"?"إصدار خاص":"Special edition"}</p></div></div></div></main>
}

function Admin({lang,articles,setArticles,onLogout}) {
  const [form,setForm]=useState({title_ar:"",title_en:"",excerpt_ar:"",excerpt_en:"",category:"Culture",author:"Walaa",image:""});
  const add=()=>{if(!form.title_ar)return;setArticles(a=>[...a,{...form,id:Date.now(),date:new Date().toISOString().slice(0,10),read:5,featured:false,image:form.image||"https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"}]);setForm({title_ar:"",title_en:"",excerpt_ar:"",excerpt_en:"",category:"Culture",author:"Walaa",image:""});};
  return <main className="admin"><aside><Logo/><span className="eyebrow">OWNER</span><h2>Admin</h2><button className="admin-active">Articles</button><button>Issues</button><button>Categories</button><button>Authors</button><button>Alumni</button><button>Users</button><button>Settings</button><button onClick={onLogout}><LogOut size={16}/> Logout</button></aside><section className="admin-main"><div className="admin-head"><div><span className="eyebrow">CONTENT MANAGEMENT</span><h1>Articles</h1></div></div><div className="admin-form"><h2>Add article</h2><div className="form-grid">{["title_ar","title_en","excerpt_ar","excerpt_en","image"].map(k=><input key={k} placeholder={k} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/>)}</div><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{categories.map(c=><option key={c}>{c}</option>)}</select><button className="button dark" onClick={add}><Plus size={17}/> Add article</button></div><div className="admin-list">{articles.map(a=><div className="admin-row" key={a.id}><div><strong>{a.title_ar}</strong><small>{a.category} · {a.author}</small></div><div><button><Pencil size={16}/></button><button onClick={()=>setArticles(xs=>xs.filter(x=>x.id!==a.id))}><Trash2 size={16}/></button></div></div>)}</div></section></main>
}

function Login({onLogin,lang}) {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const submit=e=>{e.preventDefault(); if(email==="owner@awlim.test"&&password==="awlim-demo"){onLogin(true)}};
  return <main className="login"><form onSubmit={submit}><span className="eyebrow">OWNER ACCESS</span><h1>{lang==="ar"?"دخول المالك":"Owner Login"}</h1><input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/><button className="button dark">Sign in</button><small>Demo: owner@awlim.test / awlim-demo</small></form></main>
}

export default function App(){
  const [lang,setLang]=useLang();
  const [route,setRoute]=useState("home");
  const [selected,setSelected]=useState(null);
  const [articles,setArticles]=useState(()=>JSON.parse(localStorage.getItem("awlim-articles")||"null")||seedArticles);
  const [admin,setAdmin]=useState(false);
  useEffect(()=>localStorage.setItem("awlim-articles",JSON.stringify(articles)),[articles]);
  const nav=(r,id)=>{setRoute(r);setSelected(id??null);window.scrollTo({top:0,behavior:"smooth"})};
  const content=route==="home"?<Home lang={lang} articles={articles} onNav={nav}/>:
    route==="articles"?<Articles lang={lang} articles={articles} onNav={nav}/>:
    route==="article"?<Article lang={lang} article={articles.find(a=>a.id===selected)||articles[0]} onNav={nav}/>:
    route==="issues"?<Issues lang={lang}/>:
    route==="about"?<About lang={lang}/>:
    route==="admin"?admin?<Admin lang={lang} articles={articles} setArticles={setArticles} onLogout={()=>setAdmin(false)}/>:<Login lang={lang} onLogin={()=>setAdmin(true)}/>:
    <Home lang={lang} articles={articles} onNav={nav}/>;
  return <div className="app">{route!=="admin"&&<Header lang={lang} setLang={setLang} onNav={nav}/>} {content} {route!=="admin"&&<Footer lang={lang} onNav={nav}/>} {route!=="admin"&&<button className="owner-link" onClick={()=>nav("admin")}>Owner</button>}</div>
}