import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Spinner,
  Stack,
  Tag,
} from "@chakra-ui/core";
import Head from "next/head";
import { FormEvent, useCallback, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineLoading } from "react-icons/ai";
import { useInfiniteQuery } from "react-query";
import Service from "../components/Service";
import useFocusHotkey from "../hooks/useFocusHotkey";
import { CloudProvider, CloudService, CloudServicesSearchResponse } from "../types/types";

const getServices = async (
  key: string,
  searchQuery : string,
  selectedCloudProviders : CloudProvider[],
  cursor: number
) => {
  const res = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: searchQuery,
      cursor: cursor,
      providers: selectedCloudProviders,
    }),
  });

  return await res.json();
};

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [cloudProviders, setCloudProviders] = useState([
    {
      displayName: "Azure",
      name: "azure",
      selected: true,
    },
    {
      displayName: "AWS",
      name: "aws",
      selected: true,
    },
    {
      displayName: "GCP",
      name: "gcp",
      selected: true,
    },
  ]);

  const toggleProviderSelected = useCallback(
    (name) => {
      setCloudProviders((previousCloudProviders) => {
        const clickedCloudProvider = previousCloudProviders.find(
          (c) => c.name === name
        );
        clickedCloudProvider.selected = !clickedCloudProvider.selected;
        return [...previousCloudProviders];
      });
    },
    [setCloudProviders]
  );

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery<CloudServicesSearchResponse>(
    ["search", searchQuery.toLowerCase(), cloudProviders],
    getServices,
    {
      getFetchMore: (lastGroup) => {
        return lastGroup.meta.nextCursor;
      },
    }
  );

  const searchInputRef = useRef(null);

  useFocusHotkey(searchInputRef);

  const setQuery = useCallback(() => {
    setSearchQuery(searchText);
  }, [searchText, setSearchQuery]);

  const searchSubmit : FormEvent<HTMLFormElement> = (e) => {
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
              <InputGroup maxW="md">
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
              <Box display="flex" justifyContent="space-evenly" margin="0 auto">
                <ButtonGroup position="relative" size="sm" spacing="2" mt="2">
                  {cloudProviders.map((c) => {
                    return (
                      <Button
                        key={c.name}
                        onClick={() => toggleProviderSelected(c.name)}
                        colorScheme={c.selected ? "green" : "gray"}
                      >
                        {c.displayName}
                      </Button>
                    );
                  })}
                 {isFetching && <Spinner position="absolute" right="-20px" top="8px" alignSelf="center" boxSize="14px" />}
                 
                </ButtonGroup>
              </Box>
            </Box>
            {data &&
              data.map((serviceGroup) => {
                return serviceGroup.services.map((s, indexOfTheService) => (
                  <Service key={indexOfTheService} service={s}></Service>
                ));
              })}
            <Box alignSelf="center">
              <Button
                isLoading={!!isFetchingMore}
                variant="outline"
                colorScheme="green"
                textTransform="uppercase"
                disabled={!canFetchMore || !!isFetchingMore}
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
