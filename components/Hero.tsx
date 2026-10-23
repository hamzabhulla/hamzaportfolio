"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type CardId = "notes" | "ember" | "vibetalk";
type Position = { x: number; y: number };
type DragState = {
  card: CardId;
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export default function Hero() {
  const [positions, setPositions] = useState<Record<CardId, Position>>({
    notes: { x: 0, y: 0 },
    ember: { x: 0, y: 0 },
    vibetalk: { x: 0, y: 0 },
  });
  const [dragging, setDragging] = useState<CardId | null>(null);
  const [frontCard, setFrontCard] = useState<CardId | null>(null);
  const dragState = useRef<DragState | null>(null);

  function startDrag(card: CardId, event: PointerEvent<HTMLButtonElement>) {
    // Keep one active pointer at a time so a second touch cannot overwrite drag state.
    if (dragState.current || event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      card,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: positions[card].x,
      originY: positions[card].y,
    };
    setDragging(card);
    setFrontCard(card);
  }

  function moveDrag(event: PointerEvent<HTMLButtonElement>) {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    setPositions((current) => ({
      ...current,
      [drag.card]: {
        x: clamp(drag.originX + dx, -28, 28),
        y: clamp(drag.originY + dy, -20, 20),
      },
    }));
  }

  function endDrag(event: PointerEvent<HTMLButtonElement>) {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragState.current = null;
    setDragging(null);
    setPositions((current) => ({
      ...current,
      [drag.card]: { x: 0, y: 0 },
    }));
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function nudgeCard(card: CardId, event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter", " "].includes(event.key)) return;
    event.preventDefault();
    setFrontCard(card);
  }

  return (
    <section id="top" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="status-dot" aria-hidden="true" />
            Full-stack developer <span className="kicker-divider">/</span> Pakistan · Remote
          </p>

          <h1 id="hero-title" className="hero-title">
            I build web
            <br />
            <span>products that work.</span>
          </h1>

          <p className="hero-description">
            Thoughtful interfaces, reliable backends, and practical integrations
            across messaging, commerce, and productivity.
          </p>

          <div className="hero-actions">
            <a className="button-primary" href="#work">
              View projects <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <a className="button-text" href="#contact">
              Contact me <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hero-art" role="group" aria-label="Interactive previews of selected projects">
          <div className="project-stage">
            <div className="stage-shadow" />
            <div
              className={"stage-card stage-card-back stage-card-notes" + (dragging === "notes" ? " is-dragging" : "") + (frontCard === "notes" ? " is-frontmost" : "")}
              style={{ translate: positions.notes.x + "px " + positions.notes.y + "px" }}
            >
              <button
                type="button"
                className="mini-topbar drag-handle"
                aria-label="Drag WebNotepad preview with a mouse or finger, or press an arrow key, Enter, or Space to bring it to the front."
                title="Drag to move · Arrow keys bring this card to the front"
                onPointerDown={(event) => startDrag("notes", event)}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onLostPointerCapture={endDrag}
                onKeyDown={(event) => nudgeCard("notes", event)}
              >
                <span className="mini-dot" />
                <span className="mini-dot" />
                <span className="mini-dot" />
                <span className="mini-window-title">web notepad</span>
              </button>
              <Image
                src="https://raw.githubusercontent.com/hamzabhulla/web-notepad/main/docs/screenshot.png"
                alt="WebNotepad application preview"
                width={1200}
                height={800}
                sizes="(max-width: 760px) 62vw, (max-width: 1050px) 34vw, 29vw"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <span className="stage-tag">PRODUCTIVITY</span>
            </div>

            <div
              className={"stage-card stage-card-middle" + (dragging === "ember" ? " is-dragging" : "") + (frontCard === "ember" ? " is-frontmost" : "")}
              style={{ translate: positions.ember.x + "px " + positions.ember.y + "px" }}
            >
              <button
                type="button"
                className="mini-topbar drag-handle"
                aria-label="Drag Ember & Co. preview with a mouse or finger, or press an arrow key, Enter, or Space to bring it to the front."
                title="Drag to move · Arrow keys bring this card to the front"
                onPointerDown={(event) => startDrag("ember", event)}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onLostPointerCapture={endDrag}
                onKeyDown={(event) => nudgeCard("ember", event)}
              >
                <span className="mini-dot" />
                <span className="mini-dot" />
                <span className="mini-dot" />
                <span className="mini-window-title">ember & co.</span>
              </button>
              <Image
                src="/ember-co-homepage.webp"
                alt="Ember & Co. restaurant website preview"
                width={1200}
                height={800}
                sizes="(max-width: 760px) 62vw, (max-width: 1050px) 34vw, 29vw"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <span className="stage-tag">COMMERCE</span>
            </div>

            <div
              className={"stage-card stage-card-front" + (dragging === "vibetalk" ? " is-dragging" : "") + (frontCard === "vibetalk" ? " is-frontmost" : "")}
              style={{ translate: positions.vibetalk.x + "px " + positions.vibetalk.y + "px" }}
            >
              <button
                type="button"
                className="mini-topbar drag-handle"
                aria-label="Drag VibeTalk preview with a mouse or finger, or press an arrow key, Enter, or Space to bring it to the front."
                title="Drag to move · Arrow keys bring this card to the front"
                onPointerDown={(event) => startDrag("vibetalk", event)}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onLostPointerCapture={endDrag}
                onKeyDown={(event) => nudgeCard("vibetalk", event)}
              >
                <span className="mini-dot" />
                <span className="mini-dot" />
                <span className="mini-dot" />
                <span className="mini-window-title">vibetalk</span>
              </button>
              <Image
                src="https://raw.githubusercontent.com/hamzabhulla/VibeTalk/main/docs/screenshots/image.png"
                alt="VibeTalk chat interface preview"
                width={1200}
                height={800}
                sizes="(max-width: 760px) 62vw, (max-width: 1050px) 34vw, 29vw"
                preload
                decoding="async"
                draggable={false}
              />
              <span className="stage-tag stage-tag-dark">MESSAGING</span>
            </div>
          </div>
          <p className="drag-hint" aria-hidden="true">Drag a card to bring it forward ↗</p>
        </div>
      </div>
    </section>
  );
}
