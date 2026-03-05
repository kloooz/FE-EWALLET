export function formatRupiah(number = 0) {
  const n = Number(number) || 0
  return 'Rp ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export default formatRupiah
