import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate  } from 'react-router-dom'
import Error from '../Components/Common/Error'
import { userLogin } from '../redux/postReducer/UserPost'
import '../Components/CSS/login.css'
import {useform} from 'react-hook-form'
import {BsEyeFill} from 'react-icons/bs'
import { toast } from 'react-toastify';


const Login = () => {
  const { loading, userInfo, error ,success} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [customError, setCustomError] = useState(null)
  const [passwordShown, setPasswordShown] = useState(false);

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))  
    toast(error || customError)
  }

  // const AllFilled = (register.Email !== '') && (register.password !== "")
  // 
  return (
    <div className='mainlogin'>
    <div className='loginheader'>
      <h2>
        MKS RACING DASHBOARD
      </h2>
    </div>
   <div className='registrationform'>
   
   <form onSubmit={handleSubmit(submitForm)}>
   <h3 className='WelcomeAdmin'>Welcome Admin</h3>
      {/* {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>} */}
      <div className='form-group'>
      
        <input
          type='email'
          className='form-input'
          placeholder='Email'
          {...register('Email')}
          required
        />
      </div>
     
    
      <div className='form-group'>
      
        <input
           type={passwordShown ? "text" : "password"}
          placeholder='Password'
          className='form-input'
          {...register('password')}
          required
        /><div className='showIcon'> <i onClick={togglePasswordVisiblity}><BsEyeFill/></i></div>
      </div>
      <button type='submit' className='buttonRegister' 
      disabled={loading}>
        Login
      </button>
    </form>
   </div>

    </div>
  )
}

export default Login