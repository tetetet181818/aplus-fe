interface FormatArabicDateOptions {
  hijri?: boolean
  time?: boolean
  seconds?: boolean
  weekday?: boolean
  monthName?: boolean
}

export default function formatArabicDate(
  date: Date | string | number,
  options: FormatArabicDateOptions = {}
): string {
  const {
    hijri = false,
    time = true,
    seconds = false,
    weekday = false,
    monthName = true,
  } = options

  const d: Date = date instanceof Date ? date : new Date(date)

  if (isNaN(d.getTime())) {
    return 'تاريخ غير صالح'
  }

  const arabicNumerals: string[] = [
    '٠',
    '١',
    '٢',
    '٣',
    '٤',
    '٥',
    '٦',
    '٧',
    '٨',
    '٩',
  ]

  const toArabicNumbers = (num: string | number): string => {
    return num
      .toString()
      .replace(/\d/g, (digit) => arabicNumerals[parseInt(digit, 10)])
  }

  const gregorianMonths: string[] = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ]

  const hijriMonths: string[] = [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الثاني',
    'جمادى الأولى',
    'جمادى الآخرة',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة',
  ]

  const weekdays: string[] = [
    'الأحد',
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ]

  const formatTime = (): string => {
    let hours: number = d.getHours()
    const minutes: number = d.getMinutes()
    const ampm: string = hours >= 12 ? 'م' : 'ص'

    hours = hours % 12
    hours = hours ? hours : 12

    let timeStr: string = `${toArabicNumbers(hours)}:${toArabicNumbers(
      minutes.toString().padStart(2, '0')
    )} ${ampm}`

    if (seconds) {
      const secs: number = d.getSeconds()
      timeStr = `${toArabicNumbers(hours)}:${toArabicNumbers(
        minutes.toString().padStart(2, '0')
      )}:${toArabicNumbers(secs.toString().padStart(2, '0'))} ${ampm}`
    }

    return timeStr
  }

  const formatGregorian = (): string => {
    const day: number = d.getDate()
    const month: number = d.getMonth()
    const year: number = d.getFullYear()
    const weekdayNum: number = d.getDay()

    let dateStr = ''

    if (weekday) {
      dateStr += `${weekdays[weekdayNum]}، `
    }

    dateStr += `${toArabicNumbers(day)} `

    if (monthName) {
      dateStr += `${gregorianMonths[month]} `
    } else {
      dateStr += `${toArabicNumbers(month + 1)}/`
    }

    dateStr += toArabicNumbers(year)

    return dateStr
  }

  const formatHijri = (): string => {
    const gregDate: Date = new Date(d)
    const hijriDate: Date = new Date(gregDate.getTime() - 1.5e11) // تقريب تقريبي

    const day: number = hijriDate.getDate()
    const month: number = hijriDate.getMonth()
    const year: number = hijriDate.getFullYear() - 579 // فرق تقريبي
    const weekdayNum: number = hijriDate.getDay()

    let dateStr = ''

    if (weekday) {
      dateStr += `${weekdays[weekdayNum]}، `
    }

    dateStr += `${toArabicNumbers(day)} `

    if (monthName) {
      dateStr += `${hijriMonths[month]} `
    } else {
      dateStr += `${toArabicNumbers(month + 1)}/`
    }

    dateStr += toArabicNumbers(year)

    return dateStr + ' هـ'
  }

  let formattedDate: string = hijri ? formatHijri() : formatGregorian()

  if (time) {
    formattedDate += ` - ${formatTime()}`
  }

  return formattedDate
}
