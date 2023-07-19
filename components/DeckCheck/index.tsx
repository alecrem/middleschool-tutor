import { FC, useState, useRef } from 'react'
import useTranslation from 'next-translate/useTranslation'
import {
  InputGroup,
  Textarea,
  List,
  ListItem,
  Box,
  Button
} from '@chakra-ui/react'
import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons'
import type { LegalCards } from '@/utils/dataTypes'
import { useIsLegal } from '@/hooks/useIsLegal'
import { useSuggestCards } from '@/hooks/useSuggestCards'

interface Props {
  legalcards: LegalCards
}
type CardListItem = {
  name: string
  legal: boolean
  lang?: string
}

const DeckCheck: FC<Props> = (props) => {
  const { t } = useTranslation('common')
  const legalCards = props.legalcards
  const { isLegal } = useIsLegal(legalCards)
  const [mainDeck, setMainDeck] = useState<CardListItem[]>([])
  const [textAreaInput, setTextAreaInput] = useState<string>()
  const { suggestCards } = useSuggestCards(legalCards)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const textareaRef = useRef<null | HTMLTextAreaElement>(null)

  const handleListChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    validateDeckList(value)
    setTextAreaInput(value)
    suggest(value)
  }
  const validateDeckList = (newSearchBox?: string) => {
    if (newSearchBox === undefined || newSearchBox.length < 1) {
      return
    }
    const newMainDeck = newSearchBox
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => {
        const cardName = line.replace(/^[0-9]+ /g, '').trim()
        const isLegalRet = isLegal(cardName.toLowerCase().trim())
        return {
          name: isLegalRet.exactMatch ?? cardName,
          legal: isLegalRet.legal,
          lang: isLegalRet.lang
        }
      })
    setMainDeck(newMainDeck)
  }

  const deckNotLegal = () => mainDeck.filter((card) => !card.legal).length > 0

  const suggest = (value: string) => {
    const lastLine = value.split('\n').slice(-1)[0]
    const cardInput = lastLine.replace(/^[0-9]+ /g, '').trim()
    let cardCopies: number = Number(
      lastLine.replace(/^([0-9]+) .*$/, '$1').trim()
    )
    if (isNaN(cardCopies)) cardCopies = 1

    const newSearchBox = cardInput.trim().toLowerCase()
    if (newSearchBox.length < 1) {
      setSuggestions([])
      return
    }
    setSuggestions(suggestCards(newSearchBox))
  }

  const handleSuggestionClick = (suggestion: string) => {
    const originalLines: string[] = textAreaInput?.split('\n') || []
    let allLinesButLast: string[] = originalLines?.slice(0, -1)
    allLinesButLast.push(`1 ${suggestion}`)
    allLinesButLast.push('')
    const newDeckList = allLinesButLast.join('\n')
    setTextAreaInput(newDeckList)
    validateDeckList(newDeckList)
    setSuggestions([])
    const current = textareaRef.current
    if (current === null) return
    current.focus()
  }

  const placeholderIndex = ~~(
    Math.random() * Object.keys(legalCards.name).length
  )
  const placeholder = '4 ' + legalCards.name[placeholderIndex]

  return (
    <Box mt="1em">
      <InputGroup>
        <Box mt="1em">
          {deckNotLegal() ? (
            <>
              <NotAllowedIcon color="red.500" /> {t('deckcheck.illegal')}
            </>
          ) : (
            <>
              <CheckCircleIcon color="green.500" /> {t('deckcheck.legal')}
            </>
          )}
        </Box>
      </InputGroup>
      <InputGroup mt="1em">
        <Textarea
          name={textAreaInput}
          value={textAreaInput}
          placeholder={placeholder}
          rows={15}
          ref={textareaRef}
          onChange={handleListChange}
        />
      </InputGroup>
      {/* {exactMatch.length <= 0 && ( */}
      <Box mt="1em">
        {suggestions.map((e) => {
          return (
            <Button
              key={e}
              mr={2}
              mb={2}
              variant={'outline'}
              size={'sm'}
              onClick={() => handleSuggestionClick(e)}
            >
              {e}
            </Button>
          )
        })}
      </Box>
      {/* )} */}

      {deckNotLegal() && <Box mt="1em">{t('deckcheck.illegal-list')}</Box>}
      <List>
        {mainDeck
          .filter((card) => !card.legal)
          .map((card) => {
            return (
              <ListItem key={card.name}>
                <NotAllowedIcon color="red.500" /> {card.name}
              </ListItem>
            )
          })}
      </List>
    </Box>
  )
}

export { DeckCheck }
