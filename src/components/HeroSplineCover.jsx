import Spline from '@splinetool/react-spline'

export default function HeroSplineCover() {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0f1226] to-[#0b0f1d]">
      <Spline
        scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(147,197,253,0.25),transparent_70%)]" />
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-white text-xs font-medium border border-white/20 mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live AI App Builder • Studdy Preview
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
            Idlely — Build, Study, and Stay Ahead
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/80 max-w-2xl mx-auto">
            Paste materials, get tasks and a study plan. Generate quizzes and flashcards. Collaborate in shared spaces. All in one clean, fast workspace.
          </p>
        </div>
      </div>
    </div>
  )
}
