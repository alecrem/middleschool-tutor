import { FC, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { InputGroup, Textarea, List, ListItem, Box } from '@chakra-ui/react'
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
  const { t } = useTranslation('common')
  const legalCards = props.legalcards
  const { isLegal } = useIsLegal(legalCards)
  const [mainDeck, setMainDeck] = useState<CardListItem[]>([])
  const [textAreaInput, setTextAreaInput] = useState<string>()

  const handleListChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    validateDeckList(value)
    setTextAreaInput(value)
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
          <Box mt="1em">{t('deckcheck.illegal-list')}</Box>
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
