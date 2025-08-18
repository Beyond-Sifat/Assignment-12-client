import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-primary">
                <span className="text-neutral"></span> Sports Master <span className="text-secondary">SM</span>
            </span>
        </Link>
    );
};

export default Logo;


    // <Link
    //         to="/"
    //         className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 group"
    //     >
    //         <div className="flex items-center">
    //             {/* Optional: Add an icon/symbol before the text */}
    //             <div className="w-8 h-8 bg-[#54473F] rounded-full flex items-center justify-center mr-2 group-hover:bg-[#9A7E6F] transition-colors duration-200">
    //                 <span className="text-[#E9EED9] font-bold text-sm">SM</span>
    //             </div>

    //             {/* Main logo text */}
    //             <div className="flex items-baseline">
    //                 <span className="text-xl md:text-2xl font-bold text-[#54473F] tracking-wide">
    //                     Sports Master
    //                 </span>
    //                 <span className="text-lg md:text-xl font-semibold text-[#9A7E6F] ml-2 opacity-90">
    //                     SM
    //                 </span>
    //             </div>
    //         </div>
    //     </Link>