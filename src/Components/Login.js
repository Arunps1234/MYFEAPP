import React, {useState} from "react"
import "./Login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login  = ()=>{

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [statuscode, setStatuscode] = useState()

    const navigate = useNavigate()

    const data = {
        email, password
    }


    const submitSignIn = (e) =>{
e.preventDefault();
axios.post("http://localhost:5080/API/Auth/login", data).then(res=>{
    setStatuscode(res.status)

    setMessage(res.data.msg)
    setTimeout(
()=>{
    navigate("/home")
}, 2000)
}).catch(err=>{
    setStatuscode(err.response.status)
    setMessage(err.response.data.msg)


})
    }

    console.log(statuscode)

    return(
<>
{ message &&
        <div className={statuscode ==201 ? "alert alert-success" :  "alert alert-danger"} style={{textAlign:"center"}}>{message}</div>

}
        <div style={{width:"50%"}} className="loginform">
<form className="form-group" onSubmit={submitSignIn}>


<div >
    <label className="form-label">Email</label>
    <input type="text" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/>
</div>


<div >
    <label className="form-label">Password</label>
    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
</div>
<br/>
<div >
<button className="btn btn-success" style={{width:"100%"}}>Sign In</button>
</div>



</form>
        </div>
        </>
    )
}

export default Login