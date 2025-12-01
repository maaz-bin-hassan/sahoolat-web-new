import Link from "next/link";

const Platform = () => {
  return (
    <section className="md:pt-44 sm:pt-24 pt-12 relative z-1 bg-background">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="bg-gradient-to-r from-primary to-tealGreen px-16 py-14 rounded-3xl shadow-card-hover grid grid-cols-12 items-center overflow-hidden">
          <div className="lg:col-span-8 col-span-12">
            <h2 className="text-white sm:text-44 text-30 mb-6 font-bold">
              Ready to simplify your life and business?
            </h2>
            <p className="text-secondary text-18 font-medium">
              Say it. Find it. Get it done! Experience a whole new way to find services
              <br className="md:block hidden" /> and get tasks done with Sahoolat<span className="text-orange font-bold">.AI</span>
            </p>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="flex lg:justify-end lg:mt-0 mt-7 justify-center">
              <Link
                href="#"
                className="text-primary bg-white border-2 border-white py-3.5 px-8 rounded-xl sm:text-21 text-18 font-bold hover:bg-transparent hover:text-white transition-all duration-300 shadow-button"
              >
                Get App Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platform;
