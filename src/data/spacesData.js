// Coordenadas de la ruta alineadas con la imagen original del tablero (Virtual Canvas 1000 x 750)

export const SPACES = [
  // --- INICIO Y BUCLÉS EXTERIORES BLANCOS ---
  { id: 0, index: 0, type: "start", color: "white", pos: { x: 480, y: 80 }, angle: 0, label: "INICIO", name: "Estación Espacial Norte (Inicio)", desc: "Punto de partida en el tablero original de La Gran Carrera Intergaláctica." },
  { id: 1, index: 1, type: "normal", color: "white", pos: { x: 535, y: 78 }, angle: 0, label: "1", name: "Órbita Alta", desc: "Aceleración inicial sobre el camino principal." },
  { id: 2, index: 2, type: "question", color: "white", pos: { x: 590, y: 80 }, angle: 5, label: "2", name: "Estación de Monitoreo", desc: "Responde trivia astronómica para avanzar casillas extra." },
  { id: 3, index: 3, type: "normal", color: "white", pos: { x: 645, y: 85 }, angle: 10, label: "3", name: "Bucle de Cristal", desc: "Aproximación al mundo de cristal." },
  { id: 4, index: 4, type: "boost", color: "white", pos: { x: 700, y: 95 }, angle: 25, label: "4", name: "Viento Solar", desc: "¡Chorro de fotones! Avanzas 2 casillas extra." },
  
  // Viñeta Superior Derecha (Mundo Púrpura)
  { id: 5, index: 5, type: "normal", color: "white", pos: { x: 750, y: 110 }, angle: 45, label: "5", name: "Mundo de Cristal", desc: "Paso por la viñeta superior derecha." },
  { id: 6, index: 6, type: "question", color: "white", pos: { x: 795, y: 155 }, angle: 70, label: "6", name: "Cúpula de Cuarzo", desc: "Trivia sobre las galaxias." },
  { id: 7, index: 7, type: "normal", color: "white", pos: { x: 810, y: 215 }, angle: 100, label: "7", name: "Retorno Orbital", desc: "Conexión de regreso a la ruta." },
  { id: 8, index: 8, type: "hazard", color: "white", pos: { x: 780, y: 275 }, angle: 130, label: "8", name: "Basura Espacial", desc: "Restos de satélite impiden tu paso. Pierdes 1 turno." },
  { id: 9, index: 9, type: "normal", color: "white", pos: { x: 740, y: 325 }, angle: 150, label: "9", name: "Cinturón Oriental", desc: "Navegación hacia el arco azul." },

  // Viñeta Medio Derecha (Arco Azul)
  { id: 10, index: 10, type: "normal", color: "white", pos: { x: 775, y: 375 }, angle: 120, label: "10", name: "Sendero Rocoso", desc: "Formaciones de basalto estelar." },
  { id: 11, index: 11, type: "question", color: "white", pos: { x: 825, y: 415 }, angle: 90, label: "11", name: "Estación Neptuno", desc: "Pregunta científica sobre el gigante azul." },
  { id: 12, index: 12, type: "boost", color: "white", pos: { x: 870, y: 465 }, angle: 45, label: "12", name: "Turbina Neri", desc: "¡Impulso con tecnología mexicana! Avanzas 3 casillas." },
  { id: 13, index: 13, type: "normal", color: "white", pos: { x: 835, y: 520 }, angle: -30, label: "13", name: "Arco Azul", desc: "Navegación sobre los arcos de hielo." },
  { id: 14, index: 14, type: "normal", color: "white", pos: { x: 780, y: 560 }, angle: -65, label: "14", name: "Entrada Sur", desc: "Camino a los mundos inferiores." },

  // Viñeta Inferior Derecha (Biosfera Verde)
  { id: 15, index: 15, type: "question", color: "white", pos: { x: 740, y: 615 }, angle: -95, label: "15", name: "Planeta Esmeralda", desc: "Trivia de ciencias biológicas espaciales." },
  { id: 16, index: 16, type: "normal", color: "white", pos: { x: 755, y: 675 }, angle: -60, label: "16", name: "Atmósfera Alienígena", desc: "Observación de nubes bioluminiscentes." },
  { id: 17, index: 17, type: "teleport", color: "white", pos: { x: 725, y: 720 }, angle: 0, label: "17", name: "Túnel Cuántico", desc: "¡Salto estelar! Te teletransportas a la casilla 22." },
  { id: 18, index: 18, type: "normal", color: "white", pos: { x: 650, y: 725 }, angle: 30, label: "18", name: "Curva Inferior", desc: "Recorriendo el límite austral del tablero." },

  // Viñeta Inferior Izquierda (Planeta Volcánico Rojo)
  { id: 19, index: 19, type: "question", color: "white", pos: { x: 575, y: 720 }, angle: 60, label: "19", name: "Volcanes Extraterrestres", desc: "Trivia sobre el Monte Olimpo en Marte." },
  { id: 20, index: 20, type: "normal", color: "white", pos: { x: 500, y: 720 }, angle: 90, label: "20", name: "Base Magma", desc: "Estación de investigación sísmica." },
  { id: 21, index: 21, type: "hazard", color: "white", pos: { x: 425, y: 720 }, angle: 120, label: "21", name: "Tormenta Solar", desc: "Falla de radiocomunicación. Retrocedes 2 casillas." },
  { id: 22, index: 22, type: "normal", color: "white", pos: { x: 350, y: 720 }, angle: 150, label: "22", name: "Órbita de Saturno", desc: "Cercanías al gigante de los anillos." },

  // Viñeta Inferior Izquierda Lejana (Saturno)
  { id: 23, index: 23, type: "question", color: "white", pos: { x: 280, y: 700 }, angle: 170, label: "23", name: "Anillos de Saturno", desc: "Trivia sobre partículas de hielo." },
  { id: 24, index: 24, type: "normal", color: "white", pos: { x: 220, y: 655 }, angle: 210, label: "24", name: "Paso de Titán", desc: "Cerca de la luna con atmósfera densa." },
  { id: 25, index: 25, type: "boost", color: "white", pos: { x: 190, y: 590 }, angle: 240, label: "25", name: "Gravedad Asistida", desc: "¡Efecto honda gravitacional! Avanzas 2 casillas." },
  { id: 26, index: 26, type: "normal", color: "white", pos: { x: 170, y: 525 }, angle: 260, label: "26", name: "Zona Júpiter", desc: "Cercanía a la Gran Mancha Roja." },

  // Viñeta Medio Izquierda (Júpiter y Lunas)
  { id: 27, index: 27, type: "question", color: "white", pos: { x: 160, y: 460 }, angle: 270, label: "27", name: "Lunas Galileanas", desc: "Trivia sobre Ío, Europa, Ganimedes y Calisto." },
  { id: 28, index: 28, type: "normal", color: "white", pos: { x: 170, y: 395 }, angle: 290, label: "28", name: "Cinturón de Asteroides", desc: "Paso entre Marte y Júpiter." },
  { id: 29, index: 29, type: "normal", color: "white", pos: { x: 200, y: 330 }, angle: 310, label: "29", name: "Sector Ceres", desc: "Navegación junto al planeta enano Ceres." },

  // Viñeta Superior Izquierda (Nebulosa Roja)
  { id: 30, index: 30, type: "question", color: "white", pos: { x: 230, y: 265 }, angle: 330, label: "30", name: "Supernova Retro", desc: "Pregunta sobre la vida de las estrellas." },
  { id: 31, index: 31, type: "normal", color: "white", pos: { x: 260, y: 200 }, angle: 350, label: "31", name: "Luz de la Nebulosa", desc: "Polvo estelar resplandeciente." },
  { id: 32, index: 32, type: "boost", color: "white", pos: { x: 300, y: 145 }, angle: 10, label: "32", name: "Impulso Morelos II", desc: "¡Homenaje a la misión espacial mexicana! Avanzas 3 casillas." },
  { id: 33, index: 33, type: "normal", color: "white", pos: { x: 360, y: 100 }, angle: 30, label: "33", name: "Ingreso al Anillo", desc: "Preparación para la pista roja de aceleración." },

  // --- CIRCUITO ORBITAL ROJO / NARANJA DE IMPULSO (PISTA IMPRESA ROJA/NARANJA) ---
  { id: 34, index: 34, type: "normal", color: "orange", pos: { x: 410, y: 110 }, angle: 45, label: "34", name: "Circuito Naranja - Entrada Norte", desc: "Ingreso a la pista roja orbital." },
  { id: 35, index: 35, type: "question", color: "orange", pos: { x: 470, y: 140 }, angle: 60, label: "35", name: "Radar de Velocidad", desc: "Trivia sobre la velocidad de la luz." },
  { id: 36, index: 36, type: "normal", color: "orange", pos: { x: 535, y: 170 }, angle: 75, label: "36", name: "Órbita de Marte", desc: "Paso junto al planeta rojo." },
  { id: 37, index: 37, type: "hazard", color: "orange", pos: { x: 595, y: 210 }, angle: 90, label: "37", name: "Micrometeoritos", desc: "Retrocedes 2 casillas por maniobra evasiva." },
  { id: 38, index: 38, type: "normal", color: "orange", pos: { x: 635, y: 258 }, angle: 110, label: "38", name: "Curva Naranja Este", desc: "Fuerza centrífuga en torno al Sol." },
  { id: 39, index: 39, type: "question", color: "orange", pos: { x: 655, y: 315 }, angle: 130, label: "39", name: "Telescopio Espacial", desc: "Trivia sobre la observación cósmica." },
  { id: 40, index: 40, type: "boost", color: "orange", pos: { x: 645, y: 380 }, angle: 160, label: "40", name: "Acelerador de Partículas", desc: "¡Propulsión ionizada! Avanzas 2 casillas." },
  { id: 41, index: 41, type: "normal", color: "orange", pos: { x: 615, y: 445 }, angle: 190, label: "41", name: "Arco Naranja Sur", desc: "Bordeando la zona gravitacional solar." },
  { id: 42, index: 42, type: "normal", color: "orange", pos: { x: 565, y: 505 }, angle: 220, label: "42", name: "Órbita de Venus", desc: "Atmósfera resplandeciente del lucero del alba." },

  // Curva hacia lado oeste naranja
  { id: 43, index: 43, type: "question", color: "orange", pos: { x: 495, y: 535 }, angle: 250, label: "43", name: "Estación Sol Superior", desc: "Trivia sobre la corona y las manchas solares." },
  { id: 44, index: 44, type: "normal", color: "orange", pos: { x: 425, y: 535 }, angle: 270, label: "44", name: "Órbita de Mercurio", desc: "El planeta más cercano al Sol." },
  { id: 45, index: 45, type: "hazard", color: "orange", pos: { x: 355, y: 505 }, angle: 290, label: "45", name: "Llama Solar Gigante", desc: "Ráfaga de plasma de alta temperatura. Pierdes 1 turno." },
  { id: 46, index: 46, type: "normal", color: "orange", pos: { x: 305, y: 445 }, angle: 310, label: "46", name: "Bucle Naranja Oeste", desc: "Preparación para la reentrada." },
  { id: 47, index: 47, type: "boost", color: "orange", pos: { x: 285, y: 380 }, angle: 330, label: "47", name: "Empuje de Reentrada", desc: "¡Alinear curso a la Tierra! Avanzas 2 casillas." },
  { id: 48, index: 48, type: "normal", color: "orange", pos: { x: 305, y: 315 }, angle: 350, label: "48", name: "Empalme Azul", desc: "Conexión con el tramo azul de meta." },

  // --- TRAMO AZUL / CIAN EN ESPIRAL IMPRESO HACIA EL CENTRO ---
  { id: 49, index: 49, type: "normal", color: "cyan", pos: { x: 345, y: 268 }, angle: 20, label: "49", name: "Corredor Azul - Reentrada", desc: "Ingreso al tramo azul en espiral hacia la Tierra." },
  { id: 50, index: 50, type: "question", color: "cyan", pos: { x: 385, y: 298 }, angle: 45, label: "50", name: "Control de Misión Atlantis", desc: "Trivia de astronáutica mexicana." },
  { id: 51, index: 51, type: "normal", color: "cyan", pos: { x: 425, y: 338 }, angle: 60, label: "51", name: "Órbita Terrestre Baja", desc: "Visualización de continentes y océanos." },
  { id: 52, index: 52, type: "boost", color: "cyan", pos: { x: 455, y: 368 }, angle: 75, label: "52", name: "Escudo Térmico", desc: "¡Reentrada segura! Avanzas 1 casilla final." },
  { id: 53, index: 53, type: "normal", color: "cyan", pos: { x: 475, y: 395 }, angle: 90, label: "53", name: "Descenso Final", desc: "Aterrizaje inminente en la base espacial." },
  
  // META EN LA TIERRA CENTRO (EN LA IMAGEN ORIGINAL ES EL NODO CENTRAL)
  { id: 54, index: 54, type: "finish", color: "cyan", pos: { x: 485, y: 425 }, angle: 0, label: "META", name: "ESTACIÓN TIERRA - ¡VICTORIA!", desc: "¡Has completado La Gran Carrera Intergaláctica!" }
];
