import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-zinc-900 text-white p-5">
      <div className="grid md:grid-cols-2 gap-3 items-center">

        <div className="w-full h-full flex justify-center  items-center">
          <img src="/Chess.png" alt="" className="rounded-xl"/>
        </div>

        <div className="w-full h-full flex flex-col justify-center items-center ">
          <h1 className="lg:text-7xl md:text-5xl text-3xl font-bold text-white md:mb-9 mb-5">Play Online Chess</h1>
          <button onClick={()=>navigate('/game')} className="text-white rounded-xl p-3 text-sm hover:border font-bold bg-blue-900">Join Room</button>
        </div>
        
      </div>
    </div>
  );
}
