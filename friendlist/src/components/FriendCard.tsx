import React from 'react'
import '../css/FriendList.css'
export default function FriendCard(props: any) {
    return (
        <>
            <div className="friendContainer">
                <div className="friendNamesList">
                    {props.data.userName} is my friend
                </div>
                <div className="friendActionsButton">
                    <div>
                        <button onClick={() => {
                            props.addToFav(props.data)
                        }}>
                            <div className="starDiv">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 24 24" fill={props.data.isFav ? 'yellow' : 'black'}>
                                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                            </div>
                        </button>
                    </div>
                    <div>
                        <button onClick={() => {
                            props.deleteUser(props.data)
                        }}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="red" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /></svg>
                            </div>
                        </button>
                    </div>
                </div>

            </div>
            <div className="sperationDiv"></div>
        </>
    )
}
