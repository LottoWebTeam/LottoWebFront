import React, {useState, useEffect} from "react";
import { Dialog, DialogTitle, DialogContent} from  '@material-ui/core';

export default function PopUp2(props){
    const {title, children, openPopUp2, setOpenPopUp2, details} = props;

    return(
        <Dialog open={openPopUp2} maxWidth="md">
            <DialogTitle>
                <div></div>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )

}