import React, {SyntheticEvent, useEffect, useState} from "react";
import popupStyles from "../style/custom-popup.module.scss";

const CustomPopup = (props:CustomPopupProps) => {
    const [show, setShow] = useState(false);

    const closeHandler = (e:SyntheticEvent) => {
        setShow(false);
        props.onClose(false);
    };

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    return (
        <div
            style={{
                visibility: show ? "visible" : "hidden",
                opacity: show ? "1" : "0"
            }}
            className={popupStyles.overlay}
        >
            <div className={popupStyles.popup}>
                {/*<h2>{props.title}</h2>*/}
                <span className={popupStyles.close} onClick={closeHandler}>
          &times;
        </span>
                <div className={popupStyles.content}>{props.children}</div>
            </div>
        </div>
    );
};

// CustomPopup.propTypes = {
//     title: PropTypes.string.isRequired,
//     show: PropTypes.bool.isRequired,
//     onClose: PropTypes.func.isRequired
// };

interface CustomPopupProps{
    children: any;
    // title:string;
    show:boolean;
    onClose:(arg0: boolean)=>void;
}

export default CustomPopup;