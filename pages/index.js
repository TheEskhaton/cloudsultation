import {
  Container,
  Stack
} from "@chakra-ui/core";
import Head from "next/head";
import Service from "../components/Service";
import servicesJson from "../data/services.json";


export async function getStaticProps() {
  return {
    props : {
      services: servicesJson
    }
  }
}

export default function Home({services}) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="lg" centerContent>
      <Stack m="8" spacing="4">
        <Stack spacing="4">
          {services.items.map((s, idx) => {
            return (
              <Service key={idx} service={s}></Service>
            );
          })}
        </Stack>
      </Stack></Container>
    </div>
  );
}
