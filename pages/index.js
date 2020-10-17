import { Container, Heading, Icon, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/core";
import Head from "next/head";
import { useMemo, useState } from "react";
import { FiSearch } from 'react-icons/fi';
import Service from "../components/Service";
import servicesJson from "../data/services.json";

export async function getStaticProps() {
  return {
    props : {
      services: servicesJson
    }
  }
}

export default function Home({ services }) {
  const [searchText, setSearchText] = useState(null);

  const filteredServices = useMemo(() => {
    if (searchText) {
      return services.items.filter((s) => {
        return s.displayName.toLowerCase().includes(searchText.toLowerCase());
      });
    }

    return services.items;
  }, [searchText, services]);

  return (
    <div>
      <Head>
        <title>Cloud Consultant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="lg" centerContent>
        <Stack m="8" spacing="4">
          <Stack spacing="4">
             <Heading color="purple.700" mb="2" alignSelf="center" as="h1">
              Is it right for you?
            </Heading>
            <InputGroup   alignSelf="center" type="text" 
            maxW="md">
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.300"></Icon>
              </InputLeftElement> 
            <Input value={searchText} 
            onChange={(e) => setSearchText(e.target.value)} 
          
            placeholder="Name of cloud service"></Input>
            </InputGroup>
            
            {filteredServices.map((s, idx) => {
              return <Service key={idx} service={s}></Service>;
            })}
          </Stack></Stack>
      </Container>
    </div>
  );
}
