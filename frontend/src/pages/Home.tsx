import Header from "../components/Header";
import ListContainer from "../components/ListContainer";
import Pagination from "../components/Pagination";

const Home = () => {
    return (
        <div className="px-2 md:px-10 2xl:px-32">
            <Header />
            <ListContainer />
            <Pagination />
        </div>
    )
}
export default Home;