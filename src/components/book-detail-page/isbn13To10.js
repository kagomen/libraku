export function isbn13To10(isbn13) {
  // 最初の3桁（978または979）を削除
  let isbn10 = isbn13.slice(3, 12)

  // チェックディジットを計算
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(isbn10[i]) * (10 - i)
  }
  let checkDigit = (11 - (sum % 11)) % 11
  checkDigit = checkDigit === 10 ? 'X' : checkDigit.toString()

  // チェックディジットを追加
  isbn10 += checkDigit

  return isbn10
}
