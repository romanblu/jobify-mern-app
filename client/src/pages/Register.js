import { useState, useEffect} from 'react'
import {Logo, FormRow, Alert} from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext';
import {useNavigate} from 'react-router-dom'

const initialState = {
    name:'',
    email:'',
    password:'',
    isMember: true,
    
}

function Register() {
    const navigate = useNavigate()
    const [values, setValues] = useState(initialState);
    const {user, isLoading, showAlert, displayAlert, registerUser, loginUser, setupUser} = useAppContext()

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const {name, email, password, isMember} = values
        if(!email || !password || (!isMember && ! name)){
            displayAlert()
            return
        }

        const currentUser = {name, email, password}
        if(isMember){
            setupUser({currentUser, endPoint:'login', alertText:'Login Successfuly'})
        }else{
            setupUser({currentUser, endPoint:'register', alertText:'User created Successfuly'})
        }

        
    }

    const toggleMember = () => {
        setValues({...values, isMember: !values.isMember})
    }

    useEffect(() => {
        if(user){
            setTimeout(()=> {
                navigate('/')
            }, 3000)
        }
    },[user, navigate])

  return (
    <Wrapper className='full-page'>
        <form className='form' onSubmit={onSubmit}>
            <Logo />
            <h3>{values.isMember ? 'Login' : 'Register'}</h3>
            {showAlert && <Alert />}
            {!values.isMember && (
                <FormRow type='text' value={values.name} name='name' handleChange={handleChange}/>
            )}
            
            <FormRow type='text' value={values.email} name='email' handleChange={handleChange}/>
            <FormRow type='password' value={values.password} name='password' handleChange={handleChange}/>
            <button className='btn btn-block' type='submit' disabled={isLoading}>
                Submit
            </button>
            <p>
                {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                <button className='member-btn' type='button' onClick={toggleMember} >
                    {values.isMember ? 'Register' : 'Login'}
                </button>
            </p>
        </form>
    </Wrapper>
  )
}

export default Register