import { Container, Text, Link, Icon, HStack, Box } from '@chakra-ui/react'
import { AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai'

function Footer() {
  return (
    <Container maxW="container.sm" my="2em">
      <Text fontSize="xs">
        Portions of Middle School Tutor are unofficial Fan Content permitted
        under the Wizards of the Coast Fan Content Policy. The literal and
        graphical information presented on this site about Magic: The Gathering,
        including card images, mana symbols, and Oracle text, is copyright
        Wizards of the Coast, LLC, a subsidiary of Hasbro, Inc.
        <br />
        Middle School Tutor is not produced by or endorsed by Wizards of the
        Coast. The GitHub and Twitter logos are copyright their respective
        owners. Middle School Tutor is not produced by or endorsed by these
        services.
      </Text>
      <HStack spacing={8} pt={4}>
        <Box>
          <Link href="https://github.com/alecrem/middleschool-tutor/" p={4}>
            <Icon as={AiFillGithub} w={8} h={8} />
          </Link>
          <Link href="https://twitter.com/KarawapoM" p={4}>
            <Icon as={AiFillTwitterCircle} w={8} h={8} />
          </Link>
        </Box>
        <Text>All other content MIT licensed since 2022 by alecrem.</Text>
      </HStack>
    </Container>
  )
}

export { Footer }
