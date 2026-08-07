export default function ErrorBanner({ message, onDismiss }) {
  if (!message) return null
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl bg-ember/10 border border-ember/30 px-4 py-3 mb-4">
      <p className="text-sm text-ember/90">{message}</p>
      <button onClick={onDismiss} className="text-ember/60 hover:text-ember shrink-0 text-lg leading-none">
        ×
      </button>
    </div>
  )
}
