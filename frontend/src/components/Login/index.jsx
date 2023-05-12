import styles from './styles.module.css'
// import { Link} from 'react-router-dom/cjs/react-router-dom.min'
import axios  from 'axios'
import { Link } from "react-router-dom";
import {  useNavigate } from "react-router-dom";

import { useState } from 'react'
const Login = () => {
// const navigate = useNavigate();


    const [data, setData] = useState({
       
        email: "",
        password:""
    })
    const [error,setError] =useState("")

    const handleChange = ({ currentTarget: input }) => {
        setData({...data,[input.name]:input.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:8004/trivia/login'
            
            // const result =await fetch(url, {
            //    method:"POST",
               
            //     body:JSON.stringify(data)
            // }).then((res) => { return res.json() })
            const { data: res } = await axios.post(url, data)
            if (res.token) {
                localStorage.setItem("token", res.token)
            window.location ="/"
            }
            
     
            // if (res.token ) {
                // navigate("/main") 
            // }
           
            
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    
                <form className={styles.form_container} onSubmit={handleSubmit} action="">
                        <h1>Login to your account</h1>
                    <input type="text" placeholder='Email' name='email' onChange={handleChange} value={data.email} required className={ styles.input} />
                    <input type="password" placeholder='Password' name='password' onChange={handleChange} value={data.password} required className={ styles.input} />
                    {error && <div className={styles.error_msg}>{error}</div>}
                        <button type='submit' className={styles.green_btn}>
                        login
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                <h1>New here</h1>
                    <Link to="/signup">
                        <button type='button' className={styles.white_btn} name="username">
                            signup
                        </button>


                    </Link>
                   
                        
                </div>
            </div>
        </div>
    )
}
export default Login