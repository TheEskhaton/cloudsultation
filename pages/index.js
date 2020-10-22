import {
  Box,
  Button,
  Container,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Stack
} from "@chakra-ui/core";
import Head from "next/head";
import { useCallback, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useInfiniteQuery } from "react-query";
import Service from "../components/Service";
import useFocusHotkey from "../hooks/useFocusHotkey";

const getServices = async (key, searchQuery, cursor) => {
  const res = await fetch(`/api/search?q=${searchQuery}&cursor=${cursor}`);

  return await res.json();
};

export default function Home() {
  const [searchText, setSearchText] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(["search", searchQuery.toLowerCase()], getServices, {
    getFetchMore: (lastGroup) => {
      return lastGroup.meta.nextCursor;
    },
  });

  const searchInputRef = useRef(null);

  useFocusHotkey(searchInputRef);

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
      <Container maxW="lg" centerContent paddingLeft="0" paddingRight="0">
        <Stack m="8" spacing="4">
          <Stack spacing="4">
            <Box alignSelf="center" as={"form"} onSubmit={searchSubmit}>
              <InputGroup type="text" maxW="md">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="gray.300"></Icon>
                </InputLeftElement>
                <Input
                  ref={searchInputRef}
                  value={searchText}
                  onBlur={setQuery}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder='Press "S" to search'
                ></Input>
              </InputGroup>
            </Box>
            {isFetching && (
              <Skeleton
                width={["sm", "md", "lg"]}
                rounded="lg"
                height="150px"
                mx="8"
                mx="2"
              ></Skeleton>
            )}
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
