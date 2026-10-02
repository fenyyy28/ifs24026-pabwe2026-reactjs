import { useEffect, useState } from 'react'
import { IconPhoto, IconX } from '@tabler/icons-react'

function ChangeCoverModal({
  open,
  onClose,
  onSubmit,
  loading,
}) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')

  useEffect(() => {
    if (!file) {
      setPreview('')
      return
    }

    const url = URL.createObjectURL(file)
    setPreview(url)

    return () => URL.revokeObjectURL(url)
  }, [file])

  if (!open) return null

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!file) return

    await onSubmit(file)

    setFile(null)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <h2 className="text-xl font-extrabold">
            Ganti Cover
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <IconX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center hover:border-yellow-400">
            <IconPhoto size={32} className="text-slate-400" />

            <span className="mt-3 text-sm font-bold">
              Pilih gambar
            </span>

            <span className="mt-1 text-xs text-slate-500">
              JPG, JPEG, PNG
            </span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          {preview && (
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <img
                src={preview}
                alt="Preview"
                className="h-56 w-full object-cover"
              />
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-bold"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={!file || loading}
              className="flex-1 rounded-xl bg-yellow-400 px-4 py-3 font-bold disabled:opacity-50"
            >
              {loading ? 'Mengunggah...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangeCoverModal