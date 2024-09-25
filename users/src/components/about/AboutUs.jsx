import React from 'react';

const AboutUs = () => {
    return (
        <section className="py-24 md:py-32 relative">
            <div className="container mx-auto">
                <div className="flex flex-wrap">
                    <div className="lg:w-1/2 md:w-full sm:w-full order-2 lg:order-1 px-4">
                        <div className="inner-column">
                            <div className="mb-12">
                                <span className="block text-blue-500 text-lg font-medium mb-3">About Css3transition</span>
                                <h2 className="text-4xl font-semibold text-gray-900 mb-6 relative pb-4">
                                    We are Creative Tech Enthusiast working since 2015
                                    <span className="absolute left-0 bottom-0 w-12 h-1 bg-gray-300"></span>
                                </h2>
                            </div>
                            <p className="text-gray-600 mb-5 text-base leading-relaxed">
                                I am Rahul Yaduvanshi works at Css3 Transition since last 3 years. We are here to provide touch notch solution for your website or web application that helps you to make your website look attractive & efficient in handling by creating useful plugins that you need.
                            </p>
                            <p className="text-gray-600 mb-5 text-base leading-relaxed">
                                We are here to serve you next level tutorial that currently in trend to match you with your expertise. Css3 transition is a learning website where you can find many good quality content related to web development and tutorials about plugins. Here we are using HTML, HTML5, CSS, CSS3, jQuery & JavaScript along with inspirational UI design layout by professionals using Photoshop and Adobe Illustrator.
                            </p>
                            <div className="mt-8">
                                <a href="#" className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200">Contact Us</a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 md:w-full sm:w-full px-4">
                        <div className="relative">
                            <div className="absolute bottom-4 left-4 bg-orange-500 text-white py-2 px-4 rounded-full">
                                <h2 className="text-lg font-semibold">Rahul Kumar Yadav</h2>
                                <span className="text-sm font-medium">Web Developer</span>
                            </div>
                            <figure className="relative">
                                <a href="#" className="block">
                                    <img title="Rahul Kumar Yadav" src="https://cdn.pixabay.com/photo/2017/01/07/17/48/interior-1961070_1280.jpg" alt="Rahul Kumar Yadav" className="w-full rounded-xl shadow-lg"/>
                                </a>
                            </figure>
                        </div>
                    </div>
                </div>

                <div className="mt-16 mb-8">
                    <span className="block text-blue-500 text-lg font-medium mb-3">Our Future Goal</span>
                    <h2 className="text-3xl font-semibold text-gray-900 mb-6 relative pb-4">
                        We want to lead in innovation & Technology
                        <span className="absolute left-0 bottom-0 w-12 h-1 bg-gray-300"></span>
                    </h2>
                    <p className="text-gray-600 mb-5 text-base leading-relaxed">
                        We work on UI/UX and functionality as well so that a plugin comes with proper structure & stunning looks which suits your web app & website.
                    </p>
                    <p className="text-gray-600 mb-5 text-base leading-relaxed">
                        We take a small toolkit here and ride it well so that it is fit for your use. One who performs well and looks even better.
                    </p>
                    <p className="text-gray-600 mb-5 text-base leading-relaxed">
                        Here we are trying to give you all kinds of technical content, whether it is related to designing or functionality. We are creating content on a lot of languages and will continue to make it free of cost even if you use it without any problem. Which is a very important thing.
                    </p>
                    <p className="text-gray-600 mb-5 text-base leading-relaxed">
                        Here you can also share the content you create; if our technical team likes it, then we will also share it on our blog.
                    </p>
                    <p className="text-gray-600 mb-5 text-base leading-relaxed">
                        In the end, I would say keep visiting our website and enjoy the quality content.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
