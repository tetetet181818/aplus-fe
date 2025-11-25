'use client'
import { useEffect, useRef } from 'react'
import io, { Socket } from 'socket.io-client'

const API = 'http://localhost:9090'
const SOCKET_NAMESPACE = '/notifications'

export interface Notification {
  id: string
  title: string
  body?: string
  read: boolean
  createdAt: string
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkitAudioContext)()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.value = 880
    o.connect(g)
    g.connect(ctx.destination)
    o.start()
    g.gain.setValueAtTime(0.0001, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01)
    setTimeout(() => {
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15)
      o.stop(ctx.currentTime + 0.16)
    }, 120)
  } catch (e) {
    console.warn('Audio not available', e)
  }
}

export default function useRealTime() {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const socket = io(API + SOCKET_NAMESPACE, { transports: ['websocket'] })
    socketRef.current = socket

    socket.on('connect', () => console.log('Connected to Socket.IO'))

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    socket.on('notification', (n) => {
      playBeep()
    })

    socket.on('clear', () => {})

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    socket.on('read', ({ id }: { id: string }) => {})

    return () => {
      socket.disconnect()
    }
  }, [])

  return {
    socket: socketRef.current,
  }
}
