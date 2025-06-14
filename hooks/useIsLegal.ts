import type { LegalCards, ListAsProps } from '@/utils/dataTypes'

const useIsLegal = (legalCards: LegalCards) => {
  const isLegal = (newSearchBox: string, lang?: string) => {
    if (lang === undefined || lang == 'en') {
      const englishMatch = inObject(newSearchBox, legalCards.name)
      if (englishMatch.length > 0) {
        const matchIndex = findMatchIndex(newSearchBox, legalCards.name)
        const isBanned =
          matchIndex !== -1 && legalCards.banned[matchIndex] === true
        return {
          legal: !isBanned,
          exactMatch: englishMatch,
          lang: 'en',
          banned: isBanned
        }
      }
    }
    if (lang === undefined || lang == 'ja') {
      const japaneseMatch = inObject(newSearchBox, legalCards.name_ja)
      if (japaneseMatch.length > 0) {
        const matchIndex = findMatchIndex(newSearchBox, legalCards.name_ja)
        const isBanned =
          matchIndex !== -1 && legalCards.banned[matchIndex] === true
        return {
          legal: !isBanned,
          exactMatch: japaneseMatch,
          lang: 'ja',
          banned: isBanned
        }
      }
    }
    return { legal: false, banned: false, exactMatch: '', lang: '' }
  }

  const inObject = (needleTerm: string, hayObject: ListAsProps) => {
    const keys = Object.keys(hayObject)
    for (let i = 0; i < keys.length; i++) {
      const key: string = keys[i]
      let cardWeAreChecking = hayObject[key]
      if (cardWeAreChecking === null) {
        continue
      }
      if (needleTerm == cardWeAreChecking.toLowerCase()) {
        return cardWeAreChecking
      }
    }
    return ''
  }

  const findMatchIndex = (needleTerm: string, hayObject: ListAsProps) => {
    const keys = Object.keys(hayObject)
    for (let i = 0; i < keys.length; i++) {
      const key: string = keys[i]
      let cardWeAreChecking = hayObject[key]
      if (cardWeAreChecking === null) {
        continue
      }
      if (needleTerm == cardWeAreChecking.toLowerCase()) {
        return key
      }
    }
    return -1
  }

  return { isLegal }
}

export { useIsLegal }
