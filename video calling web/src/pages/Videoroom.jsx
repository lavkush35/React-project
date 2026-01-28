import React from 'react'
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

function Videoroom() {
    let { roomID } = useParams()

    const myMeeting = async(element) => {
        
        const appID = 1265153655;
        const serverSecret = "2c43811f7a4ee4871883fb4120071c9d";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, 
        Date.now().toString(), "Luvkush katara")
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            sharedLinks: [
              {
                name: 'copy link',
                url:`http://localhost:5173/room/${roomID}`,
              },
            ],
            scenario: {
              mode: ZegoUIKitPrebuilt.OneOnOneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
        })
    }

  return (
    <div className='bg-[#12181d] flex items-center justify-center  w-full h-[100vh]'>
        <div ref={myMeeting} />
    </div>
  )
}

export default Videoroom
