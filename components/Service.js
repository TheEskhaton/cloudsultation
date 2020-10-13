import {
  Badge,
  Box,
  Flex,
  Image,
  ListItem,
  Spacer,
  Tag,
  TagLabel,
  UnorderedList,
} from "@chakra-ui/core";

export default function Service({ service }) {
  const headerTextColor = service.colorScheme
    ? service.colorScheme + ".50"
    : "blue.50";

  const headerBgColor = service.colorScheme
    ? service.colorScheme + ".700"
    : "blue.700";

  return (
    <Box rounded="lg" shadow="md">
      <Flex flexDir="column">
        <Flex
          roundedTop="lg"
          color={headerTextColor}
          textTransform="uppercase"
          p="4"
          backgroundColor={headerBgColor}
          shadow="sm"
          alignItems="center"
        >
          <Image
            mr="1"
            display="inline"
            boxSize="32px"
            src={service.logo}
          ></Image>
          <Box ml="1" fontWeight="700">
            {service.displayName}
          </Box>
          <Spacer></Spacer>
          <Badge fontSize="xs" colorScheme="gray">
            {service.provider}
          </Badge>
        </Flex>
        <Flex
          mx="4"
          mb="4"
          flexDir={{ md: "row", base: "column" }}
          fontSize="0.875rem"
        >
          <Box flex="1" pr="2" mt="4">
            <Tag colorScheme="green">
              <TagLabel>Use if</TagLabel>
            </Tag>
            <UnorderedList mt="2">
              {service.useIf.map((u) => (
                <ListItem key={u} mb="3">
                  {u}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
          <Box flex="1" mt="4">
            <Tag colorScheme="red">
              <TagLabel>Don't use if</TagLabel>
            </Tag>
            <UnorderedList mt="3">
              {service.doNotUseIf.map((u) => (
                <ListItem key={u} mb="2">
                  {u}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
