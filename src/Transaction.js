import React, { useState} from 'react';

import { setDoc, onSnapshot } from 'firebase/firestore';

export default function Transaction({db, uid, userRef}) {
    let [amount, setAmount] = useState('');
    let [target, setTarget] = useState('');
    let [code, setCode] = useState('');

    const sendNum = async(e) => {
        e.preventDefault();
        console.log(amount);
        console.log(target);
        setAmount('');
        setTarget('');
    }
    
    const generateCode = async(e) => {
        e.preventDefault();
        await setDoc(userRef, {
            keycode: Math.round(Math.random() * 100000)
        }, {merge: true})
    }
    
    onSnapshot(userRef, (doc) => {
        if (doc.exists()){
            setCode(code = doc.data().keycode)
        } else {

        }
    })

    return (
        <>
            <form onSubmit={sendNum}>
                <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder='Amount'/>
                <input value={target} onChange={(e) => setTarget(e.target.value)} type="number" placeholder='Keycode'/>
                <br />
                <button type='submit'>Send</button>
            </form>

            <section>
                <h2>{code}</h2>
                <button onClick={generateCode} type='submit'>Generate Code</button>
            </section>
        </>
    )
}