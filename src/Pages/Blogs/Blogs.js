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
                </div>
            </div>
        </section>
    );
};

export default Blogs;