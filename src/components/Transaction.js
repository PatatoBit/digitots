import React, { useState } from 'react'

import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase.js'

function Transaction({uid}) {
    console.log(uid)

    
    const userRef = doc(db, 'users', uid)
    console.log('Work')

    let [amount, setAmount] = useState('')
    let [target, setTarget] = useState('')
    let [code, setCode] = useState('')

    
    const sendNum = async(e) => {
        e.preventDefault();
        console.log('Send Num')
    }

    const generateCode = async(e) => {
        e.preventDefault();
        console.log('Generate Code')
    }


    onSnapshot(userRef,  (doc) => {
        if (doc.exists()){
            setCode(code = doc.data().keycode)
        } else {
            setCode(code = 'N/A')
        }
    })

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            
            <form onSubmit={sendNum}>
                <input style={{ width: 200 }}value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder='Amount'/>
                <input style={{ width: 200 }} value={target} onChange={(e) => setTarget(e.target.value)} type="number" placeholder='Keycode'/>
                <br />
                <button className='btn' type='submit'>Send</button>
            </form>
 
            <section>
                <h2>{code}</h2>
                <button className='btn' onClick={generateCode} type='submit'>Generate Code</button>
            </section>
        </>
    )
}

export default Transaction
