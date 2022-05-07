import { useState, useEffect } from 'react';

const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (postData) => {
    setOptions({
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
  }

  const deleteData = () => {
    setOptions({
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: null
    })
  }

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      setIsPending(true);

      try {
        const response = await fetch( url, { ...fetchOptions, signal: controller.signal});
        if(!response.ok){
          throw new Error(response.statusText)
        }
        const jsonData = await response.json();

        setIsPending(false);
        setData(jsonData);
        setError(null);

      } catch (err) {
        if(err.name === 'AbortError'){
          console.log('the fetch was aborted')
        } else {
          setIsPending(false)
          setError('Could not fetch the data');
          console.log(err.message)
        }
      }
    }

    if(method === 'GET'){
      fetchData();
    }
    if(method === 'POST' && options){
      fetchData(options)
    }
    if(method === 'DELETE' && options){
      fetchData(options)
    }

    return () => {
      controller.abort();
    }
  }, [url, options, method]);

  return { data, isPending, error, postData, deleteData };
}
 
export default useFetch;