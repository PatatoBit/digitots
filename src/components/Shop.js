import React from 'react'

function Shop({isUser}) {
    if(isUser) {
        return (
            <div>
                <h1>This thing doesn't work for now</h1>
            </div>
        )
    } else {
        return (
            <h2>Please login / signup to continue</h2>
        )
    }
    
}

export default Shop
