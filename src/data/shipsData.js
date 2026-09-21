export const SHIPS = [
  {
    id: "ship_apollo",
    name: "Apolo Mexicano-1",
    subtitle: "Transbordador de Reentrada",
    color: "#ff3366", // Rosa Neón / Rojo
    secondaryColor: "#ffd700",
    glowColor: "rgba(255, 51, 102, 0.6)",
    path: `
      <path d="M 15 2 L 23 20 L 18 22 L 15 19 L 12 22 L 7 20 Z" fill="#ff3366" stroke="#ffffff" stroke-width="1.2"/>
      <ellipse cx="15" cy="11" rx="2.5" ry="4.5" fill="#00f0ff" stroke="#ffffff" stroke-width="0.8"/>
      <path d="M 8 20 L 2 22 L 9 14 Z" fill="#cc0033"/>
      <path d="M 22 20 L 28 22 L 21 14 Z" fill="#cc0033"/>
    `
  },
  {
    id: "ship_neri",
    name: "Neri Vela II",
    subtitle: "Explorador Orbital",
    color: "#00f0ff", // Cian Neón
    secondaryColor: "#0066ff",
    glowColor: "rgba(0, 240, 255, 0.6)",
    path: `
      <path d="M 15 3 L 26 21 L 19 20 L 15 23 L 11 20 L 4 21 Z" fill="#00f0ff" stroke="#ffffff" stroke-width="1.2"/>
      <ellipse cx="15" cy="10" rx="3" ry="5" fill="#ffff00" stroke="#ffffff" stroke-width="0.8"/>
      <path d="M 8 17 L 3 21 L 9 19 Z" fill="#0066ff"/>
      <path d="M 22 17 L 27 21 L 21 19 Z" fill="#0066ff"/>
    `
  },
  {
    id: "ship_aztlan",
    name: "Aztlán Galáctico",
    subtitle: "Cazador Estelar",
    color: "#ffaa00", // Naranja / Dorado
    secondaryColor: "#ff3300",
    glowColor: "rgba(255, 170, 0, 0.6)",
    path: `
      <path d="M 15 2 L 21 16 L 25 22 L 15 20 L 5 22 L 9 16 Z" fill="#ffaa00" stroke="#ffffff" stroke-width="1.2"/>
      <polygon points="15,6 18,13 12,13" fill="#00f0ff" stroke="#ffffff" stroke-width="0.8"/>
    `
  },
  {
    id: "ship_quetzal",
    name: "Quetzal V",
    subtitle: "Sonda Científica",
    color: "#33ff77", // Verde Neón / Esmeralda
    secondaryColor: "#00aa44",
    glowColor: "rgba(51, 255, 119, 0.6)",
    path: `
      <path d="M 15 4 C 23 10, 28 17, 25 22 L 15 20 L 5 22 C 2 17, 7 10, 15 4 Z" fill="#33ff77" stroke="#ffffff" stroke-width="1.2"/>
      <circle cx="15" cy="12" r="3.5" fill="#ff00ff" stroke="#ffffff" stroke-width="0.8"/>
    `
  }
];
