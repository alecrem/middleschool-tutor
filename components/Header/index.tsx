import { FC } from 'react'
import {
  Box,
  Container,
  Heading,
  Link,
  Flex,
  Spacer,
  Icon,
  Image
} from '@chakra-ui/react'
import { AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai'

interface Props {
  tagline?: boolean
}

const Header: FC<Props> = ({ tagline }) => {
  return (
    <Container maxW="container.lg" mt="2em">
      <Box mb={4}>
        <Flex>
          <Box mr="1em">
            <Image
              src="favicon.ico"
              alt="Middle School Tutor logo"
              width="3em"
            />
          </Box>
          <Box>
            <Heading size="xl" color="blue.500">
              Middle School Tutor
            </Heading>
          </Box>
          <Spacer />
          <Box p={2}>
            <Link href="https://github.com/alecrem/middleschool-tutor/" p={4}>
              <Icon as={AiFillGithub} w={8} h={8} />
            </Link>
            <Link href="https://twitter.com/KarawapoM" p={4}>
              <Icon as={AiFillTwitterCircle} w={8} h={8} />
            </Link>
          </Box>
        </Flex>
        <Flex>
          <Box p={2}>
            <Link href="/">
              {/* <Heading size="md">Card Search</Heading> */}
            </Link>
          </Box>
        </Flex>
      </Box>
    </Container>
  )
}

export { Header }
