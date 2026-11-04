export async function fetchDrops() {
  const response = await fetch(`/content/drops.json?t=${Date.now()}`)
  if (!response.ok) return []
  const data = await response.json()
  const drops = Array.isArray(data.drops) ? data.drops : []
  return drops.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function formatDropDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
