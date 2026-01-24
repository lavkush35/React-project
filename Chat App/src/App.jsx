import React, { useEffect, useState, useRef } from 'react'
import { ZIM } from 'zego-zim-web';
import bg from "./assets/bg1.jpg";

const App = () => {

  const [zimInstance, setZimInstance] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState([])
  const [selectedUser, setSelectedUser] = useState("Luvkush")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const aapID = 1386846446;
  const tokenA = "04AAAAAGl0ceQADIp6k6QSBlL79RJXFQCxE3ONSZCuHsAKnH2Khhdi6+BBglHHCvxsN2qoA+VtyXPlnoZAQB5wpRQnTpL7rPYMo3yPfD2uEYa41DdJHe/saZ7+5px8IEep1H5R67g3S868DwF5R6QuGOdJtC0HwOk8S6grmRjfP41ceOWcoNb6Xrz4AJHC2can0ZMpJxrvSh8Ks2Z17a9sLRn+Wtzdabm10DX5kgtafG4skXAFqBDpDDUrahwvO/yqlpgJWvoO4As7AQ==" ;
  const tokenB = "04AAAAAGl0cgcADKiB81BF7Z/wVwBSUQCwTx6OXwqQxzjAPk3ULSnuhiMGpS6xIvqhqtUfXMarXa9S8GkSAdtjuaDZQycQockLLB+TOVz7706a7F+DEcqNK1I7Ceq9UBHB9m9HWLLZVl/ns922d21l/rzu2vVNf62flX9pH4H/ZiUsWto0xZBa8jhTEo7pyeooPuGJy1zF+I9bdtm32u/ikf60xO0DPqBxei8d4M1O5Toj7ps/3M0aEHRSMpqnHE37hIOhrb6D8WwB";
  const messageEndRef = useRef(null)
  useEffect(() => {
    const instance = ZIM.create(aapID)
    setZimInstance(instance)
    instance.on('error', function (zim, errorInfo) {
      console.log('error', errorInfo.code, errorInfo.message);
    });

    instance.on('connectionStateChanged', function (zim, { state, event }) {
      console.log('connectionStateChanged', state, event);
    });

    instance.on('peerMessageReceived', function (zim, { messageList }) {
      setMessages(prev=>[...prev, ...messageList])
    });
    instance.on('tokenWillExpire', function (zim, { second }) {
      console.log('tokenWillExpire', second);
      // You can call the renewToken method to renew the token. 
      // To generate a new Token, refer to the Prerequisites.
      zim.renewToken(selectedUser === "Luvkush"?tokenA:tokenB)
        .then(function(){
          console.log("token-renewed")
        })
        .catch(function(err){
            console.log(err)
        })
    });

    return () => {
      instance.destroy()
    }
  }, [])

  useEffect(() =>{
    if(messageEndRef.current) {
      messageEndRef.current.scrollIntoView({behavior:'smooth'})
    }
    
  },[messages])

  const handleLogin = () => {
   const info = {userID: selectedUser, userName: selectedUser==="Luvkush"?"Luvkush":"Ankush"};

   setUserInfo(info)
   const loginToken = selectedUser==="Luvkush"?tokenA:tokenB
   if(zimInstance) {
    
  
   zimInstance.login(info, loginToken)
    .then(function() {
      setIsLoggedIn(true)
      console.log("logged in")
    })
    .catch(function (err) {
      console.log("login failed")
    })
  } else {
    console.log("Instance Error")
  }
 }


 const handleSendMessage = ()=> {
  if(!isLoggedIn) return

  const toConversationID = selectedUser==="Luvkush"?"Ankush":"Luvkush"; 
  const conversationType = 0;
  const config = { 
      priority: 1, 
  };

  const messageTextObj = { type: 1, message: messageText, extendedData:'' };

  zimInstance.sendMessage(messageTextObj, toConversationID, conversationType, config)
    .then(function ({ message }) {
      setMessages(prev => [...prev, message])
    })
    .catch(function (err) {
        console.log(err)
    });
    setMessageText("")

 }

 const formatTime = (timeStamp) => {
  const date = new Date(timeStamp)
  return date.toLocaleTimeString([], {
    hour:'2-digit', minute:'2-digit'
  })
 }

  

  return (
    <div className='w-full h-[100vh] flex items-center flex-col ' style={{
      backgroundImage:`url(${bg})`,
      backgroundSize:"100% 100%"
    }} >
      <h1 className='text-white font-bold text-[30px]'>Real Time Chat App</h1>
      
      {!isLoggedIn?(
        <div className='w-[90%] max-w-[600px] h-[400px] overflow-auto p-[20px] backdrop-blur shadow-2xl bg-[#00000020]
        mt-[30px] rounded-xl flex flex-col items-center justify-center gap-[30px] border-2 border-gray-700 '>
          <h1 className='text-[30px] font-semibold text-white '>Select User</h1>
          <select className='px-[50px] rounded-1xl py-[5px] bg-[#1f2525] text-white flex justify-start ' 
          onChange={(e)=>setSelectedUser(e.target.value)} value={selectedUser}>
            <option value="">---select user---</option>
            <option value="Luvkush">Lavkush katara</option>
            <option value="Ankush">Ankush Sahu</option>
          </select>
          <button className='p-[10px] bg-white font-semibold cursor-pointer text-black 
          rounded-lg w-[100px] ' onClick={handleLogin} >Login</button>
        </div>
      ):( 
      <div className='w-[90%] max-w-[800px] h-[600px] overflow-auto p-[20px] backdrop-blur shadow-2xl 
      bg-[#00000020] mt-[30px] rounded-xl flex flex-col items-center gap-[30px] border-2 border-gray-700 '>
      <h2 className='text-white text-[20px]'>
        {userInfo.userName} <span className='text-gray-400'>chatting with</span>  
        {selectedUser==="Luvkush"?"Ankush":"Luvkush"}
      </h2>
      <div className='w-full h-[1px] bg-gray-800 '></div>
      <div className='rounded-2xl w-full p-[20px] flex flex-col gap-[10px] itemx-center h-[400px] overflow-auto '>
        {messages.map((msg, i)=>{
          const isOwnMessage = msg.senderUserID == userInfo.userID
          return <div key={i} className={`flex ${isOwnMessage?"justify-end":"justify-start"}`}>
            <div className={`px-[20px] py-[10px] shadow-lg ${isOwnMessage?"bg-[#0f1010] rounded-br-0 rounded-t-2xl rounded-bl-2xl ":"bg-[#1c2124] rounded-bl-0 rounded-t-2xl rounded-br-2xl"} text-white `}>
              <div>
                {msg.message}
              </div>
              <div>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        })}
        <div ref={messageEndRef}>

          <div className='flex items-center justify-center gap-[20px] w-full h-[100px] fixed bottom-0 px-[20px]'>
            <input type="text" placeholder='Message' className='rounded-2xl bg-gray-700 outline-none text-white px-[20px] py-[10px] placeholded-white w-full' onChange={(e) => setMessageText(e.target.value)} value={messageText}/>
            <button className='p-[10px] bg-white text-black rounded-2xl w-[100px] font-semibold ' onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
      </div>
      )}
    </div>
  )
}

export default App
