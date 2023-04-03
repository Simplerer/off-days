import React from "react";
import './index.css'

function Footer ({background, chillPlz}) {

return (
  <div id="footer">
    {background
    ?
    <h1 onClick={chillPlz}>Chill Time</h1>
    :
    <h1 onClick={chillPlz}>Wild Time</h1>
  }
  </div>
)

};

export default Footer;