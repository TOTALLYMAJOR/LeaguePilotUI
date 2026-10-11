import { useState } from "react";
import { Camera, Download, Heart, Share2, Upload } from "lucide-react";
import { Badge, Card, PageHeader } from "../components/ui";
import { photos } from "../data/team";

const albums = ["All", "Game Day", "Practice", "Team Fun"];

export default function Photos() {
  const [album, setAlbum] = useState("All");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const list = photos.filter((p) => album === "All" || p.album === album);
  const newCount = photos.filter((p) => p.isNew).length;

  return (
    <div>
      <PageHeader
        title="Photos"
        subtitle="Shared by Rockets families. Private to the team, free to download, and perfect for the fridge."
        badge={
          <button className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-sky-400 px-4 text-sm font-semibold text-ink-950 transition hover:bg-sky-300">
            <Upload className="h-4 w-4" />
            Share a photo
          </button>
        }
      />

      <Card glow="candy" className="animate-rise delay-1 mb-6 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-candy-500/15 ring-1 ring-candy-500/30">
              <Camera className="h-5 w-5 text-candy-400" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-white">Team Picture Day is Saturday</p>
              <p className="text-sm text-slate-400">Right after the Hawks game. Order forms due Friday night.</p>
            </div>
          </div>
          <Badge tone="candy">{newCount} new this week</Badge>
        </div>
      </Card>

      <div className="animate-rise delay-2 mb-5 flex flex-wrap gap-2">
        {albums.map((a) => (
          <button
            key={a}
            onClick={() => setAlbum(a)}
            className={`min-h-[40px] rounded-full px-4 text-sm font-semibold transition ${
              album === a ? "bg-white text-ink-950" : "bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="columns-2 gap-4 sm:columns-3 [column-fill:_balance]">
        {list.map((p, i) => (
          <figure
            key={p.id}
            className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-ink-800 ring-1 ring-white/10 animate-rise ${["delay-1", "delay-2", "delay-3"][i % 3]}`}
          >
            <img src={p.src} alt={p.caption} loading="lazy" className="w-full object-cover transition duration-500 group-hover:scale-105" />
            {p.isNew && (
              <span className="absolute left-3 top-3 rounded-full bg-sky-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-950">
                New
              </span>
            )}
            <button
              onClick={() => setLiked((l) => ({ ...l, [p.id]: !l[p.id] }))}
              aria-label="Like"
              className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition ${
                liked[p.id] ? "bg-candy-500 text-ink-950" : "bg-ink-950/60 text-white hover:bg-ink-950/80"
              }`}
            >
              <Heart className="h-4 w-4" fill={liked[p.id] ? "currentColor" : "none"} />
            </button>
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-ink-950/90 to-transparent p-3 pt-10">
              <div>
                <p className="text-sm font-semibold text-white">{p.caption}</p>
                <p className="text-[11px] text-slate-300">{p.album}</p>
              </div>
              <div className="flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                <button aria-label="Download" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white hover:bg-white/25">
                  <Download className="h-3.5 w-3.5" />
                </button>
                <button aria-label="Share" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white hover:bg-white/25">
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
