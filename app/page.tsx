import ResponsiveAppBar from "./NavBar"
import Slider from "./Slider"
import MusicCard from "./Card"

const Home = () => {
  return (
	<>
  <nav className="w-full sticky top-0 left-0 z-50">
    <ResponsiveAppBar/>
  </nav>
  <div className="wfull h-96 ">
  <Slider/>
  </div>
  <div className="w-full  mt-10  py-8  overflow-hidden">
    <h1 className="w-full h-7 ps-3 font-bold text-3xl mb-5 ">
      NEW:
    </h1>
    <div className="w-full flex justify-center gap-5 flex-wrap bg-white py-5 px-2">
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    </div>
    
  </div>
  <div className="w-full  mt-10  py-8  overflow-hidden">
    <h1 className="w-full h-7 ps-3 font-bold text-3xl mb-5 ">
      Top Charts:
    </h1>
    <div className="w-full flex justify-center gap-5 flex-wrap bg-white py-5 px-2">
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    </div>

  </div>
  <div className="w-full  mt-10  py-8  overflow-hidden">
    <h1 className="w-full h-7 ps-3 font-bold text-3xl mb-5 ">
      Popular:
    </h1>
    <div className="w-full flex justify-center gap-5 flex-wrap bg-white py-5 px-2">
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    <MusicCard/>
    </div>

  </div>
	</>
	
  )
}

export default Home
