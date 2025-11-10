import { useEffect, useState } from 'react'
import HeroSplineCover from './components/HeroSplineCover'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [text, setText] = useState('Math quiz on chapters 3-4 due Friday. Submit assignment on calculus limits by 10/21. Prepare for physics exam next week.')
  const [parsing, setParsing] = useState(false)
  const [tasks, setTasks] = useState([])
  const [creating, setCreating] = useState(false)
  const [createdIds, setCreatedIds] = useState([])

  const parseText = async () => {
    setParsing(true)
    try {
      const res = await fetch(`${API_BASE}/api/studdy/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      const data = await res.json()
      setTasks(data.tasks || [])
    } catch (e) {
      console.error(e)
      setTasks([])
    } finally {
      setParsing(false)
    }
  }

  const saveTasks = async () => {
    if (!tasks.length) return
    setCreating(true)
    try {
      const ids = []
      for (const t of tasks) {
        const res = await fetch(`${API_BASE}/api/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: t.title, priority: t.priority })
        })
        const data = await res.json()
        if (data?.id) ids.push(data.id)
      }
      setCreatedIds(ids)
    } catch (e) {
      console.error(e)
    } finally {
      setCreating(false)
    }
  }

  useEffect(() => {
    // Auto-parse sample on load
    parseText()
  }, [])

  return (
    <div className="min-h-screen bg-[#0b0f1d] text-white">
      <div className="max-w-6xl mx-auto p-6 space-y-10">
        <HeroSplineCover />

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-3">Studdy — Quick Parse</h2>
            <p className="text-white/70 text-sm mb-4">Paste assignment emails or notes. We’ll pull out tasks and priorities.</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-40 rounded-lg bg-black/30 border border-white/10 p-3 outline-none focus:ring-2 focus:ring-sky-400"
            />
            <div className="flex gap-3 mt-3">
              <button onClick={parseText} disabled={parsing} className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 disabled:opacity-60">{parsing ? 'Parsing…' : 'Parse'}</button>
              <a href="/test" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Check Backend</a>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-3">Detected Tasks</h2>
            {!tasks.length && <p className="text-white/60">No tasks yet. Try parsing some text.</p>}
            <ul className="space-y-2">
              {tasks.map((t, i) => (
                <li key={i} className="p-3 rounded-lg bg-black/30 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t.title}</p>
                    <p className="text-xs text-white/60">Priority: {t.priority}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={saveTasks} disabled={!tasks.length || creating} className="mt-4 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60">
              {creating ? 'Saving…' : 'Save to Tasks'}
            </button>
            {createdIds.length > 0 && (
              <p className="text-emerald-300 text-sm mt-2">Saved {createdIds.length} task(s) to the database.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
