import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken=user=>{
    return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_key)
}

export const register= async(req,res)=>{
   const{email,password,name,role,photo,gender}=req.body
    try{
        let user=null
        if(role=='patient'){
            user=await User.findOne({email})
        }
        else if(role=='doctor'){
            user=await User.findOne({email})
        }

        // check if user exist

        if(user){
            return res.status(400).json({message:'user already exist'})
        }
//hash passwords
const salt = await bcrypt.genSalt(10)
const hashPassword=await bcrypt.hash(password,salt)

if(role=='patient'){
    user=new User({
        name,
        email,
        password:hashPassword,
        photo,
        gender,
        role
    })
}
    if(role=='doctor'){
        user=new Doctor({
            name,
            email,
            password:hashPassword,
            photo,
            gender,
            role
        })
        
}
await user.save()
res.status(200).json({success:true,message:'User successfully created'})
    } catch(err){
        res.status(500).json({success:false,message:'User not successfully created'})

    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = null;
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });

        if (patient) {
            user = patient;
        }
        if (doctor) {
            user = doctor;
        }

        // Check if the user exists or not
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ status: false, message: "Invalid credentials" });
        }

        // Generate a token
        const token = generateToken(user);

        // Send the token as a response
        res.status(200).json({ status: true, message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
};
