import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/react"

import Head from "next/head"
import { SearchIcon } from "@chakra-ui/icons"
import { useState } from "react"

export default function Home() {
  const [v, setV] = useState("")
  const [k, setK] = useState("")
  const [d, setD] = useState(0)
  const [l, setL] = useState(false)
  const search = () => {
    if (v) {
      setL(true)
      fetch("/api/keyword?tags=" + encodeURI(v))
        .then((r) => r.json())
        .then((d) => {
          if (!d.error) {
            setK(d.data.join(", "))
            setD(d.duration)
          }
        })
        .finally(() => {
          setL(false)
        })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    search()
  }
  return (
    <Box>
      <Head>
        <title>Simple Keyword Suggestion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form action="" onSubmit={handleSubmit}>
        <Heading py={3} px={6}>
          Search Keyword
        </Heading>
        <HStack alignItem="center" justify="center" px={6}>
          <Input
            value={v}
            onChange={({ target }) => setV(target.value)}
            placeholder="Keyword"
            variant="flushed"
          ></Input>
          <Button
            isLoading={l}
            colorScheme="teal"
            type="submit"
            leftIcon={<SearchIcon />}
          >
            Find
          </Button>
        </HStack>
      </form>
      <Box p={6}>
        <Box>Processing Time : {d} ms</Box>
        <Divider my={3} />
        {l ? <Spinner /> : <Box fontSize="sm">{k}</Box>}
      </Box>
    </Box>
  )
}
