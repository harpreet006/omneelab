import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { typeByPage } from "../../store/actions/whyAction";
import { categoryByPage } from "../../store/actions/categoryAction";
const WarehouseCategory = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.CATEGORY_INFO.categoryList);
  let updatedCategoryy = []
  const [slideCount, setSlideCount] = useState(0);
  const [activeCard, setActiveCard] = useState(1)

  category.forEach((value,index)=>{
    return (
      value.categoryStatus?
      updatedCategoryy.push(value):
      console.log("hello")      
    )
  })
  
  let count =0;
  category.forEach((value,index)=>{
    if (!value.categoryStatus) {
      count++;
    }
  })
 
  useEffect(() => {
    dispatch(typeByPage());
    dispatch(categoryByPage());
  }, [dispatch]); 


  
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    arrows: true,
    className: "myCustomCarousel",
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    ],
  };
  
  
  

  return (
    <>
      {
        category.length !== count 
        ?
        <section className={`four-carousel bg-deep-gray ${category?.length === 0 && "d-none"}`}
        id="four-carousel1">
          <div className="container-fluid pb-4">
            <div className="sectionWidth pt-2">
              <div className="row section-heading text-center">
                  <div className="col-12 text-center">
                  <h2 className="largHeading mb-0">Warehouse Categories </h2> 
                </div>
              </div>
            </div>
            <div className="row">
              <div className="Ifour-element-carousel">
                <Slider {...settings}>
                  {updatedCategoryy &&
                    updatedCategoryy.length > 0 &&
                    updatedCategoryy.map((item, index) => {
                      return (
                        <>
                          { item.categoryStatus?
                            <div key={index} className={`px-3 mx-2 mx-auto`}>
                              <div className="custom-shadow margin0 mx-3 mx-auto my-4 w-100 card custom-card">
                                <div className="img-holder">
                                  <img
                                    src={item.image?item.image:"assets/images/image-not-found.png"}
                                    alt="warehouse"
                                    className="img-fluid w-100"
                                    style={{ height: 200 }}
                                  />
                                </div>
                                <div className="card-body">
                                  <h6 className="card-title">{item?.categoryName}</h6>
                                  <Link
                                    to={`/warehouse?warehouseType=${item?.id}&page=1`}
                                    className="btn btn-deep-primary btn-block"
                                  >
                                    View Details
                                  </Link>
                                </div>
                              </div>
                            </div>
                            :
                           <>
                            {console.log("hi")}
                           </>
                          }
                        </>
                      );
                    })
                  }
                </Slider>
              </div>
            </div>
          </div>
          </section>
          :
          <section>
            <div className="col-12 text-center">
              <h2 className="largHeading mb-0">Warehouse Categories</h2>
            </div>
            <h4 className="text-center mt-5"> No Category Found</h4>
          </section>
      }
      </>
  );
};

export default WarehouseCategory;
