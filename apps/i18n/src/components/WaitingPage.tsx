"use client"
import React from 'react';
import Logo from './atoms/Logo';
import Heading from './atoms/Heading';
import Noise from './interactions/Noise';
import Link from 'next/link';
import Icon from './atoms/Icons';

const WaitingPage: React.FC = () => {
    return (
        <div className='absolute size-full p-4 md:p-12 bg-darks-900 z-[999999999] inset-0 grid place-items-center'>
            <Noise
                patternSize={100}
                patternScaleX={2.5}
                patternScaleY={2.9}
                patternRefreshInterval={2}
                patternAlpha={20}
            />
            <div className='max-w-lg w-full h-auto text-center relative z-10'>
                <Logo className='mx-auto w-full h-full' />
                <div>
                    <Heading type='h3'>
                        <span className='text-lights-0'> Comming soon</span>
                    </Heading>
                </div>
                <div className=' z-20'>
                    <ul className='flex items-center justify-center gap-6'>
                        <li>
                            <Link className='group' href={'https://www.linkedin.com/in/oliverwisholm/?originalSubdomain=dk'} target='_blank'>
                                <Icon type={'linkedin'} className="fill-lights-0 group-hover:fill-lights-400 ease-expo-in-out transition-all duration-500" />
                            </Link>
                        </li>
                        <li>
                            <Link className='group' href={'https://www.facebook.com/oliverwisholm/?locale=da_DK'} target='_blank'>
                                <Icon type={'facebook'} className="fill-lights-0 group-hover:fill-lights-400 ease-expo-in-out transition-all duration-500" />
                            </Link>
                        </li>
                        <li>
                            <Link className='group' href={'https://www.instagram.com/oliverwisholm/?hl=da'} target='_blank'>
                                <Icon type={'instagram'} className="fill-lights-0 group-hover:fill-lights-400 ease-expo-in-out transition-all duration-500" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WaitingPage;