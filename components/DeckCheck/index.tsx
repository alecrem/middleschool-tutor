import { FC, useState } from 'react'
import {
  InputGroup,
  Textarea,
  List,
  ListItem,
  Switch,
  Box
} from '@chakra-ui/react'
import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons'
import type { LegalCards } from '@/utils/dataTypes'
import { useIsLegal } from '@/hooks/useIsLegal'

interface Props {
  legalcards: LegalCards
}
type CardListItem = {
  name: string
  legal: boolean
  lang?: string
}

const DeckCheck: FC<Props> = (props) => {
  const legalCards = props.legalcards
  const { isLegal } = useIsLegal(legalCards)
  const [mainDeck, setMainDeck] = useState<CardListItem[]>([])
  const [cardLang, setCardLang] = useState('en')
  const [textAreaInput, setTextAreaInput] = useState<string>()

  const handleLangSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lang = event.target.checked ? 'ja' : 'en'
    setCardLang(lang)
    validateDeckList(lang, textAreaInput)
  }
  const handleListChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    validateDeckList(cardLang, value)
    setTextAreaInput(value)
  }
  const validateDeckList = (lang: string, newSearchBox?: string) => {
    if (newSearchBox === undefined || newSearchBox.length < 1) {
      return
    }
    const newMainDeck = newSearchBox
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => {
        const cardName = line.replace(/^[0-9]+ /g, '').trim()
        const isLegalRet = isLegal(cardName.toLowerCase().trim(), lang)
        return {
          name: isLegalRet.exactMatch ?? cardName,
          legal: isLegalRet.legal,
          lang: isLegalRet.lang
        }
      })
    setMainDeck(newMainDeck)
  }

  const deckNotLegal = () => mainDeck.filter((card) => !card.legal).length > 0
  const cardLangString = () => (cardLang === 'en' ? 'English' : 'Japanese')

  const placeholderIndex = ~~(
    Math.random() * Object.keys(legalCards.name).length
  )
  const placeholder =
    '4 ' +
    (cardLang === 'ja' && legalCards.name_ja[placeholderIndex] !== null
      ? legalCards.name_ja[placeholderIndex]
      : legalCards.name[placeholderIndex])

  return (
    <Box mt="1em">
      <InputGroup>
        <Box>
          <Switch onChange={handleLangSwitch}>
            {cardLangString()} card names
          </Switch>
        </Box>
      </InputGroup>
      <InputGroup>
        <Box mt="1em">
          {deckNotLegal() ? (
            <>
              <NotAllowedIcon color="red.500" /> This {cardLangString()} list is
              not Middle School legal
            </>
          ) : (
            <>
              <CheckCircleIcon color="green.500" /> This {cardLangString()} list
              is Middle School legal
            </>
          )}
        </Box>
      </InputGroup>
      <InputGroup mt="1em">
        {textAreaInput}
        <Textarea
          name={textAreaInput}
          placeholder={placeholder}
          rows={15}
          onChange={handleListChange}
        />
      </InputGroup>
      {deckNotLegal() && (
        <>
          <Box mt="1em">
            The following {cardLangString()} card names are not Middle School
            legal:
          </Box>
        </>
      )}
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
