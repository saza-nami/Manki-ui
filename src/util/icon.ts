import L from 'leaflet';

export default function generate(color: string, text: string) {
    return L.divIcon({
        html: `
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg"
			width="30" height="52" viewBox="0 0 40 70">
		<g fill="${color}" stroke="none">
		<circle cx="20" cy="20" r="20" />
		<polygon points="1.672,28 20,70 38.218,28" />
		</g>
		<g fill="white" stroke="gray" stroke-width="1">
		<text x="20" y="28" style="font: bold 16px sans-serif;"
			text-anchor="middle">
		${text}
		</text>
		</g>
		</svg>
		`,
		iconSize: L.point(30, 52),
		iconAnchor: L.point(15, 52),
		className: '_',	// don't use default ClassName
    });
}
