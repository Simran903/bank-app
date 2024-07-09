import React from 'react'

const Box: React.FC = () => {
  return (
    <div className=''>
      <div className=""
      style={{
        backgroundImage: `url('./signin/welcome.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "50%",
        height: "90vh"
      }}
      >
        left
      </div>
      <div className="">
      right
      </div>
    </div>
  )
}

export default Box