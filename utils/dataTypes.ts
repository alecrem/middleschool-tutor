interface CardsProps {
  legalCards: LegalCards
}
interface LegalCards {
  oracle_id: ListAsProps
  name: ListAsProps
  name_ja: ListAsProps
  banned: ListBoolean
}
interface ListAsProps {
  [x: string]: string
}
interface ListBoolean {
  [x: string]: boolean
}
export type { CardsProps, LegalCards, ListAsProps, ListBoolean }
