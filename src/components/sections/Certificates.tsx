'use client'

import type { PointerEvent as ReactPointerEvent } from 'react'
import { useEffect } from 'react'
import { useRef, useState } from 'react'
import {
  animate,
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { ExternalLink, FileText, Pause, Play, Sparkles, X } from 'lucide-react'

type Certificate = {
  title: string
  issuer: string
  file: string
  accent: string
  summary: string
}

const CERTIFICATES: Certificate[] = [
  {
    title: 'AWS Certified Cloud Practitioner (CLF-C02)',
    issuer: 'Amazon Web Services',
    file: '/awsCertificate.pdf',
    accent: 'from-orange-500 via-amber-400 to-yellow-300',
    summary: 'Cloud fundamentals, shared responsibility, billing, security, and core AWS services.',
  },
  {
    title: 'Agile Software Development',
    issuer: 'University of Minnesota',
    file: '/agileCertificate.pdf',
    accent: 'from-sky-500 via-cyan-400 to-emerald-300',
    summary: 'Iterative delivery, collaboration, adaptive planning, and software process discipline.',
  },
  {
    title: 'Deep Learning and Reinforcement Learning',
    issuer: 'IBM',
    file: '/dlCertificate.pdf',
    accent: 'from-violet-500 via-fuchsia-400 to-pink-300',
    summary: 'Neural networks, optimization, policy learning, and modern AI workflows.',
  },
  {
    title: 'The Bits and Bytes of Computer Networking',
    issuer: 'Google',
    file: '/networkCertificate.pdf',
    accent: 'from-emerald-500 via-teal-400 to-cyan-300',
    summary: 'Networking models, routing, protocols, and the infrastructure behind connected systems.',
  },
]

const ROTATION_SPEED = 8
const DRAG_SENSITIVITY = 0.18
const STEP_DEGREES = 360 / CERTIFICATES.length
const DEG_TO_RAD = Math.PI / 180
const CAROUSEL_RADIUS_X = 320
const CAROUSEL_DEPTH = 260
const CAROUSEL_HEIGHT = 12

function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360
}

function getSnapTarget(rotation: number) {
  return Math.round(rotation / STEP_DEGREES) * STEP_DEGREES
}

function getClosestCardIndex(rotation: number) {
  let closestIndex = 0
  let closestDistance = Number.POSITIVE_INFINITY

  CERTIFICATES.forEach((_, index) => {
    const angle = normalizeDegrees(rotation + index * STEP_DEGREES)
    const distance = Math.min(angle, 360 - angle)

    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  })

  return closestIndex
}

function CertificateCard({
  certificate,
  index,
  rotation,
  activeIndex,
  onFocus,
  onOpen,
}: {
  certificate: Certificate
  index: number
  rotation: ReturnType<typeof useMotionValue<number>>
  activeIndex: number
  onFocus: (index: number) => void
  onOpen: (certificate: Certificate) => void
}) {
  const angle = index * STEP_DEGREES
  const totalAngle = useTransform(rotation, (value) => value + angle)
  const x = useTransform(totalAngle, (value) => Math.sin(value * DEG_TO_RAD) * CAROUSEL_RADIUS_X)
  const z = useTransform(totalAngle, (value) => Math.cos(value * DEG_TO_RAD) * CAROUSEL_DEPTH)
  const faceRotation = useTransform(totalAngle, (value) => -value)
  const visibility = useTransform(totalAngle, (value) => {
    const normalized = normalizeDegrees(value)
    return (Math.cos(normalized * DEG_TO_RAD) + 1) / 2
  })

  const cardScale = useTransform(visibility, (value) => 0.76 + value * 0.34)
  const cardOpacity = useTransform(visibility, (value) => 0.3 + value * 0.7)
  const cardBrightness = useTransform(visibility, (value) => 0.7 + value * 0.45)
  const cardBlur = useTransform(visibility, (value) => `${(1 - value) * 1.4}px`)
  const cardShadow = useTransform(visibility, (value) => {
    if (value > 0.8) {
      return '0 34px 90px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.18)'
    }

    return '0 18px 50px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.1)'
  })

  const cardTransform = useMotionTemplate`
    translate3d(-50%, -50%, 0px)
    translate3d(${x}px, ${CAROUSEL_HEIGHT}px, ${z}px)
    rotateY(${faceRotation}deg)
    scale(${cardScale})
  `

  const previewUrl = `${certificate.file}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`
  const isActive = activeIndex === index

  return (
    <motion.article
      className="absolute left-1/2 top-1/2 w-[min(88vw,18rem)] sm:w-[min(84vw,21rem)]"
      style={{
        transformStyle: 'preserve-3d',
        transform: cardTransform,
        opacity: cardOpacity,
        filter: useMotionTemplate`brightness(${cardBrightness}) blur(${cardBlur})`,
        boxShadow: cardShadow,
        zIndex: isActive ? 50 : 10,
        willChange: 'transform, opacity, filter',
      }}
      onClick={() => onFocus(index)}
    >
      <div
        className={`absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-br ${certificate.accent} blur-3xl transition-opacity duration-300 ${
          isActive ? 'opacity-35' : 'opacity-10'
        }`}
      />

      <div className="group relative max-h-[27rem] overflow-hidden rounded-[2rem] border border-white/15 bg-white/78 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/65 sm:max-h-[31.5rem]">
        <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${certificate.accent}`} />

        <div className="relative flex max-h-[27rem] flex-col p-3 sm:p-4 sm:max-h-[31.5rem]">
          <div className="mb-2.5 flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${certificate.accent} px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white shadow-lg shadow-black/20`}>
                <Sparkles className="h-3.5 w-3.5" />
                Certificate
              </div>
              <h3 className="text-[1.05rem] font-bold leading-tight text-slate-900 dark:text-white sm:text-lg">
                {certificate.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{certificate.issuer}</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.45rem] border border-white/15 bg-slate-950/90 shadow-inner shadow-black/20 dark:border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),transparent_55%)]" />
            <div className="h-[10.75rem] w-full overflow-hidden bg-white sm:h-[clamp(12rem,20vh,14rem)]">
              <iframe
                src={previewUrl}
                title={`${certificate.title} preview`}
                className="h-full w-full border-0 bg-white"
              />
            </div>
          </div>

          <p className="mt-2.5 line-clamp-2 text-[0.82rem] leading-relaxed text-slate-600 dark:text-slate-400 sm:mt-3 sm:text-sm">
            {certificate.summary}
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onOpen(certificate)
            }}
            className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
          >
            <ExternalLink className="h-4 w-4" />
            View Certificate
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function Certificates() {
  const rotation = useMotionValue(0)
  const dragStartX = useRef(0)
  const dragStartRotation = useRef(0)
  const dragMoved = useRef(false)

  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isPausedManually, setIsPausedManually] = useState(false)
  const [isSnapping, setIsSnapping] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewer, setViewer] = useState<Certificate | null>(null)

  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!viewer) return

    const previousOverflow = document.body.style.overflow
    const previousTouchAction = document.body.style.touchAction

    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.touchAction = previousTouchAction
    }
  }, [viewer])

  useMotionValueEvent(rotation, 'change', (latest) => {
    setActiveIndex(getClosestCardIndex(latest))
  })

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion || isHovered || isDragging || isPausedManually || isSnapping || viewer) {
      return
    }

    rotation.set(rotation.get() + (delta / 1000) * ROTATION_SPEED)
  })

  const snapToClosest = (currentRotation: number) => {
    const target = getSnapTarget(currentRotation)
    setIsSnapping(true)

    animate(rotation, target, {
      type: 'spring',
      stiffness: 90,
      damping: 18,
      mass: 1,
      onComplete: () => setIsSnapping(false),
    })
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null
    if (target?.closest('button, a, iframe')) {
      return
    }

    dragMoved.current = false
    dragStartX.current = event.clientX
    dragStartRotation.current = rotation.get()
    setIsDragging(true)
    setIsPausedManually(false)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const deltaX = event.clientX - dragStartX.current
    if (Math.abs(deltaX) > 6) {
      dragMoved.current = true
    }

    rotation.set(dragStartRotation.current - deltaX * DRAG_SENSITIVITY)
  }

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    setIsDragging(false)

    if (dragMoved.current) {
      snapToClosest(rotation.get())
      dragMoved.current = false
    }
  }

  const handleFocus = (index: number) => {
    setIsPausedManually(false)
    setIsSnapping(true)

    animate(rotation, -index * STEP_DEGREES, {
      type: 'spring',
      stiffness: 100,
      damping: 18,
      mass: 1,
      onComplete: () => setIsSnapping(false),
    })
  }

  return (
    <section id="certificates" className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-12 max-w-4xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/50 px-4 py-2 text-sm font-medium text-slate-700 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            Verified learning, polished presentation
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-5xl">
            Certificates <span className="gradient-text">Showcase</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg">
            A premium 3D carousel for the certifications I&apos;ve earned. Drag to orbit, click a card to bring it to the
            front, and open the full PDF in a modal viewer.
          </p>
        </motion.div>

        <div
          className="relative mx-auto h-[43rem] max-w-6xl overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/40 shadow-[0_30px_120px_rgba(15,23,42,0.18)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/30 sm:h-[47rem]"
          style={{ perspective: '1600px', perspectiveOrigin: '50% 42%', touchAction: 'none' }}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="absolute inset-x-8 bottom-10 h-24 rounded-full bg-slate-950/10 blur-3xl dark:bg-black/30" />
          <div className="pointer-events-none absolute inset-x-0 top-10 flex justify-center">
            <div className="rounded-full border border-white/15 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-slate-600 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              {isDragging ? 'Dragging' : isSnapping ? 'Snapping' : isHovered ? 'Hover paused' : isPausedManually ? 'Paused' : 'Auto rotating'}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-20 flex justify-center gap-3 px-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="rounded-full border border-white/15 bg-white/50 px-3 py-1 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              Drag or swipe
            </span>
            <span className="rounded-full border border-white/15 bg-white/50 px-3 py-1 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              Click card to focus
            </span>
            <span className="rounded-full border border-white/15 bg-white/50 px-3 py-1 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              Hover to pause
            </span>
          </div>

          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            {CERTIFICATES.map((certificate, index) => (
              <CertificateCard
                key={certificate.file}
                certificate={certificate}
                index={index}
                rotation={rotation}
                activeIndex={activeIndex}
                onFocus={handleFocus}
                onOpen={setViewer}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-5 flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/70 px-4 py-2 text-sm text-slate-700 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
            <FileText className="h-4 w-4 text-cyan-400" />
            4 certificates in the carousel
          </div>

          <button
            type="button"
            onClick={() => setIsPausedManually((value) => !value)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-slate-950/90 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 dark:bg-white dark:text-slate-950"
          >
            {isPausedManually ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            {isPausedManually ? 'Resume rotation' : 'Pause rotation'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {viewer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overscroll-none overflow-y-auto bg-slate-950/85 px-3 py-3 backdrop-blur-xl sm:px-4 sm:py-6"
            onClick={() => setViewer(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.28 }}
              onClick={(event) => event.stopPropagation()}
              className="mx-auto flex max-h-[calc(100vh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/92 shadow-[0_40px_140px_rgba(0,0,0,0.45)] dark:bg-slate-950/96 sm:max-h-[92vh] sm:rounded-[2rem]"
            >
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200/70 px-4 py-4 dark:border-white/10 sm:px-5 sm:py-4 sm:px-6">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-cyan-500 sm:text-xs">Certificate viewer</p>
                  <h3 className="mt-1 text-[1.05rem] font-bold text-slate-900 dark:text-white sm:text-2xl">{viewer.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{viewer.issuer}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setViewer(null)}
                  className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  aria-label="Close certificate viewer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid min-h-0 flex-1 gap-0 overflow-y-auto overscroll-contain lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
                <div className="h-[58vh] min-h-[22rem] border-b border-slate-200/70 bg-slate-950 lg:border-b-0 lg:border-r lg:border-slate-200/70 dark:border-white/10 sm:h-[72vh] sm:min-h-[28rem]">
                  <iframe
                    src={`${viewer.file}#page=1&view=FitH&toolbar=1&navpanes=0`}
                    title={`${viewer.title} certificate PDF`}
                    className="h-full w-full"
                  />
                </div>

                <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
                  <div className={`rounded-[1.35rem] bg-gradient-to-br ${viewer.accent} p-4 text-white shadow-2xl shadow-black/20 sm:rounded-[1.5rem] sm:p-5`}>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/80 sm:text-xs">Highlight</p>
                    <h4 className="mt-2 text-[1.15rem] font-bold leading-tight sm:text-2xl">{viewer.title}</h4>
                    <p className="mt-2 text-sm text-white/85">Issued by {viewer.issuer}</p>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{viewer.summary}</p>

                  <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-3.5 dark:border-white/10 dark:bg-white/5 sm:rounded-[1.5rem] sm:p-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">What you can do</p>
                    <ul className="mt-2.5 space-y-1.5 text-sm text-slate-600 dark:text-slate-400 sm:mt-3 sm:space-y-2">
                      <li>• Review the full PDF in the embedded viewer.</li>
                      <li>• Open the certificate in a new tab if you want a separate view.</li>
                      <li>• Close the modal and keep exploring the carousel.</li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3 pt-1 pb-2 sm:flex-row sm:pb-0">
                    <a
                      href={viewer.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] dark:bg-white dark:text-slate-950 sm:flex-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open in new tab
                    </a>
                    <button
                      type="button"
                      onClick={() => setViewer(null)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:flex-1"
                    >
                      Close viewer
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}