// Cálculo de posiciones y offsets para que múltiples naves en una misma casilla no se encimen

export function getPlayerPositionOffset(playerIndex, totalPlayersInSpace) {
  if (totalPlayersInSpace <= 1) return { dx: 0, dy: 0 };
  
  // Distribución circular o en cuadrícula alrededor del centro de la casilla
  const radius = 18;
  const angle = (playerIndex / totalPlayersInSpace) * Math.PI * 2 - Math.PI / 2;
  return {
    dx: Math.cos(angle) * radius,
    dy: Math.sin(angle) * radius
  };
}

export function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}
