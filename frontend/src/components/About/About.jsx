import React from 'react'
import aboutImg from '../../assets/images/about.png';
import aboutCardImg from '../../assets/images/about-card.png'
import { Link } from 'react-router-dom';

const About = () => {
  return(<section className="py-10 lg:py-20">
    <div className='container'>
    <div className='flex justify-between gap-8 lg:gap-[130px] xl:gap-0 flex-col lg:flex-row items-center'>
        {/*================about img============*/}
        <div className='relative w-full lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
            <img src={aboutImg} alt="" className="w-full max-w-[400px] lg:max-w-none mx-auto" />
            <div className='absolute z-20 bottom-4 w-[150px] md:w-[200px] lg:w-[200px] right-[10%] md:right-[20%] lg:right-[22%] '>
                <img src={aboutCardImg} alt="" className="w-full" />
            </div>
        </div>
        {/*================about content============*/}
        <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2 mt-8 lg:mt-0">
          <h2 className='heading text-center lg:text-left'>Proud to be one of the nation best</h2>
          <p className="text_para mt-4 lg:mt-0 text-center lg:text-left"> For 30 years in row, U.S. News & World Report has recognized us as one of the best public hospitals int he nation and #1 in Texas.
          </p>

          <p className="text_para mt-4 text-center lg:text-left"> Our best is something we strive for each day, caring for our patients-not looking back at what we accomplished but towards what we can do tommorw. Providing the best.
          </p>

            <Link to='/'> <button className="btn mt-6">Learn More</button> </Link>
            
        </div>

    </div>
    </div>
  </section>
  );
}

export default About
