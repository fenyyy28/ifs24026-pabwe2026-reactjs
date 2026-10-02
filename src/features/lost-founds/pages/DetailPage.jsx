import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import {
  IconArrowLeft,
  IconEdit,
  IconPhoto,
  IconTrash,
  IconUser,
  IconCalendar,
  IconCheck,
  IconClock,
} from '@tabler/icons-react'

import {
  showSuccessDialog,
  showConfirmDialog,
} from '../../../helpers/toolsHelper'

import ChangeModal from '../modals/ChangeModal'
import ChangeCoverModal from '../modals/ChangeCoverModal'

import {
  isLostFoundDetail,
  isLostFoundChange,
  isLostFoundChangeCover,
  isLostFoundDelete,
} from '../states/lostFoundThunks'

function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    lostFound,
    isProfile,
    isLostFoundChange: loadingChange,
    isLostFoundChangeCover: loadingCover,
    isLostFoundDelete: loadingDelete,
  } = useSelector((state) => state.lostFounds)

  const [changeOpen, setChangeOpen] = useState(false)
  const [coverOpen, setCoverOpen] = useState(false)

  useEffect(() => {
    dispatch(isLostFoundDetail(id))
  }, [dispatch, id])

  const handleChange = async (data) => {
    const result = await dispatch(isLostFoundChange(data))

    if (isLostFoundChange.fulfilled.match(result)) {
      setChangeOpen(false)

      await showSuccessDialog(
        'Laporan berhasil diperbarui.',
        'Berhasil',
      )

      dispatch(isLostFoundDetail(id))
    }
  }

  const handleCover = async (file) => {
    const result = await dispatch(
      isLostFoundChangeCover({
        id,
        cover: file,
      }),
    )

    if (isLostFoundChangeCover.fulfilled.match(result)) {
      setCoverOpen(false)

      await showSuccessDialog(
        'Cover berhasil diperbarui.',
        'Berhasil',
      )

      dispatch(isLostFoundDetail(id))
    }
  }

  const handleDelete = async () => {
    const confirmed = await showConfirmDialog(
      'Data laporan yang dihapus tidak dapat dikembalikan.',
      'Hapus laporan?',
    )

    if (!confirmed) {
      return
    }

    const result = await dispatch(
      isLostFoundDelete(Number(id)),
    )

    if (isLostFoundDelete.fulfilled.match(result)) {
      await showSuccessDialog(
        'Laporan berhasil dihapus.',
        'Berhasil',
      )

      navigate('/')
    }
  }

  if (isProfile || !lostFound) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-semibold text-slate-500">
          Memuat detail laporan...
        </p>
      </div>
    )
  }

  const imageUrl = lostFound.cover
    ? `https://open-api.delcom.org/${lostFound.cover}`
    : null

  return (
    <>
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Tombol kembali */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 hover:bg-white"
          aria-label="Kembali ke halaman utama"
        >
          <IconArrowLeft
            size={18}
            aria-hidden="true"
          />

          Kembali
        </button>

        {/* Detail laporan */}
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          {/* Cover */}
          <div className="relative h-72 bg-slate-100 md:h-96">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={lostFound.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-300">
                <IconPhoto
                  size={70}
                  aria-hidden="true"
                />
              </div>
            )}

            {/* Status */}
            <span
              className={`absolute left-5 top-5 rounded-full px-4 py-2 text-sm font-bold ${
                lostFound.status === 'lost'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {lostFound.status === 'lost'
                ? 'Barang Hilang'
                : 'Barang Ditemukan'}
            </span>
          </div>

          {/* Informasi */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row">
              <div>
                <h1 className="text-3xl font-black text-slate-900">
                  {lostFound.title}
                </h1>

                {/* Status selesai */}
                <div className="mt-3 flex flex-wrap gap-3">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold ${
                      Number(lostFound.is_completed) === 1
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {Number(lostFound.is_completed) === 1 ? (
                      <IconCheck
                        size={16}
                        aria-hidden="true"
                      />
                    ) : (
                      <IconClock
                        size={16}
                        aria-hidden="true"
                      />
                    )}

                    {Number(lostFound.is_completed) === 1
                      ? 'Selesai'
                      : 'Dalam Proses'}
                  </span>
                </div>
              </div>

              {/* Tombol aksi */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCoverOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold hover:bg-slate-50"
                >
                  <IconPhoto
                    size={18}
                    aria-hidden="true"
                  />

                  Cover
                </button>

                <button
                  type="button"
                  onClick={() => setChangeOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-bold hover:bg-yellow-300"
                >
                  <IconEdit
                    size={18}
                    aria-hidden="true"
                  />

                  Edit
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loadingDelete}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <IconTrash
                    size={18}
                    aria-hidden="true"
                  />

                  {loadingDelete ? 'Menghapus...' : 'Hapus'}
                </button>
              </div>
            </div>

            {/* Informasi pelapor dan tanggal */}
            <div className="mt-8 grid gap-4 border-y border-slate-100 py-5 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <IconUser
                    size={20}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Pelapor
                  </p>

                  <p className="text-sm font-bold">
                    {lostFound.author?.name || 'Pengguna'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <IconCalendar
                    size={20}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Tanggal Lapor
                  </p>

                  <p className="text-sm font-bold">
                    {new Date(
                      lostFound.created_at,
                    ).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="mt-7">
              <h2 className="text-lg font-extrabold">
                Deskripsi
              </h2>

              <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">
                {lostFound.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal edit laporan */}
      <ChangeModal
        open={changeOpen}
        onClose={() => setChangeOpen(false)}
        onSubmit={handleChange}
        loading={loadingChange}
        data={lostFound}
      />

      {/* Modal ganti cover */}
      <ChangeCoverModal
        open={coverOpen}
        onClose={() => setCoverOpen(false)}
        onSubmit={handleCover}
        loading={loadingCover}
      />
    </>
  )
}

export default DetailPage