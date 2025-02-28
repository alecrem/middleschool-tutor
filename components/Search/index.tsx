import { FC, useState } from 'react'
import { Input, List, Link } from '@chakra-ui/react'
import { LuCircleCheck, LuBan } from 'react-icons/lu'
import type { LegalCards } from '@/utils/dataTypes'
import { useIsLegal } from '@/hooks/useIsLegal'
import { useSuggestCards } from '@/hooks/useSuggestCards'
import { LuExternalLink } from 'react-icons/lu'
import { InputGroup } from '../ui/input-group'

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
      <InputGroup
        mt="2em"
        endElement={
          cardIsLegal ? (
            <>
              <Link
                href={
                  'https://scryfall.com/search?q=' +
                  encodeURIComponent('prefer:oldest !"' + exactMatch + '"')
                }
              >
                <LuCircleCheck color="green.500" />
                <LuExternalLink />
              </Link>
            </>
          ) : (
            <LuBan color="red.500" />
          )
        }
      >
        <Input placeholder={placeholder} onChange={handleChange} />
      </InputGroup>
      <List.Root gap={3} mt="1em">
        {suggestions.map((e) => {
          return (
            <List.Item key={e}>
              <LuCircleCheck color="green.500" /> &nbsp;
              <Link
                href={
                  'https://scryfall.com/search?q=' +
                  encodeURIComponent('prefer:oldest !"' + e + '"')
                }
              >
                {e} <LuExternalLink />
              </Link>
            </List.Item>
          )
        })}
      </List.Root>
    </>
  )
}

export { Search }
