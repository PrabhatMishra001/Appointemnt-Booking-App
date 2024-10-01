import React, { useState } from 'react';
import starIcon from '../../../assets/images/Star.png';
import DoctorAbout from './DoctorAbout';
import Feedback from './Feedback';
import SidePanel from './SidePanel';
import { BASE_URL } from '../../../config';
import useFetchData from './../../../hooks/useFetchData';
import Loader from '../../Loader/Loading';
import Error from '../../Error/Error';
import { useParams } from 'react-router-dom';

const DoctorDetails = () => {
  const [tab, setTab] = useState('about');
  const { id } = useParams();

  const { data: doctor, loading, error } = useFetchData(`${BASE_URL}/doctors/${id}`);
  const [reviews, setReviews] = useState(doctor ? doctor.reviews : []);
  const [totalRating, setTotalRating] = useState(doctor ? doctor.totalRating : 0);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  if (!doctor) {
    return <p>No doctor details found.</p>;
  }

  const handleNewReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setTotalRating((prevTotal) => prevTotal + 1);
  };

  const { name, bio, about, qualifications, specialization, avgRating, photo, ticketPrice,  experiences,timeSlots } = doctor;

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure>
                <img src={photo} alt="Doctor" />
              </figure>
              <div>
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                  {specialization}
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">{name}</h3>
                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                    <img src={starIcon} alt="Star" /> {avgRating}
                  </span>
                  <span className="text-[14px] leading-7 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                    {totalRating}
                  </span>
                </div>
                <p className="text_para text-[14px] leading-5 md:text-[15px] max-w-390">{bio}</p>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTab('about')}
                className={`${tab === 'about' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                About
              </button>
              <button
                onClick={() => setTab('feedback')}
                className={`${tab === 'feedback' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Feedback
              </button>
            </div>
            <div className="mt-[50px]">
              {tab === 'about' && <DoctorAbout name={name} about={about} qualifications={qualifications} experiences={experiences} />}
              {tab === 'feedback' && <Feedback reviews={reviews} totalRating={totalRating} onNewReview={handleNewReview} />}
            </div>
          </div>
          <div>
            <SidePanel doctorId={doctor._id} ticketPrice={ticketPrice} timeSlots={timeSlots} />

          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;
