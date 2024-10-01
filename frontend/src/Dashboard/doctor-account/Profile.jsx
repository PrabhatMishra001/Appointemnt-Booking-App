import { useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from './../../utils/uploadCloudinary';
import { BASE_URL, token } from './../../config';
import { toast } from 'react-toastify';

const Profile = ({ doctorData, refetchData }) => {
    const [formData, setFormData] = useState({
        name: doctorData.name || "",
        email: doctorData.email || "",
        phone: doctorData.phone || "",
        password: "",
        bio: doctorData.bio || "",
        gender: doctorData.gender || "",
        specialization: doctorData.specialization || "",
        ticketPrice: doctorData.ticketPrice || "0",
        qualifications: doctorData.qualifications || [{ startingDate: '', endingDate: '', degree: '', university: '' }],
        experiences: doctorData.experiences || [{ startingDate: '', endingDate: '', position: '', hospital: '' }],
        timeSlots: doctorData.timeSlots || [{ day: '', startingTime: '', endingTime: '' }],
        about: doctorData.about || "",
        photo: doctorData.photo || null,
    });

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleReusableInputChangeFunc = (key, index, event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => {
            const updatedItems = [...prevFormData[key]];
            updatedItems[index][name] = value;
            return {
                ...prevFormData,
                [key]: updatedItems
            };
        });
    };

    const handleFileInputChange = async event => {
        const file = event.target.files[0];
        const data = await uploadImageToCloudinary(file);
        setFormData(prevFormData => ({
            ...prevFormData,
            photo: data?.url
        }));
    };

    const updateProfileHandler = async e => {
        e.preventDefault();
        
        try {
            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
    
            const result = await res.json();
            
            if (!res.ok) {
                throw new Error(result.message);    
            }
    
            toast.success(result.message);
            refetchData();  // Re-fetch data after successful update
    
        } catch (err) {
            toast.error(err.message);
        }
    };

    const addItem = (key, item) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: [...prevState[key], item]
        }));
    };

    const removeItem = (key, index) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: prevState[key].filter((_, i) => i !== index)
        }));
    };

 const addQualification = e => {
    e.preventDefault();
    setFormData(prevState => ({
        ...prevState,
        qualifications: [
            ...prevState.qualifications,
            { startingDate: "", endingDate: "", degree: "", university: "" }
        ]
    }));
};

const addExperience = e => {
    e.preventDefault();
    setFormData(prevState => ({
        ...prevState,
        experiences: [
            ...prevState.experiences,
            { startingDate: "", endingDate: "", position: "", hospital: "" }
        ]
    }));
};

    const addTimeSlot = e => {
        e.preventDefault();
        addItem('timeSlots', { day: "", startingTime: "", endingTime: "" });
    };

    return (
        <div>
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
                Profile Information
            </h2>
            <form onSubmit={updateProfileHandler}>
                <div className="mb-5">
                    <p className="form_label">Name</p>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="form_input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Email</p>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="form_input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Phone Number</p>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="form_input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Password</p>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className="form_input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Bio</p>
                    <textarea
                        name="bio"
                        rows={5}
                        value={formData.bio}
                        placeholder="Write about yourself"
                        onChange={handleInputChange}
                        className="form_input"
                    ></textarea>
                </div>
                <div className="mb-5">
                    <p className="form_label">Gender</p>
                    <input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        placeholder="Gender"
                        className="form_input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Specialization</p>
                    <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        placeholder="Specialization"
                        className="form_input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Ticket Price</p>
                    <input
                        type="number"
                        name="ticketPrice"
                        value={formData.ticketPrice}
                        onChange={handleInputChange}
                        placeholder="Ticket Price"
                        className="form_input"
                    />
                </div>
                <div className='mb-5'>
                    <p className='form_label'>Qualifications</p>
                    {formData.qualifications.map((item, index) => (
                        <div key={index} className="mb-5">
                            <div className="grid grid-cols-2 gap-5 mb-5">
                                <div>
                                    <p className='form_label'>Starting Date</p>
                                    <input
                                        type="date"
                                        name='startingDate'
                                        value={item.startingDate}
                                        onChange={(e) => handleReusableInputChangeFunc('qualifications', index, e)}
                                        className='form_input'
                                    />
                                </div>
                                <div>
                                    <p className='form_label'>Ending Date</p>
                                    <input
                                        type="date"
                                        name='endingDate'
                                        value={item.endingDate}
                                        onChange={(e) => handleReusableInputChangeFunc('qualifications', index, e)}
                                        className='form_input'
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5 mb-5">
                                <div>
                                    <p className='form_label'>Degree</p>
                                    <input
                                        type="text"
                                        name='degree'
                                        value={item.degree}
                                        onChange={(e) => handleReusableInputChangeFunc('qualifications', index, e)}
                                        className='form_input'
                                    />
                                </div>
                                <div>
                                    <p className='form_label'>University</p>
                                    <input
                                        type="text"
                                        name='university'
                                        value={item.university}
                                        onChange={(e) => handleReusableInputChangeFunc('qualifications', index, e)}
                                        className='form_input'
                                    />
                                </div>
                            </div>
                            <button type="button" className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer' onClick={() => removeItem('qualifications', index)}>
                                <AiOutlineDelete />
                            </button>
                        </div>
                    ))}
                    <button onClick={addQualification} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>Add Qualification</button>
                </div>
                <div className='mb-5'>
                    <p className='form_label'>Experiences</p>
                    {formData.experiences?.map((item, index) => (
                        <div key={index} className="mb-5">
                            <div className="grid grid-cols-2 gap-5 mb-5">
                                <div>
                                    <p className='form_label'>Starting Date</p>
                                    <input
                                        type="date"
                                        name='startingDate'
                                        value={item.startingDate}
                                        onChange={(e) => handleReusableInputChangeFunc('experiences', index, e)}
                                        className='form_input'
                                    />
                                </div>
                                <div>
                                    <p className='form_label'>Ending Date</p>
                                    <input
                                        type="date"
                                        name='endingDate'
                                        value={item.endingDate}
                                        onChange={(e) => handleReusableInputChangeFunc('experiences', index, e)}
                                        className='form_input'
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5 mb-5">
                                <div>
                                    <p className='form_label'>Position</p>
                                    <input
                                        type="text"
                                        name='position'
                                        value={item.position}
                                        onChange={(e) => handleReusableInputChangeFunc('experiences', index, e)}
                                        className='form_input'
                                    />
                                </div>
                                <div>
                                    <p className='form_label'>Hospital</p>
                                    <input
                                        type="text"
                                        name='hospital'
                                        value={item.hospital}
                                        onChange={(e) => handleReusableInputChangeFunc('experiences', index, e)}
                                        className='form_input'
                                    />
                                </div>
                            </div>
                            <button type="button" className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer' onClick={() => removeItem('experiences', index)}>
                                <AiOutlineDelete />
                            </button>
                        </div>
                    ))}
                    <button onClick={addExperience} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>Add Experience</button>
                </div>
                <div className='mb-5'>
                    <p className='form_label'>Time Slots</p>
                    {formData.timeSlots?.map((item, index) => (
                        <div key={index} className="mb-5">
                            <div className="grid grid-cols-3 gap-5 mb-5">
                                <div>
                                    <p className='form_label'>Day</p>
                                    <select
                                        type="text"
                                        name='day'
                                        value={item.day}
                                        onChange={(e) => handleReusableInputChangeFunc('timeSlots', index, e)}
                                        className='form_input'
                                    >
                                        <option value="">Select</option>
                                        <option value="sunday">Sunday</option>
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                        <option value="saturday">Saturday</option>
                                        </select>
                                </div>
                                <div>
                                    <p className='form_label'>Starting Time</p>
                                    <input
                                        type="time"
                                        name='startingTime'
                                        value={item.startingTime}
                                        onChange={(e) => handleReusableInputChangeFunc('timeSlots', index, e)}
                                        className='form_input'
                                    />
                                </div>
                                <div>
                                    <p className='form_label'>Ending Time</p>
                                    <input
                                        type="time"
                                        name='endingTime'
                                        value={item.endingTime}
                                        onChange={(e) => handleReusableInputChangeFunc('timeSlots', index, e)}
                                        className='form_input'
                                    />
                                </div>
                            </div>
                            <button type="button" className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer' onClick={() => removeItem('timeSlots', index)}>
                                <AiOutlineDelete />
                            </button>
                        </div>
                    ))}
                    <button onClick={addTimeSlot} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>Add Time Slot</button>
                </div>
                <div className="mb-5">
                    <p className='form_label'>About</p>
                    <textarea
                        name="about"
                        rows={5}
                        value={formData.about}
                        placeholder='Write about you'
                        onChange={handleInputChange}
                        className="form_input"
                    ></textarea>
                </div>
                <div className="mb-5 flex items-center gap-3">
                    {formData.photo && <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center ">
                        <img src={formData.photo} alt="" className='w-full rounded-full' />
                    </figure>}
                    <div className='relative w-[130px] h-[50px] '>
                        <input type="file" name='photo' id='customFile' onChange={handleFileInputChange} accept='.jpg, .png' className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' />
                        <label htmlFor="customFile" className='absolute left-0 top-0 w-full h-full bg-[rgba(255,255,255,0.1)] border-[1px] border-solid border-[#cccccc] rounded-[5px] flex items-center justify-center text-[14px]'>Upload Photo</label>
                    </div>
                </div>
                <button type="submit" className='bg-primaryColor py-2 px-5 rounded text-white h-fit cursor-pointer'>
                    Update
                </button>
            </form>
        </div>
    );
};

export default Profile;
