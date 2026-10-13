"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Minus, Plus, X } from "lucide-react";

export type ResearchDocument = {
  id: string;
  title: string;
  kind: string;
  excerpts: { image: string; label: string }[];
  requestHref?: string;
  viewOnly?: boolean;
};

export function ResearchDocumentViewer({ document, onClose }: { document: ResearchDocument; onClose: () => void }) {
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const count = document.excerpts.length;
  const excerpt = document.excerpts[page - 1];

  function turnPage(next: number) {
    if (next < 1 || next > count || next === page) return;
    setLoading(true);
    setFailed(false);
    setPage(next);
    viewport.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  useEffect(() => {
    if (page < count) {
      const next = new Image();
      next.src = document.excerpts[page].image;
    }
  }, [page, count, document.excerpts]);

  return <motion.div className="modal-backdrop document-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
    <motion.div className="modal research-document-modal" role="dialog" aria-modal="true" aria-labelledby="project-document-title" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} onMouseDown={event => event.stopPropagation()}>
      <div className="document-heading"><div><span>{document.kind}</span><h2 id="project-document-title">{document.title}</h2></div><button type="button" onClick={onClose} aria-label="Close document viewer"><X size={21} /></button></div>
      <div className="document-toolbar">
        <div className="document-pagination"><button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => turnPage(page - 1)}><ArrowLeft size={18} /></button><label>{document.viewOnly ? "Page" : "Preview"} <select value={page} onChange={event => turnPage(Number(event.target.value))} aria-label="Select preview page" tabIndex={0}>{document.excerpts.map((_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}</select><span>of {count}</span></label><button type="button" aria-label="Next page" disabled={page === count} onClick={() => turnPage(page + 1)}><ArrowRight size={18} /></button></div>
        <div className="document-zoom"><button type="button" aria-label="Zoom out" disabled={zoom === 100} onClick={() => setZoom(value => value - 50)}><Minus size={17} /></button><span aria-live="polite">{zoom}%</span><button type="button" aria-label="Zoom in" disabled={zoom === 300} onClick={() => setZoom(value => value + 50)}><Plus size={17} /></button></div>
        {!document.viewOnly && document.requestHref && <a href={document.requestHref} className="document-download"><span>Request Full Access</span><ArrowUpRight size={17} /></a>}
      </div>
      <div className="document-viewport" ref={viewport} aria-busy={loading}>
        {loading && <span className="document-status" role="status">Loading page…</span>}
        {failed ? <div className="document-error"><p>This preview could not be loaded.</p><button type="button" onClick={() => { setLoading(true); setFailed(false); }}>Retry page</button>{!document.viewOnly && document.requestHref && <a href={document.requestHref}>Request materials by email ↗</a>}</div> : <img key={page} src={excerpt.image} alt={`${document.title} — ${excerpt.label} — ${document.viewOnly ? "page" : "selected preview"} ${page} of ${count}`} draggable={false} style={{ width: `${zoom}%` }} onLoad={() => setLoading(false)} onError={() => { setLoading(false); setFailed(true); }} />}
      </div>
      <p className="document-source">{excerpt.label}{!document.viewOnly && " · Selected excerpts only · Full materials available on request"}</p>
    </motion.div>
  </motion.div>;
}
