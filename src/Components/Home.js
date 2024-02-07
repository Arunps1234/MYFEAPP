import React, { useState, useEffect } from 'react'
import axios from "axios"
import Male from "./Assets/Male.png"
import Female from  "./Assets/Female.png"


const Home = () => {
    const [users, setUsers] = useState([])
    const [deletemessage, setDeletemessage] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:5080/API/User/getUsers").then(res => {
            setUsers(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const deleteUser = (id) => {
        axios.delete(`http://localhost:5080/API/User/delete/${id}`).then(res => {
            setDeletemessage(res.data.msg)
            setTimeout(() => {
                setDeletemessage(false);
                window.location.reload()
            }, 2000)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <>


            <div style={{ width: "100%" }}>
                {deletemessage &&
                    <div className='alert alert-success' style={{ textAlign: "center" }}>{deletemessage}</div>
                }
            </div>
            <div style={{ margin: "50px" }}>
                <table className="table"  >
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Profile</th>
                            <th>Actions</th>
                        </tr>
                    </thead>


                    <tbody>
                        {
                            users.map((user, i) => (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.gender}</td>
                                    <td >

                                        {
                                            user.gender =="Male" ? 
                                            <img src={Male} style={{width:"80px", height:"80px"}}/>
                                            : 
                                            <img src={Female} style={{width:"80px", height:"80px"}}/>
                                        }
                                    </td>
                                    <td >
                                        <button className='btn btn-warning' style={{ width: "100px" }}>Edit</button> &nbsp;
                                        <button className='btn btn-danger' style={{ width: "100px" }} onClick={() => deleteUser(user._id)}> Delete</button>

                                    </td>



                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Home