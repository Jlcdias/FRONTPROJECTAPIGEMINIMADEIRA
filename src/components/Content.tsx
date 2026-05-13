import Footer from './Footer';
import LeftMenu from './LeftMenu';
import MainMenu from './MainMenu';
import Header from './header';

function Content() {
  return (
    
    <div className="row MainPage">
        <Header />
        <LeftMenu />
        <MainMenu />
        <Footer />
    </div>
  )
}

export default Content