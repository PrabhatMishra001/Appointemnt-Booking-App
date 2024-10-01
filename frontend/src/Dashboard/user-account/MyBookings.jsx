import React from 'react';
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from './../../components/Doctors/DoctorCard';
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyBookings = () => {
  const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointment/my-appointments`);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errMessage={error} />;
  }

  // Check if appointments is null or undefined
  if (!appointments) {
    return <p>No appointments found.</p>;
  }

  // Check if appointments is an empty array
  if (appointments.length === 0) {
    return <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">You did not book any appointment yet!</h2>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {appointments.map(doctor => (
        <DoctorCard doctor={doctor} key={doctor._id} />
      ))}
    </div>
  );
};

export default MyBookings;
