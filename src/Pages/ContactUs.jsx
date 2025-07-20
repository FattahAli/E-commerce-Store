const ContactUs = () => (
  <div className="max-w-4xl mx-auto px-8 py-20 min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
    <h1 className="text-4xl md:text-5xl font-extrabold text-[#ffd700] mb-6">
      Contact Us
    </h1>
    <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mb-8">
      Have questions or need support? Our team is here to help!
      <br />
      Email us at{" "}
      <a
        href="mailto:support@swiftcart.com"
        className="text-[#1de9b6] underline"
      >
        support@swiftcart.com
      </a>{" "}
      or use the form below.
    </p>
    <form className="w-full max-w-lg bg-card p-8 rounded-lg shadow-md border border-[#232b3b] flex flex-col gap-4">
      <input
        type="text"
        placeholder="Your Name"
        className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground"
      />
      <input
        type="email"
        placeholder="Your Email"
        className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground"
      />
      <textarea
        placeholder="Your Message"
        rows={4}
        className="px-4 py-2 rounded bg-background border border-[#232b3b] text-foreground"
      />
      <button
        type="submit"
        className="bg-[#ffd700] text-[#101624] font-bold py-2 rounded hover:bg-[#1de9b6] hover:text-[#101624] transition"
      >
        Send Message
      </button>
    </form>
  </div>
);

export default ContactUs;
