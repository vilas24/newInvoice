import ReactPrint from 'react-to-print';
import { useRef, useState } from 'react';

import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Close } from '@mui/icons-material';

function PdfTemplate(props) {
    const ref = useRef();
    const [openAirPopup, setAirPopup] = useState(false);
    const [Item, setItem] = useState('');
    const [Amount, setAmount] = useState(0);
    const [Quantity, setQuantity] = useState('');
    const [List, setList] = useState([]);
    const [openAirPopup2, setAirPopup2] = useState(false);
    const [Discount, setDiscount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const addData = () => {
        if (!Item || Amount <= 0 || Quantity <= 0) {
            alert('Please enter valid product, amount, and quantity');
            return;
        }
        const totalItemAmount = Number(Amount) * Number(Quantity); // Calculate total for each item
        setList([...List, { product: Item, amount: Number(Amount), quantity: Number(Quantity), total: totalItemAmount }]);
        setItem('');
        setQuantity('');
        setAmount('');
        setAirPopup(false);
    };

    let sum = List.reduce((acc, item) => acc + item.total, 0); // Calculate the sum of all item totals

    const addDiscount = () => {
        if (Discount < 0 || Discount > 100) {
            alert('Please enter a valid discount percentage (0-100)');
            return;
        }
        let discountAmount = (sum * Discount) / 100;
        setTotalAmount(sum - discountAmount);
        setAirPopup2(false);
    };

    return (
        <>
            <div className="container" ref={ref}>
                {/* Invoice Content */}
                <div className="container">
                    <br />
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h3 style={{ color: '#325aa8' }}>REGENCY FRUITS & VEGETABLES</h3>
                        </div>
                    </div>
                    <div className="table">
                        <tr>
                            <td>
                                <h3>Leelaram Gupta</h3>
                            </td>
                            <td>
                                <h3>9821995732</h3>
                            </td>
                        </tr>
                    </div>
                    
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th><h5>Description</h5></th>
                                    <th><h5>Qty</h5></th>
                                    <th><h5>Price</h5></th>
                                    <th><h5>Total</h5></th>
                                </tr>
                            </thead>
                            <tbody>
                                {List.length ? List.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.product}</td>
                                        <td>{item.quantity}</td>
                                        <td>₹ {item.amount}</td>
                                        <td>₹ {item.total}</td>
                                    </tr>
                                )) : null}
                                <tr>
                                    <td colSpan="3" className="text-right"><strong>Total: </strong></td>
                                    <td>₹ {sum}</td>
                                </tr>
                                {Discount > 0 && (
                                    <tr style={{ color: '#F81D2D' }}>
                                        <td colSpan="3" className="text-right"><strong>Discount:</strong></td>
                                        <td>{Discount}%</td>
                                    </tr>
                                )}
                                <tr>
                                    <td colSpan="3" className="text-right"><strong>Payable Amount:</strong></td>
                                    <td>₹ {totalAmount === 0 ? sum : totalAmount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* <div className="details">
                        <p><b>Date :</b> {props.date}</p>
                        <p><b>Mirza Aman</b></p>
                        <p><b>Contact: 9821995732</b></p>
                    </div> */}
                </div>
            </div>

            <ReactPrint trigger={() => <button>Print</button>} content={() => ref.current} documentTitle={`INVOICE ${props.InvoiceNumber}`} />

            <button onClick={() => setAirPopup(true)}>Add Product</button>
            {/* {sum > 0 && <button onClick={() => setAirPopup2(true)}>Discount %</button>} */}

            {/* Add Product Dialog */}
            <Dialog open={openAirPopup}>
                <DialogTitle>
                    <div className="title">
                        <div className="hed">New Product</div>
                        <Close onClick={() => setAirPopup(false)} />
                    </div>
                </DialogTitle>
                <DialogContent>
                    <input type="text" value={Item} onChange={(e) => setItem(e.target.value)} placeholder="Product Name" />
                    <input type="number" value={Quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
                    <input type="number" value={Amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount ₹" />
                    <button onClick={addData}>Add</button>
                </DialogContent>
            </Dialog>

            {/* Discount Dialog */}
            {/* <Dialog open={openAirPopup2}>
                <DialogTitle>
                    <div className="title">
                        <div className="hed">Discount</div>
                        <Close onClick={() => setAirPopup2(false)} />
                    </div>
                </DialogTitle>
                <DialogContent>
                    <input type="number" value={Discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Discount %" />
                    <button onClick={addDiscount}>Add</button>
                </DialogContent>
            </Dialog> */}
        </>
    );
}

export default PdfTemplate;
