/* ============================================================
   TAUTAS BETON - скрипт страницы.
   Плиты и заливка · перевод RU/KZ · меню · лента · появление ·
   ссылки WhatsApp с готовым текстом под каждый блок.
   Библиотек нет.
   ============================================================ */
(function(){
"use strict";
var WA = "77007919107";               /* номер клиента */
var RED = matchMedia("(prefers-reduced-motion: reduce)").matches;
var HAS_IO = typeof IntersectionObserver === "function";
var root = document.documentElement;

/* ---------------- КАЗАХСКИЙ СЛОВАРЬ ----------------
   Разметка русская. Словарь - в assets/lang/kk.js, грузится только по выбору KZ,
   чтобы проверка Google Ads видела русский сайт. Ключа нет → строка остаётся русской. */
var KZ = {};
var KK_V = (function(){ var c = document.currentScript; var m = c && c.src.match(/[?&]v=([^&]+)/); return m ? m[1] : "1"; })();
var kkState = 0, kkQueue = [];
function loadKK(cb){
  if (kkState === 2) return cb(true);
  kkQueue.push(cb);
  if (kkState === 1) return;
  kkState = 1;
  var s = document.createElement("script");
  s.src = "assets/lang/kk.js?v=" + KK_V;
  s.onload = function(){
    var K = window.SITE_KK || {};
    KZ = K.dict || {}; WA_TXT.kk = K.wa || WA_TXT.ru; TICK_KZ = K.tick || TICK;
    kkState = 2; kkQueue.splice(0).forEach(function(f){ f(true); });
  };
  s.onerror = function(){ kkState = 0; kkQueue.splice(0).forEach(function(f){ f(false); }); };
  document.head.appendChild(s);
}

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
}};

var TICK = ["Бетон М200","Бетон М250","Бетон М300","Бетон М350","Бетон М400","Пескобетон","Керамзитобетон","Кладочный раствор","Бетононасос","Доставка 24/7"];
var TICK_KZ = TICK;

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
  if (lang === "kk" && kkState !== 2) {
    loadKK(function(ok){ applyLang(ok ? "kk" : "ru"); });
    return;
  }
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

/* ---------------- КОНВЕРСИИ GOOGLE ADS ----------------
   Формы на сайте нет: целевых действий два - звонок и WhatsApp.
   Метки задаются в index.html (window.ADS). Пока их нет - блок молчит. */
function adsGoal(kind){
  var A = window.ADS;
  if (!A || !A.id || typeof window.gtag !== "function") return;
  var lbl = kind === "call" ? A.call : A.wa;
  if (!lbl) return;
  window.gtag("event", "conversion", {send_to: A.id + "/" + lbl, value: 1.0, currency: "USD"});
}
document.addEventListener("click", function(e){
  var a = e.target && e.target.closest ? e.target.closest("a") : null;
  if (!a) return;
  var h = a.getAttribute("href") || "";
  if (h.indexOf("tel:") === 0) adsGoal("call");
  else if (h.indexOf("wa.me") > -1) adsGoal("wa");
}, true);

/* ---------------- СТАРТ ---------------- */
snapshot();
initLang();
})();
