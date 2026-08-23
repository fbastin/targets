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
        ipsc: "IPSC (annexe B2 du règlement)",
        idpa: "Silhouette type IDPA (entraînement)",
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
        sil_note_ipsc: "Cible <strong>IPSC</strong> (450 × 570 mm), tracée d’après les cotes de l’annexe B2 du règlement IPSC Handgun, édition janvier 2026 : octogone, bords supérieur et inférieur de 150 mm, pleine largeur à 190 mm de chaque extrémité, bordure non comptée de 5 mm. En taille réelle, la cible dépasse l'A4 : utilisez un grand format, la mosaïque, ou une échelle réduite.",
        sil_note_idpa: "⚠️ <strong>Silhouette d'entraînement, pas la cible officielle.</strong> Le règlement IDPA ne publie <strong>aucune dimension</strong> : sa règle 4.12.1 renvoie aux fabricants licenciés, et les cotes qui circulent chez eux ne concordent pas entre elles (18 × 30, 18¼ × 30¾, 18¾ × 30¾ pouces). Ce contour en est une approximation, volontairement non affinée — le dessin officiel est un produit sous licence. <strong>Inutilisable en match</strong>, où seule une cible officielle achetée chez un fabricant licencié est admise. En taille réelle, la cible dépasse l'A4 : utilisez un grand format, la mosaïque, ou une échelle réduite.",
        sil_note_imssu: "Contours <strong>relevés sur les planches du règlement IMSSU 2025</strong>, dont le quadrillage au pouce sert de règle graduée — le règlement ne donne aucune cote chiffrée. Pleine grandeur : poule 314 × 263, cochon 544 × 342, dindon 461 × 562, bélier 791 × 651 mm. L'échelle correspond à la catégorie d'arme ; les échelles réduites (1/5, 1/10) servent à s'entraîner à courte distance. En taille réelle la silhouette dépasse l'A4 : utilisez un grand format ou la mosaïque."
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
        ipsc: "IPSC (rulebook Appendix B2)",
        idpa: "IDPA-type silhouette (practice)",
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
        sil_note_ipsc: "<strong>IPSC</strong> target (450 × 570 mm), drawn from the dimensions of Appendix B2 of the IPSC Handgun rules, January 2026 Edition: an octagon with 150 mm top and bottom edges, full width reached 190 mm from each end, and a 5 mm non-scoring border. At real size the target exceeds A4: use a large format, tiling, or a reduced scale.",
        sil_note_idpa: "⚠️ <strong>A practice silhouette, not the official target.</strong> The IDPA rulebook publishes <strong>no dimensions</strong>: rule 4.12.1 defers to licensed manufacturers, and the figures they quote disagree with one another (18 × 30, 18¼ × 30¾, 18¾ × 30¾ inches). This outline is an approximation, deliberately not refined — the official drawing is a licensed product. <strong>Not usable in a match</strong>, where only an official target from a licensed manufacturer is allowed. At real size the target exceeds A4: use a large format, tiling, or a reduced scale.",
        sil_note_imssu: "Outlines <strong>measured off the IMSSU 2025 rulebook plates</strong>, whose one-inch grid is the only ruler available — the rules state no figures. Full scale: chicken 314 × 263, pig 544 × 342, turkey 461 × 562, ram 791 × 651 mm. The scale matches the firearm category ; reduced scales (1/5, 1/10) are meant for short-distance practice. At real size the silhouette exceeds A4: use a large format or tiling."
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
// Inward offset of a CONVEX polygon, in a y-down frame.
// Shrinking a polygon is not scaling it: a uniform scale moves every edge by a distance
// proportional to its distance from the centroid, which is only right for a circle. Here
// each edge is translated by `d` along its own inward normal and the new vertices are the
// intersections of consecutive offset lines — exact for any convex polygon, which is what
// the 5 mm non-scoring border of the IPSC face needs.
function offsetConvexInward(pts, d) {
    const n = pts.length;
    // ⚠️ The sign of the signed area alone got this backwards: with the vertices listed
    // clockwise on screen (y down) it offset the polygon OUTWARDS, growing the 450 x 570
    // face to 460 x 580. Orient the normal against the CENTROID instead — it cannot be
    // fooled by the winding order, and a self-check would only have caught it after the
    // fact.
    const gx = pts.reduce((a, p) => a + p[0], 0) / n;
    const gy = pts.reduce((a, p) => a + p[1], 0) / n;
    const edges = pts.map((p, i) => {
        const q = pts[(i + 1) % n];
        const dx = q[0] - p[0], dy = q[1] - p[1];
        const L = Math.hypot(dx, dy);
        let nx = dy / L, ny = -dx / L;
        // Point the normal towards the centroid.
        const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
        if ((gx - mx) * nx + (gy - my) * ny < 0) { nx = -nx; ny = -ny; }
        return { px: p[0] + nx * d, py: p[1] + ny * d, dx, dy };
    });
    const out = [];
    for (let i = 0; i < n; i++) {
        const A = edges[(i - 1 + n) % n], B = edges[i];
        const det = A.dx * B.dy - A.dy * B.dx;
        if (Math.abs(det) < 1e-9) { out.push([B.px, B.py]); continue; }
        const t = ((B.px - A.px) * B.dy - (B.py - A.py) * B.dx) / det;
        out.push([A.px + A.dx * t, A.py + A.dy * t]);
    }
    return out;
}

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
    // IPSC target, from the rulebook — NOT a reconstruction.
    // IPSC Handgun Competition Rules, January 2026 Edition, Appendix B2 "IPSC Target".
    // A 450 x 570 mm octagon: top and bottom edges 150 mm wide, full width reached
    // 190 mm from each end (the 19 cm / 38 cm dimensions, symmetric over 57 cm), and a
    // 5 mm non-scoring border around the entire target.
    //
    // Zone geometry read off the same appendix and cross-checked by MEASURING the
    // rendered page — centre and scale pinned on the 45 cm width, then the boundaries
    // sampled row by row. A is 50 mm wide at its top edge 25 mm down, widens to 150 mm
    // at 190 mm, runs parallel to 275 mm, then tapers to a 50 mm bottom edge at 350 mm.
    // C starts at the target's top edge, widens to 300 mm at 190 mm, runs parallel to
    // 335 mm, then tapers to a 100 mm bottom edge at 450 mm.
    //
    // ⚠️ WHAT THIS REPLACED, AND WHY IT MATTERED. Until 2026-08-22 this face was a
    // 450 x 590 mm ten-vertex outline with a narrow top and a wider, asymmetric bottom
    // — closer to the USPSA Metric target than to the IPSC one — and its A zone was two
    // rectangles (body + head). The IPSC target has neither a head nor rectangular
    // zones. Wrong by 20 mm in height and wrong in shape, on a face people print and
    // shoot at. It was labelled "reconstruction", which excuses a millimetre, not a
    // different target.
    ipsc: {
        titleKey: "ipsc", noteKey: "sil_note_ipsc",
        w: 450, h: 570, scaleSet: 'generic',
        scoring: { type: 'zones', rings: null, zones: ['A', 'C', 'D'], inner_ten: false },
        draw: function (doc, cx, cy, s) {
            // y down, centre at origin. The appendix measures from the top-left corner
            // of the 450 x 570 envelope; these are those cotes minus (225, 285).
            const outline = [
                [-75, -285], [75, -285], [225, -95], [225, 95],
                [75, 285], [-75, 285], [-225, 95], [-225, -95]
            ];
            const cZone = [
                [-75, -285], [75, -285], [150, -95], [150, 50],
                [50, 165], [-50, 165], [-150, 50], [-150, -95]
            ];
            const aZone = [
                [-25, -260], [25, -260], [75, -95], [75, -10],
                [25, 65], [-25, 65], [-75, -10], [-75, -95]
            ];

            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.5);
            drawPolyAt(doc, cx, cy, s, outline, 'S');

            // The 5 mm non-scoring border, which the previous face did not draw at all.
            doc.setLineWidth(0.25);
            drawPolyAt(doc, cx, cy, s, offsetConvexInward(outline, 5), 'S');

            doc.setLineWidth(0.4);
            drawPolyAt(doc, cx, cy, s, cZone, 'S');
            drawPolyAt(doc, cx, cy, s, aZone, 'S');

            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(Math.max(5, 14 * s));
            const opt = { align: "center", baseline: "middle" };
            doc.text("A", cx, cy - 50 * s, opt);
            doc.text("C", cx - 110 * s, cy - 20 * s, opt);
            doc.text("D", cx - 185 * s, cy - 20 * s, opt);
            doc.text("C", cx + 110 * s, cy - 20 * s, opt);
            doc.text("D", cx + 185 * s, cy - 20 * s, opt);
        }
    },
    // Silhouette de TYPE IDPA — approximation d'entraînement, pas la cible officielle.
    //
    // ⚠️ NE PAS CHERCHER À L'AFFINER. Le règlement IDPA (édition 2026.2, archivé dans
    // admin-data/reglements/) ne publie AUCUNE dimension de cible : sa règle 4.12.1 dit
    // que les cibles « must be Official IDPA cardboard targets, available from licensed
    // IDPA target manufacturers ». Le dessin est licencié, c'est le produit. Les cotes
    // qui circulent chez les fabricants ne concordent d'ailleurs pas entre elles
    // (18 x 30, 18¼ x 30¾, 18¾ x 30¾ pouces), et les zones -0 sont données tantôt à 6,
    // tantôt à 8 pouces.
    //
    // Viser la fidélité reviendrait donc à fabriquer gratuitement le produit d'un autre,
    // ce que la licence existe précisément pour encadrer. L'approximation est ici la
    // position correcte, pas un pis-aller — à la différence de l'IPSC, dont les cotes
    // sont publiées et où s'en écarter était une faute (cf. le commentaire de `ipsc`).
    // ~457 x 762 mm, -0 poitrine 8", -0 tête 4", -1 autour du torse, -3 le reste.
    idpa: {
        titleKey: "idpa", noteKey: "sil_note_idpa",
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
    // ─── Silhouettes IMSSU ──────────────────────────────────────────────────────
    // Contours relevés le 2026-08-22 sur les planches du règlement IMSSU 2025
    // (`admin-data/reglements/IMSSU-2025.pdf`, pages 14 et 15).
    //
    // LE RÈGLEMENT NE DONNE AUCUNE COTE : « Only targets which correspond to the
    // approved official IMSSU templates may be used ». Les planches ne portent que la
    // taille du cadre quadrillé, en carrés d'un pouce. Le quadrillage EST la règle
    // graduée, et le cadre en donne le compte : 14 x 12, 23 x 15, 19 x 23, 33 x 28.
    //
    // ⚠️ CE QUE REMPLACENT CES CONTOURS. Les précédents donnaient poule 305 x 254,
    // cochon 538 x 325, dindon 450 x 538, bélier 767 x 634 mm — soit 2 à 5 % TROP
    // PETIT sur chaque animal, et « 12 x 10 pouces » exactement pour la poule, trop
    // rond pour avoir été mesuré. Ils avaient été calés sur des valeurs supposées.
    //
    // COMMENT CEUX-CI ONT ÉTÉ OBTENUS, et pourquoi la première tentative a échoué.
    // Le règlement est un « Microsoft: Print To PDF » : les planches sont des BITMAPS,
    // il n'y a aucune coordonnée à extraire. Le tracé vient donc du pixel :
    //   1. seuillage du noir ;
    //   2. FERMETURE morphologique — le quadrillage est tracé EN BLANC PAR-DESSUS
    //      l'animal, qui arrive découpé en cellules d'un pouce ; sans cette étape, « la
    //      plus grande composante connexe » rend une seule case, ce qu'elle a fait ;
    //   3. OUVERTURE, qui efface le cadre et les traits de grille noirs extérieurs.
    //      L'érosion SEULE, essayée d'abord, rétrécissait aussi l'animal et a produit
    //      des mesures fausses de 10 % ; c'est la dilatation qui lui rend sa taille ;
    //   4. contour de la plus grande composante, LISSÉ par une moyenne glissante
    //      cyclique de 9 px, puis simplifié à ~200 sommets. Le lissage n'est pas
    //      cosmétique : le contour brut suit l'escalier de pixels du bitmap, et sans
    //      lui il faut choisir entre une silhouette crénelée (simplification fine) et
    //      une silhouette à facettes (simplification grossière) — les deux ont été
    //      essayées et rendues avant d'en arriver là.
    //
    // CONTRÔLES. Les cotes ne bougent que de 0,03 po quand le rayon de l'élément
    // structurant passe de 3 à 7 px : la morphologie ne biaise pas le relevé. Et les
    // quatre cibles, générées puis mesurées sur le PDF à l'échelle 1:5, tombent à
    // moins de 0,5 % de leur cote déclarée — le reste étant la demi-pixel de mesure.
    //
    // L'ŒIL DU BÉLIER EST UN TROU, pas un décor : sur l'acier, la boucle de corne
    // laisse un jour de 72 x 63 mm. La planche le montre en blanc à l'intérieur de la
    // corne, et `find_contours` le rend comme un SECOND contour, intérieur — c'est
    // d'ailleurs le seul des quatre animaux à en avoir un. Il est tracé en blanc
    // par-dessus la silhouette : sur une cible imprimée, le papier joue le jour.
    // IMSSU poule : contour RELEVÉ sur la planche du règlement 2025 (page 14-15),
    // 12.37 x 10.36 po = 314 x 263 mm hors tout, cadre de 14 x 12 po. Animal noir abattable.
    imssu_chicken: {
        titleKey: "imssu_chicken", w: 314, h: 263, scaleSet: 'imssu',
        scoring: { type: 'zones', rings: null, zones: ['hit'], inner_ten: false },
        pts: [[-0.5, 131.5], [-55.5, 131.6], [-57, 131.3], [-57.9, 130.7], [-58.2, 129.9], [-58, 110.3], [-58.5, 107.5], [-58, 104.3], [-58.3, 90.4], [-59.2, 86.1], [-60.4, 84.3], [-60.7, 82], [-65.1, 74.6], [-70.3, 68.4], [-76.5, 62], [-77.5, 61.5], [-80.1, 61.1], [-80.7, 60.5], [-80.9, 58.3], [-81.6, 57.2], [-96.4, 44.1], [-102.1, 39.7], [-104.4, 39.2], [-106.4, 37.7], [-107.7, 34.4], [-114.1, 27.6], [-123.5, 15.1], [-124.9, 14.4], [-127.4, 14.2], [-128.1, 13.4], [-128.4, 7.6], [-131.4, 1.9], [-135.7, -8.2], [-137.4, -9.8], [-137.7, -12.8], [-143.2, -26.9], [-145.2, -31.8], [-146.9, -33.3], [-146.8, -35.9], [-147.9, -39.3], [-148.7, -40.3], [-150.6, -40.8], [-151.5, -41.7], [-151.8, -51.6], [-153.5, -56.8], [-153.4, -59.4], [-155.4, -68.2], [-156.9, -78.7], [-155.8, -82.7], [-154.3, -84.3], [-151.4, -85.8], [-149.8, -85.6], [-145.9, -84.1], [-139.8, -80.1], [-137.1, -79.2], [-135.5, -76], [-130.8, -72.8], [-128.4, -72.3], [-126.5, -69.7], [-114.1, -61.4], [-107.3, -58], [-104.9, -58], [-100.8, -56.7], [-100.1, -56], [-99.8, -54.2], [-99, -53.4], [-90.8, -50.9], [-83.5, -50.4], [-80.1, -51.4], [-77.7, -51.2], [-75.3, -51.8], [-69.2, -53.4], [-68.5, -54.2], [-68, -56.1], [-66.7, -56.9], [-60, -57.1], [-57, -57.6], [-52.2, -56.7], [-45, -58.2], [-35.8, -58.6], [-32.8, -59.1], [-30.1, -58.6], [-20.6, -58.2], [-12.8, -57.1], [-9.6, -57.6], [-6.8, -57.1], [-1.6, -56.9], [-0.3, -56.1], [0.2, -54.2], [0.9, -53.4], [8.8, -50.9], [11.8, -50.2], [14.2, -50.4], [18.8, -49.2], [25.2, -49.6], [32.2, -51.4], [36.5, -53], [37.4, -53.9], [37.4, -56.4], [38.2, -57.3], [44.9, -57.2], [48.8, -58.7], [53.2, -61.5], [60.1, -68.4], [61.1, -70.3], [61.4, -73.7], [64.7, -75.2], [65.7, -76.8], [66.2, -79.1], [68.5, -80.7], [70.4, -83.6], [78, -99.2], [78.6, -102.7], [80.9, -105.3], [84.5, -112.8], [85.5, -116.9], [86.2, -117.7], [88.7, -118.5], [92.9, -123], [94.4, -126.3], [98.4, -127.1], [102.4, -129], [108.8, -131.3], [115.7, -131.6], [124.6, -130], [127.9, -128.7], [130.4, -127.1], [132.2, -126.7], [132.9, -126], [133.3, -123.7], [136.3, -120.1], [138.2, -116.2], [141.9, -105.2], [143.6, -102.8], [143.7, -99.8], [147, -90.8], [153.1, -80.6], [155.4, -79.6], [156.2, -78.9], [157, -72.5], [156.8, -70.8], [155.8, -69.9], [153.3, -69.7], [149.1, -67.7], [144.5, -66.3], [135, -65.4], [132.9, -64.8], [129.4, -64.9], [122.6, -63.4], [116.9, -60.4], [115.5, -57], [112.9, -55.7], [112, -54.5], [110, -50.5], [108.9, -45], [109.4, -36.1], [109.9, -33.3], [109, -25.5], [109, -12.8], [109.6, -9.8], [109.3, -8.1], [108.2, -5.9], [106.2, -5.4], [105.5, -4.7], [103, 1.9], [98.7, 11.1], [98.3, 13.4], [95.8, 15.4], [86.5, 29.8], [85.8, 32.5], [85.8, 36.8], [85.2, 37.6], [80.1, 38.2], [69.2, 48.6], [62.6, 53.7], [61.1, 56.1], [58.8, 56.8], [56.9, 57.9], [55.4, 60.8], [51.4, 61.6], [46.1, 65], [39.4, 67.9], [37.9, 69.4], [35.1, 69.3], [28.4, 71.3], [16.9, 73.5], [14.4, 74.6], [12.1, 74.4], [4, 75.6], [2.3, 76.6], [1.7, 78.9], [1.4, 82.5], [1.7, 84.3], [1, 87.7], [1, 104.3], [1.5, 107], [1, 110.3], [1.2, 129.9], [0.9, 130.7], [-0.3, 131.5], [-0.5, 131.5]],
        draw: function (doc, cx, cy, s) {
            doc.setFillColor(0, 0, 0);
            drawPolyAt(doc, cx, cy, s, this.pts, 'F');
        }
    },
    // IMSSU cochon : contour RELEVÉ sur la planche du règlement 2025 (page 14-15),
    // 21.42 x 13.46 po = 544 x 342 mm hors tout, cadre de 23 x 15 po. Animal noir abattable.
    imssu_pig: {
        titleKey: "imssu_pig", w: 544, h: 342, scaleSet: 'imssu',
        scoring: { type: 'zones', rings: null, zones: ['hit'], inner_ten: false },
        pts: [[172.9, 170.8], [122.9, 170.9], [118.5, 169.3], [117.3, 145.3], [118.7, 126.2], [118.2, 122.6], [122, 105.5], [121.6, 97.2], [122.2, 92.3], [121.1, 87], [118.7, 82.1], [116, 79.6], [109.6, 77.3], [95.8, 76.6], [76, 78.8], [65.9, 78.2], [54.9, 78.6], [50.8, 79.6], [31.3, 79.4], [27.2, 80.7], [23.9, 80.3], [16.2, 81.8], [11.6, 83.5], [9.7, 88.1], [9.2, 97.4], [7.9, 103.3], [8.6, 121.7], [7.9, 126.2], [8.3, 168.9], [7.3, 170.5], [4.9, 170.9], [-45.4, 170.9], [-48.6, 169.7], [-48.6, 165.2], [-57.2, 121.9], [-57.4, 111.1], [-58.5, 101.6], [-59.9, 97], [-59.7, 93.8], [-61.8, 86.7], [-65.9, 79.8], [-69.9, 78.3], [-72.2, 75], [-78.8, 74.1], [-81.5, 69.9], [-86.7, 68.8], [-94, 69], [-115.1, 65.6], [-118.4, 66], [-122.7, 64.5], [-138.3, 62.3], [-142, 62.8], [-146.2, 61.3], [-156.7, 59.8], [-171.6, 59.8], [-179.4, 62], [-189, 67], [-191, 74.3], [-199.3, 74.8], [-200.9, 75.5], [-213.8, 86.2], [-216.7, 90.1], [-221.7, 91.5], [-225.1, 91.3], [-236.2, 84], [-240.1, 82.8], [-242.2, 79.2], [-246.3, 75.7], [-251.3, 74], [-253.4, 69.7], [-259.8, 64.5], [-263.5, 63.4], [-265.3, 59.9], [-270.7, 54.9], [-271.8, 50.8], [-269.5, 45.5], [-264.7, 39], [-263.6, 34.5], [-259.4, 32.4], [-257.2, 27.3], [-253.9, 25], [-242.5, 9.8], [-241.2, 7.1], [-241.2, 3], [-236.3, 1.6], [-231.5, -4.4], [-222.8, -16.7], [-221.4, -20.9], [-217, -24.5], [-215.3, -30.4], [-211, -32.5], [-205.5, -39.9], [-204.3, -43.9], [-202, -46.1], [-199.7, -50.6], [-198.9, -55.9], [-199.5, -61.8], [-201.4, -66.8], [-203.6, -69], [-204, -72.8], [-206.5, -79.9], [-211.2, -90.1], [-215.2, -90.9], [-216.3, -92.2], [-216.2, -100], [-223.1, -116.6], [-220.6, -125], [-215.2, -130.8], [-209, -131.3], [-191.2, -126.9], [-188.4, -124.5], [-172.2, -117.2], [-154.9, -117.2], [-144.5, -125.6], [-142, -129.9], [-138.7, -131], [-133.7, -135.2], [-131.7, -139.7], [-125.8, -141.2], [-120.4, -145.1], [-118.1, -148], [-114.7, -148.9], [-96.7, -158.9], [-94.9, -160.6], [-94.3, -163.7], [-93.3, -164.8], [-82.9, -164.9], [-70, -169], [-45.8, -170.6], [-24.7, -167.9], [-21.2, -168.2], [-18.1, -167], [-2.5, -164.8], [3.3, -165.5], [13.8, -164.6], [15.6, -163.6], [16.2, -161.3], [17.4, -160.2], [27.1, -158.4], [47.7, -152.5], [51, -152.6], [54.7, -151.1], [61.9, -150], [75.9, -149], [80.3, -147.6], [95.9, -145.3], [99.2, -145.6], [103.4, -144.2], [119.2, -141.8], [124.3, -142], [130.3, -140.3], [145.3, -140.3], [149.5, -141], [164.8, -140.1], [166.5, -139.1], [167.1, -136.4], [168.4, -135.3], [172.6, -135.1], [193.9, -128.3], [197.6, -128.4], [200, -126.5], [217.2, -119.4], [221.3, -119.1], [223.8, -117.3], [229.6, -116.4], [231.5, -112.2], [241.8, -104.9], [245.8, -103.4], [247.5, -100.3], [253.1, -93.8], [256.1, -91.7], [256.8, -88.7], [266.9, -68.6], [267, -65.3], [271.4, -62.6], [272.1, -31], [271.4, 2.2], [269.7, 4], [255.7, 3.9], [252.5, 5], [246.9, 15.5], [246.3, 26], [239.7, 28], [231.6, 39.2], [224.7, 46.4], [224, 50.6], [222.6, 52.4], [216.7, 54], [199.3, 68.2], [197.4, 74.3], [190.2, 75], [186.6, 78.7], [183.7, 85.9], [183.3, 96.7], [181.8, 99.9], [180.1, 112.3], [179.8, 121.9], [177.7, 135.2], [175, 168.9], [173.2, 170.7], [172.9, 170.8]],
        draw: function (doc, cx, cy, s) {
            doc.setFillColor(0, 0, 0);
            drawPolyAt(doc, cx, cy, s, this.pts, 'F');
        }
    },
    // IMSSU dindon : contour RELEVÉ sur la planche du règlement 2025 (page 14-15),
    // 18.15 x 22.11 po = 461 x 562 mm hors tout, cadre de 19 x 23 po. Animal noir abattable.
    imssu_turkey: {
        titleKey: "imssu_turkey", w: 461, h: 562, scaleSet: 'imssu',
        scoring: { type: 'zones', rings: null, zones: ['hit'], inner_ten: false },
        pts: [[57.4, 280.7], [-33.1, 280.8], [-37.4, 279.2], [-38.6, 256.4], [-37.6, 250.4], [-38.6, 232.7], [-37.6, 226.8], [-38.6, 208.6], [-37.6, 202.6], [-38.6, 184.4], [-37.6, 178.4], [-37.6, 164.2], [-39.4, 157.9], [-39, 151.3], [-43.1, 139.6], [-49.1, 134.7], [-59.9, 134.2], [-61.2, 132.8], [-61.6, 128.2], [-62.8, 126.3], [-72.4, 121.8], [-79.8, 118.9], [-84.6, 118.8], [-88, 116.3], [-102.7, 110.4], [-112.3, 110.4], [-114.6, 103.3], [-127.6, 93], [-133.1, 91], [-135.1, 87.5], [-139, 84.9], [-140.5, 79.3], [-149.9, 67], [-152.9, 64.6], [-156.9, 64.5], [-158.3, 63.4], [-158.5, 52.7], [-164.3, 40.5], [-168.2, 36.2], [-168.7, 31.8], [-174.8, 15.5], [-176.9, 14], [-181.8, 14.6], [-183.7, 13.2], [-183.9, -34], [-182.2, -42.8], [-185.6, -61.2], [-185.3, -67.7], [-189.4, -78.8], [-192.5, -83.4], [-196.5, -85.9], [-197.3, -90.6], [-199.3, -94], [-205.8, -98.3], [-206.3, -106.7], [-208.5, -110.1], [-208.5, -114.3], [-212.7, -133], [-210.5, -153], [-210.9, -157.9], [-208.9, -164.6], [-207.1, -176.5], [-207.6, -181.5], [-205.9, -187.3], [-206.6, -204], [-205.3, -205.9], [-201.8, -206.8], [-200.5, -208.1], [-199.1, -217.2], [-200.8, -221.4], [-205.5, -222.7], [-208.9, -225.8], [-223.7, -229.9], [-228.6, -229.8], [-230, -231.2], [-230.6, -234.4], [-229.8, -241.3], [-224.1, -243.8], [-218, -250.1], [-215.5, -255.3], [-208.9, -256.3], [-205, -260.5], [-200.3, -261.7], [-191.4, -267.4], [-185.1, -280.3], [-179.3, -280.3], [-177.9, -278.9], [-177.1, -275.3], [-174.1, -273.5], [-157.5, -273.9], [-138.5, -268.7], [-134.1, -268.7], [-131.6, -265.8], [-124.9, -261.1], [-120.6, -255.6], [-116.9, -241.9], [-115.7, -230.5], [-117.7, -211.4], [-117, -206.1], [-119.8, -193.2], [-119.1, -182.4], [-120.4, -176.8], [-120.4, -163.6], [-119.1, -157.5], [-119.6, -150.2], [-118.2, -144.4], [-115.6, -139.4], [-110.6, -137.9], [-107.7, -134.8], [-104.5, -134.2], [-90.6, -134.2], [-85.1, -135.2], [-79.3, -134.2], [-35.5, -135], [-33.3, -133.4], [-32.7, -129], [-31.4, -127.7], [-17.7, -124.7], [-12.1, -124.9], [-5.5, -121.2], [7.2, -117.3], [11.6, -117.2], [14.5, -114.1], [25.1, -110.2], [36.4, -110.8], [38.1, -109.3], [38.1, -105.2], [39.2, -103.7], [54.7, -96], [59.4, -95.7], [61.9, -92.9], [73.5, -86.1], [84.6, -86.4], [85.9, -85.1], [85.8, -80.4], [86.9, -78.4], [102.4, -68.9], [107.2, -68.3], [111.7, -62.5], [118.8, -60.4], [121.5, -54.9], [126.2, -51.5], [130.6, -50.5], [133.9, -44], [141.9, -36.8], [147.8, -34.6], [150.7, -28.8], [155.9, -26.9], [159.3, -21.1], [168.8, -12.7], [173.6, -10.5], [175.4, -5.7], [180.3, -3.1], [182.5, 1.9], [190.5, 11.2], [196.5, 14.5], [199, 21.3], [204.5, 23.9], [206.6, 32.1], [208.7, 35], [212.9, 37.8], [215.3, 44.7], [224, 58.9], [230, 62.1], [230.6, 86.2], [230, 89.5], [228.6, 90.8], [206, 93.2], [201.1, 91.6], [192.2, 91.4], [164.8, 97.6], [159.3, 99.6], [156.7, 101.8], [152.3, 101.9], [149.4, 103.2], [145.9, 109.5], [135.2, 110.7], [130.8, 115.5], [122.9, 117.9], [107.8, 127], [103.2, 126.9], [99.2, 128.2], [95.9, 133.7], [86.1, 135], [79.7, 134.1], [61.6, 142], [60.2, 146.6], [61.1, 158.2], [60.2, 164.2], [60.2, 178.4], [61.1, 184], [60.2, 190], [61.1, 208.2], [60.2, 214.1], [61.1, 232.3], [60.2, 250.4], [61.1, 256.4], [60.2, 261.9], [60.3, 278.2], [57.8, 280.6], [57.4, 280.7]],
        draw: function (doc, cx, cy, s) {
            doc.setFillColor(0, 0, 0);
            drawPolyAt(doc, cx, cy, s, this.pts, 'F');
        }
    },
    // IMSSU bélier : contour RELEVÉ sur la planche du règlement 2025 (page 14-15),
    // 31.16 x 25.62 po = 791 x 651 mm hors tout, cadre de 33 x 28 po. Animal noir abattable.
    imssu_ram: {
        titleKey: "imssu_ram", w: 791, h: 651, scaleSet: 'imssu',
        scoring: { type: 'zones', rings: null, zones: ['hit'], inner_ten: false },
        pts: [[-304.7, 325.2], [-345.3, 324], [-350.2, 321.4], [-353.2, 274.6], [-352, 263.8], [-354.5, 245.5], [-357.8, 235.8], [-363.9, 232.3], [-366, 225.5], [-365, 202.5], [-358.4, 199.5], [-356.8, 196.7], [-357.4, 165.3], [-359.1, 162.5], [-364.1, 160.5], [-365.8, 156.4], [-364.8, 133.4], [-368.9, 121.9], [-374.8, 108.7], [-378.3, 105.1], [-381.2, 95.3], [-388.8, 90.6], [-389.8, 75.1], [-394.6, 57], [-395.5, 31.9], [-393.1, 8.7], [-388.9, -2.8], [-389.9, -19.1], [-387.6, -22], [-381.5, -24.1], [-375.2, -34.4], [-374.2, -39.9], [-366.7, -47.1], [-364.2, -55.4], [-358.1, -58.9], [-355.9, -64.4], [-349.5, -66.9], [-338.7, -79.2], [-332.5, -81.9], [-329, -89.3], [-321.2, -91.1], [-314.6, -98.6], [-298.3, -106.6], [-294.7, -114.5], [-283.5, -114.9], [-265.7, -125.2], [-244.6, -130.4], [-242.2, -137], [-239.8, -138.8], [-121.6, -138.8], [-119.1, -137], [-118.6, -131.8], [-116.3, -129.5], [-101.7, -126.3], [-94.8, -126.6], [-63.1, -118], [-46.5, -117.1], [-39.2, -115], [17.3, -117], [70.1, -123.2], [93.7, -127.8], [100.5, -132.4], [101.1, -156.1], [92.6, -186.5], [90.5, -210.8], [95.4, -235.2], [100.7, -245.7], [100.5, -259.4], [111.8, -262.1], [124.5, -276.3], [127.4, -284.9], [135.2, -286.1], [150.7, -299.3], [158.2, -301.5], [161.4, -307.8], [179.7, -311.3], [198.2, -318.5], [222.4, -324.3], [247.4, -324.9], [264.2, -320.6], [270.8, -320.8], [290.7, -312], [295.5, -312], [305.5, -308.1], [309.1, -301.5], [320, -296.4], [324.8, -290.3], [334.4, -283.9], [336.6, -277.2], [344.9, -272.7], [353.5, -234.9], [354.5, -211], [352.7, -203.3], [352.9, -187], [346.6, -149.5], [349.8, -141.2], [353.3, -137.6], [354.1, -132.1], [363.2, -112.4], [370.1, -107.8], [370.9, -93.9], [373.2, -88.8], [373, -83.3], [378.5, -64.5], [380, -49.4], [384.2, -39.8], [385.2, -29.7], [387, -24.5], [392.5, -22.3], [394.1, -19.5], [395.7, 33.1], [393.9, 55.6], [386.1, 59.3], [379.9, 66.6], [369.7, 73.5], [346.3, 72.6], [334.6, 59.4], [329.7, 56.6], [327.5, 49.8], [321.5, 46.9], [318, 38.3], [312.3, 33.7], [306.4, 31.9], [303.4, 25.4], [297.4, 23.6], [293.8, 17.7], [284.8, 12], [263.4, 7.6], [251.8, 10.7], [247.1, 14.9], [240.2, 15.2], [232, 21], [228.3, 26.3], [227.3, 31.6], [223.7, 35.1], [222.1, 43.7], [216.6, 45.8], [213.7, 49.4], [212.1, 56.7], [208.5, 60.2], [200.7, 75.4], [200.6, 80.5], [197.3, 88.5], [190.8, 92.3], [186.4, 104.5], [178.4, 112.4], [174.6, 120.2], [174, 129.1], [165.4, 132], [152, 146.8], [151.5, 154.6], [142.2, 156.8], [130, 171.4], [130, 176.1], [126.8, 183.5], [127.9, 298.8], [125.5, 322.5], [57.8, 323.4], [52.4, 321.2], [51.2, 298.8], [52.3, 182.3], [50, 176.9], [36.6, 176.2], [27.3, 179.6], [-45.6, 185.6], [-69.2, 186], [-79.6, 183.9], [-106.2, 182.9], [-111.7, 188.9], [-109.2, 202.1], [-110.7, 207.7], [-117.8, 210.2], [-130.8, 202.2], [-143.5, 202.1], [-145.7, 190.9], [-162.6, 178.4], [-169.8, 177.8], [-172.6, 169.8], [-183.9, 161.9], [-191, 160], [-194.5, 155.8], [-205.4, 155], [-213.9, 158.9], [-218.5, 166.4], [-226.4, 170], [-228.9, 176.4], [-234.3, 179.4], [-240.7, 187.6], [-241.9, 200.5], [-252.8, 203.6], [-263.9, 217.6], [-265, 226.6], [-273.4, 229.1], [-284.8, 242.7], [-287.1, 249.3], [-292.4, 253], [-298.9, 268.8], [-302, 309.7], [-301.2, 322.3], [-304.2, 325.1], [-304.7, 325.2]],
        eye: [[193.1, -146], [195.5, -147.1], [197, -148.8], [198.4, -150], [199.3, -150.3], [202.6, -150.5], [203.4, -150.8], [205.4, -151.9], [207.9, -153.9], [209.6, -155.5], [210.6, -157], [211.4, -160.8], [211.8, -161.6], [213.1, -162.8], [216.9, -164.1], [218.9, -165.4], [219.8, -166.3], [220.9, -167.9], [222.4, -172], [223.6, -173.4], [224.5, -173.8], [227.9, -174.3], [232.5, -176.1], [237.8, -177.8], [244, -178.6], [244.9, -179], [245.8, -180], [246.2, -180.8], [246.3, -182.2], [245.7, -185.1], [245.6, -186.7], [246.7, -192.5], [246.7, -195.6], [246.5, -197.3], [246.1, -198.8], [245.1, -200.4], [243.9, -201.7], [242.1, -203.1], [239.3, -204.8], [237.5, -205.5], [229.4, -207.8], [226.8, -207.8], [224.3, -207.2], [222.8, -207.2], [219.5, -208], [216.7, -208.2], [209.6, -207.1], [204.3, -205.3], [199.9, -203.3], [198.9, -202.4], [197.7, -199.7], [196.5, -198.4], [195.8, -197.9], [192.1, -197], [190.5, -196.1], [188.7, -194.7], [187.9, -193.6], [187.3, -192.3], [186.4, -188], [185.2, -186.7], [184.3, -186.3], [180.4, -185.1], [178.5, -183.7], [175.8, -178.2], [174.9, -175.9], [174.3, -172.7], [174.3, -168.9], [175.4, -163.1], [175.3, -161.5], [174.5, -158.4], [174.3, -156.1], [174.3, -153.6], [174.7, -150.9], [175.7, -149.3], [176.8, -148.5], [179.1, -147.5], [184.6, -146], [187.4, -145.6], [190, -145.6], [192.6, -145.9], [193.1, -146]],
        draw: function (doc, cx, cy, s) {
            doc.setFillColor(0, 0, 0);
            drawPolyAt(doc, cx, cy, s, this.pts, 'F');
            // Le jour de la corne, en blanc par-dessus. Un remplissage pair-impair
            // aurait été plus élégant, mais `doc.lines()` ne prend qu'un tracé à la
            // fois : deux passes font le même dessin, et restent lisibles.
            doc.setFillColor(255, 255, 255);
            drawPolyAt(doc, cx, cy, s, this.eye, 'F');
            doc.setFillColor(0, 0, 0);
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
    // La note suit la FACE, pas le jeu d'échelles. Elles étaient choisies sur
    // `scaleSet`, si bien que l'IPSC et l'IDPA partageaient la même — or l'une est
    // tracée d'après un règlement qui publie ses cotes, l'autre approxime une cible
    // dont les cotes ne sont pas publiées. Les mettre dans la même phrase donnait à la
    // seconde le crédit de la première.
    if (note) note.innerHTML = t(sil.noteKey || (sil.scaleSet === 'imssu' ? 'sil_note_imssu' : 'sil_note_ipsc'));
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
