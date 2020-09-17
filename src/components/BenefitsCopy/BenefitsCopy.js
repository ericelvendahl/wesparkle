import React, {Component} from 'react';
import {connect} from 'react-redux';
import './BenefitsCopy.css';

// copy from weSparkle re link shortening benefits
class BenefitsCopy extends Component {

  render() {
    return (
      <div className='benefits container'>
        <h2>
          Why make a short link?
        </h2>
        <div className='benefits image-box image-1'>
        </div>
        <div className='support description'>
          Makes it easy for people to remember your website or link!
          <br /><br />
          Some social media channels like Twitter have character limits.
          <br /><br />
          Makes your social media posts, flyers, and emails look more professional.
        </div>

        <h2>
          Why make a QR code?
        </h2>
        <div className='benefits image-box image-2'>

        </div>
        <div className='support description'>
          Makes it easy for people to use their phones to scan and be directed to the correct website.   
          <br /><br />
          People don't have to remember your website or type it into their phone/laptop (and accidentally misspell it).        
          <br /><br />
          QR codes are graphics that can sometimes be more eye-catching than a website link.
        </div>
        
        <div className='image-title link-button'>
          <a href='https://www.wesparkle.org/' target='blank'>
            View the full guide
          </a>
        </div>
      </div>
    ) // end return
  } // end render
} // end class

export default connect()(BenefitsCopy);