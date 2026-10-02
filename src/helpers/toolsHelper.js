/**
 * Memuat SweetAlert2 hanya ketika dialog benar-benar dibutuhkan.
 */
async function getSwal() {
  const module = await import('sweetalert2')
  return module.default
}

/**
 * Menampilkan dialog sukses.
 */
export async function showSuccessDialog(
  message = 'Data berhasil disimpan.',
  title = 'Berhasil',
) {
  const Swal = await getSwal()

  return Swal.fire({
    icon: 'success',
    title,
    text: message,
    confirmButtonText: 'OK',
  })
}

/**
 * Menampilkan dialog error.
 */
export async function showErrorDialog(
  message = 'Terjadi kesalahan.',
  title = 'Error',
) {
  const Swal = await getSwal()

  return Swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonText: 'OK',
  })
}

/**
 * Menampilkan dialog konfirmasi.
 *
 * Mengembalikan true jika user memilih "Ya".
 */
export async function showConfirmDialog(
  message = 'Apakah Anda yakin ingin melanjutkan?',
  title = 'Konfirmasi',
) {
  const Swal = await getSwal()

  const result = await Swal.fire({
    icon: 'warning',
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Batal',
    reverseButtons: true,
  })

  return result.isConfirmed
}

/**
 * Memformat tanggal dan waktu ke format Indonesia.
 */
export function formatDate(
  date,
  options = {},
) {
  if (!date) {
    return '-'
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return '-'
  }

  const defaultOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      ...defaultOptions,
      ...options,
    },
  ).format(parsedDate)
}