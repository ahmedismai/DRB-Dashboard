// Simple id generator (not crypto-strong) used as a replacement for nanoid.
export function nanoid() {
  return 'id-' + Math.random().toString(36).slice(2, 9)
}
