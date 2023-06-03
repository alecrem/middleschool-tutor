import type { LegalCards, ListAsProps } from '@/utils/dataTypes'

const useSuggestCards = (legalCards: LegalCards) => {
  const suggestCards = (searchTerm: string, limit: number = 40) => {
    let occurences = findOccurrences(searchTerm, legalCards.name, limit)
    if (occurences.length > 0) return occurences
    return findOccurrences(searchTerm, legalCards.name_ja, limit)
  }

  const findOccurrences = (
    needleTerm: string,
    hayObject: ListAsProps,
    limit: number = 40
  ) => {
    let occurrences: string[] = []
    const keys = Object.keys(hayObject)
    for (let i = 0; i < keys.length; i++) {
      const key: string = keys[i]
      let cardWeAreChecking = hayObject[key]
      if (cardWeAreChecking === null) {
        continue
      }
      if (cardWeAreChecking.toLowerCase().indexOf(needleTerm) != -1) {
        occurrences.push(cardWeAreChecking)
        if (occurrences.length >= limit) break
      }
    }
    return occurrences
  }

  return { suggestCards }
}

export { useSuggestCards }
