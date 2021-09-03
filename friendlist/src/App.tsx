import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import FriendCard from './components/FriendCard';
import firebase from './services/iFirebaseConfig';
import { getFirestore, collection, getDocs, doc, setDoc, query, where, increment } from 'firebase/firestore/lite';
import _ from 'lodash';
let deleteObj: any;
let incrementList = 4;

function App() {
  const [friendList, setFriendList] = useState<any>([]);
  const [fulllData, setFulllData] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<any>(false);
  const [friendName, setFriendName] = useState('');
  const [modalView, setModalView] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [loader, setLoader] = useState(true);
  const getUserListing = async () => {
    setLoader(true)
    const db = getFirestore(firebase);
    const friendCol = collection(db, 'friendList');
    const friendSnapshot = query(friendCol, where("isDeleted", "==", false)); // ;
    console.log(friendSnapshot)
    const querySnapshot = await getDocs(friendSnapshot);

    let tempArr: any = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      tempArr.push(doc.data())
    });

    setFulllData([...tempArr]);
    let newArr = tempArr.slice(0, 4)
    setFriendList([...newArr]);
    setLoader(false)
  }

  const increaseData = () => {
    console.log(incrementList,fulllData.length)
    if(incrementList <= fulllData.length){
      incrementList += 4;
      let newArr = fulllData.slice(0, incrementList);
      setFriendList([...newArr]);  
    }
    
  }

  const addToFriendList = async (friendName: string) => {
    console.log('My frined Name', friendName);
    if (friendName.trim() == "") {
      console.log('Please enter Friend Name');
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false)
      }, 9000)
      return false;
    }

    let userObj = {
      userName: friendName,
      isFav: false,
      isDeleted: false
    }

    const db = getFirestore(firebase);
    friendList.push(userObj);

    await setDoc(doc(db, "friendList", friendName), userObj);
    setFriendName("");
    setTimeout(() => {
      console.log(friendName, 'time')
    }, 5000)
    setFriendList([...friendList]);


  }


  const addToFav = async (obj: any) => {
    console.log(obj, 'new')
    obj.isFav = !obj.isFav;
    const db = getFirestore(firebase);
    await setDoc(doc(db, "friendList", obj.userName), obj);
    _.filter(friendList, (friend) => {
      if (friend.userName === obj.userName) {
        friend.isFav = obj.isFav
      }
    })
    console.log(friendList)

    setFriendList([...friendList]);

  }

  const deleteUserFromDb = async () => {
    setDisableBtn(true)
    let obj: any = deleteObj;
    console.log(obj)
    obj.isDeleted = !obj.isDeleted;
    const db = getFirestore(firebase);
    await setDoc(doc(db, "friendList", obj.userName), obj);
    _.filter(friendList, (friend) => {
      if (friend.userName === obj.userName) {
        friend.isDeleted = obj.isDeleted
      }
    })
    console.log(friendList);
    setDisableBtn(false);
    setModalView(false);
    getUserListing();

  }


  const deleteUser = (obj: any) => {
    deleteObj = obj
    setModalView(true);
  }

  useEffect(() => {
    getUserListing();
  }, [])

  const handleScroll = (e:any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) { console.log('yo bottom!!');increaseData() }
  }


  return (
    <div className="mainAppContainer">

      {loader && <div className="loader">
        <div className="loaderGif"></div>

      </div>}
      {errorMessage && <div className="fadeInOut">
        <span>Please Enter Your Friend Name</span>
      </div>}

      {loader == false && <div className="headerSection">
        Friend List
      </div>}
      {loader == false && <div className="inputContainer">
        <input type="text"
          placeholder="Add Friend Name"
          className="inputField"
          onKeyDown={(event: any) => {
            if (event.keyCode === 13) {
              event.preventDefault();
              addToFriendList(event.target.value);

            }
          }}

          onChange={(event: any) => {
            console.log(event.target.value, 'fs');
            setFriendName(event.target.value);
          }}
          value={friendName}
        />
      </div>}

      <div className="listingDiv" onScroll={handleScroll}>

        {loader == false && friendList == undefined || friendList.length == 0 && <div className="noDataFound">
          Please enter name and press enter to add in friend list
        </div>}

        {loader == false && friendList && friendList.length != 0 &&
          <div className="friendListContainer">
            {friendList.map((friend: any) => {
              return <FriendCard key={friend.userName+ new Date().getMilliseconds()} deleteUser={(value: any) => { deleteUser(value) }} addToFav={(value: any) => { addToFav(value) }} data={friend} />
            })}
          </div>
        }
      </div>
      {/* Delete Modal */}

      {modalView && <div className="modal">

        {/* <!-- Modal content --> */}
        <div className="modal-content">
          <div>
            <span className="close" onClick={() => { setModalView(false) }} >&times;</span>
          </div>

          <div className="modalHeader">
            <p>Are you sure wanna remove your friend?</p>
          </div>
          <div className="actionsButtonModal">
            <div className="btnDiv" onClick={() => { deleteUserFromDb() }}>
              <button disabled={disableBtn} className="yesBtn">Yes</button>
            </div>
            <div className="btnDiv">
              <button disabled={disableBtn} className="noBtn" onClick={() => { setModalView(false) }}>
                No
              </button>
            </div>
          </div>

        </div>

      </div>}


    </div>
  );
}

export default App;
