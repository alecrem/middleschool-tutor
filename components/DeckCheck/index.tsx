import { FC, useState } from 'react'
import {
  InputGroup,
  InputRightElement,
  Textarea,
  List,
  ListItem,
  Link
} from '@chakra-ui/react'
import {
  CheckCircleIcon,
  NotAllowedIcon,
  ExternalLinkIcon
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
    // .trim().toLowerCase()
    if (newSearchBox.length < 1) {
      return
    }
    const newMainDeck = value.split("\n").filter((line) => line.trim().length > 0).map((line) => {
      const isLegalRet = isLegal(line.toLowerCase())
      console.log(line, isLegalRet)
      return { name: isLegalRet.exactMatch ?? line, legal: isLegalRet.legal }
    })
    setMainDeck(newMainDeck)
    console.log("newMainDeck", newMainDeck)
    if (typeof newSearchBox == 'string') {
    }
  }

  const deckNotLegal = () => mainDeck.filter(card => !card.legal).length > 0

  const placeholderIndex = ~~(
    Math.random() * Object.keys(legalCards.name).length
  )
  const placeholder = legalCards.name[placeholderIndex]

  return (
    <>
      <InputGroup mt="2em">
        <Textarea
          placeholder={placeholder}
          rows={15}
          onChange={handleChange}
        />
        <InputRightElement>
          {deckNotLegal() ? (
            <NotAllowedIcon color="red.500" />
          ) : (
            <CheckCircleIcon color="green.500" />
          )}
        </InputRightElement>
      </InputGroup>
      <List spacing={3} mt="1em">
        {mainDeck.filter((card) => !card.legal).map((card) => {
          return (
            <ListItem key={card.name}>
              <NotAllowedIcon color="red.500" /> {card.name}
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

export { DeckCheck }
