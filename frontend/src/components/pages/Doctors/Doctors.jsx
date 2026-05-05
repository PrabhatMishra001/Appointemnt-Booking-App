import React, { useEffect, useState } from 'react';
import DoctorCard from "../../Doctors/DoctorCard";
import { BASE_URL } from "../../../config";
import useFetchData from "../../../hooks/useFetchData";
import Loader from "../../Loader/Loading";
import Error from "../../Error/Error";

const Doctors = () => {
  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState('');

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);

  return (
    <>
      <section className="bg-[#fff9ea] py-6 md:py-10">
        <div className="container text-center px-4">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-5 md:mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex flex-col md:flex-row items-center justify-between gap-2 p-2">
            <input 
              type="search" 
              className="py-3 md:py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor" 
              placeholder="Search doctors by name or specialization" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn mt-0 md:mt-0 rounded-[0px] md:rounded-[0px] rounded-r-md w-full md:w-auto" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container px-4">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && (
            doctors && doctors.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5'>
                {doctors.map(doctor => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className='text-center mt-5'>
                <p>No doctors found.</p>
              </div>
            )
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text_para text-center">
              World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Doctors;
