/* IronPulse Fitness — shared behaviour. Front-end only, no backend. */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var fine = window.matchMedia("(pointer:fine)").matches;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ref = function (p) { return p + "-" + Math.random().toString(36).slice(2, 6).toUpperCase(); };
  var inr = function (n) { return "₹" + n.toLocaleString("en-IN"); };

  /* ---------- data (v1 content, reused) ---------- */
  var PROGRAMS = [
    { name: "Strength 101", img: "assets/img/program-strength.jpg", alt: "Member learning the barbell back squat with a coach nearby", weeks: "12 weeks", level: 2, kcal: 320, coach: "Arjun Mehta", sched: "Mon · Wed · Fri — 5:30 AM & 7:00 PM", desc: "Barbell basics with bulletproof form. Squat, bench, deadlift and press, progressed kilo by kilo on a written plan.", tag: "Beginner Friendly" },
    { name: "Fat Loss", img: "assets/img/program-fatloss.jpg", alt: "Fat loss class working battle ropes in a group session", weeks: "12 weeks", level: 4, kcal: 550, coach: "Meera Joshi", sched: "Tue · Thu · Sat — 6:30 AM & 6:00 PM", desc: "Strength circuits plus conditioning, with a diet plan built around your own kitchen. Average member loses 8 kg.", tag: "Most Joined" },
    { name: "Powerlifting", img: "assets/img/program-powerlifting.jpg", alt: "Powerlifter setting up for a heavy deadlift on the platform", weeks: "16 weeks", level: 5, kcal: 480, coach: "Vikram Rathore", sched: "Mon – Sat — 9:00 AM & 8:00 PM platform hours", desc: "Competition coaching for squat, bench and deadlift. Video analysis of every top set and a peaking plan for meet day.", tag: "Competition" },
    { name: "HIIT", img: "assets/img/program-hiit.webp", alt: "Athlete mid kettlebell swing on the functional turf", weeks: "8 weeks", level: 5, kcal: 600, coach: "Meera Joshi", sched: "Daily — 6:30 AM, 12:30 PM & 5:00 PM", desc: "45 minutes, zero hiding. Sleds, ropes, boxes and bells in rotating stations that torch up to 600 kcal a session.", tag: "High Burn" },
    { name: "Yoga Mobility", img: "assets/img/program-yoga.jpg", alt: "Mobility class in a guided group stretch session", weeks: "Ongoing", level: 1, kcal: 180, coach: "Meera Joshi", sched: "Daily — 7:30 AM · Sun 7:30 AM", desc: "Hips, shoulders, spine. The session that keeps lifters lifting — deep mobility work built for desk bodies.", tag: "Recovery" },
    { name: "Boxing Conditioning", img: "assets/img/program-boxing.webp", alt: "Boxer striking a heavy bag during conditioning training", weeks: "12 weeks", level: 4, kcal: 580, coach: "Kabir Ansari", sched: "Tue · Thu · Sat — 6:00 PM · Sat 10:30 AM", desc: "Footwork, bag rounds and fight conditioning. Wrap up, glove up, and leave with stamina you can feel in week two.", tag: "Fight Fit" }
  ];
  var INTLBL = { 1: "Gentle", 2: "Moderate", 3: "Hard", 4: "Very Hard", 5: "Brutal" };
  var TRAINERS = [
    { name: "Arjun Mehta", role: "Head Coach · Strength", img: "assets/img/coach-arjun.webp", alt: "Portrait of head strength coach Arjun Mehta with arms crossed in the gym", yrs: "9 yrs", clients: "300+", extra: "40+ first 100 kg squats", certs: ["NASM-CPT", "K11 Strength Coach"], bio: "Arjun built IronPulse's strength system. He programs in 4-week blocks, films your main lifts weekly, and has taken over 300 members from empty bar to real weight.", result: "Best client result: +55 kg on a squat in 20 weeks." },
    { name: "Meera Joshi", role: "Fat Loss & HIIT", img: "assets/img/coach-meera.webp", alt: "Portrait of coach Meera Joshi holding a kettlebell on her shoulder", yrs: "7 yrs", clients: "450+", extra: "−8 kg avg. in 12 wks", certs: ["ISSA-CPT", "Precision Nutrition L1"], bio: "Meera runs fat loss like a system: training, food photos, weekly weigh-ins and honest conversations. Her 12-week cohorts finish what other gyms let slide.", result: "Best client result: 18 kg lost in 16 weeks, kept off for a year." },
    { name: "Vikram Rathore", role: "Powerlifting", img: "assets/img/coach-vikram.webp", alt: "Portrait of powerlifting coach Vikram Rathore beside a loaded barbell", yrs: "14 yrs", clients: "180+", extra: "640 kg total", certs: ["IPF State Coach", "ISSA Strength"], bio: "A 640 kg total and 14 years under the bar. Vikram coaches technique like a craft — every top set filmed, every kilo earned, three state champions produced.", result: "Best client result: 300 kg → 385 kg total in 24 weeks." },
    { name: "Kabir Ansari", role: "Boxing Conditioning", img: "assets/img/coach-kabir.webp", alt: "Portrait of boxing coach Kabir Ansari with hand wraps in the boxing corner", yrs: "8 yrs", clients: "200+", extra: "24–3 amateur record", certs: ["State-Level Boxer", "Boxing India L1"], bio: "Former state-level boxer with a 24–3 amateur record. Kabir's classes mix real boxing skill with brutal conditioning — and nobody checks their phone in his rounds.", result: "Best client result: first 10-round session in 12 weeks." }
  ];
  var PLANS = [
    { id: "monthly", name: "Monthly", price: 2500, per: "/month", save: "", feats: ["Full floor + all classes", "Sauna & recovery room", "1 body-composition test / quarter", "Locker access"] },
    { id: "quarterly", name: "Quarterly", price: 6500, per: "/3 months", save: "Save 13% vs monthly", feats: ["Everything in Monthly", "Personal diet plan", "2 personal sessions / quarter", "1 guest pass / quarter", "7-day pause"] },
    { id: "annual", name: "Annual", price: 18000, per: "/year", save: "Save 40% vs monthly", pop: true, feats: ["Everything in Quarterly", "Monthly body-composition test", "2 personal sessions / month", "1 guest pass / month", "30-day pause"] }
  ];
  var C = function (t, name, coach, dur, cap, booked) { return { t: t, name: name, coach: coach, dur: dur, cap: cap, booked: booked }; };
  var WEEK = [
    [C("7:30 AM", "Yoga Mobility", "Meera Joshi", 60, 15, 8), C("9:00 AM", "Strength 101", "Arjun Mehta", 60, 16, 10), C("10:30 AM", "Boxing Conditioning", "Kabir Ansari", 60, 14, 9)],
    [C("5:30 AM", "Strength 101", "Arjun Mehta", 60, 16, 11), C("6:30 AM", "HIIT", "Meera Joshi", 45, 20, 15), C("7:30 AM", "Yoga Mobility", "Meera Joshi", 60, 15, 9), C("9:00 AM", "Powerlifting Club", "Vikram Rathore", 90, 10, 7), C("12:30 PM", "HIIT Express", "Kabir Ansari", 30, 18, 6), C("5:00 PM", "Fat Loss Circuit", "Meera Joshi", 50, 16, 12), C("6:00 PM", "Boxing Conditioning", "Kabir Ansari", 60, 14, 10), C("7:00 PM", "Strength 101", "Arjun Mehta", 60, 16, 13), C("8:00 PM", "Powerlifting Club", "Vikram Rathore", 90, 10, 6)],
    [C("5:30 AM", "HIIT", "Meera Joshi", 45, 20, 14), C("6:30 AM", "Strength 101", "Arjun Mehta", 60, 16, 9), C("7:30 AM", "Yoga Mobility", "Meera Joshi", 60, 15, 11), C("9:00 AM", "Powerlifting Club", "Vikram Rathore", 90, 10, 5), C("12:30 PM", "HIIT Express", "Kabir Ansari", 30, 18, 8), C("5:00 PM", "Fat Loss Circuit", "Meera Joshi", 50, 16, 10), C("6:00 PM", "Boxing Conditioning", "Kabir Ansari", 60, 14, 12), C("7:00 PM", "Strength 101", "Arjun Mehta", 60, 16, 12), C("8:00 PM", "Powerlifting Club", "Vikram Rathore", 90, 10, 8)],
    [C("5:30 AM", "Strength 101", "Arjun Mehta", 60, 16, 13), C("6:30 AM", "HIIT", "Meera Joshi", 45, 20, 16), C("7:30 AM", "Yoga Mobility", "Meera Joshi", 60, 15, 7), C("9:00 AM", "Powerlifting Club", "Vikram Rathore", 90, 10, 8), C("12:30 PM", "HIIT Express", "Kabir Ansari", 30, 18, 5), C("5:00 PM", "Fat Loss Circuit", "Meera Joshi", 50, 16, 14), C("6:00 PM", "Boxing Conditioning", "Kabir Ansari", 60, 14, 8), C("7:00 PM", "Strength 101", "Arjun Mehta", 60, 16, 10), C("8:00 PM", "Powerlifting Club", "Vikram Rathore", 90, 10, 5)],
    [C("5:30 AM", "HIIT", "Meera Joshi", 45, 20, 12), C("6:30 AM", "Strength 101", "Arjun Mehta", 60, 16, 14), C("7:30 AM", "Yoga Mobility", "Meera Joshi", 60, 15, 10), C("9:00 AM", "Powerlifting Club", "Vikram Rathore", 90, 10, 6), C("12:30 PM", "HIIT Express", "Kabir Ansari", 30, 18, 9), C("5:00 PM", "Fat Loss Circuit", "Meera Joshi", 50, 16, 11), C("6:00 PM", "Boxing Conditioning", "Kabir Ansari", 60, 14, 13), C("7:00 PM", "Strength 101", "Arjun Mehta", 60, 16, 15), C("8:00 PM", "Powerlifting Club", "Vikram Rathore", 90, 10, 7)],
    [C("5:30 AM", "Strength 101", "Arjun Mehta", 60, 16, 10), C("6:30 AM", "HIIT", "Meera Joshi", 45, 20, 17), C("7:30 AM", "Yoga Mobility", "Meera Joshi", 60, 15, 12), C("9:00 AM", "Powerlifting Club", "Vikram Rathore", 90, 10, 9), C("12:30 PM", "HIIT Express", "Kabir Ansari", 30, 18, 7), C("5:00 PM", "Fat Loss Circuit", "Meera Joshi", 50, 16, 9), C("6:00 PM", "Boxing Conditioning", "Kabir Ansari", 60, 14, 11), C("7:00 PM", "Strength 101", "Arjun Mehta", 60, 16, 11), C("8:00 PM", "Powerlifting Club", "Vikram Rathore", 90, 10, 9)],
    [C("7:30 AM", "Yoga Mobility", "Meera Joshi", 60, 15, 10), C("9:00 AM", "Strength 101", "Arjun Mehta", 60, 16, 12), C("10:30 AM", "Weekend Warrior HIIT", "Kabir Ansari", 60, 20, 16), C("5:00 PM", "Fat Loss Circuit", "Meera Joshi", 50, 16, 8), C("6:00 PM", "Boxing Conditioning", "Kabir Ansari", 60, 14, 12)]
  ];
  var DAYNAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var FAQS = [
    ["Is the free trial really free?", "Yes — one full coached session, a body-composition scan and a written plan, with no card details and no obligation. If you never come back, the plan is still yours."],
    ["I'm a complete beginner. Where do I start?", "Strength 101. It begins with dumbbells and an empty bar, and your coach scales every lift to you. Around 40% of our members had never touched a barbell before joining."],
    ["What are the busiest hours?", "6–8 AM and 6–8 PM are peak. If your schedule allows, 11 AM–4 PM is quiet — you'll rarely wait for a rack. Sunday mornings are the calmest of the week."],
    ["Can I pause my membership?", "Yes. Quarterly plans include a 7-day pause and Annual plans a 30-day pause per cycle — for travel, exams or injury. Just tell the front desk before the pause starts."],
    ["Do you offer personal training?", "Yes. Annual members get 2 personal sessions a month included; anyone can add 1-on-1 coaching with any of our four coaches. Book a free trial and ask your coach for rates."],
    ["Is there a separate area or timings for women?", "The full floor is open to everyone at all hours, and women train in every batch — including the 5:30 AM strength batch. Coach Meera also runs women-majority HIIT batches at 6:30 AM."],
    ["What should I bring for my first session?", "Workout shoes, a water bottle and a towel. Lockers, showers, the sauna and filtered water are all on us."]
  ];
  var STORIES = [
    { name: "Rohit K., 31", prog: "Fat Loss · 16 Weeks", title: "Rohit K. — the desk-job turnaround", nums: [["96 → 78 kg", "Body weight"], ["31% → 22%", "Body fat"], ["60 → 130 kg", "Deadlift"]], quote: "I had joined three gyms before this. Nobody ever asked what I ate at home. Meera rebuilt my plate around my own kitchen — and checked my food photos every single day for the first month.", role: "Software engineer, member since 2025" },
    { name: "Sneha P.", prog: "Strength 101 · 20 Weeks", title: "Sneha P. — first pull-up at 29", nums: [["−6 kg", "Body weight"], ["0 → 5", "Strict pull-ups"], ["25 → 70 kg", "Squat"]], quote: "I was scared of the barbell side of the gym. Arjun started me on dumbbells and never once made me feel behind. Twenty weeks later I squat more than my bodyweight.", role: "School teacher" },
    { name: "Amit D.", prog: "Powerlifting · 24 Weeks", title: "Amit D. — 385 kg total and climbing", nums: [["+85 kg", "On his total"], ["140 kg", "Squat"], ["185 kg", "Deadlift"]], quote: "Vikram films my top sets and breaks down every rep. My deadlift went up 45 kilos in six months and my back has never felt better. This is coaching, not babysitting.", role: "CA aspirant" },
    { name: "Farhan M.", prog: "Boxing Conditioning · 12 Weeks", title: "Farhan M. — stamina like never before", nums: [["−11 kg", "Body weight"], ["3 → 10", "Hard rounds"], ["−6 min", "5 km run time"]], quote: "I came for weight loss and stayed for the boxing. Kabir's Saturday class is the hardest hour of my week and the one I look forward to most.", role: "Restaurant owner" }
  ];

  /* ---------- toast ---------- */
  var toastEl = null;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastEl._h); toastEl._h = setTimeout(function () { toastEl.classList.remove("show"); }, 3600);
  }

  /* ---------- preloader ---------- */
  function hidePreloader() { var p = $("#preloader"); if (p) p.classList.add("done"); }
  window.addEventListener("load", function () { setTimeout(hidePreloader, 350); });
  setTimeout(hidePreloader, 2200);

  /* ---------- header / nav / theme ---------- */
  var header = $(".site-header");
  function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 10); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  var page = document.body.getAttribute("data-page") || "home";
  $$(".main-nav a").forEach(function (a) { if (a.getAttribute("data-nav") === page) a.classList.add("active"); });
  var menuBtn = $("#menuBtn"), mainNav = $("#mainNav");
  if (menuBtn && mainNav) menuBtn.addEventListener("click", function () {
    var open = mainNav.classList.toggle("open"); menuBtn.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  if (mainNav) $$("a", mainNav).forEach(function (a) { a.addEventListener("click", function () { mainNav.classList.remove("open"); if (menuBtn) menuBtn.classList.remove("open"); }); });

  var themeBtn = $("#themeBtn");
  function applyTheme(mode) {
    var sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var dark = mode === "dark" || (mode === "auto" && sysDark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    if (themeBtn) themeBtn.textContent = dark ? "☀" : "☾";
    if (themeBtn) themeBtn.title = "Theme: " + mode + " (tap to change)";
  }
  var savedTheme = "dark";
  try { savedTheme = localStorage.getItem("ip-theme") || "dark"; } catch (e) {}
  applyTheme(savedTheme);
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var cur = "dark"; try { cur = localStorage.getItem("ip-theme") || "dark"; } catch (e) {}
    var next = cur === "dark" ? "light" : cur === "light" ? "auto" : "dark";
    try { localStorage.setItem("ip-theme", next); } catch (e) {}
    applyTheme(next); toast("Theme: " + next);
  });

  /* ---------- open / closed status ---------- */
  function openNow() {
    var d = new Date(), day = d.getDay(), mins = d.getHours() * 60 + d.getMinutes();
    var open = day === 0 ? (mins >= 420 && mins < 720) : (mins >= 300 && mins < 1320);
    var label = open ? "Open now" : "Closed now";
    var hours = day === 0 ? "Sun 7 AM – 12 PM" : "Mon–Sat 5 AM – 10 PM";
    $$("[data-open-status]").forEach(function (el) { el.innerHTML = '<span class="dot-live"></span>' + label + " · " + hours; });
    return open;
  }
  openNow();

  /* ---------- reveals + icon draw ---------- */
  var rvObs = null;
  function watchRv(scope) {
    if (!rvObs) rvObs = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); rvObs.unobserve(e.target); } }); }, { threshold: 0.05, rootMargin: "0px 0px 40% 0px" });
    (scope || document).querySelectorAll(".rv:not(.in), .icon.draw:not(.in)").forEach(function (el) { rvObs.observe(el); });
  }
  watchRv(document);

  /* ---------- count-up stats ---------- */
  var cuObs = null;
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduced) { el.textContent = target.toFixed(dec) + suffix; return; }
    var t0 = null, dur = 1400;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    cuObs = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); cuObs.unobserve(e.target); } }); }, { threshold: 0.4 });
    $$("[data-count]").forEach(function (el) { cuObs.observe(el); });
  } else { $$("[data-count]").forEach(countUp); }

  /* ---------- renders ---------- */
  function meterHTML(level, label) {
    var bars = ""; for (var i = 1; i <= 5; i++) bars += '<i class="' + (i <= level ? "f" : "") + '"></i>';
    return '<div class="meter"><span class="bars">' + bars + '</span>' + label + '</div>';
  }
  function programCard(p, full) {
    return '<article class="pcard rv"><div class="im"><img src="' + p.img + '" alt="' + p.alt + '" loading="lazy"></div><div class="pad">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><span class="tag">' + p.tag + '</span><span class="mut" style="font-size:.85rem">' + p.weeks + '</span></div>'
      + '<h3>' + p.name + '</h3><p>' + p.desc + '</p>'
      + meterHTML(p.level, "Intensity · " + INTLBL[p.level])
      + '<div class="pmeta"><span>Burn <b>~' + p.kcal + ' kcal</b>/session</span><span>Coach <b>' + p.coach + '</b></span></div>'
      + (full ? '<p class="mut" style="margin:12px 0 0;font-size:.9rem">' + p.sched + '</p>' : '')
      + '<div class="foot"><a class="btn btn-sm magnetic" href="trial.html?goal=' + encodeURIComponent(p.name) + '">Join Free First</a><a class="timings" href="timetable.html">Timings →</a></div>'
      + '</div></article>';
  }
  var homePrograms = $("#homePrograms"), programList = $("#programList");
  if (homePrograms) homePrograms.innerHTML = PROGRAMS.map(function (p) { return programCard(p, false); }).join("");
  if (programList) programList.innerHTML = PROGRAMS.map(function (p) { return programCard(p, true); }).join("");

  function trainerCard(t) {
    return '<article class="tcard rv"><div class="im"><img src="' + t.img + '" alt="' + t.alt + '" loading="lazy"></div><div class="pad">'
      + '<h3>' + t.name + '</h3><p class="role">' + t.role + '</p><p>' + t.bio + '</p>'
      + '<div class="tstats"><div><b>' + t.yrs + '</b><span>Experience</span></div><div><b>' + t.clients + '</b><span>Clients</span></div><div><b>' + t.extra.split(" ").slice(0, 2).join(" ") + '</b><span>' + t.extra.split(" ").slice(2).join(" ") + '</span></div></div>'
      + '<div class="certs">' + t.certs.map(function (c) { return "<span>" + c + "</span>"; }).join("") + '</div>'
      + '<p style="margin-top:12px;font-size:.88rem;color:var(--acc)">' + t.result + '</p>'
      + '</div></article>';
  }
  var homeTrainers = $("#homeTrainers"), trainerList = $("#trainerList");
  if (homeTrainers) homeTrainers.innerHTML = TRAINERS.map(trainerCard).join("");
  if (trainerList) trainerList.innerHTML = TRAINERS.map(trainerCard).join("");

  var faqList = $("#faqList");
  if (faqList) {
    faqList.innerHTML = FAQS.map(function (f) {
      return '<div class="faq-item rv"><button class="faq-q" type="button"><span>' + f[0] + '</span><span class="fx">+</span></button><div class="faq-a"><p>' + f[1] + '</p></div></div>';
    }).join("");
    $$(".faq-item", faqList).forEach(function (item) {
      var q = $(".faq-q", item), a = $(".faq-a", item);
      q.addEventListener("click", function () {
        var open = item.classList.toggle("open");
        a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
      });
    });
  }

  var storyGrid = $("#storyGrid");
  if (storyGrid) {
    storyGrid.innerHTML = STORIES.map(function (s) {
      return '<article class="story rv"><h3>' + s.title + '</h3><p class="smeta">' + s.prog + '</p>'
        + '<div class="snums">' + s.nums.map(function (n) { return "<div><b>" + n[0] + "</b><span>" + n[1] + "</span></div>"; }).join("") + '</div>'
        + '<blockquote>“' + s.quote + '”</blockquote><p class="mut" style="font-size:.9rem">— ' + s.name + ', ' + s.role + '</p></article>';
    }).join("");
  }

  /* ---------- timetable ---------- */
  function classRow(c, dayIdx, i) {
    var left = c.cap - c.booked;
    var full = left <= 0;
    return '<div class="class-row rv"><span class="time">' + c.t + '</span><div><div class="cname">' + c.name + '</div><div class="cmeta">' + c.coach + ' · ' + c.dur + ' min</div></div>'
      + '<span class="spots' + (full ? " full" : "") + '"><b>' + left + ' of ' + c.cap + '</b> spots left</span>'
      + '<button type="button" class="btn btn-sm magnetic" data-day="' + dayIdx + '" data-idx="' + i + '"' + (full ? " disabled" : "") + '>' + (full ? "Full" : "Book a Spot") + '</button></div>';
  }
  var ttList = $("#ttList"), dayTabs = $("#dayTabs");
  var todayIdx = new Date().getDay();
  function renderDay(d) {
    if (!ttList) return;
    ttList.innerHTML = WEEK[d].map(function (c, i) { return classRow(c, d, i); }).join("");
    $$(".day-tab", dayTabs).forEach(function (t) { t.classList.toggle("active", parseInt(t.getAttribute("data-day"), 10) === d); });
    watchRv(ttList);
    $$("button[data-day]", ttList).forEach(function (b) {
      b.addEventListener("click", function () {
        var c = WEEK[parseInt(b.getAttribute("data-day"), 10)][parseInt(b.getAttribute("data-idx"), 10)];
        c.booked += 1;
        var r = ref("IP-CLS");
        b.disabled = true; b.textContent = "Booked ✓";
        var sp = b.parentElement.querySelector(".spots");
        if (sp) sp.innerHTML = "<b>" + (c.cap - c.booked) + " of " + c.cap + "</b> spots left";
        toast("Spot booked — " + c.name + " " + c.t + " · Ref " + r);
      });
    });
  }
  if (dayTabs && ttList) {
    dayTabs.innerHTML = DAYNAMES.map(function (n, i) { return '<button type="button" class="day-tab' + (i === todayIdx ? " active" : "") + '" data-day="' + i + '">' + n.slice(0, 3) + '</button>'; }).join("");
    $$(".day-tab", dayTabs).forEach(function (t) { t.addEventListener("click", function () { renderDay(parseInt(t.getAttribute("data-day"), 10)); }); });
    renderDay(todayIdx);
  }
  var todayList = $("#todayList");
  if (todayList) {
    todayList.innerHTML = WEEK[todayIdx].map(function (c, i) { return classRow(c, todayIdx, i); }).join("");
    $$("button[data-day]", todayList).forEach(function (b) {
      b.addEventListener("click", function () {
        var c = WEEK[todayIdx][parseInt(b.getAttribute("data-idx"), 10)];
        c.booked += 1;
        var r = ref("IP-CLS");
        b.disabled = true; b.textContent = "Booked ✓";
        toast("Spot booked — " + c.name + " " + c.t + " · Ref " + r);
      });
    });
  }

  /* ---------- BMI calculator ---------- */
  var hSlider = $("#bmiH"), wSlider = $("#bmiW");
  function calcBMI() {
    if (!hSlider || !wSlider) return;
    var h = parseInt(hSlider.value, 10), w = parseInt(wSlider.value, 10);
    var bmi = w / Math.pow(h / 100, 2);
    var cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Obese";
    var hv = $("#bmiHVal"), wv = $("#bmiWVal"), out = $("#bmiVal"), oc = $("#bmiCat");
    if (hv) hv.textContent = h + " cm";
    if (wv) wv.textContent = w + " kg";
    if (out) out.textContent = bmi.toFixed(1);
    if (oc) oc.textContent = cat;
  }
  if (hSlider && wSlider) { hSlider.addEventListener("input", calcBMI); wSlider.addEventListener("input", calcBMI); calcBMI(); }

  /* ---------- before / after slider ---------- */
  $$(".ba-wrap").forEach(function (wrap) {
    var after = $(".ba-after", wrap), handle = $(".ba-handle", wrap);
    var dragging = false;
    function setPos(clientX) {
      var r = wrap.getBoundingClientRect();
      var p = Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100));
      if (after) after.style.clipPath = "inset(0 0 0 " + p + "%)";
      if (handle) handle.style.left = p + "%";
    }
    wrap.addEventListener("pointerdown", function (e) { dragging = true; wrap.setPointerCapture(e.pointerId); setPos(e.clientX); });
    wrap.addEventListener("pointermove", function (e) { if (dragging) setPos(e.clientX); });
    ["pointerup", "pointercancel"].forEach(function (ev) { wrap.addEventListener(ev, function () { dragging = false; }); });
  });

  /* ---------- forms ---------- */
  function validPhone(v) { return /^[6-9]\d{9}$/.test(v.replace(/[\s-]/g, "")); }
  function markInvalid(field, bad) { var f = field.closest(".field"); if (f) f.classList.toggle("invalid", bad); return !bad; }

  var trialForm = $("#trialForm");
  if (trialForm) {
    var params = new URLSearchParams(window.location.search);
    var goal = params.get("goal");
    if (goal) {
      var goalMap = { "Strength 101": "Build strength", "Fat Loss": "Lose fat", "Powerlifting": "Powerlifting", "HIIT": "Lose fat", "Yoga Mobility": "General fitness", "Boxing Conditioning": "Boxing & conditioning" };
      var gs = $("#tGoal"); if (gs) gs.value = goalMap[goal] || goal;
    }
    trialForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#tName"), phone = $("#tPhone"), g = $("#tGoal"), time = $("#tTime");
      var ok = true;
      ok = markInvalid(name, !name.value.trim()) && ok;
      ok = markInvalid(phone, !validPhone(phone.value)) && ok;
      if (!ok) return;
      var r = ref("IP-TRIAL");
      var box = $("#trialOk");
      if (box) {
        box.innerHTML = '<p style="font-size:1.05rem">You\'re in, <b>' + name.value.trim().split(" ")[0] + '</b>. Your free session is booked.</p>'
          + '<p style="margin-top:10px">Reference</p><p class="ref">' + r + '</p>'
          + '<p class="mut" style="margin-top:10px;font-size:.92rem">Goal: ' + g.value + ' · ' + time.value + ' · We\'ll confirm on WhatsApp within gym hours.</p>';
        box.classList.add("show");
      }
      trialForm.querySelector("button[type=submit]").disabled = true;
      toast("Free trial booked · Ref " + r);
    });
  }

  var planGrids = $$(".plan-grid");
  if (planGrids.length) {
    planGrids.forEach(function (grid) {
      grid.innerHTML = PLANS.map(function (p) {
        return '<article class="plan rv' + (p.pop ? " pop" : "") + '">' + (p.pop ? '<span class="pop-badge">Most Popular</span>' : "")
          + '<h3>' + p.name + '</h3><p class="price">' + inr(p.price) + ' <small>' + p.per + '</small></p>'
          + (p.save ? '<p class="save">' + p.save + '</p>' : '<p class="save">&nbsp;</p>')
          + '<ul>' + p.feats.map(function (f) { return "<li>" + f + "</li>"; }).join("") + '</ul>'
          + '<button type="button" class="btn magnetic" data-plan="' + p.id + '" data-plan-name="' + p.name + '">Reserve This Plan</button></article>';
      }).join("");
    });
    watchRv(document);
  }
  var planForm = $("#planForm");
  if (!planForm && planGrids.length) {
    $$("[data-plan]").forEach(function (b) {
      b.addEventListener("click", function () { window.location.href = "membership.html"; });
    });
  }
  if (planForm) {
    $$("[data-plan]").forEach(function (b) {
      b.addEventListener("click", function () {
        var sel = $("#mPlan");
        if (sel) sel.value = b.getAttribute("data-plan");
        var f = $("#planFormWrap");
        if (f) f.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
        toast(b.getAttribute("data-plan-name") + " selected — fill your details to reserve.");
      });
    });
    planForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#mName"), phone = $("#mPhone"), sel = $("#mPlan");
      var ok = true;
      ok = markInvalid(name, !name.value.trim()) && ok;
      ok = markInvalid(phone, !validPhone(phone.value)) && ok;
      if (!ok) return;
      var plan = PLANS.filter(function (p) { return p.id === sel.value; })[0];
      var r = ref("IP-MEM");
      var box = $("#planOk");
      if (box) {
        box.innerHTML = '<p style="font-size:1.05rem">Plan reserved for <b>' + name.value.trim().split(" ")[0] + '</b>.</p>'
          + '<p style="margin-top:10px">Reference</p><p class="ref">' + r + '</p>'
          + '<p class="mut" style="margin-top:10px;font-size:.92rem">' + plan.name + ' · ' + inr(plan.price) + ' ' + plan.per + ' · Pay at the front desk on your first visit. No joining fee this month.</p>';
        box.classList.add("show");
      }
      planForm.querySelector("button[type=submit]").disabled = true;
      toast("Plan reserved · Ref " + r);
    });
  }

  var contactForm = $("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#cName"), cm = $("#cContact"), msg = $("#cMsg");
      var ok = true;
      ok = markInvalid(name, !name.value.trim()) && ok;
      ok = markInvalid(cm, !cm.value.trim()) && ok;
      ok = markInvalid(msg, !msg.value.trim()) && ok;
      if (!ok) return;
      contactForm.reset();
      toast("Message sent — we reply within gym hours, usually inside the hour.");
    });
  }

  var newsForm = $("#newsForm");
  if (newsForm) newsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var em = $("#newsEmail");
    if (!em.value || em.value.indexOf("@") < 0) { toast("Please enter a valid email address."); return; }
    newsForm.reset();
    toast("You're on the list — one training tip a week, no spam.");
  });

  /* ---------- cursor + magnetic ---------- */
  if (fine && !reduced) {
    var dot = document.createElement("div"); dot.className = "cursor-dot"; document.body.appendChild(dot);
    var ring = document.createElement("div"); ring.className = "cursor-ring"; ring.innerHTML = "<span>View</span>"; document.body.appendChild(ring);
    var mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener("mousemove", function (e) { mx = e.clientX; my = e.clientY; dot.style.left = mx + "px"; dot.style.top = my + "px"; });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    })();
    $$("a, button, .ba-wrap").forEach(function (el) {
      el.addEventListener("mouseenter", function () { ring.classList.add("big"); });
      el.addEventListener("mouseleave", function () { ring.classList.remove("big"); });
    });
    $$(".magnetic").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.transform = "translate(" + (e.clientX - r.left - r.width / 2) * 0.18 + "px," + (e.clientY - r.top - r.height / 2) * 0.28 + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }
  watchRv(document);
})();
