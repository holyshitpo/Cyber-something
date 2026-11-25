const $ = (s) => document.querySelector(s);
const STORAGE = {threads:"cyberheart_threads", guests:"cyberheart_guests", name:"cyberheart_name"};
const seedThreads = [
 {id:1,category:"general",title:"does anyone else miss old internet?",body:"I miss custom profile pages, tiny pixel buttons, and spending 40 minutes picking a song for my profile. What do you miss most?",author:"strawberry.exe",date:"2005-08-14",replies:[{author:"pixelprincess",body:" glitter cursors and silly quizzes forever!!"}]},
 {id:2,category:"music",title:"drop your current favorite song ♫",body:"Let's make a giant community mixtape. Tell us what you've been listening to lately!",author:"mixtape_girl",date:"2005-08-12",replies:[]},
 {id:3,category:"art",title:"show us your desktop / web design",body:"Made a tiny graphic or a personal homepage? Share what you're working on. Be nice and give constructive feedback.",author:"htmlangel",date:"2005-08-10",replies:[{author:"softstatic",body:"I am making a pink pixel shrine!!"}]},
 {id:4,category:"games",title:"what are you playing after school?",body:"Browser games, cozy games, retro games — all recommendations welcome.",author:"ctrl_alt_cute",date:"2005-08-08",replies:[]}
];
let threads = load(STORAGE.threads, seedThreads);
let guests = load(STORAGE.guests, [
 {name:"moonbeam",message:"this place is so cute!! ♡"},
 {name:"pixelkid",message:"first!! leaving sparkles here ✧"}
]);
let activeCategory = "all", activeThread = null;
function load(key, fallback){try{const value=localStorage.getItem(key);return value?JSON.parse(value):fallback}catch{return fallback}}
function save(){localStorage.setItem(STORAGE.threads,JSON.stringify(threads));localStorage.setItem(STORAGE.guests,JSON.stringify(guests))}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function categoryName(c){return ({general:"GENERAL",music:"MUSIC",art:"ART & WEB",games:"GAMES"})[c]||"GENERAL"}
function renderThreads(){
 const query=$("#search").value.trim().toLowerCase();
 const filtered=threads.filter(t=>(activeCategory==="all"||t.category===activeCategory)&&(!query||(t.title+" "+t.body+" "+t.author).toLowerCase().includes(query)));
 $("#thread-list").innerHTML=filtered.length?filtered.map(t=>`<article class="thread"><div class="thread-icon">${({general:"☻",music:"♫",art:"✿",games:"★"})[t.category]}</div><div><h3>${escapeHTML(t.title)}</h3><p>${escapeHTML(t.body.slice(0,105))}${t.body.length>105?"…":""}</p><p>by <b>${escapeHTML(t.author)}</b> · ${categoryName(t.category)}</p></div><div class="thread-meta">${t.replies.length} replies<br><button class="button secondary" data-open="${t.id}">READ →</button></div></article>`).join(""):`<div class="empty-state">no threads found... be the first to post! ♡</div>`;
}
function renderGuests(){$("#guest-entries").innerHTML=guests.slice().reverse().map(g=>`<div class="guest-entry"><b>${escapeHTML(g.name)}</b>: ${escapeHTML(g.message)}</div>`).join("")}
function openThread(id){
 activeThread=threads.find(t=>t.id===id);if(!activeThread)return;
 $("#reply-title").textContent=activeThread.title;
 $("#reply-content").innerHTML=`<p><b>${escapeHTML(activeThread.author)}</b> · ${categoryName(activeThread.category)}</p><p>${escapeHTML(activeThread.body)}</p><hr>${activeThread.replies.length?activeThread.replies.map(r=>`<div class="reply-item"><b>${escapeHTML(r.author)}</b><p>${escapeHTML(r.body)}</p></div>`).join(""):"<p class='tiny'>No replies yet. Start the conversation!</p>"}`;
 $("#reply-dialog").showModal();
}
$("#thread-list").addEventListener("click",e=>{const btn=e.target.closest("[data-open]");if(btn)openThread(Number(btn.dataset.open))});
document.querySelectorAll(".category").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".category").forEach(b=>b.classList.remove("active"));btn.classList.add("active");activeCategory=btn.dataset.category;renderThreads()}));
$("#search").addEventListener("input",renderThreads);$("#search-clear").addEventListener("click",()=>{$("#search").value="";renderThreads()});
$("#topic-form").addEventListener("submit",e=>{e.preventDefault();const title=$("#topic-title").value.trim(),body=$("#topic-body").value.trim();if(!title||!body)return;threads.unshift({id:Date.now(),category:$("#topic-category").value,title,body,author:localStorage.getItem(STORAGE.name)||"internet stranger",date:new Date().toISOString().slice(0,10),replies:[]});save();e.target.reset();$("#form-message").textContent="Your thread is live! thanks for posting ♡";activeCategory="all";document.querySelectorAll(".category").forEach(b=>b.classList.toggle("active",b.dataset.category==="all"));renderThreads();$("#forums").scrollIntoView({behavior:"smooth"})});
$("#reply-form").addEventListener("submit",e=>{e.preventDefault();const body=$("#reply-text").value.trim();if(!body||!activeThread)return;activeThread.replies.push({author:localStorage.getItem(STORAGE.name)||"internet stranger",body});save();$("#reply-text").value="";openThread(activeThread.id);renderThreads()});
$("#guest-form").addEventListener("submit",e=>{e.preventDefault();const name=$("#guest-name").value.trim(),message=$("#guest-message").value.trim();if(!name||!message)return;guests.push({name,message});save();e.target.reset();renderGuests()});
function setName(name){localStorage.setItem(STORAGE.name,name);$("#welcome-name").textContent=name||"internet stranger";$("#username").value=name}
$("#save-name").addEventListener("click",()=>{const name=$("#username").value.trim().slice(0,18);setName(name);$("#welcome-name").textContent=name||"internet stranger"});
function tick(){const d=new Date();$("#clock").textContent=d.toLocaleDateString("pt-BR")+" · "+d.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}
tick();setInterval(tick,30000);setName(localStorage.getItem(STORAGE.name)||"");renderThreads();renderGuests();
$("#visitor-count").textContent=String(4200+Number(localStorage.getItem("cyberheart_visits")||0)+1).padStart(6,"0");localStorage.setItem("cyberheart_visits",String(Number(localStorage.getItem("cyberheart_visits")||0)+1));
