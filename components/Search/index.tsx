import { FC, useState } from 'react'
import { Icon, Input, List, Link } from '@chakra-ui/react'
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
                <Icon color="green.500">
                  <LuCircleCheck />
                </Icon>
                <Icon>
                  <LuExternalLink />
                </Icon>
              </Link>
            </>
          ) : (
            <Icon color="red.500">
              <LuBan />
            </Icon>
          )
        }
      >
        <Input placeholder={placeholder} onChange={handleChange} />
      </InputGroup>
      <List.Root variant="plain" gap={3} mt="1em">
        {suggestions.map((e) => {
          return (
            <List.Item key={e}>
              <List.Indicator asChild color="green.500">
                <LuCircleCheck />
              </List.Indicator>
              <Link
                href={
                  'https://scryfall.com/search?q=' +
                  encodeURIComponent('prefer:oldest !"' + e + '"')
                }
              >
                {e}
                <Icon>
                  <LuExternalLink />
                </Icon>
              </Link>
            </List.Item>
          )
        })}
      </List.Root>
    </>
  )
}

export { Search }
