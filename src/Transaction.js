import React, { useState } from 'react';

import { collection, doc, query, where, getDocs, updateDoc, onSnapshot, setDoc, increment } from 'firebase/firestore';

export default function Transaction({db, userRef, firebase}) {
    const userCol = collection(db, "users")
    
    // getting input value
    let [amount, setAmount] = useState('');
    let [target, setTarget] = useState('');
    let [code, setCode] = useState('');
    
    // send num to target
    const sendNum = async(e) => {
        e.preventDefault();
        
        
        const targetQuery = query(userCol, where("keycode", "==", parseInt(target)));
        const targetSnapshot = await getDocs(targetQuery)
        
        targetSnapshot.forEach((document) => {
            console.log(document.data().num)
            console.log(document.id)
            const targetRef = doc(db, 'users', document.id)
            
            // increment target num
            setDoc(targetRef, {
                num: increment(amount)
            }, {merge: true})
        })
        

        setAmount('');
        setTarget('');
    }
    
    // generate random user keycode
    const generateCode = async(e) => {
        e.preventDefault();
        await updateDoc(userRef, {
            keycode: Math.round(Math.random() * 100000)
        }, {merge: true})
    }
    

    //read data realtime
    onSnapshot(userRef, (doc) => {
        if (doc.exists()){
            setCode(code = doc.data().keycode)
        } else {

        }
    })

    return (
        <>
            <form onSubmit={sendNum}>
                <input style={{ width: 200 }}value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder='Amount'/>
                <input style={{ width: 200 }} value={target} onChange={(e) => setTarget(e.target.value)} type="number" placeholder='Keycode'/>
                <br />
                <button type='submit' disabled={!amount + !target}>Send</button>
            </form>

            <section>
                <h2>{code}</h2>
                <button onClick={generateCode} type='submit'>Generate Code</button>
            </section>
        </>
    )
}