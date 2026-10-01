// ============================================================
//  ICON LIBRARY - original line/fill icons, 64x64, one color.
//  Names: newspaper, coffee, barchart, notebook, pen, gear,
//         beethoven, gummybear, dot
//  To add one (e.g. "mozartkugel"), add an entry returning SVG
//  inner markup drawn in a 64x64 box. Use "currentColor" for the
//  shape and "var(--cut)" for details cut out of it.
// ============================================================

(function () {
  function gearPath(cx, cy, rOuter, rInner, teeth) {
    const pts = [];
    const step = (Math.PI * 2) / (teeth * 4);
    for (let i = 0; i < teeth * 4; i++) {
      const r = (i % 4 === 0 || i % 4 === 1) ? rOuter : rInner;
      const a = i * step - Math.PI / 2;
      pts.push((cx + r * Math.cos(a)).toFixed(2) + "," + (cy + r * Math.sin(a)).toFixed(2));
    }
    return "M" + pts.join(" L") + " Z";
  }

  const C = 'fill="currentColor"';
  const CUT = 'fill="var(--cut, #0a0a0a)"';
  const CUTS = 'stroke="var(--cut, #0a0a0a)"';

  window.POLL_ICONS = {
    dot: `<circle cx="32" cy="32" r="14" ${C}/>`,

    newspaper: `
      <rect x="9" y="11" width="46" height="42" rx="4" ${C}/>
      <rect x="15" y="17" width="34" height="7" rx="1.5" ${CUT}/>
      <rect x="15" y="29" width="15" height="13" rx="1.5" ${CUT}/>
      <rect x="34" y="29" width="15" height="3" rx="1.5" ${CUT}/>
      <rect x="34" y="35" width="15" height="3" rx="1.5" ${CUT}/>
      <rect x="34" y="41" width="10" height="3" rx="1.5" ${CUT}/>
      <rect x="15" y="46" width="34" height="3" rx="1.5" ${CUT}/>`,

    coffee: `
      <path d="M17 18 H47 L43 56 Q42.6 58 40.6 58 H23.4 Q21.4 58 21 56 Z" ${C}/>
      <rect x="14" y="12" width="36" height="7" rx="3" ${C}/>
      <path d="M22 8 H42 L44 12 H20 Z" ${C}/>
      <path d="M19.6 30 H44.4 L43 44 H21 Z" ${CUT}/>
      <path d="M22.6 33 H41.4 L40.4 41 H23.6 Z" ${C}/>`,

    barchart: `
      <rect x="10" y="51" width="44" height="4" rx="2" ${C}/>
      <rect x="13" y="36" width="9" height="13" rx="2" ${C}/>
      <rect x="27.5" y="25" width="9" height="24" rx="2" ${C}/>
      <rect x="42" y="12" width="9" height="37" rx="2" ${C}/>`,

    notebook: `
      <rect x="10" y="12" width="32" height="44" rx="4" ${C}/>
      <g ${CUTS} stroke-width="3" stroke-linecap="round">
        <line x1="16" y1="26" x2="36" y2="26"/>
        <line x1="16" y1="34" x2="36" y2="34"/>
        <line x1="16" y1="42" x2="30" y2="42"/>
      </g>
      <g ${C}>
        <circle cx="17" cy="10" r="3"/><circle cx="26" cy="10" r="3"/><circle cx="35" cy="10" r="3"/>
      </g>
      <g transform="rotate(30 50 34)">
        <rect x="46" y="10" width="8" height="36" rx="1.5" ${C}/>
        <path d="M46 46 L54 46 L50 56 Z" ${C}/>
        <rect x="46" y="16" width="8" height="2.5" ${CUT}/>
      </g>`,

    pen: `
      <path d="M32 6 C40 14 46 24 46 34 L38 50 H26 L18 34 C18 24 24 14 32 6 Z" ${C}/>
      <circle cx="32" cy="30" r="3.4" ${CUT}/>
      <rect x="31" y="32" width="2" height="18" ${CUT}/>
      <rect x="24" y="52" width="16" height="7" rx="2" ${C}/>`,

    gear: `
      <path d="${gearPath(32, 32, 27, 21, 8)}" ${C}/>
      <circle cx="32" cy="32" r="9" ${CUT}/>`,

    // Original stylized portrait: storm of hair, scowl, cravat
    beethoven: `
      <path ${C} d="M32 3 L36 8 L41 4 L42 10 L49 7 L48 13 L56 12 L52 18 L60 21 L53 25 L59 31 L51 32
        L55 39 L47 38 L46 44 L18 44 L17 38 L9 39 L13 32 L5 31 L11 25 L4 21 L12 18 L8 12 L16 13
        L15 7 L22 10 L23 4 L28 8 Z"/>
      <ellipse cx="32" cy="34" rx="12.5" ry="15" ${C} ${CUTS} stroke-width="2.6"/>
      <path d="M22 28.5 L29.5 31.5" ${CUTS} stroke-width="3" stroke-linecap="round"/>
      <path d="M42 28.5 L34.5 31.5" ${CUTS} stroke-width="3" stroke-linecap="round"/>
      <circle cx="27" cy="35" r="1.7" ${CUT}/><circle cx="37" cy="35" r="1.7" ${CUT}/>
      <path d="M27 44.5 Q32 41 37 44.5" ${CUTS} stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path ${C} d="M14 64 C15 55 21 51 26 50 L32 56 L38 50 C43 51 49 55 50 64 Z"/>
      <path d="M26.5 50.5 L32 57 L37.5 50.5" ${CUTS} stroke-width="2.2" fill="none" stroke-linejoin="round"/>
      <g ${CUTS} stroke-width="2.4">
        <ellipse cx="54" cy="15" rx="5" ry="3.8" transform="rotate(-20 54 15)" ${C}/>
        <path d="M58 14 V1 Q61 4 63 8" fill="none" stroke-linecap="round"/>
      </g>
      <ellipse cx="54" cy="15" rx="3.9" ry="2.7" transform="rotate(-20 54 15)" ${C}/>
      <path d="M58 14 V2 Q60.5 4.5 62 7.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,

    gummybear: `
      <g ${C}>
        <circle cx="22" cy="10" r="5.5"/><circle cx="42" cy="10" r="5.5"/>
        <ellipse cx="32" cy="18" rx="12.5" ry="11"/>
        <ellipse cx="32" cy="40" rx="15" ry="16"/>
        <ellipse cx="16" cy="34" rx="5" ry="6.5" transform="rotate(25 16 34)"/>
        <ellipse cx="48" cy="34" rx="5" ry="6.5" transform="rotate(-25 48 34)"/>
        <ellipse cx="21" cy="55" rx="7" ry="6"/>
        <ellipse cx="43" cy="55" rx="7" ry="6"/>
      </g>
      <circle cx="27.5" cy="16.5" r="1.8" ${CUT}/>
      <circle cx="36.5" cy="16.5" r="1.8" ${CUT}/>
      <ellipse cx="32" cy="22" rx="3.2" ry="2.4" ${CUT}/>
      <ellipse cx="27" cy="34" rx="4" ry="6" fill="#ffffff" opacity="0.28"/>`
  };

  window.pollIconSvg = function (name, size, extraStyle) {
    const inner = window.POLL_ICONS[name] || window.POLL_ICONS.dot;
    return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" style="${extraStyle || ""}" aria-hidden="true">${inner}</svg>`;
  };
})();
