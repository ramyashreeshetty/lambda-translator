import React , {useState} from 'react';
import S3 from 'react-aws-s3';
import '../App.css';
import { makeStyles } from '@mui/styles';
import { Paper,LinearProgress, FormControl, InputLabel, Select, MenuItem, Button} from '@mui/material';
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
    justifyContent: 'center',
    textAlign: 'center'
  },
  upBtn:{
    fontFamily: font,
    color: "white",
    marginTop: "1%",
    textAlign: 'center',
    backgroundColor: '#626ad8',
    marginBottom:"2%"
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
    textAlign: 'center',
    backgroundColor:"#626ad82e",
    margin:"1% 35% 1% 35%",
    padding:"3%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column"
  },
  appText2: {
    textDecoration: "none",
    color: "black",
    fontFamily: font,
    marginTop: "2%"
  },
  upBtn2:{
    fontFamily: font,
    color: "#626ad8",
    marginTop: "5%",
    textAlign: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
    '&:hover': {
        background: "#626ad8",
        color: "white",
    },},
    option:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center",
      marginTop:"3%",
      fontFamily:font,
    },
    drop:{
      width:"20%",
      fontSize:"18px",
      fontFamily:font,
    },
    circleBar:{
      marginBottom:"10%",
      alignContent:"center",
      textAlign:"center",
      marginTop:"2%",
    }
});

// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

const Upload = () => {

    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState(null);
    const [bar, setBar] = useState(0);
    const [prog, setProg] = useState('');
    const [fileval, setFileval] = useState("");
    const [selected, setSelected] = useState('');
    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    const selectionChangeHandler = (event) => {
      setSelected(event.target.value);
    };

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

        if ( selected !== "" ) {
        ReactS3Client
        .uploadFile(file,selected+"$"+file.name)
        .then(data => console.log(data.location))
        .catch(err => console.error(err))

        setFileval(file.name)
        setBar(bar + 100)
        setProg("Sucessful, you can download your translated file!")

        }
        else {
          alert("Select language");
        }
    }

    const downloadFile = async () => {
        await delay(3000);
        var s3 = new AWS.S3();
        s3.getObject(
        { Bucket: process.env.REACT_APP_BUCKET_NAME_OP, Key:selected+"$"+fileval},
        function (error, data) {
            if (error != null) {
            alert("Failed to retrieve an object: " + error);
            } else {
            //alert("Loaded " + data.ContentLength + " bytes");   
                var FileSaver = require('file-saver');
                var blob = new Blob([data.Body], {type: "text/plain;charset=utf-8"});
                FileSaver.saveAs(blob, "translated.txt");
                window.location.reload()
                }
            }
        );
    }

    return(
    <div className={classes.section}>
        <Paper elevation={2} className={classes.divSection} >
            <div className={classes.appText}>Upload your file to translate it into your desired language</div>
            <div className={classes.option}>
              <input className={classes.inBtn} type="file" onChange={handleFileInput}/>
              <FormControl fullWidth className={classes.drop} variant="standard" size="small">
                <InputLabel id="demo-simple-select-label"  sx={{fontFamily:font, fontSize:"14px"}}>Select Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selected}
                  label="language"
                  onChange={selectionChangeHandler}>
                  <MenuItem value={'en'} sx={{fontFamily:font, fontSize:"14px"}}>English</MenuItem>
                  <MenuItem value={'hi'} sx={{fontFamily:font, fontSize:"14px"}}>Hindi</MenuItem>
                  <MenuItem value={'de'} sx={{fontFamily:font, fontSize:"14px"}}>German</MenuItem>
                  <MenuItem value={'it'} sx={{fontFamily:font, fontSize:"14px"}}>Italian</MenuItem>
                  <MenuItem value={'ja'} sx={{fontFamily:font, fontSize:"14px"}}>Japanese</MenuItem>
                  <MenuItem value={'ko'} sx={{fontFamily:font, fontSize:"14px"}}>Korean</MenuItem>
                  <MenuItem value={'es'} sx={{fontFamily:font, fontSize:"14px"}}>Spanish</MenuItem>
                  <MenuItem value={'fr'} sx={{fontFamily:font, fontSize:"14px"}}>French</MenuItem>
                  <MenuItem value={'ar'} sx={{fontFamily:font, fontSize:"14px"}}>Arabic</MenuItem>
                  <MenuItem value={'zh'} sx={{fontFamily:font, fontSize:"14px"}}>Chinese</MenuItem>
                </Select>
              </FormControl>
            </div>
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