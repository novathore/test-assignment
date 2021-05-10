import React, {useState} from 'react';
import ReactDom from 'react-dom';
import s from './Dialog.scss';
import {classNames} from "../../utils/utils";

export interface IDialogProps {
    openState: boolean;
    onBackDropClick: () => void;
    component: any;
    dialogMode?: boolean;
    anchorPositions?: DOMRect;
}

function Dialog({openState, component, onBackDropClick, dialogMode, anchorPositions}: IDialogProps) {
    if (openState) {
        if (dialogMode) {
            const dialog = constructDialog(component, onBackDropClick);

            return createPortal(dialog);
        }

        const popover = constructPopover(component, onBackDropClick, anchorPositions);

        return createPortal(popover);
    }

    return null;
}

function createPortal(component) {
    const overlayRef = document.getElementById('overlay');
    return ReactDom.createPortal(component,overlayRef)
}


function constructDialog(component, onBackDropClick) {
    return (
        <React.Fragment>
            <div onClick={onBackDropClick} className={s.dialogBackdrop}/>
            <div className={s.dialogContent}>
                {component}
            </div>
        </React.Fragment>
    )
}

function constructPopover(component, onBackDropClick, anchorPositions) {
    return (
        <React.Fragment>
            <div onClick={onBackDropClick} className={s.popoverBackdrop}/>
            <div style={anchorPositions} className={s.popoverContent}>
                {component}
            </div>
        </React.Fragment>
    )
}

export default Dialog;
