const Thankyou = () => {
  return (
    <div className="p-8 md:p-16 flex flex-col items-center justify-center text-center">
      <div className="h-16 w-16 rounded-full bg-[#FF8B8B] grid place-items-center mb-8">
        <img
          src="/assets/images/icon-thank-you.svg"
          alt="thankyou icon"
          className="h-10 w-10"
        />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#1E2C69] mb-6">
        Thank you!
      </h1>
      <p className="text-gray-500 max-w-md">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at{" "}
        <a
          href="mailto:support@loremgaming.com"
          className="text-[#574EFA] hover:underline"
        >
          support@loremgaming.com
        </a>
        .
      </p>
    </div>
  );
};

export default Thankyou;
