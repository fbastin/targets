/**
 * Tireur.org Target Generator Library
 * Generates vector PDF shooting targets (ISSF, MOA, etc.) using jsPDF.
 */

const I18N = {
    fr: {
        issf_50m: "50 m Carabine",
        issf_10m: "10 m Pistolet",
        issf_10m_rifle: "10 m Carabine",
        issf_25m_precision: "25 m Pistolet (précision)",
        issf_25m_rapid: "25 m Pistolet (tir rapide)",
        issf_50m_pistol: "50 m Pistolet",
        crop_note: "centre uniquement (échelle 100 %)",
        tile_hint: "Découpez sur les repères et assemblez",
        actual_size: "Taille réelle — 50 m",
        custom_dist: "Personnalisée…",
        checkers_title: "Damier - 1 MOA à",
        cross_title: "Croix de réglage (grille 1 cm)",
        scale_verif: "VÉRIFICATION D'ÉCHELLE :",
        segment_len: "Ce segment doit mesurer exactement 5 cm",
        print_warn: "ATTENTION : IMPRIMEZ À TAILLE RÉELLE (100%)",
        no_fit: "Ne pas utiliser 'Ajuster à la page' dans les paramètres.",
        too_large: "La cible est trop grande pour {n} par page.\nChoisissez moins de cibles par page, une distance réduite ou une cible plus petite.",
        dist_moa: "Distance de tir (cible MOA) :",
        moa_note: "Chaque carreau représente 1 MOA à la distance choisie.",
        dist_reduced: "Distance de tir (cible réduite) :",
        reduced_note: "La cible est mise à l'échelle pour conserver la même difficulté angulaire qu'à la distance officielle."
    },
    en: {
        issf_50m: "50m Rifle",
        issf_10m: "10m Air Pistol",
        issf_10m_rifle: "10m Air Rifle",
        issf_25m_precision: "25m Pistol (precision)",
        issf_25m_rapid: "25m Pistol (rapid fire)",
        issf_50m_pistol: "50m Pistol",
        crop_note: "center only (100% scale)",
        tile_hint: "Cut on the marks and assemble",
        actual_size: "Actual Size — 50 m",
        custom_dist: "Custom…",
        checkers_title: "Checkers - 1 MOA at",
        cross_title: "Optical sighting cross (1 cm grid)",
        scale_verif: "SCALE VERIFICATION:",
        segment_len: "This segment must measure exactly 5 cm",
        print_warn: "WARNING: PRINT AT ACTUAL SIZE (100%)",
        no_fit: "Do not use 'Fit to page' in print settings.",
        too_large: "The target is too large for {n} per page.\nChoose fewer targets per page, a reduced distance, or a smaller target.",
        dist_moa: "Shooting distance (MOA target):",
        moa_note: "Each square represents 1 MOA at the chosen distance.",
        dist_reduced: "Shooting distance (reduced target):",
        reduced_note: "The target is scaled to maintain the same angular difficulty as at the official distance."
    }
};

let currentLang = 'en';

function setTargetLanguage(lang) {
    if (I18N[lang]) {
        currentLang = lang;
        if (typeof document !== 'undefined') {
            updateDistanceVisibility(); // Refresh UI texts if we are in browser
        }
    }
}

function t(key) {
    return I18N[currentLang][key] || key;
}

// Official ISSF Diameters (mm), from zone 1 (outer) to zone 10 (center).
// dist = official distance (m) ; reducible = available for reduced shooting distances.
const ISSF = {
    issf_50m: {
        titleKey: "issf_50m",
        diams: [154.4, 138.4, 122.4, 106.4, 90.4, 74.4, 58.4, 42.4, 26.4, 10.4],
        black: 112.4, // black zone (zones 4 to 10)
        innerTen: 5.0,
        numFont: 9,
        dist: 50,
        reducible: true
    },
    issf_10m: {
        titleKey: "issf_10m",
        diams: [155.5, 139.5, 123.5, 107.5, 91.5, 75.5, 59.5, 43.5, 27.5, 11.5],
        black: 59.5, // black zone (zones 7 to 10)
        innerTen: 5.0,
        numFont: 9,
        dist: 10,
        reducible: false
    },
    issf_10m_rifle: {
        titleKey: "issf_10m_rifle",
        diams: [45.5, 40.5, 35.5, 30.5, 25.5, 20.5, 15.5, 10.5, 5.5, 0.5],
        black: 30.5,   // black zone (zones 4 to 9)
        innerTen: 0,   // no inner ten visible : zone 10 is already 0.5 mm
        numFont: 5,    // very small target (Ø 45.5 mm) : smaller font
        dist: 10,
        reducible: false
    },
    // ISSF 25 m Precision Pistol target (also Sport/Standard slow fire) : zones 1..10,
    // 50 mm steps, black zone = zones 7-10 (Ø 200 mm), inner ten Ø 25 mm. Outer Ø 500 mm.
    issf_25m_precision: {
        titleKey: "issf_25m_precision",
        diams: [500, 450, 400, 350, 300, 250, 200, 150, 100, 50],
        black: 200,
        innerTen: 25,
        numFont: 11,
        dist: 25,
        reducible: false,
        oversize: true
    },
    // ISSF 25 m Rapid Fire Pistol target : zones 5..10 only, 80 mm steps, fully black
    // (black zone = whole Ø 500 mm), inner ten Ø 50 mm. Numbers 5..9 are white on black.
    issf_25m_rapid: {
        titleKey: "issf_25m_rapid",
        diams: [500, 420, 340, 260, 180, 100],
        black: 500,
        innerTen: 50,
        numFont: 13,
        firstRingValue: 5,
        labelCount: 5,
        dist: 25,
        reducible: false,
        oversize: true
    },
    // ISSF 50 m Pistol target (Free Pistol) : identical face to the 25 m Precision target —
    // zones 1..10, 50 mm steps, black zone = zones 7-10 (Ø 200 mm), inner ten Ø 25 mm, outer Ø 500 mm.
    issf_50m_pistol: {
        titleKey: "issf_50m_pistol",
        diams: [500, 450, 400, 350, 300, 250, 200, 150, 100, 50],
        black: 200,
        innerTen: 25,
        numFont: 11,
        dist: 50,
        reducible: false,
        oversize: true
    }
};

// Paper sizes as [short side, long side] in mm. Orientation is applied by jsPDF.
const PAPER = {
    a4:      [210, 297],
    a3:      [297, 420],
    a2:      [420, 594],
    a1:      [594, 841],
    letter:  [215.9, 279.4],
    tabloid: [279.4, 431.8], // ANSI B / Ledger, 11 x 17 in
    ansid:   [558.8, 863.6]  // ANSI D, 22 x 34 in
};

// Reduced shooting distances for ISSF 50m (1 yard = 0.9144 m).
function getReduced50m() {
    return [
        { v: 50,    label: t("actual_size") },
        { v: 45.72, label: "50 yards (45.7 m)" },
        { v: 25,    label: "25 m" },
        { v: 22.86, label: "25 yards (22.9 m)" },
        { v: 18.29, label: "20 yards (18.3 m)" }
    ];
}

// Distances for MOA target (checkers) : absolute size of the square.
function getMoaDistances() {
    return [
        { v: 25,  label: "25 m" },
        { v: 50,  label: "50 m" },
        { v: 100, label: "100 m", sel: true },
        { v: 200, label: "200 m" },
        { v: 300, label: "300 m" }
    ];
}

// Zone numbers placed on the 4 axes, in the band of each zone.
// firstValue = score of the outermost band (default 1) ; count = how many bands to label.
function drawRingNumbers(doc, cx, cy, diams, blackDiam, fontSize, firstValue, count) {
    const start = firstValue || 1;
    const n = (count != null) ? count : 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(fontSize || 9);
    for (let k = 0; k < n; k++) {
        const value = start + k;
        const rMid = (diams[k] / 2 + diams[k + 1] / 2) / 2; // middle of the ring
        const onBlack = (2 * rMid) <= blackDiam;
        doc.setTextColor(onBlack ? 255 : 0, onBlack ? 255 : 0, onBlack ? 255 : 0);
        const s = String(value);
        const opt = { align: "center", baseline: "middle" };
        doc.text(s, cx - rMid, cy, opt);
        doc.text(s, cx + rMid, cy, opt);
        doc.text(s, cx, cy - rMid, opt);
        doc.text(s, cx, cy + rMid, opt);
    }
    doc.setTextColor(0, 0, 0);
}

// Outer diameter (mm) of an ISSF target at a given scale.
function issfOuterDiameter(spec, scale) {
    return spec.diams[0] * (scale || 1);
}

// Draws an ISSF target centered at (ox, oy).
function drawISSFAt(doc, ox, oy, spec, scale) {
    const s = scale || 1;
    const diams = spec.diams.map(d => d * s);
    const black = spec.black * s;
    const innerTen = spec.innerTen * s;
    const numFont = Math.max(4, Math.min(spec.numFont, spec.numFont * s));

    // Black aiming zone
    doc.setFillColor(0, 0, 0);
    doc.circle(ox, oy, black / 2, 'F');

    // Rings : white on black, black on white
    doc.setLineWidth(0.2);
    for (let i = 0; i < diams.length; i++) {
        if (diams[i] <= black) doc.setDrawColor(255, 255, 255);
        else doc.setDrawColor(0, 0, 0);
        doc.circle(ox, oy, diams[i] / 2, 'S');
    }

    // Inner ten (fine circle, in the black) — center remains black, ISSF compliant
    if (innerTen > 0) {
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.15);
        doc.circle(ox, oy, innerTen / 2, 'S');
    }

    drawRingNumbers(doc, ox, oy, diams, black, numFont, spec.firstRingValue, spec.labelCount);
}

// Draws a checkers target (1 MOA) centered at (ox, oy) for a given distance (m).
function drawCheckersAt(doc, ox, oy, distance) {
    const size = distance * 0.2908882; // 1 MOA ≈ 0.2908882 mm/m

    doc.setFillColor(0, 0, 0);
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.4);
    doc.rect(ox - size, oy - size, size, size, 'F'); // top left
    doc.rect(ox, oy - size, size, size, 'S');         // top right
    doc.rect(ox - size, oy, size, size, 'S');         // bottom left
    doc.rect(ox, oy, size, size, 'F');                // bottom right

    doc.setFillColor(255, 0, 0);
    doc.circle(ox, oy, 1.5, 'F');
}

// Optical sighting cross : fills the whole page (1 per sheet).
function drawCrossFull(doc, width, height) {
    const cx = width / 2, cy = height / 2;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(t('cross_title'), 10, height - 10);

    // Add tireur.org watermark in italic at the bottom right
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("tireur.org", width - 10, height - 10, { align: "right" });

    // Centered 1 cm grid (light gray), drawn first
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    const top = 40, bottom = height - 20, left = 10, right = width - 10;
    for (let x = cx; x <= right; x += 10) doc.line(x, top, x, bottom);
    for (let x = cx - 10; x >= left; x -= 10) doc.line(x, top, x, bottom);
    for (let y = cy; y <= bottom; y += 10) doc.line(left, y, right, y);
    for (let y = cy - 10; y >= top; y -= 10) doc.line(left, y, right, y);

    // Fine precision cross (100 mm) over it
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.4);
    doc.line(cx - 50, cy, cx + 50, cy);
    doc.line(cx, cy - 50, cx, cy + 50);

    // Central aiming point
    doc.setFillColor(255, 0, 0);
    doc.circle(cx, cy, 1.5, 'F');
}

// Calibration rule + printing warning (once per page).
function drawPageHeader(doc, width) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text(t("scale_verif"), 10, 10);
    doc.text(t("segment_len"), 10, 14);

    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.line(10, 16, 60, 16); // main line
    for (let i = 0; i <= 5; i++) {
        const x = 10 + i * 10;
        doc.line(x, 14, x, 18); // tick every cm
    }

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(t("print_warn"), width - 10, 10, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(t("no_fit"), width - 10, 14, { align: "right" });
}

// 5 cm calibration ruler drawn inside an opaque white box (legible over a black target).
function drawScaleRulerBox(doc, x, y) {
    doc.setFillColor(255, 255, 255);
    doc.rect(x - 2, y - 6, 66, 16, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text(t("segment_len"), x, y - 1);
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(x, y + 5, x + 50, y + 5); // main line
    for (let i = 0; i <= 5; i++) {
        const xx = x + i * 10;
        doc.line(xx, y + 3, xx, y + 7); // tick every cm
    }
}

// Corner trim marks + sheet index for a tiled (multi-sheet) page.
function drawTileMarks(doc, width, height, margin, r, c, rows, cols) {
    const x0 = margin, y0 = margin, x1 = width - margin, y1 = height - margin;
    const L = 7;
    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.3);
    doc.line(x0, y0, x0 + L, y0); doc.line(x0, y0, x0, y0 + L);       // top-left
    doc.line(x1 - L, y0, x1, y0); doc.line(x1, y0, x1, y0 + L);       // top-right
    doc.line(x0, y1 - L, x0, y1); doc.line(x0, y1, x0 + L, y1);       // bottom-left
    doc.line(x1 - L, y1, x1, y1); doc.line(x1, y1 - L, x1, y1);       // bottom-right

    const label = `L${r + 1}/${rows} · C${c + 1}/${cols}`;
    doc.setFillColor(255, 255, 255);
    doc.rect(x0, y0, 30, 7, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(label, x0 + 2, y0 + 5);
}

// Draws an oversize ISSF target that does not fit on the chosen sheet, either as a
// multi-sheet mosaic at true scale ('tile') or keeping only the central portion ('crop').
// drawOne(ox, oy) renders the full target; anything outside the page is clipped by the viewer.
function drawISSFOversize(doc, drawOne, extent, page, mode, pageTitle, fileType) {
    const { width, height, fmt, orientation } = page;

    if (mode === 'crop') {
        drawOne(width / 2, height / 2);
        const note = (pageTitle ? pageTitle + " — " : "") + t("crop_note");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setFillColor(255, 255, 255);
        doc.rect(8, height - 16, Math.min(width - 16, doc.getTextWidth(note) + 6), 8, 'F');
        doc.setTextColor(0, 0, 0);
        doc.text(note, 10, height - 10);
        drawScaleRulerBox(doc, 10, 22);
        doc.save(`Target_${fileType}_crop.pdf`);
        return;
    }

    // Tiling : abutting pages with an 8 mm trim margin, target centered over the whole mosaic.
    const margin = 8;
    const usableW = width - 2 * margin;
    const usableH = height - 2 * margin;
    const cols = Math.ceil(extent / usableW);
    const rows = Math.ceil(extent / usableH);
    const totalW = cols * usableW;
    const totalH = rows * usableH;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!(r === 0 && c === 0)) doc.addPage(fmt.slice(), orientation);
            const ox = margin + totalW / 2 - c * usableW;
            const oy = margin + totalH / 2 - r * usableH;
            drawOne(ox, oy);
            drawTileMarks(doc, width, height, margin, r, c, rows, cols);
            if (r === 0 && c === 0) {
                drawScaleRulerBox(doc, 10, 22);
                if (pageTitle) {
                    const hint = pageTitle + " — " + t("tile_hint");
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(9);
                    doc.setFillColor(255, 255, 255);
                    doc.rect(8, height - 16, Math.min(width - 16, doc.getTextWidth(hint) + 6), 8, 'F');
                    doc.setTextColor(0, 0, 0);
                    doc.text(hint, 10, height - 10);
                }
            }
        }
    }
    doc.save(`Target_${fileType}_tiles.pdf`);
}

// Available layouts : number of targets -> [columns, rows].
const LAYOUTS = { 1: [1, 1], 2: [1, 2], 4: [2, 2], 6: [2, 3], 9: [3, 3], 12: [3, 4] };

function generateTarget() {
    const { jsPDF } = window.jspdf;

    const targetType = document.getElementById('targetType').value;
    const paperFormat = document.getElementById('paperFormat').value;
    const paperOrientation = document.getElementById('paperOrientation').value === 'landscape' ? 'landscape' : 'portrait';
    const perPage = parseInt(document.getElementById('layout').value, 10) || 1;
    const oversizeMode = (document.getElementById('oversizeMode') || {}).value || 'tile';

    const fmt = (PAPER[paperFormat] || PAPER.a4).slice();
    const doc = new jsPDF({
        orientation: paperOrientation,
        unit: 'mm',
        format: fmt.slice(),
        putOnlyUsedFonts: true
    });
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    const page = { width, height, fmt, orientation: paperOrientation };

    // Cross always fills the page : 1 per sheet.
    if (targetType === 'cross') {
        drawPageHeader(doc, width);
        drawCrossFull(doc, width, height);
        doc.save(`Target_${targetType}.pdf`);
        return;
    }

    // Prepares the target drawing function and its bounding size (outer diameter).
    let extent, drawOne, pageTitle = "";
    if (ISSF[targetType]) {
        const spec = ISSF[targetType];
        let scale = 1;
        if (spec.reducible) {
            const d = getSelectedDistanceMeters() || spec.dist;
            scale = d / spec.dist;
        }
        pageTitle = t(spec.titleKey);
        if (scale !== 1) pageTitle += ` — ${Math.round(scale * 100)}% (tir à ${fmtMeters(spec.dist * scale)} m)`;
        
        extent = issfOuterDiameter(spec, scale);
        drawOne = (ox, oy) => drawISSFAt(doc, ox, oy, spec, scale);
    } else { // checkers
        const distance = getSelectedDistanceMeters() || 100;
        const size = distance * 0.2908882;
        const sizeLabel = currentLang === 'fr' ? size.toFixed(1).replace('.', ',') : size.toFixed(1);
        pageTitle = `${t('checkers_title')} ${fmtMeters(distance)} m (${sizeLabel} mm)`;
        
        extent = 2 * distance * 0.2908882;
        drawOne = (ox, oy) => drawCheckersAt(doc, ox, oy, distance);
    }

    let [cols, rows] = LAYOUTS[perPage] || [1, 1];
    
    // In landscape mode, we should swap rows and columns to maintain a better aspect ratio
    // for multiple targets per page (e.g. 2 targets should be 2 cols x 1 row, not 1 col x 2 rows).
    if (paperOrientation === 'landscape' && perPage > 1 && cols !== rows) {
        const temp = cols;
        cols = rows;
        rows = temp;
    }

    // Define a "safe zone" to avoid overlapping with header (y < 25) and footer (y > height - 15)
    const minX = 10;
    const maxX = width - 10;
    const minY = 30; // Clear header rule
    const maxY = height - 20; // Clear footer text

    const safeW = maxX - minX;
    const safeH = maxY - minY;

    const cellW = safeW / cols;
    const cellH = safeH / rows;
    const needed = extent + 2; // target diameter + 2mm safe gap

    if (needed > Math.min(cellW, cellH)) {
        // Target too big for the sheet. Oversize ISSF targets (e.g. 25 m, Ø 500 mm) can still
        // be produced at true scale across several sheets, or cropped to their center.
        if (perPage === 1 && ISSF[targetType] && ISSF[targetType].oversize) {
            drawISSFOversize(doc, drawOne, extent, page, oversizeMode, pageTitle, targetType);
            return;
        }
        alert(t("too_large").replace('{n}', perPage));
        return;
    }

    drawPageHeader(doc, width);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            drawOne(minX + cellW * (c + 0.5), minY + cellH * (r + 0.5));
        }
    }

    // Write title once at the bottom left
    if (pageTitle) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(pageTitle, 10, height - 10);
    }

    // Add tireur.org watermark in italic at the bottom right
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("tireur.org", width - 10, height - 10, { align: "right" });

    doc.save(`Target_${targetType}.pdf`);
}

// Formats a distance in meters (French decimal separator, without unnecessary zero).
function fmtMeters(m) {
    let s = (Math.round(m * 10) / 10).toString();
    if (currentLang === 'fr') {
        s = s.replace('.', ',');
    }
    return s;
}

// Selected shooting distance, converted to meters (handles custom option).
function getSelectedDistanceMeters() {
    const sel = document.getElementById('distance');
    if (!sel) return 50;
    if (sel.value === 'custom') {
        const v = parseFloat(document.getElementById('customDistance').value) || 0;
        const factor = parseFloat(document.getElementById('customUnit').value) || 1;
        return v * factor;
    }
    return parseFloat(sel.value) || 0;
}

// Displays the custom distance field when the corresponding option is chosen.
function updateCustomVisibility() {
    const sel = document.getElementById('distance');
    const customGroup = document.getElementById('customGroup');
    if (sel && customGroup) {
        customGroup.style.display = (sel.value === 'custom') ? 'flex' : 'none';
    }
}

// Displays and populates the distance selector according to the target type.
function updateDistanceVisibility() {
    const typeElem = document.getElementById('targetType');
    if (!typeElem) return;
    const type = typeElem.value;
    const group = document.getElementById('distanceGroup');
    const sel = document.getElementById('distance');
    const label = document.getElementById('distanceLabel');
    const note = document.getElementById('distanceNote');
    const layoutGroup = document.getElementById('layoutGroup');
    const oversizeGroup = document.getElementById('oversizeGroup');

    // The cross always fills the page : no multiple layout.
    if (layoutGroup) {
        layoutGroup.style.display = (type === 'cross') ? 'none' : 'block';
    }

    // Oversize options only matter for big targets that may exceed the sheet (e.g. 25 m).
    if (oversizeGroup) {
        oversizeGroup.style.display = (ISSF[type] && ISSF[type].oversize) ? 'block' : 'none';
    }

    let opts = null, labelText = '', noteText = '';
    if (type === 'checkers') {
        opts = getMoaDistances();
        labelText = t("dist_moa");
        noteText = t("moa_note");
    } else if (ISSF[type] && ISSF[type].reducible) {
        opts = getReduced50m();
        labelText = t("dist_reduced");
        noteText = t("reduced_note");
    } else {
        if (group) group.style.display = 'none';
        return;
    }

    if (sel) {
        let html = opts.map(o => `<option value="${o.v}"${o.sel ? ' selected' : ''}>${o.label}</option>`).join('');
        html += `<option value="custom">${t("custom_dist")}</option>`;
        sel.innerHTML = html;
    }
    if (label) label.textContent = labelText;
    if (note) note.textContent = noteText;
    if (group) group.style.display = 'block';
    updateCustomVisibility();
}

// Initialize when the DOM is loaded
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        updateDistanceVisibility();
    });
}

// Export functions and constants for potential use in a module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        I18N,
        setTargetLanguage,
        ISSF,
        PAPER,
        drawISSFOversize,
        getReduced50m,
        getMoaDistances,
        drawRingNumbers,
        issfOuterDiameter,
        drawISSFAt,
        drawCheckersAt,
        drawCrossFull,
        drawPageHeader,
        generateTarget,
        fmtMeters
    };
}
