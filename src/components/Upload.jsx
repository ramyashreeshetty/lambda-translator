import React , {useState} from 'react';
import S3 from 'react-aws-s3';
import '../App.css';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { Paper,LinearProgress} from '@mui/material';
import AWS from 'aws-sdk';


const font = "'Poppins', sans-serif";
const useStyles = makeStyles({
  divSection: {
    align: 'center',
    textAlign: 'center',
    marginTop: "2%",
    backgroundColor:"#626ad82e",
    margin:"1% 10% 1% 10%",
    padding:"3%"
  },
  appText: {
    textDecoration: "none",
    color: "black",
    fontFamily: font,
    fontSize: "22px"
  },
  inBtn: {
    fontFamily: font,
    color: "black",
    marginTop: "2%",
    align: 'center',
    textAlign: 'center'
  },
  upBtn:{
    fontFamily: font,
    color: "white",
    marginTop: "1%",
    textAlign: 'center',
    backgroundColor: '#626ad8',
    marginBottom:"3%"
  },
  section:{
    textAlign: 'center',
  },
  bar:{
    margin:"4% 35% 1% 35%"
  },
  progStyle:{
    textAlign: 'center',
    fontFamily: font,
    color:"green",
    fontSize:"11px"
  },
  divSection2: {
    align: 'center',
    textAlign: 'center',
    marginTop: "2%",
    backgroundColor:"#626ad82e",
    margin:"3% 35% 3% 35%",
    padding:"3%"
  },
  appText2: {
    textDecoration: "none",
    color: "black",
    fontFamily: font,
    marginTop: "3%"
  },
  upBtn2:{
    fontFamily: font,
    color: "#626ad8",
    marginTop: "3%",
    textAlign: 'center',
    backgroundColor: 'white',
    '&:hover': {
        background: "#626ad8",
        color: "white",
    },}
});

// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

const Upload = () => {

    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState(null);
    const [bar, setBar] = useState(0);
    const [prog, setProg] = useState('');
    const [fileval, setFileval] = useState("");

    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET,
    }

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    AWS.config.update(
    {
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET,
    });

    const uploadFile = async (file) => {
        const ReactS3Client = new S3(config);

        ReactS3Client
        .uploadFile(file, file.name)
        .then(data => console.log(data.location))
        .catch(err => console.error(err))

        setFileval(file.name)
        setBar(bar + 100)
        setProg("Sucessful, you can download your translated file!")
    }

    const downloadFile = () => {
        var s3 = new AWS.S3();
        s3.getObject(
        { Bucket: process.env.REACT_APP_BUCKET_NAME_OP, Key:fileval},
        function (error, data) {
            if (error != null) {
            alert("Failed to retrieve an object: " + error);
            } else {
            //alert("Loaded " + data.ContentLength + " bytes");   
                var FileSaver = require('file-saver');
                var blob = new Blob([data.Body], {type: "text/plain;charset=utf-8"});
                FileSaver.saveAs(blob, "translated.txt");
                window.location.reload()
            }}
        );

    }

    return(
    <div className={classes.section}>
        <Paper elevation={2} className={classes.divSection}>
            <div className={classes.appText}>Upload your file to translate it into your desired language</div>
            <input className={classes.inBtn} type="file" onChange={handleFileInput}/>
            <br></br>
        </Paper>

        <LinearProgress  variant="determinate" className={classes.bar} value={bar}/>
        <p className={classes.progStyle}>{prog}</p>
        <Button size="large" variant="contained" className={classes.upBtn} onClick={() => uploadFile(selectedFile)}>Upload File</Button>

        <Paper elevation={2} className={classes.divSection2}>
            <div className={classes.appText2}>Download your translated file</div>
            <Button size="small" variant="outlined" className={classes.upBtn2} onClick={downloadFile}>Download File</Button>
        </Paper>
    </div>
)}

export default Upload;