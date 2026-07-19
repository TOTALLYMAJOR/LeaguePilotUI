// Scrolling announcement ticker at the top of the app.
const NOTICES = [
  { icon: "solar:bell-bing-linear", text: "Notice: Field C is closed this weekend. Practice moved to Field A." },
  { icon: "solar:camera-linear", text: "Reminder: Team Picture Day is this Saturday, July 5. Please arrive early." },
  { icon: "solar:info-circle-linear", text: "New: July schedule posted — check your calendar for updates." },
];

export default function Ticker() {
  return (
    <div className="fixed top-0 inset-x-0 h-8 z-50 flex items-center overflow-hidden border-b bg-emerald-100 text-black border-emerald-100">
      <div className="flex animate-scroll whitespace-nowrap w-[200%]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex-1 flex justify-around gap-8 text-xs font-medium tracking-wide items-center">
            {NOTICES.map((n, i) => (
              <span key={i} className="flex items-center gap-2">
                <iconify-icon icon={n.icon} width="16" />
                {n.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
