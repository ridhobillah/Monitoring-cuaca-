export default function FavoriteLocations({ favorites, activeId, onSelect, onRemove, onAddCurrent, isCurrentSaved }) {
  return (
    <div className="rounded-3xl bg-indigo/40 border border-slate-750 p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-cloud">Lokasi Favorit</h2>
        <button
          onClick={onAddCurrent}
          disabled={isCurrentSaved}
          className="text-xs font-medium text-aurora hover:text-aurora/80 disabled:text-mist/25 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
        >
          <span className="text-base leading-none">+</span> Simpan
        </button>
      </div>

      {favorites.length === 0 ? (
        <p className="text-xs text-mist/35 leading-relaxed">
          Belum ada lokasi favorit. Cari kota lalu tekan "Simpan" untuk menyimpannya di sini.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 border transition-colors cursor-pointer group ${
                activeId === fav.id
                  ? 'bg-aurora/10 border-aurora/40'
                  : 'bg-dusk/60 border-slate-750 hover:border-slate-750/80'
              }`}
              onClick={() => onSelect(fav)}
            >
              <div>
                <p className={`text-sm ${activeId === fav.id ? 'text-aurora' : 'text-mist'}`}>{fav.name}</p>
                <p className="text-[10px] text-mist/35">{[fav.admin1, fav.country].filter(Boolean).join(', ')}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove(fav.id)
                }}
                className="text-mist/20 hover:text-ember transition-colors opacity-0 group-hover:opacity-100 text-lg leading-none px-1"
                title="Hapus"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
