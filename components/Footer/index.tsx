import { Container, Text } from '@chakra-ui/react'

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
      <Text>All other content MIT licensed since 2022 by alecrem.</Text>
    </Container>
  )
}

export { Footer }
