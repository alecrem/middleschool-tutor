import type { LegalCards, ListAsProps } from '@/utils/dataTypes'

const useIsLegal = (legalCards: LegalCards) => {
  const isLegal = (newSearchBox: string, lang?: string) => {
    if (lang === undefined || lang == 'en') {
      const englishMatch = inObject(newSearchBox, legalCards.name)
      if (englishMatch.length > 0) {
        return { legal: true, exactMatch: englishMatch, lang: 'en' }
      }
    }
    if (lang === undefined || lang == 'ja') {
      const japaneseMatch = inObject(newSearchBox, legalCards.name_ja)
      if (japaneseMatch.length > 0) {
        return { legal: true, exactMatch: japaneseMatch, lang: 'ja' }
      }
    }
    return { legal: false }
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

  return { isLegal }
}

export { useIsLegal }
