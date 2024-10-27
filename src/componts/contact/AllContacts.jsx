import React, { useEffect, useState } from 'react'
import ContactServices from '../../services/ContactServices';
import Contact from './Contact';

export default function AllContacts() {
  const [counter, setCounter] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [noMore, setNoMore] = useState(false);
  const handleNext = () => {
    getAllContacts()
    if (noMore == false) {
      setCounter(counter + 1);
    }

  }

  const handlePrevious = () => {
    getAllContacts()

    if (counter > 0) {
      setCounter(counter - 1)
    }
  }

  useEffect(() => {
    getAllContacts();
  }, [])

  const getAllContacts = async () => {
    const token = localStorage.getItem("token")
    let response = await ContactServices.allContacts(
      token,
      counter,
    )
    setContacts(response)
    console.log(response);
    console.log(response.length);
    if(response.length == 0) setNoMore(true);
    
    
  };

  return (
    <div>
      {contacts.length != 0 ?
        contacts.map((contact, i) => (
          <>
            <Contact contact={contact} index={i} />
          </>
        ))
        : <div>Nothing to show</div>

      }

      {/* If contact length == 0 and page != 0 disable next */}
      {/* If contact length == 0 and page == 0 disable both */}
      {true ?
        <div>
          <div>
            <div className='text-center'>
              {counter == 0 && contacts.length != 0 ?
                <button type="button" className='btn btn-outline-warning mx-2 my-1'>prev</button>
                : <button type="button" className='btn btn-outline-secondary mx-2 my-1' onClick={handlePrevious}>prev</button>

              }
              ...
              {counter != 0 && contacts.length == 0 ?
                <button type="button" className='btn btn-outline-warning mx-2 my-1' >nextt</button>
                : <button type="button" className='btn btn-outline-secondary mx-2 my-1' onClick={handleNext}>next</button>
              }
            </div>
          </div>
        </div> : 1
      }




    </div>
  )

}
