import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { loadEnv } from 'vite'

const IMAGE_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

const VIDEO_TYPES = {
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/quicktime': 'mov',
}

const MAX_BODY = 80 * 1024 * 1024

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY) {
        reject(new Error('Upload is too large. Keep each video under about 50 MB.'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function sendJson(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

function passwordsMatch(input, expected) {
  const a = Buffer.from(String(input || ''))
  const b = Buffer.from(String(expected || ''))
  if (a.length !== b.length || a.length === 0) return false
  return crypto.timingSafeEqual(a, b)
}

function safeName(id, ext) {
  return `${id}.${ext}`
}

function writeMedia(root, file) {
  const map = file.kind === 'video' ? VIDEO_TYPES : IMAGE_TYPES
  const ext = map[file.type]
  if (!ext || typeof file.data !== 'string') {
    throw new Error(file.kind === 'video' ? 'Use an MP4, WebM, or MOV video.' : 'Use a JPG, PNG, or WebP photo.')
  }
  const buffer = Buffer.from(file.data, 'base64')
  const max = file.kind === 'video' ? 50 * 1024 * 1024 : 8 * 1024 * 1024
  if (!buffer.length || buffer.length > max) {
    throw new Error(file.kind === 'video' ? 'Video must be under 50 MB.' : 'Each photo must be under 8 MB.')
  }
  const id = crypto.randomBytes(8).toString('hex')
  const filename = safeName(id, ext)
  const dir = path.join(root, 'public', 'media', 'drops')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, filename), buffer)
  return `/media/drops/${filename}`
}

function readDrops(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed.drops) ? parsed.drops : []
  } catch {
    return []
  }
}

function writeDrops(filePath, drops) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify({ drops }, null, 2))
}

function removePublicFile(root, publicPath) {
  if (typeof publicPath !== 'string' || !publicPath.startsWith('/media/drops/')) return
  const absolute = path.resolve(root, 'public', publicPath.slice(1))
  const allowed = path.resolve(root, 'public', 'media', 'drops')
  if (!absolute.startsWith(allowed)) return
  if (fs.existsSync(absolute)) fs.unlinkSync(absolute)
}

function mount(middlewares, config) {
  const env = loadEnv(config.mode, config.root, '')
  const password = env.ADMIN_PASSWORD || 'leoverse-studio'
  const dropsFile = path.join(config.root, 'public', 'content', 'drops.json')

  middlewares.use(async (req, res, next) => {
    const url = req.url?.split('?')[0]
    if (url !== '/api/drops') return next()

    if (!passwordsMatch(req.headers['x-admin-password'], password)) {
      sendJson(res, 401, { ok: false, message: 'Studio password is incorrect.' })
      return
    }

    try {
      if (req.method === 'POST') {
        const body = JSON.parse((await readBody(req)).toString('utf8') || '{}')
        if (body.action === 'check') {
          sendJson(res, 200, { ok: true })
          return
        }
        const title = String(body.title || '').trim().slice(0, 120)
        const caption = String(body.caption || '').trim().slice(0, 800)
        const category = String(body.category || '').trim().slice(0, 60)
        if (!title) {
          sendJson(res, 400, { ok: false, message: 'Add a title for this piece.' })
          return
        }
        const photos = Array.isArray(body.photos) ? body.photos.slice(0, 6) : []
        if (!photos.length && !body.video) {
          sendJson(res, 400, { ok: false, message: 'Add at least one photo or a video.' })
          return
        }
        const photoPaths = photos.map((photo) => writeMedia(config.root, { ...photo, kind: 'photo' }))
        const videoPath = body.video
          ? writeMedia(config.root, { ...body.video, kind: 'video' })
          : ''
        const drop = {
          id: `drop-${Date.now()}`,
          title,
          caption,
          category,
          createdAt: new Date().toISOString(),
          photos: photoPaths,
          video: videoPath,
        }
        const drops = readDrops(dropsFile)
        drops.unshift(drop)
        writeDrops(dropsFile, drops)
        sendJson(res, 200, { ok: true, drop })
        return
      }

      if (req.method === 'DELETE') {
        const body = JSON.parse((await readBody(req)).toString('utf8') || '{}')
        const drops = readDrops(dropsFile)
        const target = drops.find((drop) => drop.id === body.id)
        if (!target) {
          sendJson(res, 404, { ok: false, message: 'That piece is no longer on the site.' })
          return
        }
        ;(target.photos || []).forEach((photo) => removePublicFile(config.root, photo))
        removePublicFile(config.root, target.video)
        writeDrops(dropsFile, drops.filter((drop) => drop.id !== body.id))
        sendJson(res, 200, { ok: true })
        return
      }

      sendJson(res, 405, { ok: false, message: 'Method not allowed.' })
    } catch (error) {
      sendJson(res, 400, { ok: false, message: error.message || 'Could not save this piece.' })
    }
  })
}

export function leoverseDropsPlugin() {
  return {
    name: 'leoverse-drops',
    configureServer(server) {
      mount(server.middlewares, server.config)
    },
    configurePreviewServer(server) {
      mount(server.middlewares, server.config)
    },
  }
}
