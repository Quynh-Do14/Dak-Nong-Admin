import React from 'react';

export const RateCommon = (props) => {
    const { soSao, luotXem } = props;
    let soSaoParseInt = parseInt(soSao);

    let soSaoParseFloat = parseFloat(soSao);

    const soSaoConvert = () => {
        let soSaoConvert1
        let fractionalPart = (soSaoParseFloat - Math.floor(soSaoParseFloat)).toFixed(1);
        if (fractionalPart > 0.5) {
            return soSaoConvert1 = soSaoParseInt + 1;
        }
        else {
            return soSaoParseInt;
        }
    }


    const stars = [];
    for (let i = 0; i < soSaoConvert(); i++) {
        stars.push(
            <svg stroke="currentColor" fill="#F5A623" stroke-width="0" viewBox="0 0 256 256" class="w-4 mx-0-5 fill-orange text-orange" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
            </svg>
        );
    }
    const stars2 = [];
    for (let j = 0; j < 5 - soSaoConvert(); j++) {
        stars2.push(
            <svg stroke="currentColor" fill="#DFDFDF" stroke-width="0" viewBox="0 0 256 256" class="w-4 mx-0-5 fill-orange text-orange" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
            </svg>
        );
    }
    return (
        <div className='flex align-center justify-between'>
            <div className='flex align-center justify-center'>
                <div className='mr-1'>{soSao} </div>
                <div>
                    <div className='flex align-center'>
                        {stars}{stars2}
                    </div>
                </div>
            </div>
            {
                luotXem
                &&
                <div>
                    <div className='ml-1 flex align-center'>
                        (
                        <div>{luotXem}</div>
                        <div className='ml-0-5 flex align-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="1em" width="1em" class="h-4 w-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </div>
                        )
                    </div>
                </div>
            }

        </div>
    )
}
//FFF6BA56