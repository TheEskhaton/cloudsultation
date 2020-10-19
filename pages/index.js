import {
  Box,
  Button,
  Container,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack
} from "@chakra-ui/core";
import Head from "next/head";
import { useCallback, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useInfiniteQuery } from "react-query";
import Service from "../components/Service";

const getServices = async (key, searchQuery, cursor) => {
  const res = await fetch(`/api/search?q=${searchQuery}&cursor=${cursor}`);

  return await res.json();
};

export default function Home() {
  const [searchText, setSearchText] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(["search", searchQuery.toLowerCase()], getServices, {
    getFetchMore: (lastGroup) => {
      return lastGroup.meta.nextCursor;
    },
  });

  const setQuery = useCallback(() => {
    setSearchQuery(searchText);
  }, [searchText, setSearchQuery]);

  const searchSubmit = (e) => {
    e.preventDefault();
    setQuery();
  };
 
  return (
    <div>
      <Head>
        <title>Cloud Consultant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="lg" centerContent>
        <Stack m="8" spacing="4">
          <Stack spacing="4">
            <Box  alignSelf="center" as={"form"} onSubmit={searchSubmit}>
            <InputGroup type="text" maxW="md">
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="gray.300"></Icon>
              </InputLeftElement>
              <Input
                value={searchText}
                onBlur={setQuery}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Name of cloud service"
              ></Input>
            </InputGroup>
            </Box>
            {data &&
              data.map((serviceGroup) => {
                return serviceGroup.services.map((s, indexOfTheService) => (
                  <Service key={indexOfTheService} service={s}></Service>
                ));
              })}
            <Box alignSelf="center">
              <Button
              isLoading={isFetchingMore}
                variant="outline"
                colorScheme="green"
                textTransform="uppercase"
                disabled={!canFetchMore || isFetchingMore}
                onClick={() => fetchMore()}
              >
                Load more
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
