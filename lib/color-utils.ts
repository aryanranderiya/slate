/**
 * Lightens a hex color by a specified percentage
 * @param hex The hex color code to lighten
 * @param percent The percentage to lighten (0-100)
 * @returns A lightened hex color
 */
export function lightenColor(hex: string | undefined, percent: number) {
    if (!hex) return "#ffffff";
    hex = hex.replace("#", "");
    const num = parseInt(hex, 16);

    let r = (num >> 16) + Math.round(2.55 * percent);
    let g = ((num >> 8) & 0x00ff) + Math.round(2.55 * percent);
    let b = (num & 0x0000ff) + Math.round(2.55 * percent);

    r = Math.min(255, r);
    g = Math.min(255, g);
    b = Math.min(255, b);

    return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
