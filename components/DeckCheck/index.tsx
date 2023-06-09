import { FC, useState } from 'react'
import {
  InputGroup,
  Textarea,
  List,
  ListItem,
  Box
} from '@chakra-ui/react'
import {
  CheckCircleIcon,
  NotAllowedIcon
} from '@chakra-ui/icons'
import type { LegalCards } from '@/utils/dataTypes'
import { useIsLegal } from '@/hooks/useIsLegal'

interface Props {
  legalcards: LegalCards
}

const DeckCheck: FC<Props> = (props) => {
  const legalCards = props.legalcards
  const { isLegal } = useIsLegal(legalCards)
  const [mainDeck, setMainDeck] = useState<{ name: string, legal: boolean }[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    const newSearchBox = value
    if (newSearchBox.length < 1) {
      return
    }
    const newMainDeck = value.split("\n").filter((line) => line.trim().length > 0).map((line) => {
      const cardName = line.replace(/^[0-9]+ /g, '').trim()
      const isLegalRet = isLegal(cardName.toLowerCase().trim())
      return { name: isLegalRet.exactMatch ?? cardName, legal: isLegalRet.legal }
    })
    setMainDeck(newMainDeck)
    if (typeof newSearchBox == 'string') {
    }
  }

  const deckNotLegal = () => mainDeck.filter(card => !card.legal).length > 0

  const placeholderIndex = ~~(
    Math.random() * Object.keys(legalCards.name).length
  )
  const placeholder = legalCards.name[placeholderIndex]

  return (
    <Box mt="1em">
      <InputGroup>
        <Box display="block">
          {deckNotLegal() ? (
            <>
              <NotAllowedIcon color="red.500" />{' '}
              This lisk is not Middle School legal
            </>
          ) : (
            <>
              <CheckCircleIcon color="green.500" />{' '}
              This lisk is Middle School legal
            </>
          )}
        </Box>
      </InputGroup>
      <InputGroup mt="1em">
        <Textarea
          placeholder={placeholder}
          rows={15}
          onChange={handleChange}
        />
      </InputGroup>
      {deckNotLegal() && <>
        <Box mt="1em">
          The following cards are not Middle School legal:
        </Box>
      </>}
      <List>
        {mainDeck.filter((card) => !card.legal).map((card) => {
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
