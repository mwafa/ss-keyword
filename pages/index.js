import { useEffect, useState } from "react"

import Head from "next/head"
import styles from "../styles/Home.module.css"

export default function Home() {
  const [v, setV] = useState("")
  const [k, setK] = useState("")
  const [d, setD] = useState(0)
  const search = () => {
    if (v) {
      fetch("/api/keyword?tags=" + encodeURI(v))
        .then((r) => r.json())
        .then((d) => {
          if (!d.error) {
            setK(d.data.join(", "))
            setD(d.duration)
          }
        })
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Simple Keyword Suggestion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <input
          value={v}
          onChange={({ target }) => setV(target.value)}
          placeholder="keyword"
        ></input>
        <button onClick={() => search()}>find</button>
      </div>
      <div style={{ fontSize: ".8em" }}>
        duration ({d}) <br />
        {k}
      </div>
    </div>
  )
}
