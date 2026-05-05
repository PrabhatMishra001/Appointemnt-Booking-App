import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import useFetchData from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import Tabs from './Tabs';
import starIcon from '../../assets/images/Star.png';
import DoctorAbout from './../../components/pages/Doctors/DoctorAbout';
import Profile from "./Profile";
import Appointments from './Appointments';
const Dashboard = () => {
    const { data, loading, error, refetch } = useFetchData(`${BASE_URL}/doctors/profile/me`);
    const [tab, setTab] = useState('overview');

    if (loading && !error) {
        return <Loader />;
    }

    if (error) {
        return <Error errMessage={error} />;
    }

    const isApprovedPending = data?.isApproved === 'pending';

    return (
        <section className="py-10">
            <div className='grid lg:grid-cols-3 gap-6 lg:gap-[30px] lg:gap-[50px] px-4'>
                <Tabs tab={tab} setTab={setTab} />
                <div className='lg:col-span-2'>
                    {isApprovedPending && (
                        <div className='flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg'>
                            <svg aria-hidden="true" className='flex-shrink-0 w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                            </svg>
                            <span className='sr-only'>Info</span>
                            <div className='ml-3 text-sm font-medium'>
                                To get approval please complete your profile. We&apos;ll review manually and approve within 3 days.
                            </div>
                        </div>
                    )}

                    <div className='mt-6 md:mt-8'>
                        {tab === 'overview' && data && (
                            <div>
                                <div className='flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-8 md:mb-10'>
                                    <figure className='w-32 md:max-w-[200px] max-h-[200px]'>
                                        <img src={data.photo} alt='' className='w-full h-full'/>
                                    </figure>
                                    <div className="text-center md:text-left">
                                        <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-3 md:px-4 lg:px-6 rounded text-[10px] md:text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold'>{data.specialization}</span>
                                        <h3 className='text-[18px] md:text-[22px] leading-7 md:leading-9 font-bold text-headingColor mt-2 md:mt-3'>{data.name}</h3>
                                        <div className='flex items-center gap-[4px] md:gap-[6px] justify-center md:justify-start mt-1'>
                                            <span className='flex items-center gap-[4px] md:gap-[6px] text-[12px] md:text-[14px] leading-5 md:leading-6 lg:text-[16px] font-semibold text-headingColor'> <img src={starIcon} alt=''/>{data.averageRating}</span>
                                            <span className='text-headingColor text-[12px] md:text-[14px] leading-4 md:leading-5 lg:text-[16px] lg:leading-6 font-semibold'>{data.totalRating}</span>
                                        </div>
                                        <p className='text_para font-[14px] md:text-[15px] lg:max-w-[390px] leading-5 md:leading-6 mt-2'>{data.bio}</p>
                                    </div>
                                </div>
                                <DoctorAbout name={data.name} about={data.about} qualifications={data.qualifications} experiences={data.experiences} />
                            </div>
                        )}
                        {tab === 'Appointments' && <Appointments appointments={data.appointments} />}
                        {tab === 'settings' && <Profile doctorData={data} refetchData={refetch} />}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Dashboard;