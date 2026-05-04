const EMOJI_FONT = "bold 128px Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif";
const emojiBitmapCache = new Map<string, HTMLCanvasElement>();

/** State snapshot for undo/redo history */
type GeneratorState = {
  text: string;
  textTransform: { x: number; y: number; rotation: number; scale: number; selected: boolean };
  stickers: { char: string; centerX: number; centerY: number; size: number; rotation: number }[];
  bg: string;
  bgImage: HTMLImageElement | null;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  fontFamily: string;
  outline: boolean;
  outlineColor: string;
  shadow: boolean;
  shadowColor: string;
  res: number;
  ratio: string;
  align: string;
  fg: string;
  safe: boolean;
};

function getOrCreateEmojiBitmap(char: string): HTMLCanvasElement | null {
  let canvas = emojiBitmapCache.get(char);
  if (canvas) return canvas;
  canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ictx = canvas.getContext("2d");
  if (!ictx) return null;
  ictx.font = EMOJI_FONT;
  ictx.textAlign = "center";
  ictx.textBaseline = "middle";
  ictx.fillText(char, 128, 128);
  emojiBitmapCache.set(char, canvas);
  return canvas;
}

/**
 * Brat Generator init logic - runs after mount when JSZip and FileSaver are loaded.
 * Returns cleanup function for window listeners.
 */
export function initBratGenerator(options?: { 
  defaultBg?: string; 
  defaultFg?: string;
  defaultTab?: 'text' | 'style' | 'stickers';
  defaultRatio?: '1:1' | '4:5' | '9:16' | '16:9';
  defaultResolution?: '1024' | '1500' | '2048' | '3000';
  defaultPlaceholder?: string;
}): () => void {
  const root = document.getElementById("brat-embed-root");
  const widget = document.getElementById("brat-widget");
  if (!root || !widget) return () => {};

  // Guard against React StrictMode double-invoke (prevents duplicate listeners → 4x downloads)
  if ((root as HTMLElement & { __bratInit?: boolean }).__bratInit) return () => {};
  (root as HTMLElement & { __bratInit?: boolean }).__bratInit = true;

  const c = document.getElementById("brat-canvas") as HTMLCanvasElement;
  if (!c) return () => {};

  const ctxRaw = c.getContext("2d");
  if (!ctxRaw) return () => {};
  const ctx = ctxRaw as CanvasRenderingContext2D;

  const JSZip = (typeof window !== "undefined" && (window as unknown as { JSZip?: unknown }).JSZip) as
    | (new () => { file: (n: string, b: Blob) => void; generateAsync: (o: { type: string }) => Promise<Blob> })
    | undefined;
  const saveAs =
    typeof window !== "undefined" && (window as unknown as { saveAs?: (b: Blob, n: string) => void }).saveAs;

  const textEl = document.getElementById("brat-text") as HTMLTextAreaElement;
  const fontSizeEl = document.getElementById("brat-fontSize") as HTMLInputElement;
  const lineHeightEl = document.getElementById("brat-lineHeight") as HTMLInputElement;
  const letterSpacingEl = document.getElementById("brat-letterSpacing") as HTMLInputElement;
  const alignEl = document.getElementById("brat-align") as HTMLSelectElement;
  const outlineEl = document.getElementById("brat-outlineToggle") as HTMLInputElement;
  const outlineColorEl = document.getElementById("brat-outlineColor") as HTMLInputElement;
  const outlineColorContainer = document.getElementById("brat-outlineColorContainer");
  const shadowEl = document.getElementById("brat-shadowToggle") as HTMLInputElement;
  const shadowColorEl = document.getElementById("brat-shadowColor") as HTMLInputElement;
  const shadowColorContainer = document.getElementById("brat-shadowColorContainer");
  const bgColorEl = document.getElementById("brat-bgColor") as HTMLInputElement;
  const fgColorEl = document.getElementById("brat-fgColor") as HTMLInputElement;
  const ratioEl = document.getElementById("brat-ratio") as HTMLSelectElement;
  const resEl = document.getElementById("brat-res") as HTMLSelectElement;
  const safeEl = document.getElementById("brat-safe");
  const safeToggle = document.getElementById("brat-safeToggle") as HTMLInputElement;
  const bgUpload = document.getElementById("brat-bgUpload") as HTMLInputElement;
  const clearBg = document.getElementById("brat-clearBg");
  const contrastLabel = document.getElementById("brat-contrastLabel");
  const fontSelectEl = document.getElementById("brat-fontSelect") as HTMLSelectElement;
  const downloadBtn = document.getElementById("brat-download");
  const copyBtn = document.getElementById("brat-copy");
  const altBtn = document.getElementById("brat-altBtn");
  const randomBtn = document.getElementById("brat-randomBtn");
  const batchBtn = document.getElementById("brat-batchBtn");
  const controlsEl = document.getElementById("brat-controls");
  const undoBtn = document.getElementById("brat-undo") as HTMLButtonElement | null;
  const redoBtn = document.getElementById("brat-redo") as HTMLButtonElement | null;

  if (
    !textEl ||
    !fontSizeEl ||
    !lineHeightEl ||
    !letterSpacingEl ||
    !alignEl ||
    !outlineEl ||
    !outlineColorEl ||
    !outlineColorContainer ||
    !shadowEl ||
    !shadowColorEl ||
    !shadowColorContainer ||
    !bgColorEl ||
    !fgColorEl ||
    !ratioEl ||
    !resEl ||
    !safeEl ||
    !safeToggle ||
    !bgUpload ||
    !clearBg ||
    !contrastLabel ||
    !fontSelectEl ||
    !downloadBtn ||
    !copyBtn ||
    !altBtn ||
    !randomBtn ||
    !batchBtn ||
    !controlsEl
  ) {
    return () => {};
  }

  const state = {
    text: options?.defaultPlaceholder || "brat",
    fontSize: 180,
    lineHeight: 1.0,
    letterSpacing: 0,
    align: "center",
    outline: false,
    outlineColor: "#ffffff",
    shadow: false,
    shadowColor: "#000000",
    bg: options?.defaultBg || "#c1ff00",
    fg: options?.defaultFg || "#0a0a0a",
    ratio: (options?.defaultRatio || "1:1") as string,
    res: Number(options?.defaultResolution) || 1500,
    safe: false,
    bgImage: null as HTMLImageElement | null,
    stickers: [] as {
      char: string;
      centerX: number;
      centerY: number;
      size: number;
      rotation: number;
    }[],
    fontFamily: "'Inter', sans-serif",
    textTransform: { x: 0, y: 0, rotation: 0, scale: 1, selected: false },
  };

  const historyStack: GeneratorState[] = [];
  const redoStack: GeneratorState[] = [];
  const MAX_HISTORY = 50;

  function deepCloneState(s: typeof state): GeneratorState {
    return {
      text: s.text,
      textTransform: {
        x: s.textTransform.x,
        y: s.textTransform.y,
        rotation: s.textTransform.rotation,
        scale: s.textTransform.scale,
        selected: s.textTransform.selected,
      },
      stickers: s.stickers.map((st) => ({
        char: st.char,
        centerX: st.centerX,
        centerY: st.centerY,
        size: st.size,
        rotation: st.rotation,
      })),
      bg: s.bg,
      bgImage: s.bgImage
        ? (() => {
            const img = new Image();
            img.src = s.bgImage!.src;
            return img;
          })()
        : null,
      fontSize: s.fontSize,
      lineHeight: s.lineHeight,
      letterSpacing: s.letterSpacing,
      fontFamily: s.fontFamily,
      outline: s.outline,
      outlineColor: s.outlineColor,
      shadow: s.shadow,
      shadowColor: s.shadowColor,
      res: s.res,
      ratio: s.ratio,
      align: s.align,
      fg: s.fg,
      safe: s.safe,
    };
  }

  function pushHistory() {
    historyStack.push(deepCloneState(state));
    if (historyStack.length > MAX_HISTORY) historyStack.shift();
    redoStack.length = 0;
    updateUndoRedoButtons();
  }

  function pushHistoryState(snap: GeneratorState) {
    historyStack.push(snap);
    if (historyStack.length > MAX_HISTORY) historyStack.shift();
    redoStack.length = 0;
    updateUndoRedoButtons();
  }

  function updateUndoRedoButtons() {
    if (undoBtn) undoBtn.disabled = historyStack.length === 0;
    if (redoBtn) redoBtn.disabled = redoStack.length === 0;
  }

  function syncInputsFromState() {
    textEl.value = state.text;
    fontSizeEl.value = String(state.fontSize);
    lineHeightEl.value = String(state.lineHeight);
    letterSpacingEl.value = String(state.letterSpacing);
    alignEl.value = state.align;
    outlineEl.checked = state.outline;
    outlineColorEl.value = state.outlineColor;
    shadowEl.checked = state.shadow;
    shadowColorEl.value = state.shadowColor;
    bgColorEl.value = state.bg;
    fgColorEl.value = state.fg;
    
    document.querySelectorAll(".brat-pill").forEach((p) => {
      const el = p as HTMLElement;
      if (el.dataset.bg === state.bg && el.dataset.fg === state.fg) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });

    ratioEl.value = state.ratio;
    resEl.value = String(state.res);
    safeToggle.checked = state.safe;
    fontSelectEl.value = state.fontFamily;
    outlineColorContainer!.style.display = state.outline ? "inline-flex" : "none";
    shadowColorContainer!.style.display = state.shadow ? "inline-flex" : "none";
  }

  function undo() {
    if (historyStack.length === 0) return;
    redoStack.push(deepCloneState(state));
    const prev = historyStack.pop()!;
    Object.assign(state, prev);
    updateUndoRedoButtons();
    syncInputsFromState();
    requestDraw();
  }

  function redo() {
    if (redoStack.length === 0) return;
    historyStack.push(deepCloneState(state));
    const next = redoStack.pop()!;
    Object.assign(state, next);
    updateUndoRedoButtons();
    syncInputsFromState();
    requestDraw();
  }

  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const HANDLE_HIT_RADIUS = isTouch ? 28 : 12;
  const DELETE_ICON_SIZE = 18;
  const DELETE_ICON_RADIUS = 9;
  const LONG_PRESS_MS = 900;
  const LONG_PRESS_MOVE_THRESHOLD = 5;

  let selectedSticker: number | null = null;
  let longPressTimer: ReturnType<typeof setTimeout> | null = null;
  let handleAction: string | null = null;
  let pendingHistoryOnPointerUp: GeneratorState | null = null;
  let capturedPointerId: number | null = null;
  const dragStart: Record<string, unknown> = {};
  let draggingText = false;
  const dragTextStart: Record<string, number> = {};
  let resizingText = false;
  const resizeStart: Record<string, number> = {};
  let rotatingText = false;
  const rotateStart: Record<string, number> = {};
  let hoveredTextHandle: string | null = null;
  let currentBgUrl: string | null = null;

  function ratioToSize(ratio: string, base: number): [number, number] {
    switch (ratio) {
      case "4:5":
        return [Math.round(base * 0.8), base];
      case "9:16":
        return [Math.round(base * 0.5625), base];
      case "16:9":
        return [base, Math.round(base * 0.5625)];
      default:
        return [base, base];
    }
  }

  function hexToRgb(hex: string) {
    if (hex.startsWith("rgba")) {
      const parts = hex.replace(/^rgba?\(|\s+|\)$/g, "").split(",");
      return {
        r: parseInt(parts[0]),
        g: parseInt(parts[1]),
        b: parseInt(parts[2]),
        a: parseFloat(parts[3] || "1"),
      };
    }
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map((x) => x + x).join("");
    const num = parseInt(hex, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255, a: 1 };
  }

  function luminance({ r, g, b }: { r: number; g: number; b: number }) {
    r /= 255;
    g /= 255;
    b /= 255;
    const a = [r, g, b].map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }

  function contrastRatio(bg: string, fg: string) {
    const L1 = luminance(hexToRgb(bg)) + 0.05;
    const L2 = luminance(hexToRgb(fg)) + 0.05;
    return L1 > L2 ? L1 / L2 : L2 / L1;
  }

  function formatContrast(c: number) {
    return c.toFixed(2) + (c >= 4.5 ? " (AA ✓)" : c >= 3 ? " (Large AA ✓)" : " (low)");
  }

  function fontSpec() {
    return `bold ${state.fontSize}px ${state.fontFamily}`;
  }

  function splitLines(text: string, maxWidth: number) {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let cur = "";
    ctx.font = fontSpec();
    for (const w of words) {
      const test = (cur ? cur + " " : "") + w;
      if (ctx.measureText(test).width <= maxWidth) {
        cur = test;
      } else {
        if (cur) lines.push(cur);
        cur = w;
      }
    }
    if (cur) lines.push(cur);
    return lines;
  }

  function totalLineWidth(line: string) {
    const chars = [...line];
    let width = 0;
    for (let i = 0; i < chars.length; i++) {
      width += ctx.measureText(chars[i]).width;
      if (i < chars.length - 1) width += state.letterSpacing;
    }
    return width;
  }

  function drawBg() {
    ctx.save();
    if (state.bgImage) {
      const img = state.bgImage;
      const cw = c.width;
      const ch = c.height;
      const ir = img.width / img.height;
      const cr = cw / ch;
      let dw: number, dh: number, dx: number, dy: number;
      if (ir > cr) {
        dh = ch;
        dw = dh * ir;
        dx = (cw - dw) / 2;
        dy = 0;
      } else {
        dw = cw;
        dh = dw / ir;
        dx = 0;
        dy = (ch - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    } else {
      ctx.fillStyle = state.bg;
      ctx.fillRect(0, 0, c.width, c.height);
    }
    ctx.restore();
  }

  function drawText() {
    const padding = Math.round(c.width * 0.08);
    const boxW = c.width - padding * 2;
    let txt = state.text || "";
    txt = txt.toLowerCase();
    const lines = splitLines(txt, boxW);
    ctx.save();
    ctx.font = fontSpec();
    ctx.textBaseline = "top";
    ctx.fillStyle = state.fg;
    ctx.textAlign = "left";
    const LH = state.fontSize * state.lineHeight;
    const totalTextH = (lines.length - 1) * LH + state.fontSize;
    const centerX = c.width / 2;
    const centerY = c.height / 2;
    const tt = state.textTransform;
    ctx.translate(centerX + tt.x, centerY + tt.y);
    ctx.rotate(tt.rotation);
    ctx.scale(tt.scale, tt.scale);
    if (state.shadow) {
      ctx.shadowColor = state.shadowColor;
      ctx.shadowBlur = Math.round(state.fontSize * 0.08);
      ctx.shadowOffsetY = Math.round(state.fontSize * 0.04);
    } else {
      ctx.shadowColor = "transparent";
    }
    lines.forEach((line, i) => {
      const chars = [...line];
      const lineWidth = totalLineWidth(line);
      let lineX: number;
      if (state.align === "left") lineX = -boxW / 2;
      else if (state.align === "right") lineX = boxW / 2 - lineWidth;
      else lineX = -lineWidth / 2;
      const lineY = -totalTextH / 2 + i * LH;
      for (const ch of chars) {
        if (state.outline) {
          ctx.lineWidth = Math.max(4, Math.round(state.fontSize * 0.08));
          ctx.strokeStyle = state.outlineColor;
          ctx.strokeText(ch, lineX, lineY);
        }
        ctx.fillText(ch, lineX, lineY);
        lineX += ctx.measureText(ch).width + state.letterSpacing;
      }
    });
    ctx.restore();
  }

  function drawTextBoundingBox() {
    const padding = Math.round(c.width * 0.08);
    const boxW = c.width - padding * 2;
    let txt = state.text || "";
    txt = txt.toLowerCase();
    const lines = splitLines(txt, boxW);
    ctx.save();
    ctx.font = fontSpec();
    const LH = state.fontSize * state.lineHeight;
    const totalTextH = (lines.length - 1) * LH + state.fontSize;
    let maxW = 0;
    for (const line of lines) {
      const w = totalLineWidth(line);
      if (w > maxW) maxW = w;
    }
    const tt = state.textTransform;
    const centerX = c.width / 2;
    const centerY = c.height / 2;
    ctx.translate(centerX + tt.x, centerY + tt.y);
    ctx.rotate(tt.rotation);
    ctx.scale(tt.scale, tt.scale);
    const pad = 16;
    const rectW = maxW + pad * 2;
    const rectH = totalTextH + pad * 2;
    const rx = -rectW / 2;
    const ry = -rectH / 2;
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = Math.max(2, 3 / tt.scale);
    ctx.setLineDash([Math.max(6, 8 / tt.scale), Math.max(4, 6 / tt.scale)]);
    ctx.strokeRect(rx, ry, rectW, rectH);
    ctx.setLineDash([]);
    const handleSize = Math.max(8, 10 / tt.scale);
    const corners: [number, number][] = [
      [rx, ry],
      [rx + rectW, ry],
      [rx + rectW, ry + rectH],
      [rx, ry + rectH],
    ];
    for (const [hx, hy] of corners) {
      const isHovered = hoveredTextHandle === "resize";
      const hs = isHovered ? handleSize * 1.3 : handleSize;
      ctx.fillStyle = isHovered ? "#dbeafe" : "#fff";
      ctx.fillRect(hx - hs / 2, hy - hs / 2, hs, hs);
      ctx.strokeStyle = isHovered ? "#1d4ed8" : "#2563eb";
      ctx.lineWidth = Math.max(1.5, 2 / tt.scale);
      ctx.strokeRect(hx - hs / 2, hy - hs / 2, hs, hs);
    }
    const rotHandleOffset = Math.max(30, 40 / tt.scale);
    const rotHandleY = ry - rotHandleOffset;
    const rotHandleR = Math.max(6, 8 / tt.scale);
    const isRotHovered = hoveredTextHandle === "rotate";
    const activeRotR = isRotHovered ? rotHandleR * 1.3 : rotHandleR;
    ctx.strokeStyle = isRotHovered ? "#1d4ed8" : "#2563eb";
    ctx.lineWidth = Math.max(1.5, 2 / tt.scale);
    ctx.beginPath();
    ctx.moveTo(0, ry);
    ctx.lineTo(0, rotHandleY + activeRotR);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, rotHandleY, activeRotR, 0, 2 * Math.PI);
    ctx.fillStyle = isRotHovered ? "#dbeafe" : "#fff";
    ctx.fill();
    ctx.strokeStyle = isRotHovered ? "#1d4ed8" : "#2563eb";
    ctx.lineWidth = Math.max(1.5, 2 / tt.scale);
    ctx.stroke();
    ctx.restore();
  }

  function makeSticker(
    char: string,
    centerX: number,
    centerY: number,
    size: number,
    rotation = 0
  ) {
    return { char, centerX, centerY, size, rotation };
  }

  function drawStickers() {
    state.stickers.forEach((s, idx) => {
      const bitmap = getOrCreateEmojiBitmap(s.char);
      if (!bitmap) return;
      ctx.save();
      ctx.translate(s.centerX, s.centerY);
      ctx.rotate((s.rotation || 0) * (Math.PI / 180));
      const sz = s.size;
      ctx.drawImage(bitmap, 0, 0, 256, 256, -sz / 2, -sz / 2, sz, sz);
      if (idx === selectedSticker) {
        const half = s.size / 2;
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.strokeRect(-half, -half, s.size, s.size);
        const handleSize = 10;
        const corners: [number, number][] = [
          [-half, -half],
          [half, -half],
          [half, half],
          [-half, half],
        ];
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        corners.forEach(([hx, hy]) => {
          ctx.fillRect(hx - handleSize / 2, hy - handleSize / 2, handleSize, handleSize);
          ctx.strokeRect(hx - handleSize / 2, hy - handleSize / 2, handleSize, handleSize);
        });
        ctx.setLineDash([]);
        const delX = half + DELETE_ICON_RADIUS;
        const delY = -half - DELETE_ICON_RADIUS;
        ctx.shadowColor = "rgba(0,0,0,0.15)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 1;
        ctx.beginPath();
        ctx.arc(delX, delY, DELETE_ICON_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.fillStyle = "#000";
        ctx.font = "bold 14px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("×", delX, delY);
      }
      ctx.restore();
    });
  }

  function updateContrast() {
    if (contrastLabel)
      contrastLabel!.textContent = `${formatContrast(contrastRatio(state.bg, state.fg))} — bg ${state.bg} / text ${state.fg}`;
  }

  function deleteSelectedSticker() {
    if (selectedSticker !== null && selectedSticker < state.stickers.length) {
      pushHistory();
      state.stickers.splice(selectedSticker, 1);
      selectedSticker = null;
      handleAction = null;
      requestDraw();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawBg();
    drawText();
    if (state.textTransform.selected) drawTextBoundingBox();
    drawStickers();
    updateContrast();
    safeEl!.hidden = !state.safe;
  }

  let drawQueued = false;
  function requestDraw() {
    if (drawQueued) return;
    drawQueued = true;
    requestAnimationFrame(() => {
      drawQueued = false;
      draw();
    });
  }

  function setCanvasSize() {
    const oldWidth = c.width;
    const oldHeight = c.height;
    const [w, h] = ratioToSize(state.ratio, state.res);
    c.width = w;
    c.height = h;
    const scaleX = c.width / oldWidth;
    const scaleY = c.height / oldHeight;
    state.stickers.forEach((s) => {
      s.centerX *= scaleX;
      s.centerY *= scaleY;
      s.size *= Math.min(scaleX, scaleY);
    });
    requestDraw();
  }

  function getCanvasXYFromClient(clientX: number, clientY: number) {
    const rect = c.getBoundingClientRect();
    const x = (clientX - rect.left) * (c.width / rect.width);
    const y = (clientY - rect.top) * (c.height / rect.height);
    return { x, y };
  }

  function findStickerHandle(x: number, y: number) {
    if (selectedSticker !== null && selectedSticker < state.stickers.length) {
      const s = state.stickers[selectedSticker];
      const scx = s.centerX;
      const scy = s.centerY;
      const hs = s.size / 2;
      const lx = x - scx;
      let ly = y - scy;
      const rad = -((s.rotation || 0) * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const slx = lx * cos - ly * sin;
      const sly = lx * sin + ly * cos;
      const delX = hs + DELETE_ICON_RADIUS;
      const delY = -hs - DELETE_ICON_RADIUS;
      const delHitR = isTouch ? 22 : DELETE_ICON_RADIUS;
      if (Math.hypot(slx - delX, sly - delY) <= delHitR) {
        const trCornerX = hs;
        const trCornerY = -hs;
        const inTrBox =
          Math.abs(slx - trCornerX) <= HANDLE_HIT_RADIUS &&
          Math.abs(sly - trCornerY) <= HANDLE_HIT_RADIUS;
        const distToDel = Math.hypot(slx - delX, sly - delY);
        const distToCorner = Math.hypot(slx - trCornerX, sly - trCornerY);
        if (!(inTrBox && distToCorner < distToDel))
          return { i: selectedSticker, handle: "delete" };
      }
      const rotOff = Math.max(30, s.size * 0.25);
      const rotY = -hs - rotOff;
      if (Math.hypot(slx, sly - rotY) <= HANDLE_HIT_RADIUS)
        return { i: selectedSticker, handle: "rotate" };
      const cns = [
        { hx: -hs, hy: -hs, handle: "resize-tl" },
        { hx: hs, hy: -hs, handle: "resize-tr" },
        { hx: hs, hy: hs, handle: "resize-br" },
        { hx: -hs, hy: hs, handle: "resize-bl" },
      ];
      for (const cn of cns) {
        if (
          Math.abs(slx - cn.hx) <= HANDLE_HIT_RADIUS &&
          Math.abs(sly - cn.hy) <= HANDLE_HIT_RADIUS
        )
          return { i: selectedSticker, handle: cn.handle };
      }
    }
    for (let i = state.stickers.length - 1; i >= 0; i--) {
      const s = state.stickers[i];
      const scx = s.centerX;
      const scy = s.centerY;
      const hs = s.size / 2;
      const lx = x - scx;
      const ly = y - scy;
      const rad = -((s.rotation || 0) * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const slx = lx * cos - ly * sin;
      const sly = lx * sin + ly * cos;
      const movePadding = isTouch ? HANDLE_HIT_RADIUS : 0;
      if (slx >= -hs - movePadding && slx <= hs + movePadding && sly >= -hs - movePadding && sly <= hs + movePadding)
        return { i, handle: "move" };
    }
    return null;
  }

  function pointerDown(clientX: number, clientY: number) {
    if (selectedSticker !== null && selectedSticker >= state.stickers.length) {
      selectedSticker = null;
    }
    const { x, y } = getCanvasXYFromClient(clientX, clientY);
    const info = findStickerHandle(x, y);
    if (info) {
      if (info.handle === "delete") {
        deleteSelectedSticker();
        return;
      }
      selectedSticker = info.i;
      handleAction = info.handle;
      pendingHistoryOnPointerUp = deepCloneState(state);
      const si = state.stickers[selectedSticker];
      (dragStart as { x?: number }).x = x;
      (dragStart as { y?: number }).y = y;
      (dragStart as { orig?: typeof si }).orig = { ...si };
      if (info.handle === "rotate") {
        (dragStart as { initialAngle?: number }).initialAngle = Math.atan2(
          y - si.centerY,
          x - si.centerX
        );
        (dragStart as { initialRotation?: number }).initialRotation = si.rotation || 0;
      } else if (info.handle.startsWith("resize")) {
        const hs = si.size / 2;
        const rad = ((si.rotation || 0) * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const oppLocal: Record<string, [number, number]> = {
          "resize-tl": [hs, hs],
          "resize-tr": [-hs, hs],
          "resize-br": [-hs, -hs],
          "resize-bl": [hs, -hs],
        };
        const [lox, loy] = oppLocal[info.handle] ?? [hs, hs];
        (dragStart as { oppX?: number }).oppX = si.centerX + lox * cos - loy * sin;
        (dragStart as { oppY?: number }).oppY = si.centerY + lox * sin + loy * cos;
        (dragStart as { initialSize?: number }).initialSize = si.size;
        (dragStart as { resizeHandle?: string }).resizeHandle = info.handle;
        (dragStart as { resizeRotation?: number }).resizeRotation = si.rotation || 0;
      }
      state.textTransform.selected = false;
      draggingText = false;
      if (info.handle === "move" && isTouch) {
        (dragStart as { initialX?: number }).initialX = x;
        (dragStart as { initialY?: number }).initialY = y;
        longPressTimer = setTimeout(() => {
          longPressTimer = null;
          deleteSelectedSticker();
        }, LONG_PRESS_MS);
      }
      requestDraw();
      return;
    }
    selectedSticker = null;
    handleAction = null;
    const padding = Math.round(c.width * 0.08);
    const boxW = c.width - padding * 2;
    let txt = state.text || "";
    txt = txt.toLowerCase();
    const lines = splitLines(txt, boxW);
    ctx.font = fontSpec();
    const LH = state.fontSize * state.lineHeight;
    const totalTextH = (lines.length - 1) * LH + state.fontSize;
    const tt = state.textTransform;
    let maxW = 0;
    for (const line of lines) {
      const w = totalLineWidth(line);
      if (w > maxW) maxW = w;
    }
    const centerX = c.width / 2 + tt.x;
    const centerY = c.height / 2 + tt.y;
    let lx = x - centerX;
    let ly = y - centerY;
    const cos = Math.cos(-tt.rotation);
    const sin = Math.sin(-tt.rotation);
    const rlx = lx * cos - ly * sin;
    const rly = lx * sin + ly * cos;
    const slx = rlx / tt.scale;
    const sly = rly / tt.scale;
    const pad = 16;
    const halfW = maxW / 2 + pad;
    const halfH = totalTextH / 2 + pad;

    if (tt.selected) {
      const rotHandleOffset = Math.max(30, 40 / tt.scale);
      const rotHandleY = -halfH - pad + pad - rotHandleOffset;
      const rotHandleR = Math.max(6, 8 / tt.scale);
      const rotHitR = isTouch ? Math.max(22, rotHandleR * 2) : rotHandleR * 2;
      if (Math.abs(slx) <= rotHitR && Math.abs(sly - rotHandleY) <= rotHitR) {
        rotatingText = true;
        draggingText = false;
        resizingText = false;
        pendingHistoryOnPointerUp = deepCloneState(state);
        const angle = Math.atan2(y - centerY, x - centerX);
        rotateStart.initialAngle = angle;
        rotateStart.initialRotation = tt.rotation;
        requestDraw();
        return;
      }
    }

    if (tt.selected) {
      const handleSize = Math.max(8, 10 / tt.scale);
      const handleHit = isTouch ? Math.max(22, handleSize * 1.5) : handleSize * 1.5;
      const corners: [number, number][] = [
        [-halfW, -halfH],
        [halfW, -halfH],
        [halfW, halfH],
        [-halfW, halfH],
      ];
      for (const [hx, hy] of corners) {
        if (Math.abs(slx - hx) <= handleHit && Math.abs(sly - hy) <= handleHit) {
          resizingText = true;
          draggingText = false;
          rotatingText = false;
          pendingHistoryOnPointerUp = deepCloneState(state);
          const dist = Math.hypot(x - centerX, y - centerY);
          resizeStart.initialDist = dist;
          resizeStart.initialScale = tt.scale;
          requestDraw();
          return;
        }
      }
    }

    if (slx >= -halfW && slx <= halfW && sly >= -halfH && sly <= halfH) {
      draggingText = true;
      resizingText = false;
      rotatingText = false;
      pendingHistoryOnPointerUp = deepCloneState(state);
      state.textTransform.selected = true;
      dragTextStart.x = x;
      dragTextStart.y = y;
      dragTextStart.origX = tt.x;
      dragTextStart.origY = tt.y;
      requestDraw();
      return;
    }
    state.textTransform.selected = false;
    draggingText = false;
    resizingText = false;
    rotatingText = false;
    requestDraw();
  }

  function pointerMove(clientX: number, clientY: number) {
    const { x, y } = getCanvasXYFromClient(clientX, clientY);
    if (
      selectedSticker !== null &&
      selectedSticker >= 0 &&
      selectedSticker < state.stickers.length &&
      handleAction
    ) {
      const s = state.stickers[selectedSticker];
      if (handleAction === "move") {
        if (longPressTimer) {
          const initX = (dragStart as { initialX?: number }).initialX ?? (dragStart as { x?: number }).x ?? 0;
          const initY = (dragStart as { initialY?: number }).initialY ?? (dragStart as { y?: number }).y ?? 0;
          const moveDist = Math.hypot(x - initX, y - initY);
          if (moveDist > LONG_PRESS_MOVE_THRESHOLD) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
          }
        }
        c.style.cursor = "move";
        const dx = x - ((dragStart as { x?: number }).x ?? 0);
        const dy = y - ((dragStart as { y?: number }).y ?? 0);
        s.centerX += dx;
        s.centerY += dy;
        const half = s.size / 2;
        s.centerX = Math.max(half, Math.min(c.width - half, s.centerX));
        s.centerY = Math.max(half, Math.min(c.height - half, s.centerY));
        (dragStart as { x?: number }).x = x;
        (dragStart as { y?: number }).y = y;
      } else if (handleAction.startsWith("resize")) {
        c.style.cursor = "nwse-resize";
        const oppX = (dragStart as { oppX?: number }).oppX ?? 0;
        const oppY = (dragStart as { oppY?: number }).oppY ?? 0;
        const dist = Math.hypot(x - oppX, y - oppY);
        const newSize = Math.min(500, Math.max(30, dist / Math.SQRT2));
        s.size = newSize;
        s.centerX = (oppX + x) / 2;
        s.centerY = (oppY + y) / 2;
      } else if (handleAction === "rotate") {
        c.style.cursor = "grabbing";
        const angle = Math.atan2(y - s.centerY, x - s.centerX);
        s.rotation =
          ((dragStart as { initialRotation?: number }).initialRotation ?? 0) +
          (angle - ((dragStart as { initialAngle?: number }).initialAngle ?? 0)) *
            (180 / Math.PI);
      }
      requestDraw();
      return;
    }
    if (rotatingText) {
      c.style.cursor = "grabbing";
      const tt = state.textTransform;
      const padding = Math.round(c.width * 0.08);
      const boxW = c.width - padding * 2;
      let txt = state.text || "";
      txt = txt.toLowerCase();
      const lines = splitLines(txt, boxW);
      ctx.font = fontSpec();
      const LH = state.fontSize * state.lineHeight;
      const totalTextH = (lines.length - 1) * LH + state.fontSize;
      const centerX = c.width / 2 + tt.x;
      const centerY = c.height / 2 + tt.y;
      const angle = Math.atan2(y - centerY, x - centerX);
      tt.rotation =
        rotateStart.initialRotation +
        (angle - rotateStart.initialAngle);
      requestDraw();
      return;
    }
    if (resizingText) {
      c.style.cursor = "nwse-resize";
      const tt = state.textTransform;
      const centerX = c.width / 2 + tt.x;
      const centerY = c.height / 2 + tt.y;
      const dist = Math.hypot(x - centerX, y - centerY);
      if (resizeStart.initialDist > 0) {
        tt.scale = Math.min(
          5,
          Math.max(0.2, resizeStart.initialScale * (dist / resizeStart.initialDist))
        );
      }
      requestDraw();
      return;
    }
    if (draggingText) {
      c.style.cursor = "move";
      state.textTransform.x = dragTextStart.origX + (x - dragTextStart.x);
      state.textTransform.y = dragTextStart.origY + (y - dragTextStart.y);
      requestDraw();
      return;
    }

    if (handleAction !== null || rotatingText || resizingText || draggingText) return;
    const tt = state.textTransform;
    if (tt.selected) {
      const padding = Math.round(c.width * 0.08);
      const boxW = c.width - padding * 2;
      let txt = state.text || "";
      txt = txt.toLowerCase();
      const lines = splitLines(txt, boxW);
      ctx.font = fontSpec();
      const LH = state.fontSize * state.lineHeight;
      const totalTextH = (lines.length - 1) * LH + state.fontSize;
      let maxW = 0;
      for (const line of lines) {
        const w = totalLineWidth(line);
        if (w > maxW) maxW = w;
      }
      const centerX = c.width / 2 + tt.x;
      const centerY = c.height / 2 + tt.y;
      const lx = x - centerX;
      const ly = y - centerY;
      const cos = Math.cos(-tt.rotation);
      const sin = Math.sin(-tt.rotation);
      const slx = (lx * cos - ly * sin) / tt.scale;
      const sly = (lx * sin + ly * cos) / tt.scale;
      const pad = 16;
      const halfW = maxW / 2 + pad;
      const halfH = totalTextH / 2 + pad;
      const rotHandleOffset = Math.max(30, 40 / tt.scale);
      const rotHandleY = -halfH - rotHandleOffset;
      const rotHandleR = Math.max(6, 8 / tt.scale);
      const rotHitR = isTouch ? Math.max(22, rotHandleR * 2) : rotHandleR * 2;
      if (Math.abs(slx) <= rotHitR && Math.abs(sly - rotHandleY) <= rotHitR) {
        c.style.cursor = "grab";
        if (hoveredTextHandle !== "rotate") {
          hoveredTextHandle = "rotate";
          requestDraw();
        }
        return;
      }
      const handleSize = Math.max(8, 10 / tt.scale);
      const handleHit = isTouch ? Math.max(22, handleSize * 1.5) : handleSize * 1.5;
      const corners: [number, number][] = [
        [-halfW, -halfH],
        [halfW, -halfH],
        [halfW, halfH],
        [-halfW, halfH],
      ];
      for (const [hx, hy] of corners) {
        if (Math.abs(slx - hx) <= handleHit && Math.abs(sly - hy) <= handleHit) {
          c.style.cursor = "nwse-resize";
          if (hoveredTextHandle !== "resize") {
            hoveredTextHandle = "resize";
            requestDraw();
          }
          return;
        }
      }
      if (slx >= -halfW && slx <= halfW && sly >= -halfH && sly <= halfH) {
        c.style.cursor = "move";
        if (hoveredTextHandle !== "move") {
          hoveredTextHandle = "move";
          requestDraw();
        }
        return;
      }
    }

    if (selectedSticker !== null) {
      const hi = findStickerHandle(x, y);
      if (hi && hi.i === selectedSticker) {
        if (hi.handle === "delete") {
          c.style.cursor = "pointer";
          return;
        }
        if (hi.handle === "rotate") {
          c.style.cursor = "grab";
          return;
        }
        if (hi.handle.startsWith("resize")) {
          c.style.cursor = "nwse-resize";
          return;
        }
        if (hi.handle === "move") {
          c.style.cursor = "move";
          return;
        }
      }
    }
    c.style.cursor = "default";
    if (hoveredTextHandle !== null) {
      hoveredTextHandle = null;
      if (tt.selected) requestDraw();
    }
  }

  function pointerUp() {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
    if (handleAction !== null || draggingText || resizingText || rotatingText) {
      if (pendingHistoryOnPointerUp) {
        pushHistoryState(pendingHistoryOnPointerUp);
      }
    }
    pendingHistoryOnPointerUp = null;
    handleAction = null;
    draggingText = false;
    resizingText = false;
    rotatingText = false;
    c.style.cursor = "default";
    if (capturedPointerId !== null) {
      try {
        c.releasePointerCapture(capturedPointerId);
      } catch {
        /* ignore */
      }
      capturedPointerId = null;
    }
  }

  const onPointerMove = (e: PointerEvent) => {
    if (handleAction !== null || draggingText || resizingText || rotatingText) {
      e.preventDefault();
    }
    pointerMove(e.clientX, e.clientY);
  };
  const onPointerUp = (e: PointerEvent) => {
    if (capturedPointerId === e.pointerId) {
      try {
        c.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      capturedPointerId = null;
    }
    pointerUp();
  };
  const onKeyDown = (e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName?.toLowerCase() || "";
    if (tag === "input" || tag === "textarea" || tag === "select") return;
    const tt = state.textTransform;
    if (e.key === "Escape") {
      tt.selected = false;
      selectedSticker = null;
      draggingText = false;
      resizingText = false;
      rotatingText = false;
      hoveredTextHandle = null;
      c.style.cursor = "default";
      requestDraw();
      return;
    }
    if (selectedSticker !== null) {
      const sk = state.stickers[selectedSticker];
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        pushHistory();
        state.stickers.splice(selectedSticker, 1);
        selectedSticker = null;
        requestDraw();
        return;
      }
      const nudge = e.shiftKey ? 10 : 1;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        sk.centerX -= nudge;
        requestDraw();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        sk.centerX += nudge;
        requestDraw();
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        sk.centerY -= nudge;
        requestDraw();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        sk.centerY += nudge;
        requestDraw();
        return;
      }
    }
    if (!tt.selected) return;
    if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      pushHistory();
      tt.x = 0;
      tt.y = 0;
      tt.rotation = 0;
      tt.scale = 1;
      tt.selected = false;
      hoveredTextHandle = null;
      c.style.cursor = "default";
      requestDraw();
      return;
    }
    if (e.key === "d" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      tt.x += 30;
      tt.y += 30;
      requestDraw();
      return;
    }
  };

  c.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    pointerDown(e.clientX, e.clientY);
    const isDrag =
      handleAction !== null || draggingText || resizingText || rotatingText;
    if (isDrag && capturedPointerId === null) {
      try {
        c.setPointerCapture(e.pointerId);
        capturedPointerId = e.pointerId;
      } catch {
        /* ignore */
      }
    }
  });
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
  window.addEventListener("keydown", onKeyDown);
  c.addEventListener("dblclick", (e) => {
    if (isTouch) return;
    const { x, y } = getCanvasXYFromClient(e.clientX, e.clientY);
    const hit = findStickerHandle(x, y);
    if (hit) {
      pushHistory();
      state.stickers.splice(hit.i, 1);
      selectedSticker = null;
      requestDraw();
    }
  });
  c.addEventListener(
    "wheel",
    (e) => {
      if (e.shiftKey) {
        e.preventDefault();
        pushHistory();
        state.fontSize = Math.min(
          300,
          Math.max(24, state.fontSize - Math.sign(e.deltaY) * 4)
        );
        fontSizeEl.value = String(state.fontSize);
        requestDraw();
      }
    },
    { passive: false }
  );

  function addSticker(char: string) {
    pushHistory();
    getOrCreateEmojiBitmap(char);
    const size = 250; 
    const centerX = c.width / 2;
    const centerY = c.height / 2;
    state.stickers.push(makeSticker(char, centerX, centerY, size, 0));
    selectedSticker = state.stickers.length - 1;
    hoveredTextHandle = null;
    state.textTransform.selected = false;
    requestDraw();
  }

  const stickerCategories: Record<string, string[]> = {
    love: ["❤️", "💖", "💘", "💕", "💓", "💞", "💗", "💝", "💟"],
    faces: ["😀", "😎", "😂", "😍", "🥳", "😭", "🤩", "😇", "🥺"],
    sparkles: ["✨", "💫", "⭐", "🌟", "⚡", "🔥"],
    cute: ["🌸", "🌼", "🐰", "🐻", "🎀", "🍓", "🧸"],
    symbols: ["⚡", "💣", "💎", "🎯", "🌀", "🔮"],
  };
  const catIcons: Record<string, string> = {
    love: "❤️",
    faces: "😀",
    sparkles: "✨",
    cute: "🌸",
    symbols: "💎",
  };
  const catContainer = document.getElementById("brat-sticker-cats");
  const gridContainer = document.getElementById("brat-sticker-grid");
  let activeStickerCat: string | null = null;

  if (catContainer) catContainer.innerHTML = "";

  function renderStickerCategory(cat: string) {
    activeStickerCat = cat;
    catContainer?.querySelectorAll(".brat-sticker-cat").forEach((b) => {
      (b as HTMLElement).classList.toggle("active", (b as HTMLElement).dataset.cat === cat);
    });
    if (gridContainer) {
      gridContainer!.innerHTML = "";
      stickerCategories[cat].forEach((emoji) => {
        const btn = document.createElement("button");
        btn.textContent = emoji;
        btn.addEventListener("click", () => addSticker(emoji));
        gridContainer!.appendChild(btn);
      });
    }
  }

  Object.keys(stickerCategories).forEach((cat) => {
    if (!catContainer) return;
    const btn = document.createElement("button");
    btn.className = "brat-sticker-cat";
    btn.dataset.cat = cat;
    btn.textContent = catIcons[cat];
    btn.title = cat.charAt(0).toUpperCase() + cat.slice(1);
    btn.addEventListener("click", () => renderStickerCategory(cat));
    catContainer?.appendChild(btn);
  });
  renderStickerCategory("love");

  function showToast(msg: string, ms = 2500) {
    const t = document.createElement("div");
    t.className = "brat-toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => {
      t.style.opacity = "0";
      setTimeout(() => t.remove(), 300);
    }, ms);
  }

  document.querySelectorAll(".brat-acc-h").forEach((h) => {
    h.addEventListener("click", () => {
      const parent = h.parentElement;
      const panel = parent?.closest(".brat-tab-panel");
      const scope = panel || document;
      scope.querySelectorAll(".brat-acc").forEach((a) => {
        if (a !== parent) a.classList.remove("open");
      });
      parent?.classList.toggle("open");
    });
  });

  const tabBtns = document.querySelectorAll(".brat-tab-btn");
  let activeTab: string | null = null;

  function switchTab(tab: string) {
    const isMobile = window.matchMedia("(max-width: 999px)").matches;
    if (activeTab === tab) {
      return;
    }
    activeTab = tab;
    tabBtns.forEach((b) => {
      b.classList.toggle("active", (b as HTMLElement).dataset.tab === tab);
    });
    document.querySelectorAll(".brat-tab-panel").forEach((p) => {
      p.classList.toggle("active", (p as HTMLElement).dataset.tab === tab);
    });
    if (isMobile) controlsEl!.classList.add("sheet-open");
    const panel = controlsEl!.querySelector(`.brat-tab-panel[data-tab="${tab}"]`);
    if (panel && !panel.querySelector(".brat-acc.open")) {
      const first = panel.querySelector(".brat-acc");
      if (first) first.classList.add("open");
    }
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => switchTab((btn as HTMLElement).dataset.tab || "text"));
  });

  textEl.addEventListener("input", () => {
    state.text = textEl.value;
    requestDraw();
  });
  fontSizeEl.addEventListener("input", () => {
    pushHistory();
    state.fontSize = Number(fontSizeEl.value);
    requestDraw();
  });
  lineHeightEl.addEventListener("input", () => {
    pushHistory();
    state.lineHeight = Number(lineHeightEl.value);
    requestDraw();
  });
  letterSpacingEl.addEventListener("input", () => {
    pushHistory();
    state.letterSpacing = Number(letterSpacingEl.value);
    requestDraw();
  });
  alignEl.addEventListener("change", () => {
    pushHistory();
    state.align = alignEl.value;
    requestDraw();
  });
  outlineEl.addEventListener("change", () => {
    pushHistory();
    state.outline = outlineEl.checked;
    outlineColorContainer!.style.display = outlineEl.checked ? "inline-flex" : "none";
    requestDraw();
  });
  outlineColorEl.addEventListener("input", () => {
    pushHistory();
    state.outlineColor = outlineColorEl.value;
    if (state.outline) requestDraw();
  });
  shadowEl.addEventListener("change", () => {
    state.shadow = shadowEl.checked;
    shadowColorContainer!.style.display = shadowEl.checked ? "inline-flex" : "none";
    requestDraw();
  });
  shadowColorEl.addEventListener("input", () => {
    state.shadowColor = shadowColorEl.value;
    if (state.shadow) requestDraw();
  });
  let bgColorInputActive = false;
  bgColorEl.addEventListener("input", () => {
    if (!bgColorInputActive) {
      bgColorInputActive = true;
      pushHistory();
    }
    state.bg = bgColorEl.value;
    requestDraw();
  });
  bgColorEl.addEventListener("change", () => {
    bgColorInputActive = false;
  });
  fgColorEl.addEventListener("input", () => {
    state.fg = fgColorEl.value;
    requestDraw();
  });
  ratioEl.addEventListener("change", () => {
    pushHistory();
    state.ratio = ratioEl.value;
    setCanvasSize();
  });
  resEl.addEventListener("change", () => {
    pushHistory();
    state.res = Number(resEl.value);
    setCanvasSize();
  });
  safeToggle.addEventListener("change", () => {
    state.safe = safeToggle.checked;
    requestDraw();
  });
  bgUpload.addEventListener("change", (e) => {
    pushHistory();
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (currentBgUrl) {
      URL.revokeObjectURL(currentBgUrl);
      currentBgUrl = null;
    }
    currentBgUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      state.bgImage = img;
      requestDraw();
    };
    img.src = currentBgUrl;
  });
  clearBg.addEventListener("click", () => {
    pushHistory();
    if (currentBgUrl) {
      URL.revokeObjectURL(currentBgUrl);
      currentBgUrl = null;
    }
    state.bgImage = null;
    requestDraw();
  });
  fontSelectEl.addEventListener("change", () => {
    pushHistory();
    state.fontFamily = fontSelectEl.value;
    requestDraw();
  });

  document.querySelectorAll(".brat-pill").forEach((p) => {
    p.addEventListener("click", () => {
      pushHistory();
      const el = p as HTMLElement;
      state.bg = el.dataset.bg || "#c1ff00";
      state.fg = el.dataset.fg || "#0a0a0a";
      syncInputsFromState();
      requestDraw();
    });
  });

  outlineColorContainer!.style.display = state.outline ? "inline-flex" : "none";
  shadowColorContainer!.style.display = state.shadow ? "inline-flex" : "none";

  const downloadNavBtn = document.getElementById("brat-download-nav");
  const downloadDesktopBtn = document.getElementById("brat-download-desktop");
  const copyDesktopBtn = document.getElementById("brat-copy-desktop");

  if (downloadNavBtn) {
    downloadNavBtn.addEventListener("click", () => {
      downloadBtn.click();
    });
  }
  if (downloadDesktopBtn) {
    downloadDesktopBtn.addEventListener("click", () => {
      downloadBtn.click();
    });
  }
  if (copyDesktopBtn) {
    copyDesktopBtn.addEventListener("click", () => {
      copyBtn.click();
    });
  }

  if (undoBtn) undoBtn.addEventListener("click", () => undo());
  if (redoBtn) redoBtn.addEventListener("click", () => redo());

  downloadBtn.addEventListener("click", () => {
    const wasSelected = state.textTransform.selected;
    state.textTransform.selected = false;
    draw();
    c.toBlob((b) => {
      if (!b) {
        showToast("Download failed. Please try again.");
        state.textTransform.selected = wasSelected;
        requestDraw();
        return;
      }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      const base =
        state.text.trim().split(/\s+/).slice(0, 5).join("_") || "brat";
      a.download = `${base}_${state.res}.png`;
      a.click();
      state.textTransform.selected = wasSelected;
      requestDraw();
    }, "image/png");
  });

  async function safeCopyText(text: string) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        showToast("Text copied to clipboard");
        return true;
      }
    } catch {
      /* ignore */
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (ok) {
        showToast("Text copied (fallback)");
        return true;
      }
    } catch {
      /* ignore */
    }
    return false;
  }

  async function safeCopyCanvasImage() {
    const wasSelected = state.textTransform.selected;
    state.textTransform.selected = false;
    draw();
    const blob = await new Promise<Blob | null>((res) =>
      c.toBlob(res, "image/png")
    );
    state.textTransform.selected = wasSelected;
    requestDraw();
    if (!blob) {
      showToast("Failed to create image");
      return false;
    }
    if (!navigator.clipboard || typeof ClipboardItem === "undefined") {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      showToast("Clipboard API not available — opened image in new tab");
      return false;
    }
    try {
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      showToast("Image copied to clipboard");
      return true;
    } catch {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      showToast("Image copy blocked — opened in new tab");
      return false;
    }
  }

  copyBtn.addEventListener("click", async () => {
    try {
      await safeCopyCanvasImage();
    } catch {
      alert("Copy failed — use Download instead.");
    }
  });

  altBtn.addEventListener("click", async () => {
    const ratio = state.ratio;
    const bg = state.bgImage ? "photo background" : `solid background ${state.bg}`;
    const txt = (state.text.toLowerCase())
      .replace(/\s+/g, " ")
      .trim();
    await safeCopyText(
      `Brat-style cover, ${ratio}, ${bg}. Lowercase bold text: "${txt}" in ${state.fg}.`
    );
  });

  const phrases = [
    "brat",
    "main character",
    "delulu season",
    "messy but hot",
    "booked & busy",
    "it's camp",
    "low effort high impact",
    "no notes",
    "too glam to give a damn",
    "girl dinner energy",
  ];
  randomBtn.addEventListener("click", () => {
    textEl.value = phrases[Math.floor(Math.random() * phrases.length)];
    textEl.dispatchEvent(new Event("input"));
  });

  function loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof document === "undefined") {
        reject(new Error("Document not available"));
        return;
      }
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });
  }

  batchBtn.addEventListener("click", async () => {
    const batchEl = document.getElementById("brat-batch") as HTMLTextAreaElement;
    const lines = (batchEl?.value || "")
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (lines.length === 0) {
      alert("Add at least one line in the batch box.");
      return;
    }
    
    try {
      await Promise.all([
        loadScript("https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"),
        loadScript("https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js"),
      ]);
    } catch (err) {
      alert("ZIP export requires JSZip and FileSaver. Failed to load.");
      return;
    }

    const dynamicJSZip = (window as unknown as { JSZip?: any }).JSZip;
    const dynamicSaveAs = (window as unknown as { saveAs?: any }).saveAs;

    if (!dynamicJSZip || !dynamicSaveAs) {
      alert("ZIP export requires JSZip and FileSaver. Please refresh the page.");
      return;
    }
    const zip = new dynamicJSZip();
    const originalState = { ...state };
    const wasSelected = state.textTransform.selected;
    state.textTransform.selected = false;
    for (const line of lines) {
      state.text = line;
      draw();
      const blob = await new Promise<Blob | null>((res) => c.toBlob(res));
      if (blob) {
        const fname = line
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "_")
          .replace(/^_|_$/g, "") || "brat";
        zip.file(`${fname}_${state.res}.png`, blob);
      }
    }
    Object.assign(state, originalState);
    state.textTransform.selected = wasSelected;
    draw();
    const out = await zip.generateAsync({ type: "blob" });
    dynamicSaveAs(out, "brat_batch.zip");
  });

  setTimeout(() => {
    syncInputsFromState();
    requestDraw();
  }, 100);
  setCanvasSize();
  switchTab(options?.defaultTab || "text");
  updateUndoRedoButtons();

  const onResize = () => {
    const isMobile = window.matchMedia("(max-width: 999px)").matches;
    if (isMobile && activeTab) {
      controlsEl!.classList.add("sheet-open");
    }
  };
  window.addEventListener("resize", onResize);

  const isMobileInit = window.matchMedia("(max-width: 999px)").matches;
  if (isMobileInit && controlsEl) {
    switchTab(options?.defaultTab || "text");
  }

  return () => {
    if (longPressTimer) clearTimeout(longPressTimer);
    if (currentBgUrl) {
      URL.revokeObjectURL(currentBgUrl);
      currentBgUrl = null;
    }
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("resize", onResize);
    // Reset __bratInit so HMR / re-mount can re-initialize
    if (root) {
      (root as HTMLElement & { __bratInit?: boolean }).__bratInit = false;
    }
  };
}
