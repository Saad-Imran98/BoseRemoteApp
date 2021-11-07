import {useState} from "react";
import {Button, Typography, ButtonGroup} from "@mui/material";

import {decreaseVolume, getVolume, increaseVolume} from "./BoseApi";



export default function Volume(){
    // const [isLoaded, setIsLoaded] = useState(false);
    const [volume, setVolume] = useState(null);

    function setIncreaseVolume(){
        increaseVolume().then((volume)=>{
            setVolume(volume.targetvolume[0])
            console.log(volume.targetvolume[0])
        }).catch((error) => console.log(error));;
    }

    function setDecreaseVolume(){
        decreaseVolume().then((volume)=>{
            setVolume(volume.targetvolume[0])
            console.log(volume.targetvolume[0])
        }).catch((error) => console.log(error));;
    }

    getVolume().then((volume) => {
        setVolume(volume.targetvolume[0])
        console.log(volume.targetvolume[0])
    }).catch((error) => console.log(error));

    return (
        <div>
            <ButtonGroup size="large" aria-label="small button group">
                <Button onClick={setDecreaseVolume}>-</Button>
                <Button disabled={true}>
                    <Typography variant="h1" color={"darkgreen"}>{volume}</Typography>
                </Button>
                <Button onClick={setIncreaseVolume}>+</Button>
            </ButtonGroup>
        </div>
    );
}
