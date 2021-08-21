import { SearchIcon } from "@chakra-ui/icons"
import { Box, Button, Checkbox, Divider, Grid, Heading, HStack, Input, Spinner, Textarea } from "@chakra-ui/react"
import Head from "next/head"
import { useState } from "react"

export default function Home() {
  const [v, setV] = useState("")
  const [k, setK] = useState([])
  const [d, setD] = useState(0)
  const [l, setL] = useState(false)

  const search = () => {
    if (v) {
      setL(true)
      fetch("/api/keyword?tags=" + encodeURI(v))
        .then((r) => r.json())
        .then((d) => {
          if (!d.error) {
            setK(d.data.map((x, idx) => {return {label:x, check: idx < 50}}))
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

  const set = (idx, value) => {
    setK((k) => {
      const {label} = k[idx]
      k[idx] = {check: value, label}
      return [...k]
    })
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
        <HStack  justify="center" px={6}>
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
        <Box>Checked : {k.filter(x => x.check).length} item</Box>
          <Textarea value={k.filter(x => x.check).map(x => x.label).join(", ")} />
        <Divider my={3} />
        {l ? <Spinner /> : <Box fontSize="sm">
          <Grid templateColumns="repeat(5, 1fr)" gap={1}>
            {k.map(({label, check}, idx) => (
                <Checkbox key={label} onChange={({target}) => {
                  set(idx, target.checked)
                }} defaultIsChecked={check} >{label}</Checkbox>
            ))}
          </Grid>
          </Box>}
      </Box>
    </Box>
  )
}
