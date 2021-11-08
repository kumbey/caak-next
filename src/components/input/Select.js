import React from 'react';

const Select = ( {containerStyle, labelStyle, label, defaultValue, className, children, errorMessage,...props}) => {
    return (
        <div className={containerStyle}>
            <label className={`block  ${labelStyle}`}>
                {label}
            </label>
            <select
                className={`mt-1 w-full pl-3  py-3 block w-full rounded-md text-base border border-gray-200 placeholder-gray-400
                    focus:outline-none focus:text-gray-900 focus:placeholder-gray-500 hover:placeholder-caak-generalblack
                    focus:ring-1 focus:ring-caak-primary focus:border-caak-primary sm:text-sm hover:border-caak-primary
                    hover:bg-white transition ease-in duration-100 ${className}`}
                defaultValue={defaultValue}
                {...props}
            >
                {children}
            </select>
        </div>
    );
};

export default Select;