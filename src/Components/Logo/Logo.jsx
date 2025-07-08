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