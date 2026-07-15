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
        issf_300m: "300 m Carabine",
        biathlon_prone: "Biathlon 50 m — couché (mouche Ø 45 mm)",
        biathlon_standing: "Biathlon 50 m — debout (mouche Ø 115 mm)",
        ipsc: "IPSC Classic (reconstruction)",
        idpa: "IDPA (reconstruction)",
        ft_title: "Field Target — kill zone Ø",
        ft_note: "La kill zone est imprimée à sa taille réelle (échelle 100 %). La difficulté dépend de la distance de tir.",
        crop_note: "centre uniquement (échelle 100 %)",
        tile_hint: "Découpez sur les repères et assemblez",
        actual_size: "Taille réelle — 50 m",
        custom_dist: "Personnalisée…",
        checkers_title: "Damier - 1 MOA à",
        standard_title: "Cible standard (anneaux concentriques)",
        grouping_title: "Cible de groupement",
        cross_title: "Croix de réglage (grille 1 cm)",
        scale_verif: "VÉRIFICATION D'ÉCHELLE :",
        segment_len: "Ce segment doit mesurer exactement 5 cm",
        print_warn: "ATTENTION : IMPRIMEZ À TAILLE RÉELLE (100%)",
        no_fit: "Ne pas utiliser 'Ajuster à la page' dans les paramètres.",
        too_large: "La cible est trop grande pour {n} par page.\nChoisissez moins de cibles par page, une distance réduite ou une cible plus petite.",
        dist_moa: "Distance de tir (cible MOA) :",
        moa_note: "Chaque carreau représente 1 MOA à la distance choisie.",
        dist_reduced: "Distance de tir (cible réduite) :",
        reduced_note: "La cible est mise à l'échelle pour conserver la même difficulté angulaire qu'à la distance officielle.",
        imssu_chicken: "Silhouette IMSSU — Poule",
        imssu_pig: "Silhouette IMSSU — Cochon",
        imssu_turkey: "Silhouette IMSSU — Dindon",
        imssu_ram: "Silhouette IMSSU — Bélier",
        sil_scale_full: "Taille réelle (1:1)",
        sil_scale_half: "1:2 (demi-taille)",
        sil_scale_third: "1:3 (tiers)",
        sil_scale_quarter: "1:4 (quart)",
        sil_scale_custom: "Personnalisé (%)…",
        imssu_scale_1_1: "1/1 — gros calibre (carreau 25,4 mm)",
        imssu_scale_1_2: "1/2 — Field Pistol (12,7 mm)",
        imssu_scale_3_8: "3/8 — pistolet PC (9,52 mm)",
        imssu_scale_1_5: "1/5 — carabine PC (5,08 mm)",
        imssu_scale_1_10: "1/10 — air comprimé (2,54 mm)",
        sil_note_generic: "Contours <strong>reconstruits</strong> à partir des cotes officielles publiées (IPSC ≈ 450 × 590 mm, IDPA ≈ 457 × 762 mm) — fidélité géométrique proche, non garantie au mm. En taille réelle, la cible dépasse l'A4 : utilisez un grand format, la mosaïque, ou une échelle réduite.",
        sil_note_imssu: "Contours <strong>vectorisés depuis les planches officielles IMSSU 2025</strong> (pleine grandeur). L'échelle correspond à la catégorie d'arme ; les échelles réduites (1/5, 1/10) servent à s'entraîner à courte distance. En taille réelle la silhouette dépasse l'A4 : utilisez un grand format ou la mosaïque."
    },
    en: {
        issf_50m: "50m Rifle",
        issf_10m: "10m Air Pistol",
        issf_10m_rifle: "10m Air Rifle",
        issf_25m_precision: "25m Pistol (precision)",
        issf_25m_rapid: "25m Pistol (rapid fire)",
        issf_50m_pistol: "50m Pistol",
        issf_300m: "300m Rifle",
        biathlon_prone: "Biathlon 50m — prone (Ø 45 mm)",
        biathlon_standing: "Biathlon 50m — standing (Ø 115 mm)",
        ipsc: "IPSC Classic (reconstruction)",
        idpa: "IDPA (reconstruction)",
        ft_title: "Field Target — kill zone Ø",
        ft_note: "The kill zone is printed at true size (100% scale). Difficulty comes from the shooting distance.",
        crop_note: "center only (100% scale)",
        tile_hint: "Cut on the marks and assemble",
        actual_size: "Actual Size — 50 m",
        custom_dist: "Custom…",
        checkers_title: "Checkers - 1 MOA at",
        standard_title: "Standard target (concentric rings)",
        grouping_title: "Grouping target",
        cross_title: "Optical sighting cross (1 cm grid)",
        scale_verif: "SCALE VERIFICATION:",
        segment_len: "This segment must measure exactly 5 cm",
        print_warn: "WARNING: PRINT AT ACTUAL SIZE (100%)",
        no_fit: "Do not use 'Fit to page' in print settings.",
        too_large: "The target is too large for {n} per page.\nChoose fewer targets per page, a reduced distance, or a smaller target.",
        dist_moa: "Shooting distance (MOA target):",
        moa_note: "Each square represents 1 MOA at the chosen distance.",
        dist_reduced: "Shooting distance (reduced target):",
        reduced_note: "The target is scaled to maintain the same angular difficulty as at the official distance.",
        imssu_chicken: "IMSSU silhouette — Chicken",
        imssu_pig: "IMSSU silhouette — Pig",
        imssu_turkey: "IMSSU silhouette — Turkey",
        imssu_ram: "IMSSU silhouette — Ram",
        sil_scale_full: "Real size (1:1)",
        sil_scale_half: "1:2 (half-size)",
        sil_scale_third: "1:3 (one-third)",
        sil_scale_quarter: "1:4 (one-quarter)",
        sil_scale_custom: "Custom (%)…",
        imssu_scale_1_1: "1/1 — big bore (25.4 mm square)",
        imssu_scale_1_2: "1/2 — Field Pistol (12.7 mm)",
        imssu_scale_3_8: "3/8 — smallbore pistol (9.52 mm)",
        imssu_scale_1_5: "1/5 — smallbore rifle (5.08 mm)",
        imssu_scale_1_10: "1/10 — air (2.54 mm)",
        sil_note_generic: "Outlines <strong>reconstructed</strong> from official published specifications (IPSC ≈ 450 × 590 mm, IDPA ≈ 457 × 762 mm) — close geometric fidelity, not guaranteed to the mm. At real size, the target exceeds A4: use a large format, tiling, or a reduced scale.",
        sil_note_imssu: "Outlines <strong>vectorized from the official IMSSU 2025 plates</strong> (full scale). The scale matches the firearm category ; reduced scales (1/5, 1/10) are meant for short-distance practice. At real size the silhouette exceeds A4: use a large format or tiling."
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
    // ISSF 300 m Rifle target : zones 1..10, 100 mm steps, black zone = zones 5-10 (Ø 600 mm),
    // inner ten Ø 50 mm. Outer Ø 1000 mm. Same face geometry as the 50 m target, scaled x2.
    issf_300m: {
        titleKey: "issf_300m",
        diams: [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100],
        black: 600,
        innerTen: 50,
        numFont: 18,
        dist: 300,
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

// Scoring contract per ISSF face : decimal ring value (electronic-target style,
// see scoreShot()), `rings` = ring boundary diameters (mm, outer to center),
// `inner_ten` = X-ring visible in the black, `first_ring_value` = score of the
// outermost ring (1 unless the face only carries its upper rings, e.g. rapid fire).
Object.keys(ISSF).forEach(key => {
    const s = ISSF[key];
    s.scoring = { type: 'decimal', rings: s.diams, inner_ten: s.innerTen > 0, first_ring_value: s.firstRingValue || 1 };
});

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

// IBU biathlon targets (50 m) : black aiming disc Ø 115 mm ; knockdown hit zone Ø 45 mm
// (prone) or 115 mm (standing). aim = visible black mark, hit = scoring/knockdown circle.
const BIATHLON = {
    biathlon_prone:    { hit: 45,  aim: 115, scoring: { type: 'zones', rings: null, inner_ten: false, zone_diameter_mm: 45 } },
    biathlon_standing: { hit: 115, aim: 115, scoring: { type: 'zones', rings: null, inner_ten: false, zone_diameter_mm: 115 } }
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

// Generic recreational scoring target : Ø 180 mm, nine concentric rings (20 mm steps), black
// bull over the inner zones (numbers turn white there), and a red central aiming dot. Not an
// official face — fits A4 and works with the multi-target layout.
const STANDARD_RINGS = {
    titleKey: "standard_title",
    diams: [180, 160, 140, 120, 100, 80, 60, 40, 20],
    black: 80 // inner zones drawn black for contrast
};
STANDARD_RINGS.scoring = { type: 'integer', rings: STANDARD_RINGS.diams, inner_ten: false, first_ring_value: 1 };

// Draws the standard rings target centered at (ox, oy).
function drawStandardAt(doc, ox, oy) {
    const diams = STANDARD_RINGS.diams;
    const black = STANDARD_RINGS.black;

    doc.setFillColor(0, 0, 0);
    doc.circle(ox, oy, black / 2, 'F');

    doc.setLineWidth(0.2);
    for (let i = 0; i < diams.length; i++) {
        if (diams[i] <= black) doc.setDrawColor(255, 255, 255);
        else doc.setDrawColor(0, 0, 0);
        doc.circle(ox, oy, diams[i] / 2, 'S');
    }

    drawRingNumbers(doc, ox, oy, diams, black, 9);

    doc.setFillColor(255, 0, 0);
    doc.circle(ox, oy, 1.2, 'F');
}

// Grouping practice mark : two thin red aiming circles with a black crosshair and a small red
// center, ~70 mm overall. Use several per page (4/6/9) to shoot distinct groups on one sheet.
function drawGroupingAt(doc, ox, oy) {
    const r = 30;
    doc.setDrawColor(200, 0, 0);
    doc.setLineWidth(0.6);
    doc.circle(ox, oy, r, 'S');
    doc.circle(ox, oy, r * 0.6, 'S');

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);
    doc.line(ox - r - 5, oy, ox + r + 5, oy);
    doc.line(ox, oy - r - 5, ox, oy + r + 5);

    doc.setFillColor(255, 0, 0);
    doc.circle(ox, oy, 1.5, 'F');
}

// Grouping mark : measures dispersion only, no scoring rings.
const GROUPING_META = { titleKey: "grouping_title", scoring: { type: 'none', rings: null, inner_ten: false } };

// Field Target practice face : light faceplate disc with a central black kill zone drawn at
// true size, plus a red aiming dot. killZone = kill-zone diameter in mm (40mm here is the
// carnet's default configuration ; the printable PDF face lets the kill zone vary).
// Hit/miss only (no ring subdivision) : scoring is a single kill zone.
const FIELD_TARGET_META = { titleKey: "ft_title", scoring: { type: 'zones', rings: null, zones: ['kill'], inner_ten: false, zone_diameter_mm: 40 } };

function drawFieldTargetAt(doc, ox, oy, killZone) {
    const faceR = (killZone + 30) / 2; // 15 mm painted ring around the kill zone

    // Faceplate : light gray disc with a thin outline
    doc.setFillColor(240, 240, 240);
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.4);
    doc.circle(ox, oy, faceR, 'FD');

    // Kill zone : solid black circle at true size
    doc.setFillColor(0, 0, 0);
    doc.circle(ox, oy, killZone / 2, 'F');

    // Central aiming dot
    doc.setFillColor(255, 0, 0);
    doc.circle(ox, oy, 0.8, 'F');
}

// IBU biathlon practice face : black aiming disc with the knockdown hit zone marked by a
// white ring (prone) and a central aiming dot. cfg = { hit, aim } diameters in mm.
function drawBiathlonAt(doc, ox, oy, cfg) {
    // Black aiming disc (Ø 115 mm)
    doc.setFillColor(0, 0, 0);
    doc.circle(ox, oy, cfg.aim / 2, 'F');

    // Hit zone marked by a white ring when smaller than the aiming mark (prone)
    if (cfg.hit < cfg.aim) {
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.4);
        doc.circle(ox, oy, cfg.hit / 2, 'S');
    }

    // Central white aiming dot
    doc.setFillColor(255, 255, 255);
    doc.circle(ox, oy, 0.8, 'F');
}

// Draws a closed polygon from absolute mm points, scaled by s around center (cx, cy).
// pts = array of [x, y] in mm relative to the silhouette center. style = 'S' | 'F' | 'FD'.
function drawPolyAt(doc, cx, cy, s, pts, style) {
    const P = pts.map(p => [cx + p[0] * s, cy + p[1] * s]);
    const rel = P.slice(1).map((p, i) => [p[0] - P[i][0], p[1] - P[i][1]]);
    doc.lines(rel, P[0][0], P[0][1], [1, 1], style, true);
}

// Print-scale option sets for silhouette targets. 'generic' = plain ratios for the
// reconstructed IPSC/IDPA faces ; 'imssu' = the rule-defined IMSSU category scales (the
// square size is fixed by the discipline), which double as reduced practice scales.
// ratio = short label for the page title (e.g. "3/8", where 1:round(1/s) would misread).
const SIL_SCALE_SETS = {
    generic: [
        { v: '1',      key: 'sil_scale_full',    ratio: '1:1' },
        { v: '0.5',    key: 'sil_scale_half',    ratio: '1:2' },
        { v: '0.3333', key: 'sil_scale_third',   ratio: '1:3' },
        { v: '0.25',   key: 'sil_scale_quarter', ratio: '1:4' },
        { v: 'custom', key: 'sil_scale_custom' }
    ],
    imssu: [
        { v: '1',      key: 'imssu_scale_1_1',  ratio: '1/1' },
        { v: '0.5',    key: 'imssu_scale_1_2',  ratio: '1/2' },
        { v: '0.375',  key: 'imssu_scale_3_8',  ratio: '3/8' },
        { v: '0.2',    key: 'imssu_scale_1_5',  ratio: '1/5' },
        { v: '0.1',    key: 'imssu_scale_1_10', ratio: '1/10' },
        { v: 'custom', key: 'sil_scale_custom' }
    ]
};

// Practical-shooting and metallic-silhouette targets. IPSC/IDPA outlines are reconstructed from
// published overall dimensions and scoring-zone sizes ; the four IMSSU animals are vectorized
// from the official rules plates (solid black knock-down silhouettes, no scoring zones).
// Each entry : w/h = full-scale bounding box (mm) ; scaleSet = which print-scale list applies ;
// draw(doc, cx, cy, s) renders at scale s.
const SILHOUETTE = {
    // IPSC Classic ("Metric") cardboard target : ~450 x 590 mm. Zones A (center + head), C, D.
    ipsc: {
        titleKey: "ipsc",
        w: 450, h: 590, scaleSet: 'generic',
        scoring: { type: 'zones', rings: null, zones: ['A', 'C', 'D'], inner_ten: false },
        draw: function (doc, cx, cy, s) {
            // Outline (D boundary), symmetric, y down, center at origin.
            const outline = [
                [-75, -295], [75, -295], [75, -145], [225, -75], [225, 175],
                [150, 295], [-150, 295], [-225, 175], [-225, -75], [-75, -145]
            ];
            doc.setLineWidth(0.5);
            doc.setDrawColor(0, 0, 0);
            drawPolyAt(doc, cx, cy, s, outline, 'S');

            // C/D boundary : an inner silhouette enclosing the C zone (upper torso + head).
            const cZone = [
                [-55, -270], [55, -270], [55, -160], [170, -55], [170, 150],
                [-170, 150], [-170, -55], [-55, -160]
            ];
            doc.setLineWidth(0.4);
            drawPolyAt(doc, cx, cy, s, cZone, 'S');

            // A zone : body rectangle + head rectangle.
            doc.rect(cx - 75 * s, cy - 60 * s, 150 * s, 210 * s, 'S'); // body A
            doc.rect(cx - 45 * s, cy - 255 * s, 90 * s, 95 * s, 'S');  // head A

            // Zone labels.
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(Math.max(5, 14 * s));
            const opt = { align: "center", baseline: "middle" };
            doc.text("A", cx, cy + 45 * s, opt);
            doc.text("C", cx - 130 * s, cy + 60 * s, opt);
            doc.text("D", cx - 190 * s, cy + 60 * s, opt);
        }
    },
    // IDPA cardboard target : ~457 x 762 mm (18 x 30 in). -0 body 8" circle, -0 head 4" circle,
    // -1 zone around the chest, -3 the remainder. Head is a 6" zone.
    idpa: {
        titleKey: "idpa",
        w: 457, h: 762, scaleSet: 'generic',
        scoring: { type: 'zones', rings: null, zones: ['-0', '-1', '-3'], inner_ten: false },
        draw: function (doc, cx, cy, s) {
            // Outline : head (6") + rounded shoulders + body, y down, center at origin.
            const outline = [
                [-60, -381], [-76, -365], [-76, -229], [-228, -150], [-228, 381],
                [228, 381], [228, -150], [76, -229], [76, -365], [60, -381]
            ];
            doc.setLineWidth(0.5);
            doc.setDrawColor(0, 0, 0);
            drawPolyAt(doc, cx, cy, s, outline, 'S');

            // -1 body boundary : rounded rectangle around the chest -0 circle.
            const m = 25.4;
            const one = [
                [-130, -210], [130, -210], [130, 40], [-130, 40]
            ];
            doc.setLineWidth(0.4);
            drawPolyAt(doc, cx, cy, s, one, 'S');

            // -0 body circle (8 in) and -0 head circle (4 in).
            doc.setLineWidth(0.4);
            doc.circle(cx, cy - 80 * s, (8 * m / 2) * s, 'S');   // chest -0
            doc.circle(cx, cy - 305 * s, (4 * m / 2) * s, 'S');  // head -0

            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(Math.max(5, 13 * s));
            const opt = { align: "center", baseline: "middle" };
            doc.text("-0", cx, cy - 80 * s, opt);
            doc.text("-0", cx, cy - 305 * s, opt);
            doc.text("-1", cx, cy - 175 * s, opt);
            doc.text("-3", cx, cy + 250 * s, opt);
        }
    },
    // IMSSU poule silhouette, vectorized from the official 2025 rules plates (full scale,
    // 305 x 254 mm). Solid black knock-down animal ; print scale = IMSSU category.
    imssu_chicken: {
        titleKey: "imssu_chicken", w: 305, h: 254, scaleSet: 'imssu',
        scoring: { type: 'zones', rings: null, zones: ['hit'], inner_ten: false },
        pts: [[111.2, -126.8], [120.3, -125.6], [123.6, -124.3], [126.6, -121.9], [129.3, -121.9], [129, -118.9], [132.4, -115.6], [134.5, -111.3], [142.4, -88], [149, -76.8], [152, -76.5], [152, -71.1], [152.6, -70.2], [152, -67.8], [150.2, -67.8], [146, -65.7], [139.6, -63.8], [126.6, -62.9], [120.6, -61.7], [113.9, -58.7], [111.2, -56.3], [111.2, -54.5], [109.4, -53.9], [107, -49.6], [106, -44.5], [105.1, -44.2], [106, -41.1], [105.7, -11.8], [103.6, -11.5], [103.6, -9.1], [100.3, 1.2], [94.9, 11.8], [94.9, 13.6], [93.3, 13.9], [83.7, 28.7], [83.1, 32.4], [80.6, 33], [79.4, 34.5], [79.4, 36.3], [77.9, 36.3], [71.3, 43], [60.4, 51.7], [59.5, 53.9], [57.6, 53.9], [53.1, 56.9], [52.8, 59], [49.8, 59], [44.3, 62.6], [36.8, 66.3], [14.1, 71.4], [3.5, 72.6], [1.4, 74.1], [0.5, 82.9], [0.2, 126.8], [-56.7, 126.8], [-56.7, 91.1], [-57, 85.9], [-57.9, 82.3], [-58.8, 81.7], [-58.8, 79.9], [-63.7, 71.7], [-67.9, 66.6], [-75.5, 59], [-78.8, 59], [-78.8, 56], [-94.9, 41.8], [-100.6, 37.2], [-102.4, 37.2], [-103.3, 36.3], [-103.3, 34.5], [-110.6, 27.5], [-120.9, 13.9], [-122.4, 13.6], [-122.7, 11.2], [-125.1, 10.6], [-125.1, 7.3], [-129, 0.3], [-132.7, -8.8], [-133.6, -9.1], [-133.6, -11.2], [-141.7, -31.5], [-142.7, -31.8], [-142.7, -33.9], [-145.7, -42.4], [-147.8, -42.7], [-147.8, -49.6], [-152.6, -72.6], [-152.3, -79.3], [-148.7, -82.3], [-145.4, -82.3], [-143, -81.4], [-136.3, -76.5], [-133.9, -76.5], [-133.9, -74.7], [-132.4, -73.2], [-126.9, -69.3], [-124.8, -69.3], [-124.2, -67.5], [-111.2, -59], [-103.9, -55.1], [-100, -54.8], [-100, -52.9], [-98.5, -52], [-86.7, -48.4], [-79.4, -48.4], [-61.3, -52.6], [-61, -54.8], [-52.2, -54.8], [-51.9, -54.2], [-50.1, -54.2], [-49.8, -55.1], [-42.2, -56.3], [-23.4, -56.3], [-13.5, -54.8], [-3.8, -54.8], [-3.5, -52.6], [8.3, -48.7], [17.1, -47.2], [24.1, -47.5], [34.6, -50.5], [36.2, -51.1], [36.5, -52], [38.3, -52], [39.8, -52.9], [39.8, -54.8], [43.7, -54.8], [49.2, -57.5], [53.1, -60.5], [59.8, -67.2], [59.8, -69.9], [61.6, -70.5], [64.3, -74.4], [64.3, -76.5], [65.5, -76.5], [68.2, -80.2], [76.1, -96.2], [76.4, -99.2], [77.6, -99.5], [82.7, -109.5], [82.7, -112.5], [84.6, -112.5], [90, -118.6], [92.1, -119.8], [92.4, -121.9], [95.5, -121.9], [98.8, -124], [104.8, -126.2], [111.2, -126.8]],
        draw: function (doc, cx, cy, s) {
            doc.setFillColor(0, 0, 0);
            drawPolyAt(doc, cx, cy, s, this.pts, 'F');
        }
    },
    // IMSSU cochon silhouette, vectorized from the official 2025 rules plates (full scale,
    // 538 x 325 mm). Solid black knock-down animal ; print scale = IMSSU category.
    imssu_pig: {
        titleKey: "imssu_pig", w: 538, h: 325, scaleSet: 'imssu',
        scoring: { type: 'zones', rings: null, zones: ['hit'], inner_ten: false },
        pts: [[-50.1, -162.3], [-32.8, -161.6], [-3.7, -157.2], [9.2, -157.2], [9.6, -154.5], [24.2, -150.9], [27.7, -150.9], [28.9, -149.8], [50.9, -145], [51.3, -144.3], [98.9, -138.4], [124, -134], [150.7, -133.6], [151.1, -130.9], [171.6, -128.5], [172, -127.7], [189.3, -123], [195.9, -122.2], [196.7, -121.1], [217.2, -112.8], [219.5, -112.8], [219.9, -111.6], [225, -111.6], [225.4, -108.9], [232.1, -105.3], [241.5, -98.3], [243.9, -98.3], [243.9, -96.7], [250.6, -89.2], [252.9, -88.4], [252.9, -86.1], [260, -73.5], [262.4, -66.8], [263.6, -66], [265.9, -53.1], [268.7, -52.7], [268.7, -3.1], [265.9, -2.8], [263.6, 0.8], [263.6, 3.1], [251, 3.1], [243.9, 14.9], [243.9, 20], [241.2, 20.4], [240, 25.2], [238.4, 25.2], [236.8, 26.7], [229.8, 36.2], [219.9, 46], [219.9, 48.3], [217.2, 48.7], [197.9, 64.1], [195.9, 66], [195.9, 67.6], [193.2, 67.6], [192.4, 70.8], [188.1, 70.8], [183.8, 75.9], [181.4, 81.8], [180.6, 92.8], [178.3, 105.3], [172.4, 162.3], [117.3, 161.9], [116.9, 127], [117.7, 115.6], [121.3, 99.4], [121.3, 86.5], [118.1, 77.8], [111, 73.5], [103.6, 72.3], [93.7, 72.3], [75.7, 73.9], [28.9, 75.1], [12.4, 78.2], [10, 80.6], [7.7, 96.7], [7.7, 162.3], [-47, 162.3], [-55.6, 116.7], [-58.8, 88], [-63.5, 77], [-67.4, 73.1], [-69.8, 73.1], [-70.2, 70.8], [-74.1, 70.8], [-74.5, 68], [-84.3, 65.3], [-117.7, 62.1], [-118.5, 61.3], [-153.9, 56.6], [-170.8, 56.6], [-181, 60.1], [-188.1, 64.1], [-188.5, 66], [-191.2, 66], [-193.2, 67.2], [-194.4, 68.4], [-194.4, 70.8], [-197.9, 70.8], [-210.9, 81], [-212.8, 82.9], [-212.8, 84.5], [-215.2, 84.5], [-218.7, 86.9], [-222.3, 86.9], [-235.6, 77.8], [-238, 77.8], [-238, 76.3], [-244.7, 70.8], [-247.8, 70.8], [-247.8, 68.4], [-249, 67.2], [-258.4, 59.7], [-261.2, 59.7], [-261.2, 57.8], [-268.3, 51.5], [-269.1, 47.6], [-266.3, 42.5], [-261.2, 36.6], [-261.2, 33.4], [-258.8, 33.4], [-257.7, 32.2], [-253.7, 27.1], [-253.7, 24.8], [-251, 23.6], [-241.2, 11.4], [-238, 7.1], [-238, 2.8], [-234.9, 2.8], [-233.3, 1.2], [-219.1, -17.3], [-218.4, -20.8], [-216.8, -20.8], [-213.6, -24.4], [-213.2, -28.3], [-210.9, -28.3], [-201.8, -39.7], [-201.5, -42.8], [-199.9, -43.2], [-197.1, -49.1], [-196.7, -56.6], [-197.5, -60.5], [-199.5, -65.3], [-200.7, -65.6], [-201.1, -69.2], [-209.3, -87.7], [-213.2, -88], [-213.2, -95.1], [-220.3, -111.2], [-219.5, -117.5], [-216.4, -121.9], [-213.2, -124.6], [-203, -125], [-195.6, -123], [-190.8, -120.7], [-188.5, -120.7], [-188.1, -119.5], [-171.2, -112], [-163.3, -111.6], [-162.9, -108.9], [-157.8, -108.1], [-155.9, -109.3], [-155.9, -111.6], [-152.7, -111.6], [-143.7, -119.1], [-140.9, -121.9], [-140.9, -123.8], [-138.6, -123.8], [-129.5, -130.9], [-129.1, -133.6], [-125.6, -133.6], [-118.9, -138.4], [-117.7, -140.7], [-115.4, -140.7], [-93.4, -152.5], [-93, -154.1], [-89.4, -154.5], [-89, -157.2], [-81.6, -157.2], [-69.8, -160.8], [-50.1, -162.3]],
        draw: function (doc, cx, cy, s) {
            doc.setFillColor(0, 0, 0);
            drawPolyAt(doc, cx, cy, s, this.pts, 'F');
        }
    },
    // IMSSU dindon silhouette, vectorized from the official 2025 rules plates (full scale,
    // 450 x 538 mm). Solid black knock-down animal ; print scale = IMSSU category.
    imssu_turkey: {
        titleKey: "imssu_turkey", w: 450, h: 538, scaleSet: 'imssu',
        scoring: { type: 'zones', rings: null, zones: ['hit'], inner_ten: false },
        pts: [[-224.9, -269.1], [224.9, -269.1], [224.9, -268.1], [-175.5, -267.6], [-175.5, -265.7], [-170, -261.7], [-151.7, -261.7], [-134.4, -256.8], [-130.5, -256.8], [-129.5, -254.8], [-123.1, -250.8], [-117.6, -245.4], [-117.6, -241.9], [-114.2, -231.6], [-114.2, -209.8], [-117.6, -173.7], [-117.1, -144.1], [-115.7, -137.6], [-110.2, -129.7], [-104.3, -128.3], [-104.3, -125.3], [-101.3, -124.3], [-92.4, -124.8], [-91.9, -128.3], [-51.9, -128.3], [-51.4, -124.8], [-36.1, -123.3], [-11.4, -118.4], [8.9, -111], [11.9, -111], [13.8, -109], [24.2, -105], [35.1, -105], [35.6, -100.1], [55.4, -90.7], [58.3, -90.7], [59.3, -88.7], [72.7, -81.8], [78.1, -81.8], [78.1, -78.8], [80.1, -77.3], [83, -77.3], [83.5, -75.4], [102.3, -64], [105.8, -64], [105.8, -62], [109.7, -59.1], [114.7, -58.6], [115.7, -54.6], [126, -46.2], [129, -46.2], [129, -43.7], [138.4, -34.8], [143.3, -33.9], [143.3, -30.9], [144.8, -29.4], [150.7, -24.5], [153.7, -24.5], [153.7, -22], [166.1, -10.6], [169, -10.6], [169, -7.7], [174, -2.2], [176.9, -2.2], [176.9, 0.7], [186.8, 12.1], [190.3, 12.6], [190.3, 16.1], [196.7, 24], [200.2, 24.5], [200.2, 28.9], [205.1, 35.3], [207.1, 35.3], [207.1, 38.8], [219, 58.1], [220.4, 58.6], [221.4, 63.5], [224.9, 64], [224.9, 85.3], [221.9, 85.3], [219.4, 87.7], [212, 88.7], [185.8, 87.7], [155.7, 94.6], [153.7, 96.6], [150.7, 96.6], [138.9, 102.1], [138.4, 105.5], [132.5, 105.5], [129, 108], [129, 109.5], [126, 109.5], [113.2, 117.4], [106.8, 119.4], [105.8, 120.8], [102.3, 120.8], [88.5, 125.3], [88, 128.8], [78.1, 128.8], [66.2, 132.7], [58.8, 136.2], [58.3, 140.1], [54.9, 140.6], [53.4, 269.1], [-36.6, 269.1], [-36.6, 153], [-40.5, 136.2], [-47.4, 128.8], [-50.9, 128.8], [-50.9, 125.8], [-53.9, 123.8], [-59.8, 122.8], [-60.8, 120.8], [-67.2, 117.9], [-79.1, 113.4], [-83, 113.4], [-84.5, 111.5], [-98.8, 106], [-107.7, 105.5], [-107.7, 101.6], [-117.6, 95.1], [-128, 86.2], [-131, 86.2], [-131, 82.8], [-133.9, 82.3], [-133.9, 79.3], [-149.8, 59.6], [-154.2, 59.1], [-154.2, 51.2], [-161.6, 36.3], [-163.1, 35.8], [-163.1, 32.9], [-172, 12.6], [-175, 1.2], [-175.5, -6.2], [-178.9, -6.7], [-177.9, -45.2], [-179.4, -45.7], [-181.4, -68.5], [-188.3, -80.8], [-190.8, -81.3], [-190.8, -84.3], [-198.2, -95.6], [-201.7, -96.1], [-201.7, -103.1], [-203.1, -104.5], [-203.1, -108.5], [-206.6, -120.8], [-206.6, -140.6], [-202.1, -171.3], [-200.7, -171.8], [-201.7, -189.5], [-198.2, -190], [-197.2, -197.5], [-195.7, -198.4], [-194.2, -203.9], [-194.2, -208.8], [-196.2, -212.8], [-201.7, -214.3], [-202.1, -216.2], [-217, -219.7], [-217.5, -221.2], [-224.9, -220.2], [-224.9, -230.6], [-221.9, -230.6], [-212.5, -240], [-209.1, -241.9], [-208.6, -245.4], [-204.1, -245.4], [-201.7, -247.4], [-201.7, -248.9], [-198.7, -248.9], [-187.8, -255.3], [-183.9, -260.2], [-181.4, -267.6], [-224.9, -268.1], [-224.9, -269.1]],
        draw: function (doc, cx, cy, s) {
            doc.setFillColor(0, 0, 0);
            drawPolyAt(doc, cx, cy, s, this.pts, 'F');
        }
    },
    // IMSSU belier silhouette, vectorized from the official 2025 rules plates (full scale,
    // 767 x 634 mm). Solid black knock-down animal ; print scale = IMSSU category.
    imssu_ram: {
        titleKey: "imssu_ram", w: 767, h: 634, scaleSet: 'imssu',
        scoring: { type: 'zones', rings: null, zones: ['hit'], inner_ten: false },
        pts: [[219.9, -317.2], [242.2, -317.2], [263.3, -313.1], [283.8, -304.3], [287.3, -304.3], [287.9, -302.6], [293.8, -302.6], [295, -297.9], [307.9, -289.7], [311.4, -289.7], [311.4, -287.9], [316.1, -283.2], [320.8, -279.1], [323.1, -279.1], [323.1, -275.6], [330.7, -263.9], [334.8, -263.3], [334.8, -255.7], [336.6, -255.1], [336.6, -250.4], [341.9, -231], [342.5, -222.2], [341.9, -188.2], [335.4, -147.2], [339.5, -136.6], [341.9, -136], [341.9, -131.9], [354.8, -104.4], [358.9, -103.8], [358.9, -92.1], [365.9, -64.5], [367.7, -49.3], [371.2, -40.5], [375.9, -19.4], [377.6, -17], [378.2, -10.6], [382.3, -10], [383.5, 34], [382.3, 48.7], [378.2, 49.3], [377.6, 55.1], [375.9, 55.1], [367.1, 65.1], [358.9, 70.4], [343.6, 71], [334.2, 69.2], [323.7, 55.7], [320.2, 55.1], [320.2, 51], [314.9, 44], [310.8, 43.4], [309.6, 38.1], [302.6, 31.1], [298.5, 31.1], [298.5, 27.6], [294.4, 23.5], [290.3, 20.5], [286.7, 20.5], [285.6, 16.4], [276.2, 10.6], [267.4, 8.2], [266.8, 6.5], [252.7, 6.5], [252.1, 8.2], [243.9, 9.4], [239.8, 12.3], [231, 14.1], [227.5, 17], [218.7, 27.6], [218.7, 31.1], [215.8, 31.7], [215.8, 38.1], [212.3, 38.1], [209.3, 42.2], [205.2, 50.4], [205.2, 55.1], [202.9, 55.7], [192.3, 75.6], [191.7, 83.9], [187.1, 85], [178.8, 99.1], [178.8, 102.6], [175.9, 103.8], [168.9, 114.9], [168.3, 121.4], [164.8, 121.4], [163.6, 126.7], [161.3, 126.7], [146, 143.1], [146, 150.7], [139, 150.7], [123.7, 168.9], [122.6, 183], [118.5, 183.5], [116.7, 206.4], [116.7, 315.5], [55.7, 315.5], [55.7, 197], [54.5, 184.7], [50.4, 184.1], [49.8, 171.2], [30.5, 171.2], [29.9, 173], [27, 173.6], [-49.8, 180], [-103.8, 177.7], [-107.9, 180], [-109.7, 183], [-107.9, 203.5], [-112, 204.6], [-116.7, 204.1], [-127.2, 196.4], [-132.5, 196.4], [-132.5, 192.9], [-134.3, 191.2], [-136.6, 189.4], [-140.1, 189.4], [-140.7, 186.5], [-158.9, 172.4], [-163, 172.4], [-163.6, 167.7], [-165.4, 167.7], [-184.1, 154.2], [-187.6, 154.2], [-188.8, 151.3], [-201.7, 150.7], [-209.9, 154.8], [-211.1, 159.5], [-214.6, 159.5], [-224, 168.9], [-224, 172.4], [-226.9, 172.4], [-234.6, 182.4], [-235.1, 188.2], [-239.8, 189.4], [-242.2, 192.9], [-242.2, 196.4], [-244.5, 196.4], [-247.5, 199.4], [-258.6, 213.4], [-258.6, 219.9], [-263.3, 219.9], [-266.8, 223.4], [-280.3, 240.4], [-280.3, 243.9], [-283.2, 243.9], [-286.7, 249.8], [-290.8, 259.8], [-292.6, 270.3], [-293.8, 317.2], [-339.5, 316.1], [-342.5, 248.6], [-350.7, 221.7], [-346.6, 192.9], [-346.6, 165.4], [-348.3, 151.9], [-350.7, 142.5], [-354.8, 141.9], [-354.8, 128.4], [-357.1, 126.7], [-357.1, 122], [-359.5, 115.5], [-365.3, 103.2], [-367.1, 102.6], [-367.1, 99.1], [-374.1, 83.3], [-378.2, 82.7], [-377, 73.9], [-378.8, 73.3], [-382.3, 58.1], [-383.5, 38.7], [-383.5, 24.6], [-381.2, 7], [-380, 6.5], [-378.8, -0.6], [-377, -1.2], [-378.2, -17], [-372.9, -18.2], [-371.8, -22.9], [-363.6, -36.4], [-363.6, -40.5], [-361.2, -40.5], [-355.4, -48.1], [-354.8, -53.9], [-351.2, -53.9], [-344.8, -61], [-344.8, -64.5], [-341.3, -64.5], [-333.1, -72.7], [-329.6, -74.5], [-329.6, -77.4], [-326.6, -77.4], [-317.8, -84.4], [-317.2, -88.5], [-312, -89.1], [-307.3, -93.2], [-307.3, -96.2], [-303.2, -96.2], [-285, -107.9], [-284.4, -112], [-277.4, -112], [-259.8, -120.2], [-259.2, -122], [-236.9, -127.8], [-235.7, -129.6], [-213.4, -131.9], [-212.9, -136], [-144.3, -136], [-143.7, -131.9], [-116.1, -128.4], [-115.5, -127.2], [-68, -117.9], [-65.1, -116.1], [-44, -113.2], [-5.3, -113.2], [25.8, -115.5], [70.4, -120.8], [73.9, -122.6], [89.1, -124.9], [97.3, -127.8], [97.9, -129.6], [102, -129.6], [106.7, -132.5], [106.7, -134.9], [102, -146], [97.9, -146.6], [97.9, -156.6], [95.6, -159.5], [95.6, -164.8], [88.5, -192.9], [88.5, -209.3], [92.6, -231], [94.4, -231.6], [97.9, -240.4], [97.9, -246.9], [102, -247.5], [104.4, -251.6], [104.4, -255.1], [106.7, -255.1], [122, -272.1], [122, -279.1], [130.2, -279.1], [144.8, -290.3], [145.4, -293.2], [149.5, -293.2], [159.5, -298.5], [160.1, -302.6], [171.8, -303.7], [191.2, -312], [196.4, -312], [212.3, -316.6], [219.9, -317.2]],
        draw: function (doc, cx, cy, s) {
            doc.setFillColor(0, 0, 0);
            drawPolyAt(doc, cx, cy, s, this.pts, 'F');
        }
    }};

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

// Draws an oversize target that does not fit on the chosen sheet, either as a multi-sheet
// mosaic at true scale ('tile') or keeping only the central portion ('crop'). extentW/extentH
// are the target's bounding box (mm). drawOne(ox, oy) renders the full target; anything outside
// the page is clipped by the viewer.
function drawISSFOversize(doc, drawOne, extentW, extentH, page, mode, pageTitle, fileType) {
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
    const cols = Math.ceil(extentW / usableW);
    const rows = Math.ceil(extentH / usableH);
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

    // Prepares the target drawing function and its bounding box (extentW x extentH, mm).
    let extentW, extentH, drawOne, pageTitle = "";
    if (ISSF[targetType]) {
        const spec = ISSF[targetType];
        let scale = 1;
        if (spec.reducible) {
            const d = getSelectedDistanceMeters() || spec.dist;
            scale = d / spec.dist;
        }
        pageTitle = t(spec.titleKey);
        if (scale !== 1) pageTitle += ` — ${Math.round(scale * 100)}% (tir à ${fmtMeters(spec.dist * scale)} m)`;

        extentW = extentH = issfOuterDiameter(spec, scale);
        drawOne = (ox, oy) => drawISSFAt(doc, ox, oy, spec, scale);
    } else if (BIATHLON[targetType]) {
        const cfg = BIATHLON[targetType];
        pageTitle = t(targetType);
        extentW = extentH = cfg.aim;
        drawOne = (ox, oy) => drawBiathlonAt(doc, ox, oy, cfg);
    } else if (SILHOUETTE[targetType]) {
        const sil = SILHOUETTE[targetType];
        const sc = getSelectedScale();
        pageTitle = t(sil.titleKey);
        if (sc !== 1) pageTitle += ` — ${getSelectedScaleRatio() || `1:${Math.round(1 / sc)}`}`;
        extentW = sil.w * sc;
        extentH = sil.h * sc;
        drawOne = (ox, oy) => sil.draw(doc, ox, oy, sc);
    } else if (targetType === 'field_target') {
        const kz = getSelectedKillZone();
        pageTitle = `${t('ft_title')} ${fmtMeters(kz)} mm`;
        extentW = extentH = kz + 30; // faceplate diameter
        drawOne = (ox, oy) => drawFieldTargetAt(doc, ox, oy, kz);
    } else if (targetType === 'standard_rings') {
        pageTitle = t('standard_title');
        extentW = extentH = 180;
        drawOne = (ox, oy) => drawStandardAt(doc, ox, oy);
    } else if (targetType === 'grouping') {
        pageTitle = t('grouping_title');
        extentW = extentH = 70;
        drawOne = (ox, oy) => drawGroupingAt(doc, ox, oy);
    } else { // checkers
        const distance = getSelectedDistanceMeters() || 100;
        const size = distance * 0.2908882;
        const sizeLabel = currentLang === 'fr' ? size.toFixed(1).replace('.', ',') : size.toFixed(1);
        pageTitle = `${t('checkers_title')} ${fmtMeters(distance)} m (${sizeLabel} mm)`;

        extentW = extentH = 2 * distance * 0.2908882;
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

    if (extentW + 2 > cellW || extentH + 2 > cellH) {
        // Target too big for the sheet. Oversize-capable targets (e.g. 25/50/300 m, IPSC/IDPA at
        // full scale) can still be produced at true scale across several sheets, or center-cropped.
        const oversizable = (ISSF[targetType] && ISSF[targetType].oversize) || SILHOUETTE[targetType];
        if (perPage === 1 && oversizable) {
            drawISSFOversize(doc, drawOne, extentW, extentH, page, oversizeMode, pageTitle, targetType);
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

// Selected Field Target kill-zone diameter, in mm (handles the custom option).
function getSelectedKillZone() {
    const sel = document.getElementById('killZone');
    if (!sel) return 40;
    if (sel.value === 'custom') {
        return parseFloat(document.getElementById('killZoneCustom').value) || 40;
    }
    return parseFloat(sel.value) || 40;
}

// Selected print scale for silhouette targets (1 = full size ; handles the custom % option).
function getSelectedScale() {
    const sel = document.getElementById('silhouetteScale');
    if (!sel) return 1;
    if (sel.value === 'custom') {
        const v = parseFloat(document.getElementById('silhouetteScaleCustom').value) || 100;
        return Math.max(0.05, v / 100);
    }
    return parseFloat(sel.value) || 1;
}

// Short ratio label ("3/8", "1:2") of the selected silhouette scale, for the page title —
// 1:round(1/s) would misread fractional IMSSU scales (0.375 → "1:3" instead of "3/8").
function getSelectedScaleRatio() {
    const sel = document.getElementById('silhouetteScale');
    if (!sel) return null;
    const opt = sel.options[sel.selectedIndex];
    return (opt && opt.dataset.ratio) ? opt.dataset.ratio : null;
}

// Fills the print-scale <select> for the current silhouette type from its scale set (generic
// ratios or IMSSU category scales) and sets the explanatory note. Owns #silhouetteScale for
// silhouette targets, preserving a still-valid selection across type/language changes.
function populateSilhouetteScales(type) {
    const sel = document.getElementById('silhouetteScale');
    const sil = SILHOUETTE[type];
    if (!sel || !sil) return;
    const set = SIL_SCALE_SETS[sil.scaleSet] || SIL_SCALE_SETS.generic;
    const prev = sel.value;
    sel.innerHTML = set.map(o =>
        `<option value="${o.v}"${o.ratio ? ` data-ratio="${o.ratio}"` : ''}${o.v === '1' ? ' selected' : ''}>${t(o.key)}</option>`
    ).join('');
    if (set.some(o => o.v === prev)) sel.value = prev; // keep scale on language toggle
    updateSilhouetteScaleCustom();

    const note = document.getElementById('scale-note');
    if (note) note.innerHTML = t(sil.scaleSet === 'imssu' ? 'sil_note_imssu' : 'sil_note_generic');
}

// Displays the custom scale field when the corresponding option is chosen.
function updateSilhouetteScaleCustom() {
    const sel = document.getElementById('silhouetteScale');
    const inp = document.getElementById('silhouetteScaleCustom');
    if (sel && inp) inp.style.display = (sel.value === 'custom') ? 'block' : 'none';
}

// Displays the custom kill-zone field when the corresponding option is chosen.
function updateKillZoneCustom() {
    const sel = document.getElementById('killZone');
    const inp = document.getElementById('killZoneCustom');
    if (sel && inp) inp.style.display = (sel.value === 'custom') ? 'block' : 'none';
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

    // Oversize options matter for big targets that may exceed the sheet (25/50/300 m, silhouettes).
    if (oversizeGroup) {
        const oversizable = (ISSF[type] && ISSF[type].oversize) || SILHOUETTE[type];
        oversizeGroup.style.display = oversizable ? 'block' : 'none';
    }

    // Scale selector only for silhouette targets (IPSC/IDPA reconstructions, IMSSU animals).
    const scaleGroup = document.getElementById('silhouetteScaleGroup');
    if (scaleGroup) {
        scaleGroup.style.display = SILHOUETTE[type] ? 'block' : 'none';
        if (SILHOUETTE[type]) populateSilhouetteScales(type);
    }

    // Kill-zone selector only for Field Target.
    const killZoneGroup = document.getElementById('killZoneGroup');
    if (killZoneGroup) {
        killZoneGroup.style.display = (type === 'field_target') ? 'block' : 'none';
        if (type === 'field_target') updateKillZoneCustom();
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

// Scores a shot from its radial distance to center (mm), given a TargetSpec.scoring
// contract. Generalizes the linear decimal model already used by the ISSF rifle
// sighting simulator (techniques/visee/ISSF_rifle_sighting/simulator.js::computeScore,
// hardcoded there to the 10m air rifle's 2.5mm ring spacing) to any ring-based face by
// deriving its own ring step from `rings` : one point of score per ring-step of radius,
// anchored so the center scores the electronic-target maximum (`first ring value` + rings
// count - 1, plus 0.9). This is a documented approximation, not certified competition
// scoring — real ISSF decimal scoring uses a device-calibrated per-target constant.
// Zone faces with a single circular hit zone (`zone_diameter_mm`, e.g. biathlon, field
// target) score hit(1)/miss(0). Polygon zone faces (IPSC/IDPA) and ungraded faces
// (grouping, MOA/inch grids) have no automatic score : returns null.
function scoreShot(r_mm, scoring) {
    if (!scoring) return null;

    if (scoring.type === 'decimal' || scoring.type === 'integer') {
        const rings = scoring.rings;
        const n = rings.length;
        const ringStep_mm = (rings[0] - rings[n - 1]) / (n - 1) / 2;
        const maxValue = (scoring.first_ring_value || 1) + n - 1;
        const raw = maxValue + 1 - (r_mm / ringStep_mm);
        const capped = Math.max(0, Math.min(maxValue + 0.9, raw));
        return (scoring.type === 'integer') ? Math.floor(capped) : Math.round(capped * 10) / 10;
    }

    if (scoring.type === 'zones' && scoring.zone_diameter_mm) {
        return (r_mm <= scoring.zone_diameter_mm / 2) ? 1 : 0;
    }

    return null;
}

// Flat registry of every drawable target, exposing a TargetSpec-shaped record
// (target_id, scoring contract, default distance, scale reference) so consumers
// such as the carnet de tir can look up a target instead of duplicating its geometry.
function getTargetRegistry() {
    const registry = [];

    Object.keys(ISSF).forEach(key => {
        const s = ISSF[key];
        registry.push({
            target_id: key,
            discipline_id: key,
            titleKey: s.titleKey,
            scoring: s.scoring,
            distance_m_default: s.dist,
            reducible: !!s.reducible,
            diameter_mm: s.diams[0]
        });
    });

    Object.keys(BIATHLON).forEach(key => {
        const s = BIATHLON[key];
        registry.push({
            target_id: key,
            discipline_id: 'biathlon',
            titleKey: null,
            scoring: s.scoring,
            distance_m_default: 50,
            reducible: false,
            diameter_mm: s.aim
        });
    });

    Object.keys(SILHOUETTE).forEach(key => {
        const s = SILHOUETTE[key];
        registry.push({
            target_id: key,
            discipline_id: key,
            titleKey: s.titleKey,
            scoring: s.scoring,
            distance_m_default: null,
            reducible: false,
            diameter_mm: Math.max(s.w, s.h)
        });
    });

    registry.push({
        target_id: 'standard_rings', discipline_id: 'standard_rings',
        titleKey: STANDARD_RINGS.titleKey, scoring: STANDARD_RINGS.scoring,
        distance_m_default: null, reducible: false, diameter_mm: STANDARD_RINGS.diams[0]
    });
    registry.push({
        target_id: 'field_target', discipline_id: 'field_target',
        titleKey: FIELD_TARGET_META.titleKey, scoring: FIELD_TARGET_META.scoring,
        distance_m_default: null, reducible: false, diameter_mm: null
    });
    registry.push({
        target_id: 'grouping', discipline_id: 'grouping',
        titleKey: GROUPING_META.titleKey, scoring: GROUPING_META.scoring,
        distance_m_default: null, reducible: false, diameter_mm: null
    });

    return registry;
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
        drawStandardAt,
        drawGroupingAt,
        drawFieldTargetAt,
        drawBiathlonAt,
        BIATHLON,
        SILHOUETTE,
        SIL_SCALE_SETS,
        STANDARD_RINGS,
        FIELD_TARGET_META,
        GROUPING_META,
        getTargetRegistry,
        scoreShot,
        drawPolyAt,
        getSelectedScale,
        getSelectedKillZone,
        drawCrossFull,
        drawPageHeader,
        generateTarget,
        fmtMeters
    };
} else if (typeof window !== 'undefined') {
    // Classic <script> tags don't put top-level `const`/`let` bindings on `window`
    // (only `var` and function declarations do) — expose the data explicitly so
    // other scripts on the page (e.g. carnet.js) can actually read window.ISSF etc.
    window.I18N = I18N;
    window.ISSF = ISSF;
    window.BIATHLON = BIATHLON;
    window.SILHOUETTE = SILHOUETTE;
    window.STANDARD_RINGS = STANDARD_RINGS;
    window.FIELD_TARGET_META = FIELD_TARGET_META;
    window.GROUPING_META = GROUPING_META;
    window.PAPER = PAPER;
    window.getTargetRegistry = getTargetRegistry;
    window.scoreShot = scoreShot;
}
