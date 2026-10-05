'use client'
import { useEffect, useRef, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, X } from 'lucide-react'

interface ComingSoonModalProps {
  open: boolean
  onClose: () => void
}

export function ComingSoonModal({ open, onClose }: ComingSoonModalProps) {
  // false during SSR/hydration, true on the client — avoids a setState-in-effect
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    buttonRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Portal to <body> so ancestors with backdrop-filter/transform (Navbar, Hero) don't trap `fixed`
  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="coming-soon-title"
            className="relative w-full max-w-sm rounded-2xl border border-orange-400/20 bg-[#18181b]/95 p-7 text-center shadow-2xl shadow-orange-400/10"
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Wobbling coffee */}
            <motion.div
              className="mx-auto mb-5 w-14 h-14 rounded-2xl flex items-center justify-center border border-orange-400/30 bg-orange-400/10"
              animate={{ rotate: [0, -10, 10, -6, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.2 }}
            >
              <Coffee className="w-7 h-7 text-orange-400" />
            </motion.div>

            <h2 id="coming-soon-title" className="font-heading font-bold text-2xl mb-2">
              Stay <span className="gradient-text">tuned!</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              My CV is still compiling. It&apos;s fuelled by coffee and the occasional
              segfault, so it&apos;ll be here soon.
            </p>

            {/* Terminal-style progress bar that never quite finishes */}
            <div className="rounded-xl border border-white/10 bg-black/40 p-3 mb-6 text-left font-mono text-[11px]">
              <div className="text-[#ffb300] mb-2">
                $ make cv.pdf
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden mb-1.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-300"
                  initial={{ width: '0%' }}
                  animate={{ width: '99%' }}
                  transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="flex justify-between text-slate-500">
                <span>almost there…</span>
                <span className="text-orange-400">99%</span>
              </div>
            </div>

            <button
              ref={buttonRef}
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-orange-400/10 border border-orange-400/30 hover:bg-orange-400/20 hover:border-orange-400/50 text-orange-400 text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              Can&apos;t wait
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
