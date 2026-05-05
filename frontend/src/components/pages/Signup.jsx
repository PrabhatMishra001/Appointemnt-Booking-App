import React, { useState } from 'react';
import signupImg from '../../assets/images/signup.gif';
import { Link, useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { BASE_URL } from './../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Signup = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        photo: "",
        gender: "",
        role: "patient",
    });

    const [doctorFields, setDoctorFields] = useState({
        specialization: "",
        qualifications: [],
        experiences: [],
        bio: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDoctorFieldChange = (field, value) => {
        setDoctorFields(prev => ({...prev, [field]: value}));
    };

    const handleRoleChange = (e) => {
        const newRole = e.target.value;
        setFormData({ ...formData, role: newRole });
        if (newRole === 'patient') {
            setDoctorFields({
                specialization: "",
                qualifications: [],
                experiences: [],
                bio: "",
            });
        }
    };

    const addQualification = () => {
        setDoctorFields(prev => ({
            ...prev,
            qualifications: [...prev.qualifications, { degree: '', year: '' }]
        }));
    };

    const removeQualification = (index) => {
        setDoctorFields(prev => ({
            ...prev,
            qualifications: prev.qualifications.filter((_, i) => i !== index)
        }));
    };

    const updateQualification = (index, field, value) => {
        setDoctorFields(prev => {
            const newQuals = [...prev.qualifications];
            newQuals[index] = { ...newQuals[index], [field]: value };
            return { ...prev, qualifications: newQuals };
        });
    };

    const addExperience = () => {
        setDoctorFields(prev => ({
            ...prev,
            experiences: [...prev.experiences, { hospital: '', from: '', to: '' }]
        }));
    };

    const removeExperience = (index) => {
        setDoctorFields(prev => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== index)
        }));
    };

    const updateExperience = (index, field, value) => {
        setDoctorFields(prev => {
            const newExps = [...prev.experiences];
            newExps[index] = { ...newExps[index], [field]: value };
            return { ...prev, experiences: newExps };
        });
    };

    const handleFileInputChange = async (event) => {
        try {
            const file = event.target.files[0];
            setPreviewURL(URL.createObjectURL(file));
            const data = await uploadImageToCloudinary(file);
            setSelectedFile(data.secure_url);
            setFormData({ ...formData, photo: data.secure_url });
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData.role === 'patient' ? formData : { ...formData, ...doctorFields })
            });
            const { message } = await res.json();
            if (!res.ok) {
                throw new Error(message);
            }
            setLoading(false);
            toast.success(message);
            navigate('/login');
        } catch (err) {
            toast.error(err.message);
            setLoading(false);
        }
    };

    return (
        <section className="px-4 xl:px-0">
            <div className="max-w-[1170px] mx-auto ">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                    <div className="hidden lg:block bg-primaryColor rounded-l-lg">
                        <figure className="rounded-l-lg">
                            <img src={signupImg} alt="" className='w-full rounded-l-lg ' />
                        </figure>
                    </div>
                    <div className="rounded-l-lg lg:pl-16 py-10 px-4">
                        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 ">
                            Create an <span className="text-primaryColor">account</span>
                        </h3>
                        <div>
                           <form onSubmit={handleSignup}> 
                            <div className="mb-5">
                                <input type="text" placeholder='Full Name' name='name' value={formData.name} onChange={handleInputChange} className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer ' required />
                            </div>
                            <div className="mb-5">
                                <input type="email" placeholder='Enter Your Email' name='email' value={formData.email} onChange={handleInputChange} className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer ' required />
                            </div>
                            <div className="mb-5">
                                <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleInputChange} className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer ' required />
                            </div>

                            <div className="mb-5 flex items-center justify-between">
                                <label htmlFor="role" className='text-headingColor font-bold text-[15px] leading-7 '> Are you a:
                                    <select name="role" value={formData.role} onChange={handleRoleChange} className='text-textColor font-semibold text-[15px] px-4 py-3 focus:outline-none '>
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                    </select>
                                </label>
                                <label htmlFor="gender" className='text-headingColor font-bold text-[15px] leading-7 '> Gender:
                                    <select name="gender" value={formData.gender} onChange={handleInputChange} className='text-textColor font-semibold text-[15px] px-4 py-3 focus:outline-none '>
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </label>
                            </div>
                            <div className="mb-5 flex items-center gap-3">
                              {previewURL && <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center ">
                                  <img src={previewURL} alt="" className='w-full rounded-full' />
                              </figure>}
                                <div className='relative w-[130px] h-[50px] '>
                                    <input type="file" name='photo' id='customFile' onChange={handleFileInputChange} accept='.jpg, .png' className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' />
                                    <label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer '> Upload Photo</label>
                                </div>
                            </div>

                            {formData.role === 'doctor' && (
                                <div className="doctor-fields mb-5 p-4 border border-gray-200 rounded-lg">
                                    <h4 className="text-headingColor font-bold mb-4">Doctor Profile Details</h4>
                                    
                                    <div className="mb-5">
                                        <input 
                                            type="text" 
                                            placeholder='Specialization (e.g. Cardiologist)' 
                                            value={doctorFields.specialization}
                                            onChange={(e) => handleDoctorFieldChange('specialization', e.target.value)}
                                            className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' 
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <label className="text-headingColor font-bold mb-2 block">Qualifications (Education)</label>
                                        {doctorFields.qualifications.map((qual, index) => (
                                            <div key={index} className="flex gap-2 mb-2 items-end">
                                                <input 
                                                    type="text" 
                                                    placeholder='Degree (e.g. MBBS)' 
                                                    value={qual.degree}
                                                    onChange={(e) => updateQualification(index, 'degree', e.target.value)}
                                                    className='flex-1 py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor'
                                                />
                                                <input 
                                                    type="text" 
                                                    placeholder='Year (e.g. 2015)' 
                                                    value={qual.year}
                                                    onChange={(e) => updateQualification(index, 'year', e.target.value)}
                                                    className='w-28 py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor'
                                                />
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeQualification(index)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button 
                                            type="button" 
                                            onClick={addQualification}
                                            className="text-primaryColor font-semibold mt-2 hover:text-primaryColorDark"
                                        >
                                            + Add Qualification
                                        </button>
                                    </div>

                                    <div className="mb-5">
                                        <label className="text-headingColor font-bold mb-2 block">Experiences</label>
                                        {doctorFields.experiences.map((exp, index) => (
                                            <div key={index} className="flex gap-2 mb-2 items-end">
                                                <input 
                                                    type="text" 
                                                    placeholder='Hospital/Clinic' 
                                                    value={exp.hospital}
                                                    onChange={(e) => updateExperience(index, 'hospital', e.target.value)}
                                                    className='flex-1 py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor'
                                                />
                                                <input 
                                                    type="text" 
                                                    placeholder='From (e.g. 2018)' 
                                                    value={exp.from}
                                                    onChange={(e) => updateExperience(index, 'from', e.target.value)}
                                                    className='w-24 py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor'
                                                />
                                                <input 
                                                    type="text" 
                                                    placeholder='To (e.g. Present)' 
                                                    value={exp.to}
                                                    onChange={(e) => updateExperience(index, 'to', e.target.value)}
                                                    className='w-24 py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-primaryColor'
                                                />
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeExperience(index)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button 
                                            type="button" 
                                            onClick={addExperience}
                                            className="text-primaryColor font-semibold mt-2 hover:text-primaryColorDark"
                                        >
                                            + Add Experience
                                        </button>
                                    </div>

                                    <div className="mb-5">
                                        <textarea 
                                            placeholder="Short bio/about (max 50 chars)" 
                                            value={doctorFields.bio}
                                            onChange={(e) => handleDoctorFieldChange('bio', e.target.value.slice(0,50))}
                                            className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' 
                                            rows="3"
                                            maxLength="50"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="mt-7">
                                <button disabled={loading} type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 hover:bg-primaryColorDark transition-colors'>
                                    {loading ? <HashLoader size={35} color='#ffffff'/> : 'Sign Up'}
                                </button>
                            </div>
                            <p className="mt-5 text-textColor text-center">
                                Already have an account?
                                <Link to="/login" className="text-primaryColor font-medium ml-1 hover:text-primaryColorDark">
                                    Login
                                </Link>
                            </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
