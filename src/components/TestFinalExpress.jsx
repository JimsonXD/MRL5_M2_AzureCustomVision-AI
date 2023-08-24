import React, { useState } from 'react';
import axios from 'axios';
// import Car from '../Car'; // Assuming this is the component to display car details
// import { cars } from '../CarsData';


const cars = [
    // Sedans
    {
      imageUrl: '/cars/car_types/sedan/camry.jpeg',
      type: 'Sedan',
      make: 'Toyota',
      model: 'Camry'
    },
    {
      imageUrl: '/cars/car_types/sedan/accord.jpeg',
      type: 'Sedan',
      make: 'Honda',
      model: 'Accord'
    },
    {
      imageUrl: '/cars/car_types/sedan/corolla.jpeg',
      type: 'Sedan',
      make: 'Toyota',
      model: 'Corolla'
    },
    {
      imageUrl: '/cars/car_types/sedan/fusion.jpeg',
      type: 'Sedan',
      make: 'Ford',
      model: 'Fusion'
    },
    {
      imageUrl: '/cars/car_types/sedan/sentra.jpeg',
      type: 'Sedan',
      make: 'Nissan',
      model: 'Sentra'
    },
    {
      imageUrl: '/cars/car_types/sedan/cruze.jpeg',
      type: 'Sedan',
      make: 'Chevrolet',
      model: 'Cruze'
    },
    // Hatchbacks
    {
      imageUrl: '/cars/car_types/hatchback/golf.jpeg',
      type: 'Hatchback',
      make: 'Volkswagen',
      model: 'Golf'
    },
    {
      imageUrl: '/cars/car_types/hatchback/mazda3.jpeg',
      type: 'Hatchback',
      make: 'Mazda',
      model: 'Mazda3'
    },
    {
      imageUrl: '/cars/car_types/hatchback/focus.jpeg',
      type: 'Hatchback',
      make: 'Ford',
      model: 'Focus'
    },
    {
      imageUrl: '/cars/car_types/hatchback/yaris.jpeg',
      type: 'Hatchback',
      make: 'Toyota',
      model: 'Yaris'
    },
    {
      imageUrl: '/cars/car_types/hatchback/polo.jpeg',
      type: 'Hatchback',
      make: 'Volkswagen',
      model: 'Polo'
    },
    {
      imageUrl: '/cars/car_types/hatchback/fiesta.jpeg',
      type: 'Hatchback',
      make: 'Ford',
      model: 'Fiesta'
    },
    // SUVs
    {
      imageUrl: '/cars/car_types/suv/cr-v.jpeg',
      type: 'SUV',
      make: 'Honda',
      model: 'CR-V'
    },
    {
      imageUrl: '/cars/car_types/suv/rav4.jpeg',
      type: 'SUV',
      make: 'Toyota',
      model: 'Rav4'
    },
    {
      imageUrl: '/cars/car_types/suv/escape.jpeg',
      type: 'SUV',
      make: 'Ford',
      model: 'Escape'
    },
    {
      imageUrl: '/cars/car_types/suv/tiguan.jpeg',
      type: 'SUV',
      make: 'Volkswagen',
      model: 'Tiguan'
    },
    {
      imageUrl: '/cars/car_types/suv/qashqai.jpeg',
      type: 'SUV',
      make: 'Nissan',
      model: 'Qashqai'
    },
    {
      imageUrl: '/cars/car_types/suv/tucson.jpeg',
      type: 'SUV',
      make: 'Hyundai',
      model: 'Tucson'
    },
    // Vans
    {
      imageUrl: '/cars/car_types/van/sienna.jpeg',
      type: 'Van',
      make: 'Toyota',
      model: 'Sienna'
    },
    {
      imageUrl: '/cars/car_types/van/odyssey.jpeg',
      type: 'Van',
      make: 'Honda',
      model: 'Odyssey'
    },
    {
      imageUrl: '/cars/car_types/van/transit.jpeg',
      type: 'Van',
      make: 'Ford',
      model: 'Transit'
    },
    {
      imageUrl: '/cars/car_types/van/caravan.jpeg',
      type: 'Van',
      make: 'Dodge',
      model: 'Caravan'
    },
    {
      imageUrl: '/cars/car_types/van/nv200.jpeg',
      type: 'Van',
      make: 'Nissan',
      model: 'NV200'
    },
    {
      imageUrl: '/cars/car_types/van/promaster.jpeg',
      type: 'Van',
      make: 'Ram',
      model: 'ProMaster'
    },
    // Utes
    {
      imageUrl: '/cars/car_types/ute/hilux.jpeg',
      type: 'Ute',
      make: 'Toyota',
      model: 'Hilux'
    },
    {
      imageUrl: '/cars/car_types/ute/ranger.jpeg',
      type: 'Ute',
      make: 'Ford',
      model: 'Ranger'
    },
    {
      imageUrl: '/cars/car_types/ute/navara.jpeg',
      type: 'Ute',
      make: 'Nissan',
      model: 'Navara'
    },
    {
      imageUrl: '/cars/car_types/ute/triton.jpeg',
      type: 'Ute',
      make: 'Mitsubishi',
      model: 'Triton'
    },
    {
      imageUrl: '/cars/car_types/ute/d-max.jpeg',
      type: 'Ute',
      make: 'Isuzu',
      model: 'D-Max'
    },
    {
      imageUrl: '/cars/car_types/ute/bt-50.jpeg',
      type: 'Ute',
      make: 'Mazda',
      model: 'BT-50'
    },
  ];
  




  const TestFinalExpress = () => {
    const [image, setImage] = useState(null);
    const [predictedCarType, setPredictedCarType] = useState(null);
    const [filteredCars, setFilteredCars] = useState([]);
  
    const handleImageUpload = (event) => {
      setImage(event.target.files[0]);
      setPredictedCarType(null);
      setFilteredCars([]);
    };
  
    const handleSubmit = async () => {
      if (!image) {
        return;
      }
  
      const formData = new FormData();
      formData.append('image', image);
  

    try {
        const response = await axios.post('http://localhost:8080/api/upload', formData);
        const { predictedType, filteredCarsByType } = response.data;
  
        setPredictedCarType(predictedType);
  
        if (['sedan', 'hatchback', 'ute', 'van', 'suv'].includes(predictedType)) {
         
          const carsOfType = cars.filter(car => car.type.toLowerCase() === predictedType);
          setFilteredCars(carsOfType);
        } else {
          setFilteredCars([]);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }



    };
  
    return (
      <div className="bg-gray-100 font-sans">
        <header className="bg-blue-500 text-white py-6">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-semibold">Car Finder</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Upload Car Image</h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
              />
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
              >
                Submit
              </button>
            </div>
            {predictedCarType && (
              <div className="bg-yellow p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                  Predicted Car Type: {predictedCarType}
                </h2>
                <h3 className="text-lg font-semibold mb-4">
                  Cars of {predictedCarType} Type:
                </h3>
                <div className="bg-pink flex flex-wrap gap-6 p-6">
                  {filteredCars.map((car, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 shadow-md rounded-lg mb-4"
                    >
                      <img
                        src={car.imageUrl}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-auto mb-2 rounded-lg"
                      />
                      <h4 className="text-lg font-semibold">
                        {car.make} {car.model}
                      </h4>
                      <p className="text-gray-600">{car.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };
  
  export default TestFinalExpress;