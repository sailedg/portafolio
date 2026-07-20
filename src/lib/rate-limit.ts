const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const requestLog = new Map<string, number[]>();

// Rate limit en memoria (ventana deslizante). Alcanza para el form de contacto
// de un portafolio. Si crece el tráfico, mover a un store compartido (Upstash /
// Vercel KV), porque este Map se reinicia por instancia.
export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(identifier) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(identifier, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(identifier, timestamps);
  return false;
}
