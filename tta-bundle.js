// ---- extracted script block 1 ----
(function () {

(function () {
window._ttaLoaderDismiss = function () { };
window._ttaLoaderGated = false;
})();

})();

// ---- extracted script block 2 ----
(function () {

(function () {
if (!window.location.pathname.includes("3611254-sign-up-for-tiktok-academy")) return;
window._ttaLoaderGated = true;

function allSectionsReady() {
return !!(
document.querySelector(".new_banner") &&
document.querySelector(".see-what-learn") &&
document.querySelector(".what-you-learn") &&
document.querySelector(".cta-guesswork")
);
}

function tryDismiss() {
if (allSectionsReady() && window._ttaLoaderDismiss) {
window._ttaLoaderDismiss();
return true;
}
return false;
}

if (tryDismiss()) return;

var observer = new MutationObserver(function () {
if (tryDismiss()) observer.disconnect();
});
observer.observe(document.documentElement, { childList: true, subtree: true });

setTimeout(function () {
observer.disconnect();
if (window._ttaLoaderDismiss) window._ttaLoaderDismiss();
}, 8000);
})();

})();

// ---- extracted script block 3 ----
(function () {

(function () {
function positionTtaStickyBar(bar, header) {
bar.style.top = header.offsetHeight + "px";
var spacer = document.querySelector(".tta-sticky-bar-spacer");
if (spacer) spacer.style.height = bar.offsetHeight + "px";
}

function moveTtaStickyBar() {
var bar = document.querySelector(".tta-sticky-bar");
var header = document.querySelector(".appheader.appheader--exceed");
if (!bar || !header) return;

if (!bar.dataset.ttaRepositioned) {
var topLevelHeaderAncestor = header;
while (
topLevelHeaderAncestor.parentElement &&
topLevelHeaderAncestor.parentElement !== document.body
) {
topLevelHeaderAncestor = topLevelHeaderAncestor.parentElement;
}
var spacer = document.createElement("div");
spacer.className = "tta-sticky-bar-spacer";
topLevelHeaderAncestor.insertAdjacentElement("afterend", spacer);
spacer.insertAdjacentElement("afterend", bar);
bar.style.position = "fixed";
bar.style.left = "0"; 
bar.style.boxSizing = "border-box";
bar.dataset.ttaRepositioned = "1";
}

positionTtaStickyBar(bar, header);
}

moveTtaStickyBar();
var ttaStickyBarObserver = new MutationObserver(moveTtaStickyBar);
ttaStickyBarObserver.observe(document.documentElement, { childList: true, subtree: true });
window.addEventListener("resize", function () {
var bar = document.querySelector(".tta-sticky-bar");
var header = document.querySelector(".appheader.appheader--exceed");
if (bar && header) positionTtaStickyBar(bar, header);
});
})();

})();

// ---- extracted script block 4 ----
(function () {

(function () {
var match = window.location.pathname.match(/^\/+student\/path\/(\d+)(?:-[^/]+)?\/?$/);
if (!match) return;
var oldCourseId = match[1];

window._ttaLoaderGated = true; 
var CANDIDATE_COLLECTION_IDS = [
"2592070","2532062","3491348","3491340","2531182","2079614","2189485","2183629","2591263","2677293","2185279","2597035","2485104","2528615","2185242","2640708","2639680","2963122","2963118","2963113","2963115","2963092","2963124","2963111","2963130","3133633","2963130","2963132","2963128","2963120","2963107","3133619","3133631","3133609","3133629","3133615","3133611","3133627","3133635","3133617","3133625","3133623","3133621","3133613"
];

var params = new URLSearchParams();
params.set("resolveOldCourseId", oldCourseId);
params.set("resolveCandidateCollectionIds", CANDIDATE_COLLECTION_IDS.join(","));

fetch("https://intellum-progress-api.vercel.app/api/progress?" + params.toString())
.then(function (res) { return res.ok ? res.json() : null; })
.then(function (data) {
if (data && data.rootCollectionId && data.pathId) {
window.location.replace("/student/collection/" + data.rootCollectionId + "/path/" + data.pathId);
return; // navigating away — leave the loader up, no need to dismiss it
}
if (window._ttaLoaderDismiss) window._ttaLoaderDismiss();
})
.catch(function () {
if (window._ttaLoaderDismiss) window._ttaLoaderDismiss();
});
})();

})();

// ---- extracted script block 5 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
var SINGLE_COURSE_COLLECTION_IDS = new Set([
"2592070","2532062","3491348","3491340","2531182","2079614","2189485","2183629","2591263","2677293","2185279","2597035","2485104","2528615","2185242","2640708","2639680","2963122","2963118","2963113","2963115","2963092","2963124","2963111","2963126","3133633","2963130","2963132","2963128","2963120","2963107","3133619","3133631","3133609","3133629","3133615","3133611","3133627","3133635","3133617","3133625","3133623","3133621","3133613","3523001"
]);

var FORCED_SINGLE_COURSE_PATH_IDS_NO_CONTINUE_LEARNING = new Set(["3596803", "3596805"]);

var match = window.location.pathname.match(
/^\/student\/collection\/(\d+)\/path\/(\d+)\/?$/,
);
var rootCollectionId = match ? match[1] : null;
var pathId = match ? match[2] : null;

var oldPathMatch = window.location.pathname.match(/^\/student\/path\/(\d+)(?:-[^/]+)?\/?$/);
var forcedPathId = oldPathMatch ? oldPathMatch[1] : null;
var isForcedSingleCoursePath =
forcedPathId && FORCED_SINGLE_COURSE_PATH_IDS_NO_CONTINUE_LEARNING.has(forcedPathId);

var appliesSingleCourseDesign =
(rootCollectionId && SINGLE_COURSE_COLLECTION_IDS.has(rootCollectionId)) ||
isForcedSingleCoursePath;
if (!appliesSingleCourseDesign) return;

var skipContinueLearning = !!isForcedSingleCoursePath;

var mainTag = document.querySelector("main");
if (mainTag) mainTag.classList.add("new_single_course_main");

function insertSingleCourseBanner() {
if (document.querySelector(".singcourses_banner")) return true;

var headerContainer = document.querySelector(".course__headercontainer");
var titleEl = document.querySelector(".activityheading__name");
var descEl = document.querySelector(".course__description.postcontent");
if (!headerContainer || !titleEl || !descEl) return false; // native content not rendered yet — keep retrying

var heroImg = document.querySelector(
".course__fullwidthcontainer .hero.hero--course img.hero__image",
);
var descImg = descEl.querySelector("img");
var ctaEl = document.querySelector(".activityheading__quickstart a");

var banner = document.createElement("div");
banner.className = "singcourses_banner";

var content = document.createElement("div");
content.className = "content";

var h1 = document.createElement("h1");
h1.textContent = titleEl.textContent.trim();
content.appendChild(h1);

var p = document.createElement("p");
p.textContent = stripHtml(descEl.innerHTML);
content.appendChild(p);

if (ctaEl) content.appendChild(ctaEl.cloneNode(true));

banner.appendChild(content);

var bannerImgSrc = heroImg
? heroImg.currentSrc || heroImg.src
: descImg
? descImg.currentSrc || descImg.src
: null;
if (bannerImgSrc) {
var img = document.createElement("img");
img.src = bannerImgSrc;
img.alt = "";
banner.appendChild(img);
}

headerContainer.parentNode.insertBefore(banner, headerContainer);

descEl.style.display = "none";

return true;
}

if (!insertSingleCourseBanner()) {
var observer = new MutationObserver(function () {
if (insertSingleCourseBanner()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });
}

function enhanceCourseCards() {
document
.querySelectorAll(
".new_single_course_main .activitysection ul.cardgrid li.cardgrid__item .activitycard",
)
.forEach(function (card) {
if (card.dataset.ttaEnhanced) return;
card.dataset.ttaEnhanced = "1";

var metaItems = card.querySelectorAll(".activitycard__meta li.activitymeta__item");
var ratingLi = metaItems[metaItems.length - 1];
var starSvg = ratingLi && ratingLi.querySelector("svg");
if (starSvg) {
starSvg.outerHTML =
'<svg class="tta_meta_star" xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9" fill="none"><path d="M4.76297 0.139159C4.78488 0.0973775 4.81873 0.0622079 4.86069 0.0376189C4.90265 0.0130298 4.95106 0 5.00045 0C5.04984 0 5.09825 0.0130298 5.14021 0.0376189C5.18217 0.0622079 5.21602 0.0973775 5.23793 0.139159L6.39282 2.34715C6.4689 2.49248 6.58121 2.61821 6.72011 2.71356C6.859 2.8089 7.02033 2.87101 7.19025 2.89455L9.77302 3.2513C9.82196 3.25799 9.86793 3.27748 9.90575 3.30755C9.94357 3.33762 9.97172 3.37708 9.98701 3.42147C10.0023 3.46586 10.0041 3.51339 9.99229 3.55871C9.98045 3.60403 9.95541 3.64531 9.92001 3.67789L8.05217 5.39465C7.92899 5.50795 7.83683 5.64781 7.78362 5.80219C7.7304 5.95657 7.71773 6.12084 7.7467 6.28086L8.18766 8.7064C8.1963 8.75257 8.19102 8.8001 8.17241 8.84357C8.15381 8.88704 8.12263 8.9247 8.08244 8.95225C8.04225 8.97981 7.99467 8.99614 7.94512 8.9994C7.89556 9.00265 7.84604 8.99269 7.8022 8.97066L5.4934 7.8249C5.34128 7.7495 5.17202 7.71011 5.0002 7.71011C4.82837 7.71011 4.65912 7.7495 4.50699 7.8249L2.1987 8.97066C2.15487 8.99256 2.10541 9.00241 2.05594 8.99909C2.00647 8.99578 1.95898 8.97942 1.91887 8.95189C1.87877 8.92435 1.84765 8.88675 1.82906 8.84335C1.81048 8.79996 1.80517 8.7525 1.81374 8.7064L2.2542 6.28133C2.28329 6.12124 2.27069 5.95686 2.21747 5.80238C2.16425 5.64791 2.07202 5.50797 1.94872 5.39465L0.0808926 3.67837C0.0451927 3.64582 0.0198947 3.60447 0.00788036 3.55901C-0.00413395 3.51356 -0.00238147 3.46583 0.0129381 3.42127C0.0282576 3.37671 0.0565283 3.33711 0.0945297 3.30698C0.132531 3.27684 0.178735 3.25739 0.227879 3.25083L2.81015 2.89455C2.98026 2.87119 3.14181 2.80916 3.2809 2.71381C3.41998 2.61845 3.53243 2.49262 3.60857 2.34715L4.76297 0.139159Z" fill="#F1204A"/></svg>';
}
if (metaItems.length === 2) {
var dotLi = document.createElement("li");
dotLi.className = "tta_meta_dot_sep";
dotLi.innerHTML =
'<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none"><circle cx="2" cy="2" r="2" fill="#A0A0A0"/></svg>';
metaItems[0].parentNode.insertBefore(dotLi, ratingLi);
}

var pill = document.createElement("span");
pill.className = "activitycard__startlearning";
pill.textContent = "Start Learning";
card.appendChild(pill);
});
}

enhanceCourseCards();
new MutationObserver(enhanceCourseCards).observe(document.body, {
childList: true,
subtree: true,
});

var PROGRESS_API_URL = "https://intellum-progress-api.vercel.app/api/progress";
var descriptionsFetchStarted = false;

function stripHtml(html) {
var div = document.createElement("div");
div.innerHTML = html;
return (div.textContent || "").replace(/\s+/g, " ").trim();
}

function fetchAndRenderCourseDescriptions() {
if (descriptionsFetchStarted || !rootCollectionId) return;
var cards = document.querySelectorAll(
".new_single_course_main .activitysection ul.cardgrid li.cardgrid__item .activitycard",
);
if (!cards.length) return;
descriptionsFetchStarted = true;

var titles = [];
cards.forEach(function (card) {
var titleEl = card.querySelector(".activitycard__name");
var title = titleEl && titleEl.textContent.trim();
if (title) titles.push(title);
});
if (!titles.length) return;

var params = new URLSearchParams();
params.set("descRootCollectionId", rootCollectionId);
params.set("descPathId", pathId);
params.set("descTitles", titles.join("|||"));

fetch(PROGRESS_API_URL + "?" + params.toString())
.then(function (res) { return res.ok ? res.json() : null; })
.then(function (data) {
var descriptions = (data && data.descriptions) || {};
cards.forEach(function (card) {
var titleEl = card.querySelector(".activitycard__name");
var title = titleEl && titleEl.textContent.trim();
var description = title && descriptions[title];
if (!description) return;
var textContainer = card.querySelector(".activitycard__textcontainer");
if (!textContainer || textContainer.querySelector(".activitycard__summary")) return;
var p = document.createElement("p");
p.className = "activitycard__summary";
p.textContent = stripHtml(description);
textContainer.appendChild(p);
});
})
.catch(function () { }); // network hiccup — cards just show no description
}

fetchAndRenderCourseDescriptions();
new MutationObserver(fetchAndRenderCourseDescriptions).observe(document.body, {
childList: true,
subtree: true,
});
var continueLearningFetchStarted = false;

function insertContinueLearningSection(items) {
if (document.querySelector(".tta_continuelearning")) return true;
var banner = document.querySelector(".singcourses_banner");
if (!banner) return false;

var section = document.createElement("div");
section.className = "tta_continuelearning";

var heading = document.createElement("h2");
heading.textContent = "Continue learning";
section.appendChild(heading);

var grid = document.createElement("div");
grid.className = "tta_continuelearning__grid";

items.forEach(function (item) {
var card = document.createElement("a");
card.className = "tta_continuelearning__card";
card.href = item.href;

if (item.image) {
var img = document.createElement("img");
img.className = "tta_continuelearning__image";
img.src = item.image;
img.alt = "";
card.appendChild(img);
}

var body = document.createElement("div");
body.className = "tta_continuelearning__body";

var title = document.createElement("h3");
title.className = "tta_continuelearning__title";
title.textContent = item.title;
body.appendChild(title);

if (item.description) {
var desc = document.createElement("p");
desc.className = "tta_continuelearning__desc";
desc.textContent = stripHtml(item.description);
body.appendChild(desc);
}

var footer = document.createElement("div");
footer.className = "tta_continuelearning__footer";
if (item.progress != null) {
var progressWrap = document.createElement("div");
progressWrap.className = "tta_continuelearning__progress";

var pct = document.createElement("div");
pct.className = "tta_continuelearning__pct";
pct.textContent = item.progress + "% complete";
progressWrap.appendChild(pct);

var bar = document.createElement("div");
bar.className = "tta_continuelearning__bar";
var fill = document.createElement("span");
fill.style.width = item.progress + "%";
bar.appendChild(fill);
progressWrap.appendChild(bar);

footer.appendChild(progressWrap);
} else {
var statusBadge = document.createElement("span");
statusBadge.className = "tta_continuelearning__status";
statusBadge.innerHTML = '<span class="tta_continuelearning__statusdot"></span>In Progress';
footer.appendChild(statusBadge);
}

var btn = document.createElement("span");
btn.className = "tta_continuelearning__btn";
btn.textContent = "Continue";
footer.appendChild(btn);

body.appendChild(footer);
card.appendChild(body);
grid.appendChild(card);
});

section.appendChild(grid);
banner.insertAdjacentElement("afterend", section);
return true;
}

function fetchAndRenderContinueLearning() {
var email = window.IntellumDataLayer && window.IntellumDataLayer.user && window.IntellumDataLayer.user.code;
if (!email || continueLearningFetchStarted || !rootCollectionId || !pathId) return;
continueLearningFetchStarted = true;

var params = new URLSearchParams();
params.set("continueLearningEmail", email);
params.set("continueLearningRootCollectionId", rootCollectionId);
params.set("continueLearningPathId", pathId);

fetch(PROGRESS_API_URL + "?" + params.toString())
.then(function (res) { return res.ok ? res.json() : null; })
.then(function (data) {
var items = (data && data.items) || [];
if (!items.length) return;
if (!insertContinueLearningSection(items)) {
var clObserver = new MutationObserver(function () {
if (insertContinueLearningSection(items)) clObserver.disconnect();
});
clObserver.observe(document.body, { childList: true, subtree: true });
}
})
.catch(function () { }); // network hiccup — section just doesn't appear
}

if (!skipContinueLearning) {
fetchAndRenderContinueLearning();
}
});

})();

// ---- extracted script block 6 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
const COURSES_PAGE_COLLECTION_IDS = new Set(["2079614","2592070","2532062","3491348","2531182","2189485","2183629","2591263","2677293","2185279","2597035","2485104","2528615","2185242","2640708","2639680","3133619","3133633","3133631","3133609","3133629","3133615","3133611","3133627","3133635","3133617","3133625","3133623","3133621","3133613","2963122","2963118","2963113","2963115","2963092","2963124","2963111","2963130","2963126","2963132","2963128","2963107","2963105","2963120","3491340","2640708","2639680","2963122","2963118","2963113","2963115","2963092","2963124","2963111","2963126","3133633","2963130","2963132","2963128","2963120","2963107","3133619","3133631","3133609","3133629","3133615","3133611","3133627","3133635","3133617","3133625","3133623","3133621","3133613"]);
 
const MEDIA_BUYING_EXPERT_COLLECTION_IDS = new Set(["2640708","3133619","3133633","3133631","3133609","3133629","3133615","3133611","3133627","3133635","3133617","3133625","3133623","3133621","3133613","3133619","3133631","3133609","3133629","3133615","3133611","3133627","3133635","3133617","3133625","3133623","3133621","3133613"]);
 
const CREATIVE_EXPERT_COLLECTION_IDS = new Set(["2639680","2963122","2963118","2963113","2963115","2963092","2963124","2963111","2963130","2963126","2963132","2963128","2963107","2963105","2963120","2963122","2963118","2963113","2963115","2963092","2963124","2963111","2963130","2963132","2963128","2963120","2963107"]);
 
const currentCollectionIdMatch = window.location.pathname.match(
/^\/+student\/collection\/(\d+)(?:-[^/]+)?\/?$/
);
const currentCollectionId = currentCollectionIdMatch ? currentCollectionIdMatch[1] : null;
if (!currentCollectionId || !COURSES_PAGE_COLLECTION_IDS.has(currentCollectionId)) return;
const mainTag = document.querySelector("main");
if (mainTag) mainTag.classList.add("new_courses_main");

const MEDIA_BUYING_EXPERT_BANNER_IMAGE = "https://i.ibb.co/JP5QQ8C/Group-2036083527.png";
const CREATIVE_EXPERT_BANNER_IMAGE = "https://i.ibb.co/1Y7q9fL5/Group-2036083527-1.png";
const DEFAULT_BANNER_IMAGE = "https://i.ibb.co/V0mH7BTT/Group-2036083527.png";
const bannerImage = MEDIA_BUYING_EXPERT_COLLECTION_IDS.has(currentCollectionId)
? MEDIA_BUYING_EXPERT_BANNER_IMAGE
: CREATIVE_EXPERT_COLLECTION_IDS.has(currentCollectionId)
? CREATIVE_EXPERT_BANNER_IMAGE
: DEFAULT_BANNER_IMAGE; 
function insertGetStartedBanner() {
const categoryHeader = document.querySelector(".course__headercontainer");
const sourceTitle = document.querySelector(".activityheading__name");
const sourceDesc = document.querySelector(".course__description.postcontent");
if (!categoryHeader || !sourceTitle || !sourceDesc) return false; // native content not rendered yet — keep retrying
if (document.querySelector(".courses_banner")) return true;

const isHighlighted = MEDIA_BUYING_EXPERT_COLLECTION_IDS.has(currentCollectionId);
const isCreativeExpert = CREATIVE_EXPERT_COLLECTION_IDS.has(currentCollectionId);
 
const isBecomeExpertPage = isHighlighted || isCreativeExpert;
const bannerBackground =
isHighlighted ? "#F1204A" :
isCreativeExpert ? "#BAF6F0" :
null;
const banner = document.createElement("div");
banner.className = "courses_banner";
if (bannerBackground) banner.style.background = bannerBackground;
const divStyleParts = [];
if (isHighlighted) divStyleParts.push("color:#fff;");
if (isBecomeExpertPage) divStyleParts.push("max-width:600px;");
const divStyleAttr = divStyleParts.length ? ` style="${divStyleParts.join(" ")}"` : "";
const h1StyleParts = [];
if (isHighlighted) h1StyleParts.push("color:#fff;");
if (isBecomeExpertPage) h1StyleParts.push("line-height:100%;");
const h1StyleAttr = h1StyleParts.length ? ` style="${h1StyleParts.join(" ")}"` : "";
banner.innerHTML = `
<div${divStyleAttr}>
<h1${h1StyleAttr}>${sourceTitle.textContent.trim()}</h1>
${sourceDesc.innerHTML}
</div>
<img src="${bannerImage}" alt="">
`;
if (isHighlighted) {
banner.querySelectorAll("p, li, span, a").forEach((el) => {
el.style.color = "#fff";
});
}
categoryHeader.parentNode.insertBefore(banner, categoryHeader);
 
sourceDesc.style.display = "none";

return true;
}

if (!insertGetStartedBanner()) {
const observer = new MutationObserver(() => {
if (insertGetStartedBanner()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });
}

const PATH_COURSE_COUNT_CACHE_KEY = "tta_path_course_counts_v1";
const PATH_COURSE_COUNT_TTL_MS = 24 * 60 * 60 * 1000;

function _readPathCourseCountCache() {
try {
const raw = localStorage.getItem(PATH_COURSE_COUNT_CACHE_KEY);
const parsed = raw ? JSON.parse(raw) : {};
return parsed && typeof parsed === "object" ? parsed : {};
} catch (_) {
return {};
}
}

function _writePathCourseCountCache(cache) {
try {
localStorage.setItem(PATH_COURSE_COUNT_CACHE_KEY, JSON.stringify(cache));
} catch (_) { }
}

function fetchPathCourseCountViaIframe(href) {
return new Promise((resolve) => {
let done = false;
const iframe = document.createElement("iframe");
iframe.style.cssText =
"position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-9999;opacity:0;pointer-events:none;border:none;";
iframe.src = href;

function finish(count) {
if (done) return;
done = true;
clearInterval(pollId);
clearTimeout(timeoutId);
try { document.body.removeChild(iframe); } catch (_) { }
resolve(count);
}

function tryExtract() {
try {
const doc = iframe.contentDocument;
if (!doc || !doc.body) return;
const grids = doc.querySelectorAll("ul.cardgrid");
if (!grids.length) return;
let best = null;
for (const grid of grids) {
const items = grid.querySelectorAll(":scope > li.cardgrid__item");
if (!best || items.length > best.length) best = items;
}
if (best && best.length > 0) {
finish(best.length);
}
} catch (_) { }
}

const pollId = setInterval(tryExtract, 500);
const timeoutId = setTimeout(() => finish(null), 15000);
iframe.addEventListener("load", () => setTimeout(tryExtract, 1000));
document.body.appendChild(iframe);
});
}
function _afterWindowLoad() {
return new Promise((resolve) => {
if (document.readyState === "complete") { resolve(); return; }
window.addEventListener("load", () => resolve(), { once: true });
});
}

async function applyDynamicCourseCounts() {
const cards = document.querySelectorAll(
".new_courses_main .activitysection li.cardgrid__item"
);
if (!cards.length) return;

const cache = _readPathCourseCountCache();
const now = Date.now();
const queue = Array.from(cards);
const anyUncached = queue.some((card) => {
const link = card.querySelector("a[href*='/path/']");
const href = link && link.getAttribute("href");
const cached = href && cache[href];
return !(cached && now - cached.ts < PATH_COURSE_COUNT_TTL_MS);
});
if (anyUncached) await _afterWindowLoad();

async function worker() {
while (queue.length) {
const card = queue.shift();
const link = card.querySelector("a[href*='/path/']");
const meta = card.querySelector("ul.activitymeta.activitycard__meta");
if (!link || !meta) continue;
const href = link.getAttribute("href");
let count = null;

const cached = cache[href];
if (cached && now - cached.ts < PATH_COURSE_COUNT_TTL_MS) {
count = cached.count;
} else {
count = await fetchPathCourseCountViaIframe(href);
if (count != null) {
cache[href] = { count, ts: now };
_writePathCourseCountCache(cache);
}
}

if (count != null) {
meta.style.setProperty(
"--course-count",
`"${count} COURSE${count === 1 ? "" : "S"}"`
);
}
}
}

await Promise.all([worker(), worker(), worker()]);
}

function tryApplyCourseCounts() {
const cards = document.querySelectorAll(
".new_courses_main .activitysection li.cardgrid__item"
);
if (!cards.length) return false;
applyDynamicCourseCounts();
return true;
}

if (!tryApplyCourseCounts()) {
const countsObserver = new MutationObserver(() => {
if (tryApplyCourseCounts()) countsObserver.disconnect();
});
countsObserver.observe(document.body, { childList: true, subtree: true });
} 
const PATH_TAG_FILTER_KEY_BY_ID = {
43721: { key: "media_buying" },
43722: { key: "creative", bg: "#2DCCD3", color: "#000000" },
};
const PATH_TAG_CACHE_KEY = "tta_path_skills_tags_v1";
const PATH_TAG_TTL_MS = 24 * 60 * 60 * 1000;
const PATH_TAG_EMPTY_TTL_MS = 60 * 60 * 1000;
const TAXONOMY_NAME_CACHE_KEY = "tta_taxonomy_item_names_v1";
const TAXONOMY_NAME_TTL_MS = 24 * 60 * 60 * 1000;
const PROGRESS_API_URL = "https://intellum-progress-api.vercel.app/api/progress";
const ROOT_COURSES_COLLECTION_ID = currentCollectionId;

function _readPathTagCache() {
try {
const raw = localStorage.getItem(PATH_TAG_CACHE_KEY);
const parsed = raw ? JSON.parse(raw) : {};
return parsed && typeof parsed === "object" ? parsed : {};
} catch (_) {
return {};
}
}

function _writePathTagCache(cache) {
try {
localStorage.setItem(PATH_TAG_CACHE_KEY, JSON.stringify(cache));
} catch (_) { }
}

function _readTaxonomyNameCache() {
try {
const raw = localStorage.getItem(TAXONOMY_NAME_CACHE_KEY);
const parsed = raw ? JSON.parse(raw) : {};
return parsed && typeof parsed === "object" ? parsed : {};
} catch (_) {
return {};
}
}

function _writeTaxonomyNameCache(cache) {
try {
localStorage.setItem(TAXONOMY_NAME_CACHE_KEY, JSON.stringify(cache));
} catch (_) { }
}

async function resolveTaxonomyItemNames(ids) {
const cache = _readTaxonomyNameCache();
const now = Date.now();
const idsNeedingFetch = ids.filter(
(id) => !cache[id] || now - cache[id].ts >= TAXONOMY_NAME_TTL_MS
);

if (idsNeedingFetch.length) {
try {
const res = await fetch(
PROGRESS_API_URL + "?tagItemIds=" + idsNeedingFetch.join(",")
);
const data = await res.json();
const items = (data && data.items) || {};
Object.keys(items).forEach((id) => {
cache[id] = { name: items[id] && items[id].name, ts: now };
});
_writeTaxonomyNameCache(cache);
} catch (_) { } // network hiccup — those ids just keep the CSS fallback text
}

const nameById = {};
ids.forEach((id) => {
const entry = cache[id];
if (entry && entry.name) nameById[id] = entry.name;
});
return nameById;
}

function configForPathTags(rawTags, nameById) {
for (const t of rawTags || []) {
if (t && t.code) {
return { label: String(t.code).replace(/[-_]+/g, " ") };
}
if (t && t.id != null) {
const label = nameById[String(t.id)];
if (label) {
const filterCfg = PATH_TAG_FILTER_KEY_BY_ID[t.id] || {};
return { label, key: filterCfg.key, bg: filterCfg.bg, color: filterCfg.color };
}
}
}
return null;
}

async function applyDynamicPathTags() {
const cards = document.querySelectorAll(
".new_courses_main .activitysection li.cardgrid__item"
);
if (!cards.length) return;

const cardsByPathId = {};
cards.forEach((card) => {
const link = card.querySelector("a[href*='/path/']");
const href = link && link.getAttribute("href");
const m = href && href.match(/\/path\/(\d+)/);
if (!m) return;
cardsByPathId[m[1]] = card;
});

const pathIds = Object.keys(cardsByPathId);
if (!pathIds.length) return;

const cache = _readPathTagCache();
const now = Date.now();
const idsNeedingFetch = pathIds.filter((id) => {
const entry = cache[id];
if (!entry) return true;
const hasTag = Array.isArray(entry.rawTags) && entry.rawTags.length > 0;
const ttl = hasTag ? PATH_TAG_TTL_MS : PATH_TAG_EMPTY_TTL_MS;
return now - entry.ts >= ttl;
});

if (idsNeedingFetch.length) {
try {
const res = await fetch(
PROGRESS_API_URL +
"?tagRootCollectionId=" + ROOT_COURSES_COLLECTION_ID +
"&tagPathIds=" + idsNeedingFetch.join(",")
);
const data = await res.json();
const tagsByPathId = (data && data.tags) || {};
Object.keys(tagsByPathId).forEach((id) => {
cache[id] = { rawTags: tagsByPathId[id], ts: now };
});
_writePathTagCache(cache);
} catch (_) { } // network hiccup — cards just keep the CSS fallback text
}
 
const idsNeedingName = [];
pathIds.forEach((id) => {
const entry = cache[id];
(entry && entry.rawTags ? entry.rawTags : []).forEach((t) => {
if (t && !t.code && t.id != null) idsNeedingName.push(String(t.id));
});
});
const nameById = idsNeedingName.length
? await resolveTaxonomyItemNames([...new Set(idsNeedingName)])
: {};

pathIds.forEach((id) => {
const entry = cache[id];
if (!entry) return;
const cfg = configForPathTags(entry.rawTags, nameById);
const card = cardsByPathId[id];
const textEl = card.querySelector(".activitycard__textcontainer");
if (!textEl) return;
if (!cfg || !cfg.label) {
 
textEl.removeAttribute("data-has-tag");
return;
}
textEl.style.setProperty("--path-tag", '"' + cfg.label + '"');
if (cfg.bg) textEl.style.setProperty("--path-tag-bg", cfg.bg);
if (cfg.color) textEl.style.setProperty("--path-tag-color", cfg.color);
textEl.setAttribute("data-has-tag", "true");
 
if (cfg.key) card.dataset.pathCategory = cfg.key;
});
 
if (typeof applyCourseFilter === "function") applyCourseFilter();
}

function tryApplyPathTags() {
const cards = document.querySelectorAll(
".new_courses_main .activitysection li.cardgrid__item"
);
if (!cards.length) return false;
applyDynamicPathTags();
return true;
}

if (!tryApplyPathTags()) {
const tagsObserver = new MutationObserver(() => {
if (tryApplyPathTags()) tagsObserver.disconnect();
});
tagsObserver.observe(document.body, { childList: true, subtree: true });
} 
const COURSE_FILTERS = [
{ key: "all", label: "All Courses" },
{ key: "media_buying", label: "Media Buying Path" },
{ key: "creative", label: "Creative Expert" },
];

let activeCourseFilter = "all";

function buildCourseFiltersHTML() {
return `<div class="achievement_filters">
${COURSE_FILTERS.map(
(f) =>
`<button type="button" class="achievement_filters__btn${f.key === "all" ? " active" : ""}" data-filter="${f.key}">${f.label}</button>`,
).join("")}
</div>`;
}

function applyCourseFilter() {
document
.querySelectorAll(".new_courses_main .activitysection li.cardgrid__item")
.forEach((item) => {
const matches =
activeCourseFilter === "all" || item.dataset.pathCategory === activeCourseFilter;
item.style.display = matches ? "" : "none";
});
}

function attachCourseFilterListeners() {
document.querySelectorAll(".achievement_filters__btn").forEach((btn) => {
btn.addEventListener("click", () => {
activeCourseFilter = btn.dataset.filter;
document
.querySelectorAll(".achievement_filters__btn")
.forEach((b) => b.classList.toggle("active", b === btn));
applyCourseFilter();
});
});
}

const HIDE_COURSE_FILTERS_IDS = new Set([
...MEDIA_BUYING_EXPERT_COLLECTION_IDS,
...CREATIVE_EXPERT_COLLECTION_IDS,
]);

function insertCourseFilters() {
if (HIDE_COURSE_FILTERS_IDS.has(currentCollectionId)) return true;
if (document.querySelector(".achievement_filters")) return true; 
const heading = document.querySelector(
".new_courses_main .u-headingsection--activity.activitysection__name"
);
const target = heading ? heading.closest("header") : null;
if (!target) return false;

target.insertAdjacentHTML("afterend", buildCourseFiltersHTML());
attachCourseFilterListeners();
applyCourseFilter();
return true;
}

if (!insertCourseFilters()) {
const filtersObserver = new MutationObserver(() => {
if (insertCourseFilters()) filtersObserver.disconnect();
});
filtersObserver.observe(document.body, { childList: true, subtree: true });
}

function hideActivitySectionHeaders() {
if (!HIDE_COURSE_FILTERS_IDS.has(currentCollectionId)) return true;
const headers = document.querySelectorAll(".new_courses_main .activitysection header");
if (!headers.length) return false;
headers.forEach((header) => {
header.style.display = "none";
});
return true;
}

if (!hideActivitySectionHeaders()) {
const headersObserver = new MutationObserver(() => {
if (hideActivitySectionHeaders()) headersObserver.disconnect();
});
headersObserver.observe(document.body, { childList: true, subtree: true });
}
});

})();

// ---- extracted script block 7 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
if (!window.location.href.includes("student/activity/3523300-tiktok-at-cannes-lions-2026")) return;
const mainTag = document.querySelector("main");
if (mainTag) mainTag.classList.add("new_get_strt_main", "cannes_main");

function insertGetStartedBanner() {
const categoryHeader = document.querySelector(".page__header");
if (!categoryHeader) return false;
if (document.querySelector(".cannes_banner")) return true; 
const sourceArticle = document.querySelector(
'.page__courses > article.pgcomponent[data-display-style="normal"]',
);
const sourceH1 = sourceArticle && sourceArticle.querySelector("h1");
if (!sourceArticle || !sourceH1) return false; // native content not rendered yet — keep retrying
const sourceP = sourceArticle.querySelector("p");

const banner = document.createElement("div");
banner.className = "cannes_banner";
banner.innerHTML = `
<div>
<h1>${sourceH1.innerHTML}</h1>
${sourceP ? `<p>${sourceP.innerHTML}</p>` : ""}
</div>
<img src="https://i.ibb.co/JjQv8nYn/Cannes-Hero-banner.png" alt="">
`;
categoryHeader.parentNode.insertBefore(banner, categoryHeader);

sourceArticle.style.display = "none";

return true;
}

if (!insertGetStartedBanner()) {
const observer = new MutationObserver(() => {
if (insertGetStartedBanner()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });
}

function insertAchivCta() {
const main = document.querySelector("main.new_get_strt_main");
if (!main) return false;
if (document.querySelector(".achiv_cta")) return true;

const cta = document.createElement("div");
cta.className = "achiv_cta";
cta.innerHTML = ctaHTML;
main.appendChild(cta);

return true;
}

if (!insertAchivCta()) {
const ctaObserver = new MutationObserver(() => {
if (insertAchivCta()) ctaObserver.disconnect();
});
ctaObserver.observe(document.body, { childList: true, subtree: true });
}
});

})();

// ---- extracted script block 8 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
if (!window.location.href.includes("student/activity/3413722-getting-started-on-tiktok")) return;

const mainTag = document.querySelector("main");
if (mainTag) mainTag.classList.add("new_get_strt_main");

const bannerHTML = `
<div>
<h1>Getting started with TikTok Ads</h1>
</div>
<img src="https://i.ibb.co/ychpmC9p/get-started-banner.png" alt="">

`;

function insertGetStartedBanner() {
const categoryHeader = document.querySelector(".page__header");
if (!categoryHeader) return false;
if (document.querySelector(".get_strt_banner")) return true;

const banner = document.createElement("div");
banner.className = "get_strt_banner";
banner.innerHTML = bannerHTML;
categoryHeader.parentNode.insertBefore(banner, categoryHeader);

return true;
}

if (!insertGetStartedBanner()) {
const observer = new MutationObserver(() => {
if (insertGetStartedBanner()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });
}

const ctaHTML = `<div class="cta_container">
<h2>Get officially certified </h2>
<p>To get officially certified by TikTok Media Buying, see details here.</p>
<a href="https://www.tiktokacademy.com/sl/c6d5c26b">Get Certified</a>
</div>`;

function insertAchivCta() {
const main = document.querySelector("main.new_get_strt_main");
if (!main) return false;
if (document.querySelector(".achiv_cta")) return true;

const cta = document.createElement("div");
cta.className = "achiv_cta";
cta.innerHTML = ctaHTML;
main.appendChild(cta);

return true;
}

if (!insertAchivCta()) {
const ctaObserver = new MutationObserver(() => {
if (insertAchivCta()) ctaObserver.disconnect();
});
ctaObserver.observe(document.body, { childList: true, subtree: true });
}
});

})();

// ---- extracted script block 9 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
const isOldAchievementsPage = window.location.href.includes("student/catalog/list?category_ids=46032-achievements");
const ACHIEVEMENTS_COLLECTION_IDS = ["3523001","3523052","3523883","3523879","3523852","3523854","3523847","3523849","3523856","3523881","3523885","3523843","3523836","3523887","3523840"];
const isNewAchievementsPage = ACHIEVEMENTS_COLLECTION_IDS.some((id) =>
window.location.href.includes("student/collection/" + id + "-achievements"),
);
if (!isOldAchievementsPage && !isNewAchievementsPage) return;

const mainTag = document.querySelector("main");
if (mainTag) mainTag.classList.add("new_achiv_main");

const bannerHTML = `<div class="banner_container">
<div> <h1>Achievements</h1> <p>Complete, achieve, and grow as a TikTok marketer.</p> </div>
<div> <img src="https://i.ibb.co/mFtGTrcg/Banner-Image.png" alt="banner-img"> </div> 
</div>`;

function insertAchievementBanner() {
const categoryHeader = document.querySelector(".categoryheader");
if (categoryHeader) {
if (document.querySelector(".new_achivement_banner")) return true;
const banner = document.createElement("div");
banner.className = "new_achivement_banner";
banner.innerHTML = bannerHTML;
categoryHeader.parentNode.insertBefore(banner, categoryHeader);
return true;
}
 
const article = document.querySelector("article.coursepage__contentmain.course");
if (!article) return false;

const existing = document.querySelector(".new_achivement_banner");
if (existing) {
if (article.firstElementChild !== existing) {
article.prepend(existing);
}
return true;
}

const banner = document.createElement("div");
banner.className = "new_achivement_banner";
banner.innerHTML = bannerHTML;
article.prepend(banner);

return true;
}

if (!insertAchievementBanner()) {
const observer = new MutationObserver(() => {
if (insertAchievementBanner()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });
}

const ACHIEVEMENT_CTA_LINKS = {"3523001":"https://www.tiktokacademy.com/sl/027c2af8","3523883":"https://www.tiktokacademy.com/sl/6e366361","3523879":"https://www.tiktokacademy.com/sl/88eea6bc","3523852":"https://www.tiktokacademy.com/sl/5a9dd7b8","3523052":"https://www.tiktokacademy.com/sl/7e3ea4a3","3523854":"https://www.tiktokacademy.com/sl/03776a54","3523847":"https://www.tiktokacademy.com/sl/37e0095b","3523849":"https://www.tiktokacademy.com/sl/aa419c2f","3523856":"https://www.tiktokacademy.com/sl/6fefeaba","3523881":"https://www.tiktokacademy.com/sl/e5451c8b","3523885":"https://www.tiktokacademy.com/sl/18fc3c71","3523843":"https://www.tiktokacademy.com/sl/3af98f06","3523836":"https://www.tiktokacademy.com/sl/76ce51fe","3523887":"https://www.tiktokacademy.com/sl/30dcf9b4","3523840":"https://www.tiktokacademy.com/sl/bae1b121"};
const matchedCollectionId = ACHIEVEMENTS_COLLECTION_IDS.find((id) =>
window.location.href.includes("student/collection/" + id + "-achievements"),
);
const achivCtaHref =
(matchedCollectionId && ACHIEVEMENT_CTA_LINKS[matchedCollectionId]) ||
"https://www.tiktokacademy.com/sl/c6d5c26b"; 
const ACHIEVEMENT_STRINGS = {
en: { all: "All Achievements", not_started: "Not Started", in_progress: "In Progress", earned: "Earned", ctaHeading: "Get officially certified", ctaDesc: "To get officially certified in TikTok Media Buying, see details here.", ctaBtn: "Get Certified", achievementEarned: "Achievement Earned", share: "Share", viewAchievement: "View Achievement", progressComplete: "{xx} complete", continueBtn: "Continue", getStarted: "Get Started" },
es: { all: "Todos los logros", not_started: "Sin empezar", in_progress: "En curso", earned: "Conseguidos", ctaHeading: "Consigue la certificación oficial", ctaDesc: "Para obtener la certificación oficial en Compra de medios de TikTok, consulta los detalles aquí.", ctaBtn: "Certifícate", achievementEarned: "Logro conseguido", share: "Compartir", viewAchievement: "Ver logro", progressComplete: "{xx} completado", continueBtn: "Continuar", getStarted: "Empezar" },
"es-419": { all: "Todos los logros", not_started: "Sin comenzar", in_progress: "En curso", earned: "Obtenidos", ctaHeading: "Obtén la certificación oficial", ctaDesc: "Para obtener la certificación oficial en TikTok Media Buying, consulta más detalles aquí.", ctaBtn: "Obtén la certificación", achievementEarned: "Logro obtenido", share: "Compartir", viewAchievement: "Ver logro", progressComplete: "{xx} completado", continueBtn: "Continuar", getStarted: "Comenzar" },
"pt-br": { all: "Todas as conquistas", not_started: "Não iniciados", in_progress: "Em andamento", earned: "Obtidos", ctaHeading: "Obtenha a certificação oficial", ctaDesc: "Para obter a certificação oficial em Compra de mídia do TikTok, veja os detalhes aqui.", ctaBtn: "Obter certificação", achievementEarned: "Conquista obtida", share: "Compartilhar", viewAchievement: "Ver conquista", progressComplete: "{xx} concluído", continueBtn: "Continuar", getStarted: "Começar" },
ko: { all: "모든 성과", not_started: "미시작", in_progress: "진행 중", earned: "달성", progressComplete: "{xx} 완료", continueBtn: "계속하기", getStarted: "시작하기" },
it: { all: "Tutti i risultati", not_started: "Non iniziati", in_progress: "In corso", earned: "Conseguiti", ctaHeading: "Ottieni la certificazione ufficiale", ctaDesc: "Per ottenere la certificazione ufficiale di Media buying su TikTok, scopri i dettagli qui.", ctaBtn: "Ottieni la certificazione", achievementEarned: "Risultato conseguito", share: "Condividi", viewAchievement: "Visualizza risultato", progressComplete: "{xx} di completamento", continueBtn: "Continua", getStarted: "Inizia" },
ar: { all: "جميع مسارات التعلُّم المُنجزة", not_started: "مسارات التعلُّم غير المُنجزة بعد", in_progress: "مسارات التعلُّم الجارية", earned: "الشهادات المُكتَسبة", ctaHeading: "احصل على شهادة اعتماد رسمية", ctaDesc: "للحصول على شهادة اعتماد رسمية في شراء الوسائط المُتعدِّدة من TikTok، اطَّلِع على التفاصيل هنا.", ctaBtn: "احصل على شهادة اعتمادك", achievementEarned: "تم الحصول على شهادة الاعتماد", share: "مشاركة", viewAchievement: "عرض شهادة الاعتماد", progressComplete: "تم إتمام {xx}", continueBtn: "متابعة", getStarted: "ابدأ الآن" },
id: { all: "Semua Pencapaian", not_started: "Belum Dimulai", in_progress: "Dalam Progres", earned: "Perolehan", ctaHeading: "Dapatkan sertifikasi resmi", ctaDesc: "Untuk mendapatkan sertifikasi resmi Media Buying TikTok, lihat detailnya di sini.", ctaBtn: "Dapatkan Sertifikasi", achievementEarned: "Perolehan Pencapaian", share: "Bagikan", viewAchievement: "Lihat Pencapaian", progressComplete: "{xx} selesai", continueBtn: "Lanjutkan", getStarted: "Mulai" },
"zh-cn": { all: "所有成就", not_started: "未开始", in_progress: "进行中", earned: "已获得", ctaHeading: "获得官方认证", ctaDesc: "若想获得 TikTok 媒体购买官方认证，在此处查看详情。", ctaBtn: "获取认证", achievementEarned: "已获得成就", share: "分享", viewAchievement: "查看成就", progressComplete: "已完成 {xx}", continueBtn: "继续", getStarted: "开始" },
"zh-tw": { all: "所有成就", not_started: "未开始", in_progress: "进行中", earned: "已获得", ctaHeading: "获得官方认证", ctaDesc: "若想获得 TikTok 媒体购买官方认证，在此处查看详情。", ctaBtn: "获取认证", achievementEarned: "已获得成就", share: "分享", viewAchievement: "查看成就", progressComplete: "已完成 {xx}", continueBtn: "繼續", getStarted: "開始" },
ja: { all: "すべての実績", not_started: "未着手", in_progress: "進行中", earned: "獲得済み", ctaHeading: "公式認定を受ける", ctaDesc: "TikTokメディアバイイングの公式認定を受けるには、こちらの詳細をご確認ください。", ctaBtn: "認定を受ける", achievementEarned: "実績を獲得しました", share: "共有", viewAchievement: "実績を表示", progressComplete: "{xx}完了", continueBtn: "続ける", getStarted: "始める" },
th: { all: "ความสำเร็จทั้งหมด", not_started: "ยังไม่ได้เริ่มดำเนินการ", in_progress: "กำลังดำเนินการอยู่", earned: "ได้รับแล้ว", ctaHeading: "รับการรับรองอย่างเป็นทางการ", ctaDesc: "โปรดดูรายละเอียดที่นี่ เพื่อดูวิธีที่จะทำให้คุณได้รับการรับรองทักษะการซื้อสื่อ TikTok อย่างเป็นทางการ", ctaBtn: "รับการรับรอง", achievementEarned: "ได้รับความสำเร็จนี้แล้ว", share: "แชร์", viewAchievement: "ดูความสำเร็จ", progressComplete: "เสร็จแล้ว {xx}", continueBtn: "ดำเนินการต่อ", getStarted: "เริ่มต้น" },
vi: { all: "Tất cả thành tích", not_started: "Chưa bắt đầu", in_progress: "Đang thực hiện", earned: "Đã đạt", ctaHeading: "Được chứng nhận chính thức", ctaDesc: "Để nhận chứng nhận chính thức về mua phương tiện truyền thông của TikTok, hãy xem thông tin chi tiết tại đây.", ctaBtn: "Nhận chứng nhận", achievementEarned: "Thành tích đã đạt được", share: "Chia sẻ", viewAchievement: "Xem thành tích", progressComplete: "Đã hoàn thành {xx}", continueBtn: "Tiếp tục", getStarted: "Bắt đầu" },
fr: { all: "Toutes les certifications", not_started: "Pas commencées", in_progress: "En cours", earned: "Obtenues", ctaHeading: "Obtenez une certification officielle", ctaDesc: "Pour obtenir la certification officielle TikTok pour l'achat de médias, consultez les détails ici.", ctaBtn: "Obtenir la certification", achievementEarned: "Certification obtenue", share: "Partager", viewAchievement: "Afficher la certification", progressComplete: "{xx} terminés", continueBtn: "Continuer", getStarted: "Commencer" },
de: { all: "Alle Erfolge", not_started: "Noch nicht gestartet", in_progress: "Gestartet", earned: "Abgeschlossen", ctaHeading: "Lass dich offiziell zertifizieren", ctaDesc: "Hier erfährst du, wie du dich offiziell als TikTok Mediabuying-Expert*in zertifizieren lassen kannst.", ctaBtn: "Jetzt zertifizieren lassen", achievementEarned: "Erfolg erreicht", share: "Teilen", viewAchievement: "Erfolg anzeigen", progressComplete: "{xx} abgeschlossen", continueBtn: "Fortsetzen", getStarted: "Loslegen" },
tr: { all: "Tüm Başarılar", not_started: "Başlanmayan", in_progress: "Devam Eden", earned: "Kazanılan", ctaHeading: "Resmî sertifika alın", ctaDesc: "Resmî TikTok Medya Satın Alma sertifikasını almak için daha fazla bilgiye buradan ulaşabilirsiniz.", ctaBtn: "Sertifika alın", achievementEarned: "Kazanılan Başarı", share: "Paylaş", viewAchievement: "Başarıyı Görüntüle", progressComplete: "{xx} tamamlandı", continueBtn: "Devam et", getStarted: "Başlayın" },
};

const ACHIEVEMENT_COLLECTION_LOCALE = {"3523001":"en","3523883":"id","3523879":"de","3523852":"es","3523052":"es-419","3523854":"fr","3523847":"it","3523849":"pt-br","3523856":"vi","3523881":"tr","3523885":"ar","3523843":"th","3523836":"ja","3523887":"zh-cn","3523840":"ko"};

function getAchievementLocale() {
if (matchedCollectionId && ACHIEVEMENT_COLLECTION_LOCALE[matchedCollectionId]) {
return ACHIEVEMENT_COLLECTION_LOCALE[matchedCollectionId];
}
const urlParams = new URLSearchParams(window.location.search);
const raw = (urlParams.get("locale") || document.documentElement.lang || "en").toLowerCase().trim();
if (ACHIEVEMENT_STRINGS[raw]) return raw;
if (raw.startsWith("pt")) return "pt-br";
if (raw.startsWith("zh-tw")) return "zh-tw";
if (raw.startsWith("zh")) return "zh-cn";
const short = raw.split("-")[0];
return ACHIEVEMENT_STRINGS[short] ? short : "en";
} 
function getAchievementStrings() {
return Object.assign({}, ACHIEVEMENT_STRINGS.en, ACHIEVEMENT_STRINGS[getAchievementLocale()] || {});
}

function buildCtaHTML() {
const s = getAchievementStrings();
return `<div class="cta_container">
<h2>${s.ctaHeading}</h2>
<p>${s.ctaDesc}</p>
<a href="${achivCtaHref}">${s.ctaBtn}</a>
</div>`;
} 
function applyCtaLabels() {
const cta = document.querySelector(".achiv_cta .cta_container");
if (!cta) return;
const s = getAchievementStrings();
const h2 = cta.querySelector("h2");
const p = cta.querySelector("p");
const a = cta.querySelector("a");
if (h2) h2.textContent = s.ctaHeading;
if (p) p.textContent = s.ctaDesc;
if (a) a.textContent = s.ctaBtn;
}

function insertAchivCta() {
const main = document.querySelector("main.new_achiv_main");
if (!main) return false;
if (document.querySelector(".achiv_cta")) return true;

const cta = document.createElement("div");
cta.className = "achiv_cta";
cta.innerHTML = buildCtaHTML();
main.appendChild(cta);

return true;
}

if (!insertAchivCta()) {
const ctaObserver = new MutationObserver(() => {
if (insertAchivCta()) ctaObserver.disconnect();
});
ctaObserver.observe(document.body, { childList: true, subtree: true });
} 
const HIDDEN_CARD_TITLES = ["Drive vehicle sales with Auto Ads"];

function hideExcludedCards() {
document
.querySelectorAll(".mediablocklist__item article.mediablock")
.forEach((article) => {
const titleEl = article.querySelector("h2");
if (!titleEl) return;

const title = titleEl.textContent.trim();
if (!HIDDEN_CARD_TITLES.includes(title)) return;

const item = article.closest(".mediablocklist__item") || article;
item.style.display = "none";
item.dataset.hiddenByTitle = "1";
});
}

hideExcludedCards();
const hiddenCardsObserver = new MutationObserver(hideExcludedCards);
hiddenCardsObserver.observe(document.body, { childList: true, subtree: true });
 
const ACHIEVEMENT_FILTER_KEYS = ["all", "not_started", "in_progress", "earned"];

let activeAchievementFilter = "all";

function buildAchievementFiltersHTML() {
const strings = ACHIEVEMENT_STRINGS[getAchievementLocale()] || ACHIEVEMENT_STRINGS.en;
return `<div class="achievement_filters">
${ACHIEVEMENT_FILTER_KEYS.map(
(key) =>
`<button type="button" class="achievement_filters__btn${key === "all" ? " active" : ""}" data-filter="${key}">${strings[key]}</button>`,
).join("")}
</div>`;
}

function applyAchievementFilterLabels() {
const strings = ACHIEVEMENT_STRINGS[getAchievementLocale()] || ACHIEVEMENT_STRINGS.en;
document.querySelectorAll(".achievement_filters__btn").forEach((btn) => {
const key = btn.dataset.filter;
if (strings[key]) btn.textContent = strings[key];
});
}

function getCardAchievementState(article) {
if (article.querySelector(".extra_fetures")) return "earned";
if (article.querySelector(".get_started_btn")) return "not_started";
if (article.querySelector(".meta_options .continue_btn")) return "in_progress";
return "unknown";
}

function applyAchievementFilter() {
 
document.querySelectorAll(".mediablocklist__item, .cardgrid__item").forEach((item) => {
if (item.dataset.hiddenByTitle === "1") return; // stays hidden regardless of filter

const article =
item.querySelector("article.mediablock") ||
item.querySelector(".activitycard");
if (!article) return;

const state = getCardAchievementState(article);
const matches =
activeAchievementFilter === "all" || state === activeAchievementFilter;
item.style.display = matches ? "" : "none";
});
}

function attachAchievementFilterListeners() {
document.querySelectorAll(".achievement_filters__btn").forEach((btn) => {
btn.addEventListener("click", () => {
activeAchievementFilter = btn.dataset.filter;
document
.querySelectorAll(".achievement_filters__btn")
.forEach((b) => b.classList.toggle("active", b === btn));
applyAchievementFilter();
});
});
}

function insertAchievementFilters() {
if (document.querySelector(".achievement_filters")) return true;

const oldTarget = document.querySelector(".filterlayout__main");
if (oldTarget) {
oldTarget.insertAdjacentHTML("beforebegin", buildAchievementFiltersHTML());
attachAchievementFilterListeners();
applyAchievementFilter();
return true;
}

const heading = document.querySelector(
".u-headingsection--activity.activitysection__name",
);
const newTarget = heading ? heading.closest("header") : document.querySelector(".activitysection");
if (!newTarget) return false;

newTarget.insertAdjacentHTML("afterend", buildAchievementFiltersHTML());
attachAchievementFilterListeners();
applyAchievementFilter();
return true;
}

if (!insertAchievementFilters()) {
const filtersObserver = new MutationObserver(() => {
if (insertAchievementFilters()) filtersObserver.disconnect();
});
filtersObserver.observe(document.body, { childList: true, subtree: true });
}

let _lastAchievementLang = document.documentElement.lang || "";
new MutationObserver(() => {
const newLang = document.documentElement.lang || "";
if (newLang === _lastAchievementLang) return;
_lastAchievementLang = newLang;
applyAchievementFilterLabels();
applyCtaLabels();
applyAchievementCardLabels();
}).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

const PROGRESS_API_URL = "https://intellum-progress-api.vercel.app/api/progress";

function getCardLink(article) {
if (article.matches && article.matches("a[href]")) return article;
return (
article.querySelector("a[href*='/student/activity/']") ||
article.closest("a[href*='/student/activity/']") ||
article.querySelector("a.activitycard[href]") ||
article.closest("a.activitycard[href]")
);
}

function getCourseIdFromCard(article) {
const a = getCardLink(article);
if (!a) return null;
const href = a.getAttribute("href");
const match = href.match(/\/student\/activity\/(\d+)/);
return match ? match[1] : null;
}

function getEnrollmentIdFromCard(article) {
const a =
article.matches && article.matches("a[data-course-enrollment-id]")
? article
: article.querySelector("a[data-course-enrollment-id]");
return a ? a.getAttribute("data-course-enrollment-id") : null;
}

function getCardHref(article) {
const a = getCardLink(article);
return a ? a.getAttribute("href") : "#";
}

function getCardTitle(article) {
const titleEl =
article.querySelector("h2") ||
article.querySelector(".mediablock__title") ||
article.querySelector("h3.activitycard__name");
return titleEl ? titleEl.textContent.trim() : "";
}

function withOpenAwardFlag(href) {
const separator = href.includes("?") ? "&" : "?";
return href + separator + "openAward=1";
}

function toCredentialUrl(href) {
if (href.includes("/student/activity/")) {
return withOpenAwardFlag(href.replace("/student/activity/", "/student/path/"));
}
return withOpenAwardFlag(href);
}

function buildAchievementBadgeHTML() {
const s = getAchievementStrings();
return `<div class="achievement_earned"><img src="https://i.ibb.co/HLS3QBF0/Check-16x16.png" /> <span class="tta_i18n_earned">${s.achievementEarned}</span></div>`;
}

function applyAchievementCardLabels() {
const s = getAchievementStrings();
document.querySelectorAll(".tta_i18n_earned").forEach((el) => { el.textContent = s.achievementEarned; });
document.querySelectorAll(".tta_i18n_share").forEach((el) => { el.textContent = s.share; });
document.querySelectorAll(".tta_i18n_view").forEach((el) => { el.textContent = s.viewAchievement; });
document.querySelectorAll(".tta_i18n_progress").forEach((el) => {
el.textContent = s.progressComplete.replace("{xx}", el.dataset.pct + "%");
});
document.querySelectorAll(".tta_i18n_continue").forEach((el) => { el.textContent = s.continueBtn; });
document.querySelectorAll(".tta_i18n_getstarted").forEach((el) => { el.textContent = s.getStarted; });
}

const linkedInAddUrlCache = {};

function extractAwardDialogUrl(html) {
const match = html.match(
/data-dialog-id="award-dialog"[^>]*data-dialog-url="([^"]+)"/,
);
return match ? match[1].replace(/&amp;/g, "&") : null;
}

function extractLinkedInAddUrl(html) {
const match =
html.match(/data-object-name="add_to_linkedin_profile"[^>]*href="([^"]+)"/) ||
html.match(/href="([^"]+)"[^>]*data-object-name="add_to_linkedin_profile"/);
return match ? match[1].replace(/&amp;/g, "&") : null;
}

async function fetchLinkedInAddUrl(courseId, coursePathUrl) {
if (linkedInAddUrlCache[courseId]) return linkedInAddUrlCache[courseId];

try {
const pageRes = await fetch(coursePathUrl, { credentials: "same-origin" });
if (!pageRes.ok) return null;
const pageHtml = await pageRes.text();

const dialogUrl = extractAwardDialogUrl(pageHtml);
if (!dialogUrl) return null;

const dialogRes = await fetch(dialogUrl, { credentials: "same-origin" });
if (!dialogRes.ok) return null;
const dialogHtml = await dialogRes.text();

const linkedInUrl = extractLinkedInAddUrl(dialogHtml);
if (linkedInUrl) linkedInAddUrlCache[courseId] = linkedInUrl;
return linkedInUrl;
} catch (_) {
return null;
}
}

function buildMetaOptionsHTML(entry, href, title) {
if (entry && entry.achieved) {
const credentialUrl = toCredentialUrl(href);
const s = getAchievementStrings();
return `<div class="extra_fetures">
<div class="share_meta">
<div class="share_btn" href="#"><span class="tta_i18n_share">${s.share}</span> <img src="https://i.ibb.co/PGWsx8ZD/Vector-21.png" />
<div class="social_btns">
<a class="linkedin_add_btn" data-object-name="add_to_linkedin_profile" target="_blank" href="${credentialUrl}" aria-label="Add to LinkedIn profile" title="Add to LinkedIn profile"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 35" aria-hidden="true" class="sharelinks__icon" focusable="false">
<g fill="currentColor" aria-hidden="true">
<path d="M33.8 34.9c1.1 0 1.9-.9 1.9-1.9V1.9c0-1.1-.9-1.9-1.9-1.9H2.7C1.6 0 .8.9.8 1.9V33c0 1.1.9 1.9 1.9 1.9h31.1z"></path>
<path d="M5.9 13.1h5.2v16.7H5.9V13.1zm2.6-8.3c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.4-3 3-3zM14.4 13.1h5v2.3h.1c.7-1.3 2.4-2.7 4.9-2.7 5.3 0 6.2 3.5 6.2 8v9.2h-5.2v-8.1c0-1.9 0-4.4-2.7-4.4s-3.1 2.1-3.1 4.3V30h-5.2V13.1z" fill="#FFF"></path>
</g>
</svg> Add to LinkedIn profile</a></div>
</div>
<a class="view_ach_btn" href="${credentialUrl}"><span class="tta_i18n_view">${s.viewAchievement}</span> <img src="https://i.ibb.co/pj2y8yMG/Chevron-Large-Right-16x16.png" /></a>
</div>
</div>`;
}

if (entry && entry.started) {
const pct = Math.round(entry.progress || 0);
const s = getAchievementStrings();
const progressText = s.progressComplete.replace("{xx}", pct + "%");
return `<div class="meta_options">
<div class="progress_bar">
<h3 class="tta_i18n_progress" data-pct="${pct}">${progressText}</h3>
<div class="progress_bg">
<div class="progress_fill" style="width:${pct}%"></div>
</div>
</div>
<a class="continue_btn tta_i18n_continue" href="${href}">${s.continueBtn}</a>
</div>`;
}

const s2 = getAchievementStrings();
return `<div class="meta_options">
<a class="continue_btn get_started_btn tta_i18n_getstarted" href="${href}">${s2.getStarted}</a>
</div>`;
}

function getAllAchievementCards() {
return document.querySelectorAll(
".mediablocklist__item article.mediablock, .cardgrid__item a.activitycard",
);
}

function getCardSummaryEl(article) {
return (
article.querySelector(".mediablock__summary") ||
article.querySelector(".activitycard__summary")
);
}

function renderFallbackMetaOptions() {
getAllAchievementCards().forEach((article) => {
if (article.dataset.progressLoaded) return;
if (article.querySelector(".meta_options")) return;

const summary = getCardSummaryEl(article);
if (!summary) return;

summary.insertAdjacentHTML(
"afterend",
buildMetaOptionsHTML(null, getCardHref(article)),
);
});
}

let progressFetchScheduled = false;
function scheduleProgressFetch() {
if (progressFetchScheduled) return;
const hasUnloaded = document.querySelector(
".mediablocklist__item article.mediablock:not([data-progress-loaded]), .cardgrid__item a.activitycard:not([data-progress-loaded])",
);
if (!hasUnloaded) return;

progressFetchScheduled = true;
setTimeout(fetchAndRenderProgress, 300);
}

function fetchAndRenderProgress() {
progressFetchScheduled = false;

const email =
window.IntellumDataLayer &&
window.IntellumDataLayer.user &&
window.IntellumDataLayer.user.code;
const isGuest = !email;

const articles = Array.from(getAllAchievementCards()).filter(
(article) => !article.dataset.progressLoaded,
);
if (!articles.length) return;

const courseIds = [];
const enrollmentIds = [];
const unresolvedTitles = [];
articles.forEach((article) => {
const cid = getCourseIdFromCard(article);
if (cid && !courseIds.includes(cid)) courseIds.push(cid);
const eid = getEnrollmentIdFromCard(article);
if (eid && !enrollmentIds.includes(eid)) enrollmentIds.push(eid);
if (!cid && !eid) {
const t = getCardTitle(article);
if (t && !unresolvedTitles.includes(t)) unresolvedTitles.push(t);
}
});
const canResolveByTitle = unresolvedTitles.length && matchedCollectionId;
if (!courseIds.length && !enrollmentIds.length && !canResolveByTitle) return;

const params = new URLSearchParams();
if (isGuest) {
if (courseIds.length) params.set("guestCourseIds", courseIds.join(","));
if (canResolveByTitle) {
params.set("guestCollectionId", matchedCollectionId);
params.set("guestTitles", unresolvedTitles.join("|||"));
}
} else {
params.set("email", email);
if (courseIds.length) params.set("courseIds", courseIds.join(","));
if (enrollmentIds.length) params.set("enrollmentIds", enrollmentIds.join(","));
if (canResolveByTitle) {
params.set("collectionId", matchedCollectionId);
params.set("titles", unresolvedTitles.join("|||"));
}
}

const url = PROGRESS_API_URL + "?" + params.toString();

fetch(url)
.then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
.then((progressMap) => {
articles.forEach((article) => {
const cid = getCourseIdFromCard(article);
const eid = getEnrollmentIdFromCard(article);
const id = cid || eid;
const href = getCardHref(article);
const title = getCardTitle(article);
const entry =
(cid && progressMap[cid]) ||
(eid && progressMap[eid]) ||
(title && progressMap[title]) ||
null;

if (entry && entry.badgeImage) {
const img =
article.querySelector(".mediablock__image") ||
article.querySelector(".activitycard__image");
if (img && img.src !== entry.badgeImage) {
img.src = entry.badgeImage;
if (img.hasAttribute("srcset")) img.removeAttribute("srcset");
}
}

const existingMeta = article.querySelector(".meta_options");
if (existingMeta) existingMeta.remove();
const existingExtra = article.querySelector(".extra_fetures");
if (existingExtra) existingExtra.remove();

const summary = getCardSummaryEl(article);
if (summary) {
summary.insertAdjacentHTML("afterend", buildMetaOptionsHTML(entry, href, title));
}

const existingBadge = article.querySelector(".achievement_earned");
if (existingBadge) existingBadge.remove();

const titleEl =
article.querySelector(".mediablock__title") ||
article.querySelector("h3.activitycard__name");
if (titleEl && entry && entry.achieved) {
titleEl.insertAdjacentHTML("afterend", buildAchievementBadgeHTML());
}

if (entry && entry.achieved && id) {
const linkedInBtn = article.querySelector(".linkedin_add_btn");
const coursePathUrl = href.includes("/student/activity/")
? href.replace("/student/activity/", "/student/path/")
: href;
if (linkedInBtn) {
fetchLinkedInAddUrl(id, coursePathUrl).then((url) => {
if (url) linkedInBtn.href = url;
});
}
} 
if (id || entry) {
article.dataset.progressLoaded = "1";
}
});

applyAchievementFilter();
})
.catch(() => {
});
}

function insertMetaOptions() {
renderFallbackMetaOptions();
scheduleProgressFetch();
applyAchievementFilter();
}

insertMetaOptions();
const metaOptionsObserver = new MutationObserver(insertMetaOptions);
metaOptionsObserver.observe(document.body, {
childList: true,
subtree: true,
attributes: true,
attributeFilter: ["data-course-enrollment-id"],
});

document.addEventListener("click", function (e) {
const shareBtn = e.target.closest(".share_btn");

if (shareBtn && !e.target.closest(".social_btns")) {
e.preventDefault();
document.querySelectorAll(".share_btn.active").forEach((btn) => {
if (btn !== shareBtn) btn.classList.remove("active");
});
shareBtn.classList.toggle("active");
return;
}

if (!e.target.closest(".share_btn")) {
document.querySelectorAll(".share_btn.active").forEach((btn) =>
btn.classList.remove("active"),
);
}
});
});

})();

// ---- extracted script block 10 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
if (!window.location.pathname.includes("/student/all_sessions")) return;
const mainTag = document.querySelector("main");
if (mainTag) mainTag.classList.add("new_webinar_main");

const bannerHTML = `<div class="banner_container webinar_page_heading">
<div> <h1>Webinars</h1> </div>
<div> <img src="https://i.ibb.co/Z96xTMJ/Webinar-Image.png" alt="banner-img"> </div>
</div>`;

function insertWebinarBanner() {
const header = document.querySelector(".main__header--events");
if (!header) return false;
if (document.querySelector(".new_achivement_banner")) return true;

const banner = document.createElement("div");
banner.className = "new_achivement_banner webinar_page_banner";
banner.innerHTML = bannerHTML;
header.parentNode.insertBefore(banner, header);

return true;
}

if (!insertWebinarBanner()) {
const observer = new MutationObserver(() => {
if (insertWebinarBanner()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });
}
});

})();

// ---- extracted script block 11 ----
(function () {

(function () {
function init() {
if (!window.location.pathname.includes("/student/all_sessions")) return;
document.body.classList.add("tta_webinars_list_page");

const heading = document.querySelector(".pageheader__heading h1");
if (heading && heading.textContent.trim() !== "See latest webinars on TikTok") {
heading.textContent = "See latest webinars on TikTok";
}

const pageheader = document.querySelector(".pageheader");
const searchCol = document.querySelector(".splitrow__column--search");
if (pageheader && searchCol && searchCol.parentElement !== pageheader) {
pageheader.appendChild(searchCol);
}

const MONTH_NAMES = {
Jan: "January", Feb: "February", Mar: "March", Apr: "April",
May: "May", Jun: "June", Jul: "July", Aug: "August",
Sep: "September", Oct: "October", Nov: "November", Dec: "December",
};
const MONTH_KEYS = Object.keys(MONTH_NAMES);

const TAG_CODE_CONFIG = {
topreach: { tag: "TOP REACH", tagColor: "#F1204A", tagTextColor: "#ffffff" },
};
function tagConfigFromCode(code) {
return (
TAG_CODE_CONFIG[code] || {
tag: code.replace(/[-_]+/g, " ").toUpperCase(),
tagColor: "#2DCCD3",
tagTextColor: "#ffffff",
}
);
}

const PROGRESS_API_URL = "https://intellum-progress-api.vercel.app/api/progress";
const resolvedTagCourseIds = new Set();

function extractCourseId(item) {
const link = item.querySelector(".session__title a");
const href = link && link.getAttribute("href");
const m = href && href.match(/\/student\/page\/(\d+)-/);
return m ? m[1] : null;
}

function fetchRealTagsFor(ids) {
if (!ids.length) return;
fetch(PROGRESS_API_URL + "?tagCourseIds=" + ids.join(","))
.then(function (r) { return r.json(); })
.then(function (data) {
const tagsByCourseId = (data && data.tags) || {};
Object.keys(tagsByCourseId).forEach(function (id) {
const codes = (tagsByCourseId[id] || []).filter(Boolean);
if (!codes.length) return; // no usable tag — show nothing
const cfg = tagConfigFromCode(codes[0]);
document
.querySelectorAll('li.session.session--index[data-tta-course-id="' + id + '"]')
.forEach(function (item) {
const content = item.querySelector(".session__content--index");
if (!content) return;
let tagEl = content.querySelector(".tta_session_tag");
if (!tagEl) {
tagEl = document.createElement("div");
tagEl.className = "tta_session_tag";
content.prepend(tagEl);
}
tagEl.textContent = cfg.tag;
tagEl.style.background = cfg.tagColor;
tagEl.style.color = cfg.tagTextColor;
});
});
})
.catch(function () { }); // network hiccup — card just shows no tag
}

function checkForNewCourseTags() {
const newIds = [];
document.querySelectorAll("li.session.session--index").forEach(function (item) {
const id = extractCourseId(item);
if (!id) return;
item.dataset.ttaCourseId = id;
if (!resolvedTagCourseIds.has(id)) {
resolvedTagCourseIds.add(id);
newIds.push(id);
}
});
fetchRealTagsFor(newIds);
}

const DATE_RE = /([A-Za-z]+),\s+([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})\s+at\s+(\d{1,2}:\d{2}\s*[AP]M)\s+to\s+(\d{1,2}:\d{2}\s*[AP]M)\s+([A-Z]{2,5})/i;

function buildDateInfo(rawText) {
const clean = rawText.replace(/ /g, " ").replace(/\s+/g, " ").trim();
const m = clean.match(DATE_RE);
if (!m) return null;
const monAbbr = m[2];
const day = m[3];
const year = m[4];
const startTime = m[5];
const tz = m[7];
const monthFull = (MONTH_NAMES[monAbbr] || monAbbr).toUpperCase();
const display = monthFull + " " + parseInt(day, 10) + " | " + startTime.trim() + " " + tz;

const monthIndex = MONTH_KEYS.indexOf(monAbbr);
let daysText = "";
if (monthIndex !== -1) {
const sessionDate = new Date(parseInt(year, 10), monthIndex, parseInt(day, 10));
const today = new Date();
today.setHours(0, 0, 0, 0);
const diffDays = Math.round((sessionDate - today) / 86400000);
if (diffDays === 0) daysText = "TODAY";
else if (diffDays === 1) daysText = "IN 1 DAY";
else if (diffDays > 1) daysText = "IN " + diffDays + " DAYS";
}
return { display, daysText };
}

function enhanceSession(item, index) {
if (item.dataset.ttaEnhanced) return;
item.dataset.ttaEnhanced = "1";

const enrollBtn = item.querySelector(".session__actionsbutton");
if (enrollBtn && enrollBtn.textContent.trim() === "Enroll") {
const isLoggedOut = document.body.classList.contains("body--logged-out");
enrollBtn.textContent = isLoggedOut ? "Log In to Enroll" : "Enroll Now";
}

if (
enrollBtn &&
enrollBtn.hasAttribute("disabled") &&
enrollBtn.textContent.trim() === "Enrolled"
) {
const titleLink = item.querySelector(".session__title a");
const sessionPageHref = titleLink && titleLink.getAttribute("href");

const unenrollBtn = document.createElement("a");
unenrollBtn.className = "button session__actionsbutton tta_unenroll_btn";
unenrollBtn.textContent = "Unenroll";
unenrollBtn.href = "#";
enrollBtn.replaceWith(unenrollBtn);

if (sessionPageHref) {
fetch(sessionPageHref, { credentials: "same-origin" })
.then((res) => (res.ok ? res.text() : null))
.then((html) => {
if (!html) return;
const match =
html.match(/id="drop_session_btn"[^>]*href="([^"]+)"/) ||
html.match(/href="([^"]+)"[^>]*id="drop_session_btn"/);
if (match) {
unenrollBtn.href = match[1].replace(/&amp;/g, "&");
unenrollBtn.setAttribute("rel", "nofollow");
unenrollBtn.setAttribute("data-method", "post");
}
})
.catch(() => { });
}
}

const dateEl = item.querySelector(".session__dates--index");
if (dateEl && !dateEl.dataset.ttaFormatted) {
const info = buildDateInfo(dateEl.textContent);
if (info) {
dateEl.dataset.ttaFormatted = "1";
dateEl.innerHTML =
'<span class="tta_session_datetext">' + info.display + "</span>" +
(info.daysText
? ' <span class="tta_session_countdown">- ' + info.daysText + "</span>"
: "");
}
}
}

function run() {
document.querySelectorAll("li.session.session--index").forEach(enhanceSession);
checkForNewCourseTags();
}

run();
const observer = new MutationObserver(run);
observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init);
} else {
init();
}
})();

})();

// ---- extracted script block 12 ----
(function () {

(function () {
function fetchRealThumbnailFromSessionsList(title) {
return new Promise((resolve) => {
function normalize(t) {
return (t || "").toLowerCase().replace(/[\[\]]/g, "").replace(/\s+/g, " ").trim();
}
const target = normalize(title);
let done = false;
const iframe = document.createElement("iframe");
iframe.style.cssText =
"position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-9999;opacity:0;pointer-events:none;border:none;";
iframe.src = "/student/all_sessions";

function finish(url) {
if (done) return;
done = true;
clearInterval(pollId);
clearTimeout(timeoutId);
try { document.body.removeChild(iframe); } catch (_) { }
resolve(url);
}

function tryExtract() {
try {
const doc = iframe.contentDocument;
if (!doc || !doc.body) return;
const cards = doc.querySelectorAll("li.session");
if (!cards.length) return;
for (const card of cards) {
const titleEl =
card.querySelector(".session__name a") || card.querySelector(".session__title");
if (!titleEl) continue;
const cardTitle = normalize(titleEl.textContent);
if (
cardTitle !== target &&
!cardTitle.includes(target.slice(0, 30)) &&
!target.includes(cardTitle.slice(0, 30))
) {
continue;
}
const imgEl = card.querySelector("img.session__image");
if (!imgEl) continue;
const src = imgEl.getAttribute("data-src") || imgEl.getAttribute("src") || "";
if (!src || src.startsWith("data:image/svg") || src.endsWith(".svg")) continue;
finish(src);
return;
}
} catch (_) { }
}

const pollId = setInterval(tryExtract, 400);
const timeoutId = setTimeout(() => finish(null), 12000);
iframe.addEventListener("load", () => {
setTimeout(tryExtract, 800);
setTimeout(() => {
try {
const win = iframe.contentWindow;
if (!win) return;
[400, 900, 1500, 2200].forEach((y, idx) => {
setTimeout(() => { try { win.scrollTo(0, y); tryExtract(); } catch (_) { } }, idx * 300);
});
} catch (_) { }
}, 1200);
});
document.body.appendChild(iframe);
});
}

function pad2(n) {
return String(n).padStart(2, "0");
}
function toIcsUTC(date) {
return (
date.getUTCFullYear() +
pad2(date.getUTCMonth() + 1) +
pad2(date.getUTCDate()) +
"T" +
pad2(date.getUTCHours()) +
pad2(date.getUTCMinutes()) +
pad2(date.getUTCSeconds()) +
"Z"
);
}

function buildCalendarMenuEl(opts, onItemSelect) {
const menu = document.createElement("div");
menu.className = "wd_add_to_calendar__menu";

const details = opts.zoomHref ? "Join Zoom Webinar: " + opts.zoomHref : "";
const startStr = toIcsUTC(opts.startUTC);
const endStr = toIcsUTC(opts.endUTC);

const googleUrl =
"https://calendar.google.com/calendar/render?action=TEMPLATE" +
"&text=" + encodeURIComponent(opts.title) +
"&dates=" + startStr + "/" + endStr +
"&details=" + encodeURIComponent(details) +
(opts.zoomHref ? "&location=" + encodeURIComponent(opts.zoomHref) : "");

const outlookUrl =
"https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent" +
"&subject=" + encodeURIComponent(opts.title) +
"&startdt=" + opts.startUTC.toISOString() +
"&enddt=" + opts.endUTC.toISOString() +
"&body=" + encodeURIComponent(details) +
(opts.zoomHref ? "&location=" + encodeURIComponent(opts.zoomHref) : "");

function buildIcsFile() {
return (
"BEGIN:VCALENDAR\r\n" +
"VERSION:2.0\r\n" +
"PRODID:-//TikTok Academy//Webinar//EN\r\n" +
"BEGIN:VEVENT\r\n" +
"UID:" + Date.now() + "@tiktokacademy.com\r\n" +
"DTSTAMP:" + toIcsUTC(new Date()) + "\r\n" +
"DTSTART:" + startStr + "\r\n" +
"DTEND:" + endStr + "\r\n" +
"SUMMARY:" + opts.title.replace(/\r?\n/g, " ") + "\r\n" +
(details ? "DESCRIPTION:" + details.replace(/\r?\n/g, "\\n") + "\r\n" : "") +
(opts.zoomHref ? "LOCATION:" + opts.zoomHref + "\r\n" : "") +
"END:VEVENT\r\n" +
"END:VCALENDAR\r\n"
);
}

const OPTIONS = [
{ label: "Google Calendar", icon: "google", href: googleUrl },
{ label: "Outlook Calendar", icon: "outlook", href: outlookUrl },
{ label: "Apple / iCal (.ics)", icon: "apple", action: "ics" },
];

OPTIONS.forEach(function (opt) {
const item = document.createElement("a");
item.className = "wd_add_to_calendar__item wd_add_to_calendar__item--" + opt.icon;
item.href = opt.href || "#";
item.innerHTML =
'<span class="wd_add_to_calendar__icon"></span><span>' + opt.label + "</span>";
if (opt.action === "ics") {
item.addEventListener("click", function (e) {
e.preventDefault();
const blob = new Blob([buildIcsFile()], { type: "text/calendar;charset=utf-8" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = opts.title.replace(/[^\w-]+/g, "_").slice(0, 60) + ".ics";
document.body.appendChild(a);
a.click();
a.remove();
setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
if (onItemSelect) onItemSelect();
});
} else {
item.target = "_blank";
item.rel = "noopener";
item.addEventListener("click", function () {
if (onItemSelect) onItemSelect();
});
}
menu.appendChild(item);
});

return menu;
}

function buildAddToCalendarControl(opts) {
const wrap = document.createElement("div");
wrap.className = "wd_add_to_calendar";

const btn = document.createElement("button");
btn.type = "button";
btn.className = "button button--primary wd_add_to_calendar__btn";
btn.textContent = "Add to Calendar";
wrap.appendChild(btn);

const menu = buildCalendarMenuEl(opts, function () {
menu.setAttribute("hidden", "");
});
menu.setAttribute("hidden", "");
wrap.appendChild(menu);

btn.addEventListener("click", function (e) {
e.stopPropagation();
if (menu.hasAttribute("hidden")) menu.removeAttribute("hidden");
else menu.setAttribute("hidden", "");
});
document.addEventListener("click", function (e) {
if (!wrap.contains(e.target)) menu.setAttribute("hidden", "");
});

return wrap;
}

function buildWdHero() {
if (!window.location.pathname.includes("/student/page/")) return true;
if (document.querySelector(".wd_hero")) return true; // already built

let heroContainer = document.querySelector(".course__fullwidthcontainer");
let heroEl = heroContainer && heroContainer.querySelector(".hero.hero--course");
const titleEl = document.querySelector(".pgheading__name");
if (!titleEl) return false; // heading not rendered yet — keep retrying

// Look up the "Choose an Upcoming Session" list item for its date/time up
// front, regardless of whether a native full-width hero container exists —
// some pages get that native container (this branch used to skip the
// session lookup entirely whenever it did, leaving the date permanently
// missing), others don't and build a synthetic container instead below.
let sessionListItem =
document.querySelector(".activitysection .session__container > li.session") ||
document.querySelector(".coursepage__sessions .session__container li.session");
const hasSessionSection = !!document.querySelector(".activitysection") ||
!!document.querySelector(".coursepage__sessions");
// The session list loads asynchronously (exceed-filter-content's own XHR),
// so on a slow/cold load it can still be empty here — keep retrying rather
// than building the hero without its date/countdown, which would then be
// stuck like that forever since nothing re-checks after this point. Pages
// with no session section at all (no upcoming-session block) skip this wait.
if (hasSessionSection && !sessionListItem) return false;
if (hasSessionSection && sessionListItem &&
!sessionListItem.querySelector("[class*='session__dates']") &&
!document.querySelector(".coursepage__sessions .session--occurrence .session__name")) {
return false; // session item exists but its date text hasn't rendered yet
}

if (!heroContainer || !heroEl) {
const pageHeader = document.querySelector(".page__header");
if (!pageHeader) return false; // native content not rendered yet — keep retrying

heroContainer = document.createElement("div");
pageHeader.parentNode.insertBefore(heroContainer, pageHeader);

heroEl = document.createElement("div");
heroEl.className = "hero hero--course";
}

const mainTag = document.querySelector("main");
if (mainTag) mainTag.classList.add("wd_details_main");

const rawTitle = titleEl.textContent.replace(/\s+/g, " ").trim();
const regionMatch = rawTitle.match(/^\[([^\]]+)\]\s*/);
const region = regionMatch ? regionMatch[1] : "";
if (regionMatch) titleEl.textContent = rawTitle.slice(regionMatch[0].length);
const cleanTitle = rawTitle.replace(/^\[([^\]]+)\]\s*/, "");

const MONTH_NAMES = {
Jan: "January", Feb: "February", Mar: "March", Apr: "April",
May: "May", Jun: "June", Jul: "July", Aug: "August",
Sep: "September", Oct: "October", Nov: "November", Dec: "December",
};
const MONTH_KEYS = Object.keys(MONTH_NAMES);
const DATE_RE = /([A-Za-z]+),\s+([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})\s+at\s+(\d{1,2}:\d{2}\s*[AP]M)\s+to\s+(\d{1,2}:\d{2}\s*[AP]M)\s+([A-Z]{2,5})/i;

const TZ_OFFSET_HOURS = {
PST: -8, PDT: -7, MST: -7, MDT: -6, CST: -6, CDT: -5, EST: -5, EDT: -4,
AKST: -9, AKDT: -8, HST: -10, GMT: 0, UTC: 0, BST: 1, WET: 0, CET: 1,
CEST: 2, EET: 2, EEST: 3, IST: 5.5, JST: 9, KST: 9, AEST: 10, AEDT: 11,
NZST: 12, NZDT: 13,
};

function parseClock(timeStr) {
const m = timeStr.trim().match(/(\d{1,2}):(\d{2})\s*([AP]M)/i);
if (!m) return null;
let h = parseInt(m[1], 10);
const min = parseInt(m[2], 10);
const ap = m[3].toUpperCase();
if (ap === "PM" && h !== 12) h += 12;
if (ap === "AM" && h === 12) h = 0;
return { h, min };
}

// Figures out which month (0-11) a locale's abbreviated month name refers
// to, without hand-maintaining a translation table ourselves — it asks the
// browser's own Intl data (the same source Intellum's UI translations
// ultimately come from) what each month's short name looks like in that
// locale, and matches against that. Punctuation-insensitive since some
// locales append a period ("Ağu." vs "Ağu").
function localeMonthIndex(monthAbbr, locale) {
if (!monthAbbr) return -1;
var norm = function (s) { return s.toLowerCase().replace(/[.\s]/g, ""); };
var target = norm(monthAbbr);
for (var m = 0; m < 12; m++) {
var label;
try {
label = new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(2024, m, 1));
} catch (e) {
return -1; // unrecognized locale tag — give up gracefully
}
if (norm(label) === target) return m;
}
return -1;
}

// Non-English locales format this date completely differently (day-first,
// 24-hour clock, different separators — e.g. Turkish "17 Eyl 2026,
// Perşembe, 13:30 - 15:00 +06" vs English "Thursday, Sep 25, 2026 at
// 2:30 AM to 3:30 AM EDT") — too varied to parse with one regex. But the
// countdown badge only needs the day/month/year, not the exact time, and
// those are available locale-independently from the session <li>'s own
// data-month/data-date attributes — so build just the countdown from
// those instead of leaving guests of every non-English page without one.
function buildFallbackDaysText(sessionListItem) {
if (!sessionListItem) return "";
var day = parseInt(sessionListItem.getAttribute("data-date"), 10);
var monthAbbr = sessionListItem.getAttribute("data-month");
if (!day || !monthAbbr) return "";
var locale = document.documentElement.lang || navigator.language || "en";
var monthIndex = localeMonthIndex(monthAbbr, locale);
if (monthIndex === -1) return "";

var today = new Date();
today.setHours(0, 0, 0, 0);
var year = today.getFullYear();
var sessionDate = new Date(year, monthIndex, day);
// Sessions are always upcoming — if that combination lands more than a
// couple months in the past, it must be early next year rather than this
// one (e.g. checking a December session's page in the following January).
if (sessionDate - today < -60 * 86400000) {
sessionDate = new Date(year + 1, monthIndex, day);
}
var diffDays = Math.round((sessionDate - today) / 86400000);
if (diffDays === 0) return "TODAY";
if (diffDays === 1) return "IN 1 DAY";
if (diffDays > 1) return "IN " + diffDays + " DAYS";
return "";
}

function buildDateInfo(rawText, sessionListItem) {
const clean = rawText.replace(/\s+/g, " ").trim();
const m = clean.match(DATE_RE);
if (!m) {
const daysText = buildFallbackDaysText(sessionListItem);
return clean ? { display: clean, daysText: daysText, startUTC: null, endUTC: null } : null;
}
const weekday = m[1];
const monAbbr = m[2];
const day = parseInt(m[3], 10);
const year = parseInt(m[4], 10);
const startTime = m[5];
const endTime = m[6];
const tz = m[7].toUpperCase();
const monthFull = MONTH_NAMES[monAbbr] || monAbbr;
const display = weekday + ", " + monthFull + " " + day + " | " + startTime.trim() + " " + tz;

const monthIndex = MONTH_KEYS.indexOf(monAbbr);
let daysText = "";
let startUTC = null;
let endUTC = null;
if (monthIndex !== -1) {
const sessionDate = new Date(year, monthIndex, day);
const today = new Date();
today.setHours(0, 0, 0, 0);
const diffDays = Math.round((sessionDate - today) / 86400000);
if (diffDays === 0) daysText = "TODAY";
else if (diffDays === 1) daysText = "IN 1 DAY";
else if (diffDays > 1) daysText = "IN " + diffDays + " DAYS";

const offsetHours = TZ_OFFSET_HOURS[tz];
const startClock = parseClock(startTime);
const endClock = parseClock(endTime);
if (offsetHours !== undefined && startClock) {
const startLocalMs = Date.UTC(year, monthIndex, day, startClock.h, startClock.min);
startUTC = new Date(startLocalMs - offsetHours * 3600000);
if (endClock) {
let endLocalMs = Date.UTC(year, monthIndex, day, endClock.h, endClock.min);
if (endLocalMs < startLocalMs) endLocalMs += 86400000; // session crosses midnight
endUTC = new Date(endLocalMs - offsetHours * 3600000);
} else {
endUTC = new Date(startUTC.getTime() + 3600000);
}
}
}
return { display, daysText, startUTC, endUTC };
}

const sessionNameEl = document.querySelector(
".coursepage__sessions .session--occurrence .session__name",
);
const sessionDateEl =
sessionListItem && sessionListItem.querySelector("[class*='session__dates']");
const dateInfo = sessionNameEl
? buildDateInfo(sessionNameEl.textContent, sessionListItem)
: sessionDateEl
? buildDateInfo(sessionDateEl.textContent, sessionListItem)
: null;

const speakerEl = Array.from(
document.querySelectorAll(".coursepage__sessions .session__metaitem"),
).find((li) => /^\s*Instructor:/i.test(li.textContent));
const speakerText = speakerEl
? speakerEl.textContent.replace(/\s+/g, " ").trim().replace(/^Instructor:\s*/i, "By ")
: "";

const actionBtn =
document.querySelector(".coursepage__sessions .session__actionsbutton") ||
(sessionListItem && sessionListItem.querySelector(".session__actionsbutton"));
if (actionBtn && actionBtn.textContent.trim() === "Enroll") {
actionBtn.textContent = "Enroll Now";
}
const isJoinZoom = !!(actionBtn && actionBtn.textContent.trim() === "Join Zoom Webinar");
const zoomHref = isJoinZoom ? actionBtn.href : "";

const left = document.createElement("div");
left.className = "wd_hero__left";
left.appendChild(titleEl);

if (dateInfo) {
const dateRow = document.createElement("div");
dateRow.className = "wd_hero__date";
dateRow.innerHTML =
'<span class="wd_hero__datetext">' + dateInfo.display + "</span>" +
(dateInfo.daysText
? ' <span class="wd_hero__countdown">- ' + dateInfo.daysText + "</span>"
: "");
left.appendChild(dateRow);
}

if (speakerText) {
const speakerRow = document.createElement("div");
speakerRow.className = "wd_hero__speaker";
speakerRow.textContent = speakerText;
left.appendChild(speakerRow);
}

if (isJoinZoom && dateInfo && dateInfo.startUTC && dateInfo.endUTC) {
left.appendChild(
buildAddToCalendarControl({
title: cleanTitle,
zoomHref: zoomHref,
startUTC: dateInfo.startUTC,
endUTC: dateInfo.endUTC,
}),
);
} else if (actionBtn) {
const enrollProxy = actionBtn.cloneNode(true);
enrollProxy.addEventListener("click", function (e) {
e.preventDefault();
actionBtn.click();
});
left.appendChild(enrollProxy);
}

const right = document.createElement("div");
right.className = "wd_hero__right";
right.appendChild(heroEl);

const hero = document.createElement("div");
hero.className = "wd_hero";
hero.appendChild(left);
hero.appendChild(right);

heroContainer.replaceWith(hero);

if (sessionListItem) {
fetchRealThumbnailFromSessionsList(rawTitle).then((url) => {
if (!url) return;
const heroBox = document.querySelector(".wd_details_main .wd_hero__right .hero.hero--course");
if (!heroBox || heroBox.querySelector("img")) return;
const img = document.createElement("img");
img.className = "hero__image";
img.src = url;
img.alt = "";
heroBox.appendChild(img);
});
}

const pgHeadings = document.querySelectorAll(".page__courses .pgpost h2");
let overviewText = "";
let learningObjectivesArticle = null;
let speakersArticle = null;
pgHeadings.forEach(function (h2) {
const label = h2.textContent.replace(/\s+/g, " ").trim().toLowerCase();
const article = h2.closest(".pgcomponent");
if (!article) return;
if (label === "overview") {
const p = article.querySelector("p");
if (p) overviewText = p.textContent.replace(/\s+/g, " ").trim();
}
if (label === "learning objectives" || label === "key takeaways") {
learningObjectivesArticle = article;
}
if (label === "speakers") speakersArticle = article;
});

if (learningObjectivesArticle && dateInfo) {
const TAG_CONFIG = [
{ keywords: ["smart+", "smart plus"], tag: "SMART+", color: "#F1204A", textColor: "#ffffff" },
{ keywords: ["trend signals", "tiktok next", "search ads"], tag: "SEARCH ADS", color: "#2DCCD3", textColor: "#ffffff" },
{ keywords: ["tiktok shop", "shop ads", "shopping", "commerce"], tag: "TIKTOK SHOP", color: "#BAF6F0", textColor: "#000000" },
{ keywords: ["apps 101", "tiktok apps", "app campaign", "gaming growth"], tag: "APP", color: "#4A0505", textColor: "#ffffff" },
{ keywords: ["lead ads", "lead gen", "lead generation", "scaling leads"], tag: "LEAD GENERATION", color: "#EDBBE8", textColor: "#000000" },
{ keywords: ["real profiles", "account identity", "security"], tag: "SECURITY", color: "#22C55E", textColor: "#ffffff" },
{ keywords: ["brand", "creative", "content", "creator", "ugc"], tag: "CREATIVE", color: "#EDBBE8", textColor: "#000000" },
];
const lowerTitle = rawTitle.toLowerCase();
const tagCfg =
TAG_CONFIG.find(function (c) {
return c.keywords.some(function (kw) { return lowerTitle.includes(kw); });
}) || { tag: "WEBINAR", color: "#2DCCD3", textColor: "#ffffff" };

const firstSentence = overviewText
? (overviewText.match(/^.*?[.!?](?=\s|$)/) || [overviewText])[0].slice(0, 220)
: "";

const eventCard = document.createElement("article");
eventCard.className = "pgcomponent wd_event_wrap";
eventCard.setAttribute("data-display-style", "normal");
eventCard.innerHTML =
'<div class="pgpost">' +
'<h2 class="wd_event_wrap__heading">Event Details</h2>' +
'<div class="wd_event_card">' +
'<div class="wd_event_card__top">' +
'<span class="wd_event_card__tag" style="background:' + tagCfg.color + ";color:" + tagCfg.textColor + ';">' + tagCfg.tag + "</span>" +
"</div>" +
'<div class="wd_event_card__actionrow"></div>' +
'<div class="wd_event_card__date"><span class="wd_event_card__datetext">' + dateInfo.display + "</span>" +
(dateInfo.daysText ? ' <span class="wd_event_card__countdown">- ' + dateInfo.daysText + "</span>" : "") +
"</div>" +
'<h3 class="wd_event_card__title"></h3>' +
(firstSentence ? '<p class="wd_event_card__desc"></p>' : "") +
"</div>" +
"</div>";

eventCard.querySelector(".wd_event_card__title").textContent = cleanTitle;
if (firstSentence) eventCard.querySelector(".wd_event_card__desc").textContent = firstSentence;

if (actionBtn) {
const enrollClone = actionBtn.cloneNode(true);
enrollClone.className = "wd_event_card__enroll";
eventCard.querySelector(".wd_event_card__top").appendChild(enrollClone);
}

learningObjectivesArticle.insertAdjacentElement("afterend", eventCard);
}

return true;
}

function init() {
if (buildWdHero()) return;

var observer = new MutationObserver(function () {
if (buildWdHero()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });

var attemptsLeft = 40;
var intervalId = setInterval(function () {
attemptsLeft--;
if (buildWdHero() || attemptsLeft <= 0) {
clearInterval(intervalId);
observer.disconnect();
}
}, 500);
}

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init);
} else {
init();
}
})();

})();

// ---- extracted script block 13 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
var params = new URLSearchParams(window.location.search);
if (params.get("openAward") !== "1") return;

var attempts = 0;
var maxAttempts = 10;

function isDialogOpen() {
var dialog = document.getElementById("award-dialog");
return !!dialog && dialog.getAttribute("aria-hidden") === "false";
}

function tryClick() {
if (isDialogOpen()) return;

attempts++;
var btn = document.querySelector(
'.enrollmentmessage__action[data-behavior="show.dialog"][data-dialog-id="award-dialog"]',
);
if (btn) btn.click();

if (attempts < maxAttempts && !isDialogOpen()) {
setTimeout(tryClick, 500);
}
}

setTimeout(tryClick, 800);
});

})();

// ---- extracted script block 14 ----
(function () {

(function () {
function checkLoginState() {
var isLoggedOut = document.body.classList.contains("body--logged-out");
console.log(
"%c[TTA] User is " + (isLoggedOut ? "LOGGED OUT" : "LOGGED IN"),
"background:" + (isLoggedOut ? "#555" : "#1a7a1a") + ";color:#fff;padding:2px 6px;border-radius:3px;"
);
}

if (document.body) {
checkLoginState();
} else {
document.addEventListener("DOMContentLoaded", checkLoginState);
}
})();

})();

// ---- extracted script block 15 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
if (
!window.location.pathname.includes(
"student/path/2815408-europe-webinar-replays",
)
)
return;

function injectSearch() {
const cardGrid =
document.querySelector(".cardgrid") ||
document.querySelector("[class*='cardgrid']") ||
document.querySelector(".path__products") ||
document.querySelector(".products");

if (!cardGrid) return false;
if (document.getElementById("tta-search-wrapper")) return true;

const wrapper = document.createElement("div");
wrapper.id = "tta-search-wrapper";

const input = document.createElement("input");
input.id = "tta-search-input";
input.type = "search";
input.placeholder = "Search webinar replays…";
input.setAttribute("aria-label", "Search webinar replays");
wrapper.appendChild(input);

const noResults = document.createElement("p");
noResults.id = "tta-no-results";
noResults.textContent = "No results found.";
noResults.style.display = "none";

cardGrid.parentNode.insertBefore(wrapper, cardGrid);
cardGrid.parentNode.insertBefore(noResults, cardGrid);

input.addEventListener("input", function () {
const query = this.value.trim().toLowerCase();

const items = Array.from(cardGrid.querySelectorAll(".cardgrid__item"));

let visibleCount = 0;
items.forEach((item) => {
const titleEl =
item.querySelector(".cardgrid__item-title") ||
item.querySelector("[class*='title']") ||
item.querySelector("h1, h2, h3, h4, h5");

const titleText = (
titleEl ? titleEl.textContent : item.textContent
).toLowerCase();
const matches = !query || titleText.includes(query);

item.style.display = matches ? "" : "none";
if (matches) visibleCount++;
});

noResults.style.display =
visibleCount === 0 && query ? "block" : "none";
});

return true;
}

if (!injectSearch()) {
const observer = new MutationObserver(() => {
if (injectSearch()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });
}
});

})();

// ---- extracted script block 16 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
const targetPages = [
{
path: "/student/activity/3382763-build-brand-love-on-tiktok",
classes: ["new_BBLove", "muse_color"],
desc: "Master the fundamentals of brand marketing on TikTok — from capturing attention to earning lasting favorability.",
image: "https://i.ibb.co/2DrtF10/Build-brand-banner.png",
},
{
path: "/student/activity/3382943-supercharge-your-creative-with-symphony",
classes: ["new_BBLove", "shimmer_color"],
desc: "Create, edit, and scale high-quality videos faster with TikTok's end-to-end AI creative platform.",
bullets: [
"Generate videos from text, images, trends and templates",
"Build at scale with Symphony Agent, an agentic way to create",
"Edit, remix, and optimize creatives all in one place",
],
image: "https://i.ibb.co/NdWH82nj/supercharg-banner.png",
buttonText: "Enroll Free",
buttonHref: "#",
footerText: "Join over 200K+ marketers and agencies",
},
{
path: "/student/activity/3382982-smart-achieve-more-with-less",
classes: ["new_BBLove", "blaze_color"],
desc: "Discover the upgraded Smart+ experience — and learn how to automate your campaigns, capture high-quality leads, and get better results with less effort.",
image:
"https://i.ibb.co/Z1BJ9yVJ/smart-achieve-more-with-less-banner.png",
},
{
path: "/student/activity/3383484-sell-more-with-tiktok-shop",
classes: ["new_BBLove", "dawn_color"],
desc: "Master the tools and strategies to grow your TikTok Shop — from automating affiliate ads to unlocking peak revenue with GMV Max.",
image: "https://i.ibb.co/NkkvRhr/sell-more-with-tiktok-shop-banner.png",
},
{
path: "/student/activity/3461396-get-started-with-creative-on-tiktok",
classes: ["new_BBLove", "shimmer_color"],
desc: "Everything you need to make content that performs — whether <br/> you prefer short trips from creator experts, a structured<br/> curriculum, or deep-dive webinars from TikTok experts.",
bullets: [
"Creator video tips",
"Structured courses",
"On-demand webinars",
],
image: "https://i.ibb.co/B29kF5TT/TIKTOK-SPARK-HALO-LOW-VOLUME512-W.png",
buttonText: "Enroll Today",
buttonHref: "#",
footerText: "",
},
{
path: "/student/activity/3611254-sign-up-for-tiktok-academy",
classes: ["new_BBLove", "crimson_color"],
useNativeContent: true,
image: "https://i.ibb.co/GfSjFfDq/Group-2036083527-1.png",
imageWidth: 784,
imageHeight: 766,
tickIconPath:
"M16.2797 6.27083C16.5213 6.0243 16.5173 5.62859 16.2707 5.38699C16.0242 5.14539 15.6285 5.14939 15.3869 5.39592L8.4106 12.5146C8.00217 12.9314 7.33108 12.9314 6.92265 12.5146L4.61301 10.1578C4.37141 9.91129 3.9757 9.9073 3.72917 10.1489C3.48264 10.3905 3.47864 10.7862 3.72024 11.0327L6.02989 13.3895C6.92844 14.3064 8.40482 14.3064 9.30336 13.3895L16.2797 6.27083Z",
tickIconViewBox: "0 0 20 20",
titleBreakAfter: "Advertising,",
},
];

const currentPath = window.location.pathname;
const matchedPage = targetPages.find((page) =>
currentPath.includes(page.path),
);

if (!matchedPage) return;

function applyClass() {
const contentMain = document.querySelector(".coursepage__contentmain");
const pageHeader = document.querySelector(".page__header");
const pageHeading = document.querySelector(".pgheading__name");

if (contentMain) contentMain.classList.add(...matchedPage.classes);
document.body.classList.add(...matchedPage.classes);

if (
pageHeader &&
pageHeading &&
!pageHeader.querySelector(".new_banner")
) {
let title = pageHeading.textContent.trim();
if (matchedPage.titleBreakAfter && title.includes(matchedPage.titleBreakAfter)) {
title = title.replace(matchedPage.titleBreakAfter, matchedPage.titleBreakAfter + "<br>");
}

let content = matchedPage;
let sourceArticle = null;

if (matchedPage.useNativeContent) {
sourceArticle = document.querySelector(
'.page__courses > article.pgcomponent[data-display-style="normal"]',
);
const pgpost = sourceArticle && sourceArticle.querySelector(".pgpost");
if (!pgpost) return; // native content not rendered yet — keep retrying

const paragraphs = Array.from(pgpost.querySelectorAll(":scope > p"));
const buttonP = paragraphs.find((p) => p.querySelector("a"));
const textParagraphs = paragraphs.filter((p) => p !== buttonP);
const ul = pgpost.querySelector(":scope > ul");
const bulletEls = ul ? Array.from(ul.querySelectorAll("li")) : [];
const btnEl = buttonP && buttonP.querySelector("a");
if (!textParagraphs.length || !bulletEls.length || !btnEl) return; // still rendering — keep retrying

content = {
desc: textParagraphs[0].innerHTML.trim(),
bullets: bulletEls.map((li) => li.innerHTML.trim()),
buttonText: btnEl.textContent.trim(),
buttonHref: btnEl.getAttribute("href") || "#",
footerText:
textParagraphs.length > 1
? textParagraphs[textParagraphs.length - 1].innerHTML.trim()
: "",
image: matchedPage.image,
};
}

if (content.bullets) {
const defaultTickPath = `M19.7562 7.60967C20.0494 7.31049 20.0446 6.83027 19.7454 6.53708C19.4462 6.24388 18.966 6.24873 18.6728 6.54791L10.2066 15.1869C9.71098 15.6926 8.89659 15.6926 8.40093 15.1869L5.59804 12.3268C5.30484 12.0276 4.82463 12.0227 4.52545 12.3159C4.22627 12.6091 4.22142 13.0893 4.51461 13.3885L7.31751 16.2486C8.40795 17.3613 10.1996 17.3613 11.2901 16.2486L19.7562 7.60967Z`;
const tickPath = matchedPage.tickIconPath || defaultTickPath;
const tickViewBox = matchedPage.tickIconViewBox || "0 0 25 25";
const tickFilled = `<svg class="tick-icon" width="20" height="20" viewBox="${tickViewBox}" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="${tickPath}" fill="black"/></svg>`;
const tickOutline = `<svg class="tick-icon" width="20" height="20" viewBox="${tickViewBox}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${tickPath}" fill="black"/></svg>`;

const bulletsHTML = content.bullets
.map((b, i) => `<li class="banner_bullet">${i === 0 ? tickFilled : tickOutline}${b}</li>`)
.join("");

const ttLogo = `<svg viewBox="0 0 60 72" xmlns="http://www.w3.org/2000/svg"><path fill="black" d="M53.6 22.8c-4.7 0-9.2-1.5-13-4.1v18.8C40.6 49.2 33 56.7 23.8 56.7S7 49.2 7 37.5s7.6-19.2 17-19.2c1.3 0 2.6.1 3.8.4v11.7c-1.2-.4-2.5-.6-3.8-.6-5.7 0-10.4 4.6-10.4 10.3s4.7 10.3 10.4 10.3 10.4-4.6 10.4-10.3V1.3H45c.9 6.6 6.4 11.5 13 11.9l.6.1z"/></svg>`;

pageHeader.innerHTML = `<div class="new_banner new_banner--featured">

<div class="content-side">
<h1 class="banner_title">${title}</h1>
<p class="banner_desc">${content.desc}</p>
<ul class="banner_bullets">${bulletsHTML}</ul>
<a class="banner_cta" href="${content.buttonHref || "#"}">${content.buttonText}</a>
<p class="banner_footer_note">${content.footerText || ""}</p>
</div>
${content.image ? `<div class="image-side"><img src="${content.image}" alt="" ${matchedPage.imageWidth ? `width="${matchedPage.imageWidth}" height="${matchedPage.imageHeight}"` : ""} fetchpriority="high" decoding="async" /></div>` : ""}
</div>`;
} else {
pageHeader.innerHTML = `<div class="new_banner">
<div class="content-side">
<h1 class="banner_title">${title}</h1>
<p class="banner_desc">${content.desc}</p>
</div>
<div class="image-side">
<img src="${content.image}" />
</div>
</div>`;
}

if (sourceArticle) sourceArticle.style.display = "none";
}

if (
contentMain &&
pageHeader &&
pageHeader.querySelector(".new_banner")
) {
observer.disconnect();
}
}

const observer = new MutationObserver(applyClass);
observer.observe(document.body, { childList: true, subtree: true });

applyClass();
});

})();

// ---- extracted script block 17 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
const targetPages = [
{ path: "/student/activity/3382763-build-brand-love-on-tiktok" },
{ path: "/student/activity/3383484-sell-more-with-tiktok-shop" },
{ path: "/student/activity/3382982-smart-achieve-more-with-less" },
{
path: "/student/activity/3382943-supercharge-your-creative-with-symphony",
},
{
path: "/student/activity/3461396-get-started-with-creative-on-tiktok",
},

];

const currentPath = window.location.pathname;
const matchedPage = targetPages.find((page) =>
currentPath.includes(page.path),
);

if (!matchedPage) return;

function getDirectChild(parent, el) {
while (el.parentNode && el.parentNode !== parent) {
el = el.parentNode;
}
return el.parentNode === parent ? el : null;
}

function groupCourseCards() {
const coursesContainer = document.querySelector(".page__courses");
if (!coursesContainer) return false;

const articles = Array.from(coursesContainer.querySelectorAll("article"));
if (!articles.length) return false;

let currentCard = null;

articles.forEach((article) => {
const style = article.getAttribute("data-display-style");
const anchor = getDirectChild(coursesContainer, article);

if (style === "normal") {
currentCard = document.createElement("div");
currentCard.className = "course_card";
coursesContainer.insertBefore(currentCard, anchor);
currentCard.appendChild(article);
} else if (style === "standard" && currentCard) {
currentCard.appendChild(article);
}

if (
anchor &&
anchor !== article &&
anchor !== currentCard &&
!anchor.hasChildNodes()
) {
anchor.remove();
}
});

return true;
}

const observer = new MutationObserver(() => {
if (groupCourseCards()) observer.disconnect();
});

observer.observe(document.body, { childList: true, subtree: true });

groupCourseCards();
});

})();

// ---- extracted script block 18 ----
(function () {

(function () {
if (!window.location.pathname.includes("3611254-sign-up-for-tiktok-academy")) return;

function init() {

function buildSeeWhatSection() {
if (document.querySelector(".see-what-learn")) return true;

var normalArticles = document.querySelectorAll(
'.page__courses > article.pgcomponent[data-display-style="normal"]',
);
var headingArticle = normalArticles[1];
if (!headingArticle) return false; // native content not rendered yet — keep retrying

var videoArticle = headingArticle.nextElementSibling;
if (
!videoArticle ||
videoArticle.getAttribute("data-display-style") !== "standard" ||
!videoArticle.querySelector("iframe")
) {
return false; // paired video block not rendered yet — keep retrying
}

var pgpost = headingArticle.querySelector(".pgpost");
var heading = pgpost && pgpost.querySelector("h2");
var desc = pgpost && pgpost.querySelector("p");
var figure = videoArticle.querySelector("figure.pgmedia");
if (!heading || !desc || !figure) return false;

var section = document.createElement("div");
section.className = "see-what-learn";

var row = document.createElement("div");
row.className = "see-what-learn__row";

var textCol = document.createElement("div");
textCol.className = "see-what-learn__text";
textCol.appendChild(heading);
textCol.appendChild(desc);

var videoCol = document.createElement("div");
videoCol.className = "see-what-learn__video";
videoCol.appendChild(figure);

row.appendChild(textCol);
row.appendChild(videoCol);
section.appendChild(row);

headingArticle.replaceWith(section);
videoArticle.remove();

return true;
}

if (buildSeeWhatSection()) return;

var observer = new MutationObserver(function () {
if (buildSeeWhatSection()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });

var attemptsLeft = 40;
var intervalId = setInterval(function () {
attemptsLeft--;
if (buildSeeWhatSection() || attemptsLeft <= 0) {
clearInterval(intervalId);
observer.disconnect();
}
}, 500);
}

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init);
} else {
init();
}
})();

})();

// ---- extracted script block 19 ----
(function () {

(function () {
if (!window.location.pathname.includes("3611254-sign-up-for-tiktok-academy")) return;

function init() {

function buildWhatYouLearnSection() {
if (document.querySelector(".what-you-learn")) return true;

var seeWhatEl = document.querySelector(".see-what-learn");
if (!seeWhatEl) return false; // "See what you'll learn" not built yet — keep retrying

var headingArticle = seeWhatEl.nextElementSibling;
if (!headingArticle || headingArticle.getAttribute("data-display-style") !== "normal") {
return false; // native content not rendered yet — keep retrying
}

var pgpost = headingArticle.querySelector(".pgpost");
var heading = pgpost && pgpost.querySelector("h2");
var desc = pgpost && pgpost.querySelector("p");
var pillsList = pgpost && pgpost.querySelector("ul");
if (!heading || !desc || !pillsList) return false;

var cardArticles = [];
var sib = headingArticle.nextElementSibling;
while (
sib &&
sib.getAttribute("data-display-style") === "standard" &&
sib.querySelector(".pgresource")
) {
cardArticles.push(sib);
sib = sib.nextElementSibling;
}
if (cardArticles.length < 3) return false; // not all 3 cards rendered yet — keep retrying

var section = document.createElement("div");
section.className = "what-you-learn";

var header = document.createElement("div");
header.className = "what-you-learn__header";
header.appendChild(heading);
header.appendChild(desc);
pillsList.className = "what-you-learn__pills";
header.appendChild(pillsList);
section.appendChild(header);

var cardsGrid = document.createElement("div");
cardsGrid.className = "what-you-learn__cards";
cardArticles
.slice()
.reverse()
.forEach(function (article) {
var card = article.querySelector("exceed-request-trigger-on-action") || article.querySelector(".pgresource");
if (card) cardsGrid.appendChild(card);
});
section.appendChild(cardsGrid);

headingArticle.replaceWith(section);
cardArticles.forEach(function (article) {
if (article.parentNode) article.remove();
});

stripTruncateOnSmallScreens();

return true;
}

function stripTruncateOnSmallScreens() {
if (window.innerWidth > 900) return;
document
.querySelectorAll(".what-you-learn__cards .pgresource__description[data-behavior='truncate']")
.forEach(function (p) {
p.removeAttribute("data-behavior");
});
}

window.addEventListener("resize", stripTruncateOnSmallScreens);

if (buildWhatYouLearnSection()) return;

var observer = new MutationObserver(function () {
if (buildWhatYouLearnSection()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });

var attemptsLeft = 40;
var intervalId = setInterval(function () {
attemptsLeft--;
if (buildWhatYouLearnSection() || attemptsLeft <= 0) {
clearInterval(intervalId);
observer.disconnect();
}
}, 500);
}

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init);
} else {
init();
}
})();

})();

// ---- extracted script block 20 ----
(function () {

(function () {
if (!window.location.pathname.includes("3611254-sign-up-for-tiktok-academy")) return;

function init() {

function buildGuessworkCta() {
if (document.querySelector(".cta-guesswork")) return true;

var whatYouLearnEl = document.querySelector(".what-you-learn");
if (!whatYouLearnEl) return false; // "What you'll learn" not built yet — keep retrying

var article = whatYouLearnEl.nextElementSibling;
if (!article || article.getAttribute("data-display-style") !== "normal") {
return false; // native content not rendered yet — keep retrying
}

var pgpost = article.querySelector(".pgpost");
var heading = pgpost && pgpost.querySelector("h2");
var ctaLink = pgpost && pgpost.querySelector("a.banner_cta");
if (!heading || !ctaLink) return false;

article.classList.add("cta-guesswork");
return true;
}

if (buildGuessworkCta()) return;

var observer = new MutationObserver(function () {
if (buildGuessworkCta()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });

var attemptsLeft = 40;
var intervalId = setInterval(function () {
attemptsLeft--;
if (buildGuessworkCta() || attemptsLeft <= 0) {
clearInterval(intervalId);
observer.disconnect();
}
}, 500);
}

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init);
} else {
init();
}
})();

})();

// ---- extracted script block 21 ----
(function () {

(function () {
if (!window.location.pathname.includes("3611254-sign-up-for-tiktok-academy")) return;

function init() {

function buildHeaderEnrollBtn() {
if (document.querySelector(".tta-header-enroll-btn")) return true;

var bannerCta = document.querySelector(".new_banner .banner_cta");
if (!bannerCta) return false; // banner not built yet — keep retrying

var loginBtn = document.querySelector("button.button--appheader");
var headerSection = loginBtn && loginBtn.closest(".appheader__section");
if (!headerSection || !loginBtn) return false; // native header not rendered yet — keep retrying

var enrollBtn = document.createElement("a");
enrollBtn.className = "tta-header-enroll-btn";
enrollBtn.href = bannerCta.getAttribute("href") || "#";
enrollBtn.textContent = "Enroll Free";
headerSection.appendChild(enrollBtn);

return true;
}

if (buildHeaderEnrollBtn()) return;

var observer = new MutationObserver(function () {
if (buildHeaderEnrollBtn()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });

var attemptsLeft = 40;
var intervalId = setInterval(function () {
attemptsLeft--;
if (buildHeaderEnrollBtn() || attemptsLeft <= 0) {
clearInterval(intervalId);
observer.disconnect();
}
}, 500);
}

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init);
} else {
init();
}
})();

})();

// ---- extracted script block 22 ----
(function () {

(function () {
if (!window.location.pathname.includes("3611254-sign-up-for-tiktok-academy")) return;

function init() {

function patchLoginRedirect() {
var btn =
document.querySelector('button.button--appheader[data-dialog-id="public-login-dialog"]') ||
document.querySelector('[data-dialog-id="public-login-dialog"]');
if (!btn) return false; // header not rendered yet — keep retrying

var url = btn.getAttribute("data-dialog-url");
if (!url) return false; // dialog-url not rendered yet — keep retrying

if (btn.dataset.ttaRedirectPatched) return true;

try {
var urlObj = new URL(url, window.location.origin);
urlObj.searchParams.set("destination_path", "/student/catalog");
btn.setAttribute("data-dialog-url", urlObj.pathname + urlObj.search);
} catch (e) { }

btn.dataset.ttaRedirectPatched = "1";
return true;
}

if (patchLoginRedirect()) return;

var observer = new MutationObserver(function () {
if (patchLoginRedirect()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });

var attemptsLeft = 40;
var intervalId = setInterval(function () {
attemptsLeft--;
if (patchLoginRedirect() || attemptsLeft <= 0) {
clearInterval(intervalId);
observer.disconnect();
}
}, 500);
}

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init);
} else {
init();
}
})();

})();

// ---- extracted script block 23 ----
(function () {

(function () {
if (!window.location.pathname.includes("3611254-sign-up-for-tiktok-academy")) return;

function init() {

// Feathery's registration form completes with a full-page navigation back
// to the Referer (this activity page), ignoring destination_path on that
// hop entirely. We can't control that server-side redirect, so instead we
// mark "a registration is in flight" before the user leaves, and if we land
// back here already logged in, we finish the redirect ourselves.
var PENDING_KEY = "ttaPendingCatalogRedirect";

function markPendingRegistration(link) {
if (!link || link.dataset.ttaPendingBound) return;
link.dataset.ttaPendingBound = "1";
link.addEventListener("click", function () {
try { sessionStorage.setItem(PENDING_KEY, "1"); } catch (e) { }
});
}

function consumePendingRegistrationRedirect() {
var loggedOut = document.body.classList.contains("body--logged-out");
if (loggedOut) return false; // still a guest — registration hasn't completed yet

var pending;
try { pending = sessionStorage.getItem(PENDING_KEY); } catch (e) { pending = null; }
if (!pending) return false;

try { sessionStorage.removeItem(PENDING_KEY); } catch (e) { }
window.location.replace("https://www.tiktokacademy.com/student/catalog");
return true;
}

function patchHeaderBanner() {
var title = document.querySelector(".new_banner .banner_title");
var cta = document.querySelector(".new_banner .banner_cta");
if (!title || !cta) return false; // banner not built yet — keep retrying
if (title.dataset.ttaLoggedInApplied) return true;

title.innerHTML = "Welcome to TikTok Academy";
cta.textContent = "Visit Now";
cta.setAttribute("href", "https://www.tiktokacademy.com/student/catalog");

var desc = document.querySelector(".new_banner .banner_desc");
if (desc) desc.style.display = "none";
var bullets = document.querySelector(".new_banner .banner_bullets");
if (bullets) bullets.style.display = "none";
var footerNote = document.querySelector(".new_banner .banner_footer_note");
if (footerNote) footerNote.style.display = "none";

title.dataset.ttaLoggedInApplied = "1";
return true;
}

function patchGuessworkCta() {
var section = document.querySelector(".cta-guesswork");
if (!section) return false; // section not built yet — keep retrying

var heading = section.querySelector("h2");
var cta = section.querySelector(".banner_cta");
if (!heading || !cta) return false;
if (heading.dataset.ttaLoggedInApplied) return true;

heading.textContent = "Welcome to TikTok Academy";

var desc = Array.from(section.querySelectorAll("p")).find(function (p) {
return !p.querySelector("a");
});
if (desc) desc.style.display = "none";

cta.textContent = "Visit Now";
cta.setAttribute("href", "https://www.tiktokacademy.com/student/catalog");

heading.dataset.ttaLoggedInApplied = "1";
return true;
}

function patchWhatYouLearnLinks() {
var links = document.querySelectorAll(".what-you-learn__cards a.pgresource");
if (!links.length) return false; // cards not built yet — keep retrying

var loggedOut = document.body.classList.contains("body--logged-out");
var registerUrl = "https://www.tiktokacademy.com/student/authentication/register?destination_path=%2Fstudent%2Fcatalog";

links.forEach(function (link) {
if (!link.dataset.ttaRealHref) {
link.dataset.ttaRealHref = link.getAttribute("href");
}
if (loggedOut) {
link.setAttribute("href", registerUrl);
link.setAttribute("referrerpolicy", "no-referrer");
markPendingRegistration(link);
} else {
link.setAttribute("href", link.dataset.ttaRealHref);
link.removeAttribute("referrerpolicy");
}
});

return true;
}

function patchRegisterDestination() {
if (!document.body.classList.contains("body--logged-out")) return true; // only guests hit the register link

var targets = [
document.querySelector(".new_banner .banner_cta"),
document.querySelector(".cta-guesswork .banner_cta"),
document.querySelector(".tta-header-enroll-btn"),
];

var allFound = true;
targets.forEach(function (link) {
if (!link) { allFound = false; return; } // not rendered yet — keep retrying
var href = link.getAttribute("href") || "";
if (href.indexOf("/student/authentication/register") === -1) return; // not a register link — leave as-is
if (link.dataset.ttaDestPatched) return;
var separator = href.indexOf("?") === -1 ? "?" : "&";
link.setAttribute("href", href + separator + "destination_path=%2Fstudent%2Fcatalog");
link.setAttribute("referrerpolicy", "no-referrer");
link.dataset.ttaDestPatched = "1";
markPendingRegistration(link);
});

return allFound;
}

function applyLoggedInBanner() {
if (consumePendingRegistrationRedirect()) return true; // navigating away — stop touching this page

var linksDone = patchWhatYouLearnLinks();
var registerDone = patchRegisterDestination();

if (document.body.classList.contains("body--logged-out")) {
console.log("[TTA] banner override: logged out — leaving native content as-is");
return linksDone && registerDone; // logged out — leave native content untouched
}

var bannerDone = patchHeaderBanner();
var ctaDone = patchGuessworkCta();

if (bannerDone && ctaDone) {
console.log("[TTA] banner override: applied logged-in heading/CTA to both sections");
}

return bannerDone && ctaDone && linksDone && registerDone;
}

if (applyLoggedInBanner()) return;

var observer = new MutationObserver(function () {
if (applyLoggedInBanner()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });

var attemptsLeft = 40;
var intervalId = setInterval(function () {
attemptsLeft--;
if (applyLoggedInBanner() || attemptsLeft <= 0) {
clearInterval(intervalId);
observer.disconnect();
}
}, 500);
}

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init);
} else {
init();
}
})();

})();

// ---- extracted script block 24 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
var WEBINAR_BANNER_PAGES = [
{
match: "/student/collection/3587660-webinars-on-demand",
heading: "Webinar<br/>On-Demand",
image: "https://i.ibb.co/S4D70SNz/Group-1000007094.png",
},
];

var matched = WEBINAR_BANNER_PAGES.find(function (p) {
return window.location.pathname.includes(p.match);
});
if (!matched) return;

var mainTag = document.querySelector("main");
if (mainTag) mainTag.classList.add("wod_main");

function insertBanner() {
if (document.querySelector(".wod_banner")) return true;
var headerContainer = document.querySelector(".course__headercontainer");
if (!headerContainer) return false; // native content not rendered yet — keep retrying

var banner = document.createElement("div");
banner.className = "wod_banner";
banner.innerHTML =
'<h1>' + matched.heading + '</h1>' +
'<img src="' + matched.image + '" alt="">';
headerContainer.parentNode.insertBefore(banner, headerContainer);

return true;
}

if (!insertBanner()) {
var observer = new MutationObserver(function () {
if (insertBanner()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });
}
});

})();

// ---- extracted script block 25 ----
(function () {

(function () {
var FONT_PAGES = [
"/student/activity/3382763-build-brand-love-on-tiktok",
"/student/activity/3382943-supercharge-your-creative-with-symphony",
"/student/activity/3382982-smart-achieve-more-with-less",
"/student/activity/3383484-sell-more-with-tiktok-shop",
"/student/activity/3461396-get-started-with-creative-on-tiktok",
"/student/activity/3611254-sign-up-for-tiktok-academy",
"/student/activity/3413722-getting-started-on-tiktok",
"/student/collection/3523001-achievements",
"/student/collection/3587660-webinars-on-demand",
"/student/all_sessions",
"/student/all_sessionsstudent/collection/2079614-courses",
"/student/all_sessionsstudent/collection/2592070-kursus",

];

function loadTikTokFont() {
if (!document.querySelector("#tiktok-font")) {
var pre1 = document.createElement("link");
pre1.rel = "preconnect";
pre1.href = "https://fonts.googleapis.com";
document.head.appendChild(pre1);

var pre2 = document.createElement("link");
pre2.rel = "preconnect";
pre2.href = "https://fonts.gstatic.com";
pre2.crossOrigin = "anonymous";
document.head.appendChild(pre2);

var fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.id = "tiktok-font";
fontLink.href =
"https://fonts.googleapis.com/css2?family=TikTok+Sans:opsz,wght@12..36,300..900&display=swap";
document.head.appendChild(fontLink);
}
}

var ACHIEVEMENTS_COLLECTION_IDS = ["3523001","3523052","3523883","3523879","3523852","3523854","3523847","3523849","3523856","3523881","3523885","3523843","3523836","3523887","3523840"];
var ACHIEVEMENTS_PAGE_URLS = ["student/catalog/list?category_ids=46032-achievements"].concat(
ACHIEVEMENTS_COLLECTION_IDS.map(function (id) {
return "student/collection/" + id + "-achievements";
}),
);

function checkAndLoad() {
var path = window.location.pathname;
var match =
FONT_PAGES.some(function (p) {
return path === p;
}) ||
ACHIEVEMENTS_PAGE_URLS.some(function (p) {
return window.location.href.includes(p);
}) ||
path.includes("/student/page/") ||
// Live-events pages can carry a "-slug" suffix after the numeric id
// (e.g. "/student/live_events/3649052-apps-gaming-on-tiktok"), so a
// strict FONT_PAGES equality check would miss them — match loosely
// instead, same as every other "live_events/3649052" gate in this file.
path.includes("live_events/3649052");
if (match) loadTikTokFont();
}

checkAndLoad();

var lastFontUrl = location.href;
function initFontUrlWatcher() {
new MutationObserver(function () {
if (location.href !== lastFontUrl) {
lastFontUrl = location.href;
checkAndLoad();
}
}).observe(document.body, { childList: true, subtree: true });
}
// document.body doesn't exist yet if this custom code is injected into
// <head> — wait for DOMContentLoaded in that case instead of crashing on
// observer.observe(null, ...), which would silently stop this whole
// re-check-on-navigation mechanism.
if (document.body) {
initFontUrlWatcher();
} else {
document.addEventListener("DOMContentLoaded", initFontUrlWatcher);
}
})();

})();

// ---- extracted script block 26 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
const targetPages = [
{ path: "student/activity/3413722-getting-started-on-tiktok" },
{ path: "student/activity/3523301-tiktok-at-cannes-lions-2026" },
{ path: "student/activity/3523300-tiktok-at-cannes-lions-2026" },
];

const currentPath = window.location.pathname;
const matchedPage = targetPages.find((page) =>
currentPath.includes(page.path),
);

if (!matchedPage) return;

const contentMain = document.querySelector(".coursepage__contentmain");
if (contentMain) {
contentMain.classList.add("gstt_new");
}

const header = document.querySelector(".page__header");

function groupArticles() {
const coursesContainer = document.querySelector(".page__courses");
if (!coursesContainer) return false;

if (coursesContainer.querySelector(".articles-grid")) return true;

const articles = Array.from(coursesContainer.querySelectorAll("article"));
if (!articles.length) return false;

let standardGroup = [];

function flushGroup() {
if (!standardGroup.length) return;
const grid = document.createElement("div");
grid.className = "articles-grid";
coursesContainer.insertBefore(grid, standardGroup[0]);
standardGroup.forEach((article) => grid.appendChild(article));
standardGroup = [];
}

articles.forEach((article) => {
if (article.getAttribute("data-display-style") === "standard") {
standardGroup.push(article);
} else {
flushGroup();
}
});

flushGroup();

return true;
}

function fixTruncatedDescriptions() {
document
.querySelectorAll(".page__courses p.pgresource__description")
.forEach((p) => {
const lastLineEl = p.querySelector(".truncate__lastline");
const overflowEl = p.querySelector(".truncate__overflow");

let fullText;
if (lastLineEl || overflowEl) {
const prefixText = Array.from(p.childNodes)
.filter((n) => n.nodeType === Node.TEXT_NODE)
.map((n) => n.textContent)
.join("")
.trim();
const lastLineText = lastLineEl ? lastLineEl.textContent.trim() : "";
const overflowText = overflowEl ? overflowEl.textContent.trim() : "";
const head = lastLineText.length >= prefixText.length ? lastLineText : prefixText;
fullText = (head + " " + overflowText).replace(/\s+/g, " ").trim();
} else if (p.getAttribute("data-behavior") === "truncate") {
fullText = p.textContent.replace(/\s+/g, " ").trim();
} else {
return; // already fixed on a previous pass, or never used truncate
}

const speakerMatch = fullText.match(/\s*\[([^\]]+)\]\s*\[([^\]]+)\]\s*$/);
const descText = speakerMatch ? fullText.slice(0, speakerMatch.index).trim() : fullText;

p.textContent = descText;
p.removeAttribute("data-behavior");
p.classList.add("tta_desc_clamped");

if (speakerMatch) {
const wrap = document.createElement("div");
wrap.className = "tta_desc_speaker";
wrap.innerHTML =
'<p class="tta_desc_speaker__name"></p><p class="tta_desc_speaker__role"></p>';
wrap.querySelector(".tta_desc_speaker__name").textContent = speakerMatch[1].trim();
wrap.querySelector(".tta_desc_speaker__role").textContent = speakerMatch[2].trim();
p.insertAdjacentElement("afterend", wrap);
}
});
}

const observer = new MutationObserver(() => {
groupArticles();
fixTruncatedDescriptions();
});

observer.observe(document.body, { childList: true, subtree: true });

groupArticles();
fixTruncatedDescriptions();
});

})();

// ---- extracted script block 27 ----
(function () {

(function () {
if (!window.location.pathname.includes("3413722-getting-started-on-tiktok")) return;

var TITLES = {
"5431669": "Setting up your TikTok Accounts, Business Center & Ads Manager",
"5431670": "Choosing your advertising objective"
};

function fixTitles() {
Object.keys(TITLES).forEach(function (id) {
document.querySelectorAll('a[href*="activity/' + id + '"]').forEach(function (link) {
var titleEl = link.querySelector(".pgresource__title") ||
link.querySelector("h3") ||
link.querySelector("h2");
if (titleEl && titleEl.textContent.trim() !== TITLES[id]) {
titleEl.textContent = TITLES[id];
}
});
});
}

var mo = new MutationObserver(fixTitles);
mo.observe(document.body, { childList: true, subtree: true });

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", fixTitles);
} else {
fixTitles();
}
})();

})();

// ---- extracted script block 28 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
const is3325733 = window.location.href.includes(
"/student/live_events/3325733",
);
const is3325732 = window.location.href.includes(
"/student/live_events/3325732",
);
const is3369994 = window.location.href.includes(
"/student/live_events/3369994",
);

if (!is3325733 && !is3369994 && !is3325732) return;

const pre1 = document.createElement("link");
pre1.rel = "preconnect";
pre1.href = "https://fonts.googleapis.com";
document.head.appendChild(pre1);

const pre2 = document.createElement("link");
pre2.rel = "preconnect";
pre2.href = "https://fonts.gstatic.com";
pre2.crossOrigin = "anonymous";
document.head.appendChild(pre2);

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
"https://fonts.googleapis.com/css2?family=TikTok+Sans:opsz,wght@12..36,300..900&display=swap";
document.head.appendChild(fontLink);

const style = document.createElement("style");
style.innerHTML = `* { font-family: 'TikTok Sans', sans-serif !important; }`;
document.head.appendChild(style);

const observer = new MutationObserver(() => {
const sections = document.querySelectorAll(
'[class*="videoAgendaSection-module-container"]',
);

if (sections.length) {
let allProcessed = true;

sections.forEach((section) => {
if (section.dataset.processed === "true") return;

const dateEl = section.querySelector(
'[class*="videoAgendaSection-module-date"]:not(.custom-date)',
);
const items = section.querySelectorAll(
'[class*="videoAgendaSectionItem-module-container"]',
);

const links = {
apac: "https://www.tiktokacademy.com/student/activity/3315974-tiktok-world-2026-global-broadcast-apac",
eui: "https://www.tiktokacademy.com/student/activity/3386174-tiktok-world-2026-global-broadcast-eui-metap",
na: "https://www.tiktokacademy.com/student/activity/3386212-tiktok-world-2026-global-broadcast-na",
};

function getLinkForItem(item) {
const nameEl = item.querySelector(
'[class*="videoAgendaSectionItem-module-noBottomMargin"]',
);
const name = nameEl ? nameEl.textContent.toLowerCase() : "";
if (name.includes("asia") || name.includes("pacific"))
return links.apac;
if (
name.includes("europe") ||
name.includes("middle east") ||
name.includes("africa")
)
return links.eui;
if (name.includes("america")) return links.na;
return "#";
}

items.forEach((item, index) => {
const now = new Date();

if (!dateEl) return;

const cleanDate = dateEl.textContent
.replace(/^[A-Za-z]+,\s*/, "")
.trim();

const timeEl = item.querySelector(
'[class*="uikitContentTypo-module-isVariantBody02"]',
);
if (!timeEl) return;

const timeText = timeEl.textContent.trim();
const match = timeText.match(
/(\d{1,2}:\d{2}\s?[AP]M)\s*—\s*(\d{1,2}:\d{2}\s?[AP]M)(?:\s*(GMT[+-]\d+))?/,
);
if (!match) return;

const startTime = match[1];
const endTime = match[2];
const tz = match[3] || "";

function buildLocalDate(dateStr, timeStr, timezone) {
return new Date(`${dateStr} ${timeStr} ${timezone}`);
}

const startDateTime = new Date("May 01, 2026 12:00 PM GMT-7");
const endDateTime = new Date("December 01, 2026 3:21 PM GMT-7");

if (isNaN(startDateTime) || isNaN(endDateTime)) return;

const diffMs = startDateTime - now;

console.log(`[item ${index}] raw time text: "${timeText}"`);
console.log(
`[item ${index}] parsed start: ${startDateTime.toISOString()} | end: ${endDateTime.toISOString()}`,
);
console.log(`[item ${index}] now: ${now.toISOString()}`);
console.log(
`[item ${index}] button in: ${Math.round(diffMs / 1000)}s`,
);

if (now < startDateTime) {
item.classList.add("item-before-launch");
setTimeout(() => {
item.classList.remove("item-before-launch");
item.classList.add("item-after-launch");
if (!item.querySelector(".launch-btn-wrapper")) {
const btnWrapper = document.createElement("div");
btnWrapper.className = "launch-btn-wrapper";
const anchor = document.createElement("a");
anchor.href = getLinkForItem(item);
anchor.textContent = "Launch";
btnWrapper.appendChild(anchor);
const contentWrapper = item.firstElementChild;
if (contentWrapper) contentWrapper.appendChild(btnWrapper);
}
const customDate = item.querySelector(".custom-date");
if (customDate) {
const text = customDate.textContent;
const comma = text.indexOf(",");
if (comma !== -1) {
customDate.dataset.original = text;
customDate.innerHTML =
text.slice(0, comma + 1) +
"<br>" +
text.slice(comma + 1).trim();
}
}
setTimeout(() => {
item.classList.remove("item-after-launch");
item.classList.add("item-after-launch-ended");
const btn = item.querySelector(".launch-btn-wrapper");
if (btn) btn.remove();
const cd = item.querySelector(".custom-date");
if (cd && cd.dataset.original)
cd.textContent = cd.dataset.original;
}, endDateTime - startDateTime);
}, diffMs);
return;
}

item.classList.remove(
"item-before-launch",
"item-after-launch",
"item-after-launch-ended",
);

const existingBtn = item.querySelector(".launch-btn-wrapper");
if (existingBtn) existingBtn.remove();

if (now > endDateTime) {
item.classList.add("item-after-launch-ended");
return;
}

item.classList.add("item-after-launch");

setTimeout(() => {
item.classList.remove("item-after-launch");
item.classList.add("item-after-launch-ended");
const btn = item.querySelector(".launch-btn-wrapper");
if (btn) btn.remove();
const cd = item.querySelector(".custom-date");
if (cd && cd.dataset.original)
cd.textContent = cd.dataset.original;
}, endDateTime - now);

if (item.querySelector(".launch-btn-wrapper")) return;

const btnWrapper = document.createElement("div");
btnWrapper.className = "launch-btn-wrapper";

const anchor = document.createElement("a");
anchor.href = getLinkForItem(item);
anchor.textContent = "Launch";

btnWrapper.appendChild(anchor);

const contentWrapper = item.firstElementChild;
if (contentWrapper) contentWrapper.appendChild(btnWrapper);
});

if (!dateEl || !items.length) {
allProcessed = false;
return;
}

items.forEach((item) => {
const titleEl = item.querySelector(
'[class*="videoAgendaSectionItem-module-title"]',
);

item.querySelectorAll("div").forEach((div) => {
const p = div.firstElementChild;
if (
p &&
p.tagName === "P" &&
p.textContent.trim() === "" &&
div.children.length === 1
) {
div.remove();
}
});

if (titleEl && !item.querySelector(".custom-date")) {
const clonedDate = dateEl.cloneNode(true);
clonedDate.classList.add("custom-date");
titleEl.insertAdjacentElement("beforebegin", clonedDate);

if (item.classList.contains("item-after-launch")) {
const text = clonedDate.textContent;
const comma = text.indexOf(",");
if (comma !== -1) {
clonedDate.dataset.original = text;
clonedDate.innerHTML =
text.slice(0, comma + 1) +
"<br>" +
text.slice(comma + 1).trim();
}
}
}
});

dateEl.remove();
section.dataset.processed = "true";
});

const agendaTitle = document.querySelector(
'[class*="videoAgenda-module-title"]',
);
if (
agendaTitle &&
agendaTitle.textContent.trim().toLowerCase() === "agenda"
) {
agendaTitle.textContent = "Schedule";
}
}

if (is3325733 || is3325732) {
const header = document.querySelector('[class*="video-module-header"]');
if (header) header.style.display = "none";
}

const contentParent = document.querySelector(
'[class*="videoContent-module-container"]',
);
if (contentParent) {
if (!contentParent.classList.contains("main-content-style")) {
contentParent.classList.add("main-content-style");
}

const desc = contentParent.querySelector(
'[class*="videoContentInformation-module-description"]',
);
if (desc && !desc.closest(".flex-div")) {
const wrapper = document.createElement("div");
wrapper.className = "flex-div";
desc.parentNode.insertBefore(wrapper, desc);
wrapper.appendChild(desc);

const section = document.createElement("section");
section.innerHTML = `<div class="extra-container"><img src="https://i.ibb.co/1G5zvLbX/Group-2085663640.png"></div>`;
wrapper.appendChild(section);
}
}

const videoParent = document.querySelector(
'[class*="video-module-container"]',
);

if (videoParent) {
const countdown = videoParent.querySelector(
'[class*="videoCountdown-module-container"]',
);
if (
countdown &&
!countdown.classList.contains("countdown-section-style")
) {
countdown.classList.add("countdown-section-style");
}
}

if (videoParent && !videoParent.querySelector(".hero-section-style")) {
const breadcrumbs = videoParent.querySelector(
'[class*="video-module-breadcrumbs"]',
);
if (breadcrumbs) breadcrumbs.style.display = "none";

const section = document.createElement("section");
section.innerHTML = `
<div class="hero-section-style">
<div class="inner-left">
<img src="https://i.ibb.co/fVYwFqXx/Group-2085663574.png" />
<h2>Take in TikTok World 2026</h2>
<p>Learn how to turn attention into action. The full global broadcast, now available on TikTok Academy.</p>
</div>
<div class="inner-right">
<img src="https://i.ibb.co/LXHwGtr1/Group-2085663573-2.png" />
</div>
</div>
`;
videoParent.insertBefore(section, videoParent.firstChild);
}
});

observer.observe(document.body, { childList: true, subtree: true });
});

})();

// ---- extracted script block 29 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
const oldFooter = document.querySelector("#page-footer");

if (oldFooter) {
oldFooter.style.display = "none";
}

const footer = document.createElement("footer");
footer.className = "tiktok-custom-footer";

footer.innerHTML = `
<div class="tiktok-custom-footer__container">

<div class="tiktok-custom-footer__left">
<img 
src="https://i.ibb.co/rf0g0wxB/footer-logo.png" 
alt="TikTok Academy Logo"
class="tiktok-custom-footer__logo"
/>
</div>

<div class="tiktok-custom-footer__right">
<a href="https://www.tiktokacademy.com/student/activity/3037059-faqs">
FAQ
</a>
</div>

</div>
`;

document.body.appendChild(footer);
});

})();

// ---- extracted script block 30 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
const allowedPages = [
"/student/activity/3315974-tiktok-world-2026-global-broadcast-apac",
"/student/activity/3386174-tiktok-world-2026-global-broadcast-eui-metap",
"/student/activity/3386212-tiktok-world-2026-global-broadcast-na",
"/student/activity/3397822-tiktok-world-2026-global-broadcast",
"/student/collection/2596844/path/5351552/activity/5349633",

];

if (!allowedPages.includes(window.location.pathname)) return;

const main = document.querySelector("main");

if (!main) return;

const customDiv = document.createElement("div");

customDiv.className = "custom-bottom-banner";

customDiv.innerHTML = `
<div class="custom-bottom-banner-content">
<h2>Explore more <br> resources here</h2>
<a href="https://ads.tiktok.com/business/en/kb-test-2?preview=true">Get Started</a>
</div>
`;

main.appendChild(customDiv);
});

})();

// ---- extracted script block 31 ----
(function () {

(function () {
function runScript() {
const container = document.querySelector(
'[class*="videoContentInformation-module-description"]',
);
if (!container) return false;

const paragraphs = container.querySelectorAll("p");
if (paragraphs.length < 4) return false;

const lastFour = Array.from(paragraphs).slice(-4);

const ul = document.createElement("ul");
ul.className = "learning-objectives-list"; // 👈 class added

lastFour.forEach((p) => {
const li = document.createElement("li");
li.className = "learning-objective-item"; // 👈 optional class
li.innerHTML = p.innerHTML;
ul.appendChild(li);
p.remove();
});

const learningText = Array.from(container.querySelectorAll("p")).find(
(p) => p.textContent.toLowerCase().includes("learning objectives"),
);

if (learningText) {
learningText.after(ul);
} else {
container.appendChild(ul);
}

return true;
}

const i = setInterval(() => {
if (runScript()) clearInterval(i);
}, 500);
})();

})();

// ---- extracted script block 32 ----
(function () {

(function () {
// This page is part of a React/Vite single-page app: navigating in from
// /student/live_events (the listing page) by clicking an event card is a
// client-side route change (pushState), not a full page reload. A plain
// pathname check at the top of the script only runs once, at whatever URL
// the browser actually did a full load on — so if that was the listing
// page, this whole IIFE would exit immediately and never re-run once the
// SPA router swaps the URL to live_events/3649052. A hard refresh/direct
// visit works fine (that IS the initial full load), which is why the bug
// only shows up when arriving via in-app navigation. Fixed below by
// watching for URL changes the same way the rest of this file does.
var TARGET_PATH_FRAGMENT = "live_events/3649052";

function isTargetPage() {
return window.location.pathname.includes(TARGET_PATH_FRAGMENT);
}

var HEADER_IMAGE = "https://cdn.jsdelivr.net/gh/mirza-wq/tiktok-academy-assets-git@main/Apps-gaming-header.png";

function buildHeader() {
if (document.querySelector(".agg_hero")) return true; // already built

var container = document.querySelector('[class*="videoContent-module-container"]');
var titleEl = document.querySelector('[class*="videoContentInformation-module-title"]');
var listItems = document.querySelectorAll(".learning-objectives-list .learning-objective-item");
var enrollBtns = document.querySelectorAll('[class*="videoEnrollButton-module-element"] button');
if (!container || !titleEl || listItems.length < 4 || !enrollBtns.length) return false; // native content not rendered yet — keep retrying

var subtitle = listItems[0].textContent.trim();
var paragraphs = Array.from(listItems)
.slice(1)
.map(function (li) { return li.textContent.trim(); })
.filter(Boolean); // drops the empty <br>-only <li>

var nativeEnrollBtn = enrollBtns[0];

var hero = document.createElement("section");
hero.className = "agg_hero";
hero.innerHTML =
'<div class="agg_hero__left">' +
'<h1 class="agg_hero__title">Apps &amp; Gaming<br>on TikTok</h1>' +
'<p class="agg_hero__subtitle"></p>' +
paragraphs.map(function () { return '<p class="agg_hero__desc"></p>'; }).join("") +
'<button type="button" class="agg_hero__cta">Save your spot</button>' +
'</div>' +
'<div class="agg_hero__right">' +
'<img src="' + HEADER_IMAGE + '" alt="">' +
'</div>';

hero.querySelector(".agg_hero__subtitle").textContent = subtitle;
hero.querySelectorAll(".agg_hero__desc").forEach(function (el, i) {
el.textContent = paragraphs[i];
});
hero.querySelector(".agg_hero__cta").addEventListener("click", function () {
nativeEnrollBtn.click();
});

container.insertBefore(hero, container.firstChild);

// The native title/description/breadcrumbs now duplicate what the hero
// shows — hide rather than remove, so the rest of the page (countdown,
// schedule, agenda) that reads from them keeps working untouched.
titleEl.style.display = "none";
var descEl = document.querySelector('[class*="videoContentInformation-module-description"]');
if (descEl) descEl.style.display = "none";
var breadcrumbs = document.querySelector('[class*="video-module-breadcrumbs"]');
if (breadcrumbs) breadcrumbs.style.display = "none";

return true;
}

function buildWhenBand() {
if (document.querySelector(".agg_when")) return true; // already built

var container = document.querySelector('[class*="videoContent-module-container"]');
var hero = document.querySelector(".agg_hero");
var enrollBtns = document.querySelectorAll('[class*="videoEnrollButton-module-element"] button');
if (!container || !hero || !enrollBtns.length) return false;

var nativeEnrollBtn = enrollBtns[0];

var band = document.createElement("section");
band.className = "agg_when";
band.innerHTML =
'<div class="agg_when__item">' +
'<h3 class="agg_when__label">When</h3>' +
'<p class="agg_when__value">Thursday 8th October, 2026</p>' +
'</div>' +
'<div class="agg_when__item">' +
'<h3 class="agg_when__label">Time</h3>' +
'<p class="agg_when__value">11:30 - 18:00 CET</p>' +
'</div>' +
'<button type="button" class="agg_when__cta">Save your spot</button>';

band.querySelector(".agg_when__cta").addEventListener("click", function () {
nativeEnrollBtn.click();
});

hero.insertAdjacentElement("afterend", band);

var scheduleBox = document.querySelector('[class*="videoContentSchedule-module-container"]');
if (scheduleBox) scheduleBox.style.display = "none";

return true;
}

function buildSchedule() {
if (document.querySelector(".agg_schedule")) return true; // already built

var container = document.querySelector('[class*="videoContent-module-container"]');
var itemEls = document.querySelectorAll('[class*="videoAgendaSectionItem-module-container"]');
if (!container || itemEls.length < 1) return false;

var sessions = Array.from(itemEls).map(function (item) {
var ps = item.querySelectorAll("p");
if (ps.length < 3) return null;
var time = ps[0].textContent.trim();
var label = ps[1].textContent.trim();
var lines = ps[2].textContent
.split(/\n+/)
.map(function (s) { return s.trim(); })
.filter(Boolean);
var points = [];
for (var i = 0; i < lines.length - 1; i += 2) {
points.push({ title: lines[i], desc: lines[i + 1] });
}
return points.length ? { time: time, label: label, points: points } : null;
}).filter(Boolean);

if (!sessions.length) return false; // native agenda text not rendered yet — keep retrying

var section = document.createElement("section");
section.className = "agg_schedule";
section.innerHTML =
'<h2 class="agg_schedule__heading">Schedule</h2>' +
'<div class="agg_schedule__sessions">' +
sessions.map(function () {
return '<div class="agg_schedule__session">' +
'<div class="agg_schedule__time"></div>' +
'<div class="agg_schedule__label"></div>' +
'<div class="agg_schedule__points"></div>' +
'</div>';
}).join("") +
'</div>';

function formatScheduleTime(time) {
// "2:30 PM — 3:45 PM GMT+5" -> break onto a new line right before the
// trailing "PM GMT+5" part, so the timezone doesn't crowd the end of the
// first line.
return time.replace(/\s+(AM|PM)(\s+GMT[+-]?\d+)\s*$/i, "<br>$1$2");
}

section.querySelectorAll(".agg_schedule__session").forEach(function (node, i) {
var s = sessions[i];
node.querySelector(".agg_schedule__time").innerHTML = formatScheduleTime(s.time);
node.querySelector(".agg_schedule__label").textContent = s.label;
var pointsWrap = node.querySelector(".agg_schedule__points");
s.points.forEach(function (p) {
var pointEl = document.createElement("div");
pointEl.className = "agg_schedule__point";
var h4 = document.createElement("h4");
h4.textContent = p.title;
var desc = document.createElement("p");
desc.textContent = p.desc;
pointEl.appendChild(h4);
pointEl.appendChild(desc);
pointsWrap.appendChild(pointEl);
});
});

container.appendChild(section);

var agendaTitle = document.querySelector('[class*="videoAgenda-module-title_container"]');
if (agendaTitle) agendaTitle.style.display = "none";
document.querySelectorAll('[class*="videoAgendaSection-module-container"]').forEach(function (el) {
el.style.display = "none";
});

return true;
}

function buildCountdown() {
if (document.querySelector(".agg_countdown")) return true; // already built

var container = document.querySelector('[class*="videoContent-module-container"]');
// Piggyback on the native countdown widget's own numbers (already ticking
// live every second via Intellum's own React state) instead of computing
// our own date math — avoids re-deriving timezone/offset logic and stays
// perfectly in sync with the native countdown near the top of the page.
var nativeItems = document.querySelectorAll('[class*="videoCountdown-module-countdown_item"]');
if (!container || nativeItems.length < 4) return false; // native countdown not rendered yet — keep retrying

var LABELS = ["Days", "Hours", "Minutes", "Seconds"];

var section = document.createElement("section");
section.className = "agg_countdown";
section.innerHTML = LABELS.map(function () {
return '<div class="agg_countdown__item">' +
'<div class="agg_countdown__value"></div>' +
'<div class="agg_countdown__label"></div>' +
'</div>';
}).join("");

var itemNodes = section.querySelectorAll(".agg_countdown__item");
itemNodes.forEach(function (node, i) {
node.querySelector(".agg_countdown__label").textContent = LABELS[i];
});

function syncValues() {
var freshNative = document.querySelectorAll('[class*="videoCountdown-module-countdown_item"]');
if (freshNative.length < 4) return;
itemNodes.forEach(function (node, i) {
var numEl = freshNative[i].querySelector("p");
var val = numEl ? numEl.textContent.trim() : "";
var valueEl = node.querySelector(".agg_countdown__value");
if (val && valueEl.textContent !== val) valueEl.textContent = val;
});
}

syncValues();
setInterval(syncValues, 1000);

container.appendChild(section);

return true;
}

function buildAll() {
var a = buildHeader();
var b = buildWhenBand();
var c = buildSchedule();
var d = buildCountdown();
return a && b && c && d;
}

function init() {
// Several CSS rules use `[class*="..."]` selectors against the same
// Vite-generated class-name prefixes that OTHER live_events pages
// (3325733/3325732/3369994) also render. Without a page-specific scope
// class, those rules would leak onto those other pages too.
document.documentElement.classList.add("agg-event-page");

if (buildAll()) return;

var observer = new MutationObserver(function () {
if (buildAll()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });

var attemptsLeft = 40;
var intervalId = setInterval(function () {
attemptsLeft--;
if (buildAll() || attemptsLeft <= 0) {
clearInterval(intervalId);
observer.disconnect();
}
}, 500);
}

function tryInit() {
if (isTargetPage()) init();
}

// document.body doesn't exist yet if this custom code is injected into
// <head> — wait for DOMContentLoaded in that case instead of crashing on
// observer.observe(null, ...).
function start() {
tryInit();

// Watch for SPA route changes (same pattern used elsewhere in this file)
// so navigating INTO this page from /student/live_events without a full
// reload still triggers the build, and navigating AWAY from it drops the
// scope class so the scoped CSS above doesn't linger on other pages.
var lastUrl = location.href;
new MutationObserver(function () {
if (location.href === lastUrl) return;
lastUrl = location.href;
if (isTargetPage()) {
tryInit();
} else {
document.documentElement.classList.remove("agg-event-page");
}
}).observe(document.body, { childList: true, subtree: true });
}

if (document.body) {
start();
} else {
document.addEventListener("DOMContentLoaded", start);
}
})();

})();

// ---- extracted script block 33 ----
(function () {

(function () {
if (!window.location.href.includes("/activity/3250603-achievements-faq"))
return;

const interval = setInterval(() => {
const article = document.querySelector("#course_page article");

if (article && !document.getElementById("custom-btn")) {
const link = document.createElement("a");
link.id = "custom-btn";
link.innerText = "Start Earning Your Achievements Today";

link.href =
"https://www.tiktokacademy.com/student/collection/2079614-courses"; // replace with your URL
link.target = "_blank"; // optional (open in new tab)

link.style.cssText = `
background-color: #fe2c55;
color: #fff;
padding: 12px 24px;
text-decoration: none;
border-radius: 4px;
display: inline-block;
font-weight: bold;
font-size: 19px;
cursor: pointer;
`;

article.appendChild(link);

clearInterval(interval);
}
}, 500);
})();

})();

// ---- extracted script block 34 ----
(function () {

document.addEventListener("DOMContentLoaded", () => {
const pages = {
"/student/page/3231242": {
desktop:
"https://i.ibb.co/QFJ1Kdj1/TTA-Webinar-The-Power-of-Search-on-Tik-Tok-Desktop-Banner-Size-2400x500-NYC.png",
mobile:
"https://i.ibb.co/1YJDz7T1/TTA-Webinar-The-Power-of-Search-on-Tik-Tok-Desktop-Banner-Size-2400x500-2.png",
},
"/student/page/3231250": {
desktop:
"https://i.ibb.co/vCnmyRWp/TTA-Webinar-The-Power-of-Search-on-Tik-Tok-Desktop-Banner-Size-LA.png",
mobile:
"https://i.ibb.co/G3d1t2k4/TTA-Webinar-The-Power-of-Search-on-Tik-Tok-Desktop-Banner-Size-2400x500-LA.png",
},
};

const currentPath = window.location.pathname;

if (pages[currentPath]) {
document
.querySelectorAll(".course__contentcontainer")
.forEach((el) => el.classList.add("set-width"));

document
.querySelectorAll(
".course__contentcontainer .activitysection, .page__header, .course__fullwidthcontainer",
)
.forEach((el) => el.classList.add("hidden"));

const section = document.createElement("section");
section.classList.add("custom-image-section");

section.innerHTML = `
<picture>
<source media="(max-width: 768px)" srcset="${pages[currentPath].mobile}">
<img src="${pages[currentPath].desktop}" alt="Page Image" style="width:100%; height:auto;">
</picture>
`;

document.body.prepend(section);
}
});

})();

// ---- extracted script block 35 ----
(function () {

document.addEventListener("DOMContentLoaded", () => {
const REPLACEMENT_IMG = "https://i.ibb.co/LDj503GS/logo.png";

function replaceWithImage(el, src, maxWidth = "100%") {
if (!el) return;
const img = document.createElement("img");
img.src = src;
img.style.width = "100%";
img.style.height = "auto";
img.style.maxWidth = maxWidth;
el.replaceWith(img);
console.log("Element replaced with image:", img);
}

const waitForPopup = setInterval(() => {
const popup = document.querySelector("#public-login-dialog");
if (!popup) return;

clearInterval(waitForPopup);
console.log("Popup found!");

const observer = new MutationObserver(() => {
if (popup.classList.contains("dialog--visible")) {
console.log("Popup is now visible!");
setTimeout(() => {
const svg = popup.querySelector(".dialog__contentbody svg");
if (svg) {
replaceWithImage(svg, REPLACEMENT_IMG, "300px");
} else {
console.log("SVG not found yet inside popup.");
}
}, 100);
}
});

observer.observe(popup, { attributes: true });
}, 100);

document.querySelectorAll(".noresults.login__form").forEach((container) => {
const svgWrapper = container.querySelector(".noresults__image");
if (svgWrapper) svgWrapper.remove();

if (container.querySelector(".noresults-image")) return;

const heading = container.querySelector(
".noresults__heading.noresults__heading--large",
);
if (!heading) return;

const img = document.createElement("img");
img.src = REPLACEMENT_IMG;
img.alt = "Replacement Image";
img.className = "noresults-image";
img.style.maxWidth = "100%";
img.style.display = "block";
img.style.marginInline = "auto";

heading.insertAdjacentElement("afterend", img);
console.log("Inserted replacement image after heading:", img);
});
});

})();

// ---- extracted script block 36 ----
(function () {

(function waitForText() {
const target = document.querySelector(
".challengeHero-module-details-kqO-D .challengeHero-module-detail-YsTmj h4",
);

if (target && target.textContent.trim() === "Conclua 8 cursos") {
target.textContent = "Conclua 8 atividades";
return;
}

setTimeout(waitForText, 300);
})();

})();

// ---- extracted script block 37 ----
(function () {

document.addEventListener("DOMContentLoaded", () => {
document.querySelectorAll(".tabs__tablistitem a, .tabs__tablistitem button").forEach((link) => {
if (link.textContent.trim() === "All Sessions") {
link.textContent = "All Webinars";
}
if (link.textContent.trim() === "My Course Sessions") {
link.textContent = "My Webinars";
}
});
});

})();

// ---- extracted script block 38 ----
(function () {

(function () {
if (!window.location.pathname.includes("/student/all_sessions")) return;

function init() {

function removeRequestedTab() {
var tablist = document.querySelector(".tabs__tablist");
if (!tablist) return false; // tabs not built yet — keep retrying

tablist.querySelectorAll(".tabs__tablistitem").forEach(function (item) {
var link = item.querySelector("a, button");
if (!link) return;
// Match on the href, not the visible label — the label translates per
// locale ("Requested" / "Diminta" / ...), but the URL path stays the
// same English slug regardless of locale, so this catches every language.
var href = link.getAttribute("href") || link.getAttribute("data-dialog-url") || "";
if (href.indexOf("requested_events") !== -1 || link.textContent.trim() === "Requested") {
item.remove();
}
});

return true;
}

if (removeRequestedTab()) return;

var observer = new MutationObserver(function () {
if (removeRequestedTab()) observer.disconnect();
});
observer.observe(document.body, { childList: true, subtree: true });

var attemptsLeft = 40;
var intervalId = setInterval(function () {
attemptsLeft--;
if (removeRequestedTab() || attemptsLeft <= 0) {
clearInterval(intervalId);
observer.disconnect();
}
}, 500);
}

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init);
} else {
init();
}
})();

})();

// ---- extracted script block 39 ----
(function () {

document.addEventListener("DOMContentLoaded", () => {
const playIconSVG = `
<svg style="margin-top: 4px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width="16" height="16" style="flex-shrink:0;">
<g fill="currentColor" aria-hidden="true">
<path d="M12.37,7.93l-9,5.14a.5.5,0,0,1-.75-.43V2.36a.5.5,0,0,1,.75-.43l9,5.14A.5.5,0,0,1,12.37,7.93Z"></path>
</g>
</svg>
`;

function addPlayIcons() {
const cards = document.querySelectorAll(".catalogcards__listitem");

cards.forEach((card) => {
if (card.querySelector(".custom-play-icon")) return;

const hasNx = Array.from(card.classList).some((cls) => {
const match = cls.match(/--(\d+)x$/i);
return match && parseInt(match[1], 10) > 2;
});
if (!hasNx) return; // skip card if condition not met

const anchor = card.querySelector("a");
if (!anchor) return;

const img = anchor.querySelector("img");
const link = anchor.getAttribute("href");
const title = img ? img.getAttribute("title") : "";

const h3 = card.querySelector(".catalogcard__content h3");

if (h3) {
const iconWrapper = document.createElement("span");
iconWrapper.className = "custom-play-icon";
iconWrapper.innerHTML = playIconSVG;
iconWrapper.style.display = "inline-flex";
iconWrapper.style.marginRight = "6px";
iconWrapper.style.verticalAlign = "middle";
iconWrapper.style.cursor = "pointer";
iconWrapper.addEventListener("click", (e) => {
e.stopPropagation();
window.open(link, "_blank");
});

h3.prepend(iconWrapper);
} else if (title) {
const wrapper = document.createElement("div");
wrapper.className = "custom-play-icon";
wrapper.style.display = "flex";
wrapper.style.alignItems = "start";
wrapper.style.gap = "6px";
wrapper.style.marginTop = "6px";
wrapper.style.cursor = "pointer";
wrapper.innerHTML = `${playIconSVG}<span>${title}</span>`;
wrapper.addEventListener("click", () => window.open(link, "_blank"));

card.appendChild(wrapper);
}
});
}

setTimeout(addPlayIcons, 500);

const observer = new MutationObserver(addPlayIcons);
observer.observe(document.body, { childList: true, subtree: true });
});

})();

// ---- extracted script block 40 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
if (
window.location.href.includes("-certification-exam-prep") ||
window.location.href.includes(
"-preparacao-para-o-exame-de-certificacao-para-compra-de-midia",
) ||
window.location.href.includes(
"-preparati-all-esame-per-la-certificazione-di-media-buying",
) ||
window.location.href.includes(
"-persiapan-ujian-sertifikasi-media-buying",
) ||
window.location.href.includes("-media-buying-certification") ||
window.location.href.includes(
"-chu-n-b-cho-k-thi-ch-ng-nh-n-mua-qu-ng-cao",
) ||
window.location.href.includes(
"-preparation-a-l-examen-de-certification-d-achat-de-medias",
) ||
window.location.href.includes(
"-preparacion-para-el-examen-de-certificacion-de-compra-de-medios",
) ||
window.location.href.includes(
"-preparacion-para-el-examen-de-la-certificacion-en-compra-de-medios",
) ||
window.location.href.includes(
"-medya-satin-alma-sertifika-sinavi-hazirligi",
) ||
window.location.href.includes(
"-prufungsvorbereitung-zur-mediabuying-zertifizierung",
)
) {
const ul = document.querySelector("ul.cardgrid");
if (ul) {
ul.classList.add("testing");
}
}
});

})();

// ---- extracted script block 41 ----
(function () {

const BUTTONS = {
"Media Buying Certification Exam Coverage Guide": {
text: "Download Now",
type: "download",
href: "https://www.tiktokacademy.com/student/path/2552988/activity/3797187",
},
"Media Buying Certification Exam Study Guide": {
text: "Download Now",
type: "download",
href: "https://www.tiktokacademy.com/student/path/2552988/activity/3797184",
},
"Practice Test A": {
text: "Start Now",
type: "start",
href: "https://www.tiktokacademy.com/student/path/2552988/activity/3797185",
},
"Practice Test B": {
text: "Start Now",
type: "start",
href: "https://www.tiktokacademy.com/student/path/2552988/activity/3797186",
},
"Certification Prep Session Webinar Replay": {
text: "Watch Now",
type: "watch",
href: "https://www.tiktokacademy.com/student/path/2552988/activity/4330912",
},
};

function injectButtons() {
document.querySelectorAll(".activitycard").forEach((card) => {
const titleEl = card.querySelector(".activitycard__title, h3, a");
if (!titleEl) return;

const title = titleEl.textContent.trim();
const cfg = BUTTONS[title];
if (!cfg) return;

const meta = card.querySelector(".activitymeta.activitycard__meta");
if (!meta || meta.querySelector(".activitycard__btn")) return;

const li = document.createElement("li");
const btn = document.createElement("a");
btn.className = `activitycard__btn ${cfg.type}`;
btn.href = cfg.href;
btn.textContent = cfg.text;

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "16");
svg.setAttribute("height", "16");
svg.setAttribute("viewBox", "0 0 24 24");
svg.setAttribute("fill", "none");
svg.setAttribute("stroke", "currentColor");
svg.setAttribute("stroke-width", "2");
svg.setAttribute("stroke-linecap", "round");
svg.setAttribute("stroke-linejoin", "round");

const path = document.createElementNS(
"http://www.w3.org/2000/svg",
"path",
);
path.setAttribute("d", "M9 18l6-6-6-6");
svg.appendChild(path);
btn.appendChild(svg);

li.appendChild(btn);
meta.appendChild(li);
});
}

document.addEventListener("DOMContentLoaded", injectButtons);

})();

// ---- extracted script block 42 ----
(function () {


const SUMMARY_BY_TITLE = {
"Media Buying Certification Exam Coverage Guide":
"Learn more about the topic areas covered on the exam and get familiar with the test format.",
"Media Buying Certification Exam Study Guide":
"Prepare for the exam with comprehensive coverage of the 9 key exam topics.",
"Practice Test A":
"Check your readiness with a practice test that reflects the official exam to help you gauge readiness and build confidence.",
"Practice Test B":
"Check your readiness with a practice test that reflects the official exam to help you gauge readiness and build confidence.",
"Certification Prep Session Webinar Replay":
"Watch a guided walkthrough study session for the TikTok Media Buying Certification exam to get prepared to take the exam.",
};

function injectSummaries(root = document) {
const containers = root.querySelectorAll(".activitycard__textcontainer");
containers.forEach((box) => {
const titleEl =
box.querySelector(".activitycard__title, .catalogcard__title, a, h3") ||
box;

const title = titleEl.textContent.replace(/\s+/g, " ").trim();
const summary = SUMMARY_BY_TITLE[title];

if (!summary) return; // only touch known items
if (box.querySelector(".activitycard__summary")) return; // avoid duplicates

const p = document.createElement("p");
p.className = "activitycard__summary";
p.textContent = summary;
titleEl.insertAdjacentElement("afterend", p);
});
}

document.addEventListener("DOMContentLoaded", () => {
injectSummaries();

const mo = new MutationObserver((muts) => {
for (const m of muts) {
m.addedNodes.forEach((n) => {
if (n.nodeType !== 1) return;
if (
n.matches?.(".activitycard__textcontainer") ||
n.querySelector?.(".activitycard__textcontainer")
) {
injectSummaries(n);
}
});
}
});

mo.observe(document.body, { childList: true, subtree: true });
});

})();

// ---- extracted script block 43 ----
(function () {

// This site's own custom code (see fetchPathCourseCountViaIframe,
// fetchRealThumbnailFromSessionsList, fetchSessionImagesViaIframe, and
// fetchCatalogWebinarsViaIframe elsewhere in this file) loads real pages —
// /student/all_sessions, /student/catalog, individual course pages — into
// visually-hidden <iframe>s purely to scrape metadata (course counts,
// thumbnails, tags). Every one of those hidden loads runs this SAME
// injected script, so without a guard, TikTok Pixel and LinkedIn Insight
// fired a fresh pageview for each hidden scrape — a plausible driver of
// the "3x pageviews/session with flat engagement" anomaly some
// measurement tools flagged. window.top === window.self is only true for
// the real, user-visible top-level page, never for a page loaded inside
// an <iframe> (hidden or not), so this scopes both tags back to genuine
// visits without touching their behavior on normal navigation.
if (window.top === window.self) {
!(function (w, d, t) {
w.TiktokAnalyticsObject = t;
var ttq = (w[t] = w[t] || []);
((ttq.methods = [
"page",
"track",
"identify",
"instances",
"debug",
"on",
"off",
"once",
"ready",
"alias",
"group",
"enableCookie",
"disableCookie",
]),
(ttq.setAndDefer = function (t, e) {
t[e] = function () {
t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
};
}));
for (var i = 0; i < ttq.methods.length; i++)
ttq.setAndDefer(ttq, ttq.methods[i]);
((ttq.instance = function (t) {
for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)
ttq.setAndDefer(e, ttq.methods[n]);
return e;
}),
(ttq.load = function (e, n) {
var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
((ttq._i = ttq._i || {}),
(ttq._i[e] = []),
(ttq._i[e]._u = i),
(ttq._t = ttq._t || {}),
(ttq._t[e] = +new Date()),
(ttq._o = ttq._o || {}),
(ttq._o[e] = n || {}));
var o = document.createElement("script");
((o.type = "text/javascript"),
(o.async = !0),
(o.src = i + "?sdkid=" + e + "&lib=" + t));
var a = document.getElementsByTagName("script")[0];
a.parentNode.insertBefore(o, a);
}));

ttq.load("CO43R53C77U479UCOGRG");
ttq.page();
})(window, document, "ttq");
}

})();

// ---- extracted script block 44 ----
(function () {

if (window.top === window.self) {
_linkedin_partner_id = "6006500";
window._linkedin_data_partner_ids =
window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
}

})();

// ---- extracted script block 45 ----
(function () {

if (window.top === window.self) {
(function (l) {
if (!l) {
window.lintrk = function (a, b) {
window.lintrk.q.push([a, b]);
};
window.lintrk.q = [];
}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";
b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);
})(window.lintrk);
}

document.addEventListener("DOMContentLoaded", () => {
const targetPath = "/student/activity/2549647-events-mock-up-page";

if (window.location.pathname === targetPath) {
const pageComponent = document.querySelector(".pgcomponent");
const page = document.querySelector(".page");
if (pageComponent) {
pageComponent.style.maxWidth = "unset";
}
if (page) {
page.style.padding = "unset";
}
}
});
const logoSvg = `
<?xml version="1.0" encoding="UTF-8"?>
<svg width="1355" height="488" viewBox="0 0 1355 488" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1223_2183)">
<path d="M64.0878 206.436H144.045L208.446 425.774H158.052L139.695 359.198H68.4548L50.0969 425.774H0L64.0878 206.436ZM79.3311 319.994H128.802L104.215 230.083L79.3311 319.994Z" fill="black"/>
<path d="M300.236 429.515C252.331 429.515 217.79 396.54 217.79 344.581C217.79 292.622 252.331 259.647 300.236 259.647C341.302 259.647 365.889 278.318 376.156 309.744L333.524 323.125C326.998 304.141 315.479 297.929 300.549 297.929C280.642 297.929 265.085 313.798 265.085 344.598C265.085 375.397 280.642 390.954 300.549 390.954C315.479 390.954 326.685 385.038 333.524 365.757L376.156 379.451C365.889 410.877 341.302 429.548 300.236 429.548V429.515Z" fill="black"/>
<path d="M493.142 408.043C483.501 421.737 467.006 429.515 445.846 429.515C412.245 429.515 389.224 411.157 389.224 382.846C389.224 354.535 408.208 337.726 440.556 331.2L488.775 320.934V319.698C488.775 302.889 480.683 294.814 464.501 294.814C449.258 294.814 440.54 302.592 437.129 316.896L393.261 308.179C399.787 277.692 427.175 259.647 466.066 259.647C513.049 259.647 534.818 283.295 534.818 323.109V395.288L546.337 425.775H499.354L493.125 408.043H493.142ZM457.365 395.914C477.272 395.914 488.791 382.846 488.791 364.175V350.168L456.739 357.946C443.045 361.061 435.58 366.977 435.58 377.853C435.58 389.372 445.22 395.898 457.365 395.898V395.914Z" fill="black"/>
<path d="M631.287 259.647C650.584 259.647 668.316 266.173 679.192 281.12V206.452H725.235V425.791H681.68V405.571C671.414 422.067 652.117 429.532 631.287 429.532C590.847 429.532 559.421 396.557 559.421 344.911C559.421 293.265 589.594 259.664 631.287 259.664V259.647ZM681.68 344.581C681.68 314.408 666.124 297.912 644.042 297.912C621.96 297.912 606.7 314.408 606.7 344.581C606.7 374.755 621.943 390.937 644.042 390.937C666.141 390.937 681.68 374.755 681.68 344.581Z" fill="black"/>
<path d="M832.269 429.515C781.249 429.515 748.884 395.288 748.884 343.016C748.884 293.858 782.798 259.631 830.703 259.631C878.608 259.631 908.172 290.117 908.172 338.039C908.172 343.955 907.859 351.733 906.92 356.084H793.674C795.223 378.792 808.291 393.113 833.192 393.113C849.984 393.113 862.442 386.274 869.907 371.64L905.058 388.746C892.303 415.195 864.931 429.499 832.252 429.499L832.269 429.515ZM794.004 326.536H863.695C862.146 305.064 849.687 293.561 829.154 293.561C809.857 293.561 796.179 304.454 794.004 326.536Z" fill="black"/>
<path d="M930.27 263.371H973.511V281.103C981.602 267.409 998.395 259.631 1019.55 259.631C1040.71 259.631 1057.19 267.722 1066.22 282.339C1074.94 268.332 1092.99 259.631 1113.52 259.631C1152.1 259.631 1172.94 280.164 1172.94 317.506V425.774H1126.9V329.008C1126.9 310.024 1117.26 299.444 1102.02 299.444C1084.91 299.444 1074.64 311.573 1074.64 331.497V425.774H1028.6V329.008C1028.6 310.024 1019.27 299.444 1003.4 299.444C986.612 299.444 976.345 311.886 976.345 331.793V425.758H930.303V263.355L930.27 263.371Z" fill="black"/>
<path d="M1184.17 263.372H1231.15L1269.73 385.648L1307.07 263.372H1354.05L1282.5 488H1235.52L1256.05 423.912H1238.63L1184.18 263.372H1184.17Z" fill="black"/>
<path d="M541.854 30.7832H611.445L605.051 50.6901H586.99V124.303H564.496V50.6737L541.854 50.7231V30.7832Z" fill="black"/>
<path d="M725.449 30.7832H796.656L790.262 50.6901H770.635V124.303H748.108V50.6737L725.466 50.7231V30.7832H725.449Z" fill="black"/>
<path d="M615.696 60.5283H638.009L637.976 124.303H615.828L615.696 60.5283Z" fill="black"/>
<path d="M646.843 30.5195H669.139V74.0742L691.221 52.404H717.835L689.887 79.5123L721.181 124.303H696.627L675.747 93.2396L669.139 99.6665V124.303H646.843V30.5195Z" fill="black"/>
<path d="M873.482 30.5195H895.779V74.0742L917.861 52.404H944.475L916.526 79.5123L947.82 124.303H923.266L902.387 93.2396L895.779 99.6665V124.303H873.482V30.5195Z" fill="black"/>
<path d="M626.837 53.2443C633.044 53.2443 638.075 48.2125 638.075 42.0054C638.075 35.7984 633.044 30.7666 626.837 30.7666C620.629 30.7666 615.598 35.7984 615.598 42.0054C615.598 48.2125 620.629 53.2443 626.837 53.2443Z" fill="black"/>
<path d="M826.253 47.9382C805.176 47.9382 788.07 65.0272 788.07 86.1207C788.07 107.214 805.159 124.303 826.253 124.303C847.346 124.303 864.435 107.214 864.435 86.1207C864.435 65.0272 847.346 47.9382 826.253 47.9382ZM826.253 104.676C816.003 104.676 807.697 96.3707 807.697 86.1207C807.697 75.8706 816.003 67.565 826.253 67.565C836.503 67.565 844.808 75.8706 844.808 86.1207C844.808 96.3707 836.503 104.676 826.253 104.676Z" fill="black"/>
<path d="M502.535 26.0206C495.548 21.4559 490.489 14.1556 488.923 5.65226C488.577 3.80658 488.396 1.92795 488.396 -0.0166016H466.067L466.034 89.4492C465.654 99.4686 457.415 107.511 447.297 107.511C444.149 107.511 441.199 106.719 438.596 105.352C432.63 102.204 428.527 95.9421 428.527 88.7406C428.527 78.3917 436.948 69.9708 447.297 69.9708C449.225 69.9708 451.087 70.2839 452.834 70.8442V48.0534C451.021 47.8062 449.175 47.6579 447.297 47.6579C424.638 47.6579 406.214 66.0981 406.214 88.7406C406.214 102.649 413.152 114.943 423.748 122.375C430.422 127.055 438.546 129.823 447.297 129.823C469.956 129.823 488.379 111.4 488.379 88.7406V43.3733C497.13 49.6519 507.858 53.3597 519.443 53.3597V31.0303C513.214 31.0303 507.396 29.1846 502.535 26.0041V26.0206Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_1223_2183">
<rect width="1354.03" height="488" fill="white"/>
</clipPath>
</defs>
</svg>

`;

const translations = {
de: {
title: "Willkommen bei der TikTok Academy",
subtitle:
"Bitte melde dich an oder logge dich ein, um an einem Webinar, Kurs oder Video teilzunehmen.",
username: "Benutzername",
password: "Passwort",
rememberMe: "Angemeldet bleiben",
forgotPassword: "Passwort vergessen?",
noAccount: "Noch kein Konto?",
signupLink: "Hier registrieren",
},
es: {
title: "Bienvenido a TikTok Academy",
subtitle:
"Regístrate o inicia sesión para inscribirte en un seminario web, curso o video.",
username: "Nombre de usuario",
password: "Contraseña",
rememberMe: "Recuérdame",
forgotPassword: "¿Olvidaste tu contraseña?",
noAccount: "¿No tienes una cuenta?",
signupLink: "Regístrate aquí",
},
"es-419": {
title: "Bienvenido a TikTok Academy",
subtitle:
"Regístrate o inicia sesión para inscribirte en un seminario web, curso o video.",
username: "Nombre de usuario",
password: "Contraseña",
rememberMe: "Recuérdame",
forgotPassword: "¿Olvidaste tu contraseña?",
noAccount: "¿No tienes una cuenta?",
signupLink: "Regístrate aquí",
},
fr: {
title: "Bienvenue à TikTok Academy",
subtitle:
"Veuillez vous inscrire ou vous connecter pour participer à un webinaire, un cours ou une vidéo.",
username: "Nom d'utilisateur",
password: "Mot de passe",
rememberMe: "Se souvenir de moi",
forgotPassword: "Mot de passe oublié ?",
noAccount: "Pas de compte ?",
signupLink: "Inscrivez-vous ici",
},
it: {
title: "Benvenuti alla TikTok Academy",
subtitle:
"Registrati o accedi per iscriverti a un webinar, un corso o un video.",
username: "Nome utente",
password: "Password",
rememberMe: "Ricordami",
forgotPassword: "Password dimenticata?",
noAccount: "Non hai un account?",
signupLink: "Iscriviti qui",
},
"pt-br": {
title: "Bem-vindo ao TikTok Academy",
subtitle:
"Inscreva-se ou faça login para se inscrever em um webinar, curso ou vídeo.",
username: "Nome de usuário",
password: "Senha",
rememberMe: "Lembre-se de mim",
forgotPassword: "Esqueceu a senha?",
noAccount: "Não tem uma conta?",
signupLink: "Cadastre-se aqui",
},
ja: {
title: "TikTok Academyに登録！",
subtitle: "TikTok公式学習プラットフォームへようこそ",
username: "ユーザー名",
password: "パスワード",
rememberMe: "ログインしたままにする",
forgotPassword: "パスワードをお忘れですか？",
noAccount: "アカウントをお持ちでない方は",
signupLink: "こちら",
},
zh: {
title: "欢迎来到 TikTok 学院",
subtitle: "请注册或登录以参加网络研讨会、课程或视频。",
username: "用户名",
password: "密码",
rememberMe: "记住我",
forgotPassword: "忘记密码？",
noAccount: "没有账号？",
signupLink: "在此注册",
},
ko: {
title: "TikTok Academy에 오신 것을 환영합니다.",
subtitle:
"웨비나, 코스 또는 비디오에 등록하려면 가입하거나 로그인하세요.",
username: "사용자 이름",
password: "비밀번호",
rememberMe: "기억하기",
forgotPassword: "비밀번호를 잊으셨나요?",
noAccount: "계정이 없으신가요?",
signupLink: "여기서 가입하세요",
},
en: {
title: "Welcome to TikTok Academy",
subtitle:
"Please sign up or log in to enroll in a webinar, course, or video.",
username: "Username",
password: "Password",
rememberMe: "Remember Me",
forgotPassword: "Forgot Password?",
noAccount: "Don't have an account?",
signupLink: "Sign up here",
},
vi: {
title: "Chào mừng đến với TikTok Academy",
subtitle:
"Vui lòng đăng ký hoặc đăng nhập để tham gia hội thảo, khóa học hoặc video.",
username: "Tên đăng nhập",
password: "Mật khẩu",
rememberMe: "Ghi nhớ tôi",
forgotPassword: "Quên mật khẩu?",
noAccount: "Chưa có tài khoản?",
signupLink: "Đăng ký tại đây",
},
th: {
title: "ยินดีต้อนรับสู่ TikTok Academy",
subtitle:
"กรุณาลงทะเบียนหรือเข้าสู่ระบบเพื่อเข้าร่วมสัมมนา หลักสูตร หรือวิดีโอ",
username: "ชื่อผู้ใช้",
password: "รหัสผ่าน",
rememberMe: "จดจำฉัน",
forgotPassword: "ลืมรหัสผ่าน?",
noAccount: "ยังไม่มีบัญชี?",
signupLink: "ลงทะเบียนที่นี่",
},
id: {
title: "Selamat datang di TikTok Academy",
subtitle:
"Silakan daftar atau masuk untuk mengikuti webinar, kursus, atau video.",
username: "Nama pengguna",
password: "Kata sandi",
rememberMe: "Ingat saya",
forgotPassword: "Lupa kata sandi?",
noAccount: "Belum punya akun?",
signupLink: "Daftar di sini",
},
};

function updateLanguage() {
const urlParams = new URLSearchParams(window.location.search);
const localeParam = urlParams.get("locale");

let userLang =
localeParam ||
document.documentElement.lang ||
navigator.language ||
navigator.userLanguage;

const langCode = userLang.toLowerCase();
const shortLang = langCode.split("-")[0];

const translation =
translations[langCode] ||
translations[shortLang] ||
translations["en"];

document.querySelectorAll(".login__title").forEach((elem) => {
elem.textContent = translation.title;

if (["de", "ko"].includes(shortLang)) {
elem.style.lineHeight = "30px";
}
});

document.querySelectorAll(".login__subtitle").forEach((elem) => {
elem.innerHTML = translation.subtitle;

if (["de", "ko"].includes(shortLang)) {
elem.style.lineHeight = "18px";
}
});

document.querySelectorAll('label[for="login"]').forEach((elem) => {
elem.textContent = translation.username;
});

document.querySelectorAll('label[for="password"]').forEach((elem) => {
elem.textContent = translation.password;
});

document
.querySelectorAll(".login__rememberme .checkbox__label")
.forEach((elem) => {
elem.textContent = translation.rememberMe;
});

document.querySelectorAll(".login__forgotpassword").forEach((elem) => {
elem.textContent = translation.forgotPassword;
});
const parentDiv = document.querySelector(".login__actions div");

if (parentDiv) {
const currentLink = parentDiv.querySelector("a");

if (currentLink) {
const linkHref = currentLink.getAttribute("href");

parentDiv.innerHTML =
translation.noAccount +
' <a target="_top" href="' +
linkHref +
'" style="color: #fe2c55; text-decoration: underline;">' +
translation.signupLink +
"</a>.";
}
}
const imageElement = document.querySelector(".publiclogin__avatar");

if (imageElement) {
const svgElement = document.createElement("div");
svgElement.innerHTML = logoSvg;
svgElement.style.width = "350px";

imageElement.parentNode.replaceChild(
svgElement.firstElementChild,
imageElement,
);
} else {
console.error("Image with class .publiclogin__avatar not found");
}
}

document.addEventListener("DOMContentLoaded", () => {
updateLanguage();
const observer = new MutationObserver((mutations) => {
mutations.forEach((mutation) => {
mutation.addedNodes.forEach((node) => {
if (node.nodeType === Node.ELEMENT_NODE) {
if (
node.matches(".login__title") ||
node.querySelector(".login__title")
) {
setTimeout(() => {
updateLanguage();
}, 100);
}
}
});
});
});

if (document.body) {
observer.observe(document.body, { childList: true, subtree: true });
}

const container = document.querySelector(".noresults__image");
if (container) {
container.innerHTML = logoSvg;
} else {
console.error("Container with class .noresults__image not found");
}
});

let currentIndex = 0;

function moveLeft() {
const track = document.getElementById("track");
currentIndex--;
if (currentIndex < 0) {
currentIndex = 1;
}
track.style.transform = "translateX(-" + currentIndex * 1200 + "px)";
}

function moveRight() {
const track = document.getElementById("track");
currentIndex++;
if (currentIndex > 1) {
currentIndex = 0;
}
track.style.transform = "translateX(-" + currentIndex * 1200 + "px)";
}

function hoverIn(card) {
card.style.background = "black";
card.style.color = "white";
}
function hoverOut(card) {
card.style.background = "white";
card.style.color = "black";
}
document.addEventListener("DOMContentLoaded", () => {
const slider = document.getElementById("cardSlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
// #cardSlider/#prevBtn/#nextBtn aren't present on every page this custom
// code runs on (catalog, courses, login, ...) — without this guard,
// slider.children below threw a TypeError on every page that lacks them,
// which could interrupt whatever ran after it in the same script.
if (!slider || !prevBtn || !nextBtn) return;

const cards = slider.children;
if (!cards.length) return;
let currentIndex = 0;
const cardWidth = cards[0].offsetWidth + 20; // card width + margin

function moveSlider() {
slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener("click", () => {
currentIndex++;

if (currentIndex >= cards.length - 2) {
currentIndex = 0;
slider.style.transition = "none";
moveSlider();

setTimeout(() => {
slider.style.transition = "transform 0.5s ease";
}, 50);
} else {
moveSlider();
}
});

prevBtn.addEventListener("click", () => {
currentIndex--;

if (currentIndex < 0) {
currentIndex = cards.length - 3;
slider.style.transition = "none";
moveSlider();

setTimeout(() => {
slider.style.transition = "transform 0.5s ease";
}, 50);
} else {
moveSlider();
}
});
});
document.addEventListener("DOMContentLoaded", function () {
const summaries = [
"Discover how TikTok’s AI-powered automation tool, Smart+, is transforming marketing execution.",
"Learn how TikTok’s AI-powered creative suite, Symphony, can elevate and scale your content.",
"Hear about best practices and learnings to help you take action on TikTok Shop.",
];

const items = document.querySelectorAll(
"div#path-section-content-3903252 .activitycard__textcontainer",
);

items.forEach((item, index) => {
const summaryText = summaries[index] || "No summary available.";
const summaryElement = document.createElement("p");
summaryElement.classList.add("summary");
summaryElement.textContent = summaryText;
item.appendChild(summaryElement);
});
});
document.addEventListener("DOMContentLoaded", function () {
const summaries = [
"From discovery to creativity to commerce, see how we build for what people actually do on TikTok.",
"Discover how to effectively capture attention from an audience that’s open, active, and ready to connect with brands.",
"From insights to scripts, explore how to create smarter, more resonant content using tools built for the TikTok ecosystem.",
"Learn how to meet curiosity with content that converts, and turn discovery into demand.",
"Explore how automation and AI empower marketers to maximize impact and performance for commerce.",
];

const items = document.querySelectorAll(
"div#path-section-content-3990012 .activitycard__textcontainer",
);

items.forEach((item, index) => {
const summaryText = summaries[index] || "No summary available.";
const summaryElement = document.createElement("p");
summaryElement.classList.add("summary");
summaryElement.textContent = summaryText;
item.appendChild(summaryElement);
});
});

document.addEventListener("DOMContentLoaded", () => {
const metaHTML = `
<ul class="activitymeta catalogcard__meta">
<li class="activitymeta__item activitymeta__item--type">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" role="img" aria-labelledby="svgCPPrhvRkq5CbkmTGN0gbKMAr" focusable="false">
<title id="svgCPPrhvRkq5CbkmTGN0gbKMAr">Video</title>
<g fill="currentColor" aria-hidden="true">
<path d="M12.37,7.93l-9,5.14a.5.5,0,0,1-.75-.43V2.36a.5.5,0,0,1,.75-.43l9,5.14A.5.5,0,0,1,12.37,7.93Z"></path>
<rect width="15" height="15" fill="none"></rect>
</g>
</svg>
</li>
</ul>
`;

const catalogCards = document.querySelectorAll(
"#scroll-row-95274 .catalogcard__content",
);

catalogCards.forEach((card) => {
card.insertAdjacentHTML("beforeend", metaHTML);
});
});

document.addEventListener("DOMContentLoaded", function () {
const summaries = [
"Conecte sua marca a consumidores de forma inovadora e aumente as vendas com o TikTok Shop.",
"Nesta sessão, lançamos o TikTok Search Ads, solução feita para alcançar o usuário no momento da descoberta.",
"Com GMV Max, Ad Assistant, Symphony e Smart+, mostramos como combinar criatividade humana e tecnologia inteligente.",
"Líderes criativos de grandes agências discutem o impacto das novas linguagens e tecnologias.",
"Descubra como escalar conteúdo com agilidade, reaproveitar criativos existentes e maximizar impacto sem começar do zero.",
"Dicas para se inspirar em conversas já em curso e usá-las da melhor forma.",
"Mais que awareness, o TikTok ajuda anunciantes a engajar o público e gerar crescimento real nos momentos mais importantes.",
"Mostramos, na prática, como o TikTok Shop gera resultados reais, com insights e aprendizados valiosos para seu negócio.",
"Aprendizados de um estudo com a Accenture mostrando como metodologias avançadas podem aumentar o impacto do mesmo investimento.",
"Três marcas mostram como combinar automação e experimentação para transformar objetivos de marketing em resultados concretos.",
"Reunimos  parceiros estratégicos de mensuração para falar de incrementalidade.",
"Criadores, marcas e comunidade em um só momento cultural.",
"Mostramos o papel da diversidade regional na construção de uma cultura digital mais representativa e conectada.",
"Recebemos a L'Oréal Brasil para um bate-papo sobre a importância da representatividade preta na publicidade. ",
"Discutimos como marcas podem ser agentes ativos na cultura, co-criando movimentos e narrativas que geram identificação, impacto e desejo.",
];

const items = document.querySelectorAll(
"div#path-section-content-3976979 .activitycard__textcontainer",
);

items.forEach((item, index) => {
const summaryText = summaries[index] || "No summary available.";
const summaryElement = document.createElement("p");
summaryElement.classList.add("summary");
summaryElement.textContent = summaryText;
item.appendChild(summaryElement);
});
});
document.addEventListener("DOMContentLoaded", function () {
const summaries = [
"Conecte sua marca a consumidores de forma inovadora e aumente as vendas com o TikTok Shop.",
"Nesta sessão, lançamos o TikTok Search Ads, solução feita para alcançar o usuário no momento da descoberta.",
"Com GMV Max, Ad Assistant, Symphony e Smart+, mostramos como combinar criatividade humana e tecnologia inteligente.",
"Líderes criativos de grandes agências discutem o impacto das novas linguagens e tecnologias.",
"Descubra como escalar conteúdo com agilidade, reaproveitar criativos existentes e maximizar impacto sem começar do zero.",
"Dicas para se inspirar em conversas já em curso e usá-las da melhor forma.",
"Mais que awareness, o TikTok ajuda anunciantes a engajar o público e gerar crescimento real nos momentos mais importantes.",
"Mostramos, na prática, como o TikTok Shop gera resultados reais, com insights e aprendizados valiosos para seu negócio.",
"Aprendizados de um estudo com a Accenture mostrando como metodologias avançadas podem aumentar o impacto do mesmo investimento.",
"Três marcas mostram como combinar automação e experimentação para transformar objetivos de marketing em resultados concretos.",
"Reunimos  parceiros estratégicos de mensuração para falar de incrementalidade.",
"Criadores, marcas e comunidade em um só momento cultural.",
"Mostramos o papel da diversidade regional na construção de uma cultura digital mais representativa e conectada.",
"Recebemos a L'Oréal Brasil para um bate-papo sobre a importância da representatividade preta na publicidade. ",
"Discutimos como marcas podem ser agentes ativos na cultura, co-criando movimentos e narrativas que geram identificação, impacto e desejo.",
];

const items = document.querySelectorAll(
"div#path-section-content-3976978 .activitycard__textcontainer",
);

items.forEach((item, index) => {
const summaryText = summaries[index] || "No summary available.";
const summaryElement = document.createElement("p");
summaryElement.classList.add("summary");
summaryElement.textContent = summaryText;
item.appendChild(summaryElement);
});
});


document.addEventListener("DOMContentLoaded", function () {
const summaries = [
"Hear how top app marketers identify, enter, and sustain success in new markets with TikTok.",
"Explore how brands and creators consistently produce relevant, high-performing TikTok content at scale.",
"Why investing in upper funnel campaigns drives long-term growth, and how to make it measurable.",
"A look at how TikTok Smart+ helps apps optimize performance through automation, creative intelligence, and innovation.",
"Go beyond basic KPIs to uncover how leading apps approach measurement across the full funnel.",
];

const items = document.querySelectorAll(
"div#path-section-content-4162087 .activitycard__textcontainer",
);

items.forEach((item, index) => {
const summaryText = summaries[index] || "No summary available.";
const summaryElement = document.createElement("p");
summaryElement.classList.add("summary");
summaryElement.textContent = summaryText;
item.appendChild(summaryElement);
});
});
document.addEventListener("DOMContentLoaded", function () {
const summaries = [
"Watch the extended conversation with Nazli on creativity, content, and growing with TikTok.",
"Watch the extended conversation with Merve on brand building, performance, and making media count.",
"Watch the extended conversation with Maria on strategy, storytelling, and growing through TikTok.",
"Watch the extended conversation with Valeriia on driving smarter performance and scaling success.",
"Watch the extended conversation with Yana on creative excellence and what works on TikTok.",
"Watch the extended conversation with Dmitrii on market growth, insights, and app trends.",
"Watch the extended conversation with Mirac on content, growth, and building for the long run.",
"Watch the extended conversation with Anastasia on performance, creativity, and scaling globally.",
"Watch the extended conversation with Mert on campaign innovation and creative strategies.",
"Watch the extended conversation with Artem on building impact across the full funnel.",
"Watch the extended conversation with Bohdan on growth marketing and full-funnel thinking.",
"Watch the extended conversation with Ekaterina on performance, creativity, and product growth.",
"Watch the extended conversation with Yana on measurement, user growth, and campaign strategy.",
];

const items = document.querySelectorAll(
"div#path-section-content-4162599 .activitycard__textcontainer",
);

items.forEach((item, index) => {
const summaryText = summaries[index] || "No summary available.";
const summaryElement = document.createElement("p");
summaryElement.classList.add("summary");
summaryElement.textContent = summaryText;
item.appendChild(summaryElement);
});
});

})();

// ---- extracted script block 46 ----
(function () {

document.addEventListener("DOMContentLoaded", () => {
if (window.location.pathname.includes("/student/all_sessions")) {
const container = document.querySelector(".panellayout");
if (!container) return;

const locale =
document.documentElement.lang?.toLowerCase() ||
window.location.pathname.toLowerCase();

const WATCH_NOW_SVG =
'<svg xmlns="http://www.w3.org/2000/svg" width="6" height="9" viewBox="0 0 6 9" fill="none"><path d="M0.75 0.75L4.5 4.5L0.75 8.25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function cardHTML(href, img, title, hashtag, bg) {
return `
<div class="custom-card">
<a href="${href}" class="custom-card__imagewrap" style="background:${bg};">
<span class="">
<img class="custom-card__image" src="${img}">
</span> 
</a>
<p class="custom-card__title">${title}</p>
<a href="${href}" class="custom-card__watchnow">Watch now ${WATCH_NOW_SVG}</a>
</div>
`;
}

function getCardsByLocale(locale) {
if (locale.includes("pt-br")) {
return cardHTML(
"https://www.tiktokacademy.com/student/path/3031148-webinar-replays-america-latina",
"https://i.ibb.co/b5Z2ztpp/america-latina.png",
"América Latina",
"#América Latina",
"#033624",
);
}

if (locale.includes("es-419") || locale.includes("latam")) {
return cardHTML(
"https://www.tiktokacademy.com/student/path/3031150-webinar-replays-latinoamerica",
"http://i.ibb.co/rGh4Q440/latinoamerica.png",
"Latinoamérica",
"#Latinoamérica",
"#033624",
);
}

return (
cardHTML(
"https://www.tiktokacademy.com/sl/5ac117d0",
"https://i.ibb.co/1fLHwGKK/europe.png",
"Europe",
"#Europe",
"#033624",
) +
cardHTML(
"https://www.tiktokacademy.com/student/path/2852927-webinar-replays-north-america",
"https://i.ibb.co/DPhkB34B/north-america.png",
"North America",
"#North America",
"#2DCCD3",
) +
cardHTML(
"https://www.tiktokacademy.com/student/path/3156246-webinar-replays-asia-pacific",
"https://i.ibb.co/4w67444v/1774449224209.png",
"Asia Pacific",
"#Asia-Pacific",
"#EDD4B2",
) +
cardHTML(
"https://www.tiktokacademy.com/student/path/3156248-webinars-on-demand-middle-east-turkey-africa-and-pakistan",
"https://i.ibb.co/4w6h1Jgp/Europe-Middle-East-Pakistan-and-Africa.jpg",
"METAP",
"#Asia-Pacific",
"#edbbe8",
)
);
}

const section = document.createElement("div");
section.className = "custom-section";

section.innerHTML = `
<div class="custom-section__header">
<div>
<h2 class="u-headingsection custom-section__heading">On-demand Webinars</h2>
<p class="catalogcards__description custom-section__subheading">
Browse our recorded webinar sessions with TikTok experts by region.
</p>
</div>
</div>

<div class="custom-card-grid" style="display:grid; grid-template-columns:repeat(4,1fr)!important; gap:10px;">
${getCardsByLocale(locale)}
</div>
`;

container.insertAdjacentElement("afterend", section);

const grid = section.querySelector(".custom-card-grid");
const mobileQuery = window.matchMedia("(max-width: 768px)");
const tabletQuery = window.matchMedia(
"(min-width: 769px) and (max-width: 1024px)",
);

function handleResponsive() {
if (!grid) return;

if (mobileQuery.matches) {
grid.style.gridTemplateColumns = "1fr";
} else if (tabletQuery.matches) {
grid.style.gridTemplateColumns = "repeat(2, 1fr)";
} else {
grid.style.gridTemplateColumns = "repeat(4, 1fr)";
}
}

mobileQuery.addEventListener("change", handleResponsive);
tabletQuery.addEventListener("change", handleResponsive);
handleResponsive();
}
});

})();

// ---- extracted script block 47 ----
(function () {

document.addEventListener("DOMContentLoaded", () => {
function waitForElement(selector, callback) {
const el = document.querySelector(selector);
if (el) {
callback(el);
} else {
setTimeout(() => waitForElement(selector, callback), 100);
}
}

waitForElement(
'a[data-object-name="Credentials Tab"]',
(achievement) => {
const achievement_svg = achievement.querySelector("svg");
achievement.textContent = "Achievements";
if (achievement_svg) {
achievement.appendChild(achievement_svg);
}
},
);
});

})();

// ---- extracted script block 48 ----
(function () {

document.addEventListener("DOMContentLoaded", function () {
const observer = new MutationObserver(() => {
const user_menu = document.querySelector(
'.appusermenu__gamificationitemiconwrapper.hint--top[data-hint="Credentials"]',
);
if (user_menu) {
setTimeout(() => {
user_menu.setAttribute("data-hint", "Achievements");
}, 100); // small delay helps beat re-renders
}

const specificElement = document.querySelector(
".profileCredentials-module-insignias-VPGLu .uikitInsigniasInsignia-module-content-cGUG0",
);
if (specificElement) {
setTimeout(() => {
if (specificElement._tippy) {
specificElement._tippy.setContent("Achievements");
} else if (typeof tippy !== "undefined") {
tippy(specificElement, {
content: "Achievements",
});
}
}, 100); // same delay to ensure element is fully initialized
}
});

observer.observe(document.body, { childList: true, subtree: true });
});

})();

// ---- extracted script block 49 ----
(function () {

(function () {
if (!window.location.pathname.includes("3461396-get-started-with-creative-on-tiktok")) return;

var CONFIG = {
paths: [
{ title: "Creative Learning Path", desc: "A structured curriculum covering creative strategy, production, and iteration — built for marketers who want to level up.", img: "https://i.ibb.co/v6T6PTcf/Frame-1321319677.png", btn: "Start the path", href: "https://www.tiktokacademy.com/sl/e047dd68" },
{ title: "Create video series", desc: "Short, practitioner-led videos with tips straight from creator experts.<br/> Watch in any order.", img: "https://i.ibb.co/CycR5NY/Frame-1321318659.png", btn: "Watch the series", href: "https://www.tiktokacademy.com/sl/e844ec22" },
],
};

var WEBINAR_CONFIG = [
{ keywords: ["apps 101", "growth playbook", "smart+", "smart plus"], tag: "SMART+", tagColor: "#F1204A" },
{ keywords: ["creative that converts", "high-performing", "creative science"], tag: "WEBINAR", tagColor: "#033624" },
{ keywords: ["search ads", "trend signals", "tiktok next"], tag: "SEARCH ADS", tagColor: "#2DCCD3" },
{ keywords: ["lead ads", "lead gen", "scaling leads"], tag: "SMART+", tagColor: "#F1204A" },
{ keywords: ["brand", "brand love", "creative side"], tag: "BRAND", tagColor: "#A855F7" },
{ keywords: ["real profiles", "account identity", "security"], tag: "SECURITY", tagColor: "#22C55E" },
];

var TAG_PALETTE = [
{ tag: "WEBINAR", color: "#2DCCD3" },
{ tag: "WEBINAR", color: "#F1204A" },
{ tag: "WEBINAR", color: "#033624" },
{ tag: "WEBINAR", color: "#A855F7" },
{ tag: "WEBINAR", color: "#FF6B35" },
];

function getWebinarConfig(title) {
var lower = title.toLowerCase();
for (var i = 0; i < WEBINAR_CONFIG.length; i++) {
if (WEBINAR_CONFIG[i].keywords.some(function (kw) { return lower.includes(kw); })) return WEBINAR_CONFIG[i];
}
return { tag: "WEBINAR", tagColor: "#FE2C55", image: "" };
}

var _catalogWebinarCache = null;

var _sessionImageCache = null;

function fetchSessionImagesViaIframe() {
if (_sessionImageCache !== null) return Promise.resolve(_sessionImageCache);
return new Promise(function (resolve) {
var map = {};
var done = false;

function finish() {
if (done) return;
done = true;
clearInterval(pollId);
clearTimeout(timeoutId);
try { document.body.removeChild(iframe); } catch (_) { }
_sessionImageCache = map;
resolve(map);
}

var iframe = document.createElement("iframe");
iframe.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-9999;opacity:0;pointer-events:none;border:none;";
iframe.src = "/student/all_sessions";

function normaliseTitle(t) {
return (t || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function tryExtract() {
try {
var doc = iframe.contentDocument;
if (!doc || !doc.body) return;
var cards = doc.querySelectorAll("li.session");
if (!cards.length) return;
var found = 0;
for (var i = 0; i < cards.length; i++) {
var card = cards[i];
var titleEl = card.querySelector(".session__name a") || card.querySelector(".session__title");
if (!titleEl) continue;
var title = normaliseTitle(titleEl.textContent);
if (!title) continue;
var imgEl = card.querySelector("img.session__image");
if (!imgEl) continue;
var src = imgEl.getAttribute("data-src") || imgEl.getAttribute("src") || "";
if (!src || src.startsWith("data:image/svg") || src.endsWith(".svg")) continue;
map[title] = src;
found++;
}
if (found > 0) finish();
} catch (_) { }
}

var pollId = setInterval(tryExtract, 500);
var timeoutId = setTimeout(finish, 18000);

iframe.addEventListener("load", function () {
setTimeout(tryExtract, 1000);
setTimeout(function () {
try {
var win = iframe.contentWindow;
if (!win) return;
[400, 900, 1500, 2200].forEach(function (y, idx) {
setTimeout(function () { try { win.scrollTo(0, y); tryExtract(); } catch (_) { } }, idx * 400);
});
} catch (_) { }
}, 1200);
});

document.body.appendChild(iframe);
});
}

function fetchCatalogWebinarsViaIframe() {
if (_catalogWebinarCache !== null) return Promise.resolve(_catalogWebinarCache);
return new Promise(function (resolve) {
var result = [];
var done = false;
var earlyFinishId = null;

function finish() {
if (done) return;
done = true;
clearInterval(pollId);
clearTimeout(timeoutId);
clearTimeout(earlyFinishId);
try { document.body.removeChild(iframe); } catch (_) { }
_catalogWebinarCache = result;
resolve(result);
}

var iframe = document.createElement("iframe");
iframe.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-9999;opacity:0;pointer-events:none;border:none;";
iframe.src = "/student/catalog";

var TARGET_HEADINGS = ["on-demand webinars", "join upcoming webinars", "upcoming webinars", "webinars"];

function tryExtract() {
try {
var doc = iframe.contentDocument;
if (!doc) return;
var sections = doc.querySelectorAll(".catalogcards");
for (var s = 0; s < sections.length; s++) {
var sec = sections[s];
var heading = sec.querySelector("h1,h2,h3,h4,h5,h6");
if (!heading) continue;
var ht = heading.textContent.replace(/\s+/g, " ").trim().toLowerCase();
var hasEventCards = !!sec.querySelector(".catalogcard__content--event");
if (!TARGET_HEADINGS.some(function (t) { return ht.includes(t) || t.includes(ht); }) && !hasEventCards) continue;
var items = sec.querySelectorAll(".catalogcards__listitem");
if (!items.length) return; // section exists but cards not rendered yet — keep polling
var extracted = [];
for (var j = 0; j < items.length; j++) {
var item = items[j];
var link = item.querySelector("a[href*='/student/page/']") ||
item.querySelector("a[href*='/student/session/']") ||
item.querySelector("a");
var timeEl = item.querySelector(".catalogcard__time");
var dateText = "";
if (timeEl) {
var tc = timeEl.cloneNode(true);
var cd = tc.querySelector("exceed-countdown-text");
if (cd) cd.remove();
dateText = tc.textContent.replace(/\s+/g, " ").trim().split("-")[0].trim();
}
var titleText = "";
var titleSpan = item.querySelector(".catalogcard__title");
if (titleSpan) {
titleText = titleSpan.textContent.replace(/\s+/g, " ").trim()
.replace(/[\[\]]/g, "").replace(/\s+/g, " ").trim();
}
if (!titleText) {
var content = item.querySelector(".catalogcard__content--event, .catalogcard__content");
if (content) {
var cc = content.cloneNode(true);
[".catalogcard__time", ".catalogcard__sessions", ".catalogcard__personnel",
"exceed-countdown-text", "button", "[class*='enroll']", "[class*='status']",
"[class*='action']", "[class*='footer']", "[class*='personnel']"].forEach(function (sel) {
cc.querySelectorAll(sel).forEach(function (el) { el.remove(); });
});
cc.querySelectorAll("a,span").forEach(function (el) {
if (/^(enrolled?(\s+now)?|register(\s+now)?)$/i.test(el.textContent.trim())) el.remove();
});
titleText = cc.textContent.replace(/\s+/g, " ").trim()
.replace(/[\[\]]/g, "").replace(/\s+/g, " ").trim()
.replace(/\s+(Enrolled?(\s+Now)?|Register(\s+Now)?)\s*$/i, "").trim();
}
}
var imgSrc = "";
var imgEl = item.querySelector(".catalogcard__coverart img");
if (imgEl) {
var si = imgEl.getAttribute("data-src") || imgEl.getAttribute("src") || "";
if (!si.startsWith("data:image/svg") && !si.endsWith(".svg")) imgSrc = si;
}
if (!imgSrc) {
var allEls = item.querySelectorAll("*");
for (var k = 0; k < allEls.length; k++) {
var bg = allEls[k].style.backgroundImage;
if (bg && bg.includes("url(")) {
var m = bg.match(/url\(["']?([^"')]+)["']?\)/);
if (m && m[1] && !m[1].startsWith("data:image/svg") && !m[1].endsWith(".svg")) { imgSrc = m[1]; break; }
}
}
}
if (titleText) extracted.push({ title: titleText, date: dateText, href: link ? link.href : "#", image: imgSrc });
}
if (extracted.length) { result = extracted; finish(); return; }
}
} catch (_) { }
}

var pollId = setInterval(tryExtract, 400);
var timeoutId = setTimeout(finish, 20000);

iframe.addEventListener("load", function () {
setTimeout(tryExtract, 800);
setTimeout(function () {
try {
var win = iframe.contentWindow;
if (!win) return;
[300, 700, 1200, 1800, 2400].forEach(function (y, idx) {
setTimeout(function () { try { win.scrollTo(0, y); tryExtract(); } catch (_) { } }, idx * 500);
});
} catch (_) { }
earlyFinishId = setTimeout(finish, 5500);
}, 1500);
});

document.body.appendChild(iframe);
});
}

function buildWebinarCards(container, webinars) {
if (!webinars || !webinars.length) return false;
container.innerHTML = webinars.map(function (w, i) {
var tagLabel, tagColor;
if (w.tag && w.tagColor) {
tagLabel = w.tag;
tagColor = w.tagColor;
} else {
var cfg = getWebinarConfig(w.title);
var hasMatch = !(cfg.tag === "WEBINAR" && cfg.tagColor === "#FE2C55");
var palette = TAG_PALETTE[i % TAG_PALETTE.length];
tagLabel = hasMatch ? cfg.tag : palette.tag;
tagColor = hasMatch ? cfg.tagColor : palette.color;
}
var image = w.image || "";
var tagText = w.tagTextColor || "#ffffff";
return '<div class="webinar-card">' +
(image ? '<img src="' + image + '" alt="" />' : '') +
(w.tagPath
? '<a href="' + w.tagPath + '" class="webinar-tag" style="background:' + tagColor + ';color:' + tagText + ';text-decoration:none;border:2px solid ' + tagColor + ';">' + tagLabel + '</a>'
: '<span class="webinar-tag" style="background:' + tagColor + ';color:' + tagText + ';border:2px solid ' + tagColor + ';">' + tagLabel + '</span>') +
'<h4>' + w.title + '</h4>' +
'<a href="' + w.href + '">Watch Now</a>' +
'</div>';
}).join("");
return true;
}

function enrichCardsWithPageImages(container, webinars) {
webinars.forEach(function (w, i) {
if (w.image) return;
var fetchUrl = w.href || "";
try {
if (fetchUrl && new URL(fetchUrl).origin !== location.origin) return;
} catch (_) { return; }
fetch(fetchUrl, { credentials: "same-origin" }).then(function (res) {
if (!res.ok) return null;
return res.text();
}).then(function (html) {
if (!html) return;
var doc = new DOMParser().parseFromString(html, "text/html");
var image = "";
var og = doc.querySelector('meta[property="og:image"]');
if (og) {
var c = og.getAttribute("content") || "";
if (c && !c.endsWith(".svg") && !c.includes("branding_logo")) image = c;
}
if (!image) {
var cdnMatch = html.match(/https:\/\/cdn\.exceedlms\.com\/uploads\/resource_course_pictures\/[^"'\s<>\\]+?\.(?:png|jpg|jpeg|webp)/i);
if (cdnMatch) image = cdnMatch[0];
}
if (!image) return;
var card = container.querySelectorAll(".webinar-card")[i];
if (!card || card.querySelector("img")) return;
var img = document.createElement("img");
img.src = image; img.alt = "";
card.insertBefore(img, card.firstChild);
}).catch(function () { });
});
}

var WEBINAR_SKELETON_HTML =
'<div class="webinar-skeleton-card"><div class="wskel-img"></div><div class="wskel-tag"></div><div class="wskel-title"></div><div class="wskel-title wskel-title--short"></div><div class="wskel-btn"></div></div>' +
'<div class="webinar-skeleton-card"><div class="wskel-img"></div><div class="wskel-tag"></div><div class="wskel-title"></div><div class="wskel-title wskel-title--short"></div><div class="wskel-btn"></div></div>' +
'<div class="webinar-skeleton-card"><div class="wskel-img"></div><div class="wskel-tag"></div><div class="wskel-title"></div><div class="wskel-title wskel-title--short"></div><div class="wskel-btn"></div></div>';

function tryRefreshWebinarCards(section) {
var container = section.querySelector(".webinar-cards");
if (!container) return;

function normaliseTitle(t) {
return (t || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

Promise.all([
fetchCatalogWebinarsViaIframe(),
fetchSessionImagesViaIframe()
]).then(function (results) {
var webinars = results[0];
var sessionMap = results[1]; // normalised title → imageUrl
if (!webinars || !webinars.length) return; // timeout with no data — skeleton stays

webinars.forEach(function (w) {
if (w.image) return;
var key = normaliseTitle(w.title);
if (sessionMap[key]) { w.image = sessionMap[key]; return; }
var keys = Object.keys(sessionMap);
for (var k = 0; k < keys.length; k++) {
if (keys[k].includes(key) || key.includes(keys[k])) {
w.image = sessionMap[keys[k]]; return;
}
}
});

webinars.forEach(function (w, i) {
console.log("[CH webinar " + i + "] title:", w.title, "| image:", w.image ? w.image.slice(0, 60) + "…" : "NONE");
});

buildWebinarCards(container, webinars);
if (webinars.some(function (w) { return !w.image; })) {
enrichCardsWithPageImages(container, webinars);
}
});
}

function buildPaths() {
var courses = document.querySelector(".page__courses");
if (!courses || document.querySelector(".ch-paths-section")) return false;
var cardsHTML = CONFIG.paths.map(function (p) {
return '<div class="ch-path-card">' +
'<h2 class="ch-path-card__title">' + p.title + '</h2>' +
'<p class="ch-path-card__desc">' + p.desc + '</p>' +
'<div class="ch-path-card__media">' +
(p.img ? '<img src="' + p.img + '" alt="" class="ch-path-card__img" />' : '<div class="ch-path-card__img-placeholder"></div>') +
'</div>' +
'<a href="' + p.href + '" class="ch-path-card__btn">' + p.btn + ' <img src="https://i.ibb.co/GQsYh7XK/Union.png" alt="" class="ch-path-card__btn-icon" /></a>' +
'</div>';
}).join("");
var section = document.createElement("section");
section.className = "ch-paths-section";
section.id = "ch-paths";
section.innerHTML =
'<div class="ch-paths__header">' +
'<h2 class="ch-paths__heading">Start learning TikTok creative - your way</h2>' +
'<hr class="ch-paths__rule" />' +
'</div>' +
'<div class="ch-paths__grid">' + cardsHTML + '</div>';
courses.parentNode.insertBefore(section, courses);
courses.style.display = "none";
return true;
}

var STATIC_WEBINARS = [
{
title: "Supercharge your creative production at scale with Symphony Creative Studio",
tag: "SYMPHONY",
tagPath: "https://www.tiktokacademy.com/student/catalog/list?search=Symphony",
tagColor: "#BAF6F0",
tagTextColor: "#000000",
image: "https://i.ibb.co/HDT12gD9/Image-1.png",
href: "https://www.tiktokacademy.com/sl/04698138"
},
{
title: "Level Up Your Insights to Unlock Bigger Brand Growth",
tag: "INSIGHTS SPOTLIGHT",
tagPath: "https://www.tiktokacademy.com/student/catalog/list?search=Insights+Spotlight",
tagColor: "#033624",
tagTextColor: "#ffffff",
image: "https://i.ibb.co/tMGVV2vh/Image-2.png",
href: "https://www.tiktokacademy.com/sl/c345c8b9"
},
{
title: "Building High-Impact Creative in TikTok Ads Manager",
tag: "ADS MANAGER",
tagPath: "https://www.tiktokacademy.com/student/catalog/list?search=Ads+Manager",
tagColor: "#2DCCD3",
tagTextColor: "#000000",
image: "https://i.ibb.co/f6g4k05/Image-3.png",
href: "https://www.tiktokacademy.com/sl/c2a90b9f"
}
];

function buildWebinars() {
if (document.querySelector(".ch-webinars-section")) return false;
var main = document.querySelector("main#main") || document.querySelector("main");
if (!main) return false;
var section = document.createElement("section");
section.className = "ch-webinars-section webinars-container";
section.innerHTML =
'<div class="webinar-heading-wrapper">' +
'<div class="section-wrapper">' +
'<div class="webinar-heading">' +
'<div class="webinar-heading__left">' +
'<h2>On-demand webinars</h2>' +
'<p class="webinar-subtitle">Watch recorded webinars to learn directly from TikTok experts.</p>' +
'</div>' +
'</div>' +
'</div>' +
'</div>' +
'<div class="webinar-slider-wrapper">' +
'<div class="webinar-cards"></div>' +
'</div>';
main.appendChild(section);
var cards = section.querySelector(".webinar-cards");
buildWebinarCards(cards, STATIC_WEBINARS);
return true;
}

var BULLET_ICONS = [
"https://i.ibb.co/ycvmv8Lx/TT-ICON-BULLHORN-ON-BLACK-1-1.png",
"https://i.ibb.co/XxvVfchn/TT-ICON-CREATIVE-TOOLS-ON-BLACK-1-1.png",
"https://i.ibb.co/1f7L0QCk/TT-ICON-EDUCATION-8-ON-BLACK-1-1.png"
];

function patchBannerLogo() {
var contentSide = document.querySelector(".creative_hub .new_banner--featured .content-side");
if (!contentSide || contentSide.querySelector(".ch-banner-logo")) return;
var title = contentSide.querySelector(".banner_title");
if (!title) return;
var img = document.createElement("img");
img.src = "https://i.ibb.co/tMSRQdv4/TTA-Logo4x.png";
img.alt = "TikTok Academy";
img.className = "ch-banner-logo";
img.style.cssText = "display:block;height:40px;width:auto;margin-bottom:20px;";
contentSide.insertBefore(img, title);
}

function patchBullets() {
var ul = document.querySelector(".creative_hub .banner_bullets");
if (!ul || ul.dataset.chPatched) return;
ul.dataset.chPatched = "1";
ul.style.cssText = "display:flex;flex-direction:row;gap:32px;list-style:none;padding:0;margin-top:28px;flex-wrap:wrap;";
var items = ul.querySelectorAll(".banner_bullet");
items.forEach(function (li, i) {
var svg = li.querySelector(".tick-icon");
if (svg) svg.remove();
if (BULLET_ICONS[i]) {
var img = document.createElement("img");
img.src = BULLET_ICONS[i];
img.alt = "";
img.style.cssText = "width:32px;height:32px;object-fit:contain;flex-shrink:0;";
li.insertBefore(img, li.firstChild);
}
li.style.cssText = "display:flex;align-items:center;gap:10px;color:#fff;font-size:16px;font-weight:600;list-style:none;";
});
}

function run() {
var cm = document.querySelector(".coursepage__contentmain");
if (cm) cm.classList.add("creative_hub");
document.body.classList.add("creative_hub_page");

patchBullets();
buildPaths();
buildWebinars();
}

var mo = new MutationObserver(run);
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", function () { run(); mo.observe(document.body, { childList: true, subtree: true }); });
} else {
run();
mo.observe(document.body, { childList: true, subtree: true });
}
})();

})();

// ---- extracted script block 50 ----
(function () {

(function () {
if (!window.location.pathname.includes("3419946")) return;

var MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
var TZ_MAP = {
ACDT: 10.5, ACST: 9.5, ADT: -3, AEDT: 11, AEST: 10, AFT: 4.5, AKDT: -8, AKST: -9,
AST: -4, AWST: 8, AZT: 4, BNT: 8, BOT: -4, BRT: -3, BST: 1, BTT: 6,
CCT: 6.5, CDT: -5, CEST: 2, CET: 1, CST: -6, EAT: 3, EDT: -4, EEST: 3,
EET: 2, EST: -5, GET: 4, GMT: 0, GST: 4, HKT: 8, HST: -10, ICT: 7,
IDT: 3, IST: 5.5, JST: 9, KST: 9, MDT: -6, MSK: 3, MST: -7, MYT: 8,
NCT: 11, NDT: -2.5, NFT: 11.5, NST: -3.5, NZDT: 13, NZST: 12, PDT: -7, PET: -5,
PGT: 10, PHT: 8, PKT: 5, PST: -8, RET: 4, SGT: 8, SST: -11, TLT: 9,
TOT: 13, TVT: 12, UTC: 0, VET: -4.5, WAT: 1, WEST: 1, WET: 0, WIB: 7,
WIT: 9, WITA: 8, WST: 13
};

var SESSION_RE = /([A-Za-z]+,\s+[A-Za-z]+ \d{1,2},\s+\d{4})\s+at\s+(\d{1,2}:\d{2}\s*[AP]M)\s+to\s+(\d{1,2}:\d{2}\s*[AP]M)\s+([A-Z]{2,5})/i;

function toUTC(fullDateStr, timeStr, tzAbbr) {
var offset = TZ_MAP[tzAbbr.toUpperCase()];
if (offset == null) return null;

var d = fullDateStr.replace(/^[A-Za-z]+,\s*/, '').match(/([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})/);
if (!d) return null;
var month = MONTHS[d[1]], day = parseInt(d[2]), year = parseInt(d[3]);

var t = timeStr.match(/(\d{1,2}):(\d{2})\s*([AP]M)/i);
if (!t) return null;
var h = parseInt(t[1]), m = parseInt(t[2]), ap = t[3].toUpperCase();
if (ap === 'PM' && h !== 12) h += 12;
if (ap === 'AM' && h === 12) h = 0;

var utcMs = Date.UTC(year, month, day, h, m) - Math.round(offset * 60) * 60000;
return isNaN(utcMs) ? null : new Date(utcMs);
}

function jst(dt, opts) {
return new Intl.DateTimeFormat('en-US', Object.assign({ timeZone: 'Asia/Tokyo' }, opts)).format(dt);
}

function toJSTString(fullDate, start, end, tz) {
var s = toUTC(fullDate, start, tz), e = toUTC(fullDate, end, tz);
if (!s || !e) return null;
return jst(s, { weekday: 'long' }) + ', ' +
jst(s, { month: 'short' }) + ' ' +
jst(s, { day: 'numeric' }) + ', ' +
jst(s, { year: 'numeric' }) + ' at ' +
jst(s, { hour: 'numeric', minute: '2-digit', hour12: true }) + ' to ' +
jst(e, { hour: 'numeric', minute: '2-digit', hour12: true }) + ' JST';
}

function processNode(node) {
if (!SESSION_RE.test(node.textContent)) return;
var replaced = node.textContent.replace(SESSION_RE, function (_, fd, s, e, tz) {
return toJSTString(fd, s, e, tz) || _;
});
if (replaced !== node.textContent) node.textContent = replaced;
}

function walk(root) {
var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
var node;
while ((node = walker.nextNode())) processNode(node);
}

var observer = new MutationObserver(function (mutations) {
mutations.forEach(function (m) {
if (m.type === 'characterData') {
processNode(m.target);
} else {
m.addedNodes.forEach(function (n) {
if (n.nodeType === 1) walk(n);
else if (n.nodeType === 3) processNode(n);
});
}
});
});

function init() {
walk(document.body);
observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}

document.readyState === 'loading'
? document.addEventListener('DOMContentLoaded', init)
: init();
})();

})();

// ---- extracted script block 51 ----
(function () {

(function () {
function init() {
if (
window.location.pathname !== "/student/catalog"
) {
return;
}

if (!document.querySelector("#tiktok-font")) {
const pre1 = document.createElement("link");
pre1.rel = "preconnect";
pre1.href = "https://fonts.googleapis.com";
document.head.appendChild(pre1);

const pre2 = document.createElement("link");
pre2.rel = "preconnect";
pre2.href = "https://fonts.gstatic.com";
pre2.crossOrigin = "anonymous";
document.head.appendChild(pre2);

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.id = "tiktok-font";
fontLink.href =
"https://fonts.googleapis.com/css2?family=TikTok+Sans:opsz,wght@12..36,300..900&display=swap";

document.head.appendChild(fontLink);
}

if (!document.querySelector("#tiktok-font-style")) {
const style = document.createElement("style");

style.id = "tiktok-font-style";

style.innerHTML = `
body {
font-family: 'TikTok Sans', sans-serif !important;
}
`;

document.head.appendChild(style);
}

const webinarDates = document.querySelectorAll(".catalogcard__time");

webinarDates.forEach((dateEl) => {
const countdown = dateEl.querySelector("exceed-countdown-text");

if (countdown) {
countdown.style.display = "none";
}

const fullText = dateEl.childNodes[0]?.textContent || "";

const shortDate = fullText.split("-")[0].trim();

dateEl.textContent = shortDate;
});

const allSections = document.querySelectorAll(".catalogcards");

const sectionHeadings = document.querySelectorAll(".catalogcards h2");

sectionHeadings.forEach((heading) => {
const headingText = heading.textContent.replace(/\s+/g, " ").trim();

if (headingText === "Explore our learning paths") {
const section = heading.closest(".catalogcards");

if (!section) return;

section.classList.add("learning-paths-section");

const items = section.querySelectorAll(".catalogcards__listitem");

const data = [
{
title: "Become a Media Buying Expert",

description:
"Explore our media buying courses on how to choose the right ad formats, reach your target audience, and drive results.",

button: "Start learning",
},

{
title: "Become a creative Expert",

description:
"Explore our creative courses on how to develop your creative idea, shoot and edit your TikTok videos, and scale your creative with variations.",

button: "Start learning",
},
];

items.forEach((item, index) => {
if (item.querySelector(".learning-path-content")) {
return;
}

const existingLink = item.querySelector("a");

const existingHref = existingLink?.href || "#";

const content = document.createElement("div");

content.className = "learning-path-content";

content.innerHTML = `
<div class="learning-path-inner">

<h3 class="learning-path-title">
${data[index]?.title || ""}
</h3>

<p class="learning-path-description">
${data[index]?.description || ""}
</p>

<a
href="${existingHref}"
class="learning-path-btn"
target="_blank"
rel="noopener noreferrer"
>
${data[index]?.button || "Learn More"}
</a>

</div>
`;

item.prepend(content);
});
}
});

allSections.forEach((section) => {
const heading = section.querySelector("h1, h2, h3, h4, h5, h6");

if (!heading) return;

const headingText = heading.textContent.replace(/\s+/g, " ").trim();

if (headingText === "Join upcoming webinars") {
section.classList.add("webinar-section");

section.style.background = "#EDD4B2";

section.style.width = "100vw";

section.style.position = "relative";

section.style.left = "50%";

section.style.right = "50%";

section.style.marginLeft = "-50vw";

section.style.marginRight = "-50vw";

section.style.padding = "80px 0px";

section.style.overflow = "hidden";

const list = section.querySelector(".catalogcards__list");

if (list) {
list.style.display = "flex";

list.style.flexWrap = "nowrap";

list.style.overflowX = "auto";

list.style.overflowY = "hidden";

list.style.scrollBehavior = "smooth";

list.style.scrollbarWidth = "none";

list.style.msOverflowStyle = "none";

if (!document.querySelector("#webinar-scrollbar-style")) {
const style = document.createElement("style");

style.id = "webinar-scrollbar-style";

style.innerHTML = `
.webinar-section .catalogcards__list::-webkit-scrollbar {
display: none;
}
`;

document.head.appendChild(style);
}

const items = list.querySelectorAll(".catalogcards__listitem");

const webinarData = [
{
tag: "SEARCH ADS",
image:
"https://i.ibb.co/jZZnfTmj/TTA-Webinar-Tik-Tok-Mini-Games-Mobile-Banner-Size-1100x620.webp",
},

{
tag: "SMART+",
image:
"https://i.ibb.co/rG6h8G5V/TTA-Webinar-Capturing-High-Quality-Leads-on-Tik-Tok-with-Smart-Mobile-Banner-Size-1100x620-2.webp",
},
];

items.forEach((item, index) => {
const content = item.querySelector(
".catalogcard__content--event",
);

if (!content) return;

if (content.querySelector(".custom-webinar-tag")) {
return;
}

const tag = document.createElement("div");

tag.className = "custom-webinar-tag";

tag.textContent = webinarData[index]?.tag || "Webinar";

tag.style.display = "inline-flex";
tag.style.padding = "2px 10px";

tag.style.background = index === 0 ? "#2DCCD3" : "#F1204A";

tag.style.color = "#fff";

tag.style.borderRadius = "999px";

tag.style.fontSize = "10px";

tag.style.fontWeight = "900";

tag.style.width = "fit-content";

tag.style.marginBottom = "20px";

content.prepend(tag);

const image = document.createElement("img");

image.src = webinarData[index]?.image || "";

image.alt = webinarData[index]?.tag || "Webinar Image";

image.className = "custom-webinar-image";

image.style.width = "100%";

image.style.height = "220px";

image.style.objectFit = "cover";

image.style.borderRadius = "16px";

image.style.marginTop = "24px";

content.appendChild(image);
});

items.forEach((item) => {
item.style.flex = "0 0 31%";

item.style.minWidth = "31%";
});

const header = section.querySelector(".catalogcards__header");

if (header && !header.querySelector(".custom-webinar-nav")) {
const existingNav = header.querySelector(
".catalogcards__navbuttons",
);

if (existingNav) {
existingNav.style.display = "none";
}

const nav = document.createElement("div");

nav.className = "custom-webinar-nav";

nav.innerHTML = `
<button class="webinar-prev">
←
</button>

<button class="webinar-next">
→
</button>
`;

nav.style.display = "flex";

nav.style.gap = "12px";

nav.style.alignItems = "center";

nav.style.marginLeft = "auto";

header.style.display = "flex";

header.style.alignItems = "center";

header.style.justifyContent = "space-between";

const headerText = header.querySelector(
".catalogcards__headertext",
);

if (headerText) {
headerText.appendChild(nav);

headerText.style.display = "flex";
headerText.style.alignItems = "center";
headerText.style.justifyContent = "space-between";
headerText.style.gap = "24px";
headerText.style.width = "100%";
}

const buttons = nav.querySelectorAll("button");

buttons.forEach((btn) => {
btn.style.width = "48px";

btn.style.height = "48px";

btn.style.borderRadius = "50%";

btn.style.border = "1px solid #000";

btn.style.background = "transparent";

btn.style.cursor = "pointer";

btn.style.fontSize = "20px";
});

nav.querySelector(".webinar-next").onclick = () => {
list.scrollBy({
left: 420,
behavior: "smooth",
});
};

nav.querySelector(".webinar-prev").onclick = () => {
list.scrollBy({
left: -420,
behavior: "smooth",
});
};
}
}
}
});

const sectionsToHide = [
"Browse POV videos",
"Browse Create for TikTok videos",
"Browse TikTok Unpacked videos",
"Up Next",
];

allSections.forEach((section) => {
const heading = section.querySelector("h1, h2, h3, h4, h5, h6");

if (!heading) return;

const headingText = heading.textContent.replace(/\s+/g, " ").trim();

if (sectionsToHide.includes(headingText)) {
section.classList.add("section-hide");
}
});
}

document.addEventListener("DOMContentLoaded", function () {
setTimeout(init, 1500);
});

let lastUrl = location.href;

const observer = new MutationObserver(() => {
if (location.href !== lastUrl) {
lastUrl = location.href;

setTimeout(init, 1500);
}
});

window.addEventListener("load", () => {
if (document.body) {
observer.observe(document.body, {
childList: true,
subtree: true,
});
}
});
})();

})();

// ---- extracted script block 52 ----
(function () {

(function () { 
if (window.location.pathname === "/student/catalog") {
window._ttaLoaderGated = true;
setTimeout(function () {
if (window._ttaLoaderDismiss) window._ttaLoaderDismiss();
}, 4000);
}

let _lastBuiltLocale = null;

const LOCALE_STRINGS = {
en: { subtitle: "The official TikTok learning destination for marketers and agencies.", mediaBuying: "Become a Media Buying Expert", creative: "Become a Creative Expert", startLearning: "Start learning", mediaBuyingDesc: "Explore our media buying courses on how to choose the right ad formats, reach your target audience, and drive results.", creativeDesc: "Explore our creative courses on how to develop your creative idea, shoot and edit your TikTok videos, and scale your creative with variations." },
"es-419": { subtitle: "El destino oficial de aprendizaje de TikTok para marketeros y agencias", mediaBuying: "Conviértete en un experto en compra de medios", creative: "Conviértete en un experto en elementos creativos", startLearning: "Empezar a aprender", mediaBuyingDesc: "Explora nuestros cursos de compra de medios sobre cómo elegir los formatos de anuncios correctos, llegar a tu público objetivo y generar resultados.", creativeDesc: "Explora nuestros cursos de creatividades sobre cómo desarrollar tu idea creativa, grabar y editar tus videos de TikTok, y escalar tu creatividad con variaciones." },
"pt-br": { subtitle: "O destino oficial de aprendizagem do TikTok para profissionais de marketing e agências", mediaBuying: "Torne-se um especialista em compra de mídia", creative: "Torne-se um especialista em criativos", startLearning: "Começar a aprender", mediaBuyingDesc: "Explore nossos cursos de compra de mídia sobre como escolher os formatos de anúncio certos, alcançar seu público-alvo e gerar resultados.", creativeDesc: "Explore nossos cursos de criativos sobre como desenvolver sua ideia criativa, gravar e editar seus vídeos do TikTok e escalar sua criatividade com variações." },
ko: { subtitle: "마케터와 에이전시 고객분들을 위한 틱톡의 공식 학습 플랫폼 입니다.", mediaBuying: "미디어 구매 전문가 되기", creative: "크리에이티브 전문가 되기", startLearning: "학습을 시작하세요", mediaBuyingDesc: "올바른 광고 형식을 선택하고, 타겟 고객에게 도달하며, 성과를 이끌어내는 방법을 다루는 미디어 구매 강좌를 살펴보세요.", creativeDesc: "크리에이티브 아이디어를 발전시키고, TikTok 영상을 촬영 및 편집하고, 다양한 버전으로 크리에이티브를 확장하는 방법을 다루는 크리에이티브 강좌를 살펴보세요." },
it: { subtitle: "La destinazione di apprendimento ufficiale di TikTok per addetti al marketing e agenzie.", mediaBuying: "Diventare esperti di media buying", creative: "Diventare esperti creativi", startLearning: "Inizia la formazione", mediaBuyingDesc: "Scopri i nostri corsi di media buying su come scegliere i formati pubblicitari giusti, raggiungere il tuo pubblico di riferimento e ottenere risultati.", creativeDesc: "Scopri i nostri corsi creativi su come sviluppare la tua idea creativa, girare e montare i tuoi video TikTok e scalare la tua creatività con le varianti." },
ar: { subtitle: "الوجهة الرسمية لتعلم TikTok للمسوقين والوكالات.", mediaBuying: "اكتسب خبرة في شراء الوسائط", creative: "اكتسب خبرة في التصاميم الإبداعية", startLearning: "ابدأ التعلُّم", mediaBuyingDesc: "استكشف دوراتنا في شراء الوسائط حول كيفية اختيار تنسيقات الإعلانات المناسبة، والوصول إلى جمهورك المستهدف، وتحقيق النتائج.", creativeDesc: "استكشف دوراتنا الإبداعية حول كيفية تطوير فكرتك الإبداعية، وتصوير ومونتاج فيديوهات TikTok الخاصة بك، وتوسيع نطاق إبداعك من خلال الاختلافات." },
id: { subtitle: "Tujuan pembelajaran resmi TikTok untuk para pemasar dan agensi.", mediaBuying: "Jadilah Pakar Media Buying", creative: "Jadilah Pakar Kreatif", startLearning: "Mulai Pelajari", mediaBuyingDesc: "Jelajahi kursus media buying kami tentang cara memilih format iklan yang tepat, menjangkau audiens target Anda, dan mendorong hasil.", creativeDesc: "Jelajahi kursus kreatif kami tentang cara mengembangkan ide kreatif Anda, merekam dan mengedit video TikTok Anda, serta mengembangkan kreativitas Anda dengan variasi." },
zh: { subtitle: "面向营销人员和代理商的 TikTok 官方学习平台。", mediaBuying: "成为媒体购买专家", creative: "成为创意专家", startLearning: "开始学习", mediaBuyingDesc: "探索我们的媒体购买课程，学习如何选择合适的广告格式、触达目标受众并提升效果。", creativeDesc: "探索我们的创意课程，学习如何开发创意构思、拍摄和剪辑 TikTok 视频，并通过多种变体扩展你的创意。" },
ja: { subtitle: "マーケターと代理店のためのTikTok公式学習サイト。", mediaBuying: "メディアバイイングのプロになる", creative: "クリエイティブのプロになる", startLearning: "学習を始める", mediaBuyingDesc: "適切な広告フォーマットの選び方、ターゲットオーディエンスへのリーチ方法、成果の出し方を学べるメディアバイイングコースをご覧ください。", creativeDesc: "クリエイティブなアイデアの発想方法、TikTok動画の撮影・編集方法、バリエーションを活用したクリエイティブの拡張方法を学べるクリエイティブコースをご覧ください。" },
th: { subtitle: "แหล่งการเรียนรู้อย่างเป็นทางการของแพลตฟอร์ม TikTok สำหรับนักการตลาดและเอเจนซี", mediaBuying: "ฝึกฝนทักษะให้คุณเป็นผู้เชี่ยวชาญในการซื้อสื่อ", creative: "ฝึกฝนทักษะให้คุณเป็นผู้เชี่ยวชาญในการสร้างชิ้นงานโฆษณา", startLearning: "เริ่มเรียนกันเลย", mediaBuyingDesc: "สำรวจคอร์สการซื้อสื่อของเราเกี่ยวกับวิธีเลือกรูปแบบโฆษณาที่เหมาะสม เข้าถึงกลุ่มเป้าหมาย และสร้างผลลัพธ์", creativeDesc: "สำรวจคอร์สความคิดสร้างสรรค์ของเราเกี่ยวกับวิธีพัฒนาไอเดียสร้างสรรค์ ถ่ายทำและตัดต่อวิดีโอ TikTok ของคุณ และขยายผลงานสร้างสรรค์ด้วยหลากหลายรูปแบบ" },
vi: { subtitle: "Học viện chính thức dành cho các nhà tiếp thị và đại lý của TikTok", mediaBuying: "Trở thành chuyên gia mua nội dung truyền thông", creative: "Trở thành chuyên gia về mẫu quảng cáo", startLearning: "Bắt đầu học", mediaBuyingDesc: "Khám phá các khóa học mua nội dung truyền thông của chúng tôi về cách chọn định dạng quảng cáo phù hợp, tiếp cận đối tượng mục tiêu và mang lại kết quả.", creativeDesc: "Khám phá các khóa học sáng tạo của chúng tôi về cách phát triển ý tưởng sáng tạo, quay và chỉnh sửa video TikTok, đồng thời mở rộng quy mô sáng tạo với nhiều biến thể." },
fr: { subtitle: "La plateforme d'apprentissage officielle de TikTok pour les spécialistes du marketing et les agences.", mediaBuying: "Devenez un expert de l'achat de médias", creative: "Devenez un expert du contenu publicitaire", startLearning: "Commencer à apprendre", mediaBuyingDesc: "Découvrez nos cours sur l'achat de médias pour apprendre à choisir les bons formats publicitaires, atteindre votre audience cible et générer des résultats.", creativeDesc: "Découvrez nos cours sur le contenu publicitaire pour apprendre à développer votre idée créative, filmer et monter vos vidéos TikTok, et décliner votre créativité en plusieurs variantes." },
es: { subtitle: "El lugar oficial de educación sobre TikTok para marketeros y agencias", mediaBuying: "Conviértete en experto en compra de medios", creative: "Conviértete en un experto en creatividades", startLearning: "Empieza a aprender", mediaBuyingDesc: "Descubre nuestros cursos de compra de medios sobre cómo elegir los formatos de anuncio adecuados, llegar a tu público objetivo y generar resultados.", creativeDesc: "Descubre nuestros cursos de creatividades sobre cómo desarrollar tu idea creativa, grabar y editar tus vídeos de TikTok, y ampliar tu creatividad con variaciones." },
de: { subtitle: "Die offizielle TikTok Lernplattform für Marketers und Agenturen.", mediaBuying: "Werde Mediabuying-Expert*in", creative: "Werde Creative-Expert*in", startLearning: "Jetzt beginnen", mediaBuyingDesc: "Entdecke unsere Mediabuying-Kurse und erfahre, wie du die richtigen Anzeigenformate auswählst, deine Zielgruppe erreichst und Ergebnisse erzielst.", creativeDesc: "Entdecke unsere Creative-Kurse und erfahre, wie du deine kreative Idee entwickelst, deine TikTok-Videos drehst und bearbeitest und deine Creatives mit Variationen skalierst." },
tr: { subtitle: "Pazarlamacilar ve ajanslar için resmi TikTok ögrenme adresi.", mediaBuying: "Medya Satın Alma Uzmanı Olun", creative: "Kreatif Uzmanı Olun", startLearning: "Öğrenmeye Başlayın", mediaBuyingDesc: "Doğru reklam formatlarını seçme, hedef kitlenize ulaşma ve sonuç elde etme konularında medya satın alma kurslarımızı keşfedin.", creativeDesc: "Yaratıcı fikrinizi geliştirme, TikTok videolarınızı çekme ve düzenleme, varyasyonlarla yaratıcılığınızı ölçeklendirme konularında kreatif kurslarımızı keşfedin." },
};

function getLocale() {
const urlParams = new URLSearchParams(window.location.search);
const raw = (urlParams.get("locale") || document.documentElement.lang || "en").toLowerCase().trim();
if (LOCALE_STRINGS[raw]) return raw;
if (raw.startsWith("pt")) return "pt-br";
if (raw.startsWith("zh")) return "zh";
const short = raw.split("-")[0];
return LOCALE_STRINGS[short] ? short : "en";
}

function applyLocaleToSections(locale) {
const ls = LOCALE_STRINGS[locale] || LOCALE_STRINGS.en;
const s1p = document.querySelector(".hero-container .section-wrapper p");
if (s1p) s1p.textContent = ls.subtitle;
const lpCards = document.querySelectorAll(".learing-path-container .flex-div-inner");
if (lpCards[0]) {
const span = lpCards[0].querySelector(".buying-expert");
if (span) span.textContent = ls.mediaBuying;
const desc = lpCards[0].querySelector("p");
if (desc) desc.textContent = ls.mediaBuyingDesc;
const btn = lpCards[0].querySelector("a");
if (btn) btn.textContent = ls.startLearning;
}
if (lpCards[1]) {
const span = lpCards[1].querySelector(".creative-expert");
if (span) span.textContent = ls.creative;
const desc = lpCards[1].querySelector("p");
if (desc) desc.textContent = ls.creativeDesc;
const btn = lpCards[1].querySelector("a");
if (btn) btn.textContent = ls.startLearning;
}
}

const WEBINAR_CONFIG = [
{
keywords: ["trend signals", "tiktok next"],
tag: "SEARCH ADS",
tagColor: "#2DCCD3",
tagTextColor: "#ffffff",
tagPath: "https://www.tiktokacademy.com/student/catalog/list?search=Search+Ads",
image: "https://i.ibb.co/kgFsStD6/Frame-1321318659-3.png",
},
{
keywords: ["lead ads 101", "lead ads", "scaling leads", "lead gen", "lead generation"],
tag: "LEAD GENERATION",
tagColor: "#EDBBE8",
tagTextColor: "#000000",
tagPath: "https://www.tiktokacademy.com/student/catalog/list?search=Lead+Generation",
image: "",
},
{
keywords: ["tiktok shop", "shop ads", "shopping", "commerce"],
tag: "TIKTOK SHOP",
tagColor: "#BAF6F0",
tagTextColor: "#000000",
tagPath: "https://www.tiktokacademy.com/student/catalog/list?search=TikTok+Shop",
image: "",
},
{
keywords: ["apps 101", "tiktok apps", "growth playbook", "smart+", "smart plus", "app campaign"],
tag: "APP",
tagColor: "#4A0505",
tagTextColor: "#ffffff",
tagPath: "https://www.tiktokacademy.com/student/catalog/list?search=App",
image: "",
},
{
keywords: ["real profiles", "account identity"],
tag: "SECURITY",
tagColor: "#22C55E",
tagTextColor: "#ffffff",
tagPath: "https://www.tiktokacademy.com/student/catalog/list?search=Security",
image: "https://i.ibb.co/cSZ9YZd3/Frame-1321318666-1.png",
},
{
keywords: ["brand", "creative side", "creative that converts", "high-performing creative", "creative science"],
tag: "CREATIVE",
tagColor: "#EDBBE8",
tagTextColor: "#000000",
tagPath: "https://www.tiktokacademy.com/student/catalog/list?search=Creative",
image: "https://i.ibb.co/Xkd67RDG/Frame-1321318666-2.png",
},
];

function getWebinarConfig(title) {
const lower = title.toLowerCase();
for (const cfg of WEBINAR_CONFIG) {
if (cfg.keywords.some((kw) => lower.includes(kw))) return cfg;
}
return { tag: "WEBINAR", tagColor: "#FE2C55", image: "" };
}

function fetchSessionImagesViaIframe() {
return new Promise((resolve) => {
const map = {};
let done = false;
let earlyFinishId = null;
let _lastMapSize = 0;
let _stablePolls = 0;
const STABLE_NEEDED = 3; // 3 × 400 ms = 1.2 s of no new data → done

const finish = () => {
if (done) return;
done = true;
clearInterval(pollId);
clearTimeout(timeoutId);
clearTimeout(earlyFinishId);
try { document.body.removeChild(iframe); } catch (_) { }
resolve(map);
};

const iframe = document.createElement("iframe");
iframe.style.cssText =
"position:fixed;top:0;left:0;width:100vw;height:100vh;" +
"z-index:-9999;opacity:0;pointer-events:none;border:none;";
iframe.src = "/student/all_sessions";

const tryExtract = () => {
try {
const doc = iframe.contentDocument;
if (!doc || !doc.body) return;

let fastHits = 0;
doc.querySelectorAll("li.session, li[class*='session']").forEach((card) => {
const titleEl =
card.querySelector(".session__name a") ||
card.querySelector(".session__title") ||
card.querySelector("[class*='name'] a") ||
card.querySelector("h1,h2,h3,h4");
const imgEl =
card.querySelector("img.session__image") ||
card.querySelector("img[class*='session']") ||
card.querySelector("img[data-src]") ||
card.querySelector("img[src]");
if (!titleEl || !imgEl) return;
const src = imgEl.getAttribute("data-src") || imgEl.getAttribute("src") || "";
if (!src || src.startsWith("data:image/svg") || src.endsWith(".svg")) return;
if (src.includes("branding_logo")) return;
const title = titleEl.textContent.replace(/\s+/g, " ").trim();
if (title && !map[title]) { map[title] = src; fastHits++; }
});

if (fastHits === 0) {
doc.querySelectorAll("img[data-src], img[src]").forEach((el) => {
const src = el.getAttribute("data-src") || el.getAttribute("src") || "";
if (!src || src.startsWith("data:image/svg") || src.endsWith(".svg")) return;
if (src.includes("organizations/branding_logos") || src.includes("branding_logo")) return;
let titleEl = null;
let node = el.parentElement;
for (let depth = 0; depth < 8 && node; depth++) {
titleEl = node.querySelector(
"h1, h2, h3, h4, [class*='title'], [class*='heading'], [class*='name']"
);
if (titleEl) break;
node = node.parentElement;
}
if (!titleEl) return;
const title = titleEl.textContent.replace(/\s+/g, " ").trim();
if (title && !map[title]) map[title] = src;
});
}

const currentSize = Object.keys(map).length;
if (currentSize > 0 && currentSize === _lastMapSize) {
if (++_stablePolls >= STABLE_NEEDED) { finish(); return; }
} else {
_stablePolls = 0;
}
_lastMapSize = currentSize;
} catch (_) { }
};

const pollId = setInterval(tryExtract, 400);
const timeoutId = setTimeout(finish, 25000); // hard backstop

iframe.addEventListener("load", () => {
setTimeout(tryExtract, 200);
setTimeout(() => {
try {
const win = iframe.contentWindow;
if (!win) return;
[400, 800, 1200, 1800, 2400].forEach((y, idx) => {
setTimeout(() => {
try { win.scrollTo(0, y); tryExtract(); } catch (_) { }
}, idx * 250);
});
} catch (_) { }
}, 400);
earlyFinishId = setTimeout(finish, 2000);
});
document.body.appendChild(iframe);
});
}

let _sessionImageMap = null;
let _sessionImageMapPromise = null;
function getSessionImageMap() {
if (_sessionImageMap !== null) return Promise.resolve(_sessionImageMap);
if (_sessionImageMapPromise !== null) return _sessionImageMapPromise;
_sessionImageMapPromise = fetchSessionImagesViaIframe().then((m) => {
_sessionImageMap = m;
return m;
});
return _sessionImageMapPromise;
}

function extractWebinarData(sessionImageMap) {
for (const section of document.querySelectorAll(".catalogcards")) {
const heading = section.querySelector("h1,h2,h3,h4,h5,h6");
if (!heading) continue;
const ht = heading.textContent.replace(/\s+/g, " ").trim().toLowerCase();
const hasEventCards = !!section.querySelector(".catalogcard__content--event");
const hasTimedCards = section.querySelectorAll(".catalogcard__time").length > 0;
const isWebinarSection =
["join upcoming webinars", "upcoming webinars"].some(t => ht.includes(t)) ||
hasEventCards ||
hasTimedCards;
if (!isWebinarSection) continue;

const items = section.querySelectorAll(".catalogcards__listitem");
if (!items.length) return [];

return Array.from(items)
.map((item) => {
const link =
item.querySelector("a[href*='/student/page/']") ||
item.querySelector("a[href*='/student/session/']") ||
item.querySelector("a");
const timeEl = item.querySelector(".catalogcard__time");

let dateText = "";
if (timeEl) {
const clone = timeEl.cloneNode(true);
const countdown = clone.querySelector("exceed-countdown-text");
if (countdown) countdown.remove();
dateText = clone.textContent.replace(/\s+/g, " ").trim();
}

let titleText = "";
const titleSpan = item.querySelector(".catalogcard__title");
if (titleSpan) {
titleText = titleSpan.textContent.replace(/\s+/g, " ").trim();
titleText = titleText.replace(/[\[\]]/g, "").replace(/\s+/g, " ").trim();
}

if (!titleText) {
const content = item.querySelector(
".catalogcard__content--event, .catalogcard__content",
);
if (content) {
const clone = content.cloneNode(true);
[
".catalogcard__time",
".catalogcard__sessions",
".catalogcard__hosts",
".catalogcard__host",
".catalogcard__speakers",
".catalogcard__personnel",
"exceed-countdown-text",
"button",
"[class*='enroll']",
"[class*='status']",
"[class*='action']",
"[class*='footer']",
"[class*='host']",
"[class*='speaker']",
"[class*='personnel']",
".custom-webinar-tag",   // injected by the first catalog IIFE
".custom-webinar-image", // injected by the first catalog IIFE
].forEach((sel) =>
clone.querySelectorAll(sel).forEach((el) => el.remove()),
);
clone.querySelectorAll("a, span").forEach((el) => {
if (/^(enrolled?(\s+now)?|register(\s+now)?)$/i.test(el.textContent.trim())) {
el.remove();
}
});
titleText = clone.textContent.replace(/\s+/g, " ").trim();
titleText = titleText.replace(/[\[\]]/g, "").replace(/\s+/g, " ").trim();
titleText = titleText
.replace(/\s+(Enrolled?(\s+Now)?|Register(\s+Now)?)\s*$/i, "")
.trim();
}
}

let imgSrc = "";

if (sessionImageMap && titleText) {
const norm = (s) => s.toLowerCase().replace(/[\[\]]/g, "").replace(/\s+/g, " ").trim();
const lc = norm(titleText);

for (const [k, v] of Object.entries(sessionImageMap)) {
if (norm(k) === lc) { imgSrc = v; break; }
}

if (!imgSrc) {
const probe = lc.slice(0, 40);
for (const [k, v] of Object.entries(sessionImageMap)) {
const kl = norm(k);
if (probe.length > 10 && (kl.includes(probe) || lc.includes(kl.slice(0, 40)))) {
imgSrc = v;
break;
}
}
}
}

if (!imgSrc) {
const imgEl = item.querySelector(".catalogcard__coverart img");
if (imgEl) {
const src = imgEl.getAttribute("data-src") || imgEl.getAttribute("src") || "";
if (src && !src.startsWith("data:image/svg") && !src.endsWith(".svg")) {
imgSrc = src;
}
}
}

if (!imgSrc) {
for (const el of item.querySelectorAll("[style*='background']")) {
const bg = el.style.backgroundImage;
if (bg && bg.includes("url(")) {
const m = bg.match(/url\(["']?([^"')]+)["']?\)/);
if (m && m[1] && !m[1].startsWith("data:image/svg") && !m[1].endsWith(".svg")) {
imgSrc = m[1];
break;
}
}
}
}

if (!imgSrc) {
const svgImg = item.querySelector("svg image");
if (svgImg) {
const href =
svgImg.getAttribute("href") ||
svgImg.getAttribute("xlink:href") ||
svgImg.getAttribute("data-href") || "";
if (href && !href.startsWith("data:image/svg") && !href.endsWith(".svg")) {
imgSrc = href;
}
}
}

if (!imgSrc) {
const root = item.querySelector("[data-image],[data-thumbnail],[data-cover]");
if (root) {
const attr = root.getAttribute("data-image") ||
root.getAttribute("data-thumbnail") ||
root.getAttribute("data-cover") || "";
if (attr && !attr.startsWith("data:image/svg")) imgSrc = attr;
}
}

return {
title: titleText,
date: dateText,
href: link ? link.href : "#",
image: imgSrc,
};
})
.filter((w) => w.title);
}
return null;
}

const TAG_PALETTE = [
{ tag: "WEBINAR", color: "#2DCCD3" },
{ tag: "WEBINAR", color: "#F1204A" },
{ tag: "WEBINAR", color: "#033624" },
{ tag: "WEBINAR", color: "#EDBBE8        " },
{ tag: "WEBINAR", color: "#FF6B35" },
{ tag: "WEBINAR", color: "#0099FF" },
];

function buildWebinarCards(container, webinars) {
if (!webinars || webinars.length === 0) return false;
container.innerHTML = webinars
.map((w, i) => {
const cfg = getWebinarConfig(w.title);
const hasConfigMatch = cfg.tag !== "WEBINAR" || cfg.tagColor !== "#FE2C55";
const palette = TAG_PALETTE[i % TAG_PALETTE.length];
const tagLabel = hasConfigMatch ? cfg.tag : palette.tag;
const tagColor = hasConfigMatch ? cfg.tagColor : palette.color;
const tagTextColor = hasConfigMatch ? (cfg.tagTextColor || "#ffffff") : "#ffffff";
const tagPath = hasConfigMatch ? (cfg.tagPath || "") : "";
const image = w.image || cfg.image || "";
return `
<div class="webinar-card">
${tagPath
? `<a class="webinar-tag" href="${tagPath}" style="background:${tagColor};color:${tagTextColor};text-decoration:none;border:2px solid ${tagColor};">${tagLabel}</a>`
: `<span class="webinar-tag" style="background:${tagColor};color:${tagTextColor};border:2px solid ${tagColor};">${tagLabel}</span>`
}
<p class="webinar-date">${w.date}</p>
<h4>${w.title}</h4>
<a href="${w.href}" class="enroll-now">Enroll Now</a>
${image
? `<img src="${image}" alt="" loading="eager" decoding="async">`
: `<div class="wskel-img" data-webinar-imgplaceholder></div>`
}
</div>`;
})
.join("");
return true;
}

async function enrichCardsWithPageImages(container, webinars) {
await Promise.all(
webinars.map(async (w, i) => {
if (w.image) return; // already resolved by session map or DOM extraction

let fetchUrl = w.href || "";
try {
if (fetchUrl && new URL(fetchUrl).origin !== location.origin) return;
} catch (_) { return; }

let image = "";
try {
const res = await fetch(fetchUrl, { credentials: "same-origin" });
if (res.ok) {
const html = await res.text();
const doc = new DOMParser().parseFromString(html, "text/html");

const og = doc.querySelector('meta[property="og:image"]');
if (og) {
const c = og.getAttribute("content") || "";
if (
c &&
!c.endsWith(".svg") &&
!c.startsWith("data:image/svg") &&
!c.includes("organizations/branding_logos") &&
!c.includes("branding_logo")
) {
image = c;
}
}

if (!image) {
const cdnMatch = html.match(
/https:\/\/cdn\.exceedlms\.com\/uploads\/resource_course_pictures\/[^"'\s<>\\]+?\.(?:png|jpg|jpeg|webp)/i
);
if (cdnMatch) image = cdnMatch[0];
}

if (!image) {
for (const sel of [
".session__image",
"img[class*='session']",
"[class*='coverart'] img",
"[class*='cover'] img",
"img[data-src*='cdn.exceedlms']",
"img[src*='cdn.exceedlms']",
]) {
const img = doc.querySelector(sel);
if (!img) continue;
const src =
img.getAttribute("data-src") || img.getAttribute("src") || "";
if (src && !src.startsWith("data:image/svg") && !src.endsWith(".svg")) {
image = src;
break;
}
}
}
}
} catch (_) {
}

if (!image) return;

const card = container.querySelectorAll(".webinar-card")[i];
if (!card || card.querySelector("img")) return;
const img = document.createElement("img");
img.src = image;
img.alt = "";
const placeholder = card.querySelector(".wskel-img");
if (placeholder) {
placeholder.replaceWith(img);
} else {
card.appendChild(img);
}
}),
);
}

function _hideWebinarsSection() {
const section = document.querySelector(".webinars-container");
if (section) section.style.display = "none";
const lp = document.querySelector(".learing-path-container");
if (lp) lp.style.paddingTop = "0";
}

function _showWebinarsSection() {
const section = document.querySelector(".webinars-container");
if (section) section.style.display = "";
const lp = document.querySelector(".learing-path-container");
if (lp) lp.style.paddingTop = "";
}

function _waitForWebinarImages(container) {
if (typeof window._ttaLoaderDismiss !== "function") return;
var imgs = Array.from(container.querySelectorAll(".webinar-card img"));
if (!imgs.length) { window._ttaLoaderDismiss(); return; }
var remaining = imgs.length;
var settled = false;
var tid = setTimeout(function () {
if (!settled) { settled = true; window._ttaLoaderDismiss(); }
}, 5000);
function check() {
if (--remaining <= 0 && !settled) {
settled = true;
clearTimeout(tid);
window._ttaLoaderDismiss();
}
}
imgs.forEach(function (img) {
if (img.complete && img.naturalWidth > 0) { check(); return; }
img.addEventListener("load", function h() { img.removeEventListener("load", h); check(); });
img.addEventListener("error", function h() { img.removeEventListener("error", h); check(); });
});
}

function tryRefreshWebinarCards(attemptsLeft) {
if (attemptsLeft <= 0) {
_hideWebinarsSection();
if (typeof window._ttaLoaderDismiss === "function") window._ttaLoaderDismiss();
return;
}
const container = document.querySelector(
".webinars-container .webinar-cards",
);
if (!container) return;

const quickWebinars = extractWebinarData(null);
if (quickWebinars === null) {
setTimeout(() => tryRefreshWebinarCards(attemptsLeft - 1), 500);
return;
}
if (quickWebinars.length === 0) {
_hideWebinarsSection();
if (typeof window._ttaLoaderDismiss === "function") window._ttaLoaderDismiss();
return;
}

buildWebinarCards(container, quickWebinars);
quickWebinars.forEach((w) => {
const url = w.image || (getWebinarConfig(w.title) || {}).image || "";
if (url) { const img = new Image(); img.src = url; }
});

getSessionImageMap().then((sessionImageMap) => {
const enrichedWebinars = extractWebinarData(sessionImageMap);
if (enrichedWebinars && enrichedWebinars.length > 0) {
buildWebinarCards(container, enrichedWebinars);
_showWebinarsSection();
_waitForWebinarImages(container);
if (enrichedWebinars.some((w) => !w.image)) {
enrichCardsWithPageImages(container, enrichedWebinars);
}
} else {
_hideWebinarsSection();
if (typeof window._ttaLoaderDismiss === "function") window._ttaLoaderDismiss();
}
});
}

function init() {
if (window.location.pathname !== "/student/catalog") return;

getSessionImageMap();

const showTopBanner = false;

if (showTopBanner && !document.querySelector(".top-webinar-banner")) {
const topBanner = document.createElement("div");

topBanner.className = "top-webinar-banner";

topBanner.innerHTML = `
<div class="top-webinar-banner-inner">

<div class="banner-content">
<span class="banner-label">Webinar:</span>

<span class="banner-text">
Real Profiles, Real Results: TikTok's Account Identity Update for Regulated Industries
</span>

<a href="#" class="banner-link">
Register now
<span>›</span>
</a>
</div>

<button class="banner-close">
✕
</button>

</div>
`;

const heroSection = document.querySelector(".hero")
|| document.querySelector("exceed-hero-video.herovideo")
|| document.querySelector(".catalogcards");

if (heroSection) {
heroSection.insertAdjacentElement("beforebegin", topBanner);
} else {
document.body.prepend(topBanner);
}

const closeBtn = topBanner.querySelector(".banner-close");

closeBtn.addEventListener("click", () => {
topBanner.remove();
});
}

if (!document.querySelector("#tiktok-font")) {
const pre1 = document.createElement("link");
pre1.rel = "preconnect";
pre1.href = "https://fonts.googleapis.com";
document.head.appendChild(pre1);

const pre2 = document.createElement("link");
pre2.rel = "preconnect";
pre2.href = "https://fonts.gstatic.com";
pre2.crossOrigin = "anonymous";
document.head.appendChild(pre2);

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.id = "tiktok-font";
fontLink.href =
"https://fonts.googleapis.com/css2?family=TikTok+Sans:opsz,wght@12..36,300..900&display=swap";
document.head.appendChild(fontLink);
}

if (!document.querySelector("#tiktok-font-style")) {
const style = document.createElement("style");
style.id = "tiktok-font-style";
style.innerHTML = `
body, body * {
font-family: 'TikTok Sans', sans-serif !important;
}
`;
document.head.appendChild(style);
}

const heroDiv = document.querySelector('section[aria-labelledby="carousel-heading"]')
|| document.querySelector(".hero")
|| document.querySelector("exceed-hero-video.herovideo")
|| document.querySelector(".catalogcards");
if (heroDiv) {
heroDiv.style.display = "none";
}

const headings = document.querySelectorAll("h2");

headings.forEach((heading) => {
if (
heading.textContent.trim().toLowerCase() ===
"explore our learning paths"
) {
const parentSection = heading.closest(".catalogcards");
if (parentSection) {
parentSection.style.display = "none";
}
}
});

const catalogcards = document.querySelectorAll(".catalogcards");

catalogcards.forEach((card) => {
if (!card.querySelector(".catalogcards__htmlcontent")) {
card.style.display = "none";
}
});
if (document.querySelector(".hero-container")) {
const _currentLocale = getLocale();
if (_lastBuiltLocale === _currentLocale) {
applyLocaleToSections(_currentLocale);
const _wc = document.querySelector(".webinars-container .webinar-cards");
if (_wc) tryRefreshWebinarCards(40);
return;
}
[".hero-container", ".video-container", ".webinars-container",
".learing-path-container", ".video-series-container"].forEach(function (sel) {
const el = document.querySelector(sel);
if (el) el.remove();
});
setTimeout(init, 300);
return;
}

if (!heroDiv) { setTimeout(init, 300); return; }

const section1 = document.createElement("section");
section1.className = "hero-container";

const _ls = LOCALE_STRINGS[getLocale()] || LOCALE_STRINGS.en;
section1.innerHTML = `
<div class="section-wrapper">
<div><h2>TikTok Academy</h2></div>
<div>
<p>${_ls.subtitle}</p>
<a class="register-now" href="#">Register Now</a>
</div>
</div>
`;

heroDiv.insertAdjacentElement("afterend", section1);

const section2 = document.createElement("section");
section2.className = "video-container";

heroDiv.style.display = "";
section2.appendChild(heroDiv);

section1.insertAdjacentElement("afterend", section2);

if (heroDiv.matches('section[aria-labelledby="carousel-heading"]')) {
const _fixCarouselSizing = () => window.dispatchEvent(new Event("resize"));
requestAnimationFrame(_fixCarouselSizing);
setTimeout(_fixCarouselSizing, 300);
setTimeout(_fixCarouselSizing, 1000);

const _forceHeroImageSizing = () => {
if (window.innerWidth > 480) return;
heroDiv.querySelectorAll(".hero--carousel").forEach((heroEl) => {
heroEl.style.setProperty("height", "480px", "important");
});
heroDiv
.querySelectorAll(".hero__link, picture.hero__image")
.forEach((el) => {
el.style.setProperty("display", "block", "important");
el.style.setProperty("width", "100%", "important");
el.style.setProperty("height", "100%", "important");
});
heroDiv.querySelectorAll(".hero--carousel img").forEach((img) => {
img.style.setProperty("position", "absolute", "important");
img.style.setProperty("top", "0", "important");
img.style.setProperty("left", "0", "important");
img.style.setProperty("width", "100%", "important");
img.style.setProperty("height", "100%", "important");
img.style.setProperty("object-fit", "cover", "important");
});
};
_forceHeroImageSizing();
requestAnimationFrame(_forceHeroImageSizing);
setTimeout(_forceHeroImageSizing, 300);
setTimeout(_forceHeroImageSizing, 1000);
window.addEventListener("resize", _forceHeroImageSizing);
const _carouselListForSizing = heroDiv.querySelector(".carousel__list");
if (_carouselListForSizing) {
new MutationObserver(_forceHeroImageSizing).observe(
_carouselListForSizing,
{ childList: true, subtree: true },
);
}
}

const heroOverlay = document.querySelector(".catalogcards__htmlcontent .hero-overlay");
const isCarousel = heroDiv.matches('section[aria-labelledby="carousel-heading"]');
if (heroOverlay) {
section2.appendChild(heroOverlay);

if (isCarousel) {
const TARGET_IMAGE_MATCHES = [
"desktop-bahasa-indonesia.png", "mobile-bahasa-indonesia.jpg", // id
"desktop-deutsch.png", "mobile-deutsch.png", // de
"homepage-english-first-slide-1100x400.png", // en
"desktop-espanol.png", "mobile-espanol.png", // es
"desktop-espanol-latam.png", "mobile-espanol-latam.png", // es-419
"desktop-french.png", "mobile-french.png", // fr
"desktop-italian.png", "mobile-italian.png", // it
"desktop-portugese.png", "mobile-portugese.png", // pt-BR
"desktop-vietnamese.png", "mobile-vietnamese.png", // vi
"desktop-turkish.png", "mobile-turkish.png", // tr
"desktop-arabic.png", "mobile-arabc.png", // ar (filename as given — note the "Arabc" typo below)
"desktop-thai.png", "mobile-thai.png", // th
"desktop-japanese.png", "mobile-japanese.png", // ja
"desktop-chinese.png", "mobile-chinese.png", // zh
"desktop-korean.png", "mobile-korean.png", // ko
];
const _imgSourcesOf = (li) => {
const img = li.querySelector("img");
if (!img) return "";
return [
img.getAttribute("src"),
img.getAttribute("data-src"),
img.getAttribute("srcset"),
img.getAttribute("data-srcset"),
]
.filter(Boolean)
.join(" ")
.toLowerCase();
};
const _matchesTarget = (li) => {
const sources = _imgSourcesOf(li);
return TARGET_IMAGE_MATCHES.some((name) => sources.includes(name));
};
const _anyMatchExists = Array.from(
heroDiv.querySelectorAll(".carousel__listitem"),
).some(_matchesTarget);

heroOverlay.style.display = "none";

if (_anyMatchExists) {
const _carouselList = heroDiv.querySelector(".carousel__list");
const _syncOverlayToTargetSlide = () => {
if (!_carouselList) { heroOverlay.style.display = "none"; return; }
const items = Array.from(_carouselList.children).filter((li) =>
li.classList.contains("carousel__listitem"),
);
const transform =
_carouselList.style.transform || getComputedStyle(_carouselList).transform;
let translateX = 0;
const t3d = transform.match(/translate3d\(\s*(-?[\d.]+)px/);
if (t3d) {
translateX = parseFloat(t3d[1]);
} else {
const mx = transform.match(/matrix\(([^)]+)\)/);
if (mx) translateX = parseFloat(mx[1].split(",")[4]) || 0;
}
const slideWidth =
(items[0] && items[0].getBoundingClientRect().width) || 0;
if (!slideWidth) { heroOverlay.style.display = "none"; return; }
const visibleIndex = Math.round(Math.abs(translateX) / slideWidth);
const visibleSlide = items[visibleIndex];
heroOverlay.style.display =
visibleSlide && _matchesTarget(visibleSlide) ? "" : "none";
};
_syncOverlayToTargetSlide();
if (_carouselList) {
new MutationObserver(_syncOverlayToTargetSlide).observe(_carouselList, {
attributes: true,
attributeFilter: ["style"],
});
}
window.addEventListener("resize", _syncOverlayToTargetSlide);
} else {
console.warn(
"[TTA] hero-overlay: no carousel slide matched any of",
TARGET_IMAGE_MATCHES,
". Found image sources:",
Array.from(heroDiv.querySelectorAll(".carousel__listitem")).map(_imgSourcesOf),
);
}
}
}

const section3 = document.createElement("section");
section3.className = "learing-path-container";

section3.innerHTML = `
<div class="section-wrapper">
<h3>Explore our <span class="mobile-block">learning paths</span></h3>

<div class="flex-div">
<div class="flex-div-inner">
<div class="learning-paths-wrapper">
<h4><span class="buying-expert">${_ls.mediaBuying}</span></h4>
<p>${_ls.mediaBuyingDesc}</p>
</div>
<div class="learning-paths-img">
<a href="https://www.tiktokacademy.com/sl/15e9a854">${_ls.startLearning}</a>
<img src="https://cdn.jsdelivr.net/gh/mirza-wq/tiktok-academy-assets-git@main/Group-01.png">
</div>
</div>

<div class="flex-div-inner">
<div class="learning-paths-wrapper">
<h4><span class="creative-expert">${_ls.creative}</span></h4>
<p>${_ls.creativeDesc}</p>
</div>
<div class="learning-paths-img">
<a href="https://www.tiktokacademy.com/sl/7e498dc4">${_ls.startLearning}</a>
<img src="https://cdn.jsdelivr.net/gh/mirza-wq/tiktok-academy-assets-git@main/Group-02.png">
</div>
</div>
</div>
</div>
`;


const section4 = document.createElement("section");
section4.className = "webinars-container";

section4.innerHTML = `
<div class="webinar-heading-wrapper">
<div class="section-wrapper">
<div class="webinar-heading">
<h3>Join upcoming webinars</h3>
<div class="webinar-arrows webinar-arrows--top">
<button class="arrow-btn prev-btn">&#8249;</button>
<button class="arrow-btn next-btn">&#8250;</button>
</div>
</div>
</div>
</div>
<div class="webinar-slider-wrapper">
<div class="webinar-cards"></div>
<div class="webinar-arrows webinar-arrows--bottom">
<button class="arrow-btn prev-btn">&#8249;</button>
<button class="arrow-btn next-btn">&#8250;</button>
</div>
</div>
`;

section2.insertAdjacentElement("afterend", section4);

section4.style.display = "none";

tryRefreshWebinarCards(40);

(function () {
let obsTriggered = false;
const obs = new MutationObserver(function () {
if (obsTriggered) return;
const data = extractWebinarData(null);
if (!data || data.length === 0) return;
obsTriggered = true;
obs.disconnect();
const _obsSection = document.querySelector(".webinars-container");
const c = _obsSection && _obsSection.querySelector(".webinar-cards");
if (c) {
_showWebinarsSection();
buildWebinarCards(c, data);
}
});
obs.observe(document.body, { childList: true, subtree: true });
setTimeout(function () { obs.disconnect(); }, 60000);
})();

const webinarSlider = section4.querySelector(".webinar-cards");
const prevBtns = section4.querySelectorAll(".prev-btn");
const nextBtns = section4.querySelectorAll(".next-btn");

let targetLeft = 0;

function getScrollAmount() {
const card = webinarSlider.querySelector(".webinar-card");
if (!card) return 300;
return card.offsetWidth + 16;
}

nextBtns.forEach(btn => btn.addEventListener("click", () => {
const maxScroll = webinarSlider.scrollWidth - webinarSlider.clientWidth;
targetLeft = Math.min(targetLeft + getScrollAmount(), maxScroll);
webinarSlider.scrollTo({ left: targetLeft, behavior: "smooth" });
}));

prevBtns.forEach(btn => btn.addEventListener("click", () => {
targetLeft = Math.max(targetLeft - getScrollAmount(), 0);
webinarSlider.scrollTo({ left: targetLeft, behavior: "smooth" });
}));

webinarSlider.addEventListener("scroll", () => {
clearTimeout(webinarSlider._scrollTimer);
webinarSlider._scrollTimer = setTimeout(() => {
targetLeft = webinarSlider.scrollLeft;
}, 150);
});

section4.insertAdjacentElement("afterend", section3);
_lastBuiltLocale = getLocale();
if (window._ttaLoaderDismiss) window._ttaLoaderDismiss();
}

if (window.location.pathname === "/student/catalog") {
getSessionImageMap();
}

document.addEventListener("DOMContentLoaded", function () {
init();
});

let lastUrl = location.href;

new MutationObserver(() => {
if (location.href !== lastUrl) {
lastUrl = location.href;
setTimeout(init, 1500);
}
}).observe(document.body, {
childList: true,
subtree: true,
});

let _lastLang = document.documentElement.lang || "";
new MutationObserver(function () {
const newLang = document.documentElement.lang || "";
if (newLang === _lastLang) return;
_lastLang = newLang;
if (window.location.pathname !== "/student/catalog") return;

if (!document.querySelector(".hero-container")) {
setTimeout(init, 500);
return;
}

const locale = getLocale();
applyLocaleToSections(locale);
_hideWebinarsSection();
const _wc = document.querySelector(".webinars-container .webinar-cards");
if (_wc) {
_wc.innerHTML = "";
tryRefreshWebinarCards(40);
}
}).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();

})();
