import React from 'react'
import heroImg01 from "../../assets/images/hero-img01.png"
import heroImg02 from "../../assets/images/hero-img02.png"
import heroImg03 from "../../assets/images/hero-img03.png"
import icon01 from "../../assets/images/icon01.png"
import icon02 from "../../assets/images/icon02.png"
import icon03 from "../../assets/images/icon03.png"
import avatarIcon from "../../assets/images/avatar-icon.png"
import videoIcon from "../../assets/images/video-icon.png"
import featureImg from "../../assets/images/feature-img.png"
import faqImg from "../../assets/images/faq-img.png" 
import About from "../About/About.jsx"
import {Link} from "react-router-dom"
import {BsArrowRight} from "react-icons/bs"
import ServiceList from './../Services/ServiceList';
import DoctorList from './../Doctors/DoctorList';
import FaqList from './../Faq/FaqList';
const Home = () => {
  return <><section className='hero_section pt-[60px] pb-10 lg:pb-0'>
    <div className="container">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[90px] items-center justify-between ">
            <div className="w-full lg:w-1/2">
                <div className="lg:w-full ">
                    <h1 className="text-[28px] leading-[36px] md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[56px] text-headingColor font-[800] ">
                        We help patients live a healthy, longer life </h1>
                        <p className="text_para mt-4">
                            This system plays a critical role in enhancing the operational efficiency of hospitals, clinics, and medical practices by reducing the manual workload on staff and minimizing the risk of errors associated with traditional booking methods. At its core, a hospital booking system offers a centralized platform where patients can schedule, modify, or cancel their appointments online, providing significant convenience and flexibility.
                        </p>
                        <button className="btn mt-4 md:mt-6">Request An Appointment</button>
                </div>
                <div className="mt-[30px] lg:mt-[70px] flex flex-col md:flex-row md:items-center gap-5 lg:gap-[30px]  ">
                    <div className="text-center md:text-left">
                        <h2 className="text-[28px] md:text-[36px] lg:text-[44px] leading-[40px] md:leading-[48px] lg:leading-[54px] font-[700] text-headingColor ">30+</h2>
                    <span className="w-[80px] md:w-[100px] h-2 bg-yellowColor rounded-full block mt-[-10px] md:mt-[-14px] mx-auto md:mx-0">
                    </span>
                    <p className="text_para mt-2">Years of Experience</p>
                    </div>
                     <div className="text-center md:text-left">
                        <h2 className="text-[28px] md:text-[36px] lg:text-[44px] leading-[40px] md:leading-[48px] lg:leading-[54px] font-[700] text-headingColor ">15+</h2>
                    <span className="w-[80px] md:w-[100px] h-2 bg-purpleColor rounded-full block mt-[-10px] md:mt-[-14px] mx-auto md:mx-0">
                    </span>
                    <p className="text_para mt-2">Clinic Location </p>
                    </div>
                     <div className="text-center md:text-left">
                        <h2 className="text-[28px] md:text-[36px] lg:text-[44px] leading-[40px] md:leading-[48px] lg:leading-[54px] font-[700] text-headingColor ">100%</h2>
                    <span className="w-[80px] md:w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-10px] md:mt-[-14px] mx-auto md:mx-0">
                    </span>
                    <p className="text_para mt-2">Patient Satisfaction</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 md:gap-[30px] justify-center lg:justify-end w-full lg:w-auto mt-6 lg:mt-0">
                <div className="w-1/2 lg:w-auto">
                    <img src={heroImg01} alt="" className="w-full max-w-[200px] md:max-w-none" />
                </div>
                <div className="w-1/2 lg:w-auto mt-0 md:mt-[30px] ">
                    <img src={heroImg02} alt="" className="w-full max-w-[150px] md:max-w-none mb-4 md:mb-[30px] " />
                    <img src={heroImg03} alt="" className="w-full max-w-[150px] md:max-w-none" />
                </div>
            </div>
        </div>
    </div>
  </section>
    <section className="py-10 lg:py-20">
        <div className="container">
            <div className="lg:w-[470px] mx-auto px-4">
                <h2 className='heading text-color'>Providing the best medical services</h2>
                <p className="text_para text-center mt-3">
                    World-class care for everyone. Our health system offers unmatched, expert health care. 
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] lg:mt-[55px] ">
                <div className="py-[30px] px-5 ">
                    <div className="flex items-center justify-center "><img src={icon01} alt="" className="w-16 h-16 md:w-auto" /></div>

                    <div className="mt-[30px] ">
                        <h2 className="text-[22px] md:text-[26px] leading-8 md:leading-9 text-headingColor font-[700] text-center ">Find a Doctor</h2>
                        <p className="text-[14px] md:text-[16px] leading-6 md:leading-9 text-headingColor font-[400] mt-4 text-center ">World-class care for everyone. Our health Systems offers unmatched, expert health care. From the lab to the clinic </p>
                        <Link to="/doctors" className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none '>
                        <BsArrowRight className="group-hover:textwhite w-6 h-5"/>
                        </Link>
                    </div>

                </div>
                 <div className="py-[30px] px-5 ">
                    <div className="flex items-center justify-center "><img src={icon02} alt="" className="w-16 h-16 md:w-auto" /></div>

                    <div className="mt-[30px] ">
                        <h2 className="text-[22px] md:text-[26px] leading-8 md:leading-9 text-headingColor font-[700] text-center ">Find a Location</h2>
                        <p className="text-[14px] md:text-[16px] leading-6 md:leading-9 text-headingColor font-[400] mt-4 text-center ">World-class care for everyone. Our health Systems offers unmatched, expert health care. From the lab to the clinic </p>
                        <Link to="/doctors" className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none '>
                        <BsArrowRight className="group-hover:textwhite w-6 h-5"/>
                        </Link>
                    </div>

                </div>
                 <div className="py-[30px] px-5 ">
                    <div className="flex items-center justify-center "><img src={icon03} alt="" className="w-16 h-16 md:w-auto" /></div>

                    <div className="mt-[30px] ">
                        <h2 className="text-[22px] md:text-[26px] leading-8 md:leading-9 text-headingColor font-[700] text-center ">Book A Appointments</h2>
                        <p className="text-[14px] md:text-[16px] leading-6 md:leading-9 text-headingColor font-[400] mt-4 text-center ">World-class care for everyone. Our health Systems offers unmatched, expert health care. From the lab to the clinic </p>
                        <Link to="/doctors" className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none '>
                        <BsArrowRight className="group-hover:textwhite w-6 h-5"/>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    </section>
                <About/>

                <section className="py-10 lg:py-20">
                    <div className="container">
                        <div className="xl:w-[470px] mx-auto px-4">
                            <h2 className="heading text-center"> Our medical services</h2>
                            <p className="text_para text_center mt-3">World-class care for everyone.Our health System offers unmatched,expert health care</p>
                        </div>

                        <ServiceList/>
                    </div>
                </section>
                    <section className="py-10 lg:py-20">
                <div className="container">
                    <div className="flex items-center justify-between flex-col lg:flex-row gap-8 lg:gap-0">
                    <div className="xl:w-full lg:w-2/3 w-full">
                        <h2 className="heading text-center lg:text-left">
                            Get Virtual treatment <br/> anytime
                        </h2>
                        <ul className="pl-4 mt-4 lg:mt-0">
                            <li className="text_para mt-2">
                                1. Schedule the appointment directly.
                            </li>
                            <li className="text_para mt-2">
                                2. Search for your physician here, and contact their office.
                            </li>
                            <li className="text_para mt-2">
                                3. View our physicians who are accepting new patients, use the online scheduling tool to select an appointment time.
                            </li>
                        </ul>
                        <div className="flex justify-center lg:justify-start mt-4">
                            <Link to='/'><button className="btn">Learn More</button></Link>
                        </div>
                    </div>
                    <div className="relative z-10 w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0 ">
                        <img src={featureImg} alt="" className="w-3/4 max-w-[300px] lg:max-w-none" />
                        <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-0 left-1/2 lg:left-auto lg:right-0 -translate-x-1/2 lg:translate-x-0 mb-4 lg:mb-0 bottom-[20px] md:bottom-[50px] z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px] shadow-lg ">
                            <div className="flex items center justify-between ">
                                <div className="flex items-center gap-[6px] lg:gap-3 ">
                                    <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600] '>Tue,24</p>
                                    <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400] '>10:00 </p>
                                </div>
                                <span className="w-5 h-5 lg:w-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px] ">
                                    <img src={videoIcon} alt="" className="w-2 h-2 lg:w-auto" />
                                </span>
                            </div>
                            <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full ">Consultation</div>
                            <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px] ">
                                <img src={avatarIcon} alt="" className="w-6 h-6 lg:w-auto" />
                                <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor ">Wayne Collins</h4>
                            </div>
                        </div>
                    </div>

                    </div>
                </div>
                </section>

                <section className="py-10 lg:py-20">
                    <div className="container">
                           <div className="xl:w-[470px] mx-auto px-4">
                            <h2 className="heading text-center"> Our Great Doctors</h2>
                            <p className="text_para text_center mt-3">World-class care for everyone.Our health System offers unmatched,expert health care</p>
                        </div>
                    <DoctorList/>
                    </div>
                </section>

                <section className="py-10 lg:py-20">
                    <div className="container">
                        <div className="flex flex-col md:flex-row justify-between gap-8 lg:gap-0 ">
                            <div className="w-full md:w-1/2 lg:w-5/12 flex justify-center md:justify-start order-2 md:order-1">
                                <img src={faqImg} alt="" className="w-3/4 max-w-[250px] md:max-w-none" />
                            </div>
                        <div className="w-full md:w-1/2 lg:w-1/2 order-1 md:order-2">
                        <h2 className="heading text-center md:text-left mb-6">Most questions by our beloved patients</h2>
                        <FaqList/>
                        </div>
                        </div>
                    </div>
                </section>
                
  </>
}

export default Home;
