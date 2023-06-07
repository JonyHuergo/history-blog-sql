import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { getPosts } from '../services'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
    const [data, setData] = useState([]);
    const [windowWidth, setwindowWidth] = useState(0);
    const [searchBarOpen, setsearchBarOpen] = useState(false)

    useEffect(() => {
        getPosts()
            .then((result) => setData(result))
    }, []);

    useEffect(() => {
        function handleResize() {
            setwindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const manageSearchBar = () => {
        searchBarOpen ? setsearchBarOpen(false) : setsearchBarOpen(true)
    };

    if (windowWidth >= 1024) {
        return (
            <nav className="bg-transparent text-neutral-dark mb-20 mt-12 grid grid-cols-12 px-0">
                <div className="block col-span-11 lg:col-span-6">
                    <Link href={"/"}>
                        <h1 className="cursor-pointer font-title font-bold text-4xl md:text-6xl">HISTORY-BLOG</h1>
                    </Link>
                </div>
                <div className="col-span-1 lg:col-span-6 content-center pt-0 px-4 md:py-4 lg:p-0">
                    <SearchBar placeholder="Buscar posts" data={data} />
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="bg-transparent text-neutral-dark mb-20 mt-12 grid grid-cols-12 px-0">
                <div className="block col-span-11 lg:col-span-6">
                    {!searchBarOpen &&
                        <Link href={"/"}>
                            <h1 className="cursor-pointer font-title font-bold text-4xl md:text-6xl">HISTORY-BLOG</h1>
                        </Link>
                    }
                </div>
                <div className="col-span-1 lg:col-span-6 content-center pt-0 px-4 md:py-4 lg:p-0 relative">
                    {searchBarOpen && <div className="absolute top-[-1rem] sm:bottom-0 right-10 md:top-0 md:right-16"><SearchBar placeholder="Buscar posts" data={data} /></div>}
                    <button className="absolute top-[0.15rem] left-0 sm:static" onClick={manageSearchBar}>
                        {searchBarOpen ?
                            <CloseIcon className="text-4xl" id="closeIcon"/> :
                            <SearchIcon className="text-4xl" id="searchIcon"/>}
                    </button>
                </div>
            </nav>
        );
    }
}
 
export default Navbar;

