import React, {useState, useEffect} from "react";
import axios from "axios";
import "./App.css";

const App = () =>{
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    type: "income",
    category: "",
    amount: "",
    date: "",
    description: ""
  });

  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const fetchTransactions = async () =>{
    const res = await axios.get("https://flow-ai-backend-assignment-backend-db.onrender.com/transactions")
    setTransactions(res.data.transactions);
  }

  useEffect(() =>{
    fetchTransactions();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://flow-ai-backend-assignment-backend-db.onrender.com/transactions";
    
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(response);
      fetchTransactions();
      setFormData({
        type: "income",
        category: "",
        amount: "",
        date: "",
        description: ""
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };
  

  return(
      <div className="app-container">
          <form onSubmit={handleSubmit} className="form-container">
            <h1 className="heading">Add Transaction</h1>
            <div className="input-section">
            <select name="type" value={formData.type} onChange={handleInputChange} required>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    placeholder="Category"
                    className="category"
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    placeholder="Amount"
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    placeholder="Description"
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div>
                    <button type="submit" className="btn">Add Transaction</button>
                </div>
            </form>

            <div className="transactions-container">
              <h1 className="heading">Transactions</h1>
                {
                  transactions.map((txn) =>(
                    <li key={txn.id}>
                        {txn.type}: {txn.category} - {txn.amount} on {txn.date}
                    </li>
                  ))
                }
            </div>
      </div>
  )
}

export default App