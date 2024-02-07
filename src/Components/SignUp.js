import React, { useState } from "react"
import "./SignUp.css"
import axios from "axios"
import {Link} from "react-router-dom"



const SignUp = () => {

    // States
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastNmae] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassWord] = useState("")
    const [successmessage, setMessage] = useState("")




    const data = {
        firstname,
        lastname,
        email,
        phone,
        password
    }

    const SubmitSignUp = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5080/API/Auth/register", data).then(res => {
            console.log(res)
            setMessage(res.data.msg)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
      <div>
        { successmessage &&

<div style={{marginLeft:"40%"}}>
                    <span className="alert alert-success">{successmessage}</span>
                </div>
}


        <div style={{ width: "50%" }} className="registerform">
            <form className="form-group" onSubmit={SubmitSignUp}>

               <h3 style={{textAlign:"center"}} className="registerheader">Create your account</h3> 


                <div>
                    <label className="form-label">FirstName</label>
                    <input type="text" className="form-control" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                </div>

                <div>
                    <label className="form-label">LastName</label>
                    <input type="text" className="form-control" value={lastname} onChange={(e) => setLastNmae(e.target.value)} />


                </div>


                <div>
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>


                <div>
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div>
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassWord(e.target.value)} />
                </div>
                <br />
                <div>
                    <button className="btn btn-success" style={{ width: "100%" }}>Sign Up</button>
                    <div style={{textAlign:"center"}}>
                     <span>Already have an account?</span> <Link to="/login">Login In</Link>
                    </div>
                </div>

            </form>
        </div>

        </div>
    )
}

export default SignUp