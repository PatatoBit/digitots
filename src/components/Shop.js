import React from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js'


function Shop({isUser}) {
    let html = ``
    const getItems = async(e) => {
        e.preventDefault();
        const itemRef = collection(db, 'shopItems');
        const itemSnapshot = await getDocs(itemRef);
    
        itemSnapshot.forEach((doc) => {
            console.log(doc.data().name)
            let li = `<li>$${doc.data().name}<li/>`
            html += li;
        })

    }

    if(isUser) {
        return (
            <div>
                <ul>
                    {html}
                </ul>
                <button onClick={getItems}>bababoey</button>
            </div>
        )
    } else {
        return (
            <h2>Please login / signup to continue</h2>
        )
    }
    
}

export default Shop
