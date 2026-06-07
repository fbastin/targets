# Printable Targets

A JavaScript library to dynamically generate vector PDF shooting targets (ISSF, MOA checkers, optical crosses, etc.) directly in the browser using [jsPDF](https://github.com/parallax/jsPDF).

## Features
- **Vector Precision:** Targets are drawn programmatically using pure vector coordinates. No image scaling artifacts.
- **ISSF Standards:** Accurate ring diameters, inner ten definitions, and black aiming zones for 10m Air Rifle, 10m Air Pistol, and 50m Rifle.
- **Distance Scaling:** Automatically calculates mathematically correct reduced targets (e.g. shooting 50m targets at 25m or 10m).
- **MOA Checkers:** Generates 1-MOA checkerboard targets for optics zeroing at 25m, 50m, 100m, 200m, 300m, etc.

## Dependencies
- [jsPDF](https://github.com/parallax/jsPDF) (^2.5.1)

## Usage

You can use the library programmatically to draw targets anywhere on your own `jsPDF` document.

### Quick Start Example

See `example.html` for a complete working example.

```html
<!-- 1. Include jsPDF -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<!-- 2. Include the library -->
<script src="target_generator.js"></script>

<script>
    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    
    // Draw an ISSF 10m Rifle target at X=105mm, Y=100mm, with 100% scale
    drawISSFAt(doc, 105, 100, ISSF['issf_10m_rifle'], 1);
    
    // Save or display the PDF
    doc.save("Target.pdf");
</script>
```

## API Reference

### Global Definitions

- `ISSF`: A global dictionary containing the specifications for supported targets. Available keys:
  - `issf_50m`
  - `issf_10m`
  - `issf_10m_rifle`

### Core Drawing Functions

#### `drawISSFAt(doc, ox, oy, spec, scale)`
Draws a standard ISSF concentric ring target.
- `doc`: The active `jsPDF` instance.
- `ox`, `oy`: The absolute X and Y coordinates (in mm) of the target's center.
- `spec`: The target specification object (e.g., `ISSF['issf_10m_rifle']`).
- `scale`: Scaling factor. Use `1` for official physical size.

#### `drawCheckersAt(doc, ox, oy, distanceMeters)`
Draws a 4x4 checkerboard where each square is exactly 1 MOA at the provided distance.
- `doc`, `ox`, `oy`: Same as above.
- `distanceMeters`: Distance in meters (e.g., `100`, `200`).

#### `drawCrossFull(doc, width, height)`
Draws a full-page optical zeroing cross on a 1cm grid background.
- `doc`: The active `jsPDF` instance.
- `width`, `height`: The dimensions of the page in mm.

## License

MIT License. See `LICENSE` file.
