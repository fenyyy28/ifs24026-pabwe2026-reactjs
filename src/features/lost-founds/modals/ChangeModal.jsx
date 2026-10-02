import { useEffect, useState } from 'react'
import { IconX } from '@tabler/icons-react'

function ChangeModal({
  open,
  onClose,
  onSubmit,
  loading,
  data,
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('lost')
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (!data) return

    setTitle(data.title || '')
    setDescription(data.description || '')
    setStatus(data.status || 'lost')
    setIsCompleted(Number(data.is_completed) === 1)
  }, [data])

  if (!open) return null

  const handleSubmit = async (event) => {
    event.preventDefault()

    await onSubmit({
      id: data.id,
      title,
      description,
      status,
      isCompleted,
    })
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-xl font-extrabold">
              Ubah Laporan
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Perbarui informasi laporan.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <IconX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-bold">
              Judul
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              Deskripsi
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-yellow-400"
            >
              <option value="lost">Barang Hilang</option>
              <option value="found">Barang Ditemukan</option>
            </select>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              className="h-5 w-5 accent-yellow-400"
            />

            <div>
              <p className="text-sm font-bold">
                Laporan sudah selesai
              </p>

              <p className="text-xs text-slate-500">
                Tandai jika barang sudah ditemukan/diselesaikan.
              </p>
            </div>
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-bold"
            >
              Batal
            </button>

            <button
              disabled={loading}
              className="flex-1 rounded-xl bg-yellow-400 px-4 py-3 font-bold disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangeModal