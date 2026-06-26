"use client"

import { useMemo, useRef, useState } from "react"
import {
  MessageSquare,
  RefreshCw,
  Send,
  X,
  Sparkles,
} from "lucide-react"

type ChatMessage = {
  role: "user" | "assistant"
  text: string
}

const API_BASE = "http://localhost:5000"

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const welcomeMessage = useMemo(
    () => (
      "¡Hola! Soy ARIA, tu asistente de retail. Pregunta por productos, recomendaciones o cómo usar AR en tu espacio."
    ),
    []
  )

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed) return

    setError(null)
    setLoading(true)
    const userMessage: ChatMessage = { role: "user", text: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mensaje: trimmed }),
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}`)
      }

      const data = await response.json()
      const botText =
        typeof data === "string"
          ? data
          : data.respuesta || data.answer || data.message || JSON.stringify(data)

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: String(botText) },
      ])
    } catch (err) {
      setError(
        "No se pudo conectar con ARIA. Asegúrate de que el servidor esté en http://localhost:5000"
      )
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const resetChat = async () => {
    setError(null)
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/reset`, {
        method: "POST",
      })
      if (!response.ok) {
        throw new Error(`Error ${response.status}`)
      }
      setMessages([])
    } catch (err) {
      setError("No se pudo reiniciar la conversación. Intenta de nuevo.")
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {open && (
        <div className="w-[340px] overflow-hidden rounded-3xl border border-red-600/20 bg-white/95 shadow-[0_25px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 border-b border-red-700/30 bg-red-600 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Sparkles className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">ARIA</p>
                <p className="text-[11px] text-white/80">Asesor virtual de retail</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetChat}
                disabled={loading}
                className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw className="size-3" />
                Reiniciar
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar chat"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto p-4 text-sm text-foreground">
            {messages.length === 0 ? (
              <div className="rounded-3xl border border-red-600/10 bg-red-50/80 p-4 text-sm text-red-800">
                {welcomeMessage}
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                      message.role === "user"
                        ? "bg-red-600 text-white"
                        : "bg-slate-100 text-slate-900"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-red-600/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu consulta..."
                className="min-h-[44px] flex-1 rounded-full border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="inline-flex h-11 items-center justify-center rounded-full bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Enviando..." : <Send className="size-4" />}
              </button>
            </div>
            {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_14px_40px_rgba(220,38,38,0.25)] transition hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        aria-label={open ? "Ocultar chat de ARIA" : "Abrir chat de ARIA"}
      >
        <MessageSquare className="size-8" />
      </button>
    </div>
  )
}
