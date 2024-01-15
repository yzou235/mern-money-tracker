import './App.css';
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState(''); //initial state
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL+'/transaction';
    // console.log(url);
    fetch(url, {
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({name, description, date})
    }).then(response => {
      response.json()
        .then(json => {
          console.log('result', json);
        })
    })
  }

  return (
    <main>
      <div className="top-panel">
        <h1>$400<span>.00</span></h1>
        <form onSubmit = {addNewTransaction}>
          <div className='basic'>
            <input  type="text" 
                    value={name} 
                    onChange={ev => setName(ev.target.value)}
                    placeholder={'item'}/>
            <input  type="date"
                    value={date}
                    onChange = {ev => setDate(ev.target.value)} />
          </div>
          <div className='description'>
            <input  type="text" 
                    value={description}
                    onChange = {ev => setDescription(ev.target.value)}
                    placeholder={'description'} />
          </div>
          <button type='submit'>Add New Transaction</button>
        </form>
      </div>
      <div className="bottom-panel">
        <div className="transactions">
          <div className="transaction">
            <div className="left">
              <div className="name">1 New Samsung TV</div>
              <div className="description">it was time for a new tv</div>
            </div>
          <div className="right">
            <div className="price red">-$500</div>
            <div className="date">2022-12-24</div>
          </div>
          </div>
          <div className="transaction">
            <div className="left">
              <div className="name">2 Gig job new web</div>
              <div className="description">it was time for a new tv</div>
            </div>
            <div className="right">
              <div className="price green">+$400</div>
              <div className="date">2022-12-24</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
