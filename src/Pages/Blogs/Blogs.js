import React from 'react';
import './Blogs.css';
import './Blogs.css';

const Blogs = () => {
    return (
        <section className='blogs-container'>
            <div className='m-3 p-3 first-question'>
                <h4>Difference between authorization and authentication:</h4>
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
            </div>

            <div className='m-3 p-3 second-question'>
                <h4>Why are you using firebase? </h4>
                <p>Google Firebase is an application development platform that allows developers to create iOS, Android, and Web apps. Google Firebase offers many features that pitch it as the go-to backend development tool for web and mobile apps. It reduces development workload and time. Firebase is a less technical and time-saving alternative to writing full-fledged backend code for dynamic apps. That's why I'm using firebase.</p>

                <h4>What other options do you have to implement authentication?</h4>

                <h5>Other options to implement authentication:</h5>
                <p><b>Card:</b> A smart card is a secure microcontroller that is typically used for generating, storing and operating on cryptographic keys. Smart card authentication provides users with smart card devices for the purpose of authentication. Users connect their smart card to a host computer. Software on the host computer interacts with the keys material and other secrets stored on the smart card to authenticate the user.</p>
                <p><b>Ratina Scans:</b> A retinal scan is a biometric technique that maps the unique patterns of a person’s retina using a low-intensity light source. Through a delicate sensor, a retinal scan examines the pattern of retina blood vessels, which remains unchanged from birth until death.</p>

                <p> <b>Voice Recognition:</b> Voice recognition (also called speaker recognition or voice authentication) applies analyzes of a person’s voice to verify their identity. Airways and soft-tissue cavities, as well as the shape and movement of the mouth and jaw, influence voice patterns to create a unique “voiceprint.”
                </p>

                <p> <b>Fingerprint:</b> Fingerprint Authentication is the act of verifying an individual's identity based on one or more of their fingerprints. The concept has been leveraged for decades across various efforts including digital identity, criminal justice, financial services, and border protections.</p>

            </div>

            <div className='m-3 p-3 third-question'>
                <h4>What other services does firebase provide other than authentication?</h4>

                <p>There are many services which Firebase provides, Most useful of them are:</p>
                <p>
                    <b>Cloud Firestore:</b> Cloud Firestore is a NoSQL document database that lets you easily store, sync, and query data for your mobile and web apps - on a global scale.
                    <br />

                    <b>Cloud Functions:</b> Cloud Functions for Firebase is a serverless framework that lets you automatically run backend code in response to events triggered by Firebase features and HTTPS requests. Your JavaScript or TypeScript code is stored in Google's cloud and runs in a managed environment.
                    <br />

                    <b>Hosting:</b> Firebase can be a good choice to deploy static websites and Single Page Apps. people like to use Firebase Hosting mainly because
                    they tested many different providers and Firebase offers an awesome speed across the continents without the need for a separate CDN on top, since the CDN is built-in for free.
                    <br />

                    <b>Cloud Storage:</b> Firebase Cloud Storage is a modern technology that allows for storing and managing various media content generated by mobile app users. One of its biggest advantages is reliability. Firebase SDK for Cloud Storage works regardless of the network quality.
                    <br />

                    <b>Google Analytics:</b> Google Analytics is a free app measurement solution that provides insight on app usage and user engagement. Analytics reports help you understand clearly how your users behave, which enables you to make informed decisions regarding app marketing and performance optimizations.
                    <br />

                    <b>Remote Config:</b> Firebase Remote Config is a cloud service that lets you change the behavior and appearance of your app without requiring users to download an app update. When using Remote Config, you create in-app default values that control the behavior and appearance of your app.
                    <br />

                    <b>Cloud Messaging:</b> Firebase Cloud Messaging (FCM) provides a reliable and battery-efficient connection between your server and devices that allows you to deliver and receive messages and notifications on iOS, Android, and the web at no cost.

                    <br />
                    <b> Predictions:</b> Firebase Predictions is a tool that is using analytical data of your app to predict or anticipate user actions for it. You can use Firebase Predictions with different other services to make the most out of it with ease.
                    <br />

                    <b>Dynamic Links:</b> Dynamic Links are deep links into an app that work whether or not users have installed the app yet. When users open a Dynamic Link into an app that is not installed, the app's Play Store page opens, where users can install the app. After users install and open the app, the app displays the deep-linked content.

                </p>
            </div>


        </section>
    );
};

export default Blogs;