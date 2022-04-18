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

            <div className='m-3 p-3'>
                <h4>Why are you using firebase? </h4>
                <p>Google Firebase is an application development platform that allows developers to create iOS, Android, and Web apps. Google Firebase offers many features that pitch it as the go-to backend development tool for web and mobile apps. It reduces development workload and time.
                    Firebase is a less technical and time-saving alternative to writing full-fledged backend code for dynamic apps.</p>

                <h4>What other options do you have to implement authentication?</h4>

                <p>Other options to implement authentication:</p>
                <p><b>Card:</b> A smart card is a secure microcontroller that is typically used for generating, storing and operating on cryptographic keys. Smart card authentication provides users with smart card devices for the purpose of authentication. Users connect their smart card to a host computer. Software on the host computer interacts with the keys material and other secrets stored on the smart card to authenticate the user.</p>
                <p><b>Ratina Scans:</b> A retinal scan is a biometric technique that maps the unique patterns of a person’s retina using a low-intensity light source. Through a delicate sensor, a retinal scan examines the pattern of retina blood vessels, which remains unchanged from birth until death.</p>

                <p> <b>Voice Recognition:</b> Voice recognition (also called speaker recognition or voice authentication) applies analyzes of a person’s voice to verify their identity. Airways and soft-tissue cavities, as well as the shape and movement of the mouth and jaw, influence voice patterns to create a unique “voiceprint.”
                </p>

                <p> <b>Fingerprint:</b> Fingerprint Authentication is the act of verifying an individual's identity based on one or more of their fingerprints. The concept has been leveraged for decades across various efforts including digital identity, criminal justice, financial services, and border protections.</p>

            </div>

            <div>
                <h4>  <h4>What other services does firebase provide other than authentication?</h4>
                </h4>
                Cloud Storage.
                Cloud Firestore.
                Firebase Realtime Database.
                Firebase Hosting.
            </div>
        </section>
    );
};

export default Blogs;