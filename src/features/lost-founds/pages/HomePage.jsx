import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  IconPlus,
  IconSearch,
  IconPackage,
  IconAlertTriangle,
  IconCheck,
  IconBox,
  IconEye,
} from '@tabler/icons-react'

import AddModal from '../modals/AddModal'

import {
  isLostFound,
  isLostFoundAdd,
  isLostFoundStats,
} from '../states/lostFoundThunks'

function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    lostFounds,
    isLostFoundAdd: loadingAdd,
    isLostFoundAdded,
    lostFoundStats,
    isLoading,
  } = useSelector((state) => state.lostFounds)

  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [completedFilter, setCompletedFilter] = useState('all')

  useEffect(() => {
    dispatch(isLostFound())
    dispatch(isLostFoundStats())
  }, [dispatch])

  useEffect(() => {
    if (isLostFoundAdded) {
      setModalOpen(false)
      dispatch(isLostFound())
    }
  }, [isLostFoundAdded, dispatch])

  const filteredData = useMemo(() => {
    return lostFounds.filter((item) => {
      const keyword = search.toLowerCase()

      const matchesSearch =
        item.title?.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword)

      const matchesStatus =
        statusFilter === 'all' ||
        item.status === statusFilter

      const matchesCompleted =
        completedFilter === 'all' ||
        Number(item.is_completed) === Number(completedFilter)

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCompleted
      )
    })
  }, [
    lostFounds,
    search,
    statusFilter,
    completedFilter,
  ])

  const total = lostFounds.length

  const lost = lostFounds.filter(
    (item) => item.status === 'lost'
  ).length

  const found = lostFounds.filter(
    (item) => item.status === 'found'
  ).length

  const completed = lostFounds.filter(
    (item) => Number(item.is_completed) === 1
  ).length

  const stats = [
    {
      label: 'Total Laporan',
      value: total,
      icon: IconPackage,
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
    },
    {
      label: 'Barang Hilang',
      value: lost,
      icon: IconAlertTriangle,
      bg: 'bg-red-100',
      text: 'text-red-700',
    },
    {
      label: 'Barang Ditemukan',
      value: found,
      icon: IconBox,
      bg: 'bg-blue-100',
      text: 'text-blue-700',
    },
    {
      label: 'Selesai',
      value: completed,
      icon: IconCheck,
      bg: 'bg-green-100',
      text: 'text-green-700',
    },
  ]

  const handleAdd = async (data) => {
    await dispatch(isLostFoundAdd(data))
  }

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <section className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-yellow-800">
              Dashboard
            </p>

            <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
              Lost &amp; Founds
            </h2>

            <p className="mt-1 text-slate-500">
              Kelola laporan barang hilang dan barang ditemukan.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-bold text-slate-900 shadow-sm hover:bg-yellow-300"
          >
            <IconPlus size={20} aria-hidden="true" />
            Tambah Laporan
          </button>
        </section>

        {/* Statistik */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {item.label}
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-900">
                      {item.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bg} ${item.text}`}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        {/* Search dan Filter */}
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="relative flex-1">
              <IconSearch
                size={19}
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari laporan..."
                aria-label="Cari laporan"
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter jenis barang"
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none"
              >
                <option value="all">Semua Jenis</option>
                <option value="lost">Barang Hilang</option>
                <option value="found">Barang Ditemukan</option>
              </select>

              <select
                value={completedFilter}
                onChange={(e) => setCompletedFilter(e.target.value)}
                aria-label="Filter status barang"
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none"
              >
                <option value="all">Semua Status</option>
                <option value="0">Belum Selesai</option>
                <option value="1">Selesai</option>
              </select>

            </div>
          </div>
        </section>

        {/* Daftar laporan */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Daftar Laporan
              </h3>

              <p className="text-sm text-slate-500">
                {filteredData.length} laporan ditemukan
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <p className="font-semibold text-slate-500">
                Memuat laporan...
              </p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

              <IconPackage
                size={42}
                aria-hidden="true"
                className="mx-auto text-slate-300"
              />

              <h4 className="mt-4 font-bold text-slate-700">
                Belum ada laporan
              </h4>

              <p className="mt-1 text-sm text-slate-500">
                Coba ubah filter atau tambahkan laporan baru.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-44 bg-slate-100">

                    {item.cover ? (
                      <img
                        src={`https://open-api.delcom.org/${item.cover}`}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <IconPackage
                          size={44}
                          aria-hidden="true"
                          className="text-slate-300"
                        />
                      </div>
                    )}

                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
                        item.status === 'lost'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {item.status === 'lost'
                        ? 'Hilang'
                        : 'Ditemukan'}
                    </span>

                    {Number(item.is_completed) === 1 && (
                      <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-green-700 shadow">
                        Selesai
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h4 className="truncate text-lg font-extrabold text-slate-900">
                      {item.title}
                    </h4>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-xs text-slate-400">
                          Dilaporkan oleh
                        </p>

                        <p className="text-sm font-bold text-slate-700">
                          {item.author?.name || 'Pengguna'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/lost-founds/${item.id}`)
                        }
                        aria-label={`Lihat detail ${item.title}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-yellow-100"
                      >
                        <IconEye size={17} aria-hidden="true" />
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Statistik harian */}
        {lostFoundStats?.daily && (
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900">
              Statistik Harian
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Ringkasan data laporan dari API Delcom.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Object.entries(
                lostFoundStats.daily.stats_losts || {}
              )
                .slice(-4)
                .map(([date, value]) => (
                  <div
                    key={date}
                    className="rounded-xl bg-slate-50 p-4"
                  >
                    <p className="text-xs text-slate-500">
                      {date}
                    </p>

                    <p className="mt-1 text-2xl font-black text-slate-900">
                      {value}
                    </p>

                    <p className="text-xs text-slate-500">
                      barang hilang
                    </p>
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>

      <AddModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAdd}
        loading={loadingAdd}
      />
    </>
  )
}

export default HomePage