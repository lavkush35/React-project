import React, { useEffect, useState } from 'react'
import { ZegoSuperBoardManager } from 'zego-superboard-web';
import {ZegoExpressEngine} from 'zego-express-engine-webrtc'
import Tools from './Tools';

const App = () => {

  const appID=1320278689;
  const userID="lavkush";
  const token="04AAAAAGlzEhgADFi0gBMI7gH8iAc0YwCwuZivilho1ch7zi6ADuUlcNVx2lFqJ0/7WAtbZ6PHD5siAOO2rP/biWe9Bv6Xm2pGWJwGIiu9QuCtEOnRlFRhC+rs5kjeddWt+u9GdbRX4xdktGhTeHXJ3HpdwPOOiRgWZdIkIm2iBKSm790h85qg5uOStamjnUxynoUD6rJS0Eq+MzR9p5QzHjcpCQDpwaiYWxGO/zIn+cIMSHwTgsggDnMdQaD1PxodR2/2otlm9IgB"
  const roomID="5242";
  const userName="lavkush";
  const [currentTool, setCurrentTool] = useState(null);
  const server="wss://webliveroom1320278689-api.coolzcloud.com/ws";
  const zg = new ZegoExpressEngine(appID, server);
  const zegoSuperBoard = ZegoSuperBoardManager.getInstance();
  const initBoard = async () => {
    await zegoSuperBoard.init(zg, {
      parentDomID: 'parentDomID', // D of the parent container to be mounted to.
      appID, // The AppID you get.
      userID, // User-defined ID
      token // The Token you get that used for validating the user identity.
    })
    setCurrentTool(zegoSuperBoard.getToolType())
    await zg.loginRoom(roomID, token, {userID, userName}, {userUpdate: true});
    await zegoSuperBoard.createWhiteboardView({
      name: 'Virtual Board', // Whiteboard name
      perPageWidth: 1600, // Width of each whiteboard page
      perPageHeight: 900, // Height of each whiteboard page
      pageCount: 1 // Page count of a whiteboard
    });
  }

  useEffect(() => {
    if(zegoSuperBoard) {
      initBoard()
    }
  }, [zegoSuperBoard])

  
  return (
    <div className='h-[100vh] bg-black w-full'>

      <div id="parentDomID" className='w-full h-full'></div>
      <Tools currentTool={currentTool} onClick={(tool) => {
        zegoSuperBoard.setToolType(tool.type)
        setCurrentTool(tool.type)
      }} />
      
    </div>
  )
}

export default App
