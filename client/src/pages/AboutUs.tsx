import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="h-screen pt-16 flex flex-col items-center"
    style={{
      backgroundImage: `url('./about/about-bg.png')`,
      height: "100vh",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <h1 className="text-[#CCD0CF] text-5xl font-bold">About us</h1>
      <div className="flex justify-center items-center mt-20 mx-20 h-2/3 w-3/5 bg-[#06141B] bg-opacity-80 shadow-2xl cursor-pointer border-none rounded-lg">
        <p className="p-10 text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
          corporis non harum laborum ad fugiat magni eligendi enim architecto
          nisi sit voluptatum quibusdam nobis consectetur reiciendis animi
          facilis beatae voluptatem, praesentium ratione ipsa vero numquam nulla
          voluptas? Facilis vero quisquam natus aspernatur veritatis molestias
          eveniet corrupti velit voluptas ratione perferendis consequatur
          explicabo accusantium distinctio, dolorem repellat doloribus! Quasi,
          error quos. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Aperiam modi et reprehenderit incidunt perferendis consequuntur
          repellat assumenda accusantium atque nulla commodi, necessitatibus non
          sint cupiditate dicta distinctio at id rem impedit nihil. Officia
          culpa officiis dolor voluptatem impedit accusantium provident eos
          beatae, voluptatum aliquam debitis adipisci dignissimos non laudantium
          incidunt? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Explicabo ut, obcaecati qui dolorem ratione sequi voluptatum
          consequuntur quisquam ipsa. Doloribus distinctio dolor quis ex minus!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
