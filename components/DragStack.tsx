"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { projects } from "@/lib/mock-data";

type CardId = "concierge" | "notes" | "ember" | "vibetalk";
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

/**
 * Draggable hero project stack, restored from the pre-cleanup implementation
 * (HEAD 65a5228) and extended from three cards to all four projects in
 * lib/mock-data.ts. Images are the self-hosted local previews (no hot-links).
 * Drag a card to move it (it snaps back on release); the dragged or
 * keyboard-selected card stays on top. Used by the homepage hero and by
 * LocalLanding on the Lahore/Muridke pages.
 */
const CARDS: {
  id: CardId;
  layer: "rear" | "back" | "middle" | "front";
  windowTitle: string;
  tag: string;
  tagDark?: boolean;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}[] = [
  {
    id: "concierge",
    layer: "rear",
    windowTitle: "whatsapp concierge",
    tag: "CLIENT DASHBOARD",
    alt: "WhatsApp Concierge operations dashboard preview",
    width: 1440,
    height: 1340,
  },
  {
    id: "notes",
    layer: "back",
    windowTitle: "web notepad",
    tag: "PRODUCTIVITY",
    alt: "WebNotepad application preview",
    width: 1920,
    height: 1080,
  },
  {
    id: "ember",
    layer: "middle",
    windowTitle: "ember & co.",
    tag: "COMMERCE",
    alt: "Ember & Co. restaurant website preview",
    width: 540,
    height: 304,
  },
  {
    id: "vibetalk",
    layer: "front",
    windowTitle: "vibetalk",
    tag: "MESSAGING",
    tagDark: true,
    alt: "VibeTalk chat interface preview",
    width: 1881,
    height: 894,
    priority: true,
  },
];

// Looked up by project id, not array position: reordering lib/mock-data.ts
// must never silently mismatch a card's image with its aria-label/title.
// Fails loudly at module load if an id is missing, instead of rendering
// the wrong project's preview under the wrong name.
function mustFindProject(id: string) {
  const project = projects.find((p) => p.id === id);
  if (!project) {
    throw new Error(`DragStack: no project with id "${id}" in lib/mock-data.ts`);
  }
  return project;
}

const PROJECT_BY_CARD: Record<CardId, (typeof projects)[number]> = {
  concierge: mustFindProject("04"),
  notes: mustFindProject("03"),
  ember: mustFindProject("02"),
  vibetalk: mustFindProject("01"),
};

export default function DragStack() {
  const [positions, setPositions] = useState<Record<CardId, Position>>({
    concierge: { x: 0, y: 0 },
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
    <div className="hero-art" role="group" aria-label="Interactive previews of selected projects">
      <div className="project-stage">
        <div className="stage-shadow" />
        {CARDS.map((card) => {
          const project = PROJECT_BY_CARD[card.id];
          return (
            <div
              key={card.id}
              className={
                "stage-card stage-card-" +
                card.layer +
                (dragging === card.id ? " is-dragging" : "") +
                (frontCard === card.id ? " is-frontmost" : "")
              }
              style={{ translate: positions[card.id].x + "px " + positions[card.id].y + "px" }}
            >
              <button
                type="button"
                className="mini-topbar drag-handle"
                aria-label={`Drag ${project.title} preview with a mouse or finger, or press an arrow key, Enter, or Space to bring it to the front.`}
                title="Drag to move. Arrow keys bring this card to the front"
                onPointerDown={(event) => startDrag(card.id, event)}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onLostPointerCapture={endDrag}
                onKeyDown={(event) => nudgeCard(card.id, event)}
              >
                <span className="mini-dot" />
                <span className="mini-dot" />
                <span className="mini-dot" />
                <span className="mini-window-title">{card.windowTitle}</span>
              </button>
              <Image
                src={project.image}
                alt={card.alt}
                width={card.width}
                height={card.height}
                sizes="(max-width: 760px) 62vw, (max-width: 1050px) 34vw, 29vw"
                priority={card.priority}
                loading={card.priority ? undefined : "lazy"}
                decoding="async"
                draggable={false}
              />
              <span className={"stage-tag" + (card.tagDark ? " stage-tag-dark" : "")}>{card.tag}</span>
            </div>
          );
        })}
      </div>
      <p className="drag-hint" aria-hidden="true">Drag a card to bring it forward ↗</p>
    </div>
  );
}
