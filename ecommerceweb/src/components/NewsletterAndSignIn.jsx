const NewsletterAndSignIn = () => {
    return (
        <section className="bg-gradient-to-b from-pink-100 via-white to-white">
            <div className="max-w-7xl mx-auto px-6 py-20 rounded-lg text-center">

                {/* Newsletter */}
                <h2 className="text-3xl md:text-5xl font-semibold text-black">
                    Get exclusive offer on Your Email
                </h2>

                <p className="mt-3 text-gray-700">
                    Subscribe to our newsletter to update new Product
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full sm:flex-1 px-6 py-3 rounded-full border border-gray-400 focus:outline-none"
                    />

                    <button className="bg-black text-yellow-400 px-8 py-3 rounded-full font-medium hover:bg-gray-900 transition">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewsletterAndSignIn;