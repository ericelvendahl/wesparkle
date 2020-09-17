import React, { Component } from "react";
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./FeedbackCarousel.css";

class FeedbackCarousel extends Component {

  // this is the animation displaying positive user feedback quotes
  // built with react-responsive-carousel

  render() {
    return (
      <div className='carousel-flex'>

          {/* carousel settings can be manipulated here 
              see react-responsive-carousel documentation */}
          <Carousel autoPlay interval={6000} infiniteLoop showThumbs={false} showStatus={false} className="feedbackCarousel">
            
            <div>
              <p>
                " Loved printing my QR code on my business cards. Thanks! "
                <br /><br />
                - Rebecca F.
              </p>
            </div>
            
            <div>
              <p>
                " This link shortener is so easy to use. Thank you! "
                <br /><br />
                 - Margaret T.
              </p>
            </div>

            <div>
              <p>
                " It's nice to be able to shorten my links for free and give back to the community at the same time! "
                <br /><br />
                - Nick M.
              </p>
            </div>
            
          </Carousel>
        </div>
    );
  }
}

export default connect()(FeedbackCarousel);
