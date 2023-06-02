interface CardsProps {
  legalCards: LegalCards
}
interface LegalCards {
  oracle_id: ListAsProps
  name: ListAsProps
  name_ja: ListAsProps
}
interface ListAsProps {
  [x: string]: string
}
export type { CardsProps, LegalCards, ListAsProps }
