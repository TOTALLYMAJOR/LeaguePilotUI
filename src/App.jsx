import { useEffect, useLayoutEffect } from "react";

const sourceScripts = [
  {
    "src": "https://cdn.tailwindcss.com",
    "type": "",
    "id": "",
    "async": false,
    "defer": false,
    "content": ""
  },
  {
    "src": "https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js",
    "type": "",
    "id": "",
    "async": false,
    "defer": false,
    "content": ""
  }
];
const sourceHtmlId = "";
const sourceHtmlClassName = "";
const sourceHtmlStyle = "";
const sourceBodyId = "";
const sourceBodyClassName = "antialiased flex flex-col min-h-screen pt-8 selection:bg-blue-100 selection:text-blue-900 bg-gray-950 text-gray-100";
const sourceBodyStyle = "font-family: 'Inter', sans-serif;";
const inlineEventAttributeNames = [
  "click",
  "change",
  "input",
  "submit",
  "mouseover",
  "mouseout",
  "mouseenter",
  "mouseleave",
  "keydown",
  "keyup",
  "focus",
  "blur"
];

function applyElementAttributes(element, attributes) {
  const previousId = element.id;
  const previousClassName = element.className;
  const previousStyleAttribute = element.getAttribute("style");

  if (attributes.id) {
    element.id = attributes.id;
  }
  attributes.className
    .split(/\s+/)
    .filter(Boolean)
    .forEach((className) => element.classList.add(className));
  if (attributes.style) {
    element.style.cssText = [element.style.cssText, attributes.style]
      .filter(Boolean)
      .join("; ");
  }

  return () => {
    element.id = previousId;
    element.className = previousClassName;
    if (previousStyleAttribute === null) {
      element.removeAttribute("style");
    } else {
      element.setAttribute("style", previousStyleAttribute);
    }
  };
}

function applySourceRootAttributes() {
  const restoreHtml = applyElementAttributes(document.documentElement, {
    id: sourceHtmlId,
    className: sourceHtmlClassName,
    style: sourceHtmlStyle,
  });
  const restoreBody = applyElementAttributes(document.body, {
    id: sourceBodyId,
    className: sourceBodyClassName,
    style: sourceBodyStyle,
  });

  return () => {
    restoreBody();
    restoreHtml();
  };
}

function attachInlineEventHandlers(root) {
  const cleanups = [];

  inlineEventAttributeNames.forEach((eventName) => {
    root
      .querySelectorAll(`[data-aura-on${eventName}]`)
      .forEach((element) => {
        const handlerCode = element.getAttribute(`data-aura-on${eventName}`);
        if (!handlerCode) return;

        const listener = function (event) {
          const result = Function("event", handlerCode).call(element, event);
          if (result === false) {
            event.preventDefault();
            event.stopPropagation();
          }
        };
        element.addEventListener(eventName, listener);
        cleanups.push(() => element.removeEventListener(eventName, listener));
      });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function appendSourceScript(scriptInfo) {
  const script = document.createElement("script");
  if (scriptInfo.id) script.id = scriptInfo.id;
  if (scriptInfo.type) script.type = scriptInfo.type;
  if (scriptInfo.async) script.async = true;
  if (scriptInfo.defer) script.defer = true;
  if (scriptInfo.src) {
    script.src = scriptInfo.src;
  } else if (scriptInfo.content) {
    script.textContent = scriptInfo.content;
  }
  document.body.appendChild(script);
  return script;
}

export default function App() {
  useLayoutEffect(() => applySourceRootAttributes(), []);

  useEffect(() => {
    const detachInlineEventHandlers = attachInlineEventHandlers(document);
    const appendedScripts = sourceScripts
      .filter((scriptInfo) => scriptInfo.src || scriptInfo.content)
      .map(appendSourceScript);

    return () => {
      detachInlineEventHandlers();
      appendedScripts.forEach((script) => script.remove());
    };
  }, []);

  return (
    <div className="aura-source-body antialiased flex flex-col min-h-screen pt-8 selection:bg-blue-100 selection:text-blue-900 bg-gray-950 text-gray-100" style={{"fontFamily": "'Inter', sans-serif"}}>
      <div className="fixed top-0 inset-x-0 h-8 z-50 flex items-center overflow-hidden border-b bg-emerald-100 text-black border-emerald-100">
            <div className="flex animate-scroll whitespace-nowrap w-[200%]">

              <div className="flex-1 flex justify-around gap-8 text-xs font-medium tracking-wide items-center">
                <span className="flex items-center gap-2">
                  <iconify-icon icon="solar:bell-bing-linear" width="16"></iconify-icon>
                  Notice: Field C is closed this weekend. Practice moved to Field A.
                </span>
                <span className="flex items-center gap-2">
                  <iconify-icon icon="solar:camera-linear" width="16"></iconify-icon>
                  Reminder: Team Picture Day is this Saturday, July 5. Please arrive
                  early.
                </span>
              </div>

              <div className="flex-1 flex justify-around gap-8 text-xs font-medium tracking-wide items-center">
                <span className="flex items-center gap-2">
                  <iconify-icon icon="solar:bell-bing-linear" width="16"></iconify-icon>
                  Notice: Field C is closed this weekend. Practice moved to Field A.
                </span>
                <span className="flex items-center gap-2">
                  <iconify-icon icon="solar:camera-linear" width="16"></iconify-icon>
                  Reminder: Team Picture Day is this Saturday, July 5. Please arrive
                  early.
                </span>
              </div>
            </div>
          </div>


          <div className="flex flex-col md:flex-row flex-1 w-full relative">

            <header className="md:hidden sticky top-8 z-40 backdrop-blur-md border-b px-4 h-14 flex items-center justify-between bg-black/80 border-emerald-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-full size-8 tracking-tight font-semibold shadow-sm bg-cyan-400 text-black" style={{"fontFamily": "'Plus Jakarta Sans', sans-serif"}}>
                  RR
                </div>
                <div>
                  <h1 className="text-sm font-semibold tracking-tight" style={{"fontFamily": "'Plus Jakarta Sans', sans-serif"}}>
                    Riverside Rockets
                  </h1>
                  <p className="text-xs text-emerald-500">6U Division</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="relative text-emerald-500 transition-colors flex items-center justify-center min-h-[44px] min-w-[44px] hover:text-emerald-100">
                  <iconify-icon icon="solar:bell-linear" width="22"></iconify-icon>
                  <span className="absolute top-2 right-2 flex size-2.5 bg-sky-500 rounded-full border-2 border-black"></span>
                </button>
              </div>
            </header>


            <aside className="hidden md:flex w-60 flex-col fixed inset-y-0 top-8 left-0 border-r shadow-[inset_-1px_0_0_rgba(0,0,0,0.03)] z-40 overflow-hidden border-emerald-800/60">

              <div className="absolute inset-0 z-0">
                <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/variants/f9c13282-71c2-4d97-a6d2-371f81f5480b/800w.jpg" className="w-full h-full object-cover opacity-60" alt="Pastel Background" />
                <div className="absolute inset-0 backdrop-blur-2xl bg-black/60"></div>
              </div>


              <div className="relative z-10 flex flex-col h-full w-full">

                <div className="p-6 border-b border-black/40">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex items-center justify-center rounded-md size-9 text-lg tracking-tight font-semibold shadow-sm bg-cyan-400 text-black" style={{"fontFamily": "'Plus Jakarta Sans', sans-serif"}}>
                      RR
                    </div>
                    <div>
                      <h1 className="text-base font-semibold tracking-tight" style={{"fontFamily": "'Plus Jakarta Sans', sans-serif"}}>
                        Riverside Rockets
                      </h1>
                      <p className="text-xs font-medium text-emerald-400">6U Division</p>
                    </div>
                  </div>
                </div>


                <nav className="flex-1 overflow-y-auto flex flex-col gap-1 hide-scrollbar z-0 pt-4 pr-3 pb-4 pl-3 relative gap-x-1 gap-y-1">
                  <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                    <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/11086022-668b-449b-8759-f5d27a0f6992_800w.jpg" className="w-full h-full object-cover opacity-30 blur-md scale-110" alt="Silhouetted Friends Jumping at Sunset" />
                  </div>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm shadow-sm border rounded-lg font-medium relative before:absolute before:left-0 before:inset-y-1.5 before:w-1 before:bg-cyan-600 before:rounded-r-full min-h-[44px] text-emerald-100 bg-black/70 border-black/50">
                    <iconify-icon icon="solar:home-angle-linear" width="20"></iconify-icon>
                    Home
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors min-h-[44px] text-emerald-300 hover:text-emerald-100 hover:bg-black/50">
                    <iconify-icon icon="solar:calendar-linear" width="20"></iconify-icon>
                    Schedule
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors min-h-[44px] text-emerald-300 hover:text-emerald-100 hover:bg-black/50">
                    <iconify-icon icon="solar:check-circle-linear" width="20"></iconify-icon>
                    RSVP
                  </a>
                  <a href="#" className="flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors min-h-[44px] text-emerald-300 hover:text-emerald-100 hover:bg-black/50">
                    <div className="flex items-center gap-3">
                      <iconify-icon icon="solar:chat-round-line-linear" width="20"></iconify-icon>
                      Messages
                    </div>
                    <span className="bg-sky-500 text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-sm text-black">
                      2
                    </span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors min-h-[44px] text-emerald-300 hover:text-emerald-100 hover:bg-black/50">
                    <iconify-icon icon="solar:users-group-rounded-linear" width="20"></iconify-icon>
                    Roster
                  </a>
                  <a href="#" className="flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors min-h-[44px] text-emerald-300 hover:text-emerald-100 hover:bg-black/50">
                    <div className="flex items-center gap-3">
                      <iconify-icon icon="solar:gallery-linear" width="20"></iconify-icon>
                      Photos
                    </div>
                    <span className="text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center border bg-cyan-900/80 text-cyan-200 border-cyan-800/50">
                      3
                    </span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors min-h-[44px] text-emerald-300 hover:text-emerald-100 hover:bg-black/50">
                    <iconify-icon icon="solar:hand-stars-linear" width="20"></iconify-icon>
                    Volunteer &amp; Snacks
                  </a>
                <meta charset="utf-8" /></nav>


                <div className="p-4 border-t border-black/40 bg-black/20">
                  <a href="#" className="flex items-center justify-between px-3 py-2 rounded-lg transition-colors min-h-[44px] group hover:bg-black/40">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center relative">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="Parent" className="size-8 rounded-full border-2 shadow-sm relative z-10 object-cover border-black/90" />
                        <img src="https://images.unsplash.com/photo-1519456104720-033100c5c4e9?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="Child" className="size-6 rounded-full border-2 shadow-sm -ml-2 relative z-0 object-cover border-black/90" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold leading-tight text-emerald-100">
                          Sarah &amp; Jake
                        </span>
                        <span className="text-xs font-medium group-hover:text-emerald-900 transition-colors text-emerald-400">
                          Settings
                        </span>
                      </div>
                    </div>
                    <iconify-icon icon="solar:settings-linear" width="20" className="text-emerald-500 group-hover:text-emerald-900 transition-colors"></iconify-icon>
                  </a>
                </div>
              </div>
            </aside>


            <main className="flex-1 md:ml-60 md:pb-12 md:px-8 flex flex-col gap-8 w-full max-w-3xl mr-auto ml-60 pt-6 pr-4 pb-12 pl-4">

              <div className="hidden md:flex items-center justify-between mb-2">
                <h2 className="text-2xl font-semibold tracking-tight" style={{"fontFamily": "'Plus Jakarta Sans', sans-serif"}}>
                  Home
                </h2>
                <div className="flex items-center gap-4">
                  <button className="relative text-emerald-500 transition-colors flex items-center justify-center hover:text-emerald-100">
                    <iconify-icon icon="solar:bell-linear" width="22"></iconify-icon>
                    <span className="absolute -top-1 -right-1 flex size-2 bg-sky-500 rounded-full border-2 border-emerald-950"></span>
                  </button>
                </div>
              </div>


              <section className="flex flex-col gap-3 -mt-4 md:-mt-0">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-lg font-semibold tracking-tight text-emerald-100" style={{"fontFamily": "'Plus Jakarta Sans', sans-serif"}}>
                    July
                  </h3>
                  <div className="flex gap-1">
                    <button className="flex items-center justify-center size-8 rounded-md text-emerald-500 transition-colors hover:text-emerald-100 hover:bg-emerald-900">
                      <iconify-icon icon="solar:alt-arrow-left-linear" width="20"></iconify-icon>
                    </button>
                    <button className="flex items-center justify-center size-8 rounded-md text-emerald-500 transition-colors hover:text-emerald-100 hover:bg-emerald-900">
                      <iconify-icon icon="solar:alt-arrow-right-linear" width="20"></iconify-icon>
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-2 sm:p-3 overflow-x-auto hide-scrollbar bg-black border-emerald-800">
                  <div className="flex justify-between items-center min-w-[320px] gap-1">
                    <button className="flex-1 flex flex-col items-center gap-1.5 p-2 rounded-lg text-emerald-500 transition-colors hover:bg-emerald-950">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                        Mon
                      </span>
                      <span className="text-sm font-medium text-emerald-300">1</span>
                    </button>
                    <button className="flex-1 flex flex-col items-center gap-1.5 p-2 rounded-lg text-emerald-500 transition-colors hover:bg-emerald-950">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                        Tue
                      </span>
                      <span className="text-sm font-medium text-emerald-300">2</span>
                    </button>
                    <button className="flex-1 flex flex-col items-center gap-1.5 p-2 rounded-lg text-emerald-500 transition-colors relative hover:bg-emerald-950">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                        Wed
                      </span>
                      <span className="text-sm font-medium text-emerald-300">3</span>
                      <span className="absolute bottom-1 size-1 rounded-full bg-cyan-700"></span>
                    </button>
                    <button className="flex-1 flex flex-col items-center gap-1.5 p-2 rounded-lg text-emerald-500 transition-colors relative hover:bg-emerald-950">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                        Thu
                      </span>
                      <span className="text-sm font-medium text-emerald-300">4</span>
                    </button>

                    <button className="flex-1 flex flex-col items-center gap-1.5 p-2 rounded-lg shadow-md relative bg-emerald-100 text-black">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                        Fri
                      </span>
                      <span className="text-sm font-medium text-black">5</span>
                      <span className="absolute bottom-1 size-1 rounded-full shadow-[0_0_4px_rgba(96,165,250,0.8)] bg-cyan-600"></span>
                    </button>
                    <button className="flex-1 flex flex-col items-center gap-1.5 p-2 rounded-lg text-emerald-500 transition-colors hover:bg-emerald-950">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                        Sat
                      </span>
                      <span className="text-sm font-medium text-emerald-300">6</span>
                    </button>
                    <button className="flex-1 flex flex-col items-center gap-1.5 p-2 rounded-lg text-emerald-500 transition-colors relative hover:bg-emerald-950">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                        Sun
                      </span>
                      <span className="text-sm font-medium text-emerald-300">7</span>
                    </button>
                  </div>
                </div>
                <div className="flex justify-center pt-1">
                  <meta charset="utf-8" />
                </div>
              </section>


              <section className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">
                    Next Event
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-indigo-950 text-indigo-300 border-indigo-800">
                    Coming up soon
                  </span>
                </div>

                <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden bg-black border-emerald-800">
                  <div className="p-5 sm:p-6 flex flex-col gap-5">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center size-10 rounded-full border text-lg flex-shrink-0 bg-emerald-950 border-emerald-900">
                        🏈
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold tracking-tight mb-1 text-emerald-100" style={{"fontFamily": "'Plus Jakarta Sans', sans-serif"}}>
                          Riverside Hawks · Game
                        </h4>
                        <p className="text-sm mb-0.5 text-emerald-400">
                          Saturday, July 5 · 9:00 AM
                        </p>
                        <p className="text-sm flex items-center gap-1.5 flex-wrap text-emerald-400">
                          North B Field · 1400 Riverside Dr
                          <a href="#" className="font-medium inline-flex items-center gap-0.5 text-cyan-400 hover:text-cyan-300">
                            Get directions
                            <iconify-icon icon="solar:arrow-right-linear" width="16"></iconify-icon>
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="h-px w-full bg-emerald-900"></div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-green-300 bg-green-950 border-green-900">
                          <iconify-icon icon="solar:check-circle-linear" width="20"></iconify-icon>
                          <span className="text-sm font-medium">Jake is Confirmed</span>
                        </div>
                        <button className="text-sm text-emerald-500 font-medium px-2 py-1.5 min-h-[44px] transition-colors hover:text-emerald-100">
                          Change
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-emerald-400">
                        <iconify-icon icon="solar:sun-linear" width="18" className="text-indigo-500"></iconify-icon>
                        Partly cloudy · 78°F
                      </div>
                    </div>
                  </div>
                </div>
              </section>


              <section className="flex flex-col gap-3 -mt-2">
                <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">
                  What Changed
                </h3>
                <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 bg-black border-emerald-800">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-emerald-600">
                      <iconify-icon icon="solar:info-circle-linear" width="18"></iconify-icon>
                    </div>
                    <div className="text-sm leading-snug text-emerald-100">
                      Field moved: South A → North B
                      <span className="mt-1 sm:mt-0 sm:ml-2 inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border bg-indigo-950 text-indigo-300 border-indigo-800">
                        Updated 2 hours ago
                      </span>
                    </div>
                  </div>
                </div>
              </section>


              <section className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">
                  What You Need To Do
                </h3>
                <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-black border-emerald-800">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-10 rounded-full flex-shrink-0 bg-cyan-950 text-cyan-400">
                      <iconify-icon icon="solar:cup-star-linear" width="22"></iconify-icon>
                    </div>
                    <p className="text-sm font-medium text-emerald-100">
                      You're signed up for snacks on July 12
                    </p>
                  </div>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-lg transition-colors min-h-[44px] bg-black border-emerald-800 text-emerald-100 hover:bg-emerald-950">
                    View details
                  </button>
                </div>
              </section>


              <section className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">
                  From Your Coach
                </h3>
                <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 sm:p-6 relative overflow-hidden bg-black border-emerald-800">
                  <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                  <div className="flex items-center gap-2 text-sm text-emerald-500 mb-3">
                    <span className="font-medium text-emerald-100">Coach Mike</span>
                    <span>·</span>
                    <span className="">Thursday Practice</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4 italic text-emerald-100">
                    "Great Thursday practice — relay drills clicked today. Saturday
                    focus: listening at the plate."
                  </p>
                  <a href="#" className="text-sm font-medium inline-flex items-center gap-1 group text-cyan-400 hover:text-cyan-300">
                    See full practice recap
                    <iconify-icon icon="solar:arrow-right-linear" width="16" className="group-hover:translate-x-0.5 transition-transform"></iconify-icon>
                  </a>
                </div>
              </section>


              <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="#" className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 flex items-center justify-between group transition-colors bg-black border-emerald-800 hover:border-emerald-700">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-10 rounded-full relative bg-sky-950 text-sky-400">
                      <iconify-icon icon="solar:chat-round-line-linear" width="22"></iconify-icon>
                    </div>
                    <div className="">
                      <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-0.5">
                        Messages
                      </p>
                      <p className="text-sm font-medium text-emerald-100">2 unread</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium min-h-[44px] flex items-center px-2 text-cyan-400">
                    Open
                  </span>
                </a>

                <a href="#" className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 flex items-center justify-between group transition-colors bg-black border-emerald-800 hover:border-emerald-700">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-10 rounded-full bg-cyan-950 text-cyan-400">
                      <iconify-icon icon="solar:gallery-linear" width="22"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-0.5">
                        Photos
                      </p>
                      <p className="text-sm font-medium text-emerald-100">3 new photos</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium min-h-[44px] flex items-center px-2 text-cyan-400">
                    View all
                  </span>
                </a>
              </section>


              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4 text-sm text-emerald-500 text-center">
                <div className="flex items-center gap-1.5">
                  <iconify-icon icon="solar:shield-check-linear" className="text-green-400" width="18"></iconify-icon>
                  <span className="">Your family's info is private to your team.</span>
                </div>
                <a href="#" className="hover:underline min-h-[44px] flex items-center px-2 text-emerald-100">
                  Privacy settings
                </a>
              </div><button className="flex flex-col gap-1 transition-colors hover:text-emerald-100 text-emerald-500 bg-neutral-200 w-full h-full gap-x-1 gap-y-1 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="1em" viewBox="0 0 24 24" className="w-[24px] h-[1px]" data-icon-set="solar" data-solar="hamburger-menu-linear"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M20 7H4m16 5H4m16 5H4" className=""></path></svg>
              <span className="text-xs font-medium">More</span>
            </button>
            </main>
          </div>


          <nav className="md:hidden fixed z-40 flex bg-black h-16 border-emerald-800 border-t pr-2 pb-safe pl-2 right-0 bottom-0 left-0 gap-x-1 gap-y-1 items-center justify-between">
            <button className="flex flex-col gap-1 transition-colors hover:text-emerald-100 text-emerald-500 w-full h-full gap-x-1 gap-y-1 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="1em" viewBox="0 0 24 24" className="w-[24px] h-[1px]" data-icon-set="solar" data-solar="hamburger-menu-linear"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M20 7H4m16 5H4m16 5H4" className=""></path></svg>
              <span className="text-xs font-medium">More</span>
            </button><a href="#" className="flex flex-col items-center justify-center w-full h-full gap-1 text-cyan-400">
              <iconify-icon icon="solar:home-angle-linear" width="24"></iconify-icon>
              <span className="text-xs font-medium">Home</span>
            </a>
            <a href="#" className="flex flex-col items-center justify-center w-full h-full text-emerald-500 gap-1 transition-colors hover:text-emerald-100">
              <iconify-icon icon="solar:calendar-linear" width="24"></iconify-icon>
              <span className="text-xs font-medium">Schedule</span>
            </a>
            <a href="#" className="flex flex-col items-center justify-center w-full h-full text-emerald-500 gap-1 transition-colors relative hover:text-emerald-100">
              <iconify-icon icon="solar:chat-round-line-linear" width="24"></iconify-icon>
              <span className="absolute top-1.5 right-4 size-2.5 bg-sky-500 rounded-full border-2 border-black"></span>
              <span className="text-xs font-medium">Msgs</span>
            </a>
            <a href="#" className="flex flex-col items-center justify-center w-full h-full text-emerald-500 gap-1 transition-colors relative hover:text-emerald-100">
              <iconify-icon icon="solar:gallery-linear" width="24"></iconify-icon>
              <span className="absolute top-1.5 right-3 size-2.5 bg-cyan-500 rounded-full border-2 border-black"></span>
              <span className="text-xs font-medium">Photos</span>
            </a>

          </nav>
    </div>
  );
}