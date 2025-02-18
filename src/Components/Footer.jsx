const Footer = () => {
  return (
    <div className="bg-[#1f2937] ">
      <footer className="footer max-w-[1440px] mx-auto w-11/12 py-10 text-white/80">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text text-white/70">Enter your email address</span>
            </label>
            <div className="join bg-#374151">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item bg-[#374151]"
              />
              <button className="btn bg-mainColor border-[#374151] hover:bg-secondBgColor text-white join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </footer>
    </div>
  );
};

export default Footer;
