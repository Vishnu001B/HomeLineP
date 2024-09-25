import React from 'react';

const ContactUs = () => {
    return (
        <>
            <section className="bg-gray-200 py-32 flex justify-between items-center">
                <div className="container mx-auto">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-10/12 md:mx-auto">
                            <div className="bg-white p-16 rounded-3xl shadow-xl relative">
                                <div className="flex flex-wrap">
                                    <div className="w-full md:w-10/12">
                                        <div className="space-y-8">
                                            <div className="space-y-4">
                                                <h3 className="text-4xl font-semibold text-black">Contact Us</h3>
                                                <p className="text-sm text-black">
                                                    Feel free to contact us any time. We will get back to you as soon as we can!
                                                </p>
                                                {/* Each input is placed in its own row with reduced width */}
                                                <div className="space-y-4">
                                                    <input type="text" className="form-input w-3/4 border-b border-gray-300 focus:outline-none focus:border-transparent rounded-none py-2" placeholder="Name" />
                                                    <input type="text" className="form-input w-3/4 border-b border-gray-300 focus:outline-none focus:border-transparent rounded-none py-2" placeholder="Email" />
                                                    <textarea className="form-textarea w-3/4 border-b border-gray-300 focus:outline-none focus:border-transparent rounded-none py-2" placeholder="Message"></textarea>
                                                </div>
                                                <button className="bg-gradient-to-br w-72 from-blue-700 to-purple-700 text-white py-2 px-4 w-full rounded-full font-semibold text-sm mt-6">
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full h-full md:w-2/12 flex items-end bg-gradient-to-br from-blue-700 to-purple-700 p-8 rounded-l-3xl">
                                        <ul className="flex space-x-4 text-white">
                                            <li><a href="#" className="text-xl"><i className="fab fa-facebook-square"></i></a></li>
                                            <li><a href="#" className="text-xl"><i className="fab fa-instagram"></i></a></li>
                                            <li><a href="#" className="text-xl"><i className="fab fa-twitter"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="absolute top-1/4 right-0 bg-gray-900 text-white p-8 rounded-l-3xl w-80">
                                    <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                                    <div className="flex items-center mb-8">
                                        <i className="fas fa-headset mr-4"></i>
                                        <span>+91 8009 054294</span>
                                    </div>
                                    <div className="flex items-center mb-8">
                                        <i className="fas fa-envelope-open-text mr-4"></i>
                                        <span>info@flightmantra.com</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-map-marked-alt mr-4"></i>
                                        <span>1000+ Travel partners and 65+ Service city across India, USA, Canada & UAE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto">
                    <div className="w-full md:w-10/12 md:mx-auto">
                        <div className="text-center">
                            <h4 className="text-lg font-semibold text-black mb-4">Find Us on Google Map</h4>
                            <p className="text-sm text-black mb-12">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quo beatae quasi assumenda, expedita aliquam minima tenetur maiores neque incidunt repellat aut voluptas hic dolorem sequi ab porro, quia error.
                            </p>
                            <div className="rounded-3xl overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1943.8466613660124!2d77.596607!3d12.9715989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670b8f85d77%3A0x684c50b9a6a47727!2sBangalore%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1693655591382!5m2!1sen!2sin"
                                    width="100%"
                                    height="450"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    aria-hidden="false"
                                    tabIndex="0"
                                ></iframe>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactUs;
