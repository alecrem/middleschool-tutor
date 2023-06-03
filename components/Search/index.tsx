import { FC, useState } from 'react'
import {
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Link
} from '@chakra-ui/react'
import {
  CheckCircleIcon,
  NotAllowedIcon,
  ExternalLinkIcon
} from '@chakra-ui/icons'
import type { LegalCards, ListAsProps } from '@/utils/dataTypes'
import { useIsLegal } from '@/hooks/useIsLegal'

interface Props {
  legalcards: LegalCards
}

const Search: FC<Props> = (props) => {
  const legalCards = props.legalcards
  const [searchBox, setSearchBox] = useState('')
  const [exactMatch, setExactMatch] = useState('')
  const [cardIsLegal, setCardIsLegal] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const { isLegal } = useIsLegal(legalCards)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExactMatch('')
    const { value } = event.target
    const newSearchBox = value.trim().toLowerCase()
    setSearchBox(newSearchBox)
    if (newSearchBox.length < 1) {
      setSuggestions([])
      return
    }
    if (typeof newSearchBox == 'string') setCardIsLegal(isLegal(newSearchBox))
    setSuggestions(suggestCards(newSearchBox))
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

  const suggestCards = (searchTerm: string, limit: number = 40) => {
    let occurences = findOccurrences(searchTerm, legalCards.name, limit)
    if (occurences.length > 0) return occurences
    return findOccurrences(searchTerm, legalCards.name_ja, limit)
  }

  const placeholderIndex = ~~(
    Math.random() * Object.keys(legalCards.name).length
  )
  const placeholder = legalCards.name[placeholderIndex]

  return (
    <>
      <InputGroup mt="2em">
        <Input
          name="searchBox"
          placeholder={placeholder}
          onChange={handleChange}
        />
        <InputRightElement>
          {cardIsLegal ? (
            <>
              <Link
                href={
                  'https://scryfall.com/search?q=' +
                  encodeURIComponent('prefer:oldest !"' + exactMatch + '"')
                }
                isExternal
              >
                <CheckCircleIcon color="green.500" />
                <ExternalLinkIcon mx="2px" />
              </Link>
            </>
          ) : (
            <NotAllowedIcon color="red.500" />
          )}
        </InputRightElement>
      </InputGroup>
      <List spacing={3} mt="1em">
        {suggestions.map((e) => {
          return (
            <ListItem key={e}>
              <CheckCircleIcon color="green.500" /> &nbsp;
              <Link
                href={
                  'https://scryfall.com/search?q=' +
                  encodeURIComponent('prefer:oldest !"' + e + '"')
                }
                isExternal
              >
                {e} <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

export { Search }