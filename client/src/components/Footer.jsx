import { MapPin, Mail, Phone } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}

          <div className="group">
            <div className="flex items-center">
              <img
                src="/logo.png"
                className="h-10 transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <p className="mt-4 text-sm text-slate-500 leading-relaxed">
              Campus Lost & Found helps students report, discover, and recover lost items easily.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="font-semibold text-slate-800 relative inline-block">
              Quick Links
              <span className="absolute left-0 -bottom-2 h-1 w-8 rounded-full bg-orange-500" />
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              {['Home', 'Browse Items', 'Report Item', 'About Us'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-500 transition-all duration-300 hover:text-orange-500 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}

          <div>
            <h3 className="font-semibold text-slate-800 relative inline-block">
              Categories
              <span className="absolute left-0 -bottom-2 h-1 w-8 rounded-full bg-orange-500" />
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              {['Electronics', 'Documents', 'Accessories', 'Books'].map((category) => (
                <li
                  key={category}
                  className="text-slate-500 cursor-pointer transition-all duration-300 hover:text-orange-500 hover:translate-x-1"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="font-semibold text-slate-800 relative inline-block">
              Contact
              <span className="absolute left-0 -bottom-2 h-1 w-8 rounded-full bg-orange-500" />
            </h3>

            <div className="mt-5 space-y-4 text-sm">
              <ContactItem icon={<MapPin size={17} />} text="Campus Office" />

              <ContactItem icon={<Mail size={17} />} text="support@campusfind.com" />

              <ContactItem icon={<Phone size={17} />} text="+254 700 000 000" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="border-t border-slate-200 bg-slate-50 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()}
        <span className="mx-1 font-semibold text-orange-500">Campus Lost & Found</span>
        All rights reserved.
      </div>
    </footer>
  );
}

function ContactItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="h-9 w-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
        {icon}
      </div>

      <span className="text-slate-500 transition-colors duration-300 group-hover:text-orange-500">
        {text}
      </span>
    </div>
  );
}

export default Footer;
