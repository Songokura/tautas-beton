/* ============================================================
   TAUTAS BETON - скрипт страницы.
   Плиты и заливка · перевод RU/KZ · меню · лента · появление ·
   ссылки WhatsApp с готовым текстом под каждый блок.
   Библиотек нет.
   ============================================================ */
(function(){
"use strict";
var WA = "70000000000";               /* плейсхолдер номера, заменяется одной командой */
var RED = matchMedia("(prefers-reduced-motion: reduce)").matches;
var HAS_IO = typeof IntersectionObserver === "function";
var root = document.documentElement;

/* ---------------- КАЗАХСКИЙ СЛОВАРЬ ----------------
   Разметка русская. Ключа нет → строка остаётся русской. */
var KZ = {
"m.title":"Алматыдағы бетон, өз зауытымыздан - Tautas Beton, жеткізу 24/7",
"m.desc":"Алматыдағы өз зауытымыздан тауарлық бетон М100-М400, құмбетон, ерітінділер және керамзитобетон. 100 км радиуста миксерлермен жеткізу, бетон сорғысы, тәулік бойы тиеп жөнелту. WhatsApp арқылы есеп 15 минутта.",
"m.ogt":"Алматыдағы бетон, өз зауытымыздан - Tautas Beton",
"m.ogd":"Тауарлық бетон М100-М400, Алматыдан 100 км радиуста миксерлермен жеткізу, бетон сорғысы, тәулік бойы тиеп жөнелту. WhatsApp арқылы есеп 15 минутта.",
"a.home":"Tautas Beton, басты бетке","a.nav":"Сайт бөлімдері","a.lang":"Сайт тілі","a.call":"Қоңырау шалу","a.menu":"Мәзір",
"nav.marki":"Маркалар","nav.rastvor":"Ерітінділер","nav.dostavka":"Жеткізу","nav.nasos":"Бетон сорғысы",
"nav.zavod":"Зауыт","nav.obekty":"Нысандар","nav.faq":"Сұрақтар","nav.kontakty":"Байланыс",
"b.call":"Қоңырау шалу","b.wa":"WhatsApp арқылы есептеу","b.wa2":"WhatsApp-қа жазу","b.calc":"Есептеу",
"b.price":"Бағасын білу","b.ds":"Жеткізуді есептеу","b.bn":"Сорғыға тапсырыс беру",

"h.kick":"Алматы · өз зауытымыз · 24/7","h.h1":"Бетон","h.sub":"Алматыдағы өз зауытымыздан",
"h.lead":"Алматыдан 100 км радиуста миксерлермен жеткізілетін М100-М400 бетон. Тәулік бойы тиеп жөнелту, есеп 15 минутта.",

"s.mk.k":"Бетон маркалары","s.mk.h":"Тауарлық бетон М100 - М400",
"s.mk.l":"Әр марка өз міндетіне арналған: іргетас астындағы дайындықтан жол плиталарына дейін. Әр партияға сапа паспорты.",
"s.mk.cap":"Зауыттан тиеп жөнелту · тәулік бойы","a.mk":"Автобетонараластырғыш науасы: нысанда тауарлық бетонды түсіру",
"mk.100":"Іргетас астындағы дайындық, төсем бетон, бордюрлер",
"mk.150":"Стяжка, аула жолдары, іргетас айналасының төсемі",
"mk.200":"Таспалы іргетастар, стяжкалар, баспалдақтар",
"mk.250":"Іргетастар, монолитті плиталар, ростверктер",
"mk.300":"Іргетастар, аражабындар, қабырғалар, бағаналар",
"mk.350":"Монолит, аражабындар, бассейндер, жол плиталары",
"mk.400":"Көпірлер, гидротехникалық құрылыстар, жүктемесі жоғары конструкциялар",
"s.mk.n":"Марканы білмейсіз бе? Не құятыныңызды жазыңыз, біз таңдап береміз.",

"s.sm.k":"Ерітінділер және жеңіл бетондар","s.sm.h":"Бетоннан бөлек",
"sm.r.h":"Қалау және сылақ ерітіндісі, құмбетон",
"sm.r.p":"Қалау мен сылаққа қажетті маркадағы ерітінді, стяжка мен жөндеуге арналған құмбетон. Бетонмен бірге немесе бөлек жөнелтеміз.",
"a.rastvor":"Блоктарды цемент ерітіндісіне қалау",
"sm.k.h":"Керамзитобетон және жеңіл бетондар",
"sm.k.p":"Стяжкаға, қабырғаға және аражабынды жылытуға арналған жеңіл қоспалар: конструкцияға түсетін жүктеме азырақ, бөлме жылырақ.",
"stub.k":"Өнім фотосы · керамзитобетон",

"s.ds.k":"Жеткізу","s.ds.h":"Алматыдан 100 км радиуста миксерлер",
"s.ds.p":"Автобетонараластырғыштарды нысанға келісілген уақытта жеткіземіз. Зауыттан тиеп жөнелту тәулік бойы, демалыссыз.",
"c.1":"Талғар","c.2":"Қаскелең","c.3":"Қонаев","c.4":"Есік","c.5":"Ұзынағаш","c.6":"және 100 км радиустағы басқа елді мекендер",

"s.bn.k":"Бетон сорғысы","s.bn.h":"Бетон сорғысымен беру",
"s.bn.p":"Миксер жете алмайтын жерлердегі аражабындар, плиталар мен іргетастар: қолмен тасымалдаусыз биіктікке және алаң ішіне беру.",

"s.zv.k":"Өндіріс","s.zv.h":"Өз зауытымыз бен зертханамыз",
"s.zv.p":"Рецептура бойынша мөлшерлеу, қозғалғыштық пен беріктікті бақылау, әр партияға сапа паспорты.",
"st.1":"жыл нарықта","st.2":"тиеп жөнелту","st.3":"бетон маркалары",

"s.kr.k":"Қалай жұмыс істейміз","s.kr.h":"Өтінімнен нысандағы миксерге дейін",
"st.1.h":"Өтінім","st.1.p":"WhatsApp-қа жазасыз немесе қоңырау шаласыз: марка, көлем, нысанның мекенжайы.",
"st.2.h":"Есептеу","st.2.p":"15 минутта жеткізумен бірге құнын есептеп, уақытын растаймыз.",
"st.3.h":"Тиеп жөнелту","st.3.p":"Зауыт партияны сіздің уақытыңызға, түнде де, дайындайды.",
"st.4.h":"Жеткізу","st.4.p":"Миксер нысанда мерзімінде, қажет болса - бетон сорғысы.",

"s.ob.k":"Нысандар","s.ob.h":"Біздің миксерлер баратын құрылыс алаңдары",
"ob.1":"Жеке үйдің іргетасы","ob.2":"Монолитті қаңқа","ob.3":"Бетон сорғысымен беру",
"ob.4":"Нысанға тиеп жөнелту","ob.5":"Құю алдындағы алаң","ob.6":"Нысандағы бетон сорғысы",
"ob.1a":"Жеке үйдің іргетасы: алаңдағы миксер мен экскаватор","ob.2a":"Қалып пен мұнаралы краны бар ғимараттың монолитті қаңқасы","ob.3a":"Бригада бетонды сорғы жеңі арқылы береді","ob.4a":"Құрылыс алаңына кіреберістегі автобетонараластырғыш","ob.5a":"Алаңдағы миксерлер, жоғарыдан көрініс","ob.6a":"Жиналған стреласы бар автобетон сорғысы",

"s.fq.k":"Сұрақтар","s.fq.h":"Тапсырыс алдында не сұрайды",
"q.1":"Бағаны қалай білуге болады?","q.1a":"WhatsApp-қа марканы, көлемді және нысанның мекенжайын жазыңыз - 15 минутта есептейміз.",
"q.2":"Түнде тиеп жөнелтесіздер ме?","q.2a":"Иә. Зауыт тәулік бойы, демалыссыз жұмыс істейді.",
"q.3":"Қайда жеткізесіздер?","q.3a":"Алматы және 100 км радиустағы облыс: Талғар, Қаскелең, Қонаев, Есік, Ұзынағаш және басқалары.",
"q.4":"Қай марканы таңдау керек?","q.4a":"Не құятыныңызды айтыңыз, жүктеме мен жағдайға қарай марканы таңдап береміз.",
"q.5":"Бетонға құжат бар ма?","q.5a":"Әр партияға сапа паспортын береміз.",
"q.6":"Бетон сорғысы керек пе?","q.6a":"Миксер құю орнына жете алмаса немесе биіктікке құю керек болса - иә, сорғымен береміз.",

"s.kt.k":"Байланыс","s.kt.h":"Бетон керек пе? Жазыңыз немесе қоңырау шалыңыз",
"s.kt.l":"Тәулік бойы жауап береміз. Жеткізумен бірге құнын есептеу - 15 минутта.",
"k.1":"География","k.1v":"Алматы және облыс, 100 км радиус",
"k.2":"Жұмыс кестесі","k.2v":"Тәулік бойы, демалыссыз",
"k.3":"Өнім","k.3v":"Бетон М100-М400, ерітінділер, құмбетон, керамзитобетон",
"f.sub":"Бетон зауыты · Алматы · тәулік бойы",
"f.copy":"© 2026 Tautas Beton. Тауарлық бетон өндіру және жеткізу."
};

/* готовые тексты WhatsApp под каждый блок */
var WA_TXT = {
ru:{
  hero:"Здравствуйте! Нужен бетон в Алматы. Подскажите стоимость с доставкой.",
  m100:"Здравствуйте! Интересует бетон М100 (B7.5). Объём и адрес объекта: ",
  m150:"Здравствуйте! Интересует бетон М150 (B12.5). Объём и адрес объекта: ",
  m200:"Здравствуйте! Интересует бетон М200 (B15). Объём и адрес объекта: ",
  m250:"Здравствуйте! Интересует бетон М250 (B20). Объём и адрес объекта: ",
  m300:"Здравствуйте! Интересует бетон М300 (B22.5). Объём и адрес объекта: ",
  m350:"Здравствуйте! Интересует бетон М350 (B25). Объём и адрес объекта: ",
  m400:"Здравствуйте! Интересует бетон М400 (B30). Объём и адрес объекта: ",
  rastvor:"Здравствуйте! Нужен раствор / пескобетон. Подскажите цену и условия доставки.",
  keramzit:"Здравствуйте! Интересует керамзитобетон. Подскажите цену и условия доставки.",
  dostavka:"Здравствуйте! Нужна доставка бетона миксером. Адрес объекта и объём: ",
  nasos:"Здравствуйте! Нужна подача бетона бетононасосом. Адрес объекта и объём: ",
  kontakty:"Здравствуйте! Пишу с сайта Tautas Beton. Нужен расчёт бетона с доставкой."
},
kk:{
  hero:"Сәлеметсіз бе! Алматыда бетон керек. Жеткізумен бірге бағасын айтыңызшы.",
  m100:"Сәлеметсіз бе! Бетон М100 (B7.5) қызықтырады. Көлемі мен нысанның мекенжайы: ",
  m150:"Сәлеметсіз бе! Бетон М150 (B12.5) қызықтырады. Көлемі мен нысанның мекенжайы: ",
  m200:"Сәлеметсіз бе! Бетон М200 (B15) қызықтырады. Көлемі мен нысанның мекенжайы: ",
  m250:"Сәлеметсіз бе! Бетон М250 (B20) қызықтырады. Көлемі мен нысанның мекенжайы: ",
  m300:"Сәлеметсіз бе! Бетон М300 (B22.5) қызықтырады. Көлемі мен нысанның мекенжайы: ",
  m350:"Сәлеметсіз бе! Бетон М350 (B25) қызықтырады. Көлемі мен нысанның мекенжайы: ",
  m400:"Сәлеметсіз бе! Бетон М400 (B30) қызықтырады. Көлемі мен нысанның мекенжайы: ",
  rastvor:"Сәлеметсіз бе! Ерітінді / құмбетон керек. Бағасы мен жеткізу шарттарын айтыңызшы.",
  keramzit:"Сәлеметсіз бе! Керамзитобетон қызықтырады. Бағасы мен жеткізу шарттарын айтыңызшы.",
  dostavka:"Сәлеметсіз бе! Бетонды миксермен жеткізу керек. Нысанның мекенжайы мен көлемі: ",
  nasos:"Сәлеметсіз бе! Бетонды сорғымен беру керек. Нысанның мекенжайы мен көлемі: ",
  kontakty:"Сәлеметсіз бе! Tautas Beton сайтынан жазып отырмын. Жеткізумен бірге бетон есебі керек."
}};

var TICK = ["Бетон М200","Бетон М250","Бетон М300","Бетон М350","Бетон М400","Пескобетон","Керамзитобетон","Кладочный раствор","Бетононасос","Доставка 24/7"];
var TICK_KZ = ["Бетон М200","Бетон М250","Бетон М300","Бетон М350","Бетон М400","Құмбетон","Керамзитобетон","Қалау ерітіндісі","Бетон сорғысы","Жеткізу 24/7"];

/* ---------------- ПЕРЕВОД ---------------- */
var RU = {};
function snapshot(){
  document.querySelectorAll("[data-i]").forEach(function(el){ if (RU[el.dataset.i] === undefined) RU[el.dataset.i] = el.innerHTML; });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){ RU[el.dataset.iAlt] = el.alt; });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){ RU[el.dataset.iAria] = el.getAttribute("aria-label"); });
  document.querySelectorAll("[data-i-c]").forEach(function(el){ RU[el.dataset.iC] = el.getAttribute("content"); });
}
function pick(k, kk){ return (kk && KZ[k] !== undefined) ? KZ[k] : RU[k]; }
function curLang(){ return root.lang === "kk" ? "kk" : "ru"; }

function setWaLinks(){
  var L = curLang();
  document.querySelectorAll("[data-wa]").forEach(function(a){
    var t = WA_TXT[L][a.dataset.wa] || WA_TXT[L].hero;
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
    a.target = "_blank"; a.rel = "noopener";
  });
}

function applyLang(lang){
  var kk = lang === "kk";
  root.setAttribute("lang", kk ? "kk" : "ru");
  document.querySelectorAll("[data-i]").forEach(function(el){
    var v = pick(el.dataset.i, kk); if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){
    var v = pick(el.dataset.iAlt, kk); if (v !== undefined) el.alt = v;
  });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){
    var v = pick(el.dataset.iAria, kk); if (v !== undefined) el.setAttribute("aria-label", v);
  });
  document.querySelectorAll("[data-i-c]").forEach(function(el){
    var v = pick(el.dataset.iC, kk); if (v !== undefined) el.setAttribute("content", v);
  });
  var og = document.querySelector('meta[property="og:locale"]');
  if (og) og.setAttribute("content", kk ? "kk_KZ" : "ru_RU");
  document.querySelectorAll(".lang button").forEach(function(b){
    var on = b.getAttribute("data-lang") === (kk ? "kk" : "ru");
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  try { localStorage.setItem("tb-lang", kk ? "kk" : "ru"); } catch(e){}
  document.querySelectorAll(".h1 b").forEach(function(b){ b.setAttribute("data-t", b.textContent); });
  setWaLinks();
  fillTicker();
  requestAnimationFrame(fitText);
}
function initLang(){
  var url = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("tb-lang"); } catch(e){}
  var lang = (url === "kk" || url === "ru") ? url : (saved === "kk" ? "kk" : "ru");
  applyLang(lang);
}
document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){ applyLang(b.getAttribute("data-lang")); });
});

/* дисплейные строки: казахский длиннее - ужимаем, пока не влезет */
function fitText(){
  document.querySelectorAll(".h1 b, .h1 .sub, .kont-phone").forEach(function(el){
    el.style.fontSize = "";
    var box = el.parentElement.clientWidth;
    if (!box) return;
    var size = parseFloat(getComputedStyle(el).fontSize), base = size;
    while (el.scrollWidth > box + 1 && size > base * 0.6) {
      size *= 0.95;
      el.style.fontSize = size + "px";
    }
  });
}

/* ---------------- БЕГУЩАЯ ЛЕНТА ----------------
   Копий столько, чтобы дорожка была шире двух экранов;
   шаг цикла - ширина одной копии (в --tkw). */
function fillTicker(){
  var el = document.getElementById("ticker"); if (!el) return;
  var list = curLang() === "kk" ? TICK_KZ : TICK;
  var one = list.map(function(t){ return "<b>" + t + "</b>"; }).join("");
  el.innerHTML = one;
  var w = el.scrollWidth || 1000;
  var need = Math.max(2, Math.ceil((innerWidth * 2) / w) + 1);
  var html = "";
  for (var i = 0; i < need; i++) html += one;
  el.innerHTML = html;
  el.style.setProperty("--tkw", w + "px");
}
var tkTimer;
addEventListener("resize", function(){ clearTimeout(tkTimer); tkTimer = setTimeout(function(){ fillTicker(); fitText(); }, 200); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ fillTicker(); fitText(); });

/* ---------------- МЕНЮ ---------------- */
var burger = document.getElementById("burger");
var mnav = document.getElementById("mnav");
function closeMenu(){
  document.body.classList.remove("menu-open");
  if (burger) burger.setAttribute("aria-expanded", "false");
}
if (burger) burger.addEventListener("click", function(){
  var open = document.body.classList.toggle("menu-open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});
if (mnav) mnav.addEventListener("click", function(e){ if (e.target.closest("a")) closeMenu(); });
addEventListener("keydown", function(e){ if (e.key === "Escape") closeMenu(); });

/* ---------------- ЯКОРЯ ---------------- */
var HH = function(){ return parseFloat(getComputedStyle(root).getPropertyValue("--hh")) || 64; };
document.addEventListener("click", function(e){
  var a = e.target.closest('a[href^="#"]'); if (!a) return;
  var id = a.getAttribute("href").slice(1); if (!id) return;
  var t = document.getElementById(id); if (!t) return;
  e.preventDefault();
  closeMenu();
  var top = t.getBoundingClientRect().top + scrollY - (t.classList.contains("pw") ? 0 : HH());
  scrollTo({ top: Math.max(0, top), behavior: RED ? "auto" : "smooth" });
  try { history.pushState(null, "", "#" + id); } catch(err){}
});

/* ---------------- ПЛИТЫ И ЗАЛИВКА ----------------
   Один слушатель scroll через rAF. На каждую обёртку .pw пишем
   --enter / --exit / --stay; для фото-плит ещё --open (фронт заливки).
   Всё остальное делает CSS через calc. */
var pws = [].slice.call(document.querySelectorAll(".pw"));
var bar = document.getElementById("bar");
var kont = document.getElementById("kontakty");
function clamp(v){ return v < 0 ? 0 : (v > 1 ? 1 : v); }
function easeOut(t){ return 1 - Math.pow(1 - t, 2.4); }
function update(){
  var H = innerHeight || root.clientHeight;
  pws.forEach(function(pw){
    var r = pw.getBoundingClientRect();
    var enter = clamp(1 - r.top / H);
    var exit  = clamp(1 - r.bottom / H);
    var stay  = r.height > H + 1 ? clamp(-r.top / (r.height - H)) : enter;
    pw.style.setProperty("--enter", enter.toFixed(3));
    pw.style.setProperty("--exit",  exit.toFixed(3));
    pw.style.setProperty("--stay",  stay.toFixed(3));
    pw.classList.toggle("gone", exit >= 1);
    pw.classList.toggle("on", enter > 0.62);
    if (pw.querySelector(".ph-plate")) {
      pw.style.setProperty("--open", easeOut(clamp((enter - 0.18) / 0.64)).toFixed(3));
    }
  });
  /* липкая панель: после 55 % первого экрана, прячется на контактах */
  if (bar) {
    var onKont = kont && kont.getBoundingClientRect().top < H * 0.6;
    bar.classList.toggle("show", scrollY > H * 0.55 && !onKont);
  }
}
if (RED) {
  root.classList.add("no-plate");
} else {
  var tick = false;
  addEventListener("scroll", function(){
    if (tick) return; tick = true;
    requestAnimationFrame(function(){ tick = false; update(); });
  }, {passive:true});
  addEventListener("resize", update);
  addEventListener("load", update);
  update();
}
window.plateSync = update;

/* интро героя пропускаем, если пришли по якорю или страница уже прокручена */
if (location.hash || scrollY > 80) root.classList.add("no-intro");
addEventListener("hashchange", function(){ root.classList.add("no-intro"); });

/* ---------------- ПОЯВЛЕНИЕ ---------------- */
if (HAS_IO) {
  if (!RED) root.classList.add("js");
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:.12, rootMargin:"0px 0px -6% 0px"});
  document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });
  setTimeout(function(){ document.querySelectorAll(".rv:not(.in)").forEach(function(el){
    if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in");
  }); }, 1500);
} else {
  document.querySelectorAll(".rv").forEach(function(el){ el.classList.add("in"); });
}

/* ---------------- ЛЕНТА ОБЪЕКТОВ: точки ---------------- */
(function(){
  var strip = document.getElementById("strip"), dots = document.getElementById("dots");
  if (!strip || !dots) return;
  var items = strip.querySelectorAll(".ob");
  dots.innerHTML = Array.prototype.map.call(items, function(){ return "<i></i>"; }).join("");
  var ds = dots.querySelectorAll("i");
  function mark(){
    var x = strip.scrollLeft + 10, idx = 0;
    items.forEach(function(it, i){ if (it.offsetLeft - strip.offsetLeft <= x + it.offsetWidth / 2) idx = i; });
    ds.forEach(function(d, i){ d.classList.toggle("on", i === idx); });
  }
  strip.addEventListener("scroll", mark, {passive:true});
  mark();
})();

/* ---------------- СТАРТ ---------------- */
snapshot();
initLang();
})();
