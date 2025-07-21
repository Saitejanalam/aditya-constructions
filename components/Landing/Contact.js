const Contact = () => {
  return (
    <footer className="bg-[#003366] text-white font-sans">
      <div className="max-w-[1200px] mx-auto py-12 px-4">
        <div className="flex flex-wrap justify-between items-start gap-8">
          {/* Left Section - Message */}
          <div className="flex-1 min-w-[350px]">
            <h2 className="text-3xl mb-4">Contact us now</h2>
            <p className="text-lg leading-relaxed">
              To learn more about our project or to <br />
              schedule a site visit, get in touch with our <br />
              team today.
            </p>
          </div>

          {/* Right Section - Contact Info */}
          <div className="flex-1 min-w-[300px] flex justify-between flex-wrap">
            {/* Address */}
            <div className="min-w-[180px] flex items-center gap-2 mb-4">
              <img src="/icons/location.png" alt="location" width={24} />
              <span className="text-lg">Kakinada Office Address</span>
            </div>
          </div>
          <div className="flex-1 min-w-[300px] flex justify-between flex-wrap">
            {/* Phone */}
            <div className="min-w-[180px] mb-4">
              <div className="flex items-center gap-2">
                <img src="/icons/phone.png" alt="phone" width={24} />
                <h3 className="text-lg m-0">Call Us</h3>
              </div>
              <p className="mt-1 mb-0 pl-8">+91 9912555505</p>
            </div>

            {/* Email */}
            <div className="min-w-[180px] mb-4">
              <div className="flex items-center gap-2">
                <img src="/icons/mail.png" alt="mail" width={24} />
                <h3 className="text-lg m-0">Email</h3>
              </div>
              <p className="mt-1 text-base pl-8">
                sriadityadevelopersofficial@gmail.com
              </p>
            </div>

            {/* Social Links */}
            <div className="min-w-[180px] mt-4">
              <h3 className="text-lg mb-2">Follow us</h3>
              <div className="flex gap-4">
                <a href="#">
                  <img src="/icons/fb.png" alt="Facebook" width={24} />
                </a>
                <a href="#">
                  <img src="/icons/ig.png" alt="Instagram" width={24} />
                </a>
                <a href="#">
                  <img src="/icons/li.png" alt="LinkedIn" width={24} />
                </a>
                <a href="#">
                  <img src="/icons/yt.png" alt="YouTube" width={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/25 my-8"></div>

      {/* Copyright */}
      <div className="py-4 text-center text-base">
        <p className="m-0">
          Copyright © 2025 sriadityadevelopers. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Contact;
