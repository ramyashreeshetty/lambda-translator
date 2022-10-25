# Lambda Translator

This translation application is built using ReactJS, AWS Lambda, AWS S3 and AWS Translate.


## How it works

- When user uploads a file it is sent to the input S3 bucket. 
- As soon as a file is detected by lambda it triggers the translate function which translates the file into the desired language & sends it back to the output S3 bucket.
- User can download the file using UI.

<div>
 <img src="https://user-images.githubusercontent.com/43513353/197625480-aa243ead-ae7e-4e24-80b2-95999eb554d7.png" width="650" height="400">
<div>
