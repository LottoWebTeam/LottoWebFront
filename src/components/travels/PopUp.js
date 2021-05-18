import React, {useState, useEffect} from "react";
import { Dialog, DialogTitle, DialogContent} from  '@material-ui/core';

export default function PopUp(props){
    const {title, children, openPopUp, setOpenPopUp, details} = props;

    return(
        <Dialog open={openPopUp} maxWidth="md">
            <DialogTitle>
                <div></div>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )

}