"use client";
import React from 'react';
import {motion} from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from './components/Hero';
import HowItWorks from './components/HowitWorks';
import WhyAI from './components/WhyAI';
import WhoFor from './components/WhoFor';
import Testimonials from './components/Testimonials';
import GetApp from './components/GetApp';
import NewsLetter from './components/NewsLetter';


function Page() {
    const animationProps = {
        initial: {opacity: 0, y: 50},
        whileInView: {opacity: 1, y: 0},
        transition: {duration: 0.5},
        viewport: {once: false}
    };

    return (
        <>
            <motion.div {...animationProps}>
                <Header/>
            </motion.div>
            <motion.div {...animationProps}>
                <Hero/>
            </motion.div>
            <motion.div {...animationProps}>
                <HowItWorks/>
            </motion.div>
            <motion.div {...animationProps}>
                <WhyAI/>
            </motion.div>
            <motion.div {...animationProps}>
                <WhoFor/>
            </motion.div>
            <motion.div {...animationProps}>
                <Testimonials/>
            </motion.div>
            <motion.div {...animationProps}>
                <GetApp/>
            </motion.div>
            <motion.div {...animationProps}>
                <NewsLetter/>
            </motion.div>
            <motion.div {...animationProps}>
                <Footer/>
            </motion.div>
        </>
    );
}

export default Page;
