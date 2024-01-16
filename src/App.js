import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [price, setPrice] = useState('');
  const [name, setName] = useState(''); //initial state
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL+'/transactions';
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  function addNewTransaction(ev) {
    // ev.preventDefault();
    const url = process.env.REACT_APP_API_URL+'/transaction';
    
    // console.log(url);
    fetch(url, {
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({
        price,
        name, 
        description, 
        date
      })
    }).then(response => {
      response.json()
        .then(json => {
          setPrice('');
          setName('');
          setDate('');
          setDescription('');
          console.log('result', json);
        })
    })
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }
  const balanceStr = balance.toFixed(2);
  const displayBalance = balanceStr.split('.')[0];
  const fraction = balanceStr.split('.')[1];

  return (
    <main>
      <div className="top-panel">
      <h1 className={(balance < 0 ? 'titlered' : 'titlegreen')}>{displayBalance < 0 ? `-$${Math.abs(displayBalance)}` : `$${displayBalance}`}<span>.{fraction}</span></h1>
        <form onSubmit = {addNewTransaction}>
          <div className='basic'>
          <input  type="text" 
                    value={price} 
                    onChange={ev => setPrice(ev.target.value)}
                    placeholder={'+/- price'}/>
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
          {transactions.length > 0 && transactions.map(transaction => (
                      <div className="transaction" key={transaction._id}>
                      <div className="left">
                        <div className="name">{transaction.name}</div>
                        <div className="description">{transaction.description}</div>
                      </div>
                      <div className="right">
                        <div className={"price " + (transaction.price < 0 ? 'red' : 'green')}>
                          {transaction.price < 0 ? `-$${Math.abs(transaction.price)}` : `$${transaction.price}`}
                        </div>
                        <div className="date">{new Date(transaction.date).toISOString().split('T')[0]}</div>
                      </div>
                    </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
