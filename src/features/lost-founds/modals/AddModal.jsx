import { useState } from 'react'
import { IconX } from '@tabler/icons-react'

function AddModal({ open, onClose, onSubmit, loading }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('lost')

  if (!open) return null

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!title.trim() || !description.trim()) return

    await onSubmit({
      title,
      description,
      status,
    })

    setTitle('')
    setDescription('')
    setStatus('lost')
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Tambah Laporan
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Buat laporan barang hilang atau ditemukan.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
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
              placeholder="Contoh: Dompet hitam"
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
              placeholder="Jelaskan ciri-ciri barang..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              Jenis Laporan
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus('lost')}
                className={`rounded-xl border p-3 text-sm font-bold ${
                  status === 'lost'
                    ? 'border-red-300 bg-red-50 text-red-600'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                Barang Hilang
              </button>

              <button
                type="button"
                onClick={() => setStatus('found')}
                className={`rounded-xl border p-3 text-sm font-bold ${
                  status === 'found'
                    ? 'border-green-300 bg-green-50 text-green-600'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                Barang Ditemukan
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-bold text-slate-600"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-yellow-400 px-4 py-3 font-bold text-slate-900 hover:bg-yellow-300 disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Simpan Laporan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddModal