import React, { useEffect, useState } from "react";
import { FaTruck, FaBoxOpen, FaFlag, FaTshirt } from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";

const newArrivals = [
  {
    img: "bo4.jpeg",
    name: "Stylern House Polo",
    price: 1299,
    originalPrice: 1799,
  },
  {
    img: "bo5.jpeg",
    name: "Gryffindor Polo",
    price: 999,
    originalPrice: 1499,
  },
  {
    img: "bo6.jpeg",
    name: "Triwizard T-shirt",
    price: 2199,
    originalPrice: 2999,
  },
  {
    img: "bo7.jpeg",
    name: "Hufflepuff  Knit Polo",
    price: 1399,
    originalPrice: 1999,
  },
  {
    img: "bo8.jpeg",
    name: "Horcruxes  T-shirt",
    price: 699,
    originalPrice: 999,
  },
  {
    img: "bo9.jpeg",
    name: "Premium Hoodie",
    price: 1899,
    originalPrice: 2499,
  },
];

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const Home1 = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration for the animations
      // once: true, // Animation triggers once
    });
  }, []);
  const categories = [
    { img: "img1.jpg", title: "Mens" },
    { img: "img2.jpg", title: "Womens" },
    { img: "img3.jpg", title: "Kids" },
  ];

  const getDiscount = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const handleNext = () => {
    if (startIndex + itemsPerPage < newArrivals.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div>
     
{/* 
      <div className="w-full h-screen">
        <img src="bo2.jpeg" alt="hero" className="w-full h-full object-cover" />
      </div> */}

      {/* <div className="categories grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1 px-1 py-1 ">
        {categories.map((i, index) => (
          <div
            key={index}
            className="relative w-full aspect-3/4 overflow-hidden rounded-md"
          >
            <img
              src={i.img}
              alt="catImg"
              className="w-full h-full  object-cover transition-all duration-300 hover:-translate-y-2"
            />

            <h3
              className="absolute bottom-3 sm:bottom-3 md:bottom-17  lg:bottom-20 left-0 right-0 text-center text-sm lg:text-2xl text-white lg:font-bold drop-shadow-lg"
              style={{ fontFamily: "math" }}
            >
              {i.title}
            </h3>
          </div>
        ))}
      </div> */}

      {/* <div data-aos="fade-up">
        <img
          src="bo3.jpeg"
          alt="hero"
          className="w-full h-64 sm:h-80 md:h-96 lg:h-170 object-cover "
        />
      </div> */}

      {/* <div className="text-center py-8">
        <span className="text-xs uppercase tracking-[4px] text-gray-400">
          Fresh Collection
        </span>

        <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
          New Arrivals
        </h2>

        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          Discover what’s new — your wardrobe upgrade starts here.
        </p>
      </div> */}

     {/* <div className="relative px-4 mt-6 overflow-x-hidden">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md disabled:opacity-40"
        >
          <FaChevronLeft />
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {newArrivals
            .slice(startIndex, startIndex + itemsPerPage)
            .map((item, index) => (
              <div
                key={index}
                className="shadow-sm rounded-md overflow-hidden "
              >
                <img
                  src={item.img}
                  className="w-full h-60 sm:h-72 md:h-80 lg:h-112.5 object-cover"
                  alt="product"
                />

                <div className="p-2">
                  <h3 className="text-sm font-medium">{item.name}</h3>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-semibold">₹{item.price}</span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{item.originalPrice}
                    </span>
                    <span className="text-xs text-green-600 font-semibold">
                      {getDiscount(item.price, item.originalPrice)}% OFF
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <button
          onClick={handleNext}
          disabled={startIndex + itemsPerPage >= newArrivals.length}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md disabled:opacity-40"
        >
          <FaChevronRight />
        </button>
      </div>  */}

      {/* <hr
        className="text-gray-300 px-2    pt-10 mx-3"
        style={{ marginTop: "40px" }}
      /> */}

      {/* <div data-aos="fade-up bg-gray-300">
        <img
          src="bo10.jpeg"
          alt="hero"
          className="w-full h-64 sm:h-80 md:h-96 lg:h-170 object-cover "
        />
      </div> */}
     

      {/* <div className="mens md:px-7">
        <div className="text-left py-8 px-4  ">
          <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-gray-800 tracking-tight">
            Shop Men
          </h2>

          <div className="flex justify-between items-center">
            <p className="mt-2 text-gray-500 text-sm sm:text-base md:text-base font-light">
              Uncover the latest in men's fashion
            </p>

            <p className="text-gray-500 md:font-medium  text-sm w-max  border-b-2 border-gray-300 pb-1">
              Shop Men
            </p>
          </div>
        </div>

       <div className="relative px-4 mt-1 mb-5 overflow-x-hidden">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md disabled:opacity-40"
          >
            <FaChevronLeft />
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals
              .slice(startIndex, startIndex + itemsPerPage)
              .map((item, index) => (
                <div
                  key={index}
                  className="shadow-sm rounded-md overflow-hidden "
                >
                  <img
                    src={item.img}
                    className="w-full h-60 sm:h-72 md:h-80 lg:h-112.5 object-cover"
                    alt="product"
                  />

                  <div className="p-2">
                    <h3 className="text-sm font-medium">{item.name}</h3>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold">₹{item.price}</span>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{item.originalPrice}
                      </span>
                      <span className="text-xs text-green-600 font-semibold">
                        {getDiscount(item.price, item.originalPrice)}% OFF
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= newArrivals.length}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md disabled:opacity-40"
          >
            <FaChevronRight />
          </button>
        </div> 

        <hr
          className="text-gray-300 px-2 py-2   pt-3 mx-3"
          style={{ marginTop: "40px" }}
        />
      </div> */}
      {/* <div className="max-w-4xl mx-auto px-4 py-6 pb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-3xl font-extrabold text-gray-900">
          Clothing Store
        </h2>

        <p className="mt-4 text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
          Uncover the latest trends and premium styles curated just for you.
        </p>

        <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed">
          Clothing Store brings you high-quality fashion that blends comfort,
          style, and affordability. Explore casual wear, formal attire, and
          everything in between for your perfect wardrobe upgrade.
        </p>
      </div> */}

      {/* <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-11 md:w-20 md:h-20 rounded-full border border-gray-300 flex items-center justify-center mb-3">
              <FaTruck size={28} />
            </div>
            <h6 className="font-semibold text-sm md:text-base text-gray-800 mb-1">
              SHIPPING WITHIN 48 HOURS
            </h6>
            <p className="text-gray-500 text-xs md:text-sm">
              Your order will be shipped within 48 hours
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-11 md:w-20 md:h-20 rounded-full border border-gray-300 flex items-center justify-center mb-3">
              <FaBoxOpen size={28} />
            </div>
            <h6 className="font-semibold text-sm md:text-base text-gray-800 mb-1">
              FREE DELIVERY
            </h6>
            <p className="text-gray-500 text-xs md:text-sm">
              On prepaid orders
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-11 md:w-20 md:h-20 rounded-full border border-gray-300 flex items-center justify-center mb-3">
              <FaFlag size={28} />
            </div>
            <h6 className="font-semibold text-sm md:text-base text-gray-800 mb-1">
              MADE IN INDIA
            </h6>
            <p className="text-gray-500 text-xs md:text-sm">
              100% Indian production
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-11 md:w-20 md:h-20 rounded-full border border-gray-300 flex items-center justify-center mb-3">
              <FaTshirt size={28} />
            </div>
            <h6 className="font-semibold text-sm md:text-base text-gray-800 mb-1">
              LUXURY FASHION
            </h6>
            <p className="text-gray-500 text-xs md:text-sm">
              High-quality & affordable
            </p>
          </div>
        </div>
      </div> */}


    <p className="bg-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut alias temporibus est, quisquam, recusandae delectus nulla, repudiandae architecto similique ducimus molestias asperiores assumenda suscipit tempora aliquam expedita dolor vel sint.
    Officiis enim dolore ratione, animi alias similique quibusdam fugiat adipisci id impedit autem reiciendis illum, possimus quidem! Eius, eum, enim nam sequi velit, dolore omnis quas nemo praesentium sit explicabo!
    Enim omnis assumenda dolore? Iste quasi explicabo libero provident, sed adipisci exercitationem veritatis atque! Dignissimos tenetur expedita vero doloremque temporibus! Eum distinctio earum quis. Architecto aliquid totam minima suscipit corrupti.
    Eligendi facere, cumque odio amet quis et numquam nulla repellat quisquam aliquid autem ducimus enim alias, ipsa odit iure consequuntur adipisci ratione inventore! Quod temporibus facere ea non. Facilis, repellat?
    Maiores nisi itaque id vel dolor alias, aliquid voluptates, atque earum quidem minima. Ut, est! Voluptate, eum. Corporis adipisci, placeat obcaecati consequatur debitis, ullam eligendi nihil ipsa illum architecto pariatur?
    Soluta velit dolorum quasi voluptatibus earum optio in necessitatibus libero dignissimos quas eveniet voluptates doloribus inventore, dicta non ad nobis odio quam maiores minus! Corporis, sint dicta. Mollitia, placeat voluptates!
    Odit, repudiandae sint deleniti quam sequi, at, possimus corporis laudantium sunt repellat ut pariatur? Facilis, cum aut dolorum ad commodi eos itaque similique odio rem dolore accusantium temporibus reprehenderit laborum?
    Exercitationem eaque placeat minus est, quisquam neque quo quaerat rem. Et minus rem aut suscipit hic possimus provident. Sed autem eveniet sequi accusantium dolore maiores, omnis iure necessitatibus velit fuga.
    Ab similique modi doloribus dignissimos debitis, facilis deserunt consequuntur repudiandae iusto nesciunt! Consequuntur voluptatem sit quas similique quisquam dolores repudiandae ipsum, aliquam soluta tempora, provident perspiciatis ullam id rerum ratione.
    Sunt dolores, culpa a, eligendi beatae mollitia provident, consequatur ipsa quidem corporis officia impedit molestiae deleniti voluptatem commodi ratione nemo consectetur neque tempora labore molestias dignissimos quas porro quisquam. Nemo.
    Nihil itaque quasi unde soluta perferendis incidunt rerum quod amet consequuntur qui! Autem hic est odit. Quidem omnis, cupiditate fuga facere corporis suscipit sunt quos reiciendis eum iure tenetur laboriosam.
    Velit a asperiores nesciunt iste fuga cum, voluptates minima minus earum, quidem repellendus nobis tempore iusto ad blanditiis maiores quas adipisci incidunt eveniet! Reiciendis nesciunt nulla ullam sapiente porro illum!
    Tenetur voluptatibus, eaque quod non aut, laudantium eligendi ipsum praesentium consectetur quidem debitis minus ducimus nulla explicabo quam? Voluptates vitae esse numquam tempora illum? Alias deleniti expedita harum corporis magni.
    Odit expedita nulla optio repellat in tempore totam, quae adipisci asperiores eligendi rerum eaque commodi tenetur sunt itaque natus aliquam reprehenderit? Voluptas magnam obcaecati aperiam deleniti culpa? Laudantium, iste mollitia.
    Laborum, nostrum perspiciatis? Nobis ab nihil sunt accusamus doloremque sequi quibusdam dignissimos itaque? Exercitationem sunt modi voluptatem. Et veniam modi magni? Nostrum ipsam, inventore earum aperiam ut officiis impedit eligendi.
    Eos mollitia voluptatem recusandae qui repellat cumque eligendi, velit vitae quam deleniti? Nesciunt tenetur eaque in impedit reiciendis officia repellat laborum cupiditate a. Provident delectus, est quas ab doloribus ad!
    Laboriosam dignissimos nostrum vitae vero, repellendus corrupti animi asperiores distinctio, eos error aut. Voluptates, blanditiis fuga optio ipsum numquam eveniet delectus dicta ex. Praesentium, quam earum non rem modi commodi.
    Et aspernatur, consequatur, fuga ratione necessitatibus ipsa optio molestiae autem vel, sapiente deleniti inventore voluptatibus! Soluta delectus earum, nobis blanditiis suscipit inventore, a quam optio sint beatae aspernatur vero tempore?
    Fugit omnis enim, obcaecati laboriosam consequuntur asperiores reiciendis nisi iure explicabo doloribus distinctio voluptates molestiae facere. Voluptate repellat officia quae aliquam. Facere nisi temporibus similique esse error saepe, doloribus nostrum.
    Nostrum minima tempora quos doloremque molestias nesciunt quaerat ipsum et explicabo, inventore, voluptates nisi quisquam quidem quia repellat placeat, ab cumque esse! Architecto fugit magnam aspernatur modi expedita provident quis?
    Odio labore adipisci explicabo assumenda suscipit sequi quis iure reiciendis delectus, quod aliquam natus molestiae laboriosam maxime vel iste enim id vero quam blanditiis ducimus! Impedit expedita nihil odit architecto.
    Quibusdam assumenda maxime et accusamus minima enim expedita saepe quas odio consequuntur facere explicabo veritatis, iure id distinctio inventore rerum officiis atque quidem exercitationem nam sequi! Nemo incidunt eveniet maxime?
    Aperiam sed labore dolorem, illum, rem, vel quibusdam sapiente tempore nam quae sint hic temporibus. Aspernatur molestiae nemo commodi corporis. Quasi aspernatur tempore maxime nulla ab. Dicta iusto ex atque.
    Provident obcaecati, velit quae eligendi minima incidunt cupiditate accusamus harum placeat et quisquam veniam sequi, recusandae eum! Voluptate facilis odio mollitia molestiae nostrum dolorum explicabo debitis exercitationem, ducimus tempora eius.
    Quidem aut eum sed hic nesciunt minima sunt tempora voluptatum fugit esse labore quia rerum voluptate, natus distinctio deserunt temporibus commodi debitis libero mollitia? Facere maiores voluptatibus sit consequatur dolor?
    Laudantium, maiores deserunt doloremque dolore laborum totam iusto, alias vitae beatae omnis veniam voluptatem tenetur, repudiandae unde odio consectetur inventore aut pariatur sed aspernatur saepe. Sint perspiciatis sit qui eaque?
    Eveniet delectus voluptates praesentium quam fuga dolor consectetur blanditiis aliquid accusamus laudantium repellat distinctio dicta nemo quibusdam, vitae porro ipsam ducimus itaque reprehenderit a minus earum incidunt, quaerat temporibus? Ipsam?
    Et delectus illo neque, laborum iure hic. Nesciunt aut nulla numquam ullam. A, veniam esse porro voluptatem dignissimos excepturi fuga aspernatur hic repudiandae delectus eligendi amet nihil distinctio ea ad.
    Doloremque cumque saepe aspernatur mollitia libero laboriosam adipisci est ipsa harum quis. Sunt, voluptatum repudiandae! Perferendis ad nam, assumenda, exercitationem itaque expedita, doloremque iste nihil deserunt totam non explicabo placeat.
    Quibusdam earum nobis maiores rerum sapiente, ad, veniam ut illo similique eligendi tenetur! Veritatis iste facere dignissimos? Iure impedit illo facilis ipsa. Nesciunt veniam, eaque facilis minima totam labore est?
    Incidunt hic voluptatibus provident cupiditate. Facere molestias iusto praesentium pariatur, enim labore deserunt. Velit enim tempore, quisquam voluptatem perferendis rerum esse nostrum veniam consequuntur incidunt at impedit laudantium quam illo.
    Dolor a perferendis harum natus, laudantium maxime qui quasi veniam dolores, voluptate vel sed aliquid non nesciunt doloribus saepe animi. Iste tenetur aut, eveniet hic nam commodi amet beatae earum!
    Similique, incidunt quisquam quas natus magni possimus! Tenetur minus animi architecto cumque soluta voluptas corrupti? Architecto corrupti hic fugit voluptates cupiditate aliquam exercitationem similique est perferendis, repellat molestiae natus velit.
    Quas vitae quos blanditiis illum. Delectus vel facere asperiores eius nam doloribus at tempora quia recusandae perferendis! Ratione fugiat, dolorum, explicabo, facere voluptate officiis earum officia impedit modi corrupti laborum?
    Tenetur consequuntur officia reiciendis illum itaque doloribus odit facere, esse repellendus soluta quia ducimus dolor voluptatum ipsa necessitatibus? Ullam dolor molestias dicta. Itaque, reiciendis eos quia dolorem vitae ea ipsa?
    Eaque provident aperiam dolorum, numquam omnis qui blanditiis, pariatur minima velit aliquid maiores harum incidunt doloribus repellat eos perferendis cupiditate labore a ducimus. Rerum delectus sequi quod, provident inventore commodi!
    Autem, quasi voluptatibus maxime assumenda dolorem fugiat vitae asperiores! Id suscipit repellat iste cupiditate. Eos ut pariatur nostrum placeat repellat quisquam accusantium mollitia, totam eius id? Adipisci ea dolorum expedita.
    Iusto blanditiis porro sit voluptates quod excepturi quibusdam repellat reiciendis doloribus. Aliquid veniam illo, officia vitae necessitatibus unde hic id temporibus explicabo praesentium vel repudiandae nostrum deserunt tenetur magnam maxime.
    Iusto laborum ipsum id nesciunt ipsa quisquam vitae assumenda, delectus doloribus? Dolores nobis, molestias libero doloremque ducimus quos, architecto vitae maxime numquam, molestiae incidunt quisquam eum dignissimos cupiditate assumenda laboriosam?
    Voluptate, nisi? Obcaecati, inventore dolorum voluptatum blanditiis rem iusto odit possimus explicabo pariatur. Expedita alias atque impedit repudiandae molestias. Qui deserunt impedit dolorem in culpa iste quia aperiam accusantium voluptatum!
    Quasi harum voluptatibus provident recusandae cumque assumenda excepturi a quis, quibusdam unde! Temporibus esse ab nostrum perferendis iure blanditiis deserunt aliquam enim! Nulla alias, consequatur quasi vero dolore tempore doloremque!
    Culpa doloribus aliquam impedit natus maxime aperiam facere officia ipsa similique laborum eum aut, asperiores voluptate illo nostrum ea quos voluptates quaerat, sequi fuga? Accusantium, distinctio. Saepe, quo vitae! Exercitationem?
    Cumque, ut reprehenderit quas unde ipsum aut voluptatibus reiciendis ad vel perferendis sapiente, odit molestias aperiam nisi possimus dicta aliquam earum quisquam placeat alias mollitia! Illum molestiae consequatur quia nihil?
    Similique voluptas, qui numquam laudantium libero perspiciatis sit id reprehenderit tempore. Ratione, nostrum, sint velit mollitia odio, obcaecati iste quidem laborum autem quos deleniti dolorum ipsa eaque at. Eveniet, exercitationem.
    Necessitatibus repudiandae repellendus iusto, tempora possimus voluptatibus illum ipsam quae et obcaecati inventore! Voluptatibus iste esse, numquam, sunt ullam nulla autem reprehenderit sequi sed odio incidunt facilis ab eos culpa.
    Vitae voluptatibus quae at laboriosam soluta non suscipit placeat optio illo. Odit officia, numquam, soluta suscipit necessitatibus nostrum modi eos, provident dignissimos aliquam quos. Voluptas asperiores consequatur accusantium. Facilis, corrupti!
    A accusamus reiciendis delectus, nulla praesentium incidunt eaque facilis, ipsum recusandae hic maiores. Quia culpa similique facilis nobis. Dolor consectetur expedita, assumenda dolorem recusandae voluptatum laborum fugiat nobis perspiciatis neque!
    Ab pariatur porro, dignissimos eos dolorum quaerat nemo! Quia eveniet eos fugit quisquam voluptas? Dolor excepturi magnam reprehenderit modi est fuga culpa cum pariatur exercitationem quos? Voluptas optio nemo nam.
    Magni, non modi earum corporis architecto exercitationem in ex porro, iste nesciunt dicta laudantium, praesentium velit pariatur dolores quod rerum repellat natus quos vero neque ipsa. Sint cupiditate eveniet asperiores.
    Atque iusto explicabo obcaecati magnam necessitatibus dignissimos architecto sunt? Ea libero magni delectus magnam laborum eveniet nostrum numquam, nesciunt aspernatur veniam saepe sequi, repellat, cupiditate reprehenderit tempore? Dolor, hic ratione?
    Nostrum, officiis ut tempora sed voluptatum iure soluta numquam eos itaque! Nesciunt rerum velit in libero placeat. Deleniti eius in beatae consectetur eos doloribus pariatur unde, id cupiditate magni incidunt?
    Sequi ullam dolore reprehenderit reiciendis fugit autem error perferendis, est, architecto, vel in quidem natus! Debitis fugit quod doloremque omnis officia ullam consequuntur repellendus molestiae? Aliquam earum maiores quidem quisquam?
    Ipsum officiis excepturi unde et. Ipsam consequuntur dolores exercitationem? Asperiores perferendis officiis doloremque, quam vel quae id quod? Hic similique quidem aliquid? Nostrum nihil sunt temporibus eos molestiae quis adipisci.
    Labore odit quidem suscipit, accusantium tempore magnam dicta numquam consequuntur quisquam quaerat accusamus! Ducimus veritatis, vitae ut alias perferendis ipsum quam molestias. Voluptates quasi, eos quidem consectetur vel recusandae laborum!
    Necessitatibus quisquam, eius quasi accusamus esse eos odio sint fugit doloremque praesentium nihil voluptates obcaecati iste sapiente perspiciatis quod neque debitis nisi deleniti quidem quo eligendi, vero veniam aliquid. Nemo.
    Quas rem impedit non quia illum debitis totam neque optio obcaecati rerum explicabo perspiciatis, quam illo quos, maxime consectetur amet quo eos. Nostrum incidunt veniam atque, magnam optio nemo repellendus?
    Dolor ea, earum est quo ipsam repudiandae possimus commodi maxime cupiditate veniam, vero in distinctio ad voluptatum natus corporis placeat at quam rerum libero corrupti! Accusamus exercitationem perferendis quas ad!
    Quisquam sed quo iusto quaerat temporibus in officiis soluta, harum consectetur necessitatibus officia nemo assumenda vero et dolor doloremque inventore eum reprehenderit delectus distinctio vel iure culpa rem. Laudantium, doloremque?
    Minus deserunt maxime repellendus quaerat explicabo, dolores, eos excepturi beatae impedit qui sequi ut ad non commodi esse nihil odit, nulla aperiam fugit enim. Hic, nulla autem? Quam, pariatur adipisci!
    Vitae cumque aliquid iste, aut pariatur tempora ad iusto nesciunt inventore mollitia molestias corporis unde numquam reprehenderit natus est ab. Quae, accusamus facere asperiores aperiam pariatur beatae dolores at odit.
    Culpa dignissimos officia libero. Aperiam nobis soluta quae voluptatibus dignissimos quidem laborum maiores voluptatem provident nulla. Vitae dolore ex illo ut, placeat magnam, adipisci ipsum quaerat officiis eveniet odit rem.
    Neque fugit aut necessitatibus et quam consequuntur fugiat officia, tenetur facere cum suscipit quisquam similique. Voluptatem odio veritatis, animi atque earum impedit rerum aut deleniti doloremque dignissimos praesentium quae? Repellat.
    In, aliquid voluptates repellendus omnis possimus quidem libero itaque, provident a culpa quibusdam eos aut reiciendis officiis incidunt neque aliquam nobis. Dolor saepe repudiandae ad dicta quo perspiciatis quis maiores!
    Et odio amet sapiente alias tempora doloremque blanditiis soluta dolorum quis quasi. Necessitatibus quia et ab, dolores quibusdam repudiandae corrupti sunt explicabo ducimus tempore, optio harum aperiam odit placeat a?
    Voluptas, reiciendis quam. Illum labore qui modi in, quibusdam deserunt debitis odio incidunt totam maxime, rerum perferendis error aut temporibus voluptatibus velit delectus? Impedit adipisci natus aperiam aut sit fugiat!
    Delectus atque officiis aut vitae molestiae et impedit est culpa quo nesciunt beatae at quos consequatur, laboriosam assumenda vero hic facilis sit? Deserunt omnis nisi vero nostrum illo veniam incidunt!
    Impedit nam quisquam ipsum dicta harum magni maxime nesciunt provident suscipit placeat nostrum possimus perspiciatis vero, repellendus dolorum, quas distinctio, quae velit earum quod! Modi dicta sapiente laudantium dolorum nobis?
    Pariatur odit iusto voluptatem dicta placeat cumque, qui, alias nisi quod provident ullam dolorum inventore dolore accusantium repellat. Labore delectus ex eos corrupti omnis repellendus praesentium sequi vitae dignissimos laudantium.
    Veniam incidunt pariatur ipsam, veritatis ab ipsa cupiditate perspiciatis modi ducimus aspernatur voluptatum hic accusantium distinctio nostrum. Dicta at sapiente in, numquam autem maxime cupiditate accusamus animi, modi facilis ducimus.
    Earum officia autem laboriosam maxime aspernatur quam porro nemo a aliquam, dolorem assumenda omnis incidunt placeat maiores aliquid minima, atque, fugiat cum recusandae cumque eveniet deleniti. Ratione sapiente neque laudantium!
    Ut repellendus, vitae, eaque laudantium nihil veniam vero distinctio optio saepe nam ipsa, ab hic debitis natus quas doloribus quae qui recusandae iste? Nisi, commodi ipsa iure est officia error.
    Modi recusandae consequatur suscipit voluptatem, accusantium optio porro maiores praesentium debitis ab sunt, impedit ut eveniet atque nostrum nobis eaque commodi distinctio nam, omnis aut alias eius expedita qui? At.
    Repellendus dolores minima deleniti beatae sit eum reprehenderit illo quisquam, alias repudiandae eius harum incidunt minus. Incidunt, tempora expedita hic tempore iste pariatur quam aliquam consectetur laborum aut? Atque, asperiores?
    Amet, cum veniam delectus tenetur adipisci, eum, maxime itaque ab libero quae ullam! Magni optio voluptas voluptatibus possimus alias dicta molestiae harum. Sit magni repellendus architecto nisi reprehenderit consequuntur quaerat.
    Expedita nesciunt architecto assumenda, eaque sunt obcaecati blanditiis laudantium illum ipsa sint veniam beatae quibusdam, delectus recusandae officiis rerum incidunt officia consectetur similique reiciendis? Fuga perferendis ex ut corporis similique.
    Quae in et, dolore est suscipit nesciunt natus itaque aspernatur aliquid exercitationem excepturi nisi nemo eaque eos, quo esse maxime cumque laborum odio pariatur qui totam quod optio harum! Quasi!
    Quas exercitationem officiis sed nesciunt quisquam fugiat impedit tempora quaerat magnam, magni in sint ab, placeat incidunt ipsum necessitatibus voluptatibus ullam adipisci. Blanditiis, molestiae ab quas eaque cum expedita repellendus!
    Sapiente neque placeat voluptatibus. A excepturi quo dignissimos consequatur sapiente labore repellat dolorem accusantium natus! Ex officia magnam accusantium dolores laudantium, accusamus pariatur molestiae facilis explicabo. Aut itaque libero aliquid?
    Nisi unde dolorum voluptatem repellendus eos rerum beatae ab maxime dolor maiores, nemo, deserunt assumenda esse vero sequi voluptatum tempora. Ex mollitia soluta autem. Totam, voluptatum labore. Sapiente, deserunt cumque.
    Qui optio rerum doloremque voluptas aspernatur explicabo maxime quam commodi. Vitae totam reprehenderit, dolores voluptatum dignissimos temporibus sed voluptas, dolorum pariatur modi quisquam porro quos, omnis eligendi et provident quidem?</p>
    </div>
  );
};

export default Home1;
