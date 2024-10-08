import React from 'react';
import DoctorCard from './DoctorCard';
import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';

const DoctorList = () => {
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);

  if (loading) return <Loader />;
  if (error) return <Error errMessage={error} />;
  if (!loading && !error && (!doctors || doctors.length === 0)) {
    return (
      <div className='text-center mt-5'>
        <p>No doctors found.</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
      {doctors.map(doctor => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
