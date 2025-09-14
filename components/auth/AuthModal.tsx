'use client'

import { useState } from 'react'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'login' | 'register'
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode)

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
  }

  const handleClose = () => {
    setMode(defaultMode)
    onClose()
  }

  return (
    <>
      <LoginModal
        isOpen={isOpen && mode === 'login'}
        onClose={handleClose}
        onToggleMode={handleToggleMode}
      />
      <RegisterModal
        isOpen={isOpen && mode === 'register'}
        onClose={handleClose}
        onToggleMode={handleToggleMode}
      />
    </>
  )
}
