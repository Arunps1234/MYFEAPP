import React, { useState } from "react"
import "./SignUp.css"
import axios from "axios"
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"


const SignUp = () => {

    const { register, handleSubmit, formState: { errors } , reset} = useForm()

    // States
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastNmae] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassWord] = useState("")
    const [successmessage, setMessage] = useState("")

    const navigate = useNavigate()




    const data = {
        firstname,
        lastname,
        email,
        phone,
        password
    }

    const SubmitSignUp = (e) => {
    
        axios.post("http://localhost:5080/API/Auth/register", data).then(res => {
            setMessage(res.data.msg)
reset()
            setTimeout(()=>{
navigate("login")
            },2000)
        }).catch(err => {
            console.log(err)
        })
    }

    console.log(errors)


    return (
        <div>
            {successmessage &&

                <div>
                    <div className="alert alert-success" style={{textAlign:"center"}}> {successmessage}</div>
                </div>
            }


            <div style={{ width: "50%" }} className="registerform">
                <form className="form-group" onSubmit={handleSubmit(SubmitSignUp)}>

                    <h3 style={{ textAlign: "center" }} className="registerheader">Create your account</h3>


                    <div>
                        <label className="form-label">FirstName</label>
                        <input   {...register("firstname", { required: "First name is required" })}  type="text" className="form-control"  value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                
                {errors.firstname && <span className="text-danger">{errors.firstname.message}</span>}
                    </div>

                    <div>
                        <label className="form-label">LastName</label>
                        <input type="text" className="form-control"      {...register("lastname", { required: "Last name is required" })}  value={lastname} onChange={(e) => setLastNmae(e.target.value)}/>
{
    errors.lastname && <span className="text-danger">{errors.lastname.message}</span>
}

                    </div>


                    <div>
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control"     {...register("email", { required: "Email is required" })} value={email} onChange={(e) => setEmail(e.target.value)} />
                 {
                    errors.email && <span className="text-danger">{errors.email.message}</span>
                 }
                 
                    </div>


                    <div>
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control"    {...register("phone", { required: "Phone number is required" })} value={phone} onChange={(e) => setPhone(e.target.value)}/>
                 
                 {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
                    </div>

                    <div>
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control"    {...register("password", { required: "Password is required" })} value={password} onChange={(e) => setPassWord(e.target.value)}/>
                  {
                    errors.password && <span className="text-danger">{errors.password.message}</span>
                  }
                  
                    </div>
                    <br />
                    <div>
                        <button className="btn btn-success" style={{ width: "100%" }}>Sign Up</button>
                        <div style={{ textAlign: "center" }}>
                            <span>Already have an account?</span> <Link to="/login">Login In</Link>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default SignUp