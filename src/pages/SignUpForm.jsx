import React, { useEffect, useState } from 'react';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country: '',
        age: '',
        password: '',

    });
    const [err, setErr] = useState({});
    const [disable, setDisable] = useState(true);

    
    const isFormValid = () => {

        if(!formData.email && !formData.password) return false;

        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let tempErrors = {};
        if (formData.email && !re.test(formData.email.toLowerCase()))  
            tempErrors.email = "Invalid Email";
        else tempErrors.email = ""; 

        if(formData.password && formData.password.length < 8)
            tempErrors.password = "Password must be at least 8 characters long";
        else tempErrors.password = "";
        
        setErr(tempErrors);

        if( !tempErrors.email  && !tempErrors.password)  return true;        
    
        return false;

    }

    const handleSubmit = e => {
        
        e.preventDefault();
        console.log(formData);
        
    };
    useEffect( () => {
        if(isFormValid())  setDisable(false);
        else setDisable(true);
        
    }, [formData])
    
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <form style={{ 
                height: "25em", 
                aspectRatio: "3/4", 
                border: "black solid 1px",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",

                }
            } onSubmit={handleSubmit}>
                <h1>react-form</h1>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                {err.email && <p>{err.email}</p>}
                <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                {err.password && <p>{err.password}</p>}
                <button type="submit" disabled={disable}>Sign Up</button>
            </form>
        </div>

    );
};

export default SignupForm;
