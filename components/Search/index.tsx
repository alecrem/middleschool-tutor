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
import { useSuggestCards } from '@/hooks/useSuggestCards'

interface Props {
  legalcards: LegalCards
}

const Search: FC<Props> = (props) => {
  const legalCards = props.legalcards
  const [exactMatch, setExactMatch] = useState('')
  const [cardIsLegal, setCardIsLegal] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const { isLegal } = useIsLegal(legalCards)
  const { suggestCards } = useSuggestCards(legalCards)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExactMatch('')
    const { value } = event.target
    const newSearchBox = value.trim().toLowerCase()
    if (newSearchBox.length < 1) {
      setSuggestions([])
      return
    }
    if (typeof newSearchBox == 'string') {
      const isLegalRet = isLegal(newSearchBox)
      setCardIsLegal(isLegalRet.legal)
      setExactMatch(isLegalRet.exactMatch ?? '')
    }
    setSuggestions(suggestCards(newSearchBox))
  }

  const placeholderIndex = ~~(
    Math.random() * Object.keys(legalCards.name).length
  )
  const placeholder = legalCards.name[placeholderIndex]

  return (
    <>
      <InputGroup mt="2em">
        <Input placeholder={placeholder} onChange={handleChange} />
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
