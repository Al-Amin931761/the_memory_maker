import React from 'react';

const Blogs = () => {
    return (
        <section>
            <h4 className='m-3'>Difference between authorization and authentication:</h4>
            <div className='d-flex m-3'>
                <div className='w-50 p-3'>
                    <p><b>Authentication:</b></p>
                    <p>1. Authentication verifies who the user is. <br /> 2. It is usually performed before the authorization. <br />  3. In this, the user or client and server are verified. <br /> 4. Authentication works through passwords, one-time pins, biometric information, and other information provided or entered by the user. <br /> 5. Authentication is visible to and partially changeable by the user.</p>
                </div>
                <div className='w-50 p-3'>
                    <p><b>Authorization:</b>
                    </p>
                    <p>1. Authorization determines what resources a user can access. <br /> 2. It is usually done once the user is successfully authenticated. <br /> 3. In this, it is verified that if the user is allowed through the defined policies and rules. <br /> 4. Authorization works through settings that are implemented and maintained by the organization. <br /> 5. Authorization isn't visible to or changeable by the user.</p>

                    <h4> What other options do you have to implement authentication?</h4>
                    <p></p>
                </div>
            </div>

            <div>
                <h4 className='m-3'>Why are you using firebase?</h4>
                <p>Google Firebase is an application development platform that allows developers to create iOS, Android, and Web apps. Google Firebase offers many features that pitch it as the go-to backend development tool for web and mobile apps. It reduces development workload and time.
                    Firebase is a less technical and time-saving alternative to writing full-fledged backend code for dynamic apps.</p>
            </div>
        </section>
    );
};

export default Blogs;