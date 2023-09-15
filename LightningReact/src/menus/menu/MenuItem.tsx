import css from "../../style/common.module.scss";
import React, {SyntheticEvent, useEffect, useRef, useState} from "react";
import {MenuItemModel} from "../../models/menuItem.model";
import CustomPopup from "../../util/CustomPopup";
import {useDispatch} from "react-redux";
import {addItem} from "../../actions/item.action";



const MenuItem = (props: MenuItemProps) => {

    const dispatch = useDispatch();
    const [visibility, setVisibility] = useState(false);
    const [addPreferences,setAddPreferences]=useState(false);
    const [isSaved,setIsSaved]=useState(false);
    const initialItemState={
        id: Math.round(+new Date() - +new Date('2022-09-29T00:00:00')/1000),
        name:props.menuItem.name,
        description:props.menuItem.description,
        placedOrderId: 0,
        menuItemId: props.menuItem.id,
        quantity: 1,
        price: props.menuItem.price,
        comment:'',
        available:true,
        action:''
    };
    const [item,setItem] =useState({...initialItemState});

    const commentRef = useRef(null);
    const actionRef = useRef(null);


    const popupCloseHandler = () => {
        setVisibility(false);
        setItem({...item,quantity:1});
    };

    const incrementHandler=()=>{
      setItem({...item,quantity:item.quantity+1});
    };

    const decrementHandler=()=>{
        setItem({...item,quantity:item.quantity>1?item.quantity-1:1});
    };

    useEffect(() => {
        setItem({...item,quantity:item.quantity});
    }, [item.quantity]);

    const addItemHandler = () => {
        //cart
        setVisibility(false);
        //console.log(item);
        dispatch(addItem(item));
        setItem(initialItemState);
    };

    const onCloseEditPreferenceHandler=()=>{
        setAddPreferences(!addPreferences);
        // if(!isSaved) {
        //     savePreferencesHandler();
        //     setIsSaved(false);
        // }
    }

    // const editPreferencesHandler=()=>{
    //     setAddPreferences(!addPreferences)
    //
    //     if (!actionRef==null)
    //     {
    //         const actionElement = actionRef.current! as HTMLSelectElement;
    //
    //         for (let i = 0; i < actionElement!.options.length; i++) {
    //             const option = actionElement.options[i];
    //             if (option.text === actionElement.value) {
    //                 option.setAttribute('selected', '');
    //                 // actionElement.options[i-1].setAttribute('selected','');
    //                 console.log(option);
    //                 console.log(actionElement);
    //                 return;
    //             }
    //         }
    //     }
    // }

    const savePreferencesHandler=()=>{
        const actionValue= (actionRef.current! as HTMLSelectElement).value;
        const commentValue = (commentRef.current! as HTMLInputElement).value;
        setItem({...item,comment: commentValue,action: actionValue});
        setIsSaved(true);
    }

    const onChangeQuantityHandler=(event:SyntheticEvent)=>{
        const qty=+(event.target as HTMLInputElement).value;
        if(qty>1) {
            setItem({...item, quantity: qty});
        }
    }

    return <div className={css.InnerDiv} >
        {/*<p><img src={props.MenuItem.image} alt={props.MenuItem.name} width="200px" height="140px"/></p>*/}
        {/*add*/}
        <button onClick={() => setVisibility(true)} >
        <p>{props.menuItem.name}</p>
        <p><img src={require(`../../assets/menu/${props.menuItem.restaurantId}/${props.menuItem.category}/${props.menuItem.image}.jpg`)}
                alt={props.menuItem.name} width="80px" height="60px"/></p>
            <p>${props.menuItem.price}</p>
        </button>


        <CustomPopup
            onClose={popupCloseHandler}
            show={visibility}
        >
            {
                !addPreferences?
                    <>
                        <h3>{props.menuItem.name}</h3>
                        <p>{!!props.menuItem.description.length && props.menuItem.description}</p>
                        <p><img src={require(`../../assets/menu/${props.menuItem.restaurantId}/${props.menuItem.category}/${props.menuItem.image}.jpg`)}
                                alt={props.menuItem.name} width="100px" height="80px"/></p>
                        <span><button onClick={()=>incrementHandler()} >&#43;</button></span>
                        <span><input type="number" name="quantity" value={item.quantity} width="100px" id="quantity"
                                     onChange={(event:SyntheticEvent)=>onChangeQuantityHandler(event)}/></span>
                        <span><button onClick={()=>decrementHandler()} >&#8722;</button></span>
                        <p>Preference                       (Optional)</p>
                        <button onClick={()=>setAddPreferences(!addPreferences)}><p>Add Special Instruction                    </p></button>
                        <br/>
                        <button onClick={()=>addItemHandler()}>add to cart - ${(props.menuItem.price*item.quantity).toFixed(2)}</button>
                    </>
                :
                    <>
                        <button onClick={()=>onCloseEditPreferenceHandler()}><span>&#10229;</span></button>
                        <h1>User Preferences</h1>
                        <p>Add special instructions</p>  {/*onChange={(event:SyntheticEvent)=>setItem({...item,comment:(event.target as HTMLInputElement).value})}*/}
                        <textarea  ref={commentRef} name="description" placeholder={"Write your preferences here..."} defaultValue={!!item.comment.length?item.comment:''} id="my-element" ></textarea>
                        {/*defaultValue={!!item.comment.length?item.comment:''}*/}
                        <form target={"_target"} method={"post"}>
                            <label>If item is unavailable</label><br/>
                            <select ref={actionRef} id={"action"} name={"action"}>
                                <option value={''}>select</option>
                                <option value={"Go with merchant recommendation"}>Go with merchant recommendation</option>
                                <option value={"Contact me"}>Contact me</option>
                                <option value={"Refund this item"}>Refund this item</option>
                                <option value={"Cancel the entire order"}>Cancel the entire order</option>
                            </select>
                        </form>
                        <button color={"red"} onClick={savePreferencesHandler}>Save</button>
                    </>
            }
        </CustomPopup>
    </div>
}

export default MenuItem;

interface MenuItemProps {
    menuItem:MenuItemModel;
}

