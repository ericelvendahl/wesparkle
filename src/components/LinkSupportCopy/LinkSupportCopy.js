import React, {Component} from 'react';

import {connect} from 'react-redux';

class LinkSupportCopy extends Component {

  render() {
    // Copy from WeSparkle re community support
    return (
      <div className='support container'>

        <div className='support image-box image-3'></div>
        <h2>Support Small Businesses + Communities With Your Link</h2>
        <div className='support description paragraph'>We Sparkle Co. supports small businesses with our software tools and we also believe in giving back to our communities. 
        <br /><br />Every time you use our link shortener we will donate a nickel to the We Sparkle Community Fund, which gives to various charitable causes. 
        <br /><br />This year, we donated $250 and helped raise $12,000 overall to the <a href="https://namimn.org/">National Alliance on Mental Illness Minnesota (NAMI MN)</a> so they can provide their much-needed mental health services online. 
        <br /><br />If you have a suggestion for a charitable cause we should support, please email info@wesparkle.org. 
        <br /><br />Thank you! </div>

      </div>
  ) // end return
} // end render
} // end class

export default connect()(LinkSupportCopy);