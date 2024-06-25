import Button from "@/components/Button.jsx";
import TemporaryShortURL from "@/components/TemporaryShortURL.jsx";
import React, { useState } from 'react';

const Form = ({email}) =>{
  const [formData, setFormData] = useState({
    longUrl: '',
    description: '',
    email: email,
  });

  const [showShortURL, setShowShortURL] = useState(false);

  const [dataShortURL, setDataShortURL] = useState({
    shortUrl: '',
    description: ''
  })

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/api/shortURL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    setShowShortURL(true);
    setDataShortURL({
      shortUrl: data.body.fullShortUrl,
      description: data.body.description
    });

    //restablece el estado del formulario a los valores iniciales, en este caso a vacio ''
    setFormData({
      longUrl: '',
      description: '',
      email: email
    });
  }

  return(
    <>
      <form onSubmit={submit} className="max-w-lg mx-auto">
        <h2 className="text-3xl text-white font-bold text-center mb-5">
          Create new test Link
        </h2>
        <div className="mb-5">
          <label htmlFor="longUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Destination URL
          </label>
          <input type="url" id="longUrl" name="longUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="http://"
            value={formData.longUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description (optional)
          </label>
          <input type="text" id="description" name="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <Button value="create new URL" />
      </form>
      {(showShortURL && <TemporaryShortURL shortUrl={dataShortURL.shortUrl} description={dataShortURL.description}/>)}
    </>
  )
}

export default Form;