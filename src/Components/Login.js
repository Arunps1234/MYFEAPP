import React, {useState} from "react"
import "./Login.css"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
const Login  = ()=>{


    const { register, handleSubmit, formState:{errors}} = useForm()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [statuscode, setStatuscode] = useState()

    const navigate = useNavigate()

    const data = {
        email, password
    }


    const submitSignIn = (e) =>{
axios.post("http://localhost:5080/API/Auth/login", data).then(res=>{
    setStatuscode(res.status)
    setTimeout(
()=>{
    alert(res.data.msg)

    navigate("/home")
}, 500)
}).catch(err=>{
    
alert(err.response.data.msg)

})
    }


    return(
<>

        <div style={{width:"50%"}} className="loginform">
<form className="form-group" onSubmit={handleSubmit(submitSignIn)}>
<h3 style={{textAlign:"center"}}>Login in to your account</h3>

<div >
    <label className="form-label">Email</label>
    <input type="text" className="form-control"  {...register("email", { required: "Email is required" })}  value={email} onChange={(e)=>setEmail(e.target.value)}/>
{errors.email && <span className="text-danger">{errors.email.message}</span>}

</div>


<div >
    <label className="form-label">Password</label>
    <input type="password" {...register("password", {required : "Password is required"})} className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
{
    errors.password &&  <span className="text-danger">{errors.password.message} </span>
 }

</div>
<br/>
<div >
<button className="btn btn-success" style={{width:"100%"}}>Sign In</button>

<div style={{textAlign:"center"}}>
    <span>Dont have an account? <Link to="/">Sign Up</Link></span>
</div>
</div>



</form>
        </div>
        </>
    )
}

export default Login