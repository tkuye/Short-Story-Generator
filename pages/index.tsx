import type { NextPage } from 'next'
import {useEffect, useState} from 'react'
import Head from 'next/head'
import {FaTrash} from 'react-icons/fa'
import {IoIosAddCircleOutline} from 'react-icons/io'
import styles from '../styles/Home.module.scss'
import axios from 'axios'
import Router from 'next/router'
let data = [{
  id:1,
  answer: '',
}, {
  id:2,
  answer: '',
}, {
  id:3,
  answer: '',
},
{
id:4,
answer: '',
}]

const Home: NextPage = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState<any[]>(data);
const [answerResponse, setAnswerResponse] = useState('');
const [idCount, setIdCount] = useState(5);
const [loader, setLoader] = useState(false);
  // key prefix for the dropdown items



  const onSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (question.length > 0) {
      setLoader(true);
    let response =  await axios.post(`/api/query`, {
      prompt: question,
    })
    setLoader(false);
    setAnswerResponse(response.data)
  }
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Short Story Generator</title>
        <meta name="description" content="short story generator" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <main className={styles.main}>
        <div className={styles.title}>
        <h1 className={styles.title}>
        Short Story Generator
        </h1>
        <p>Use this to generate any short story.</p>
        </div>
        
        {answerResponse === "" && !loader? <div>
        <div className={styles.question}>
            <h2>Enter a topic below that should be generated.</h2>
            <input type="text" placeholder='Ex: French Children' value={question} onChange={(e) => setQuestion(e.target.value)} />
          </div>
         <form onSubmit={onSubmit}><input type="submit" value="Generate Story"/></form>
        </div>: <div className={styles.answerResponse}>
          <p>{answerResponse}</p>
          {!loader && <button onClick={() => Router.reload()}>Want to generate another story?</button>}
        </div>}
        {loader && <Loader />}
      </main>
    </div>
  )
}

const Loader = () => {
  return (
    <div className="ring">Loading
  <span></span>
</div>
  )
}

export default Home
