import React from "react";
import './Footer.css'

export default function Footer() {
    return (
        <div className="footer">
            <div> Thanks for checking out the site! Come back soon to see the continued progress.</div>
            <div> If you'd like to find out more about the developer or how to contact him, checkout these links:</div>
            <div id="dave-links">
                    <a href="https://github.com/davesextonjr" target="_blank">github</a>
                    <a href={"https://www.linkedin.com/in/dave-sexton-jr/"} target="_blank" id="dev-names">linkedin</a>
            </div>
        </div>
    )
}
