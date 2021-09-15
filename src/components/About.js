import React from 'react'
import cadillac from '/Users/machine/Documents/digitots/src/cadillac.mp4'

function About() {
    return (
        <>
            <h5>Hi, this is Pat writing. I made this web.</h5>
            <br />
            <h6>Why? you might ask, it's just because I don't really like when Tots are in stickers. Anyone could eaisily lose it or tear the notebook apart.</h6>
            <h6>And I think it would be easier to buy items from the shop that the school post easier.
                Also there's sending in the 'Portal' page if you want to buy something together.</h6>
            
            <h6>I need to upgrade to Firebase Blaze plan to make Cloud Functions work. And I need money for that. Then I can make admins and shop work.</h6>
            <br />
            
           
            <video id="glass"width='500' autoPlay loop muted>
                <source src={cadillac} type="video/mp4"></source>
            </video>


            
            <br />
            <a href="https://github.com/PathonScript/digitots" target="_blank">Github Project</a>
            
        </>
    )
}

export default About
